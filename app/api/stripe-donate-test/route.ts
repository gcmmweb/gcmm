import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import nodemailer from "nodemailer"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UTILITIES (module-level)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Escape user-supplied values before inserting into HTML.
 * Do NOT use on campaign body text — that may contain intentional
 * HTML links and formatting written by Junita in Plasmic.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/** Canadian date format: "June 29, 2026" */
function formatDateCA(): string {
  return new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/** Format a number of cents as a dollar string, e.g. "$50.00" */
function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

/**
 * Replace merge tags inside a campaign's email body.
 * Flexible on purpose — Junita may type {donorName}, {Donor Name},
 * {donor_name}, {DONOR NAME}, etc. All common variations are accepted so a
 * natural typing style still works, instead of requiring exact camelCase.
 * Unrecognized tags are left as-is rather than silently deleted, so a typo
 * in Plasmic is visible in the sent email instead of disappearing.
 */
function applyMergeTags(
  body: string,
  vars: {
    donorName: string
    amount: string
    campaignName: string
    matchedAmount?: string
  }
): string {
  const values: Record<string, string> = {
    donorName: vars.donorName,
    amount: vars.amount,
    campaignName: vars.campaignName,
    matchedAmount: vars.matchedAmount ?? "",
  }

  let result = body
  for (const key of Object.keys(values)) {
    // "donorName" -> words ["donor", "Name"] -> case-insensitive,
    // whitespace/underscore-insensitive match inside curly braces.
    const words = key.replace(/([A-Z])/g, " $1").trim().split(/\s+/)
    const pattern = words.join("[\\s_]*")
    const regex = new RegExp(`\\{\\s*${pattern}\\s*\\}`, "gi")
    result = result.replace(regex, values[key])
  }
  return result
}

/**
 * Convert plain text with blank lines into properly spaced HTML paragraphs.
 * Junita writes campaign body text as normal prose with blank lines between
 * paragraphs (like a regular email) — this preserves that spacing once it
 * becomes HTML, since plain line breaks are otherwise collapsed by email
 * clients. A single line break within a paragraph becomes <br>.
 */
function formatBodyText(text: string): string {
  return text
    .split(/\n\s*\n/) // blank line = new paragraph
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map(
      (paragraph) =>
        `<p style="margin: 0 0 20px 0;">${paragraph.replace(/\n/g, "<br>")}</p>`
    )
    .join("")
}

// Function to get client IP address
/**
 * Reuse existing monthly Price objects instead of creating a new one for every
 * donation (which clutters the Stripe dashboard with duplicates).
 * Uses a deterministic lookup_key: e.g. "monthly_mega-city-media-campaigns_cad_500"
 */
async function getOrCreateMonthlyPrice(
  amount: number,
  currency: string,
  campaignName: string,
  orgName: string
): Promise<Stripe.Price> {
  const safeCampaign = campaignName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "general"
  const lookupKey = `monthly_${safeCampaign}_${currency.toLowerCase()}_${amount}`

  const existing = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  })
  if (existing.data.length > 0) return existing.data[0]

  return stripe.prices.create({
    unit_amount: amount,
    currency,
    recurring: { interval: "month" },
    lookup_key: lookupKey,
    product_data: {
      name: `Monthly Donation to ${orgName} - ${campaignName}`,
    },
  })
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  if (forwarded) return forwarded.split(",")[0].trim()
  if (realIP) return realIP
  return "127.0.0.1"
}

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.gcmm.ca",
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGN SHAPE — this is the single object the new Plasmic component sends
// for whichever campaign the donor picked. Replaces the old system of ~100
// separately-named purposeXxxYyy props.
// ─────────────────────────────────────────────────────────────────────────────
interface CampaignData {
  name: string // Donor-facing campaign name, fully editable in Plasmic
  bannerUrl?: string // Per-campaign banner image
  emailBodyOneTime: string // Full email body text for one-time gifts
  emailBodyMonthly: string // Full email body text for monthly gifts
  isMatching?: boolean
  matchMultiplier?: number // e.g. 2 = donation is doubled
  matchEmailText?: string // Customizable matched-amount message. Merge tags: {amount}, {matchedAmount}
  signatureTitleOverride?: string // Optional: overrides the global signature title for THIS campaign only (e.g. UkraineAid adds "| UkraineAid")
}

interface EmailCustomization {
  organizationName?: string
  organizationPhone?: string
  organizationEmail?: string
  organizationAddress?: string
  organizationCharityNumber?: string
  signatureName?: string
  signatureTitle?: string
  notificationEmailRecipient?: string
  emailSubject?: string
  campaign?: CampaignData
}

