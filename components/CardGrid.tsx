"use client"

import Link from "next/link"
import { formatInline } from "@/lib/inline-format"
import type { CSSProperties, ReactNode } from "react"

/**
 * CardGrid — an optional heading block above a grid of cards.
 *
 * - Cards are a list in Studio ("+ Add item"); each card is named by its heading.
 * - Marker: none, auto-numbered (01, 02, ...), or an icon image/SVG per card.
 * - Everything is blank-safe: leave the eyebrow, heading, lead or a card's text
 *   empty and it disappears with no leftover gap.
 * - Light hover lift (CSS only, no scripts), switched off for visitors who
 *   have "reduce motion" turned on.
 * - No global CSS: nothing here can affect other parts of the page.
 */

// Brand palette (from the GCMM brand guide)
const NAVY = "#1F2D55"
const BLUE = "#336896"
const NEUTRAL = "#EFEFEF"
const WHITE = "#FFFFFF"
const SLATE = "#4B5668"

// Text sits inside a centered container this wide so it lines up with the
// header on big screens. Background still runs edge to edge.
const PAGE_MAX_WIDTH = "1280px"

type Level = "h1" | "h2" | "h3"
type CardLevel = "h1" | "h2" | "h3" | "h4"
type Align = "left" | "center"
type WidthChoice = "narrow" | "medium" | "wide"
type MarkerChoice = "none" | "number" | "icon"
type MarkerPosition = "above" | "beside"
type ColumnsChoice = "1" | "2" | "3"
type HoverChoice = "lift" | "none"
type SizeChoice = "small" | "medium" | "large" | "xl"
type WeightChoice = "regular" | "medium" | "semibold" | "bold"
type FontChoice = "site" | "georgia" | "nunito" | "poppins" | "lexend"
type SpaceChoice = "none" | "small" | "medium" | "large" | "xl"

export interface CardItem {
  heading?: string
  text?: string
  icon?: string
  link?: string
}

interface CardGridProps {
  className?: string

  // Heading block (all optional)
  eyebrow?: string
  heading?: string
  headingLevel?: Level
  lead?: string

  // Cards
  cards?: CardItem[]
  marker?: MarkerChoice
  markerPosition?: MarkerPosition
  columns?: ColumnsChoice
  hoverEffect?: HoverChoice
  alignment?: Align
  contentWidth?: WidthChoice

  // Spacing
  spaceY?: SpaceChoice
  spaceTop?: SpaceChoice
  spaceBottom?: SpaceChoice
  spaceX?: SpaceChoice

  // Colors (blank = automatic brand colors)
  backgroundColor?: string
  cardColor?: string
  borderColor?: string
  headingColor?: string
  textColor?: string
  cardHeadingColor?: string
  cardTextColor?: string
  eyebrowColor?: string
  markerColor?: string
  markerTextColor?: string

  // Text style
  headingFont?: FontChoice
  headingSize?: SizeChoice
  headingWeight?: WeightChoice
  cardTitleFont?: FontChoice
  cardTextSize?: SizeChoice
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

const CARD_TEXT_SIZES: Record<SizeChoice, string> = {
  small: "0.875rem",
  medium: "1rem",
  large: "clamp(1rem, 2vw, 1.125rem)",
  xl: "clamp(1.0625rem, 2.2vw, 1.25rem)",
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

// Full class strings (not built dynamically) so Tailwind can see them.
const COLUMN_CLASSES: Record<ColumnsChoice, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}

const CONTENT_WIDTHS: Record<WidthChoice, string> = {
  narrow: "640px",
  medium: "800px",
  wide: "1100px",
}

const NEXT_LEVEL: Record<Level, CardLevel> = {
  h1: "h2",
  h2: "h3",
  h3: "h4",
}

function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/i.test(url)
}

const DEFAULT_CARDS: CardItem[] = [
  { heading: "Card heading", text: "Describe this card in a sentence or two." },
  { heading: "Card heading", text: "Describe this card in a sentence or two." },
  { heading: "Card heading", text: "Describe this card in a sentence or two." },
]

