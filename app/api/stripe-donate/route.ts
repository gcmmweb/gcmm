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
 * Do NOT use on Plasmic body-copy lines — those may contain intentional
 * HTML links and formatting.
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

/**
 * Resolve a purpose-specific override for a given email line.
 * Key convention: `{prefix}{PurposeSuffix}` (camelCase)
 * Example: resolvePurposeOverride(base, "purposeLine3", "ukraine-gospel", ec)
 *   → looks for ec["purposeLine3UkraineGospel"]
 */
function resolvePurposeOverride(
  baseValue: string,
  prefix: string,
  purpose?: string,
  ec?: Record<string, string>
): string {
  if (!purpose || !ec) return baseValue
  const suffix = purpose
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
  return ec[`${prefix}${suffix}`] || baseValue
}

/**
 * Build the merged purpose label map: defaults + any Plasmic overrides.
 * Single source of truth — called once per request, used everywhere.
 */
function buildPurposeLabels(ec?: Record<string, string>): Record<string, string> {
  const defaults: Record<string, string> = {
    general: "General Ministry Support",
    "ukraine-relief": "Ukraine Relief Efforts",
    "ukraine-gospel": "Spreading the Gospel in Ukraine",
    "radio-ministry": "Radio Ministry Expansion",
    literature: "Christian Literature Distribution",
    persecution: "Supporting Persecuted Christians",
    youth: "Youth Ministry Programs",
    emergency: "Emergency Relief Fund",
  }
  if (!ec) return defaults
  const overrides: Record<string, string> = {}
  if (ec.generalMinistryLabel) overrides.general = ec.generalMinistryLabel
  if (ec.ukraineReliefLabel) overrides["ukraine-relief"] = ec.ukraineReliefLabel
  if (ec.ukraineGospelLabel) overrides["ukraine-gospel"] = ec.ukraineGospelLabel
  if (ec.radioMinistryLabel) overrides["radio-ministry"] = ec.radioMinistryLabel
  if (ec.literatureLabel) overrides.literature = ec.literatureLabel
  if (ec.persecutionLabel) overrides.persecution = ec.persecutionLabel
  if (ec.youthLabel) overrides.youth = ec.youthLabel
  if (ec.emergencyLabel) overrides.emergency = ec.emergencyLabel
  return { ...defaults, ...overrides }
}

/**
 * Reuse existing monthly Price objects instead of creating a new one for every
 * donation (which clutters the Stripe dashboard with duplicates).
 * Uses a deterministic lookup_key: e.g. "monthly_ukraine-relief_cad_500"
 */
async function getOrCreateMonthlyPrice(
  amount: number,
  currency: string,
  purpose: string | undefined,
  orgName: string
): Promise<Stripe.Price> {
  const safePurpose = (purpose || "general").toLowerCase().replace(/[^a-z0-9-]/g, "")
  const lookupKey = `monthly_${safePurpose}_${currency.toLowerCase()}_${amount}`

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
      name: `Monthly Donation to ${orgName}${purpose ? ` - ${purpose}` : ""}`,
    },
  })
}

// Function to get client IP address
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

