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

interface SerifHeroProps {
  className?: string

  // Content
  eyebrow?: string
  headingStart?: string
  headingItalic?: string
  headingEnd?: string
  headingLevel?: Level
  description?: string

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
  headingStart = "",
  headingItalic = "",
  headingEnd = "",
  headingLevel = "h1",
  description = "",
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

  const start = (headingStart || "").trim()
  const italic = (headingItalic || "").trim()
  const end = (headingEnd || "").trim()

  const headingParts: ReactNode[] = []
  if (start) headingParts.push(start)
  if (italic) {
    headingParts.push(
      <span key="italic" className="italic font-normal">
        {italic}
      </span>
    )
  }
  if (end) headingParts.push(end)

  const label = (eyebrow || "").trim()
  const paragraph = (description || "").trim()

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
              {label}
            </span>
          </div>
        ) : null}

        {headingParts.length > 0 ? (
          <HeadingTag
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.95] mb-8 text-balance"
            style={{ color: headColor }}
          >
            {headingParts.map((part, i) => (
              <Fragment key={i}>
                {i > 0 ? " " : ""}
                {part}
              </Fragment>
            ))}
          </HeadingTag>
        ) : null}

        {paragraph ? (
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-balance"
            style={{ color: bodyColor }}
          >
            {formatInline(paragraph)}
          </p>
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