export function CardGrid({
  className = "",

  // Heading block
  eyebrow = "",
  heading = "",
  headingLevel = "h2",
  lead = "",

  // Cards
  cards = DEFAULT_CARDS,
  marker = "number",
  markerPosition = "above",
  columns = "2",
  hoverEffect = "lift",
  alignment = "left",
  contentWidth = "medium",

  // Spacing
  spaceY = "large",
  spaceTop,
  spaceBottom,
  spaceX = "medium",

  // Colors
  backgroundColor,
  cardColor,
  borderColor,
  headingColor,
  textColor,
  cardHeadingColor,
  cardTextColor,
  eyebrowColor,
  markerColor,
  markerTextColor,

  // Text style
  headingFont = "georgia",
  headingSize = "large",
  headingWeight = "bold",
  cardTitleFont = "site",
  cardTextSize = "medium",
}: CardGridProps) {
  const eyebrowText = eyebrow.trim()
  const headingText = heading.trim()
  const leadText = lead.trim()
  const hasHeadingBlock = Boolean(eyebrowText || headingText || leadText)
  const list = (cards || []).filter(
    (c) => c && (c.heading?.trim() || c.text?.trim() || c.icon?.trim())
  )

  if (!hasHeadingBlock && list.length === 0) return null

  const colBackground = backgroundColor || NEUTRAL
  const colCard = cardColor || WHITE
  const colBorder = borderColor || "rgba(31, 45, 85, 0.12)"
  const colHeading = headingColor || NAVY
  const colText = textColor || SLATE
  const colCardHeading = cardHeadingColor || NAVY
  const colCardText = cardTextColor || SLATE
  const colEyebrow = eyebrowColor || BLUE
  const colMarker = markerColor || "rgba(51, 104, 150, 0.12)"
  const colMarkerText = markerTextColor || BLUE

  const SectionHeading = headingLevel
  // Cards sit one level under the section heading; with no section heading
  // they take the section's own level so the page outline never skips a step.
  const CardTitle: CardLevel = headingText ? NEXT_LEVEL[headingLevel] : headingLevel

  const centered = alignment === "center"
  const lifts = hoverEffect === "lift"

  const renderCard = (card: CardItem, index: number) => {
    const title = card.heading?.trim() || ""
    const body = card.text?.trim() || ""
    const icon = card.icon?.trim() || ""
    const link = card.link?.trim() || ""

    let markerNode: ReactNode = null
    if (marker === "number") {
      markerNode = String(index + 1).padStart(2, "0")
    } else if (marker === "icon" && icon) {
      markerNode = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          style={{ width: 24, height: 24, objectFit: "contain" }}
        />
      )
    }

    const cardStyle = {
      backgroundColor: colCard,
      borderColor: colBorder,
      "--cg-hover": BLUE,
    } as CSSProperties

    const beside = markerPosition === "beside"

    const markerEl =
      markerNode !== null ? (
        <div
          aria-hidden="true"
          style={{
            width: 44,
            height: 44,
            borderRadius: "9999px",
            backgroundColor: colMarker,
            color: colMarkerText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9375rem",
            fontWeight: 700,
            marginBottom: beside ? 0 : "1rem",
            flexShrink: 0,
          }}
        >
          {markerNode}
        </div>
      ) : null

    const textEls = (
      <>
        {title && (
          <CardTitle
            style={{
              margin: 0,
              color: colCardHeading,
              fontFamily: FONT_STACKS[cardTitleFont],
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {formatInline(title)}
          </CardTitle>
        )}

        {body && (
          <p
            style={{
              margin: title ? "0.5rem 0 0" : 0,
              color: colCardText,
              fontSize: CARD_TEXT_SIZES[cardTextSize],
              lineHeight: 1.65,
              whiteSpace: "pre-line",
            }}
          >
            {formatInline(body)}
          </p>
        )}
      </>
    )

    const inner = (
      <div
        className={`flex h-full flex-col rounded-xl border p-6 sm:p-7 ${
          centered ? "items-center text-center" : "items-start text-left"
        } ${
          lifts
            ? "transition duration-200 ease-out hover:-translate-y-1 hover:border-[var(--cg-hover)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            : ""
        }`}
        style={cardStyle}
      >
        {beside && markerEl ? (
          <div
            className="flex w-full flex-row gap-4"
            style={{ alignItems: title ? "flex-start" : "center" }}
          >
            {markerEl}
            <div className="min-w-0 flex-1">{textEls}</div>
          </div>
        ) : (
          <>
            {markerEl}
            {textEls}
          </>
        )}
      </div>
    )

    if (!link) {
      return <div key={index}>{inner}</div>
    }

    const linkClass =
      "block h-full rounded-xl no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

    return (
      <div key={index}>
        {isExternal(link) ? (
          <a
            href={link}
            {...(/^https?:/i.test(link)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={linkClass}
          >
            {inner}
          </a>
        ) : (
          <Link href={link} className={linkClass}>
            {inner}
          </Link>
        )}
      </div>
    )
  }

  return (
    <section
      className={className}
      style={{
        width: "100%",
        backgroundColor: colBackground,
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: PAGE_MAX_WIDTH,
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
          paddingTop: SPACE_Y[spaceTop ?? spaceY],
          paddingBottom: SPACE_Y[spaceBottom ?? spaceY],
          paddingLeft: SPACE_X[spaceX],
          paddingRight: SPACE_X[spaceX],
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {hasHeadingBlock && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: centered ? "center" : "flex-start",
              textAlign: centered ? "center" : "left",
              gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
              maxWidth: CONTENT_WIDTHS[contentWidth],
              marginLeft: centered ? "auto" : 0,
              marginRight: centered ? "auto" : 0,
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
              <SectionHeading
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
              </SectionHeading>
            )}

            {leadText && (
              <p
                style={{
                  margin: 0,
                  color: colText,
                  fontSize: "clamp(1.0625rem, 2.2vw, 1.25rem)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                  textWrap: "pretty",
                }}
              >
                {formatInline(leadText)}
              </p>
            )}
          </div>
        )}

        {list.length > 0 && (
          <div className={`grid gap-4 sm:gap-5 ${COLUMN_CLASSES[columns]}`}>
            {list.map((card, i) => renderCard(card, i))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CardGrid
