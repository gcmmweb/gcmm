"use client"

import type React from "react"
import { useState } from "react"

export interface NewsletterSignupProps {
  className?: string
  style?: React.CSSProperties
  // Main Content Props
  mainTitle?: string
  brandName?: string
  mainDescription?: string
  // Form Props
  formTitle?: string
  formDescription?: string
  buttonText?: string
  // Input Placeholders
  firstNamePlaceholder?: string
  lastNamePlaceholder?: string
  emailPlaceholder?: string
  // Mailchimp Integration
  mailchimpUrl?: string
  // Success Message Props
  successTitle?: string
  successMessage?: string
  // Footer Text
  privacyText?: string
  // Color Customization Props
  primaryColor?: string // Background and button color
  primaryTextColor?: string // Text on primary colored elements
  headingColor?: string // Main headings color
  textColor?: string // Body text color
  brandColor?: string // Brand name highlight color
  inputBgColor?: string // Input background
  inputBorderColor?: string // Input border
  inputTextColor?: string // Input text
  cardBgColor?: string // Form card background
  cardBorderColor?: string // Form card border
}

export function NewsletterSignup({
  className = "",
  style,
  mainTitle = "Stay Connected with",
  brandName = "GCM Ministries",
  mainDescription = "Join our newsletter to receive updates on our global ministry work, testimonies from the field, and ways you can be part of spreading the Gospel worldwide.",
  formTitle = "Subscribe to Our Newsletter",
  formDescription = "Get the latest updates from our ministry around the world",
  buttonText = "Subscribe to Newsletter",
  firstNamePlaceholder = "First Name",
  lastNamePlaceholder = "Last Name",
  emailPlaceholder = "name@email.com",
  mailchimpUrl = "https://GCMM.us4.list-manage.com/subscribe/post?u=318fc9b1880100b326b3ddf87&id=b03a1478c0&f_id=00f81feaf0",
  successTitle = "Thank You!",
  successMessage = "Check your email to confirm your subscription. We'll keep you updated on our ministry work and global outreach efforts.",
  privacyText = "We respect your privacy. Unsubscribe at any time.",
  primaryColor = "#1F2D55",
  primaryTextColor = "#ffffff",
  headingColor = "#1F2D55",
  textColor = "#475569",
  brandColor = "#f59e0b",
  inputBgColor = "#f9fafb",
  inputBorderColor = "#d1d5db",
  inputTextColor = "#111827",
  cardBgColor = "#ffffff",
  cardBorderColor = "#e5e7eb",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("EMAIL", email)
    formData.append("FNAME", firstName)
    formData.append("LNAME", lastName)

    try {
      await fetch(mailchimpUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={`w-full max-w-md mx-auto mt-12 rounded-lg shadow-2xl p-6 text-center ${className}`}
        style={{
          ...style,
          backgroundColor: cardBgColor,
          color: textColor,
        }}
      >
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: `${brandColor}20`,
          }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: brandColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extralight mb-2" style={{ color: headingColor }}>
          {successTitle}
        </h2>
        <p className="text-lg" style={{ color: textColor }}>
          {successMessage}
        </p>
      </div>
    )
  }

  return (
    <div
      className={`w-full max-w-md mx-auto mt-12 ${className}`}
      style={{
        ...style,
        color: textColor,
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extralight mb-4" style={{ color: headingColor }}>
          {mainTitle}
          <span className="block mt-2" style={{ color: brandColor }}>
            {brandName}
          </span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: textColor }}>
          {mainDescription}
        </p>
      </div>

      <div
        className="border shadow-md rounded-lg"
        style={{
          backgroundColor: cardBgColor,
          borderColor: cardBorderColor,
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-light text-center mb-2" style={{ color: headingColor }}>
            {formTitle}
          </h2>
          <p className="text-center mb-6" style={{ color: textColor }}>
            {formDescription}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium" style={{ color: textColor }}>
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md outline-none transition-colors"
                  style={{
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                    color: inputTextColor,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = primaryColor
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}30`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorderColor
                    e.target.style.boxShadow = "none"
                  }}
                  placeholder={firstNamePlaceholder}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium" style={{ color: textColor }}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md outline-none transition-colors"
                  style={{
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                    color: inputTextColor,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = primaryColor
                    e.target.style.boxShadow = `0 0 0 2px ${primaryColor}30`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = inputBorderColor
                    e.target.style.boxShadow = "none"
                  }}
                  placeholder={lastNamePlaceholder}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium" style={{ color: textColor }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md outline-none transition-colors"
                style={{
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: inputTextColor,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor
                  e.target.style.boxShadow = `0 0 0 2px ${primaryColor}30`
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = inputBorderColor
                  e.target.style.boxShadow = "none"
                }}
                placeholder={emailPlaceholder}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-medium py-3 px-4 rounded-md transition-all duration-200 disabled:opacity-50"
              style={{
                backgroundColor: primaryColor,
                color: primaryTextColor,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.filter = "brightness(0.9)"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)"
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: `${primaryTextColor}30`,
                      borderTopColor: primaryTextColor,
                    }}
                  />
                  Subscribing...
                </div>
              ) : (
                buttonText
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: textColor, opacity: 0.8 }}>
              {privacyText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}