"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Lock, CheckCircle, AlertCircle, Loader2, Globe, X } from "lucide-react"

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

// Validate the publishable key before initializing Stripe
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

// Stripe Elements styling
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
  hidePostalCode: false,
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
    console.log("Frontend Stripe publishable key exists:", !!publishableKey)
    console.log("Frontend Stripe publishable key starts with pk_:", publishableKey?.startsWith("pk_") || false)

    if (!publishableKey) {
      console.error("CRITICAL: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing from environment variables")
      onError("Stripe configuration error: Missing publishable key")
    } else if (!publishableKey.startsWith("pk_")) {
      console.error('CRITICAL: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY appears to be invalid - should start with "pk_"')
      console.error("Current key starts with:", publishableKey.substring(0, 3))
      onError("Stripe configuration error: Invalid publishable key format. Please check your environment variables.")
    }
  }, [publishableKey, onError])

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

    console.log("[v0] Stripe publishable key environment:", publishableKey?.startsWith("pk_test_") ? "TEST" : "LIVE")

    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${donationData.firstName} ${donationData.lastName}`,
        email: donationData.email,
        phone: donationData.phone,
        address: {
          line1: donationData.address,
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

    console.log("[v0] Payment method created:", paymentMethod.id)

    // Create payment intent on the server
    try {
      const finalAmount = donationData.customAmount || donationData.amount
      const response = await fetch("/api/stripe-donate", {
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
            city: donationData.city,
            state: donationData.state,
            zip_code: donationData.zipCode,
            country: donationData.country,
          },
          frequency: donationData.frequency,
          comment: donationData.comment,
          purpose: donationData.purpose,
          email_customization: emailCustomization,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Handle successful payment
        if (result.requires_action) {
          // Handle 3D Secure authentication
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
          <p className="text-red-700 font-light text-sm mt-2">
            Please check your .env.local file and ensure you're using the correct Stripe keys.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
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

      {/* Submit Button */}
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
  pageTitle = "Support Our Mission",
  pageSubtitle = "Make a secure donation with Stripe",
  heroDescription = "Your generous contribution helps us reach millions with the Gospel through strategic media campaigns worldwide.",
  // Preset Amounts
  presetAmount1 = 40,
  presetAmount2 = 70,
  presetAmount3 = 200,
  presetAmount4 = 400,
  presetAmount5 = 800,
  presetAmount6 = 1500,
  // Donation Purpose Options
  showGeneralMinistry = true,
  generalMinistryLabel = "General Ministry Support",
  showUkraineRelief = true,
  ukraineReliefLabel = "Ukraine Relief Efforts",
  showUkraineGospel = true,
  ukraineGospelLabel = "Spreading the Gospel in Ukraine",
  showRadioMinistry = true,
  radioMinistryLabel = "Radio Ministry Expansion",
  showLiterature = true,
  literatureLabel = "Christian Literature Distribution",
  showPersecution = true,
  persecutionLabel = "Supporting Persecuted Christians",
  showYouth = true,
  youthLabel = "Youth Ministry Programs",
  showEmergency = true,
  emergencyLabel = "Emergency Relief Fund",
  // Email Customization Props
  emailBannerUrl = "/images/email-banner.png",
  emailSubject = "Thank you for your donation",
  emailGreeting = "Dear [Donor Name],",
  emailLine2 = "Thank you for your generous donation of [$xx] for [Donation field].",
  emailLine3 = "Your support is helping provide urgent aid to families affected by the war with food and life-saving wood-burning stoves that bring warmth, dignity, and strength in the harsh winter, along with medical supplies and ambulances.",
  emailLine4 = "If you're willing, could you tell us how you first heard about GCMM or UkraineAid? A quick reply—\"TV,\" \"magazine,\" \"friend,\" \"online,\" etc.—helps us understand what's reaching people and helps us reach more families in need. Please reply to this email or write to info@gcmm.ca.",
  emailLine5 = "For GCMM information, please visit gcmm.ca. For Ukraine updates and Ukraine-focused giving, visit UkraineAidToday.ca. You can also follow us on social media @GreatCommissionMediaMinistries.",
  emailLine6 = "Thank you again for standing with the people of Ukraine this Christmas.",
  emailSignatureName = "Dr. Hannu Haukka",
  emailSignatureTitle = "CEO, Great Commission Media Ministries (GCMM)",
  emailLine9 = "Your official tax receipt for your total year's giving will be mailed to the address you provided on or before February 28.",
  emailLine10 = "For assistance or questions about your donation, please email info@gcmm.ca or call 1-877-674-5630.",
  emailLine11 = "UkraineAid is the humanitarian outreach of Great Commission Media Ministries (GCMM), a registered Canadian charity (No. 12345 6789 RR0001), serving in Ukraine for over 35 years.",
  organizationName = "Great Commission Media Ministries",
  organizationPhone = "1-877-674-5630",
  organizationEmail = "info@gcmm.ca",
  organizationAddress = "PO Box 14006, Abbotsford, BC V2T 0B4",
  organizationCharityNumber = "12345 6789 RR0001",
  // Notification Email Props
  notificationEmailRecipient = "info@gcmm.ca",
  // Donation Purpose Messages
  purposeMessageGeneral = "",
  purposeMessageUkraineRelief = "",
  purposeMessageUkraineGospel = "",
  purposeMessageRadioMinistry = "",
  purposeMessageLiterature = "",
  purposeMessagePersecution = "",
  purposeMessageYouth = "",
  purposeMessageEmergency = "",
  // Purpose-specific Line 4 (Feedback Request)
  purposeLine4General = "",
  purposeLine4UkraineRelief = "",
  purposeLine4UkraineGospel = "",
  purposeLine4RadioMinistry = "",
  purposeLine4Literature = "",
  purposeLine4Persecution = "",
  purposeLine4Youth = "",
  purposeLine4Emergency = "",
  // Purpose-specific Closing (Line 6)
  purposeClosingGeneral = "",
  purposeClosingUkraineRelief = "",
  purposeClosingUkraineGospel = "",
  purposeClosingRadioMinistry = "",
  purposeClosingLiterature = "",
  purposeClosingPersecution = "",
  purposeClosingYouth = "",
  purposeClosingEmergency = "",
  // Purpose-specific Signature Name (Line 7)
  purposeSignatureNameGeneral = "",
  purposeSignatureNameUkraineRelief = "",
  purposeSignatureNameUkraineGospel = "",
  purposeSignatureNameRadioMinistry = "",
  purposeSignatureNameLiterature = "",
  purposeSignatureNamePersecution = "",
  purposeSignatureNameYouth = "",
  purposeSignatureNameEmergency = "",
  // Purpose-specific Signature Title (Line 8)
  purposeSignatureTitleGeneral = "",
  purposeSignatureTitleUkraineRelief = "",
  purposeSignatureTitleUkraineGospel = "",
  purposeSignatureTitleRadioMinistry = "",
  purposeSignatureTitleLiterature = "",
  purposeSignatureTitlePersecution = "",
  purposeSignatureTitleYouth = "",
  purposeSignatureTitleEmergency = "",
  // Page content
  donateNowHeading = "Donate Now:",
  generousDonationText = "Your most generous donation",
  customAmountPlaceholder = "100",
  termsAndConditionsUrl = "/terms-and-conditions",
  // Location Notice Props
  showLocationNotice = true,
  locationNoticeTitle = "Are you donating from the United States?",
  locationNoticeText = "GCMM is a registered Canadian charity. If you're a US donor looking for a tax-deductible option, please use our US donation partner page instead.",
  usDonationUrl = "https://donate.gcmm.ca/us",
  caDonationUrl = "",
}: {
  className?: string
  pageTitle?: string
  pageSubtitle?: string
  heroDescription?: string
  // Preset Amounts
  presetAmount1?: number
  presetAmount2?: number
  presetAmount3?: number
  presetAmount4?: number
  presetAmount5?: number
  presetAmount6?: number
  // Donation Purpose Options
  showGeneralMinistry?: boolean
  generalMinistryLabel?: string
  showUkraineRelief?: boolean
  ukraineReliefLabel?: string
  showUkraineGospel?: boolean
  ukraineGospelLabel?: string
  showRadioMinistry?: boolean
  radioMinistryLabel?: string
  showLiterature?: boolean
  literatureLabel?: string
  showPersecution?: boolean
  persecutionLabel?: string
  showYouth?: boolean
  youthLabel?: string
  showEmergency?: boolean
  emergencyLabel?: string
  // Email Customization
  emailBannerUrl?: string
  emailSubject?: string
  emailGreeting?: string
  emailLine2?: string
  emailLine3?: string
  emailLine4?: string
  emailLine5?: string
  emailLine6?: string
  emailSignatureName?: string
  emailSignatureTitle?: string
  emailLine9?: string
  emailLine10?: string
  emailLine11?: string
  organizationName?: string
  organizationPhone?: string
  organizationEmail?: string
  organizationAddress?: string
  organizationCharityNumber?: string
  notificationEmailRecipient?: string
  // Donation Purpose Messages
  purposeMessageGeneral?: string
  purposeMessageUkraineRelief?: string
  purposeMessageUkraineGospel?: string
  purposeMessageRadioMinistry?: string
  purposeMessageLiterature?: string
  purposeMessagePersecution?: string
  purposeMessageYouth?: string
  purposeMessageEmergency?: string
  // Purpose-specific Line 4
  purposeLine4General?: string
  purposeLine4UkraineRelief?: string
  purposeLine4UkraineGospel?: string
  purposeLine4RadioMinistry?: string
  purposeLine4Literature?: string
  purposeLine4Persecution?: string
  purposeLine4Youth?: string
  purposeLine4Emergency?: string
  // Purpose-specific Closing
  purposeClosingGeneral?: string
  purposeClosingUkraineRelief?: string
  purposeClosingUkraineGospel?: string
  purposeClosingRadioMinistry?: string
  purposeClosingLiterature?: string
  purposeClosingPersecution?: string
  purposeClosingYouth?: string
  purposeClosingEmergency?: string
  // Purpose-specific Signature Name
  purposeSignatureNameGeneral?: string
  purposeSignatureNameUkraineRelief?: string
  purposeSignatureNameUkraineGospel?: string
  purposeSignatureNameRadioMinistry?: string
  purposeSignatureNameLiterature?: string
  purposeSignatureNamePersecution?: string
  purposeSignatureNameYouth?: string
  purposeSignatureNameEmergency?: string
  // Purpose-specific Signature Title
  purposeSignatureTitleGeneral?: string
  purposeSignatureTitleUkraineRelief?: string
  purposeSignatureTitleUkraineGospel?: string
  purposeSignatureTitleRadioMinistry?: string
  purposeSignatureTitleLiterature?: string
  purposeSignatureTitlePersecution?: string
  purposeSignatureTitleYouth?: string
  purposeSignatureTitleEmergency?: string
  // Page content
  donateNowHeading?: string
  generousDonationText?: string
  customAmountPlaceholder?: string
  termsAndConditionsUrl?: string
  // Location Notice
  showLocationNotice?: boolean
  locationNoticeTitle?: string
  locationNoticeText?: string
  usDonationUrl?: string
  caDonationUrl?: string
}) {
  const [donationVisible, setDonationVisible] = useState(false)
  const [waysVisible, setWaysVisible] = useState(false)
  const [visibleWays, setVisibleWays] = useState<boolean[]>(new Array(3).fill(false))

  // Build preset amounts array from props
  const presetAmounts = [
    presetAmount1,
    presetAmount2,
    presetAmount3,
    presetAmount4,
    presetAmount5,
    presetAmount6,
  ].filter((amount) => amount > 0)

  // Build donation purposes array based on visibility flags
  const donationPurposes: Array<{ value: string; label: string }> = []
  
  if (showGeneralMinistry) {
    donationPurposes.push({ value: "general", label: generalMinistryLabel })
  }
  if (showUkraineRelief) {
    donationPurposes.push({ value: "ukraine-relief", label: ukraineReliefLabel })
  }
  if (showUkraineGospel) {
    donationPurposes.push({ value: "ukraine-gospel", label: ukraineGospelLabel })
  }
  if (showRadioMinistry) {
    donationPurposes.push({ value: "radio-ministry", label: radioMinistryLabel })
  }
  if (showLiterature) {
    donationPurposes.push({ value: "literature", label: literatureLabel })
  }
  if (showPersecution) {
    donationPurposes.push({ value: "persecution", label: persecutionLabel })
  }
  if (showYouth) {
    donationPurposes.push({ value: "youth", label: youthLabel })
  }
  if (showEmergency) {
    donationPurposes.push({ value: "emergency", label: emergencyLabel })
  }

  // Set default purpose to first available option
  const defaultPurpose = donationPurposes.length > 0 ? donationPurposes[0].value : "general"

  const [donationForm, setDonationForm] = useState({
    amount: "",
    customAmount: "",
    frequency: "one-time", // 'one-time' or 'monthly'
    purpose: defaultPurpose,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
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

  const donationRef = useRef<HTMLElement>(null)
  const waysRef = useRef<HTMLElement>(null)
  const wayRefs = useRef<(HTMLElement | null)[]>([])

  // Prepare email customization object - FIXED to match route.ts expectations
  const emailCustomization = {
    banner_url: emailBannerUrl,
    subject: emailSubject,
    greeting: emailGreeting,
    line2: emailLine2,
    line3: emailLine3,
    line4: emailLine4,
    line5: emailLine5,
    line6: emailLine6,
    signature_name: emailSignatureName,
    signature_title: emailSignatureTitle,
    line9: emailLine9,
    line10: emailLine10,
    line11: emailLine11,
    organization_name: organizationName,
    organization_phone: organizationPhone,
    organization_email: organizationEmail,
    organization_address: organizationAddress,
    charity_number: organizationCharityNumber,
    notification_email_recipient: notificationEmailRecipient,
    // Ministry purpose labels (so receipt shows custom Plasmic labels)
    generalMinistryLabel: generalMinistryLabel,
    ukraineReliefLabel: ukraineReliefLabel,
    ukraineGospelLabel: ukraineGospelLabel,
    radioMinistryLabel: radioMinistryLabel,
    literatureLabel: literatureLabel,
    persecutionLabel: persecutionLabel,
    youthLabel: youthLabel,
    emergencyLabel: emergencyLabel,
    // Purpose-specific messages (flat structure with camelCase keys)
    purposeMessageGeneral: purposeMessageGeneral,
    purposeMessageUkraineRelief: purposeMessageUkraineRelief,
    purposeMessageUkraineGospel: purposeMessageUkraineGospel,
    purposeMessageRadioMinistry: purposeMessageRadioMinistry,
    purposeMessageLiterature: purposeMessageLiterature,
    purposeMessagePersecution: purposeMessagePersecution,
    purposeMessageYouth: purposeMessageYouth,
    purposeMessageEmergency: purposeMessageEmergency,
    // Purpose-specific Line 4
    purposeLine4General: purposeLine4General,
    purposeLine4UkraineRelief: purposeLine4UkraineRelief,
    purposeLine4UkraineGospel: purposeLine4UkraineGospel,
    purposeLine4RadioMinistry: purposeLine4RadioMinistry,
    purposeLine4Literature: purposeLine4Literature,
    purposeLine4Persecution: purposeLine4Persecution,
    purposeLine4Youth: purposeLine4Youth,
    purposeLine4Emergency: purposeLine4Emergency,
    // Purpose-specific Closing
    purposeClosingGeneral: purposeClosingGeneral,
    purposeClosingUkraineRelief: purposeClosingUkraineRelief,
    purposeClosingUkraineGospel: purposeClosingUkraineGospel,
    purposeClosingRadioMinistry: purposeClosingRadioMinistry,
    purposeClosingLiterature: purposeClosingLiterature,
    purposeClosingPersecution: purposeClosingPersecution,
    purposeClosingYouth: purposeClosingYouth,
    purposeClosingEmergency: purposeClosingEmergency,
    // Purpose-specific Signature Name
    purposeSignatureNameGeneral: purposeSignatureNameGeneral,
    purposeSignatureNameUkraineRelief: purposeSignatureNameUkraineRelief,
    purposeSignatureNameUkraineGospel: purposeSignatureNameUkraineGospel,
    purposeSignatureNameRadioMinistry: purposeSignatureNameRadioMinistry,
    purposeSignatureNameLiterature: purposeSignatureNameLiterature,
    purposeSignatureNamePersecution: purposeSignatureNamePersecution,
    purposeSignatureNameYouth: purposeSignatureNameYouth,
    purposeSignatureNameEmergency: purposeSignatureNameEmergency,
    // Purpose-specific Signature Title
    purposeSignatureTitleGeneral: purposeSignatureTitleGeneral,
    purposeSignatureTitleUkraineRelief: purposeSignatureTitleUkraineRelief,
    purposeSignatureTitleUkraineGospel: purposeSignatureTitleUkraineGospel,
    purposeSignatureTitleRadioMinistry: purposeSignatureTitleRadioMinistry,
    purposeSignatureTitleLiterature: purposeSignatureTitleLiterature,
    purposeSignatureTitlePersecution: purposeSignatureTitlePersecution,
    purposeSignatureTitleYouth: purposeSignatureTitleYouth,
    purposeSignatureTitleEmergency: purposeSignatureTitleEmergency,
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

  useEffect(() => {
    const observers = wayRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleWays((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
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
    // Reset form
    setDonationForm({
      amount: "",
      customAmount: "",
      frequency: "one-time",
      purpose: defaultPurpose,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      comment: "",
    })
  }

  const handlePaymentError = (error: string) => {
    setSubmitStatus("error")
    setErrorMessage(error)
  }

  const getAnimationClass = (index: number) => {
    const isVisible = visibleWays[index]
    const baseClasses = "transition-all duration-700 ease-out"
    const hiddenClasses = "opacity-0 translate-y-8 scale-95"
    const visibleClasses = "opacity-100 translate-y-0 scale-100"

    return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`
  }

  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
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
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12 text-slate-400" />
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">{donateNowHeading}</h1>
            </div>

            {/* Frequency Toggle */}
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
                onClick={() => setDonationForm((prev) => ({ ...prev, frequency: "monthly" }))}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-200 border-2 ${
                  donationForm.frequency === "monthly"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Your most generous donation */}
            <div className="text-center mb-6">
              <p className="text-slate-600 text-lg font-medium">{generousDonationText}</p>
            </div>

            {/* Preset amounts grid */}
            {presetAmounts.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-2xl border-2 font-semibold text-lg transition-all duration-200 ${
                      donationForm.amount === amount.toString()
                        ? "border-slate-400 bg-slate-50 text-slate-900"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            )}

            {/* Custom amount input */}
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
                  placeholder="Province"
                  value={donationForm.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Postal Code"
                  value={donationForm.zipCode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Donation Purpose */}
            {donationPurposes.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-semibold text-slate-900 mb-3">Donation Purpose</label>
                <select
                  name="purpose"
                  value={donationForm.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {donationPurposes.map((purpose) => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

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

            {/* Stripe Payment Form */}
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
    </main>
  )
}

export default StripeDonationPage