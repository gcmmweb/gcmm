"use client"

// components/appeal-band.tsx
// A full-width "appeal band": one big photo, a dark overlay for readable text, then a small
// label, a headline, up to two short paragraphs, a main button and an optional text link.
// Built for the homepage (between the hero and the ministry cards) but reusable for any
// campaign. Everything is editable in Plasmic Studio. Optional end date: after it, the band
// hides itself.
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { isExpired, parseEndsAt } from "@/lib/site-announcement"

type Overlay = "light" | "medium" | "strong"
type Height = "compact" | "standard" | "tall"
type Align = "left" | "center"
type Accent = "gold" | "white"
type Focus = "center" | "top" | "bottom" | "left" | "right"

// Dark overlay strength: [left side, right side]. On phones one even strength is used.
const OVERLAY: Record<Overlay, [number, number]> = {
  light: [0.55, 0.25],
  medium: [0.75, 0.4],
  strong: [0.88, 0.6],
}

// Space above and below the text. Smaller on phones, bigger on wide screens.
const PADDING: Record<Height, string> = {
  compact: "clamp(48px, 6vw, 80px)",
  standard: "clamp(72px, 9vw, 120px)",
  tall: "clamp(96px, 12vw, 160px)",
}

const FOCUS: Record<Focus, string> = {
  center: "center",
  top: "center top",
  bottom: "center bottom",
  left: "left center",
  right: "right center",
}

const ACCENT: Record<Accent, { color: string }> = {
  gold: { color: "#F5B83D" },
  white: { color: "#FFFFFF" },
}

const NAVY_TEXT = "#1E2B45"
const OVERLAY_RGB = "12, 22, 45"

// Only links that start with /, https://, http:// or mailto: are used.
function safeLink(value: string | undefined): string {
  const v = (value || "").trim()
  if (v.startsWith("/") && !v.startsWith("//")) return v
  if (/^https?:\/\//i.test(v) || /^mailto:/i.test(v)) return v
  return ""
}

function SmartLink({ href, className, style, children }: { href: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} prefetch={false} className={className} style={style}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  )
}

export function AppealBand({
  className,
  eyebrow = "UKRAINEAID WINTER APPEAL",
  headline = "A single stove changes what winter looks like for a family.",
  bodyMain = "Freezing temperatures are only weeks away. Your gift of $150 will provide a wood-burning stove to families in Ukraine.",
  bodySecondary = "These stoves also open the door for ongoing relationships with our local teams, who share the hope of the Gospel.",
  buttonText = "Help a Family Stay Warm",
  buttonLink = "/donate",
  linkText = "About UkraineAid",
  linkUrl = "/ukraineaid",
  backgroundImage = "https://site-assets.plasmic.app/923d7350db73b3af668b0311dec7c4e4.webp",
  imageFocus = "center",
  overlay = "medium",
  height = "standard",
  align = "left",
  accent = "gold",
  endDate = "",
}: {
  className?: string
  eyebrow?: string
  headline?: string
  bodyMain?: string
  bodySecondary?: string
  buttonText?: string
  buttonLink?: string
  linkText?: string
  linkUrl?: string
  backgroundImage?: string
  imageFocus?: Focus
  overlay?: Overlay
  height?: Height
  align?: Align
  accent?: Accent
  endDate?: string
}) {
  const endsAt = parseEndsAt(endDate)
  const [expiredInBrowser, setExpiredInBrowser] = React.useState(false)
  React.useEffect(() => {
    // The page may be a saved copy from before the end date: check again in the browser.
    setExpiredInBrowser(isExpired(endsAt))
  }, [endsAt])
  if (isExpired(endsAt) || expiredInBrowser) return null

  const [left, right] = OVERLAY[overlay] ?? OVERLAY.medium
  const even = (left + right) / 2 + 0.05
  const pad = PADDING[height] ?? PADDING.standard
  const centered = align === "center"
  const accentColor = (ACCENT[accent] ?? ACCENT.gold).color
  const mainHref = safeLink(buttonLink)
  const secondHref = safeLink(linkUrl)

  return (
    <section className={cn("relative w-full overflow-hidden text-white", className)} aria-label={eyebrow || headline}>
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: FOCUS[imageFocus] ?? "center" }}
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: "#1F2D55" }} />
      )}

      {/* Dark layer so the text is easy to read. Left to right on computers, even on phones. */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: centered
            ? `rgba(${OVERLAY_RGB}, ${even})`
            : `linear-gradient(90deg, rgba(${OVERLAY_RGB}, ${left}) 0%, rgba(${OVERLAY_RGB}, ${left}) 45%, rgba(${OVERLAY_RGB}, ${right}) 100%)`,
        }}
      />
      <div className="absolute inset-0 md:hidden" style={{ background: `rgba(${OVERLAY_RGB}, ${Math.max(left, even)})` }} />

      <div className="relative mx-auto max-w-[1160px] px-6" style={{ paddingTop: pad, paddingBottom: pad }}>
        <div className={cn("max-w-[560px]", centered && "mx-auto text-center")}>
          {eyebrow ? (
            <div className="text-[13px] font-bold tracking-[3px]" style={{ color: accentColor }}>
              {eyebrow}
            </div>
          ) : null}

          {headline ? (
            <h2
              className={cn("font-serif font-normal leading-[1.15]", eyebrow && "mt-3.5")}
              style={{ fontSize: "clamp(28px, 4.4vw, 42px)" }}
            >
              {headline}
            </h2>
          ) : null}

          {bodyMain ? <p className="mt-5 text-base leading-relaxed md:text-lg">{bodyMain}</p> : null}
          {bodySecondary ? <p className="mt-3.5 text-[15px] leading-relaxed opacity-90 md:text-base">{bodySecondary}</p> : null}

          {(mainHref && buttonText) || (secondHref && linkText) ? (
            <div className={cn("mt-8 flex flex-wrap items-center gap-x-6 gap-y-4", centered && "justify-center")}>
              {mainHref && buttonText ? (
                <SmartLink
                  href={mainHref}
                  className="inline-flex min-h-[48px] items-center rounded-md px-7 py-3 text-base font-bold transition-opacity hover:opacity-90 md:text-[17px]"
                  style={{ backgroundColor: accentColor, color: NAVY_TEXT }}
                >
                  {buttonText}
                  <span aria-hidden="true">&nbsp;&rarr;</span>
                </SmartLink>
              ) : null}
              {secondHref && linkText ? (
                <SmartLink href={secondHref} className="inline-flex min-h-[44px] items-center text-base font-bold text-white underline underline-offset-4 hover:opacity-80">
                  {linkText}
                </SmartLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
