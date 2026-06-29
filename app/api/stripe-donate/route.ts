import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import nodemailer from "nodemailer"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// Function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return "127.0.0.1" // Fallback
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
  purpose?: string
) {
  try {
    const transporter = createTransporter()

    // Retrieve the payment intent with charges expanded
    const paymentIntent = (await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["charges"],
    })) as Stripe.PaymentIntent & { charges?: Stripe.ApiList<Stripe.Charge> }

    const lastFour = paymentIntent.charges?.data?.[0]?.payment_method_details?.card?.last4 || "N/A"

    // Use customization values or fall back to defaults
    const subject = emailCustomization?.subject || "Thank you for your donation"
    const bannerUrl = emailCustomization?.banner_url || "/images/email-banner.png"
    const orgName = emailCustomization?.organization_name || "Great Commission Media Ministries"
    const orgPhone = emailCustomization?.organization_phone || "1-877-674-5630"
    const orgEmail = emailCustomization?.organization_email || "info@gcmm.ca"
    const orgAddress = emailCustomization?.organization_address || "PO Box 14006, Abbotsford, BC V2T 0B4"
    const charityNumber = emailCustomization?.charity_number || "12345 6789 RR0001"

    // Email content lines
    const greeting = emailCustomization?.greeting || "Dear [Donor Name],"
    const line2 = emailCustomization?.line2 || "Thank you for your generous donation of [$xx] for [Donation field]."
    const line3 = emailCustomization?.line3 || "Your support is helping provide urgent aid to families affected by the war with food and life-saving wood-burning stoves that bring warmth, dignity, and strength in the harsh winter, along with medical supplies and ambulances."
    
    // Check for purpose-specific Line 3 override
    let purposeSpecificLine3 = line3
    if (purpose && emailCustomization) {
      // Try different key formats to match how the data is sent
      const purposeKeys = [
        `purposeMessage${purpose.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`, // e.g., purposeMessageUkraineRelief
        `purpose_message_${purpose.replace(/-/g, '_')}`, // e.g., purpose_message_ukraine_relief
        purpose.replace(/-/g, '_'), // e.g., ukraine_relief
      ]
      
      for (const key of purposeKeys) {
        if (emailCustomization[key]) {
          purposeSpecificLine3 = emailCustomization[key]
          break
        }
      }
    }
    
    // Helper: resolve purpose-specific override for any email line
    function resolvePurposeOverride(baseValue: string, prefix: string): string {
      if (!purpose || !emailCustomization) return baseValue
      const purposeSuffix = purpose.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
      const key = `${prefix}${purposeSuffix}`
      return emailCustomization[key] || baseValue
    }

    const line4Base = emailCustomization?.line4 || "If you're willing, could you tell us how you first heard about GCMM or UkraineAid? A quick reply—\"TV,\" \"magazine,\" \"friend,\" \"online,\" etc.—helps us understand what's reaching people and helps us reach more families in need. Please reply to this email or write to info@gcmm.ca."
    const line5 = emailCustomization?.line5 || "For GCMM information, please visit gcmm.ca. For Ukraine updates and Ukraine-focused giving, visit UkraineAidToday.ca. You can also follow us on social media @GreatCommissionMediaMinistries."
    const line6Base = emailCustomization?.line6 || "Thank you again for standing with the people of Ukraine this Christmas."
    const signatureNameBase = emailCustomization?.signature_name || "Dr. Hannu Haukka"
    const signatureTitleBase = emailCustomization?.signature_title || "CEO, Great Commission Media Ministries (GCMM)"
    const line9 = emailCustomization?.line9 || "Your official tax receipt for your total year's giving will be mailed to the address you provided on or before February 28."
    const line10 = emailCustomization?.line10 || `For assistance or questions about your donation, please email ${orgEmail} or call ${orgPhone}.`
    const line11 = emailCustomization?.line11 || `UkraineAid is the humanitarian outreach of Great Commission Media Ministries (GCMM), a registered Canadian charity (No. ${charityNumber}), serving in Ukraine for over 35 years.`

    // Resolve purpose-specific overrides for lines 4, 6, 7, 8
    const line4 = resolvePurposeOverride(line4Base, "purposeLine4")
    const line6 = resolvePurposeOverride(line6Base, "purposeClosing")
    const signatureName = resolvePurposeOverride(signatureNameBase, "purposeSignatureName")
    const signatureTitle = resolvePurposeOverride(signatureTitleBase, "purposeSignatureTitle")

    // Map purpose codes to Plasmic custom labels, falling back to defaults
    const defaultPurposeLabels: Record<string, string> = {
      general: "General Ministry Support",
      "ukraine-relief": "Ukraine Relief Efforts",
      "ukraine-gospel": "Spreading the Gospel in Ukraine",
      "radio-ministry": "Radio Ministry Expansion",
      literature: "Christian Literature Distribution",
      persecution: "Supporting Persecuted Christians",
      youth: "Youth Ministry Programs",
      emergency: "Emergency Relief Fund",
    }

    // Use custom labels from Plasmic email_customization if available
    const plasmicPurposeLabels: Record<string, string> = {}
    if (emailCustomization) {
      if (emailCustomization.generalMinistryLabel) plasmicPurposeLabels.general = emailCustomization.generalMinistryLabel
      if (emailCustomization.ukraineReliefLabel) plasmicPurposeLabels["ukraine-relief"] = emailCustomization.ukraineReliefLabel
      if (emailCustomization.ukraineGospelLabel) plasmicPurposeLabels["ukraine-gospel"] = emailCustomization.ukraineGospelLabel
      if (emailCustomization.radioMinistryLabel) plasmicPurposeLabels["radio-ministry"] = emailCustomization.radioMinistryLabel
      if (emailCustomization.literatureLabel) plasmicPurposeLabels.literature = emailCustomization.literatureLabel
      if (emailCustomization.persecutionLabel) plasmicPurposeLabels.persecution = emailCustomization.persecutionLabel
      if (emailCustomization.youthLabel) plasmicPurposeLabels.youth = emailCustomization.youthLabel
      if (emailCustomization.emergencyLabel) plasmicPurposeLabels.emergency = emailCustomization.emergencyLabel
    }

    const purposeLabels = { ...defaultPurposeLabels, ...plasmicPurposeLabels }

    const purposeLabel = purpose ? purposeLabels[purpose] || purpose : "General Ministry Support"

    // Replace placeholders
    const formattedAmount = `$${(amount / 100).toFixed(2)}`
    const processedGreeting = greeting.replace("[Donor Name]", donorInfo.name)
    const processedLine2 = line2
      .replace("[$xx]", formattedAmount)
      .replace("[Donation field]", purposeLabel)

    // Build the full banner URL if it's a relative path
    const fullBannerUrl = bannerUrl.startsWith('http') 
      ? bannerUrl 
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gcmm.ca'}${bannerUrl}`

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: donorInfo.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff;">
          <!-- Banner Image - Auto-sized to email width -->
          <div style="width: 100%; margin-bottom: 30px; line-height: 0;">
            <img src="${fullBannerUrl}" alt="${orgName}" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0; outline: none;" />
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
            
            <!-- Line 3: Impact Statement -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${purposeSpecificLine3}
            </p>
            
            <!-- Line 4: Feedback Request -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line4}
            </p>
            
            <!-- Line 5: Information Links -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line5}
            </p>
            
            <!-- Line 6: Closing Thank You -->
            <p style="color: #1e293b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
              ${line6}
            </p>
            
            <!-- Line 7 & 8: Signature -->
            <p style="color: #1e293b; margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; font-weight: 600;">
              ${signatureName}
            </p>
            <p style="color: #64748b; margin: 0 0 30px 0; font-size: 15px; line-height: 1.6;">
              ${signatureTitle}
            </p>
            
            <!-- Transaction Details Box -->
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #475569; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Transaction Details</h3>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Amount:</strong> ${formattedAmount}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Purpose:</strong> ${purposeLabel}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Transaction ID:</strong> ${paymentIntentId}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Payment Method:</strong> **** **** **** ${lastFour}</p>
              ${accountId ? `<p style="color: #64748b; margin: 4px 0; font-size: 14px;"><strong>Account ID:</strong> ${accountId}</p>` : ""}
            </div>
            
            <!-- Line 9: Tax Receipt Notice -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line9}
            </p>
            
            <!-- Line 10: Contact for Assistance -->
            <p style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
              ${line10}
            </p>
            
            <!-- Line 11: Organization Description -->
            <p style="color: #64748b; margin: 0 0 30px 0; font-size: 14px; line-height: 1.6; font-style: italic;">
              ${line11}
            </p>
            
            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 13px; line-height: 1.5;">
                <strong>${orgName}</strong>
              </p>
              <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.5;">
                ${orgAddress}<br>
                Phone: ${orgPhone} | Email: ${orgEmail}
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

    // Use custom notification recipient or fall back to default
    const notificationRecipient =
      emailCustomization?.notification_email_recipient || process.env.CONTACT_EMAIL || "info@gcmm.ca"

    const orgName = emailCustomization?.organization_name || "Great Commission Media Ministries"

    // Map purpose codes to Plasmic custom labels, falling back to defaults
    const defaultPurposeLabels: Record<string, string> = {
      general: "General Ministry Support",
      "ukraine-relief": "Ukraine Relief Efforts",
      "ukraine-gospel": "Spreading the Gospel in Ukraine",
      "radio-ministry": "Radio Ministry Expansion",
      literature: "Christian Literature Distribution",
      persecution: "Supporting Persecuted Christians",
      youth: "Youth Ministry Programs",
      emergency: "Emergency Relief Fund",
    }

    // Use custom labels from Plasmic email_customization if available
    const plasmicPurposeLabels: Record<string, string> = {}
    if (emailCustomization) {
      if (emailCustomization.generalMinistryLabel) plasmicPurposeLabels.general = emailCustomization.generalMinistryLabel
      if (emailCustomization.ukraineReliefLabel) plasmicPurposeLabels["ukraine-relief"] = emailCustomization.ukraineReliefLabel
      if (emailCustomization.ukraineGospelLabel) plasmicPurposeLabels["ukraine-gospel"] = emailCustomization.ukraineGospelLabel
      if (emailCustomization.radioMinistryLabel) plasmicPurposeLabels["radio-ministry"] = emailCustomization.radioMinistryLabel
      if (emailCustomization.literatureLabel) plasmicPurposeLabels.literature = emailCustomization.literatureLabel
      if (emailCustomization.persecutionLabel) plasmicPurposeLabels.persecution = emailCustomization.persecutionLabel
      if (emailCustomization.youthLabel) plasmicPurposeLabels.youth = emailCustomization.youthLabel
      if (emailCustomization.emergencyLabel) plasmicPurposeLabels.emergency = emailCustomization.emergencyLabel
    }

    const purposeLabels = { ...defaultPurposeLabels, ...plasmicPurposeLabels }

    const purposeLabel = purpose ? purposeLabels[purpose] || purpose : "Not specified"

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: notificationRecipient,
      subject: `New Donation Received - $${(amount / 100).toFixed(2)}${accountId ? ` (Account: ${accountId})` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">New Donation Received</h2>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Donation Details</h3>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Purpose:</strong> ${purposeLabel}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Transaction ID:</strong> ${paymentIntentId}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              ${accountId ? `<p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Account ID:</strong> ${accountId}</p>` : ""}
            </div>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #475569; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Donor Information</h3>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Name:</strong> ${donorInfo.name}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Email:</strong> ${donorInfo.email}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> ${donorInfo.phone || "Not provided"}</p>
              <p style="color: #64748b; margin: 5px 0; font-size: 16px;"><strong>Address:</strong> ${donorInfo.address}, ${donorInfo.city}, ${donorInfo.state} ${donorInfo.zip_code}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                This notification was sent from the ${orgName} donation system on ${new Date().toLocaleString()}.
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

    // Get client IP
    const clientIP = getClientIP(request)

    // Resolve purpose code to human-readable label for Stripe metadata
    const defaultPurposeLabels: Record<string, string> = {
      general: "General Ministry Support",
      "ukraine-relief": "Ukraine Relief Efforts",
      "ukraine-gospel": "Spreading the Gospel in Ukraine",
      "radio-ministry": "Radio Ministry Expansion",
      literature: "Christian Literature Distribution",
      persecution: "Supporting Persecuted Christians",
      youth: "Youth Ministry Programs",
      emergency: "Emergency Relief Fund",
    }
    const plasmicPurposeLabels: Record<string, string> = {}
    if (email_customization) {
      if (email_customization.generalMinistryLabel) plasmicPurposeLabels.general = email_customization.generalMinistryLabel
      if (email_customization.ukraineReliefLabel) plasmicPurposeLabels["ukraine-relief"] = email_customization.ukraineReliefLabel
      if (email_customization.ukraineGospelLabel) plasmicPurposeLabels["ukraine-gospel"] = email_customization.ukraineGospelLabel
      if (email_customization.radioMinistryLabel) plasmicPurposeLabels["radio-ministry"] = email_customization.radioMinistryLabel
      if (email_customization.literatureLabel) plasmicPurposeLabels.literature = email_customization.literatureLabel
      if (email_customization.persecutionLabel) plasmicPurposeLabels.persecution = email_customization.persecutionLabel
      if (email_customization.youthLabel) plasmicPurposeLabels.youth = email_customization.youthLabel
      if (email_customization.emergencyLabel) plasmicPurposeLabels.emergency = email_customization.emergencyLabel
    }
    const allPurposeLabels = { ...defaultPurposeLabels, ...plasmicPurposeLabels }
    const purposeLabel = purpose ? allPurposeLabels[purpose] || purpose : "General Ministry Support"

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
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment method. Please try again.",
        },
        { status: 400 },
      )
    }

    // Create payment intent without immediate confirmation
    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount: amount,
      currency: currency,
      payment_method: payment_method_id,
      confirmation_method: "manual",
      description: `Donation from ${donor_info.name} - ${frequency === "monthly" ? "Monthly" : "One-time"}${purposeLabel ? ` (${purposeLabel})` : ""}${account_id ? ` (Account: ${account_id})` : ""}`,
      metadata: {
        donor_name: donor_info.name,
        donor_email: donor_info.email,
        donor_phone: donor_info.phone || "",
        frequency: frequency,
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
          country: donor_info.country || "US",
        },
      },
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData)

    let confirmedPaymentIntent
    try {
      const confirmParams: Stripe.PaymentIntentConfirmParams = {
        payment_method: payment_method_id,
      }

      // Add return_url for 3D Secure authentication if origin is available
      if (request.headers.get("origin")) {
        confirmParams.return_url = `${request.headers.get("origin")}/donation-success`
      }

      confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, confirmParams)
    } catch (error: any) {
      console.error("Payment confirmation error:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Payment confirmation failed",
        },
        { status: 400 },
      )
    }

    // Handle different payment states
    if (confirmedPaymentIntent.status === "requires_action") {
      // 3D Secure authentication required
      return NextResponse.json({
        success: true,
        requires_action: true,
        client_secret: confirmedPaymentIntent.client_secret,
        payment_intent_id: confirmedPaymentIntent.id,
        account_id: account_id,
      })
    } else if (confirmedPaymentIntent.status === "succeeded") {
      // Payment succeeded immediately

      // Send confirmation emails with customization
      await Promise.all([
        sendConfirmationEmail(
          donor_info,
          confirmedPaymentIntent.id,
          confirmedPaymentIntent.amount,
          account_id,
          email_customization,
          purpose
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

      // If monthly donation, create a customer and subscription
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
              country: donor_info.country || "US",
            },
            payment_method: payment_method_id,
            invoice_settings: {
              default_payment_method: payment_method_id,
            },
            metadata: {
              purpose: purpose || "",
              account_id: account_id || "",
            },
          })

          // Create a price for the subscription
          const price = await stripe.prices.create({
            unit_amount: amount,
            currency: currency,
            recurring: {
              interval: "month",
            },
            product_data: {
              name: `Monthly Donation to ${email_customization?.organization_name || "GCMM"}${purpose ? ` - ${purpose}` : ""}`,
            },
          })

          // Create the subscription
          const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: price.id }],
            default_payment_method: payment_method_id,
            metadata: {
              donor_name: donor_info.name,
              donor_email: donor_info.email,
              comment: comment || "",
              purpose: purpose || "",
              account_id: account_id || "",
            },
          })

          console.log("[v0] Monthly subscription created successfully:", subscription.id)

          return NextResponse.json({
            success: true,
            payment_intent_id: confirmedPaymentIntent.id,
            subscription_id: subscription.id,
            customer_id: customer.id,
            amount: confirmedPaymentIntent.amount,
            currency: confirmedPaymentIntent.currency,
            status: confirmedPaymentIntent.status,
            account_id: account_id,
            frequency: "monthly",
          })
        } catch (subscriptionError) {
          console.error("Error creating subscription:", subscriptionError)
          // Still return success for the one-time payment
          return NextResponse.json({
            success: true,
            payment_intent_id: confirmedPaymentIntent.id,
            amount: confirmedPaymentIntent.amount,
            currency: confirmedPaymentIntent.currency,
            status: confirmedPaymentIntent.status,
            subscription_error: "Monthly subscription setup failed, but one-time payment succeeded",
            account_id: account_id,
          })
        }
      }

      return NextResponse.json({
        success: true,
        payment_intent_id: confirmedPaymentIntent.id,
        amount: confirmedPaymentIntent.amount,
        currency: confirmedPaymentIntent.currency,
        status: confirmedPaymentIntent.status,
        account_id: account_id,
      })
    } else {
      // Payment failed
      return NextResponse.json(
        {
          success: false,
          error: "Payment failed",
          status: confirmedPaymentIntent.status,
          account_id: account_id,
        },
        { status: 400 },
      )
    }
  } catch (error: any) {
    console.error("Stripe donation error:", error)

    if (error.type === "StripeCardError") {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}