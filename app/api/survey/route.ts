import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    console.log("[v0] Survey form submission received:", formData)

    const { name, email, phone, message, dropdown, checkbox } = formData

    // Validate required fields
    if (!name || !email) {
      console.log("[v0] Validation failed: missing name or email")
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const customQuestions: { question: string; answer: string }[] = []
    Object.keys(formData).forEach((key) => {
      if (key.startsWith("question") && !key.includes("Label") && !key.includes("Type")) {
        const questionNumber = key.replace("question", "")
        const questionLabel = formData[`question${questionNumber}Label`] || `Question ${questionNumber}`
        const answer = formData[key]
        if (answer) {
          customQuestions.push({ question: questionLabel, answer })
        }
      }
    })

    console.log("[v0] Extracted custom questions:", customQuestions)

    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("[v0] Missing SMTP credentials in environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    console.log("[v0] Creating SMTP transporter...")

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.gcmm.ca",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
      debug: process.env.NODE_ENV === "development",
      logger: process.env.NODE_ENV === "development",
    })

    try {
      await transporter.verify()
      console.log("[v0] SMTP connection verified successfully")
    } catch (verifyError) {
      console.error("[v0] SMTP verification failed:", verifyError)
      throw new Error(`SMTP connection failed: ${verifyError instanceof Error ? verifyError.message : "Unknown error"}`)
    }

    const customQuestionsHtml =
      customQuestions.length > 0
        ? customQuestions
            .map(
              ({ question, answer }) => `
          <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
            <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">${question}</h3>
            <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${answer}</p>
          </div>
        `,
            )
            .join("")
        : ""

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || "info@gcmm.ca",
      subject: `New Survey Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">New Survey Form Submission</h2>
            
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Name:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Email:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            ${
              phone
                ? `
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Phone:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">${phone}</p>
            </div>
            `
                : ""
            }
            
            ${
              message
                ? `
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Message:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            `
                : ""
            }
            
            ${
              dropdown
                ? `
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Selection:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">${dropdown}</p>
            </div>
            `
                : ""
            }
            
            ${
              checkbox
                ? `
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Agreement:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">✓ Agreed</p>
            </div>
            `
                : ""
            }
            
            ${customQuestionsHtml}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                This message was sent from the GCM Ministries survey form on ${new Date().toLocaleString()}.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for your submission to GCM Ministries",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Thank You for Your Submission</h2>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Dear ${name},
            </p>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Thank you for submitting your information to Great Commission Media Ministries. We have received your submission and appreciate you taking the time to connect with us.
            </p>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Our team will review your submission and respond within 24 hours during business days. If your inquiry is urgent, please feel free to call us at 1 (877) 674-5630.
            </p>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Blessings,<br>
              The GCM Ministries Team
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                Great Commission Media Ministries<br>
                PO Box 14006, Abbotsford, BC V2T 0B4<br>
                Phone: 1 (877) 674-5630<br>
                Email: info@gcmm.ca
              </p>
            </div>
          </div>
        </div>
      `,
    }

    console.log("[v0] Sending emails...")

    // Send both emails
    await transporter.sendMail(mailOptions)
    console.log("[v0] Organization notification email sent successfully")

    await transporter.sendMail(autoReplyOptions)
    console.log("[v0] Auto-reply email sent successfully")

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error sending email:", error)

    if (error instanceof Error) {
      console.error("[v0] Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      })
    }

    return NextResponse.json(
      {
        error: "Failed to send email",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 },
    )
  }
}