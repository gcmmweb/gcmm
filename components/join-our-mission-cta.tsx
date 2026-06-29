"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import type React from "react"

export function JoinOurMissionCTA({
  className = "",
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  highlightColor = "#ffffff",
  descriptionColor = "#e2e8f0",
  inputBgColor = "#1e293b",
  inputBorderColor = "#334155",
  inputTextColor = "#ffffff",
  inputPlaceholderColor = "#94a3b8",
  labelColor = "#e2e8f0",
  buttonBgColor = "#ffffff",
  buttonTextColor = "#000000",
  buttonHoverBgColor = "#e5e5e5",
  paddingY = 96,
  paddingX = 24,
  maxWidth = "640px",
  fullBleed = false,
  ctaTitle = "Join Our",
  ctaHighlight = "Mission",
  ctaDescription = "Subscribe to our newsletter to receive updates on our global ministry work, testimonies from the field, and ways you can be part of spreading the Gospel worldwide.",
  firstNameLabel = "First Name",
  firstNamePlaceholder = "John",
  lastNameLabel = "Last Name",
  lastNamePlaceholder = "Doe",
  emailLabel = "Email Address",
  emailPlaceholder = "john@example.com",
  buttonText = "Subscribe to Newsletter",
  buttonSubmittingText = "Subscribing...",
  successTitle = "Thank You!",
  successMessage = "Check your email to confirm your subscription. We'll keep you updated on our ministry work and global outreach efforts.",
  privacyText = "We respect your privacy. Unsubscribe at any time.",
  mailchimpUrl = "https://GCMM.us4.list-manage.com/subscribe/post?u=318fc9b1880100b326b3ddf87&amp;id=b03a1478c0&amp;f_id=00f81feaf0",
}: {
  className?: string
  backgroundColor?: string
  titleColor?: string
  highlightColor?: string
  descriptionColor?: string
  inputBgColor?: string
  inputBorderColor?: string
  inputTextColor?: string
  inputPlaceholderColor?: string
  labelColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonHoverBgColor?: string
  paddingY?: number
  paddingX?: number
  maxWidth?: string
  fullBleed?: boolean
  ctaTitle?: string
  ctaHighlight?: string
  ctaDescription?: string
  firstNameLabel?: string
  firstNamePlaceholder?: string
  lastNameLabel?: string
  lastNamePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  buttonText?: string
  buttonSubmittingText?: string
  successTitle?: string
  successMessage?: string
  privacyText?: string
  mailchimpUrl?: string
}) {
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

  return (
    <section
      className={className}
      style={{
        backgroundColor,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: fullBleed ? 0 : paddingX,
        paddingRight: fullBleed ? 0 : paddingX,
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: fullBleed ? "100%" : maxWidth,
          paddingLeft: fullBleed ? paddingX : 0,
          paddingRight: fullBleed ? paddingX : 0,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {isSubmitted ? (
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${buttonBgColor}33` }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: buttonBgColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-4" style={{ color: titleColor }}>
                {successTitle}
              </h2>
              <p className="text-lg leading-relaxed font-light" style={{ color: descriptionColor }}>
                {successMessage}
              </p>
            </div>
          ) : (
            <>
              {/* Header Section */}
              <div className="text-center mb-10">
                <h2
                  className="text-4xl md:text-5xl font-serif font-light mb-6 leading-tight"
                  style={{ color: titleColor }}
                >
                  {ctaTitle}
                  <br />
                  <span className="font-normal" style={{ color: highlightColor }}>
                    {ctaHighlight}
                  </span>
                </h2>
                <p
                  className="text-lg leading-relaxed font-light max-w-2xl mx-auto"
                  style={{ color: descriptionColor }}
                >
                  {ctaDescription}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium" style={{ color: labelColor }}>
                      {firstNameLabel}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: inputTextColor,
                      }}
                      placeholder={firstNamePlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium" style={{ color: labelColor }}>
                      {lastNameLabel}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: inputTextColor,
                      }}
                      placeholder={lastNamePlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium" style={{ color: labelColor }}>
                    {emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: inputBgColor,
                      borderColor: inputBorderColor,
                      color: inputTextColor,
                    }}
                    placeholder={emailPlaceholder}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-medium px-8 py-6 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = buttonHoverBgColor
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = buttonBgColor
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: `${buttonTextColor}30`,
                          borderTopColor: buttonTextColor,
                        }}
                      />
                      {buttonSubmittingText}
                    </div>
                  ) : (
                    buttonText
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs" style={{ color: descriptionColor, opacity: 0.7 }}>
                    {privacyText}
                  </p>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}