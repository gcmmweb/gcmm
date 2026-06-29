"use client"

import type React from "react"

import { useState } from "react"

interface SurveyFormProps {
  // Form Container
  className?: string
  backgroundColor?: string
  maxWidth?: string
  padding?: string
  borderRadius?: string

  // Title Section
  showTitle?: boolean
  title?: string
  titleColor?: string
  titleSize?: string

  // Description Section
  showDescription?: boolean
  description?: string
  descriptionColor?: string

  // Name Field
  showNameField?: boolean
  nameLabel?: string
  namePlaceholder?: string
  nameRequired?: boolean

  // Email Field
  showEmailField?: boolean
  emailLabel?: string
  emailPlaceholder?: string
  emailRequired?: boolean

  // Phone Field
  showPhoneField?: boolean
  phoneLabel?: string
  phonePlaceholder?: string
  phoneRequired?: boolean

  // Message/Comments Field
  showMessageField?: boolean
  messageLabel?: string
  messagePlaceholder?: string
  messageRequired?: boolean
  messageRows?: number

  // Dropdown Field
  showDropdownField?: boolean
  dropdownLabel?: string
  dropdownPlaceholder?: string
  dropdownOptions?: string
  dropdownRequired?: boolean

  // Checkbox Field
  showCheckboxField?: boolean
  checkboxLabel?: string
  checkboxText?: string
  checkboxRequired?: boolean

  // Custom Question 1
  showQuestion1?: boolean
  question1Label?: string
  question1Type?: "text" | "textarea" | "dropdown" | "radio"
  question1Placeholder?: string
  question1Options?: string
  question1Required?: boolean

  // Custom Question 2
  showQuestion2?: boolean
  question2Label?: string
  question2Type?: "text" | "textarea" | "dropdown" | "radio"
  question2Placeholder?: string
  question2Options?: string
  question2Required?: boolean

  // Custom Question 3
  showQuestion3?: boolean
  question3Label?: string
  question3Type?: "text" | "textarea" | "dropdown" | "radio"
  question3Placeholder?: string
  question3Options?: string
  question3Required?: boolean

  // Custom Question 4
  showQuestion4?: boolean
  question4Label?: string
  question4Type?: "text" | "textarea" | "dropdown" | "radio"
  question4Placeholder?: string
  question4Options?: string
  question4Required?: boolean

  // Custom Question 5
  showQuestion5?: boolean
  question5Label?: string
  question5Type?: "text" | "textarea" | "dropdown" | "radio"
  question5Placeholder?: string
  question5Options?: string
  question5Required?: boolean

  // Custom Question 6
  showQuestion6?: boolean
  question6Label?: string
  question6Type?: "text" | "textarea" | "dropdown" | "radio"
  question6Placeholder?: string
  question6Options?: string
  question6Required?: boolean

  // Custom Question 7
  showQuestion7?: boolean
  question7Label?: string
  question7Type?: "text" | "textarea" | "dropdown" | "radio"
  question7Placeholder?: string
  question7Options?: string
  question7Required?: boolean

  // Custom Question 8
  showQuestion8?: boolean
  question8Label?: string
  question8Type?: "text" | "textarea" | "dropdown" | "radio"
  question8Placeholder?: string
  question8Options?: string
  question8Required?: boolean

  // Custom Question 9
  showQuestion9?: boolean
  question9Label?: string
  question9Type?: "text" | "textarea" | "dropdown" | "radio"
  question9Placeholder?: string
  question9Options?: string
  question9Required?: boolean

  // Custom Question 10
  showQuestion10?: boolean
  question10Label?: string
  question10Type?: "text" | "textarea" | "dropdown" | "radio"
  question10Placeholder?: string
  question10Options?: string
  question10Required?: boolean

  // Field Styling
  labelColor?: string
  labelSize?: string
  inputBackgroundColor?: string
  inputTextColor?: string
  inputBorderColor?: string
  inputBorderRadius?: string
  inputPadding?: string
  fieldSpacing?: string

  // Submit Button
  submitButtonText?: string
  submitButtonBackgroundColor?: string
  submitButtonTextColor?: string
  submitButtonHoverBackgroundColor?: string
  submitButtonHoverTextColor?: string
  submitButtonPadding?: string
  submitButtonBorderRadius?: string

  // Success/Error Messages
  successMessage?: string
  successMessageColor?: string
  errorMessage?: string
  errorMessageColor?: string

