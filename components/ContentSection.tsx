"use client"

import Image from "next/image"
import Link from "next/link"
import { formatInline } from "@/lib/inline-format"

/**
 * ContentSection — one reusable section for heroes and text blocks.
 *
 * - Every text element is blank-safe: leave a field empty and it disappears
 *   with no leftover gap (spacing is a single flex `gap`, not per-element margins).
 * - Photo can sit above, below, or behind the text (with a color overlay).
 * - Colors left blank pick brand-appropriate defaults automatically
 *   (navy/blue text on light, white text + amber label on a photo).
 * - No global CSS: nothing here can affect other parts of the page.
 */

// Brand palette (from the GCMM brand guide)
const NAVY = "#1F2D55"
const BLUE = "#336896"
const AMBER = "#F4A300"
const WHITE = "#FFFFFF"

// Text sits inside a centered container this wide, so on big screens it lines
// up with the header logo instead of hugging the browser edge. The section's
// background and photo still run full-bleed. (1280px = 80rem, matching the
// header's content width as measured from the 1440px Studio canvas.)
const PAGE_MAX_WIDTH = "1280px"

type Level = "h1" | "h2" | "h3"
type Align = "left" | "center" | "right"
type ImagePosition = "above" | "below" | "behind"
type SizeChoice = "small" | "medium" | "large" | "xl"
type WeightChoice = "regular" | "medium" | "semibold" | "bold"
type FontChoice = "site" | "georgia" | "nunito" | "poppins" | "lexend"
type SpaceChoice = "none" | "small" | "medium" | "large" | "xl"
type WidthChoice = "narrow" | "medium" | "wide"
type HeightChoice = "short" | "medium" | "tall"

interface ContentSectionProps {
  className?: string

  // Content
  eyebrow?: string
  heading?: string
  headingLevel?: Level
  lead?: string
  body?: string

  // Button
  buttonText?: string
  buttonLink?: string
  trackingLabel?: string

  // Image
  showImage?: boolean
  image?: string
  imageAlt?: string
  imagePosition?: ImagePosition
  imageHeight?: HeightChoice
  loadEagerly?: boolean

  // Overlay (only used when image is behind the text)
  overlayColor?: string
  overlayStrength?: number

  // Layout
  alignment?: Align
  contentWidth?: WidthChoice
  spaceY?: SpaceChoice
  spaceX?: SpaceChoice

  // Colors (blank = automatic brand colors)
  backgroundColor?: string
  textColor?: string
  headingColor?: string
  eyebrowColor?: string
  buttonColor?: string
  buttonTextColor?: string

  // Text style
  headingFont?: FontChoice
  headingSize?: SizeChoice
  headingWeight?: WeightChoice
  bodyFont?: FontChoice
  bodySize?: SizeChoice
  bodyWeight?: WeightChoice
}

const FONT_STACKS: Record<FontChoice, string> = {
  site: "inherit",
  georgia: 'Georgia, Gelasio, "Times New Roman", serif',
  nunito: "Nunito, system-ui, sans-serif",
  poppins: "Poppins, system-ui, sans-serif",
  lexend: "Lexend, system-ui, sans-serif",
}

const HEADING_SIZES: Record<SizeChoice, string> = {
  small: "clamp(1.5rem, 3vw, 1.875rem)",
  medium: "clamp(1.75rem, 4vw, 2.5rem)",
  large: "clamp(2rem, 5vw, 3.25rem)",
  xl: "clamp(2.25rem, 6vw, 4rem)",
}

const BODY_SIZES: Record<SizeChoice, string> = {
  small: "1rem",
  medium: "clamp(1rem, 2vw, 1.125rem)",
  large: "clamp(1.0625rem, 2.2vw, 1.25rem)",
  xl: "clamp(1.125rem, 2.5vw, 1.375rem)",
}

const WEIGHTS: Record<WeightChoice, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

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

const CONTENT_WIDTHS: Record<WidthChoice, string> = {
  narrow: "640px",
  medium: "800px",
  wide: "1100px",
}

const IMAGE_HEIGHTS: Record<HeightChoice, string> = {
  short: "clamp(14rem, 30vw, 22rem)",
  medium: "clamp(18rem, 40vw, 32rem)",
  tall: "clamp(22rem, 50vw, 42rem)",
}

const BEHIND_MIN_HEIGHTS: Record<HeightChoice, string> = {
  short: "320px",
  medium: "480px",
  tall: "640px",
}

const ALIGN_ITEMS: Record<Align, string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
}

function getImageUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url
  }
  return `/${url}`
}

function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/i.test(url)
}

