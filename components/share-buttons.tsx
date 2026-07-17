"use client"

import { useState } from "react"
import { Share2, Link2, Check } from "lucide-react"

// Minimal inline brand glyphs so this component has zero extra npm
// dependencies (lucide-react doesn't include brand/social logos).
function WhatsAppIcon({ size }: { size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.93A9.86 9.86 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11a16.4 16.4 0 0 1-1.6-.6c-2.82-1.22-4.65-4.06-4.79-4.25-.14-.19-1.15-1.53-1.15-2.92s.72-2.07.98-2.35c.25-.28.55-.35.73-.35s.37 0 .53.01c.17.01.4-.06.62.48.24.58.81 2 .88 2.14.07.14.12.3.02.49-.1.19-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.28-.13.56.17.28.75 1.24 1.6 2 1.1.98 2.03 1.29 2.31 1.43.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.23.63-.14.26.1 1.66.78 1.94.93.28.14.47.21.53.33.07.12.07.68-.17 1.36Z"/>
    </svg>
  )
}
function FacebookIcon({ size }: { size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.8A21.9 21.9 0 0 0 14.3 3.7c-2.34 0-3.94 1.43-3.94 4.05v2.27H7.7v3.08h2.66V21h3.14Z"/>
    </svg>
  )
}
function XIcon({ size }: { size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.65 10.62 20.4 3h-1.6l-5.86 6.62L8.26 3H3l7.08 10.02L3 21h1.6l6.2-7 5 7H21l-7.35-10.38Zm-2.2 2.49-.72-1L5.2 4.15h2.46l4.62 6.46.72 1 6 8.4h-2.46l-4.89-6.9Z"/>
    </svg>
  )
}

export interface ShareButtonsProps {
  className?: string
  // Overrides. If left blank, falls back to the current page's own
  // URL/title at render time, so no Studio binding is required.
  title?: string
  url?: string
  showNativeShareButton?: boolean
  nativeShareLabel?: string
  iconSize?: string
  buttonSize?: string
  iconColor?: string
  iconHoverColor?: string
  buttonBackgroundColor?: string
  buttonHoverBackgroundColor?: string
  gap?: string
  sectionPaddingY?: string
}

export function ShareButtons({
  className,
  title,
  url,
  showNativeShareButton = true,
  nativeShareLabel = "Share",
  iconSize = "20px",
  buttonSize = "44px",
  iconColor = "#1f2937",
  iconHoverColor = "#374151",
  buttonBackgroundColor = "#ffffff",
  buttonHoverBackgroundColor = "#f3f4f6",
  gap = "12px",
  sectionPaddingY = "32px",
}: ShareButtonsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const getShareData = () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
    const shareTitle = title || (typeof document !== "undefined" ? document.title : "")
    return { shareUrl, shareTitle }
  }

  const canNativeShare =
    showNativeShareButton && typeof navigator !== "undefined" && !!navigator.share

  const handleNativeShare = async () => {
    const { shareUrl, shareTitle } = getShareData()
    try {
      await navigator.share({ title: shareTitle, url: shareUrl })
    } catch {
      // AbortError when the person cancels the native share sheet — not an error.
    }
  }

  const handleCopy = async () => {
    const { shareUrl } = getShareData()
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable; silently no-op.
    }
  }

  const openShareWindow = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=500")
  }

  const handleWhatsApp = () => {
    const { shareUrl, shareTitle } = getShareData()
    openShareWindow(`https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`)
  }

  const handleFacebook = () => {
    const { shareUrl } = getShareData()
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
  }

  const handleX = () => {
    const { shareUrl, shareTitle } = getShareData()
    openShareWindow(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    )
  }

  const iconButtonStyle = (key: string): React.CSSProperties => ({
    width: buttonSize,
    height: buttonSize,
    borderRadius: "50%",
    backgroundColor: hoveredKey === key ? buttonHoverBackgroundColor : buttonBackgroundColor,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease-out",
    color: hoveredKey === key ? iconHoverColor : iconColor,
  })

  return (
    <div
      className={className || ""}
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
      }}
    >
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          onMouseEnter={() => setHoveredKey("native")}
          onMouseLeave={() => setHoveredKey(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            backgroundColor: hoveredKey === "native" ? buttonHoverBackgroundColor : buttonBackgroundColor,
            color: hoveredKey === "native" ? iconHoverColor : iconColor,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease-out",
            fontWeight: 500,
          }}
        >
          <Share2 style={{ width: iconSize, height: iconSize }} />
          {nativeShareLabel}
        </button>
      )}

      <button
        onClick={handleCopy}
        onMouseEnter={() => setHoveredKey("copy")}
        onMouseLeave={() => setHoveredKey(null)}
        aria-label="Copy link"
        style={iconButtonStyle("copy")}
      >
        {copied ? (
          <Check style={{ width: iconSize, height: iconSize }} />
        ) : (
          <Link2 style={{ width: iconSize, height: iconSize }} />
        )}
      </button>

      <button
        onClick={handleWhatsApp}
        onMouseEnter={() => setHoveredKey("whatsapp")}
        onMouseLeave={() => setHoveredKey(null)}
        aria-label="Share on WhatsApp"
        style={iconButtonStyle("whatsapp")}
      >
        <WhatsAppIcon size={iconSize} />
      </button>

      <button
        onClick={handleFacebook}
        onMouseEnter={() => setHoveredKey("facebook")}
        onMouseLeave={() => setHoveredKey(null)}
        aria-label="Share on Facebook"
        style={iconButtonStyle("facebook")}
      >
        <FacebookIcon size={iconSize} />
      </button>

      <button
        onClick={handleX}
        onMouseEnter={() => setHoveredKey("x")}
        onMouseLeave={() => setHoveredKey(null)}
        aria-label="Share on X"
        style={iconButtonStyle("x")}
      >
        <XIcon size={iconSize} />
      </button>
    </div>
  )
}
