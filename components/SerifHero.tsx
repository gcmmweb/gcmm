import { Fragment } from "react"
import type { ReactNode } from "react"
import { formatInline } from "@/lib/inline-format"

/**
 * SerifHero - a page opening with a big light serif heading that has one
 * italic word. First used on the About page (Garri's original look), rebuilt
 * as its own small piece so the old one-piece About Us Page can be retired.
 * It is not tied to the About page, so it can be used on any page or project.
 *
 * Look: small capital label above, big serif heading, short paragraph below,
 * soft blue fade at the top and a bouncing scroll icon at the bottom.
 *
 * Editing works like Content Section: the same four boxes with the same names
 * (Eyebrow, Heading, Lead line, Body text) and the same word markers. Example
 * heading:  Broadcasting *Hope* to the world  (the *starred* word shows in
 * italic). **bold** works in every box. In Body text, a blank line starts a new
 * paragraph. (Quotes, bullets and ## subheadings are Content Section features
 * and are not part of this hero.)
 *
 * Differences from the old About version (on purpose):
 * - The text is visible straight away. The old one hid it until the page's
 *   JavaScript had started, which left a blank hero on slow phones.
 * - No page-wide animation script.
 * - Every text field is blank-safe: leave it empty and it disappears.
 * - The scroll icon stops bouncing for visitors who have "reduce motion" on.
 */

type Level = "h1" | "h2"
type HeightChoice = "tall" | "medium" | "short"

// "tall" is the original 800px.
const MIN_HEIGHTS: Record<HeightChoice, string> = {
  tall: "800px",
  medium: "600px",
  short: "400px",
}

// A single Enter inside a box stays a line break; formatting markers still work.
function renderLines(text: string): ReactNode {
  const lines = text.split("\n")
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 ? <br /> : null}
      {formatInline(line)}
    </Fragment>
  ))
}

interface SerifHeroProps {
  className?: string

  // Content
  eyebrow?: string
  heading?: string
  headingLevel?: Level
  lead?: string
  body?: string

  // Layout
  showScrollIcon?: boolean
  height?: HeightChoice

  // Colors (defaults = the original About page colors)
  backgroundColor?: string
  accentColor?: string
  headingColor?: string
  textColor?: string
}

export function SerifHero({
  className,
  eyebrow = "",
  heading = "",
  headingLevel = "h1",
  lead = "",
  body = "",
  showScrollIcon = true,
  height = "tall",
  backgroundColor,
  accentColor,
  headingColor,
  textColor,
}: SerifHeroProps) {
  const bg = backgroundColor || "#FAFAF8"
  const accent = accentColor || "#1B4B6B"
  const headColor = headingColor || "#0A0A0A"
  const bodyColor = textColor || "#4A4A4A"

  const HeadingTag: "h1" | "h2" = headingLevel === "h2" ? "h2" : "h1"

  const headingText = (heading || "").trim()

  const label = (eyebrow || "").trim()
  const leadText = (lead || "").trim()
  // Blank lines start a new paragraph; a single Enter stays a line break.
  const bodyParagraphs = (body || "")
    .split(/\n(?:[ \t]*\n)+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <section
      className={`relative flex items-center justify-center px-6 py-20 overflow-hidden ${className || ""}`}
      style={{ minHeight: MIN_HEIGHTS[height] || MIN_HEIGHTS.tall, backgroundColor: bg }}
    >
      {/* Soft fade of the accent color at the top (5%, same as the original) */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${accent} 5%, transparent), transparent)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {label ? (
          <div className="mb-6 inline-block">
            <span
              className="text-sm font-medium tracking-[0.2em] uppercase"
              style={{ color: accent }}
            >
              {formatInline(label)}
            </span>
          </div>
        ) : null}

        {headingText ? (
          <HeadingTag
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.95] mb-8 text-balance [&_em]:font-normal"
            style={{ color: headColor }}
          >
            {formatInline(headingText)}
          </HeadingTag>
        ) : null}

        {leadText ? (
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-balance"
            style={{ color: bodyColor }}
          >
            {renderLines(leadText)}
          </p>
        ) : null}

        {bodyParagraphs.length > 0 ? (
          <div
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: bodyColor, marginTop: leadText ? "1.5rem" : 0 }}
          >
            {bodyParagraphs.map((para, i) => (
              <p key={i} style={{ marginTop: i === 0 ? 0 : "1.25em" }}>
                {renderLines(para)}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      {showScrollIcon ? (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: accent }}
          >
            <div
              className="w-1 h-3 rounded-full animate-pulse motion-reduce:animate-none"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SerifHero