export function ContentSection({
  className = "",

  // Content
  eyebrow = "",
  heading = "Your heading here",
  headingLevel = "h2",
  lead = "",
  body = "",

  // Button
  buttonText = "",
  buttonLink = "",
  trackingLabel = "",

  // Image
  showImage = true,
  image = "",
  imageAlt = "",
  imagePosition = "below",
  imageHeight = "medium",
  loadEagerly = false,

  // Overlay
  overlayColor,
  overlayStrength = 60,

  // Layout
  alignment = "left",
  contentWidth = "medium",
  spaceY = "large",
  spaceX = "medium",

  // Colors
  backgroundColor,
  textColor,
  headingColor,
  eyebrowColor,
  buttonColor,
  buttonTextColor,

  // Text style
  headingFont = "georgia",
  headingSize = "large",
  headingWeight = "bold",
  bodyFont = "site",
  bodySize = "medium",
  bodyWeight = "regular",
}: ContentSectionProps) {
  const eyebrowText = eyebrow.trim()
  const headingText = heading.trim()
  const leadText = lead.trim()
  const bodyText = body.trim()
  const btnText = buttonText.trim()
  const btnLink = buttonLink.trim()
  const imageSrc = image.trim()

  const hasImage = showImage && imageSrc.length > 0
  const isBehind = hasImage && imagePosition === "behind"
  const hasButton = btnText.length > 0 && btnLink.length > 0

  // Automatic colors: dark text on light, white text on a photo
  const colBackground = backgroundColor || WHITE
  const colText = textColor || (isBehind ? WHITE : NAVY)
  const colHeading = headingColor || (isBehind ? WHITE : NAVY)
  const colEyebrow = eyebrowColor || (isBehind ? AMBER : BLUE)
  const colButton = buttonColor || AMBER
  const colButtonText = buttonTextColor || NAVY
  const colOverlay = overlayColor || NAVY

  const Heading = headingLevel
  const gap = "clamp(0.75rem, 1.5vw, 1.25rem)"
  const alt = imageAlt.trim() // blank alt = decorative image

  const imageBlock = hasImage && !isBehind && (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: IMAGE_HEIGHTS[imageHeight],
      }}
    >
      <Image
        src={getImageUrl(imageSrc)}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        {...(loadEagerly ? { priority: true } : { loading: "lazy" as const })}
      />
    </div>
  )

  const textBlock = (eyebrowText || headingText || leadText || bodyText || hasButton) && (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: PAGE_MAX_WIDTH,
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box",
        paddingTop: SPACE_Y[spaceY],
        paddingBottom: SPACE_Y[spaceY],
        paddingLeft: SPACE_X[spaceX],
        paddingRight: SPACE_X[spaceX],
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: ALIGN_ITEMS[alignment],
          textAlign: alignment,
          gap,
          maxWidth: CONTENT_WIDTHS[contentWidth],
          marginLeft: alignment === "left" ? 0 : "auto",
          marginRight: alignment === "right" ? 0 : "auto",
          color: colText,
          fontFamily: FONT_STACKS[bodyFont],
        }}
      >
        {eyebrowText && (
          <p
            style={{
              margin: 0,
              color: colEyebrow,
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {formatInline(eyebrowText)}
          </p>
        )}

        {headingText && (
          <Heading
            style={{
              margin: 0,
              color: colHeading,
              fontFamily: FONT_STACKS[headingFont],
              fontSize: HEADING_SIZES[headingSize],
              fontWeight: WEIGHTS[headingWeight],
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            {formatInline(headingText)}
          </Heading>
        )}

        {leadText && (
          <p
            style={{
              margin: 0,
              fontSize: "clamp(1.125rem, 2.2vw, 1.5rem)",
              fontWeight: 500,
              lineHeight: 1.45,
            }}
          >
            {formatInline(leadText)}
          </p>
        )}

        {bodyText && (
          <p
            style={{
              margin: 0,
              fontSize: BODY_SIZES[bodySize],
              fontWeight: WEIGHTS[bodyWeight],
              lineHeight: 1.7,
              whiteSpace: "pre-line",
              textWrap: "pretty",
            }}
          >
            {formatInline(bodyText)}
          </p>
        )}

        {hasButton &&
          (isExternal(btnLink) ? (
            <a
              href={btnLink}
              {...(/^https?:/i.test(btnLink)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(trackingLabel.trim() ? { "data-track-label": trackingLabel.trim() } : {})}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-3.5 font-semibold no-underline transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: colButton, color: colButtonText }}
            >
              <span>{btnText}</span>
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link
              href={btnLink}
              {...(trackingLabel.trim() ? { "data-track-label": trackingLabel.trim() } : {})}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-3.5 font-semibold no-underline transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: colButton, color: colButtonText }}
            >
              <span>{btnText}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
      </div>
    </div>
  )

  return (
    <section
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: colBackground,
        ...(isBehind
          ? {
              minHeight: BEHIND_MIN_HEIGHTS[imageHeight],
              display: "flex",
              alignItems: "center",
            }
          : {}),
      }}
    >
      {isBehind && (
        <>
          <Image
            src={getImageUrl(imageSrc)}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", zIndex: 0 }}
            {...(loadEagerly ? { priority: true } : { loading: "lazy" as const })}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              backgroundColor: colOverlay,
              opacity: Math.min(Math.max(overlayStrength, 0), 100) / 100,
            }}
          />
        </>
      )}

      {hasImage && imagePosition === "above" && imageBlock}
      {textBlock}
      {hasImage && imagePosition === "below" && imageBlock}
    </section>
  )
}

export default ContentSection
