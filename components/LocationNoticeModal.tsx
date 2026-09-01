"use client"

import { useEffect, useState } from "react"

// Matches the "Visiting from Canada?" modal already live on gcmediaministries.org
// (WPCode snippet) — same layout, overlay, and dismiss behavior, rebuilt as a
// React component for gcmm.ca.
//
// Detection is NOT done here. StripeDonationPage already computes the
// visitor's country via getDetectedCountry() (timezone-based) to prefill the
// billing form's country field — this component reuses that same result
// instead of running a separate network lookup, so there's only one source
// of truth for "is this visitor in the US".

type LocationNoticeModalProps = {
  /** Master on/off switch — mirrors the existing `showLocationNotice` prop. */
  show?: boolean
  /** Result of getDetectedCountry() from the parent — "US" | "CA" | "" */
  detectedCountry?: "US" | "CA" | ""
  title?: string
  text?: string
  /** Where "Donate via US partner" should point. */
  partnerUrl?: string
}

const DISMISS_KEY = "gcmm-us-notice-dismissed"

export function LocationNoticeModal({
  show = true,
  detectedCountry = "",
  title = "Are you donating from the United States?",
  text = "GCMM is a registered Canadian charity. If you're a US donor looking for a tax-deductible option, please use our US donation partner page instead.",
  partnerUrl = "https://gcmm.us/donate",
}: LocationNoticeModalProps) {
  const [dismissed, setDismissed] = useState(false)

  // Check once on mount whether this visitor already dismissed it this session.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(DISMISS_KEY)) setDismissed(true)
  }, [])

  const visible = show && detectedCountry === "US" && !dismissed

  useEffect(() => {
    if (!visible) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [visible])

  function dismiss() {
    setDismissed(true)
    sessionStorage.setItem(DISMISS_KEY, "1")
  }

  if (!visible) return null

  return (
    <div
      role="presentation"
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 20, 35, 0.6)",
        zIndex: 999998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gcmm-us-notice-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "12px",
          maxWidth: "440px",
          width: "100%",
          padding: "32px 28px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
          position: "relative",
          fontFamily: "inherit",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "10px",
            right: "14px",
            background: "none",
            border: "none",
            fontSize: "24px",
            lineHeight: 1,
            color: "#888",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🇺🇸</div>

        <h2
          id="gcmm-us-notice-title"
          style={{ margin: "0 0 14px", fontSize: "22px", color: "#1a3c6e" }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "16px",
            lineHeight: 1.5,
            color: "#333",
          }}
        >
          {text}
        </p>

        <a
          href={partnerUrl}
          style={{
            display: "inline-block",
            background: "#1a3c6e",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "14px",
          }}
        >
          Donate via US partner
        </a>

        <div>
          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              fontSize: "14px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            No thanks, I&apos;ll donate here
          </button>
        </div>
      </div>
    </div>
  )
}
