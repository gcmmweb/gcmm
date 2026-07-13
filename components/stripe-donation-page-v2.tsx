"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Lock, CheckCircle, AlertCircle, Loader2, Globe, X, Sparkles } from "lucide-react"

const US_TIMEZONES = new Set([
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Adak",
  "America/Phoenix",
  "America/Detroit",
  "America/Boise",
  "America/Indiana/Indianapolis",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Indiana/Tell_City",
  "America/Indiana/Knox",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Juneau",
  "America/Metlakatla",
  "America/Nome",
  "America/Sitka",
  "America/Yakutat",
  "Pacific/Honolulu",
])

const getDetectedCountry = (): "US" | "CA" | "" => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (US_TIMEZONES.has(timezone)) return "US"
    if (timezone.startsWith("America/")) {
      const region = timezone.split("/")[1]
      const caTimezones = [
        "Toronto", "Vancouver", "Edmonton", "Winnipeg", "Regina",
        "Saskatchewan", "Halifax", "St_Johns", "Montreal", "Ottawa",
        "Iqaluit", "Rankin_Inlet", "Resolute", "Cambridge_Bay",
        "Yellowknife", "Inuvik", "Whitehorse", "Dawson", "Creston",
        "Thunder_Bay", "Nipigon", "Rainy_River", "Atikokan",
        "Blanc-Sablon", "Goose_Bay", "Moncton",
      ]
      if (caTimezones.includes(region)) return "CA"
    }
  } catch {}
  return ""
}

// Initialize Stripe
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

