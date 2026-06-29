import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.gcmm.ca",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email password or app password
      },
    })

    // Email to your organization
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || "info@gcmm.ca", // Where you want to receive messages
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">New Contact Form Message</h2>
            
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">From:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Email:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px;">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Message:</h3>
              <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                This message was sent from the GCM Ministries contact form on ${new Date().toLocaleString()}.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting GCM Ministries",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Thank You for Contacting Us</h2>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Dear ${name},
            </p>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to Great Commission Media Ministries. We have received your message and appreciate you taking the time to contact us.
            </p>
            
            <p style="color: #64748b; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">
              Our team will review your message and respond within 24 hours during business days. If your inquiry is urgent, please feel free to call us at 1 (877) 674-5630.
            </p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #f1f5f9; border-radius: 6px;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Your Message:</h3>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
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

    // Send both emails
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(autoReplyOptions)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}