// Send confirmation email to the donor
async function sendConfirmationEmail(
  donorInfo: any,
  paymentIntentId: string,
  amountCents: number,
  accountId: string | undefined,
  emailCustomization: EmailCustomization | undefined,
  frequency: string | undefined
) {
  try {
    const transporter = createTransporter()
    const ec = emailCustomization

    const paymentIntent = (await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["latest_charge"],
    })) as Stripe.PaymentIntent & { latest_charge?: Stripe.Charge }
    const lastFour =
      (paymentIntent.latest_charge as Stripe.Charge)?.payment_method_details?.card?.last4 || "N/A"

    // ── Campaign-specific content ──
    const campaign = ec?.campaign
    const campaignName = campaign?.name || "General Ministry Support"

    // ── Organization-wide defaults (shared across every campaign) ──
    const orgName = ec?.organizationName || "Great Commission Media Ministries"
    const orgPhone = ec?.organizationPhone || "1-877-674-5630"
    const orgEmail = ec?.organizationEmail || "info@gcmm.ca"
    const orgAddress = ec?.organizationAddress || "PO Box 14006, Abbotsford, BC V2T 0B4"
    const charityNumber = ec?.organizationCharityNumber || "82864 9467 RR0001"
    const signatureName = ec?.signatureName || "Dr. Hannu Haukka"
    // Per-campaign override takes priority (e.g. UkraineAid adds "| UkraineAid"),
    // falls back to the shared global title otherwise.
    const signatureTitle =
      campaign?.signatureTitleOverride || ec?.signatureTitle || "CEO, Great Commission Media Ministries (GCMM)"
    const subject = ec?.emailSubject || "Thank you for your donation"

    const bannerUrl = campaign?.bannerUrl || "/images/email-banner.png"
    const isMonthly = frequency === "monthly"
    const rawBody =
      (isMonthly ? campaign?.emailBodyMonthly : campaign?.emailBodyOneTime) ||
      "Thank you for your generous gift of {amount} toward {campaignName}. Your partnership makes a real difference."

    const formattedAmount = formatAmount(amountCents)
    let matchedAmountText: string | undefined
    let matchEmailMessage: string | undefined
    if (campaign?.isMatching && campaign?.matchMultiplier && !isMonthly) { // matching applies to one-time gifts only
      const matchedCents = amountCents * campaign.matchMultiplier
      matchedAmountText = formatAmount(matchedCents)
      const matchTemplate =
        campaign.matchEmailText || "Your gift of {amount} will be matched to {matchedAmount}!"
      matchEmailMessage = matchTemplate
        .replace(/\{\s*amount\s*\}/gi, formattedAmount)
        .replace(/\{\s*matched[\s_]*amount\s*\}/gi, matchedAmountText)
    }

    // Merge tags applied to the campaign's own body text — body may contain
    // intentional HTML (links, bold, etc.) so it is NOT escaped.
    const mergedBody = applyMergeTags(rawBody, {
      donorName: escapeHtml(donorInfo.name),
      amount: formattedAmount,
      campaignName: escapeHtml(campaignName),
      matchedAmount: matchedAmountText,
    })
    // Blank lines in Junita's plain-text body become real paragraph spacing
    const emailBody = formatBodyText(mergedBody)

    const fullBannerUrl = bannerUrl.startsWith("http")
      ? bannerUrl
      : `${process.env.NEXT_PUBLIC_BASE_URL || "https://gcmm.ca"}${bannerUrl}`

    const mailOptions = {
      from: `"${orgName}" <${process.env.SMTP_USER}>`,
      to: donorInfo.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff;">
          <!-- Banner Image -->
          <div style="width: 100%; margin-bottom: 30px; line-height: 0;">
            <img src="${fullBannerUrl}" alt="${escapeHtml(orgName)}" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0; outline: none;" />
          </div>

          <div style="padding: 0 20px;">
            <!-- Campaign Email Body: one flexible block, written whole in Plasmic -->
            <div style="color: #1e293b; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
              ${emailBody}
            </div>

            <!-- Matching campaign highlight, only rendered if applicable -->
            ${
              matchEmailMessage
                ? `<div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 8px; margin: 0 0 24px 0;">
                     <p style="color: #065f46; margin: 0; font-size: 16px; font-weight: 600;">
                       ${matchEmailMessage}
                     </p>
                   </div>`
                : ""
            }

            <!-- Signature block: one shared element, never duplicated -->
            <p style="color: #1e293b; margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; font-style: italic;">
              With gratitude,
            </p>
            <p style="color: #1e293b; margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; font-weight: 600;">
              ${escapeHtml(signatureName)}
            </p>
            <p style="color: #64748b; margin: 0 0 30px 0; font-size: 15px; line-height: 1.6;">
              ${escapeHtml(signatureTitle)}
            </p>

            <!-- Transaction Details Box (fully dynamic from Stripe, unchanged) -->
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #475569; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Transaction Details</h3>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Amount:</strong> ${escapeHtml(formattedAmount)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Purpose:</strong> ${escapeHtml(campaignName)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Transaction ID:</strong> ${escapeHtml(paymentIntentId)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Date:</strong> ${formatDateCA()}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Payment Method:</strong> **** **** **** ${escapeHtml(lastFour)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Frequency:</strong> ${isMonthly ? "Monthly (recurring)" : "One-time"}</p>
              ${accountId ? `<p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Account ID:</strong> ${escapeHtml(accountId)}</p>` : ""}
            </div>

            <!-- Shared footer content: same for every campaign -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              Your official tax receipt for your total annual contributions will be issued by the end of February, next year and sent to the email or mailing address we have on file. Kindly note that for E-transfer donations, a mailing address is required in order to generate a tax receipt, even if the receipt itself is delivered by email.
            </p>
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              For assistance or questions about your donation, please email ${escapeHtml(orgEmail)} or call ${escapeHtml(orgPhone)} and our staff will be happy to assist you.
            </p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 13px; line-height: 1.5;">
                <strong>${escapeHtml(orgName)}</strong>
              </p>
              <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.5;">
                Registered Canadian Charity: ${escapeHtml(charityNumber)}<br>
                ${escapeHtml(orgAddress)}
              </p>
            </div>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Confirmation email sent successfully to:", donorInfo.email)
  } catch (error) {
    console.error("Error sending confirmation email:", error)
  }
}

