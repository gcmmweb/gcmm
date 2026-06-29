"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import {
  Heart,
  Phone,
  MapPin,
  Gift,
  Calendar,
  TrendingUp,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export function DonationPage({
  className,
  pageTitle = "You can make a difference!",
  pageSubtitle = "Become a partner with Great Commission Media Ministries",
  heroDescription = "By giving you will help reach untold millions with the gospel of Jesus!",

  // Mailing Address
  mailingTitle = "Or send your check to our mailing address:",
  organizationName = "GCM Ministries",
  addressLine1 = "PO Box 16418",
  addressLine2 = "St. Paul, MN 55116-0418",
  checkNote = "Note: Please make your check payable to GCM Ministries.",

  // Phone Donation
  phoneText = "Donate by phone:",
  phoneNumber = "1-877-244-7618",

  // Tax Info
  taxDeductibleText = "Your donation is tax-deductible!",
  givingDashboardText = "View your giving dashboard",
  givingDashboardUrl = "/giving-dashboard",

  // Canadian Section
  canadianText = "Canadian residents give here!",
  canadianDonateUrl = "/canadian-giving",

  // Three Ways Section
  threeWaysTitle = "3 ways you can help us reach thousands more with the Good News",

  // Way 1
  way1Title = "1. Give a monthly gift to support our work year-round.",
  way1Description = "Call or set it up easily online. $50 per month will reach 2,000 people through our Satellite TV ministry.",
  way1ButtonText = "CLICK HERE",
  way1ButtonUrl = "/monthly-giving",

  // Way 2
  way2Title = "2. Give a memorial or tribute gift in honor of a loved one.",
  way2Description = "A memorial donation is a meaningful way to remember a loved one. By making a memorial donation in lieu of flowers, friends and family may pay their respects.",
  way2ButtonText = "CLICK HERE",
  way2ButtonUrl = "/memorial-gifts",

  // Way 3
  way3Title = "3. Consider a Planned Gift to help one of our projects.",
  way3Description = "There are a variety of ways you can make a planned gift to help our work worldwide. These include gifts of publicly traded shares, insurance policies, asset gifts, and more.",
  way3ButtonText = "CLICK HERE",
  way3ButtonUrl = "/planned-giving",
}: {
  className?: string
  pageTitle?: string
  pageSubtitle?: string
  heroDescription?: string

  mailingTitle?: string
  organizationName?: string
  addressLine1?: string
  addressLine2?: string
  checkNote?: string

  phoneText?: string
  phoneNumber?: string

  taxDeductibleText?: string
  givingDashboardText?: string
  givingDashboardUrl?: string

  canadianText?: string
  canadianDonateUrl?: string

  threeWaysTitle?: string

  way1Title?: string
  way1Description?: string
  way1ButtonText?: string
  way1ButtonUrl?: string

  way2Title?: string
  way2Description?: string
  way2ButtonText?: string
  way2ButtonUrl?: string

  way3Title?: string
  way3Description?: string
  way3ButtonText?: string
  way3ButtonUrl?: string
}) {
  // Animation states
  const [heroVisible, setHeroVisible] = useState(false)
  const [donationVisible, setDonationVisible] = useState(false)
  const [waysVisible, setWaysVisible] = useState(false)
  const [visibleWays, setVisibleWays] = useState<boolean[]>(new Array(3).fill(false))

  // Form states
  const [donationForm, setDonationForm] = useState({
    amount: "",
    customAmount: "",
    frequency: "one-time", // 'one-time' or 'monthly'
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardName: "",
    comment: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Preset amounts
  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  // Refs
  const heroRef = useRef<HTMLElement>(null)
  const donationRef = useRef<HTMLElement>(null)
  const waysRef = useRef<HTMLElement>(null)
  const wayRefs = useRef<(HTMLElement | null)[]>([])

  // Intersection observers
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "-50px 0px",
    }

    const observers = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: donationRef, setter: setDonationVisible },
      { ref: waysRef, setter: setWaysVisible },
    ].map(({ ref, setter }) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setter(true)
        }
      }, observerOptions)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Individual ways animations
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
      customAmount: "",
    }))
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDonationForm((prev) => ({
      ...prev,
      customAmount: value,
      amount: value ? "" : prev.amount,
    }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setDonationForm((prev) => ({
      ...prev,
      cardNumber: formatted,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const finalAmount = donationForm.customAmount || donationForm.amount
      if (!finalAmount || Number.parseFloat(finalAmount) <= 0) {
        throw new Error("Please enter a valid donation amount")
      }

      // Convert amount to cents for Blackbaud API
      const amountInCents = Math.round(Number.parseFloat(finalAmount) * 100)

      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInCents,
          billing_contact: {
            first_name: donationForm.firstName,
            last_name: donationForm.lastName,
            address: donationForm.address,
            city: donationForm.city,
            state: donationForm.state,
            post_code: donationForm.zipCode,
            country: donationForm.country,
          },
          credit_card: {
            number: donationForm.cardNumber.replace(/\s/g, ""),
            exp_month: Number.parseInt(donationForm.expiryMonth),
            exp_year: Number.parseInt(donationForm.expiryYear),
            name: donationForm.cardName,
          },
          csc: donationForm.cvv,
          email: donationForm.email,
          phone: donationForm.phone,
          comment: donationForm.comment || `${donationForm.frequency} donation`,
          transaction_category: "donation",
          tokenize: donationForm.frequency === "monthly",
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        // Reset form
        setDonationForm({
          amount: "",
          customAmount: "",
          frequency: "one-time",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "US",
          cardNumber: "",
          expiryMonth: "",
          expiryYear: "",
          cvv: "",
          cardName: "",
          comment: "",
        })
      } else {
        throw new Error(result.error || "Payment processing failed")
      }
    } catch (error) {
      console.error("Donation error:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const getAnimationClass = (index: number) => {
    const isVisible = visibleWays[index]
    const baseClasses = "transition-all duration-700 ease-out"
    const hiddenClasses = "opacity-0 translate-y-8 scale-95"
    const visibleClasses = "opacity-100 translate-y-0 scale-100"

    return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`
  }

  // Helper function to determine if URL is external
  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
  }

  return (
    <main className={`overflow-hidden font-light ${className || ""}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 lg:py-40 bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
        <div className="container mx-auto px-8 lg:px-12 max-w-6xl">
          <div className="text-center">
            <div
              className={`mb-8 transition-all duration-1000 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-sm font-medium tracking-wider uppercase">
                <Heart className="w-4 h-4" />
                Make a Difference
              </div>
            </div>

            <h1
              className={`text-6xl lg:text-7xl font-extralight text-slate-900 leading-[0.9] mb-8 tracking-tight transition-all duration-1400 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <span className="text-slate-900 font-light">{pageTitle}</span>
            </h1>

            <h2
              className={`text-2xl lg:text-3xl font-light text-blue-600 mb-12 tracking-wide transition-all duration-1200 delay-300 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {pageSubtitle}
            </h2>

            <div
              className={`max-w-4xl mx-auto transition-all duration-1200 delay-500 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-light tracking-wide">
                {heroDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section ref={donationRef} className="py-28 bg-white">
        <div className="container mx-auto px-8 lg:px-12 max-w-4xl">
          <div
            className={`transition-all duration-1000 ease-out ${
              donationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 lg:p-12 border border-blue-100 shadow-lg">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium tracking-wider uppercase mb-6">
                  <CreditCard className="w-4 h-4" />
                  Secure Donation
                </div>
                <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-4 tracking-tight">
                  Make Your Donation
                </h2>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Secured by Blackbaud • SSL Encrypted</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Donation Amount */}
                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-6 tracking-wide">Donation Amount</label>

                  {/* Frequency Toggle */}
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setDonationForm((prev) => ({ ...prev, frequency: "one-time" }))}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        donationForm.frequency === "one-time"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationForm((prev) => ({ ...prev, frequency: "monthly" }))}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        donationForm.frequency === "monthly"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Monthly Gift
                    </button>
                  </div>

                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all duration-200 ${
                          donationForm.amount === amount.toString()
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={donationForm.customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-medium"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-6 tracking-wide">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={donationForm.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={donationForm.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={donationForm.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={donationForm.phone}
                      onChange={handleInputChange}
                      className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-6 tracking-wide">Billing Address</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={donationForm.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={donationForm.city}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={donationForm.state}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={donationForm.zipCode}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-6 tracking-wide">Payment Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on Card"
                      value={donationForm.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={donationForm.cardNumber}
                      onChange={handleCardNumberChange}
                      required
                      maxLength={19}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <select
                        name="expiryMonth"
                        value={donationForm.expiryMonth}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        name="expiryYear"
                        value={donationForm.expiryYear}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 20 }, (_, i) => {
                          const year = new Date().getFullYear() + i
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={donationForm.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4 tracking-wide">
                    Comment (Optional)
                  </label>
                  <textarea
                    name="comment"
                    placeholder="Add a message with your donation..."
                    value={donationForm.comment}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 font-light resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg tracking-wide"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-6 h-6" />
                        <span>Complete Secure Donation</span>
                        <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-3 p-6 bg-green-50 border border-green-200 rounded-2xl">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-semibold tracking-wide mb-1">
                        Thank you for your generous donation!
                      </p>
                      <p className="text-green-700 font-light text-sm">
                        Your payment has been processed successfully. You will receive a confirmation email shortly.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-6 bg-red-50 border border-red-200 rounded-2xl">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-semibold tracking-wide mb-1">Payment Error</p>
                      <p className="text-red-700 font-light text-sm">
                        {errorMessage ||
                          "There was an error processing your donation. Please try again or contact us for assistance."}
                      </p>
                    </div>
                  </div>
                )}
              </form>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>
                    <strong>Security:</strong> Your payment information is encrypted and processed securely through
                    Blackbaud Merchant Services. We never store your credit card information.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Donation Methods */}
          <div className="grid lg:grid-cols-2 gap-8 mt-16">
            {/* Phone & Mail */}
            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                donationVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-100 shadow-sm">
                <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-tight">Other Ways to Give</h3>

                {/* Phone Donation */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm mb-6">
                  <Phone className="w-6 h-6 text-green-600" />
                  <div>
                    <span className="text-slate-700 font-light tracking-wide">{phoneText} </span>
                    <a
                      href={`tel:${phoneNumber.replace(/[^\d]/g, "")}`}
                      className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 tracking-wide"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                </div>

                {/* Mailing Address */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-slate-900 mb-4 tracking-wide">{mailingTitle}</h4>
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900 tracking-wide">{organizationName}</div>
                        <div className="text-slate-600 font-light">{addressLine1}</div>
                        <div className="text-slate-600 font-light">{addressLine2}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 font-light italic">{checkNote}</p>
                </div>
              </div>
            </div>

            {/* Tax Info & Canadian */}
            <div
              className={`transition-all duration-1000 delay-500 ease-out ${
                donationVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="space-y-8">
                {/* Tax Deductible */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100 shadow-sm">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Gift className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-tight">{taxDeductibleText}</h3>

                    <Link
                      href={givingDashboardUrl}
                      {...(isExternalUrl(givingDashboardUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 tracking-wide"
                    >
                      <TrendingUp className="w-5 h-5" />
                      <span>{givingDashboardText}</span>
                    </Link>
                  </div>
                </div>

                {/* Canadian Donors */}
                <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 border border-red-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-tight">{canadianText}</h3>

                  <Link
                    href={canadianDonateUrl}
                    {...(isExternalUrl(canadianDonateUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 tracking-wide"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Give Here!</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Ways Section */}
      <section ref={waysRef} className="py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-8 lg:px-12 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div
              className={`mb-12 transition-all duration-1000 ease-out ${
                waysVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
              <h2 className="text-4xl lg:text-5xl font-light text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto">
                {threeWaysTitle}
              </h2>
            </div>
          </div>

          {/* Ways Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Way 1 */}
            <div
              ref={(el) => {
                wayRefs.current[0] = el
              }}
              className={`${getAnimationClass(0)}`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>

                <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-6 leading-tight tracking-tight">
                  {way1Title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8 font-light tracking-wide">{way1Description}</p>

                <Link
                  href={way1ButtonUrl}
                  {...(isExternalUrl(way1ButtonUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 tracking-wide"
                >
                  <span>{way1ButtonText}</span>
                </Link>
              </div>
            </div>

            {/* Way 2 */}
            <div
              ref={(el) => {
                wayRefs.current[1] = el
              }}
              className={`${getAnimationClass(1)}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>

                <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-6 leading-tight tracking-tight">
                  {way2Title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8 font-light tracking-wide">{way2Description}</p>

                <Link
                  href={way2ButtonUrl}
                  {...(isExternalUrl(way2ButtonUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 tracking-wide"
                >
                  <span>{way2ButtonText}</span>
                </Link>
              </div>
            </div>

            {/* Way 3 */}
            <div
              ref={(el) => {
                wayRefs.current[2] = el
              }}
              className={`${getAnimationClass(2)}`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-6 leading-tight tracking-tight">
                  {way3Title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8 font-light tracking-wide">{way3Description}</p>

                <Link
                  href={way3ButtonUrl}
                  {...(isExternalUrl(way3ButtonUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 tracking-wide"
                >
                  <span>{way3ButtonText}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-8 lg:px-12 max-w-5xl text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="w-24 h-px bg-slate-400 mx-auto mb-8"></div>
              <h2 className="text-4xl lg:text-5xl font-light text-white mb-8 leading-tight tracking-tight">
                Together, we can <span className="text-blue-300">reach the world</span>
              </h2>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
                Your partnership enables us to share the Gospel with millions through strategic media campaigns and
                compassionate outreach worldwide.
              </p>
            </div>

            <a
              href="#donation-form"
              className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 text-lg tracking-wide"
            >
              <Heart className="w-6 h-6" />
              <span>Start Making a Difference Today</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
