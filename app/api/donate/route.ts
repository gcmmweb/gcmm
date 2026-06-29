import { type NextRequest, NextResponse } from "next/server"

// Blackbaud API configuration
const BLACKBAUD_API_BASE = "https://api.sky.blackbaud.com"
const CLIENT_ID = "b8f178dd-8717-4a5c-90ab-31b7a3b1746e"
const CLIENT_SECRET = process.env.BLACKBAUD_CLIENT_SECRET // Your actual secret
const PAYMENT_CONFIG_ID = process.env.BLACKBAUD_PAYMENT_CONFIG_ID // Your payment configuration ID

// Function to get OAuth token
async function getAccessToken() {
  const tokenUrl = `${BLACKBAUD_API_BASE}/oauth2/token`

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET || "",
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to get access token")
  }

  const data = await response.json()
  return data.access_token
}

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { amount, billing_contact, credit_card, csc, email, phone, comment, transaction_category, tokenize } = body

    if (!amount || !billing_contact || !credit_card) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get access token
    const accessToken = await getAccessToken()

    // Get client IP
    const clientIP = getClientIP(request)

    // Prepare transaction data for Blackbaud API
    const transactionData = {
      amount: amount,
      billing_contact: {
        first_name: billing_contact.first_name,
        last_name: billing_contact.last_name,
        address: billing_contact.address,
        city: billing_contact.city,
        state: billing_contact.state,
        post_code: billing_contact.post_code,
        country: billing_contact.country || "US",
      },
      credit_card: {
        number: credit_card.number,
        exp_month: credit_card.exp_month,
        exp_year: credit_card.exp_year,
        name: credit_card.name,
      },
      csc: csc,
      email: email,
      phone: phone,
      comment: comment || "Online donation",
      transaction_category: transaction_category || "donation",
      payment_configuration_id: PAYMENT_CONFIG_ID,
      donor_ip: clientIP,
      tokenize: tokenize || false,
    }

    // Make request to Blackbaud Payments API
    const paymentsResponse = await fetch(`${BLACKBAUD_API_BASE}/payments/v1/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Bb-Api-Subscription-Key": process.env.BLACKBAUD_SUBSCRIPTION_KEY || "",
      },
      body: JSON.stringify(transactionData),
    })

    const responseData = await paymentsResponse.json()

    if (paymentsResponse.ok) {
      // Transaction successful
      return NextResponse.json({
        success: true,
        transaction_id: responseData.id,
        amount: responseData.amount,
        state: responseData.state,
        transaction_date: responseData.transaction_date,
      })
    } else {
      // Transaction failed
      console.error("Blackbaud API Error:", responseData)
      return NextResponse.json(
        {
          success: false,
          error: responseData.message || "Payment processing failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Donation API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
