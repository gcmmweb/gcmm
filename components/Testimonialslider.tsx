"use client"

import { useState, useEffect, type CSSProperties } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatInline } from '@/lib/inline-format'

// Only the site's actual brand fonts are offered here, so this component
// can't accidentally pull in an extra Google Font the way a free-text
// Tailwind class name could.
const QUOTE_FONT_STACKS: Record<string, string> = {
  Nunito: '"Nunito", sans-serif',
  Poppins: '"Poppins", sans-serif',
  Georgia: "Georgia, serif",
  // The site's loaded web font is specifically the "Lexend Peta" variant,
  // not the base "Lexend" family - matching that exactly avoids loading
  // a second, separate Lexend font by mistake.
  Lexend: '"Lexend Peta", sans-serif',
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// ---------------------------------------------------------------------------
// QUOTE STYLES (Oct 2026). "classic" is the original slider look and is what
// every existing instance keeps until someone picks another style. The four new
// styles share one renderer below. To add a fifth style later: add its name to
// QuoteStyle, one entry in STYLE_DEFAULTS, one branch in renderStyledQuote(), and
// one option in the Studio registration.
// ---------------------------------------------------------------------------
type QuoteStyle = "classic" | "pull" | "bar" | "card" | "min"
type QuoteSize = "small" | "medium" | "large" | "xl"
type QuoteFace = "georgia" | "nunito" | "poppins" | "lexend"

const GOLD = "#CBA86D"
const NEW_FACES: Record<QuoteFace, string> = {
  georgia: QUOTE_FONT_STACKS.Georgia,
  nunito: QUOTE_FONT_STACKS.Nunito,
  poppins: QUOTE_FONT_STACKS.Poppins,
  lexend: QUOTE_FONT_STACKS.Lexend,
}
const QUOTE_SIZES: Record<QuoteSize, string> = {
  small: "clamp(1.0625rem, 2vw, 1.25rem)",
  medium: "clamp(1.125rem, 2.3vw, 1.375rem)",
  large: "clamp(1.25rem, 2.8vw, 1.625rem)",
  xl: "clamp(1.625rem, 3.8vw, 2.25rem)",
}
type MarkSize = "small" | "medium" | "large" | "xl"
// Size of the quote mark in the new quote styles. Medium = the original size.
const MARK_SIZES: Record<MarkSize, { pull: string; pullBox: string; inline: string }> = {
  small: { pull: "2.5rem", pullBox: "1.25rem", inline: "1.6em" },
  medium: { pull: "3.5rem", pullBox: "1.75rem", inline: "2.1em" },
  large: { pull: "5rem", pullBox: "2.5rem", inline: "3em" },
  xl: { pull: "7rem", pullBox: "3.5rem", inline: "4em" },
}
type SpaceChoice = "none" | "small" | "medium" | "large" | "xl"
const SPACE_Y: Record<SpaceChoice, string> = {
  none: "0px",
  small: "clamp(1.5rem, 3vw, 2.5rem)",
  medium: "clamp(2.5rem, 5vw, 4rem)",
  large: "clamp(3.5rem, 7vw, 6rem)",
  xl: "clamp(5rem, 10vw, 8rem)",
}
const SPACE_X: Record<SpaceChoice, string> = {
  none: "0px",
  small: "1rem",
  medium: "clamp(1rem, 4vw, 2rem)",
  large: "clamp(1.5rem, 6vw, 4rem)",
  xl: "clamp(2rem, 8vw, 6rem)",
}
// What each style looks like when the person has not chosen a size / italic.
const STYLE_DEFAULTS: Record<Exclude<QuoteStyle, "classic">, { size: QuoteSize; italic: boolean }> = {
  pull: { size: "large", italic: true },
  bar: { size: "medium", italic: true },
  card: { size: "medium", italic: false },
  min: { size: "medium", italic: true },
}

interface Testimonial {
  quote: string
  name: string
  title?: string
  organization?: string
  location?: string
  // Optional round photo (square 240 x 240 px works well). Used by the new styles.
  photo?: string
  // NEW: each testimony can carry its own "read more" destination.
  // Leave this blank in the CMS for any testimony that has no full story yet -
  // the button simply won't render on that slide.
  readMoreUrl?: string
}

interface TestimonialSliderProps {
  // Content
  testimonials?: Testimonial[]

  // Visibility
  showAttribution?: boolean
  showQuoteIcon?: boolean
  showName?: boolean
  showTitle?: boolean
  showOrganization?: boolean
  showLocation?: boolean

  // Styling
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  arrowColor?: string
  quoteIconColor?: string
  
  // Individual Element Colors
  nameColor?: string
  titleColor?: string
  organizationColor?: string
  locationColor?: string
  locationBadgeColor?: string

  // Typography - Quote
  quoteFontSize?: string
  quoteLineHeight?: string
  quoteFontWeight?: "normal" | "bold"
  quoteFontStyle?: "normal" | "italic"
  quoteFont?: "Nunito" | "Poppins" | "Georgia" | "Lexend"

  // Typography - Attribution
  nameFontSize?: string
  nameLineHeight?: string
  nameFontWeight?: "normal" | "bold"
  nameFontStyle?: "normal" | "italic"

  titleFontSize?: string
  titleLineHeight?: string
  titleFontWeight?: "normal" | "bold"
  titleFontStyle?: "normal" | "italic"

  organizationFontSize?: string
  organizationLineHeight?: string
  organizationFontWeight?: "normal" | "bold"
  organizationFontStyle?: "normal" | "italic"

  locationFontSize?: string
  locationLineHeight?: string
  locationFontWeight?: "normal" | "bold"
  locationFontStyle?: "normal" | "italic"

  // Layout
  alignment?: "left" | "center" | "right"
  maxWidth?: string
  mobileMaxWidth?: string
  padding?: string
  mobilePadding?: string
  spaceY?: SpaceChoice
  spaceTop?: SpaceChoice
  spaceBottom?: SpaceChoice
  spaceX?: SpaceChoice
  
  // Navigation
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  // Shuffles the testimonial order once per page load (client-side only).
  // Off by default so existing usages keep their current fixed order.
  randomizeOrder?: boolean

  // Read More Button
  // NOTE: showReadMore is now a MASTER on/off switch for the whole component.
  // The actual per-slide visibility is controlled by whether that testimony
  // has a readMoreUrl set (see Testimonial interface above).
  showReadMore?: boolean
  readMoreText?: string
  readMoreOpenInNewTab?: boolean
  readMoreFontSize?: string
  readMoreFontWeight?: "normal" | "bold"
  readMoreBackgroundColor?: string
  readMoreTextColor?: string
  readMoreHoverBackgroundColor?: string
  readMoreHoverTextColor?: string

  // Quote style (Oct 2026). Unset = "classic" = the original look.
  quoteStyle?: QuoteStyle
  quoteSize?: QuoteSize
  quoteFace?: QuoteFace
  quoteItalic?: "auto" | "yes" | "no"
  markColor?: string
  markSize?: MarkSize
  cardColor?: string
  lightText?: boolean

  className?: string
}

export function TestimonialSlider({
  // Content
  testimonials = [
    {
      quote: "Sample quote: replace this with the words someone shared with us.",
      name: "Name",
      title: "",
      organization: "",
      location: "",
      readMoreUrl: "",
    },
  ],

  // Visibility
  showAttribution = true,
  showQuoteIcon = true,
  showName = true,
  showTitle = true,
  showOrganization = true,
  showLocation = true,

  // Styling
  backgroundColor = "transparent",
  textColor = "#1e293b",
  accentColor = "#1F2D55",
  arrowColor = "#1F2D55",
  quoteIconColor = "#1F2D55",
  
  // Individual Element Colors
  nameColor = "#1F2D55",
  titleColor = "#1e293b",
  organizationColor = "#64748b",
  locationColor = "#ffffff",
  locationBadgeColor = "#1F2D55",

  // Typography - Quote
  quoteFontSize = "1.25rem",
  quoteLineHeight = "1.8",
  quoteFontWeight = "normal",
  quoteFontStyle = "normal",
  quoteFont = "Nunito",

  // Typography - Attribution
  nameFontSize = "1.125rem",
  nameLineHeight = "1.4",
  nameFontWeight = "bold",
  nameFontStyle = "normal",

  titleFontSize = "1rem",
  titleLineHeight = "1.5",
  titleFontWeight = "normal",
  titleFontStyle = "normal",

  organizationFontSize = "1rem",
  organizationLineHeight = "1.5",
  organizationFontWeight = "normal",
  organizationFontStyle = "normal",

  locationFontSize = "0.875rem",
  locationLineHeight = "1.5",
  locationFontWeight = "normal",
  locationFontStyle = "normal",

  // Layout
  alignment = "left",
  maxWidth = "900px",
  mobileMaxWidth = "100%",
  padding = "3rem 1.5rem",
  mobilePadding = "2rem 0.5rem",
  spaceY,
  spaceTop,
  spaceBottom,
  spaceX,
  
  // Navigation
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  randomizeOrder = false,

  // Read More Button (master switch + shared styling only - URL now lives per-testimony)
  showReadMore = false,
  readMoreText = "Read More",
  readMoreOpenInNewTab = false,
  readMoreFontSize = "1rem",
  readMoreFontWeight = "normal",
  readMoreBackgroundColor = "#1F2D55",
  readMoreTextColor = "#ffffff",
  readMoreHoverBackgroundColor = "#0A6C93",
  readMoreHoverTextColor = "#ffffff",

  // Quote style (unset = classic = original look)
  quoteStyle = "classic",
  quoteSize,
  quoteFace = "georgia",
  quoteItalic = "auto",
  markColor = GOLD,
  markSize = "medium",
  cardColor,
  lightText = false,

  className = "",
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Spacing dropdowns. Left blank = the old Padding boxes still apply, so
  // existing pages do not change.
  const useSpaceChoices = !!(spaceY || spaceTop || spaceBottom || spaceX)
  const spacePadding = `${SPACE_Y[spaceTop ?? spaceY ?? "medium"]} ${SPACE_X[spaceX ?? "medium"]} ${SPACE_Y[spaceBottom ?? spaceY ?? "medium"]}`
  const effPadding = useSpaceChoices ? spacePadding : padding
  const effMobilePadding = useSpaceChoices ? spacePadding : mobilePadding

  // Display order for the testimonials. Starts as the original CMS order
  // (so the server render and the client's first render match, avoiding a
  // hydration mismatch), then - if Randomize Order is on - gets shuffled
  // client-side right after mount.
  const [orderedTestimonials, setOrderedTestimonials] = useState(testimonials)

  useEffect(() => {
    setOrderedTestimonials(
      randomizeOrder && testimonials.length > 1 ? shuffleArray(testimonials) : testimonials
    )
    setCurrentIndex(0)
  }, [randomizeOrder, testimonials])

  // Auto-play functionality
  // FIX: this was previously `useState(() => {...})`, which is wrong for side effects.
  // useState's initializer runs once to compute a value - the cleanup function it
  // returned was silently discarded, so the interval it created was NEVER cleared.
  // Every render (including repeated server-side renders) left one more interval
  // running forever in the background. useEffect is the correct tool here: React
  // calls the returned cleanup function automatically on unmount / before re-running
  // the effect, so the timer is properly torn down instead of leaking.
  useEffect(() => {
    if (autoPlay && orderedTestimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % orderedTestimonials.length)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, orderedTestimonials.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % orderedTestimonials.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + orderedTestimonials.length) % orderedTestimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const getButtonAlignment = () => {
    switch (alignment) {
      case "left":
        return "flex-start"
      case "center":
        return "center"
      case "right":
        return "flex-end"
      default:
        return "flex-start"
    }
  }

  if (!orderedTestimonials || orderedTestimonials.length === 0) {
    return null
  }

  const currentTestimonial = orderedTestimonials[currentIndex]

  // Per-slide check: only render the button if this specific testimony has a URL
  const currentReadMoreUrl = currentTestimonial.readMoreUrl?.trim()
  const canShowReadMore = showReadMore && !!currentReadMoreUrl

  // ===== NEW STYLES: pull quote / gold bar / soft card / minimal =====
  if (quoteStyle !== "classic" && STYLE_DEFAULTS[quoteStyle]) {
    const sizeKey: QuoteSize = quoteSize ?? STYLE_DEFAULTS[quoteStyle].size
    const italic =
      quoteItalic === "yes" ? true : quoteItalic === "no" ? false : STYLE_DEFAULTS[quoteStyle].italic
    const colText = lightText ? "#FFFFFF" : textColor
    const colName = lightText ? GOLD : nameColor
    const colTitle = lightText ? "rgba(255,255,255,0.9)" : titleColor
    const colOrg = lightText ? "rgba(255,255,255,0.75)" : organizationColor
    const colNav = lightText ? "#FFFFFF" : arrowColor
    const colDot = lightText ? "#FFFFFF" : accentColor
    const colCard = cardColor || (lightText ? "rgba(255,255,255,0.09)" : "#F3F4F6")
    const t = currentTestimonial
    const centered = quoteStyle === "pull"
    const photoSize = quoteStyle === "min" ? 40 : quoteStyle === "pull" ? 60 : 64

    const quoteCss: CSSProperties = {
      margin: 0,
      fontFamily: NEW_FACES[quoteFace] ?? NEW_FACES.georgia,
      fontSize: QUOTE_SIZES[sizeKey],
      lineHeight: 1.5,
      fontStyle: italic ? "italic" : "normal",
      fontWeight: 400,
      color: colText,
      whiteSpace: "pre-line",
    }

    const photoEl = t.photo && t.photo.trim() ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={t.photo.trim()}
        alt=""
        width={photoSize}
        height={photoSize}
        loading="lazy"
        decoding="async"
        style={{ width: photoSize, height: photoSize, borderRadius: "9999px", objectFit: "cover", flex: "none", display: "block" }}
      />
    ) : null

    const hasName = showAttribution && showName && !!t.name
    const hasTitle = showAttribution && showTitle && !!t.title
    const hasOrg = showAttribution && showOrganization && !!t.organization
    const lines = (align: "left" | "center") =>
      hasName || hasTitle || hasOrg ? (
        <div style={{ textAlign: align, fontFamily: QUOTE_FONT_STACKS.Nunito }}>
          {hasName && (
            <div style={{ fontSize: "0.9375rem", fontWeight: 700, lineHeight: 1.4, color: colName }}>
              {formatInline(t.name)}
            </div>
          )}
          {hasTitle && (
            <div style={{ fontSize: "0.84375rem", lineHeight: 1.45, color: colTitle }}>{formatInline(t.title as string)}</div>
          )}
          {hasOrg && (
            <div style={{ fontSize: "0.84375rem", lineHeight: 1.45, color: colOrg }}>{formatInline(t.organization as string)}</div>
          )}
        </div>
      ) : null

    // Short label above the quote (the "pill"). Same field as before: Location.
    const pill =
      showLocation && t.location ? (
        <div style={{ marginBottom: "1rem", textAlign: centered ? "center" : "left" }}>
          <div
            className="inline-block px-4 py-1 rounded-full font-semibold text-sm"
            style={{ backgroundColor: locationBadgeColor, color: locationColor }}
          >
            {formatInline(t.location)}
          </div>
        </div>
      ) : null

    // On a dark background the original navy button would vanish, so use the brand amber.
    const rmBg = lightText ? "#F4A300" : readMoreBackgroundColor
    const rmText = lightText ? "#1F2D55" : readMoreTextColor
    const rmHoverBg = lightText ? "#FFFFFF" : readMoreHoverBackgroundColor
    const rmHoverText = lightText ? "#1F2D55" : readMoreHoverTextColor

    const readMore = canShowReadMore ? (
      <div style={{ display: "flex", justifyContent: centered ? "center" : "flex-start", marginTop: "1.5rem" }}>
        <a
          href={currentReadMoreUrl}
          target={readMoreOpenInNewTab ? "_blank" : undefined}
          rel={readMoreOpenInNewTab ? "noopener noreferrer" : undefined}
          className="inline-block px-6 py-3 rounded-lg transition-all duration-200"
          style={{
            fontSize: readMoreFontSize,
            fontWeight: readMoreFontWeight,
            backgroundColor: isHovering ? rmHoverBg : rmBg,
            color: isHovering ? rmHoverText : rmText,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {readMoreText}
        </a>
      </div>
    ) : null

    let slide: React.ReactNode = null
    if (quoteStyle === "pull") {
      slide = (
        <div style={{ textAlign: "center", padding: "0 0.5rem" }}>
          {pill}
          <div
            aria-hidden="true"
            style={{ fontFamily: QUOTE_FONT_STACKS.Georgia, fontSize: MARK_SIZES[markSize]?.pull ?? "3.5rem", lineHeight: 0.55, height: MARK_SIZES[markSize]?.pullBox ?? "1.75rem", color: markColor }}
          >
            {"\u201C"}
          </div>
          <blockquote style={{ ...quoteCss, marginTop: "0.375rem" }}>{formatInline(t.quote)}</blockquote>
          <div style={{ width: 40, height: 2, background: markColor, margin: "1.125rem auto 0.875rem" }} />
          {photoEl && <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>{photoEl}</div>}
          {lines("center")}
          {readMore}
        </div>
      )
    } else if (quoteStyle === "bar") {
      slide = (
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", borderLeft: `4px solid ${markColor}`, paddingLeft: "1.25rem" }}>
          {photoEl}
          <div style={{ minWidth: 0 }}>
            {pill}
            <blockquote style={quoteCss}>{"\u201C"}{formatInline(t.quote)}{"\u201D"}</blockquote>
            <div style={{ marginTop: "0.75rem" }}>{lines("left")}</div>
            {readMore}
          </div>
        </div>
      )
    } else if (quoteStyle === "card") {
      slide = (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
            background: colCard,
            borderLeft: `4px solid ${markColor}`,
            borderRadius: "0 0.625rem 0.625rem 0",
            padding: "1.25rem 1.5rem",
          }}
        >
          {photoEl}
          <div style={{ minWidth: 0 }}>
            {pill}
            <blockquote style={quoteCss}>{formatInline(t.quote)}</blockquote>
            <div style={{ marginTop: "0.75rem" }}>{lines("left")}</div>
            {readMore}
          </div>
        </div>
      )
    } else {
      slide = (
        <div>
          {pill}
          <blockquote style={quoteCss}>
            <span aria-hidden="true" style={{ color: markColor, fontSize: MARK_SIZES[markSize]?.inline ?? "2.1em", lineHeight: 0, verticalAlign: "-0.28em", marginRight: "0.12em" }}>
              {"\u201C"}
            </span>
            {formatInline(t.quote)}
            {"\u201D"}
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "0.75rem" }}>
            {photoEl}
            {lines("left")}
          </div>
          {readMore}
        </div>
      )
    }

    const many = orderedTestimonials.length > 1
    const navBtn: CSSProperties = {
      width: 36,
      height: 36,
      borderRadius: "9999px",
      border: "1px solid currentColor",
      background: "transparent",
      color: colNav,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      opacity: 0.85,
    }

    return (
      <div className={`relative ${className}`}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .testimonial-outer-wrapper { background-color: ${backgroundColor}; padding: ${effPadding}; }
          .testimonial-content-wrapper { max-width: ${maxWidth}; }
          @media (max-width: 768px) {
            .testimonial-outer-wrapper { padding: ${effMobilePadding}; }
            .testimonial-content-wrapper { max-width: ${mobileMaxWidth}; }
          }
        `,
          }}
        />
        <div className="testimonial-outer-wrapper">
          <div
            className="mx-auto testimonial-content-wrapper"
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
          >
            <div aria-live={autoPlay ? "off" : "polite"}>{slide}</div>
            {many && (showArrows || showDots) && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.875rem", marginTop: "1.5rem" }}>
                {showArrows && (
                  <button type="button" onClick={goToPrevious} style={navBtn} aria-label="Previous testimonial">
                    <ChevronLeft size={18} />
                  </button>
                )}
                {showDots &&
                  orderedTestimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "9999px",
                        border: 0,
                        padding: 0,
                        cursor: "pointer",
                        backgroundColor: colDot,
                        opacity: index === currentIndex ? 1 : 0.3,
                      }}
                    />
                  ))}
                {showArrows && (
                  <button type="button" onClick={goToNext} style={navBtn} aria-label="Next testimonial">
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative ${className}`}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .testimonial-outer-wrapper {
            background-color: ${backgroundColor};
            padding: ${effPadding};
          }
          .testimonial-content-wrapper {
            max-width: ${maxWidth};
          }
          .testimonial-flex-container {
            gap: 1.5rem;
          }
          .testimonial-arrow {
            padding: 0.5rem;
          }
          .testimonial-arrow svg {
            width: 2rem;
            height: 2rem;
          }
          @media (max-width: 768px) {
            .testimonial-outer-wrapper {
              padding: ${effMobilePadding};
            }
            .testimonial-content-wrapper {
              max-width: ${mobileMaxWidth};
            }
            .testimonial-flex-container {
              gap: 0.5rem;
            }
            .testimonial-arrow {
              padding: 0.25rem;
            }
            .testimonial-arrow svg {
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        `
      }} />
      <div className="testimonial-outer-wrapper">
      <div
        className={`mx-auto testimonial-content-wrapper ${getAlignmentClass()}`}
      >
        <div className="flex items-center testimonial-flex-container">
          {/* Left Arrow */}
          {showArrows && orderedTestimonials.length > 1 && (
            <button
              onClick={goToPrevious}
              className="flex-shrink-0 testimonial-arrow rounded-full transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                color: arrowColor,
                focusRingColor: arrowColor,
              } as CSSProperties}
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {showQuoteIcon && (
              <Quote
                className="w-12 h-12 mb-4 opacity-40"
                style={{ 
                  color: quoteIconColor,
                  margin: alignment === "center" ? "0 auto 1rem" : alignment === "right" ? "0 0 1rem auto" : "0 0 1rem 0"
                }}
              />
            )}

            {/* Location Badge */}
            {showLocation && currentTestimonial.location && (
              <div 
                className="inline-block px-4 py-1 rounded-full mb-4 font-semibold text-sm"
                style={{ 
                  backgroundColor: locationBadgeColor,
                  color: locationColor,
                }}
              >
                {formatInline(currentTestimonial.location)}
              </div>
            )}

            <blockquote
              className="mb-6"
              style={{
                fontFamily: QUOTE_FONT_STACKS[quoteFont] ?? QUOTE_FONT_STACKS.Nunito,
                fontSize: quoteFontSize,
                lineHeight: quoteLineHeight,
                fontWeight: quoteFontWeight,
                fontStyle: quoteFontStyle,
                color: textColor,
              }}
            >
              {formatInline(currentTestimonial.quote)}
            </blockquote>

            {showAttribution && (
              <div className="space-y-1">
                {showName && currentTestimonial.name && (
                  <div
                    style={{
                      fontSize: nameFontSize,
                      lineHeight: nameLineHeight,
                      fontWeight: nameFontWeight,
                      fontStyle: nameFontStyle,
                      color: nameColor,
                    }}
                  >
                    {formatInline(currentTestimonial.name)}
                  </div>
                )}

                {showTitle && currentTestimonial.title && (
                  <div
                    style={{
                      fontSize: titleFontSize,
                      lineHeight: titleLineHeight,
                      fontWeight: titleFontWeight,
                      fontStyle: titleFontStyle,
                      color: titleColor,
                    }}
                  >
                    {formatInline(currentTestimonial.title)}
                  </div>
                )}

                {showOrganization && currentTestimonial.organization && (
                  <div
                    style={{
                      fontSize: organizationFontSize,
                      lineHeight: organizationLineHeight,
                      fontWeight: organizationFontWeight,
                      fontStyle: organizationFontStyle,
                      color: organizationColor,
                    }}
                  >
                    {formatInline(currentTestimonial.organization)}
                  </div>
                )}
              </div>
            )}

            {/* Read More Button - only appears when THIS testimony has a URL */}
            {canShowReadMore && (
              <div 
                className="mt-6"
                style={{ 
                  display: 'flex',
                  justifyContent: getButtonAlignment()
                }}
              >
                <a
                  href={currentReadMoreUrl}
                  target={readMoreOpenInNewTab ? "_blank" : undefined}
                  rel={readMoreOpenInNewTab ? "noopener noreferrer" : undefined}
                  className="inline-block px-6 py-3 rounded-lg transition-all duration-200"
                  style={{
                    fontSize: readMoreFontSize,
                    fontWeight: readMoreFontWeight,
                    backgroundColor: isHovering ? readMoreHoverBackgroundColor : readMoreBackgroundColor,
                    color: isHovering ? readMoreHoverTextColor : readMoreTextColor,
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {readMoreText}
                </a>
              </div>
            )}

            {/* Dots Navigation */}
            {showDots && orderedTestimonials.length > 1 && (
              <div className="flex gap-2 mt-8" style={{ justifyContent: alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start" }}>
                {orderedTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="w-2 h-2 rounded-full transition-all focus:outline-none"
                    style={{
                      backgroundColor: index === currentIndex ? accentColor : textColor,
                      opacity: index === currentIndex ? 1 : 0.3,
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {showArrows && orderedTestimonials.length > 1 && (
            <button
              onClick={goToNext}
              className="flex-shrink-0 testimonial-arrow rounded-full transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                color: arrowColor,
                focusRingColor: arrowColor,
              } as CSSProperties}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
