"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Link from "next/link"

/**
 * ButtonRow - a row of 1 to 4 buttons, each with its own link and tracking label.
 *
 * - The first button is filled (full color), the others are outlined (border
 *   only). Each button can be switched to either style.
 * - Leave a button's text or link blank and that button disappears.
 * - Tracking labels use the same data-track-label as Content Section.
 * - No global CSS: nothing here can affect other parts of the page.
 */

// Brand palette (from the GCMM brand guide)
const NAVY = "#1F2D55"
const AMBER = "#F4A300"
const WHITE = "#FFFFFF"

const PAGE_MAX_WIDTH = "1280px"
const MAX_BUTTONS = 4

type StyleChoice = "filled" | "outlined"
type Align = "left" | "center" | "right"
type SpaceChoice = "none" | "small" | "medium" | "large" | "xl"

export interface ButtonRowItem {
  text?: string
  link?: string
  trackingLabel?: string
  style?: StyleChoice
}

interface ButtonRowProps {
  className?: string

  buttons?: ButtonRowItem[]
  alignment?: Align
  phoneButtons?: "full" | "natural"
  darkBackground?: boolean
  showArrow?: boolean

  // Spacing
  spaceY?: SpaceChoice
  spaceTop?: SpaceChoice
  spaceBottom?: SpaceChoice
  spaceX?: SpaceChoice

  // Colors (blank = automatic brand colors)
  backgroundColor?: string
  buttonColor?: string
  buttonTextColor?: string
  outlineColor?: string
  outlineHoverTextColor?: string
}

const DEFAULT_BUTTONS: ButtonRowItem[] = [
  { text: "First button", link: "/", style: "filled" },
  { text: "Second button", link: "/", style: "outlined" },
]

const ALIGN_ITEMS: Record<Align, string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
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
  xl: "clamp(1rem, calc(8vw - 1rem), 6rem)",
}

function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/i.test(url)
}

function internalHref(url: string) {
  return url.startsWith("/") || url.startsWith("#") ? url : `/${url}`
}

// Button row. Scoped class names (br-btns) so nothing else on the page is
// affected. On phones: optional full-width stack where every button gets the
// same height (grid-auto-rows: 1fr).
const BUTTON_ROW_CSS = `
.br-btns{display:flex;flex-wrap:wrap;gap:0.75rem 1rem}
@media (max-width:640px){
.br-full{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:1fr;gap:0.75rem;width:100%}
.br-full > a{width:100%;box-sizing:border-box;text-align:center}
}`

const FILLED_CLASS =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-3.5 font-semibold no-underline transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
const OUTLINED_CLASS =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md font-semibold no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

export function ButtonRow({
  className = "",

  buttons = DEFAULT_BUTTONS,
  alignment = "center",
  phoneButtons = "full",
  darkBackground = false,
  showArrow = true,

  // Spacing
  spaceY = "small",
  spaceTop,
  spaceBottom,
  spaceX = "xl",

  // Colors
  backgroundColor,
  buttonColor,
  buttonTextColor,
  outlineColor,
  outlineHoverTextColor,
}: ButtonRowProps) {
  // Outlined-button hover state (inline styles cannot do :hover, and this
  // keeps the component free of global CSS) and the reduce-motion preference.
  const [hovered, setHovered] = useState<number | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(query.matches)
    const onChange = () => setReduceMotion(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  // The first button is filled and the rest are outlined unless a style is set.
  const items = (Array.isArray(buttons) ? buttons : [])
    .slice(0, MAX_BUTTONS)
    .map((b, index) => ({
      text: (b?.text || "").trim(),
      link: (b?.link || "").trim(),
      label: (b?.trackingLabel || "").trim(),
      outlined: b?.style ? b.style === "outlined" : index > 0,
    }))
    .filter((b) => b.text.length > 0 && b.link.length > 0)

  if (items.length === 0) return null

  const colFill = buttonColor || AMBER
  const colFillText = buttonTextColor || NAVY
  const colOutline = outlineColor || (darkBackground ? WHITE : NAVY)
  const colOutlineHoverText =
    outlineHoverTextColor || (!outlineColor && darkBackground ? NAVY : WHITE)

  const renderButton = (b: (typeof items)[number], index: number) => {
    const handlers = b.outlined
      ? {
          onMouseEnter: () => setHovered(index),
          onMouseLeave: () => setHovered(null),
          onFocus: () => setHovered(index),
          onBlur: () => setHovered(null),
        }
      : {}
    const isHover = hovered === index

    // Border is 2px, so padding is reduced by 2px to keep outlined buttons
    // the same height as the filled ones beside them.
    const style: CSSProperties = b.outlined
      ? {
          backgroundColor: isHover ? colOutline : "transparent",
          color: isHover ? colOutlineHoverText : colOutline,
          border: `2px solid ${colOutline}`,
          paddingTop: "calc(0.875rem - 2px)",
          paddingBottom: "calc(0.875rem - 2px)",
          paddingLeft: "calc(1.75rem - 2px)",
          paddingRight: "calc(1.75rem - 2px)",
          transition: reduceMotion ? "none" : "background-color 200ms ease, color 200ms ease",
        }
      : { backgroundColor: colFill, color: colFillText }

    const cls = b.outlined ? OUTLINED_CLASS : FILLED_CLASS
    const track = b.label ? { "data-track-label": b.label } : {}
    const inner = (
      <>
        <span>{b.text}</span>
        {showArrow && <span aria-hidden="true">{"\u2192"}</span>}
      </>
    )

    if (isExternal(b.link)) {
      return (
        <a
          key={index}
          href={b.link}
          {...(/^https?:/i.test(b.link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...track}
          className={cls}
          style={style}
          {...handlers}
        >
          {inner}
        </a>
      )
    }
    return (
      <Link
        key={index}
        href={internalHref(b.link)}
        {...track}
        className={cls}
        style={style}
        {...handlers}
      >
        {inner}
      </Link>
    )
  }

  return (
    <section
      className={className}
      style={{
        width: "100%",
        backgroundColor: backgroundColor || "transparent",
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
        }}
      >
        <style>{BUTTON_ROW_CSS}</style>
        <div
          className={phoneButtons === "full" ? "br-btns br-full" : "br-btns"}
          style={{ justifyContent: ALIGN_ITEMS[alignment] }}
        >
          {items.map(renderButton)}
        </div>
      </div>
    </section>
  )
}

export default ButtonRow