// Send notification email to the organization (unchanged in structure, just reads campaign.name)
async function sendNotificationEmail(
  donorInfo: any,
  paymentIntentId: string,
  amountCents: number,
  accountId: string | undefined,
  emailCustomization: EmailCustomization | undefined,
  comment: string | undefined,
  frequency: string | undefined
) {
  try {
    const transporter = createTransporter()
    const ec = emailCustomization
    const notificationRecipient = ec?.notificationEmailRecipient || process.env.CONTACT_EMAIL || "info@gcmm.ca"
    const orgName = ec?.organizationName || "Great Commission Media Ministries"
    const campaign = ec?.campaign
    const campaignName = campaign?.name || "Not specified"
    const formattedAmount = formatAmount(amountCents)
    const isMonthly = frequency === "monthly"

    let matchedAmountText: string | undefined
    if (campaign?.isMatching && campaign?.matchMultiplier && !isMonthly) { // matching applies to one-time gifts only
      matchedAmountText = formatAmount(amountCents * campaign.matchMultiplier)
    }

    const mailOptions = {
      from: `"${orgName}" <${process.env.SMTP_USER}>`,
      to: notificationRecipient,
      subject: `New Donation Received - ${formattedAmount}${accountId ? ` (Account: ${escapeHtml(accountId)})` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">New Donation Received</h2>
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Donation Details</h3>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Amount:</strong> ${escapeHtml(formattedAmount)}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Campaign:</strong> ${escapeHtml(campaignName)}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Frequency:</strong> ${isMonthly ? "Monthly (recurring)" : "One-time"}</p>
              ${
                matchedAmountText
                  ? `<p style="color: #059669; margin: 5px 0; font-size: 16px;"><strong>🎉 Matching:</strong> This gift will be matched to ${escapeHtml(matchedAmountText)}</p>`
                  : ""
              }
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Transaction ID:</strong> ${escapeHtml(paymentIntentId)}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Date:</strong> ${formatDateCA()}</p>
              ${accountId ? `<p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Account ID:</strong> ${escapeHtml(accountId)}</p>` : ""}
            </div>
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Donor Information</h3>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Name:</strong> ${escapeHtml(donorInfo.name)}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Email:</strong> ${escapeHtml(donorInfo.email)}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> ${escapeHtml(donorInfo.phone || "Not provided")}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Address:</strong> ${escapeHtml(donorInfo.address)}, ${escapeHtml(donorInfo.city)}, ${escapeHtml(donorInfo.state)} ${escapeHtml(donorInfo.zip_code)}</p>
            </div>

            ${
              comment && comment.trim()
                ? `<div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                     <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">💬 Message from Donor</h3>
                     <p style="color: #78350f; margin: 0; font-size: 16px; white-space: pre-wrap;">${escapeHtml(comment)}</p>
                   </div>`
                : ""
            }
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                This notification was sent from the ${escapeHtml(orgName)} donation system on ${formatDateCA()}.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Notification email sent successfully to:", notificationRecipient)
  } catch (error) {
    console.error("Error sending notification email:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      currency = "cad",
      payment_method_id,
      donor_info,
      frequency,
      comment,
      account_id,
      email_customization,
    }: {
      amount: number
      currency?: string
      payment_method_id: string
      donor_info: any
      frequency?: string
      comment?: string
      account_id?: string
      email_customization?: EmailCustomization
    } = await request.json()

    console.log("[v0] Received payment method ID:", payment_method_id)
    console.log("[v0] Account ID:", account_id)
    console.log("[v0] Campaign:", email_customization?.campaign?.name)
    console.log(
      "[v0] Stripe secret key environment:",
      process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ? "TEST" : "LIVE",
    )

    if (!amount || !payment_method_id || !donor_info) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const campaignName = email_customization?.campaign?.name || "General Ministry Support"

    let paymentMethod
    try {
      paymentMethod = await stripe.paymentMethods.retrieve(payment_method_id)
    } catch (error: any) {
      console.error("Payment method retrieval error:", error)
      if (error.code === "resource_missing" && error.message.includes("connected accounts")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Payment method environment mismatch. Please ensure your Stripe publishable and secret keys are from the same environment (both test or both live).",
          },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { success: false, error: "Invalid payment method. Please try again." },
        { status: 400 }
      )
    }

    // ── MONTHLY SUBSCRIPTION FLOW ─────────────────────────────────────────────
    // FIX: Same bug as the old live route — the code charged a one-time
    // PaymentIntent first (no customer), then tried to attach the already-used
    // card to a new customer. Stripe forbids that, so subscription creation
    // failed on every monthly donation and the error was silently swallowed.
    // Now: customer FIRST, card attached, subscription makes the first charge.
    if (frequency === "monthly") {
      try {
        const customer = await stripe.customers.create({
          email: donor_info.email,
          name: donor_info.name,
          phone: donor_info.phone,
          address: {
            line1: donor_info.address,
            city: donor_info.city,
            state: donor_info.state,
            postal_code: donor_info.zip_code,
            country: donor_info.country || "CA", // respect form country, default CA
          },
          payment_method: payment_method_id,
          invoice_settings: { default_payment_method: payment_method_id },
          metadata: { campaign: campaignName, account_id: account_id || "" },
        })

        const orgName = email_customization?.organizationName || "Great Commission Media Ministries"
        const price = await getOrCreateMonthlyPrice(amount, currency, campaignName, orgName)

        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: price.id }],
          default_payment_method: payment_method_id,
          payment_behavior: "default_incomplete",
          payment_settings: { save_default_payment_method: "on_subscription" },
          expand: ["latest_invoice.payment_intent"],
          metadata: {
            donor_name: donor_info.name,
            donor_email: donor_info.email,
            donor_phone: donor_info.phone || "",
            frequency: "monthly",
            comment: comment || "",
            campaign: campaignName,
            account_id: account_id || "",
          },
        })

        const invoice = subscription.latest_invoice as Stripe.Invoice
        let subPaymentIntent = invoice.payment_intent as Stripe.PaymentIntent
        if (!subPaymentIntent) {
          throw new Error("No payment intent found on subscription invoice")
        }

        // Give the dashboard entry the same readable description as one-time gifts
        await stripe.paymentIntents.update(subPaymentIntent.id, {
          description: `Donation from ${donor_info.name} - Monthly (${campaignName})${account_id ? ` (Account: ${account_id})` : ""}`,
          metadata: {
            donor_name: donor_info.name,
            donor_email: donor_info.email,
            donor_phone: donor_info.phone || "",
            frequency: "monthly",
            comment: comment || "",
            campaign: campaignName,
            account_id: account_id || "",
          },
        })

        const subConfirmParams: Stripe.PaymentIntentConfirmParams = {
          payment_method: payment_method_id,
        }
        if (request.headers.get("origin")) {
          subConfirmParams.return_url = `${request.headers.get("origin")}/donation-success`
        }
        subPaymentIntent = await stripe.paymentIntents.confirm(subPaymentIntent.id, subConfirmParams)

        if (subPaymentIntent.status === "requires_action") {
          return NextResponse.json({
            success: true,
            requires_action: true,
            client_secret: subPaymentIntent.client_secret,
            payment_intent_id: subPaymentIntent.id,
            subscription_id: subscription.id,
            customer_id: customer.id,
            account_id,
          })
        }

        if (subPaymentIntent.status === "succeeded") {
          console.log("[v0] Monthly subscription created successfully:", subscription.id)

          await Promise.all([
            sendConfirmationEmail(
              donor_info,
              subPaymentIntent.id,
              subPaymentIntent.amount,
              account_id,
              email_customization,
              frequency
            ),
            sendNotificationEmail(
              donor_info,
              subPaymentIntent.id,
              subPaymentIntent.amount,
              account_id,
              email_customization,
              comment,
              frequency
            ),
          ])

          return NextResponse.json({
            success: true,
            payment_intent_id: subPaymentIntent.id,
            subscription_id: subscription.id,
            customer_id: customer.id,
            amount: subPaymentIntent.amount,
            currency: subPaymentIntent.currency,
            status: subPaymentIntent.status,
            account_id,
            frequency: "monthly",
          })
        }

        // Payment did not succeed — cancel the incomplete subscription so it
        // doesn't linger, and tell the donor honestly.
        await stripe.subscriptions.cancel(subscription.id).catch(() => {})
        return NextResponse.json(
          {
            success: false,
            error: "Monthly donation payment failed. You have not been charged.",
            status: subPaymentIntent.status,
            account_id,
          },
          { status: 400 }
        )
      } catch (subscriptionError: any) {
        // FIX: no more silent failure — nothing has been charged if we get here.
        console.error("Error creating monthly subscription:", subscriptionError)
        if (subscriptionError.type === "StripeCardError") {
          return NextResponse.json(
            { success: false, error: subscriptionError.message },
            { status: 400 }
          )
        }
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't set up your monthly donation. You have not been charged. Please try again or contact info@gcmm.ca.",
            account_id,
          },
          { status: 400 }
        )
      }
    }

    // ── ONE-TIME PAYMENT FLOW ─────────────────────────────────────────────────
    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      payment_method: payment_method_id,
      confirmation_method: "manual",
      description: `Donation from ${donor_info.name} - ${frequency === "monthly" ? "Monthly" : "One-time"} (${campaignName})${account_id ? ` (Account: ${account_id})` : ""}`,
      metadata: {
        donor_name: donor_info.name,
        donor_email: donor_info.email,
        donor_phone: donor_info.phone || "",
        frequency: frequency || "one-time",
        comment: comment || "",
        campaign: campaignName,
        account_id: account_id || "",
      },
      shipping: {
        name: donor_info.name,
        address: {
          line1: donor_info.address,
          city: donor_info.city,
          state: donor_info.state,
          postal_code: donor_info.zip_code,
          country: donor_info.country || "CA", // respect form country, default CA
        },
      },
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData)

    let confirmedPaymentIntent
    try {
      const confirmParams: Stripe.PaymentIntentConfirmParams = {
        payment_method: payment_method_id,
      }
      if (request.headers.get("origin")) {
        confirmParams.return_url = `${request.headers.get("origin")}/donation-success`
      }
      confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, confirmParams)
    } catch (error: any) {
      console.error("Payment confirmation error:", error)
      return NextResponse.json(
        { success: false, error: error.message || "Payment confirmation failed" },
        { status: 400 }
      )
    }

    if (confirmedPaymentIntent.status === "requires_action") {
      return NextResponse.json({
        success: true,
        requires_action: true,
        client_secret: confirmedPaymentIntent.client_secret,
        payment_intent_id: confirmedPaymentIntent.id,
        account_id,
      })
    } else if (confirmedPaymentIntent.status === "succeeded") {
      await Promise.all([
        sendConfirmationEmail(
          donor_info,
          confirmedPaymentIntent.id,
          confirmedPaymentIntent.amount,
          account_id,
          email_customization,
          frequency
        ),
        sendNotificationEmail(
          donor_info,
          confirmedPaymentIntent.id,
          confirmedPaymentIntent.amount,
          account_id,
          email_customization,
          comment,
          frequency
        ),
      ])

      // (Monthly donations are handled earlier via the subscription flow —
      // they never reach this point.)

      return NextResponse.json({
        success: true,
        payment_intent_id: confirmedPaymentIntent.id,
        amount: confirmedPaymentIntent.amount,
        currency: confirmedPaymentIntent.currency,
        status: confirmedPaymentIntent.status,
        account_id,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Payment failed",
          status: confirmedPaymentIntent.status,
          account_id,
        },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error("Stripe donation error:", error)
    if (error.type === "StripeCardError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
