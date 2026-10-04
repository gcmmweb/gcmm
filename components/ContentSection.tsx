"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatInline } from "@/lib/inline-format"
import { EYEBROW_STYLES, type EyebrowSizeChoice } from "@/lib/eyebrow-sizes"

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
const GOLD = "#CBA86D"

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

  // Second button (outlined)
  secondButtonText?: string
  secondButtonLink?: string
  secondTrackingLabel?: string
  phoneButtons?: "full" | "natural"

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
  spaceTop?: SpaceChoice
  spaceBottom?: SpaceChoice
  spaceX?: SpaceChoice

  // Colors (blank = automatic brand colors)
  backgroundColor?: string
  textColor?: string
  headingColor?: string
  eyebrowColor?: string
  buttonColor?: string
  buttonTextColor?: string
  secondButtonColor?: string
  secondButtonHoverTextColor?: string

  // Text style
  eyebrowSize?: EyebrowSizeChoice
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
  xl: "clamp(2.25rem, 6vw, 4.5rem)",
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

// ---- Subheadings inside the Body text ------------------------------------
// A body line that starts with "## " becomes a subheading, so one Content
// Section can hold several titled blocks:
//     ## Reaching Hearts Through Ukrainian Media
//     GCMM reaches Ukrainian-speaking audiences ...
//     ## Printed Gospel Resources Across Ukraine
//     Alongside digital media ...
// Body text with no "## " line is shown exactly as before (one block).
// A body line that starts with "> " becomes an indented quote. Consecutive
// "> " lines make one quote; if the last one starts with a dash it is shown
// as the name line:
//     > "Amid the destruction around us ..."
//     > - Galina, Ukraine
type BodyBlock =
  | { kind: "heading" | "text"; text: string }
  | { kind: "quote"; text: string; cite: string }

const SUBHEADING_LINE = /^[ \t]*##[ \t]+(.+?)[ \t]*$/
const QUOTE_LINE = /^[ \t]*>[ \t]?(.*)$/
const CITE_LINE = /^[ \t]*(?:\u2014|\u2013|--)/

function parseBody(body: string): BodyBlock[] {
  const lines = body.split("\n")
  if (!lines.some((line) => SUBHEADING_LINE.test(line) || QUOTE_LINE.test(line))) {
    return body.trim() ? [{ kind: "text", text: body }] : []
  }
  const blocks: BodyBlock[] = []
  let buffer: string[] = []
  let quoteLines: string[] = []
  const flush = () => {
    const text = buffer.join("\n").replace(/^(?:[ \t]*\n)+|(?:\n[ \t]*)+$/g, "")
    if (text.trim()) blocks.push({ kind: "text", text })
    buffer = []
  }
  const flushQuote = () => {
    const rows = quoteLines.map((row) => row.trim()).filter(Boolean)
    quoteLines = []
    if (rows.length === 0) return
    let cite = ""
    if (rows.length > 1 && CITE_LINE.test(rows[rows.length - 1])) {
      cite = rows.pop() as string
    }
    blocks.push({ kind: "quote", text: rows.join("\n"), cite })
  }
  for (const line of lines) {
    const heading = line.match(SUBHEADING_LINE)
    const quote = heading ? null : line.match(QUOTE_LINE)
    if (heading) {
      flush()
      flushQuote()
      blocks.push({ kind: "heading", text: heading[1] })
    } else if (quote) {
      flush()
      quoteLines.push(quote[1])
    } else {
      flushQuote()
      buffer.push(line)
    }
  }
  flush()
  flushQuote()
  return blocks
}

// A "##" subheading is a sibling section, so it uses the SAME tag and size as
// the section heading. The one exception: if the section heading is an H1, the
// subheadings become H2, so a page never ends up with extra H1s.
const SUB_LEVEL: Record<Level, "h2" | "h3"> = { h1: "h2", h2: "h2", h3: "h3" }