// Send confirmation email with customization
async function sendConfirmationEmail(
  donorInfo: any,
  paymentIntentId: string,
  amount: number,
  accountId?: string,
  emailCustomization?: any,
  purpose?: string,
  frequency?: string
) {
  try {
    const transporter = createTransporter()
    const ec = emailCustomization as Record<string, string> | undefined

    // FIX: expand latest_charge instead of deprecated charges
    const paymentIntent = (await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["latest_charge"],
    })) as Stripe.PaymentIntent & { latest_charge?: Stripe.Charge }
    const lastFour =
      (paymentIntent.latest_charge as Stripe.Charge)?.payment_method_details?.card?.last4 || "N/A"

    const subject = ec?.subject || "Thank you for your donation"
    const bannerUrl = ec?.banner_url || "/images/email-banner.png"
    const orgName = ec?.organization_name || "Great Commission Media Ministries"
    const orgPhone = ec?.organization_phone || "1-877-674-5630"
    const orgEmail = ec?.organization_email || "info@gcmm.ca"
    const orgAddress = ec?.organization_address || "PO Box 14006, Abbotsford, BC V2T 0B4"
    const charityNumber = ec?.charity_number || "12345 6789 RR0001"

    const purposeLabels = buildPurposeLabels(ec)
    const purposeLabel = purpose ? purposeLabels[purpose] || purpose : "General Ministry Support"

    // Email content lines (base values)
    const greeting = ec?.greeting || "Dear [Donor Name],"
    const line2 = ec?.line2 || "Thank you for your generous donation of [$xx] for [Donation field]."
    const line2Monthly = ec?.line2Monthly || "Thank you for your generous monthly gift of [$xx] for [Donation field]. Your recurring support makes a lasting difference every month."
    const line3Base =
      ec?.line3 ||
      "Your support is helping provide urgent aid to families affected by the war with food and life-saving wood-burning stoves that bring warmth, dignity, and strength in the harsh winter, along with medical supplies and ambulances."
    const line4Base =
      ec?.line4 ||
      `If you're willing, could you tell us how you first heard about GCMM or UkraineAid? A quick reply—"TV," "magazine," "friend," "online," etc.—helps us understand what's reaching people and helps us reach more families in need. Please reply to this email or write to info@gcmm.ca.`
    const line5 =
      ec?.line5 ||
      "For GCMM information, please visit gcmm.ca. For Ukraine updates and Ukraine-focused giving, visit UkraineAidToday.ca. You can also follow us on social media @GreatCommissionMediaMinistries."
    const line6Base = ec?.line6 || ""
    // FIX: closing_salutation is its own protected field so it cannot be
    // accidentally removed by purpose-specific overrides
    const closingSalutation = ec?.closing_salutation || "With gratitude,"
    const signatureNameBase = ec?.signature_name || "Dr. Hannu Haukka"
    const signatureTitleBase = ec?.signature_title || "CEO, Great Commission Media Ministries (GCMM)"
    const line9 =
      ec?.line9 ||
      "Your official tax receipt for your total year's giving will be mailed to the address you provided on or before February 28."
    const line10 =
      ec?.line10 ||
      `For assistance or questions about your donation, please email ${orgEmail} or call ${orgPhone}.`
    const line11 =
      ec?.line11 ||
      `UkraineAid is the humanitarian outreach of Great Commission Media Ministries (GCMM), a registered Canadian charity (No. ${charityNumber}), serving in Ukraine for over 35 years.`

    // Resolve purpose-specific overrides — all using the same module-level helper
    const line3 = resolvePurposeOverride(line3Base, "purposeLine3", purpose, ec)
    const line4 = resolvePurposeOverride(line4Base, "purposeLine4", purpose, ec)
    const line6 = resolvePurposeOverride(line6Base, "purposeClosing", purpose, ec)
    const signatureName = resolvePurposeOverride(signatureNameBase, "purposeSignatureName", purpose, ec)
    const signatureTitle = resolvePurposeOverride(signatureTitleBase, "purposeSignatureTitle", purpose, ec)

    const formattedAmount = `$${(amount / 100).toFixed(2)}`
    const processedGreeting = greeting.replace("[Donor Name]", escapeHtml(donorInfo.name))
    const processedLine2 = (frequency === "monthly" ? line2Monthly : line2)
      .replace("[$xx]", escapeHtml(formattedAmount))
      .replace("[Donation field]", escapeHtml(purposeLabel))

    const fullBannerUrl = bannerUrl.startsWith("http")
      ? bannerUrl
      : `${process.env.NEXT_PUBLIC_BASE_URL || "https://gcmm.ca"}${bannerUrl}`

    const mailOptions = {
      // FIX: include display name in From so inbox shows "Great Commission Media Ministries"
      from: `"${orgName}" <${process.env.SMTP_USER}>`,
      to: donorInfo.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff;">
          <!-- Banner Image -->
          <div style="width: 100%; margin-bottom: 30px; line-height: 0;">
            <img src="${fullBannerUrl}" alt="${escapeHtml(orgName)}" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0; outline: none;" />
          </div>

          <!-- Email Content -->
          <div style="padding: 0 20px;">
            <!-- Line 1: Greeting -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${processedGreeting}
            </p>

            <!-- Line 2: Thank You -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${processedLine2}
            </p>

            <!-- Line 3: Impact Statement (may contain Plasmic HTML) -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line3}
            </p>

            <!-- Line 4: Feedback Request (may contain Plasmic HTML) -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line4}
            </p>

            <!-- Line 5: Information Links (may contain Plasmic HTML) -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line5}
            </p>

            <!-- Line 6: Closing Thank You (may contain Plasmic HTML) -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line6}
            </p>

            <!-- Closing Salutation (only shown if set in Plasmic) -->
            ${closingSalutation ? `<p style="color: #1e293b; margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; font-style: italic;">${escapeHtml(closingSalutation)}</p>` : ""}

            <!-- Signature Name & Title -->
            <p style="color: #1e293b; margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; font-weight: 600;">
              ${escapeHtml(signatureName)}
            </p>
            <p style="color: #64748b; margin: 0 0 30px 0; font-size: 15px; line-height: 1.6;">
              ${escapeHtml(signatureTitle)}
            </p>

            <!-- Transaction Details Box -->
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #475569; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Transaction Details</h3>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Amount:</strong> ${escapeHtml(formattedAmount)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Purpose:</strong> ${escapeHtml(purposeLabel)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Transaction ID:</strong> ${escapeHtml(paymentIntentId)}</p>
              <!-- FIX: Canadian date format -->
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Date:</strong> ${formatDateCA()}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Payment Method:</strong> **** **** **** ${escapeHtml(lastFour)}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Frequency:</strong> ${frequency === "monthly" ? "Monthly (recurring)" : "One-time"}</p>
              ${accountId ? `<p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Account ID:</strong> ${escapeHtml(accountId)}</p>` : ""}
            </div>

            <!-- Line 9: Tax Receipt Notice (may contain Plasmic HTML) -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line9}
            </p>

            <!-- Line 10: Contact for Assistance (may contain Plasmic HTML) -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line10}
            </p>

            <!-- Line 11: Organization Description (may contain Plasmic HTML) -->
            <p style="color: #64748b; margin: 0 0 30px 0; font-size: 14px; line-height: 1.6; font-style: italic;">
              ${line11}
            </p>

            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 13px; line-height: 1.5;">
                <strong>${escapeHtml(orgName)}</strong>
              </p>
              <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.5;">
                ${escapeHtml(orgAddress)}<br>
                Phone: ${escapeHtml(orgPhone)} | Email: ${escapeHtml(orgEmail)}
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

