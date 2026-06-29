"use client"

import { useState } from "react"

export function StayConnected({
  className,
  title = "Stay Connected With Us",
  description = "Subscribe to our newsletter and never miss an update on our latest content.",
  showNameField = true,
  namePlaceholder = "Enter your name",
  emailPlaceholder = "Enter your email",
  buttonText = "Subscribe",
  backgroundColor = "#ffffff",
  titleColor = "#1f2937",
  descriptionColor = "#4b5563",
  inputBackground = "#ffffff",
  inputBorderColor = "#e5e7eb",
  inputTextColor = "#1f2937",
  buttonBackground = "#2563eb",
  buttonHoverBackground = "#1d4ed8",
  buttonTextColor = "#ffffff",
  sectionPaddingY = "80px",
}: {
  className?: string
  title?: string
  description?: string
  showNameField?: boolean
  namePlaceholder?: string
  emailPlaceholder?: string
  buttonText?: string
  backgroundColor?: string
  titleColor?: string
  descriptionColor?: string
  inputBackground?: string
  inputBorderColor?: string
  inputTextColor?: string
  buttonBackground?: string
  buttonHoverBackground?: string
  buttonTextColor?: string
  sectionPaddingY?: string
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && (!showNameField || name.trim())) {
      // Handle newsletter signup
      console.log("Newsletter signup:", { name, email })
      setName("")
      setEmail("")
    }
  }

  return (
    <section
      className={className || ""}
      style={{
        backgroundColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "672px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "16px",
            color: titleColor,
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            marginBottom: "32px",
            color: descriptionColor,
            lineHeight: "1.75",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {description}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {showNameField && (
            <input
              type="text"
              placeholder={namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: inputBackground,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          )}
          
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              width: "100%",
            }}
          >
            <input
              type="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                minWidth: 0,
                padding: "12px 16px",
                backgroundColor: inputBackground,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                padding: "12px 24px",
                backgroundColor: isButtonHovered ? buttonHoverBackground : buttonBackground,
                color: buttonTextColor,
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease-out",
                whiteSpace: "nowrap",
                flexShrink: 0,
                boxSizing: "border-box",
              }}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 640px) {
          form > div {
            flex-direction: column !important;
          }
          form button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}