// Quote text is a little bigger than the body text (matched to Body size).
const QUOTE_SIZES: Record<SizeChoice, string> = {
  small: "clamp(1.0625rem, 2.2vw, 1.25rem)",
  medium: "clamp(1.0625rem, 2.2vw, 1.375rem)",
  large: "clamp(1.125rem, 2.4vw, 1.5rem)",
  xl: "clamp(1.25rem, 2.6vw, 1.625rem)",
}

// Button row. Scoped class names (cs-btns) so nothing else on the page is
// affected. On phones: optional full-width stack where every button gets the
// same height (grid-auto-rows: 1fr), plus a little space above the buttons.
const BUTTON_ROW_CSS = `
.cs-btns{display:flex;flex-wrap:wrap;gap:0.5rem 1rem}
@media (max-width:640px){
.cs-btns{margin-top:0.75rem}
.cs-btns-full{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:1fr;gap:0.75rem}
.cs-btns-full > a{margin-top:0;width:100%;box-sizing:border-box;text-align:center}
}`

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

  // Second button
  secondButtonText = "",
  secondButtonLink = "",
  secondTrackingLabel = "",
  phoneButtons = "full",

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
  spaceTop,
  spaceBottom,
  spaceX = "medium",

  // Colors
  backgroundColor,
  textColor,
  headingColor,
  eyebrowColor,
  buttonColor,
  buttonTextColor,
  secondButtonColor,
  secondButtonHoverTextColor,

  // Text style
  eyebrowSize = "normal",
  headingFont = "georgia",
  headingSize = "large",
  headingWeight = "bold",
  bodyFont = "site",
  bodySize = "medium",
  bodyWeight = "regular",
}: ContentSectionProps) {
  // Second-button hover state (inline styles cannot do :hover, and this keeps
  // the component free of global CSS) and the reduce-motion preference.
  const [secondHover, setSecondHover] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(query.matches)
    const onChange = () => setReduceMotion(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

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
  const btn2Text = secondButtonText.trim()
  const btn2Link = secondButtonLink.trim()
  const hasSecond = btn2Text.length > 0 && btn2Link.length > 0
  const bodyBlocks = parseBody(bodyText.replace(/\r/g, ""))
  const SubHeading = SUB_LEVEL[headingLevel]
  const subSize = headingSize

  // Automatic colors: dark text on light, white text on a photo
  const colBackground = backgroundColor || WHITE
  const colText = textColor || (isBehind ? WHITE : NAVY)
  const colHeading = headingColor || (isBehind ? WHITE : NAVY)
  const colEyebrow = eyebrowColor || (isBehind ? AMBER : BLUE)
  const colButton = buttonColor || AMBER
  const colButtonText = buttonTextColor || NAVY
  const colOverlay = overlayColor || NAVY

  // Second button: outlined. On hover it fills with its own color and the text
  // flips so it stays readable. Border is 2px, so padding is reduced by 2px to
  // keep it the same height as the filled button beside it.
  const outlineColor = secondButtonColor || (isBehind ? WHITE : NAVY)
  const outlineHoverText =
    secondButtonHoverTextColor || (!secondButtonColor && isBehind ? NAVY : WHITE)
  const outlineClass =
    "mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md font-semibold no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  const outlineStyle: CSSProperties = {
    backgroundColor: secondHover ? outlineColor : "transparent",
    color: secondHover ? outlineHoverText : outlineColor,
    border: `2px solid ${outlineColor}`,
    paddingTop: "calc(0.875rem - 2px)",
    paddingBottom: "calc(0.875rem - 2px)",
    paddingLeft: "calc(1.75rem - 2px)",
    paddingRight: "calc(1.75rem - 2px)",
    transition: reduceMotion ? "none" : "background-color 200ms ease, color 200ms ease",
  }
  const outlineHandlers = {
    onMouseEnter: () => setSecondHover(true),
    onMouseLeave: () => setSecondHover(false),
    onFocus: () => setSecondHover(true),
    onBlur: () => setSecondHover(false),
  }

  const Heading = headingLevel
  const eyebrowStyle = EYEBROW_STYLES[eyebrowSize] ?? EYEBROW_STYLES.normal
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

  const textBlock = (eyebrowText || headingText || leadText || bodyText || hasButton || hasSecond) && (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: PAGE_MAX_WIDTH,
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box",
        paddingTop: SPACE_Y[spaceTop ?? spaceY],
        paddingBottom: SPACE_Y[spaceBottom ?? spaceY],
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
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: eyebrowStyle.marginBottom,
              color: colEyebrow,
              fontSize: eyebrowStyle.fontSize,
              fontWeight: eyebrowStyle.fontWeight,
              letterSpacing: eyebrowStyle.letterSpacing,
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
              lineHeight: 1.45,
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

        {bodyBlocks.map((block, index) =>
          block.kind === "quote" ? (
            <blockquote
              key={index}
              style={{
                margin: 0,
                marginLeft: "clamp(0.25rem, 1.5vw, 0.75rem)",
                paddingLeft: "clamp(1rem, 2.5vw, 1.5rem)",
                borderLeft: `4px solid ${GOLD}`,
                maxWidth: "100%",
                boxSizing: "border-box",
                textAlign: "left",
                fontFamily: FONT_STACKS.georgia,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: QUOTE_SIZES[bodySize],
                lineHeight: 1.55,
                whiteSpace: "pre-line",
                textWrap: "pretty",
              }}
            >
              {formatInline(block.text)}
              {block.cite && (
                <footer
                  style={{
                    marginTop: "0.5rem",
                    fontFamily: FONT_STACKS.nunito,
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "clamp(0.8125rem, 1.6vw, 0.9375rem)",
                    lineHeight: 1.5,
                    whiteSpace: "normal",
                    color: colEyebrow,
                  }}
                >
                  {formatInline(block.cite)}
                </footer>
              )}
            </blockquote>
          ) : block.kind === "heading" ? (
            <SubHeading
              key={index}
              style={{
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
                color: colHeading,
                fontFamily: FONT_STACKS[headingFont],
                fontSize: HEADING_SIZES[subSize],
                fontWeight: WEIGHTS[headingWeight],
                lineHeight: 1.45,
                textWrap: "balance",
              }}
            >
              {formatInline(block.text)}
            </SubHeading>
          ) : (
            <p
              key={index}
              style={{
                margin: 0,
                fontSize: BODY_SIZES[bodySize],
                fontWeight: WEIGHTS[bodyWeight],
                lineHeight: 1.7,
                whiteSpace: "pre-line",
                textWrap: "pretty",
              }}
            >
              {formatInline(block.text)}
            </p>
          )
        )}

        {(hasButton || hasSecond) && (
          <div
            className={phoneButtons === "full" ? "cs-btns cs-btns-full" : "cs-btns"}
            style={{ justifyContent: ALIGN_ITEMS[alignment] }}
          >
            <style>{BUTTON_ROW_CSS}</style>
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

        {hasSecond &&
          (isExternal(btn2Link) ? (
            <a
              href={btn2Link}
              {...(/^https?:/i.test(btn2Link)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(secondTrackingLabel.trim()
                ? { "data-track-label": secondTrackingLabel.trim() }
                : {})}
              className={outlineClass}
              style={outlineStyle}
              {...outlineHandlers}
            >
              <span>{btn2Text}</span>
              <span aria-hidden="true">{"\u2192"}</span>
            </a>
          ) : (
            <Link
              href={btn2Link}
              {...(secondTrackingLabel.trim()
                ? { "data-track-label": secondTrackingLabel.trim() }
                : {})}
              className={outlineClass}
              style={outlineStyle}
              {...outlineHandlers}
            >
              <span>{btn2Text}</span>
              <span aria-hidden="true">{"\u2192"}</span>
            </Link>
          ))}
          </div>
        )}
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