// Send notification email to organization
async function sendNotificationEmail(
  donorInfo: any,
  paymentIntentId: string,
  amount: number,
  purpose?: string,
  accountId?: string,
  emailCustomization?: any
) {
  try {
    const transporter = createTransporter()
    const ec = emailCustomization as Record<string, string> | undefined

    const notificationRecipient =
      ec?.notification_email_recipient || process.env.CONTACT_EMAIL || "info@gcmm.ca"
    const orgName = ec?.organization_name || "Great Commission Media Ministries"

    const purposeLabels = buildPurposeLabels(ec)
    const purposeLabel = purpose ? purposeLabels[purpose] || purpose : "Not specified"

    const formattedAmount = `$${(amount / 100).toFixed(2)}`

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
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Purpose:</strong> ${escapeHtml(purposeLabel)}</p>
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
      purpose,
      account_id,
      email_customization,
    } = await request.json()

    console.log("[v0] Received payment method ID:", payment_method_id)
    console.log("[v0] Account ID:", account_id)
    console.log("[v0] Donation purpose:", purpose)
    console.log("[v0] Email customization received:", !!email_customization)
    console.log(
      "[v0] Stripe secret key environment:",
      process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ? "TEST" : "LIVE",
    )

    // Validate required fields
    if (!amount || !payment_method_id || !donor_info) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const clientIP = getClientIP(request)
    const ec = email_customization as Record<string, string> | undefined
    const purposeLabels = buildPurposeLabels(ec)
    const purposeLabel = purpose ? purposeLabels[purpose] || purpose : "General Ministry Support"

    let paymentMethod
    try {
      console.log("[v0] Attempting to retrieve payment method...")
      paymentMethod = await stripe.paymentMethods.retrieve(payment_method_id)
      console.log("[v0] Payment method retrieved successfully:", paymentMethod.id)
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
    // FIX: The old code charged a one-time PaymentIntent first (with no customer),
    // then tried to attach the same card to a new customer for the subscription.
    // Stripe forbids attaching an already-used, unattached payment method, so the
    // subscription creation failed on EVERY live monthly donation — the error was
    // silently swallowed and the donor was never set up as recurring.
    // Now: customer is created FIRST, the card is attached, and the subscription
    // itself makes the first charge. One flow, one charge, recurring works.
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
            country: donor_info.country || "CA", // FIX: respect the country chosen on the form, default CA
          },
          payment_method: payment_method_id,
          invoice_settings: { default_payment_method: payment_method_id },
          metadata: { purpose: purpose || "", account_id: account_id || "" },
        })

        const orgName = ec?.organization_name || "Great Commission Media Ministries"
        const price = await getOrCreateMonthlyPrice(amount, currency, purpose, orgName)

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
            purpose: purposeLabel,
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
          description: `Donation from ${donor_info.name} - Monthly${purposeLabel ? ` (${purposeLabel})` : ""}${account_id ? ` (Account: ${account_id})` : ""}`,
          metadata: {
            donor_name: donor_info.name,
            donor_email: donor_info.email,
            donor_phone: donor_info.phone || "",
            frequency: "monthly",
            comment: comment || "",
            purpose: purposeLabel,
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
              purpose,
              frequency
            ),
            sendNotificationEmail(
              donor_info,
              subPaymentIntent.id,
              subPaymentIntent.amount,
              purpose,
              account_id,
              email_customization
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
        // FIX: no more silent failure — if the subscription can't be created,
        // nothing has been charged, so report an honest error.
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
    // Create payment intent
    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      payment_method: payment_method_id,
      confirmation_method: "manual",
      description: `Donation from ${donor_info.name} - ${frequency === "monthly" ? "Monthly" : "One-time"}${purposeLabel ? ` (${purposeLabel})` : ""}${account_id ? ` (Account: ${account_id})` : ""}`,
      metadata: {
        donor_name: donor_info.name,
        donor_email: donor_info.email,
        donor_phone: donor_info.phone || "",
        frequency,
        comment: comment || "",
        purpose: purposeLabel,
        account_id: account_id || "",
      },
      shipping: {
        name: donor_info.name,
        address: {
          line1: donor_info.address,
          city: donor_info.city,
          state: donor_info.state,
          postal_code: donor_info.zip_code,
          country: donor_info.country || "CA", // FIX: respect the country chosen on the form, default CA
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
      // Send confirmation emails
      await Promise.all([
        sendConfirmationEmail(
          donor_info,
          confirmedPaymentIntent.id,
          confirmedPaymentIntent.amount,
          account_id,
          email_customization,
          purpose,
          frequency
        ),
        sendNotificationEmail(
          donor_info,
          confirmedPaymentIntent.id,
          confirmedPaymentIntent.amount,
          purpose,
          account_id,
          email_customization
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