  // Form Action
  formAction?: string
  formMethod?: string
}

export function SurveyForm({
  className = "",
  backgroundColor = "#ffffff",
  maxWidth = "600px",
  padding = "32px",
  borderRadius = "8px",

  showTitle = true,
  title = "Survey Form",
  titleColor = "#1f2937",
  titleSize = "32px",

  showDescription = true,
  description = "Please fill out this form with your information.",
  descriptionColor = "#6b7280",

  showNameField = true,
  nameLabel = "Full Name",
  namePlaceholder = "Enter your full name",
  nameRequired = true,

  showEmailField = true,
  emailLabel = "Email Address",
  emailPlaceholder = "Enter your email",
  emailRequired = true,

  showPhoneField = true,
  phoneLabel = "Phone Number",
  phonePlaceholder = "Enter your phone number",
  phoneRequired = false,

  showMessageField = true,
  messageLabel = "Message",
  messagePlaceholder = "Enter your message or comments",
  messageRequired = false,
  messageRows = 4,

  showDropdownField = false,
  dropdownLabel = "Select an Option",
  dropdownPlaceholder = "Choose one...",
  dropdownOptions = "Option 1,Option 2,Option 3",
  dropdownRequired = false,

  showCheckboxField = false,
  checkboxLabel = "Agreement",
  checkboxText = "I agree to the terms and conditions",
  checkboxRequired = false,

  showQuestion1 = false,
  question1Label = "Question 1",
  question1Type = "text",
  question1Placeholder = "Your answer",
  question1Options = "Option 1,Option 2,Option 3",
  question1Required = false,

  showQuestion2 = false,
  question2Label = "Question 2",
  question2Type = "text",
  question2Placeholder = "Your answer",
  question2Options = "Option 1,Option 2,Option 3",
  question2Required = false,

  showQuestion3 = false,
  question3Label = "Question 3",
  question3Type = "text",
  question3Placeholder = "Your answer",
  question3Options = "Option 1,Option 2,Option 3",
  question3Required = false,

  showQuestion4 = false,
  question4Label = "Question 4",
  question4Type = "text",
  question4Placeholder = "Your answer",
  question4Options = "Option 1,Option 2,Option 3",
  question4Required = false,

  showQuestion5 = false,
  question5Label = "Question 5",
  question5Type = "text",
  question5Placeholder = "Your answer",
  question5Options = "Option 1,Option 2,Option 3",
  question5Required = false,

  showQuestion6 = false,
  question6Label = "Question 6",
  question6Type = "text",
  question6Placeholder = "Your answer",
  question6Options = "Option 1,Option 2,Option 3",
  question6Required = false,

  showQuestion7 = false,
  question7Label = "Question 7",
  question7Type = "text",
  question7Placeholder = "Your answer",
  question7Options = "Option 1,Option 2,Option 3",
  question7Required = false,

  showQuestion8 = false,
  question8Label = "Question 8",
  question8Type = "text",
  question8Placeholder = "Your answer",
  question8Options = "Option 1,Option 2,Option 3",
  question8Required = false,

  showQuestion9 = false,
  question9Label = "Question 9",
  question9Type = "text",
  question9Placeholder = "Your answer",
  question9Options = "Option 1,Option 2,Option 3",
  question9Required = false,

  showQuestion10 = false,
  question10Label = "Question 10",
  question10Type = "text",
  question10Placeholder = "Your answer",
  question10Options = "Option 1,Option 2,Option 3",
  question10Required = false,

  labelColor = "#374151",
  labelSize = "14px",
  inputBackgroundColor = "#ffffff",
  inputTextColor = "#1f2937",
  inputBorderColor = "#d1d5db",
  inputBorderRadius = "6px",
  inputPadding = "12px",
  fieldSpacing = "20px",

  submitButtonText = "Submit",
  submitButtonBackgroundColor = "#2563eb",
  submitButtonTextColor = "#ffffff",
  submitButtonHoverBackgroundColor = "#1d4ed8",
  submitButtonHoverTextColor = "#ffffff",
  submitButtonPadding = "12px 32px",
  submitButtonBorderRadius = "6px",

  successMessage = "Thank you! Your form has been submitted successfully.",
  successMessageColor = "#059669",
  errorMessage = "Please fill out all required fields.",
  errorMessageColor = "#dc2626",

  formAction = "/api/contact",
  formMethod = "POST",
}: SurveyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    dropdown: "",
    checkbox: false,
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
  })

  const [isHovered, setIsHovered] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Form submission started")
    console.log("[v0] Form data:", formData)
    console.log("[v0] Form action:", formAction)

    // Validate required fields
    if (showNameField && nameRequired && !formData.name) {
      console.log("[v0] Validation failed: Name is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showEmailField && emailRequired && !formData.email) {
      console.log("[v0] Validation failed: Email is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showPhoneField && phoneRequired && !formData.phone) {
      console.log("[v0] Validation failed: Phone is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showMessageField && messageRequired && !formData.message) {
      console.log("[v0] Validation failed: Message is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showDropdownField && dropdownRequired && !formData.dropdown) {
      console.log("[v0] Validation failed: Dropdown is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showCheckboxField && checkboxRequired && !formData.checkbox) {
      console.log("[v0] Validation failed: Checkbox is required but not checked")
      setSubmitStatus("error")
      return
    }

    if (showQuestion1 && question1Required && !formData.question1) {
      console.log("[v0] Validation failed: Question 1 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion2 && question2Required && !formData.question2) {
      console.log("[v0] Validation failed: Question 2 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion3 && question3Required && !formData.question3) {
      console.log("[v0] Validation failed: Question 3 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion4 && question4Required && !formData.question4) {
      console.log("[v0] Validation failed: Question 4 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion5 && question5Required && !formData.question5) {
      console.log("[v0] Validation failed: Question 5 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion6 && question6Required && !formData.question6) {
      console.log("[v0] Validation failed: Question 6 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion7 && question7Required && !formData.question7) {
      console.log("[v0] Validation failed: Question 7 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion8 && question8Required && !formData.question8) {
      console.log("[v0] Validation failed: Question 8 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion9 && question9Required && !formData.question9) {
      console.log("[v0] Validation failed: Question 9 is required but empty")
      setSubmitStatus("error")
      return
    }
    if (showQuestion10 && question10Required && !formData.question10) {
      console.log("[v0] Validation failed: Question 10 is required but empty")
      setSubmitStatus("error")
      return
    }

    console.log("[v0] Validation passed, preparing to submit")

    // If formAction is provided, submit to that endpoint
    if (formAction) {
      try {
        const submissionData = {
          ...formData,
          question1Label: showQuestion1 ? question1Label : undefined,
          question2Label: showQuestion2 ? question2Label : undefined,
          question3Label: showQuestion3 ? question3Label : undefined,
          question4Label: showQuestion4 ? question4Label : undefined,
          question5Label: showQuestion5 ? question5Label : undefined,
          question6Label: showQuestion6 ? question6Label : undefined,
          question7Label: showQuestion7 ? question7Label : undefined,
          question8Label: showQuestion8 ? question8Label : undefined,
          question9Label: showQuestion9 ? question9Label : undefined,
          question10Label: showQuestion10 ? question10Label : undefined,
        }

        console.log("[v0] Sending request to:", formAction)
        console.log("[v0] Submission data:", submissionData)

        const response = await fetch(formAction, {
          method: formMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        })

        console.log("[v0] Response status:", response.status)
        console.log("[v0] Response ok:", response.ok)

        if (response.ok) {
          const responseData = await response.json()
          console.log("[v0] Response data:", responseData)
          setSubmitStatus("success")
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            dropdown: "",
            checkbox: false,
            question1: "",
            question2: "",
            question3: "",
            question4: "",
            question5: "",
            question6: "",
            question7: "",
            question8: "",
            question9: "",
            question10: "",
          })
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.log("[v0] Error response:", errorData)
          setSubmitStatus("error")
        }
      } catch (error) {
        console.log("[v0] Fetch error:", error)
        setSubmitStatus("error")
      }
    } else {
      // No action provided, just show success
      console.log("[v0] No formAction provided, showing success")
      setSubmitStatus("success")
      console.log("[v0] Form submitted:", formData)
    }
  }

  const dropdownOptionsArray = dropdownOptions.split(",").map((opt) => opt.trim())

  const renderCustomQuestion = (
    questionNumber: number,
    show: boolean,
    label: string,
    type: "text" | "textarea" | "dropdown" | "radio",
    placeholder: string,
    options: string,
    required: boolean,
    value: string,
    onChange: (value: string) => void,
  ) => {
    if (!show) return null

    const optionsArray = options.split(",").map((opt) => opt.trim())

    return (
      <div style={{ marginBottom: fieldSpacing }}>
        <label
          style={{
            display: "block",
            color: labelColor,
            fontSize: labelSize,
            fontWeight: "500",
            marginBottom: "8px",
          }}
        >
          {label}
          {required && <span style={{ color: errorMessageColor }}> *</span>}
        </label>

        {type === "text" && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            style={{
              width: "100%",
              backgroundColor: inputBackgroundColor,
              color: inputTextColor,
              border: `1px solid ${inputBorderColor}`,
              borderRadius: inputBorderRadius,
              padding: inputPadding,
              fontSize: "16px",
              outline: "none",
            }}
          />
        )}

        {type === "textarea" && (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={4}
            style={{
              width: "100%",
              backgroundColor: inputBackgroundColor,
              color: inputTextColor,
              border: `1px solid ${inputBorderColor}`,
              borderRadius: inputBorderRadius,
              padding: inputPadding,
              fontSize: "16px",
              outline: "none",
              resize: "vertical",
            }}
          />
        )}

        {type === "dropdown" && (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            style={{
              width: "100%",
              backgroundColor: inputBackgroundColor,
              color: inputTextColor,
              border: `1px solid ${inputBorderColor}`,
              borderRadius: inputBorderRadius,
              padding: inputPadding,
              fontSize: "16px",
              outline: "none",
            }}
          >
            <option value="">{placeholder}</option>
            {optionsArray.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {type === "radio" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {optionsArray.map((option, index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: labelColor,
                  fontSize: labelSize,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name={`question${questionNumber}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  required={required && index === 0}
                  style={{
                    marginRight: "8px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor,
          maxWidth,
          padding,
          borderRadius,
          margin: "0 auto",
        }}
      >
        {/* Title */}
        {showTitle && (
          <h2
            style={{
              color: titleColor,
              fontSize: titleSize,
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {title}
          </h2>
        )}

        {/* Description */}
        {showDescription && (
          <p
            style={{
              color: descriptionColor,
              marginBottom: "24px",
            }}
          >
            {description}
          </p>
        )}

        {/* Name Field */}
        {showNameField && (
          <div style={{ marginBottom: fieldSpacing }}>
            <label
              style={{
                display: "block",
                color: labelColor,
                fontSize: labelSize,
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              {nameLabel}
              {nameRequired && <span style={{ color: errorMessageColor }}> *</span>}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={namePlaceholder}
              required={nameRequired}
              style={{
                width: "100%",
                backgroundColor: inputBackgroundColor,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: inputBorderRadius,
                padding: inputPadding,
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Email Field */}
        {showEmailField && (
          <div style={{ marginBottom: fieldSpacing }}>
            <label
              style={{
                display: "block",
                color: labelColor,
                fontSize: labelSize,
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              {emailLabel}
              {emailRequired && <span style={{ color: errorMessageColor }}> *</span>}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={emailPlaceholder}
              required={emailRequired}
              style={{
                width: "100%",
                backgroundColor: inputBackgroundColor,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: inputBorderRadius,
                padding: inputPadding,
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Phone Field */}
        {showPhoneField && (
          <div style={{ marginBottom: fieldSpacing }}>
            <label
              style={{
                display: "block",
                color: labelColor,
                fontSize: labelSize,
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              {phoneLabel}
              {phoneRequired && <span style={{ color: errorMessageColor }}> *</span>}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={phonePlaceholder}
              required={phoneRequired}
              style={{
                width: "100%",
                backgroundColor: inputBackgroundColor,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: inputBorderRadius,
                padding: inputPadding,
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>
        )}

        {/* Dropdown Field */}
        {showDropdownField && (
          <div style={{ marginBottom: fieldSpacing }}>
            <label
              style={{
                display: "block",
                color: labelColor,
                fontSize: labelSize,
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              {dropdownLabel}
              {dropdownRequired && <span style={{ color: errorMessageColor }}> *</span>}
            </label>
            <select
              value={formData.dropdown}
              onChange={(e) => setFormData({ ...formData, dropdown: e.target.value })}
              required={dropdownRequired}
              style={{
                width: "100%",
                backgroundColor: inputBackgroundColor,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: inputBorderRadius,
                padding: inputPadding,
                fontSize: "16px",
                outline: "none",
              }}
            >
              <option value="">{dropdownPlaceholder}</option>
              {dropdownOptionsArray.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Message Field */}
        {showMessageField && (
          <div style={{ marginBottom: fieldSpacing }}>
            <label
              style={{
                display: "block",
                color: labelColor,
                fontSize: labelSize,
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              {messageLabel}
              {messageRequired && <span style={{ color: errorMessageColor }}> *</span>}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={messagePlaceholder}
              required={messageRequired}
              rows={messageRows}
              style={{
                width: "100%",
                backgroundColor: inputBackgroundColor,
                color: inputTextColor,
                border: `1px solid ${inputBorderColor}`,
                borderRadius: inputBorderRadius,
                padding: inputPadding,
                fontSize: "16px",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>
        )}

        {/* Checkbox Field */}
        {showCheckboxField && (
          <div style={{ marginBottom: fieldSpacing }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                color: labelColor,
                fontSize: labelSize,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={formData.checkbox}
                onChange={(e) => setFormData({ ...formData, checkbox: e.target.checked })}
                required={checkboxRequired}
                style={{
                  marginRight: "8px",
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              <span>
                {checkboxText}
                {checkboxRequired && <span style={{ color: errorMessageColor }}> *</span>}
              </span>
            </label>
          </div>
        )}

        {renderCustomQuestion(
          1,
          showQuestion1,
          question1Label,
          question1Type,
          question1Placeholder,
          question1Options,
          question1Required,
          formData.question1,
          (value) => setFormData({ ...formData, question1: value }),
        )}

        {renderCustomQuestion(
          2,
          showQuestion2,
          question2Label,
          question2Type,
          question2Placeholder,
          question2Options,
          question2Required,
          formData.question2,
          (value) => setFormData({ ...formData, question2: value }),
        )}

        {renderCustomQuestion(
          3,
          showQuestion3,
          question3Label,
          question3Type,
          question3Placeholder,
          question3Options,
          question3Required,
          formData.question3,
          (value) => setFormData({ ...formData, question3: value }),
        )}

        {renderCustomQuestion(
          4,
          showQuestion4,
          question4Label,
          question4Type,
          question4Placeholder,
          question4Options,
          question4Required,
          formData.question4,
          (value) => setFormData({ ...formData, question4: value }),
        )}

        {renderCustomQuestion(
          5,
          showQuestion5,
          question5Label,
          question5Type,
          question5Placeholder,
          question5Options,
          question5Required,
          formData.question5,
          (value) => setFormData({ ...formData, question5: value }),
        )}

        {renderCustomQuestion(
          6,
          showQuestion6,
          question6Label,
          question6Type,
          question6Placeholder,
          question6Options,
          question6Required,
          formData.question6,
          (value) => setFormData({ ...formData, question6: value }),
        )}

        {renderCustomQuestion(
          7,
          showQuestion7,
          question7Label,
          question7Type,
          question7Placeholder,
          question7Options,
          question7Required,
          formData.question7,
          (value) => setFormData({ ...formData, question7: value }),
        )}

        {renderCustomQuestion(
          8,
          showQuestion8,
          question8Label,
          question8Type,
          question8Placeholder,
          question8Options,
          question8Required,
          formData.question8,
          (value) => setFormData({ ...formData, question8: value }),
        )}

        {renderCustomQuestion(
          9,
          showQuestion9,
          question9Label,
          question9Type,
          question9Placeholder,
          question9Options,
          question9Required,
          formData.question9,
          (value) => setFormData({ ...formData, question9: value }),
        )}

        {renderCustomQuestion(
          10,
          showQuestion10,
          question10Label,
          question10Type,
          question10Placeholder,
          question10Options,
          question10Required,
          formData.question10,
          (value) => setFormData({ ...formData, question10: value }),
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: isHovered ? submitButtonHoverBackgroundColor : submitButtonBackgroundColor,
            color: isHovered ? submitButtonHoverTextColor : submitButtonTextColor,
            padding: submitButtonPadding,
            borderRadius: submitButtonBorderRadius,
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
            width: "100%",
          }}
        >
          {submitButtonText}
        </button>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: `${successMessageColor}15`,
              color: successMessageColor,
              borderRadius: "6px",
              border: `1px solid ${successMessageColor}`,
            }}
          >
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: `${errorMessageColor}15`,
              color: errorMessageColor,
              borderRadius: "6px",
              border: `1px solid ${errorMessageColor}`,
            }}
          >
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}