let stripePromise: Promise<any> | null = null
if (publishableKey) {
  if (publishableKey.startsWith("pk_")) {
    stripePromise = loadStripe(publishableKey)
  } else {
    console.error(
      'CRITICAL: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with "pk_" (publishable key), not "sk_" (secret key)',
    )
  }
} else {
  console.error("CRITICAL: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set")
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "16px",
    },
    invalid: {
      color: "#9e2146",
      iconColor: "#9e2146",
    },
  },
  hidePostalCode: true, // FIX: postal code already collected in Billing Address — no double ask
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGN SHAPE — one repeating array item, editable/reorderable in Plasmic
// exactly like the Photo Carousel's Photos array. Replaces the old system of
// ~100 separately-named purposeXxxYyy props tied to hardcoded campaign keys.
// ─────────────────────────────────────────────────────────────────────────────
interface Campaign {
  name: string
  // Matches the "Campaign ID" field on the Donation Thank You component's
  // Campaigns array in Plasmic — this is how the thank-you page knows which
  // headline/photo/accent color to show. Keep the two in sync by typing the
  // same value into both Plasmic panels; no code change needed to update it.
  campaignId?: string
  bannerUrl?: string
  emailBodyOneTime: string
  emailBodyMonthly: string
  isMatching?: boolean
  matchMultiplier?: number
  matchEmailText?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL PREVIEW HELPERS — mirror the logic in route.ts exactly, so what
// Junita sees in Plasmic Studio matches what actually gets sent. Kept
// duplicated (rather than a shared import) since route.ts runs server-side
// and this runs in the browser during editing.
// ─────────────────────────────────────────────────────────────────────────────
function previewApplyMergeTags(
  body: string,
  vars: { donorName: string; amount: string; campaignName: string; matchedAmount?: string }
): string {
  const values: Record<string, string> = {
    donorName: vars.donorName,
    amount: vars.amount,
    campaignName: vars.campaignName,
    matchedAmount: vars.matchedAmount ?? "",
  }
  let result = body
  for (const key of Object.keys(values)) {
    const words = key.replace(/([A-Z])/g, " $1").trim().split(/\s+/)
    const pattern = words.join("[\\s_]*")
    const regex = new RegExp(`\\{\\s*${pattern}\\s*\\}`, "gi")
    result = result.replace(regex, values[key])
  }
  return result
}

function previewFormatBodyText(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin: 0 0 16px 0;">${p.replace(/\n/g, "<br>")}</p>`)
    .join("")
}

// Payment form component that uses Stripe hooks
function StripePaymentForm({
  donationData,
  emailCustomization,
  onSuccess,
  onError,
}: {
  donationData: any
  emailCustomization: any
  onSuccess: (result: any) => void
  onError: (error: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)

  useEffect(() => {
    if (!publishableKey) {
      onError("Stripe configuration error: Missing publishable key")
    } else if (!publishableKey.startsWith("pk_")) {
      onError("Stripe configuration error: Invalid publishable key format. Please check your environment variables.")
    }
  }, [onError])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setCardError(null)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setIsProcessing(false)
      return
    }

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${donationData.firstName} ${donationData.lastName}`,
        email: donationData.email,
        phone: donationData.phone,
        address: {
          line1: donationData.address,
          line2: donationData.addressLine2 || undefined,
          city: donationData.city,
          state: donationData.state,
          postal_code: donationData.zipCode,
          country: donationData.country,
        },
      },
    })

    if (paymentMethodError) {
      setCardError(paymentMethodError.message || "An error occurred")
      setIsProcessing(false)
      return
    }

    try {
      const finalAmount = donationData.customAmount || donationData.amount
      const response = await fetch("/api/stripe-donate-v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(Number.parseFloat(finalAmount) * 100), // Convert to cents
          currency: "cad",
          payment_method_id: paymentMethod.id,
          donor_info: {
            name: `${donationData.firstName} ${donationData.lastName}`,
            email: donationData.email,
            phone: donationData.phone,
            address: donationData.address,
            address_line2: donationData.addressLine2,
            city: donationData.city,
            state: donationData.state,
            zip_code: donationData.zipCode,
            country: donationData.country,
          },
          frequency: donationData.frequency,
          comment: donationData.comment,
          email_customization: emailCustomization,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        if (result.requires_action) {
          const { error: confirmError } = await stripe.confirmCardPayment(result.client_secret)
          if (confirmError) {
            onError(confirmError.message || "Payment confirmation failed")
          } else {
            onSuccess(result)
          }
        } else {
          onSuccess(result)
        }
      } else {
        onError(result.error || "Payment processing failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      onError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
  }

  if (!publishableKey || !publishableKey.startsWith("pk_")) {
    return (
      <div className="flex items-center gap-3 p-6 bg-red-50 border border-red-200 rounded-2xl">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
        <div>
          <p className="text-red-800 font-semibold tracking-wide mb-1">Configuration Error</p>
          <p className="text-red-700 font-light text-sm">
            {!publishableKey
              ? "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing from environment variables."
              : "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY should start with 'pk_' (publishable key), not 'sk_' (secret key)."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-slate-900 mb-4 tracking-wide">Payment Information</label>
        <div className="relative">
          <div className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-transparent transition-all duration-200">
            <CardElement options={cardElementOptions} onChange={handleCardChange} />
          </div>
          {cardError && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{cardError}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="group w-full inline-flex items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg tracking-wide"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock className="w-6 h-6" />
              <span>Complete Secure Donation</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export function StripeDonationPage({
  className,
  donateNowHeading = "Donate Now:",
  generousDonationText = "Your most generous donation",
  customAmountPlaceholder = "100",
  termsAndConditionsUrl = "/terms-and-conditions",

  // Preset Amounts — shared across every campaign, unchanged from before
  presetAmount1 = 40,
  presetAmount2 = 70,
  presetAmount3 = 200,
  presetAmount4 = 400,
  presetAmount5 = 800,
  presetAmount6 = 1500,

  // ── Campaigns — reorderable array, same pattern as Photo Carousel ──
  campaigns = [
    {
      name: "Where Most Needed",
      campaignId: "general",
      bannerUrl: "/images/email-banner.png",
      emailBodyOneTime:
        "Thank you for your gift of {amount} toward {campaignName}. Your generosity is helping us reach people around the world with practical support and the message of hope.",
      emailBodyMonthly:
        "Thank you for your generous monthly gift of {amount} toward {campaignName}. Your recurring support helps us plan ahead and make a lasting difference every month.",
      isMatching: false,
      matchMultiplier: 2,
    },
  ],

  // Organization Info — shared/global
  organizationName = "Great Commission Media Ministries",
  organizationPhone = "1-877-674-5630",
  organizationEmail = "info@gcmm.ca",
  organizationAddress = "PO Box 14006, Abbotsford, BC V2T 0B4",
  organizationCharityNumber = "82864 9467 RR0001",

  // Signature — one shared block, appended after every campaign's email body
  signatureName = "Dr. Hannu Haukka",
  signatureTitle = "CEO, Great Commission Media Ministries",

  // Email settings
  emailSubject = "Thank you for your donation",
  notificationEmailRecipient = "info@gcmm.ca",

  // Matching campaign banner text (shown above amounts when selected campaign is matching)
  matchingBannerText = "🎉 This campaign is being matched — your gift will go twice as far!",

  // Email Preview — for editing convenience in Plasmic Studio only.
  // Renders a live mockup of the confirmation email for the selected
  // campaign, using sample donor info, right below the form.
  showEmailPreview = false,

  // Location Notice
  showLocationNotice = true,
  locationNoticeTitle = "Are you donating from the United States?",
  locationNoticeText = "GCMM is a registered Canadian charity. If you're a US donor looking for a tax-deductible option, please use our US donation partner page instead.",
  usDonationUrl = "https://donate.gcmm.ca/us",
}: {
  className?: string
  donateNowHeading?: string
  generousDonationText?: string
  customAmountPlaceholder?: string
  termsAndConditionsUrl?: string
  presetAmount1?: number
  presetAmount2?: number
  presetAmount3?: number
  presetAmount4?: number
  presetAmount5?: number
  presetAmount6?: number
  campaigns?: Campaign[]
  organizationName?: string
  organizationPhone?: string
  organizationEmail?: string
  organizationAddress?: string
  organizationCharityNumber?: string
  signatureName?: string
  signatureTitle?: string
  emailSubject?: string
  notificationEmailRecipient?: string
  matchingBannerText?: string
  showEmailPreview?: boolean
  showLocationNotice?: boolean
  locationNoticeTitle?: string
  locationNoticeText?: string
  usDonationUrl?: string
}) {
  const [donationVisible, setDonationVisible] = useState(false)

  const presetAmounts = [
    presetAmount1,
    presetAmount2,
    presetAmount3,
    presetAmount4,
    presetAmount5,
    presetAmount6,
  ].filter((amount) => amount > 0)

  // Campaign is selected by array index — this replaces the old fixed
  // "general" / "ukraine-gospel" style keys. Renaming a campaign in Plasmic
  // no longer requires touching any code.
  const defaultCampaignIndex = campaigns.length > 0 ? "0" : ""

  const [donationForm, setDonationForm] = useState({
    amount: "",
    customAmount: "",
    frequency: "one-time", // 'one-time' or 'monthly'
    campaignIndex: defaultCampaignIndex,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "CA", // FIX: GCMM is Canadian — default CA (was hardcoded US with no field to change it)
    comment: "",
  })

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [successData, setSuccessData] = useState<any>(null)

  const [showNtbanner, setShowNtbanner] = useState(true)
  const [detectedCountry, setDetectedCountry] = useState<"US" | "CA" | "">("")

  useEffect(() => {
    if (!showLocationNotice) return
    setDetectedCountry(getDetectedCountry())
  }, [showLocationNotice])

  // FIX: prefill the country from the visitor's timezone (CA stays the default
  // when detection is inconclusive). The donor can still change it in the form.
  useEffect(() => {
    const detected = getDetectedCountry()
    if (detected) {
      setDonationForm((prev) => ({ ...prev, country: detected }))
    }
  }, [])

  const donationRef = useRef<HTMLElement>(null)

  const selectedCampaign: Campaign | undefined = campaigns[Number(donationForm.campaignIndex)]

  // Build the object sent to route.ts — one clean campaign object instead of
  // ~100 flat purposeXxxYyy fields.
  const emailCustomization = {
    organizationName,
    organizationPhone,
    organizationEmail,
    organizationAddress,
    organizationCharityNumber,
    signatureName,
    signatureTitle,
    notificationEmailRecipient,
    emailSubject,
    campaign: selectedCampaign
      ? {
          name: selectedCampaign.name,
          bannerUrl: selectedCampaign.bannerUrl,
          emailBodyOneTime: selectedCampaign.emailBodyOneTime,
          emailBodyMonthly: selectedCampaign.emailBodyMonthly,
          isMatching: selectedCampaign.isMatching,
          matchMultiplier: selectedCampaign.matchMultiplier,
          matchEmailText: selectedCampaign.matchEmailText,
        }
      : undefined,
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "-50px 0px",
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setDonationVisible(true)
      }
    }, observerOptions)

    if (donationRef.current) {
      observer.observe(donationRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDonationForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAmountSelect = (amount: number) => {
    setDonationForm((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: amount.toString(),
    }))
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDonationForm((prev) => ({
      ...prev,
      customAmount: value,
      amount: value,
    }))
  }

  const handlePaymentSuccess = (result: any) => {
    setSubmitStatus("success")
    setSuccessData(result)

    // Capture what the thank-you page needs BEFORE the form resets below —
    // once setDonationForm runs, donationForm reverts to blank defaults.
    const redirectAmount = donationForm.amount || donationForm.customAmount
    const redirectFrequency = donationForm.frequency
    const redirectName = donationForm.firstName
    const redirectCampaignId = selectedCampaign?.campaignId

    setDonationForm({
      amount: "",
      customAmount: "",
      frequency: "one-time",
      campaignIndex: defaultCampaignIndex,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "CA", // FIX: was hardcoded US
      comment: "",
    })

    // LIVE — redirects to the real thank-you page after a successful donation.
    const params = new URLSearchParams()
    if (redirectCampaignId) params.set("campaign", redirectCampaignId)
    if (redirectAmount) params.set("amount", redirectAmount)
    if (redirectFrequency) params.set("frequency", redirectFrequency)
    if (redirectName) params.set("name", redirectName)

    window.location.href = `/thank-you?${params.toString()}`
  }

  const handlePaymentError = (error: string) => {
    setSubmitStatus("error")
    setErrorMessage(error)
  }

  const isFormValid = () => {
    const finalAmount = donationForm.customAmount || donationForm.amount
    return (
      finalAmount &&
      Number.parseFloat(finalAmount) > 0 &&
      donationForm.firstName &&
      donationForm.lastName &&
      donationForm.email &&
      donationForm.address &&
      donationForm.city &&
      donationForm.state &&
      donationForm.zipCode
    )
  }

  const isMatchingSelected = !!(selectedCampaign?.isMatching && selectedCampaign?.matchMultiplier)

  // SUPERVISOR REVISION: matching campaigns apply to one-time gifts only.
  // If the donor switches to (or lands on) a matching campaign while "monthly"
  // is selected, snap the frequency back to one-time. The Monthly button is
  // also disabled below while a matching campaign is active.
  useEffect(() => {
    if (isMatchingSelected && donationForm.frequency === "monthly") {
      setDonationForm((prev) => ({ ...prev, frequency: "one-time" }))
    }
  }, [isMatchingSelected, donationForm.frequency])

  return (
    <main className={`overflow-hidden font-light ${className || ""}`}>
      {showLocationNotice && detectedCountry === "US" && showNtbanner && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-start gap-3">
            <div className="flex-1">
              <p className="text-amber-900 font-semibold text-sm">{locationNoticeTitle}</p>
              <p className="text-amber-800 text-sm mt-1">
                {locationNoticeText}
                {usDonationUrl && (
                  <>
                    {" "}
                    <a
                      href={usDonationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-900 underline font-semibold hover:text-amber-700"
                    >
                      Donate via US partner
                    </a>
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowNtbanner(false)}
              className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
              aria-label="Dismiss notice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      <section
        ref={donationRef}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-20 px-4"
      >
        <div
          className={`transition-all duration-1000 ease-out max-w-2xl w-full ${
            donationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12 text-slate-400" />
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">{donateNowHeading}</h1>
            </div>

            {/* Campaign Selector — built from the reorderable Campaigns array */}
            {campaigns.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-semibold text-slate-900 mb-3">Donation Purpose</label>
                <select
                  name="campaignIndex"
                  value={donationForm.campaignIndex}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {campaigns.map((c, index) => (
                    <option key={index} value={index.toString()}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Matching campaign banner — only shown when the selected campaign has matching enabled */}
            {isMatchingSelected && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800 font-semibold text-sm">{matchingBannerText}</p>
              </div>
            )}

            <div className="flex gap-4 mb-8 justify-center">
              <button
                type="button"
                onClick={() => setDonationForm((prev) => ({ ...prev, frequency: "one-time" }))}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-200 border-2 ${
                  donationForm.frequency === "one-time"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                disabled={isMatchingSelected}
                onClick={() => setDonationForm((prev) => ({ ...prev, frequency: "monthly" }))}
                title={isMatchingSelected ? "Matching applies to one-time gifts only" : undefined}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-200 border-2 ${
                  isMatchingSelected
                    ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : donationForm.frequency === "monthly"
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                Monthly
              </button>
            </div>

            {isMatchingSelected && (
              <p className="text-center text-slate-500 text-sm -mt-4 mb-8">
                Matching applies to one-time gifts only.
              </p>
            )}

            <div className="text-center mb-6">
              <p className="text-slate-600 text-lg font-medium">{generousDonationText}</p>
            </div>

            {/* Preset amounts grid — shows the matched amount inline when the campaign is matching */}
            {presetAmounts.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {presetAmounts.map((amount) => {
                  const matchedAmount =
                    isMatchingSelected && selectedCampaign?.matchMultiplier
                      ? amount * selectedCampaign.matchMultiplier
                      : null
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-2xl border-2 font-semibold transition-all duration-200 ${
                        donationForm.amount === amount.toString()
                          ? isMatchingSelected
                            ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                            : "border-slate-400 bg-slate-50 text-slate-900"
                          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <div className="text-lg">${amount}</div>
                      {matchedAmount && (
                        <div className="text-xs text-emerald-600 font-bold mt-1">→ ${matchedAmount} matched!</div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center gap-4 px-6 py-4 bg-white border-2 border-slate-300 rounded-2xl">
                <span className="text-slate-700 font-semibold text-xl">$</span>
                <input
                  type="number"
                  placeholder={customAmountPlaceholder}
                  value={donationForm.customAmount}
                  onChange={handleCustomAmountChange}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none font-semibold text-xl"
                  min="1"
                  step="0.01"
                />
              </div>
              {isMatchingSelected && selectedCampaign?.matchMultiplier && donationForm.customAmount && Number.parseFloat(donationForm.customAmount) > 0 && (
                <p className="mt-2 text-sm text-emerald-600 font-bold">
                  → Your gift will be matched to ${(Number.parseFloat(donationForm.customAmount) * selectedCampaign.matchMultiplier).toFixed(2)}!
                </p>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={donationForm.firstName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={donationForm.lastName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={donationForm.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={donationForm.phone}
                  onChange={handleInputChange}
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Billing Address Section */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-slate-900">Billing Address</h3>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={donationForm.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Apartment, suite, unit, etc."
                value={donationForm.addressLine2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={donationForm.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="state"
                  placeholder={donationForm.country === "US" ? "State" : "Province"}
                  value={donationForm.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder={donationForm.country === "US" ? "ZIP Code" : "Postal Code"}
                  value={donationForm.zipCode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <select
                name="country"
                value={donationForm.country}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="CA">Canada</option>
                <option value="US">United States</option>
                <option value="FI">Finland</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="NL">Netherlands</option>
                <option value="NO">Norway</option>
                <option value="SE">Sweden</option>
                <option value="NZ">New Zealand</option>
                <option value="UA">Ukraine</option>
              </select>
            </div>

            {/* Comment */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-slate-900 mb-3">Comment (Optional)</label>
              <textarea
                name="comment"
                placeholder="Add a message with your donation..."
                value={donationForm.comment}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>

            {isFormValid() && stripePromise && (
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  donationData={donationForm}
                  emailCustomization={emailCustomization}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            )}

            {!isFormValid() && (
              <div className="pt-4">
                <div className="w-full inline-flex items-center justify-center gap-3 px-8 py-6 bg-slate-300 text-slate-500 font-semibold rounded-2xl text-lg tracking-wide cursor-not-allowed">
                  <Lock className="w-6 h-6" />
                  <span>Complete Required Fields Above</span>
                </div>
              </div>
            )}

            {isFormValid() && (!stripePromise || !publishableKey?.startsWith("pk_")) && (
              <div className="pt-4">
                <div className="flex items-center gap-3 p-6 bg-red-50 border border-red-200 rounded-2xl">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-semibold tracking-wide mb-1">Stripe Configuration Error</p>
                    <p className="text-red-700 font-light text-sm">
                      Please check your environment variables. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY should start with
                      'pk_', not 'sk_'.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "success" && (
              <div className="flex items-center gap-3 p-6 bg-green-50 border border-green-200 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold tracking-wide mb-1">
                    Thank you for your generous donation!
                  </p>
                  <p className="text-green-700 font-light text-sm">
                    Your payment has been processed successfully. Transaction ID: {successData?.payment_intent_id}
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-3 p-6 bg-red-50 border border-red-200 rounded-2xl">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-semibold tracking-wide mb-1">Payment Error</p>
                  <p className="text-red-700 font-light text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-slate-200 flex justify-center">
              <a
                href={termsAndConditionsUrl}
                className="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium text-sm underline transition-colors"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Email Preview — editing aid only, mirrors the real sent email ── */}
      {showEmailPreview && selectedCampaign && (
        <section className="bg-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                📧 Email Preview — editing aid, not shown to real donors
              </span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {(selectedCampaign.bannerUrl) && (
                <img
                  src={selectedCampaign.bannerUrl}
                  alt="Campaign banner"
                  className="w-full h-auto block"
                />
              )}
              <div className="p-6">
                {(() => {
                  const sampleDonorName = "John Doe"
                  const sampleAmountNum =
                    Number.parseFloat(donationForm.customAmount) > 0
                      ? Number.parseFloat(donationForm.customAmount)
                      : presetAmounts[0] || 50
                  const sampleAmountText = `$${sampleAmountNum.toFixed(2)}`
                  const isMonthlyPreview = donationForm.frequency === "monthly"
                  const rawBody = isMonthlyPreview
                    ? selectedCampaign.emailBodyMonthly
                    : selectedCampaign.emailBodyOneTime
                  let sampleMatchedText: string | undefined
                  let sampleMatchMessage: string | undefined
                  if (selectedCampaign.isMatching && selectedCampaign.matchMultiplier) {
                    sampleMatchedText = `$${(sampleAmountNum * selectedCampaign.matchMultiplier).toFixed(2)}`
                    const template =
                      selectedCampaign.matchEmailText ||
                      "Your gift of {amount} will be matched to {matchedAmount}!"
                    sampleMatchMessage = template
                      .replace(/\{\s*amount\s*\}/gi, sampleAmountText)
                      .replace(/\{\s*matched[\s_]*amount\s*\}/gi, sampleMatchedText)
                  }
                  const merged = previewApplyMergeTags(rawBody || "", {
                    donorName: sampleDonorName,
                    amount: sampleAmountText,
                    campaignName: selectedCampaign.name,
                    matchedAmount: sampleMatchedText,
                  })
                  const formatted = previewFormatBodyText(merged)
                  return (
                    <>
                      <div
                        className="text-slate-800 text-base leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                      {sampleMatchMessage && (
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg px-4 py-3 mb-4">
                          <p className="text-emerald-800 font-semibold text-sm">{sampleMatchMessage}</p>
                        </div>
                      )}
                      <p className="italic text-slate-800 mb-1">With gratitude,</p>
                      <p className="font-semibold text-slate-800 mb-1">{signatureName}</p>
                      <p className="text-slate-500 text-sm">{signatureTitle}</p>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default StripeDonationPage
