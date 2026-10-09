"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { formatInline } from "@/lib/inline-format"
import { EYEBROW_STYLES, type EyebrowSizeChoice } from "@/lib/eyebrow-sizes"
import { parseVideoSource } from "@/lib/video-source"
import { trackEvent } from "@/lib/track-event"

/**
 * VideoSection - ONE reusable video block (with optional text and two buttons).
 *
 * - Paste ANY YouTube or Vimeo link, embed link, or the whole embed code.
 * - Light by design: the page shows a picture with a play button. The real
 *   player (about 1.7 MB for YouTube) loads ONLY after someone clicks play.
 *   The picture is lazy-loaded too, unless "Video is visible without
 *   scrolling" is turned on.
 * - The play control is a real button. For people without JavaScript (and for
 *   search engines) a plain link to the video's own page sits behind it.
 * - Every play is counted in Google Analytics ("video_play").
 * - Text and buttons are blank-safe, exactly like Content Section: leave a
 *   field empty and it disappears with no gap.
 * - No global CSS: scoped class names (vs-*) only.
 */

// Brand palette (same as Content Section)
const NAVY = "#1F2D55"
const BLUE = "#336896"
const AMBER = "#F4A300"
const WHITE = "#FFFFFF"

const PAGE_MAX_WIDTH = "1280px"

type Level = "h1" | "h2" | "h3"
type Align = "left" | "center" | "right"
type Layout = "above" | "below" | "left" | "right"
type SizeChoice = "small" | "medium" | "large" | "xl"
type WeightChoice = "regular" | "medium" | "semibold" | "bold"
type FontChoice = "site" | "georgia" | "nunito" | "poppins" | "lexend"
type SpaceChoice = "none" | "small" | "medium" | "large" | "xl"
type WidthChoice = "narrow" | "medium" | "wide"
type ShapeChoice = "wide" | "classic" | "square" | "tall"
type RadiusChoice = "none" | "small" | "medium" | "large"
type SideWidth = "small" | "medium" | "large"
type HeadingPosition = "besideVideo" | "aboveVideo"

interface VideoSectionProps {
  className?: string

  // Content
  eyebrow?: string
  heading?: string
  headingLevel?: Level
  headingPosition?: HeadingPosition
  lead?: string
  leadSize?: SizeChoice
  body?: string
  paragraphGap?: ParagraphGap

  // Video
  videoLink?: string
  videoTitle?: string
  posterImage?: string
  videoShape?: ShapeChoice
  videoRadius?: RadiusChoice
  videoShadow?: boolean
  loadEagerly?: boolean
  videoTrackingLabel?: string

  // Buttons
  buttonText?: string
  buttonLink?: string
  trackingLabel?: string
  secondButtonText?: string
  secondButtonLink?: string
  secondTrackingLabel?: string
  phoneButtons?: "full" | "natural"

  // Layout
  layout?: Layout
  verticalAlign?: "top" | "middle"
  videoWidth?: SideWidth
  phoneOrder?: "textFirst" | "videoFirst"
  alignment?: Align
  contentWidth?: WidthChoice
  stackedVideoWidth?: "same" | WidthChoice
  stackedVideoAlign?: "text" | "left" | "center"
  spaceY?: SpaceChoice
  spaceTop?: SpaceChoice
  spaceBottom?: SpaceChoice
  spaceX?: SpaceChoice

  // Colors (blank = automatic brand colors)
  backgroundColor?: string
  lightText?: boolean
  textColor?: string
  headingColor?: string
  eyebrowColor?: string
  buttonColor?: string
  buttonTextColor?: string
  secondButtonColor?: string
  secondButtonHoverTextColor?: string
  playButtonColor?: string

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

// Lead line (large text under the heading). Medium = the original size.
const LEAD_SIZES: Record<SizeChoice, string> = {
  small: "clamp(1rem, 2vw, 1.25rem)",
  medium: "clamp(1.125rem, 2.2vw, 1.5rem)",
  large: "clamp(1.25rem, 2.6vw, 1.75rem)",
  xl: "clamp(1.375rem, 3vw, 2.125rem)",
}

const WEIGHTS: Record<WeightChoice, number> = { regular: 400, medium: 500, semibold: 600, bold: 700 }

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

// Extra space between the text and a video stacked above or below it.
const VIDEO_GAP = "clamp(0.875rem, calc(2vw + 2px), 1.625rem)"

const CONTENT_WIDTHS: Record<WidthChoice, string> = { narrow: "640px", medium: "800px", wide: "1100px" }
const ALIGN_ITEMS: Record<Align, string> = { left: "flex-start", center: "center", right: "flex-end" }
const SHAPES: Record<ShapeChoice, string> = { wide: "16 / 9", classic: "4 / 3", square: "1 / 1", tall: "9 / 16" }
const RADII: Record<RadiusChoice, string> = { none: "0px", small: "6px", medium: "12px", large: "20px" }

// Columns for the side-by-side layouts: [text, video]
const SIDE_COLUMNS: Record<SideWidth, [string, string]> = {
  small: ["3fr", "2fr"],
  medium: ["1fr", "1fr"],
  large: ["2fr", "3fr"],
}

function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/i.test(url)
}

// Body text: blank lines make paragraphs; a line starting with "## " becomes a
// subheading (same convention as Content Section).
type Block = { kind: "heading" | "text"; text: string } | { kind: "list"; items: string[] }

// A bullet line: "- text", "* text" or a bullet character followed by text.
const BULLET_LINE = /^[ \t]*(?:\u2022|[-*])[ \t]+(.+?)[ \t]*$/

function parseBody(body: string): Block[] {
  const blocks: Block[] = []
  let buffer: string[] = []
  let items: string[] = []
  const flush = () => {
    const text = buffer.join("\n").trim()
    if (text) blocks.push({ kind: "text", text })
    buffer = []
  }
  const flushList = () => {
    if (items.length > 0) blocks.push({ kind: "list", items })
    items = []
  }
  const lines = body.replace(/\r/g, "").split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const h = line.match(/^[ \t]*##[ \t]+(.+?)[ \t]*$/)
    const bullet = h ? null : line.match(BULLET_LINE)
    if (h) {
      flush()
      flushList()
      blocks.push({ kind: "heading", text: h[1] })
    } else if (bullet) {
      flush()
      items.push(bullet[1])
    } else if (items.length > 0 && line.trim() === "") {
      // A blank line between bullets keeps the same list; otherwise it ends the list.
      let next = i + 1
      while (next < lines.length && lines[next].trim() === "") next++
      if (!(next < lines.length && BULLET_LINE.test(lines[next]))) flushList()
    } else {
      flushList()
      buffer.push(line)
    }
  }
  flush()
  flushList()
  return blocks
}

type ParagraphGap = "normal" | "medium" | "small" | "tight"

// Space between paragraphs (relative to the text size, so it also shrinks on
// phones). "normal" = the original blank-line look.
const PARAGRAPH_GAPS: Record<Exclude<ParagraphGap, "normal">, string> = {
  medium: "1.1em",
  small: "0.8em",
  tight: "0.5em",
}

// Space between bullets (follows "Space between paragraphs").
const LIST_GAPS: Record<ParagraphGap, string> = {
  normal: "0.4em",
  medium: "0.4em",
  small: "0.3em",
  tight: "0.15em",
}

// Blank lines start a new paragraph; a single Enter stays a line break.
function splitParagraphs(text: string): string[] {
  return text
    .split(/\n(?:[ \t]*\n)+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

const SUB_LEVEL: Record<Level, "h2" | "h3"> = { h1: "h2", h2: "h2", h3: "h3" }

const SECTION_CSS = `
.vs-btns{display:flex;flex-wrap:wrap;gap:0.5rem 1rem}
@media (max-width:640px){
.vs-btns{margin-top:0.75rem}
.vs-btns-full{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:1fr;gap:0.75rem}
.vs-btns-full > a{margin-top:0;width:100%;box-sizing:border-box;text-align:center}
}
.vs-side{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--vs-gap)}
.vs-side > .vs-video{order:var(--vs-o-phone)}
@media (min-width:768px){
.vs-side{grid-template-columns:var(--vs-cols);align-items:var(--vs-align)}
.vs-side > .vs-video{order:var(--vs-o-desk)}
}
.vs-play{position:absolute;top:0;right:0;bottom:0;left:0;display:block;width:100%;height:100%;cursor:pointer;border:0;padding:0;margin:0;background:transparent;font:inherit;color:inherit;appearance:none;-webkit-appearance:none}
.vs-play:focus-visible{outline:3px solid #fff;outline-offset:-6px}
.vs-body{align-items:var(--vs-ai-phone);text-align:var(--vs-ta-phone)}
.vs-body .vs-btns{justify-content:var(--vs-ai-phone)}
@media (min-width:768px){.vs-body{align-items:flex-start;text-align:left}.vs-body .vs-btns{justify-content:flex-start}}
.vs-dot{transition:transform 0.2s ease}
@media (prefers-reduced-motion:no-preference){.vs-play:hover .vs-dot,.vs-play:focus-visible .vs-dot{transform:scale(1.08)}}
`

export function VideoSection({
  className = "",

  eyebrow = "",
  heading = "",
  headingLevel = "h2",
  headingPosition = "besideVideo",
  lead = "",
  leadSize = "medium",
  body = "",
  paragraphGap = "normal",

  videoLink = "",
  videoTitle = "",
  posterImage = "",
  videoShape = "wide",
  videoRadius = "medium",
  videoShadow = true,
  loadEagerly = false,
  videoTrackingLabel = "",

  buttonText = "",
  buttonLink = "",
  trackingLabel = "",
  secondButtonText = "",
  secondButtonLink = "",
  secondTrackingLabel = "",
  phoneButtons = "full",

  layout = "below",
  verticalAlign = "middle",
  videoWidth = "medium",
  phoneOrder = "videoFirst",
  alignment = "left",
  contentWidth = "medium",
  stackedVideoWidth = "same",
  stackedVideoAlign = "text",
  spaceY = "large",
  spaceTop,
  spaceBottom,
  spaceX = "medium",

  backgroundColor,
  lightText = false,
  textColor,
  headingColor,
  eyebrowColor,
  buttonColor,
  buttonTextColor,
  secondButtonColor,
  secondButtonHoverTextColor,
  playButtonColor,

  eyebrowSize = "normal",
  headingFont = "georgia",
  headingSize = "large",
  headingWeight = "bold",
  bodyFont = "site",
  bodySize = "medium",
  bodyWeight = "regular",
}: VideoSectionProps) {
  const [playing, setPlaying] = useState(false)
  const [thumbIndex, setThumbIndex] = useState(0)
  const [inEditor, setInEditor] = useState(false)
  const [secondHover, setSecondHover] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const warmed = useRef(false)
  const filePlayed = useRef(false)

  useEffect(() => {
    try {
      setInEditor(window.self !== window.top) // true inside the Plasmic Studio canvas
    } catch {
      setInEditor(true)
    }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(query.matches)
    const onChange = () => setReduceMotion(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (playing) iframeRef.current?.focus()
  }, [playing])

  const source = parseVideoSource(videoLink)
  const eyebrowText = eyebrow.trim()
  const headingText = heading.trim()
  const leadText = lead.trim()
  const bodyBlocks = parseBody(body)
  const btnText = buttonText.trim()
  const btnLink = buttonLink.trim()
  const btn2Text = secondButtonText.trim()
  const btn2Link = secondButtonLink.trim()
  const hasButton = btnText.length > 0 && btnLink.length > 0
  const hasSecond = btn2Text.length > 0 && btn2Link.length > 0
  const hasText = !!(eyebrowText || headingText || leadText || bodyBlocks.length || hasButton || hasSecond)
  const poster = posterImage.trim()

  // Plain-text name used for screen readers and for analytics
  const title = (videoTitle.trim() || headingText.replace(/\*+/g, "")).trim()

  const isSide = layout === "left" || layout === "right"
  // Where a video above or below the text sits (Same as the text / Left / Center)
  const vAlign: Align = stackedVideoAlign === "text" ? alignment : stackedVideoAlign

  // Automatic colors: navy/blue on light, white on dark (when "Light text" is on)
  const colBackground = backgroundColor || WHITE
  const colText = textColor || (lightText ? WHITE : NAVY)
  const colHeading = headingColor || (lightText ? WHITE : NAVY)
  const colEyebrow = eyebrowColor || (lightText ? AMBER : BLUE)
  const colButton = buttonColor || AMBER
  const colButtonText = buttonTextColor || NAVY
  const colPlay = playButtonColor || AMBER

  const outlineColor = secondButtonColor || (lightText ? WHITE : NAVY)
  const outlineHoverText = secondButtonHoverTextColor || (!secondButtonColor && lightText ? NAVY : WHITE)
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
  const SubHeading = SUB_LEVEL[headingLevel]
  const eyebrowStyle = EYEBROW_STYLES[eyebrowSize] ?? EYEBROW_STYLES.normal
  const gap = "clamp(0.75rem, 1.5vw, 1.25rem)"
  const stackGap = "clamp(1.25rem, 3vw, 2rem)"

  const sendPlay = () => {
    if (!source) return
    trackEvent("video_play", {
      video_title: title || undefined,
      video_provider: source.provider,
      video_id: source.provider === "file" ? undefined : source.id,
      video_label: videoTrackingLabel.trim() || undefined,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    })
  }

  const startPlaying = () => {
    if (playing) return
    setPlaying(true)
    sendPlay()
  }

  // Start warming up the connection as soon as someone hovers/touches the button,
  // so the click-to-play delay is hardly noticeable.
  const warm = () => {
    if (warmed.current || !source || source.provider === "file") return
    warmed.current = true
    const origins =
      source.provider === "youtube"
        ? ["https://www.youtube-nocookie.com", "https://i.ytimg.com"]
        : ["https://player.vimeo.com", "https://i.vimeocdn.com"]
    for (const href of origins) {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = href
      document.head.appendChild(link)
    }
  }

  // ---- Video block ----------------------------------------------------------
  const thumbSrc = poster || (source && source.thumbnailUrls[thumbIndex]) || ""

  const playDot = (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(0deg, rgba(11,18,32,0.35), rgba(11,18,32,0.05))",
      }}
    >
      <span
        className="vs-dot"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "clamp(3.5rem, 9vw, 5rem)",
          height: "clamp(3.5rem, 9vw, 5rem)",
          borderRadius: "9999px",
          backgroundColor: colPlay,
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        <svg width="40%" height="40%" viewBox="0 0 24 24" style={{ marginLeft: "6%" }}>
          <path d="M8 5v14l11-7z" fill={NAVY} />
        </svg>
      </span>
    </span>
  )

  let videoInner: React.ReactNode = null
  if (source) {
    if (source.provider === "file") {
      videoInner = (
        <video
          controls
          playsInline
          preload="none"
          poster={poster || undefined}
          aria-label={title || undefined}
          onPlay={() => {
            if (filePlayed.current) return
            filePlayed.current = true
            sendPlay()
          }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={source.embedUrl} />
        </video>
      )
    } else if (playing) {
      videoInner = (
        <iframe
          ref={iframeRef}
          src={source.embedUrl}
          title={title || "Video"}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
        />
      )
    } else {
      videoInner = (
        <>
        <button
          type="button"
          className="vs-play"
          aria-label={title ? `Play video: ${title}` : "Play video"}
          onClick={startPlaying}
          onPointerEnter={warm}
          onFocus={warm}
          onTouchStart={warm}
        >
          {thumbSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbSrc}
              alt=""
              decoding="async"
              loading={loadEagerly ? "eager" : "lazy"}
              {...(loadEagerly ? { fetchPriority: "high" as const } : {})}
              onError={() => {
                if (!poster) setThumbIndex((i) => i + 1)
              }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {playDot}
        </button>
        {/* Without JavaScript (and for search engines) the whole picture is a plain link to the video's own page. */}
        <noscript>
          <a
            href={source.watchUrl}
            aria-label={title ? `Watch video: ${title}` : "Watch video"}
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }}
          />
        </noscript>
        </>
      )
    }
  }

  const placeholder =
    !source && inEditor ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: SHAPES[videoShape],
          width: "100%",
          border: "2px dashed #94a3b8",
          borderRadius: RADII[videoRadius],
          color: "#475569",
          fontSize: "1rem",
          textAlign: "center",
          padding: "1rem",
          boxSizing: "border-box",
          backgroundColor: "rgba(148,163,184,0.12)",
        }}
      >
        {videoLink.trim()
          ? "This video link is not recognised. Paste a YouTube or Vimeo link, or the embed code."
          : "Add a video link (YouTube or Vimeo) in the Video settings."}
      </div>
    ) : null

  const videoBlock =
    source || placeholder ? (
      <div
        className="vs-video"
        style={
          {
            minWidth: 0,
            width: "100%",
            ...(videoShape === "tall" && !isSide
              ? { maxWidth: "min(100%, 24rem)", marginLeft: vAlign === "left" ? 0 : "auto", marginRight: vAlign === "right" ? 0 : "auto" }
              : !isSide && stackedVideoWidth !== "same"
                ? {
                    maxWidth: CONTENT_WIDTHS[stackedVideoWidth],
                    marginLeft: vAlign === "left" ? 0 : "auto",
                    marginRight: vAlign === "right" ? 0 : "auto",
                  }
                : {}),
            ...(!isSide && hasText ? (layout === "below" ? { marginTop: VIDEO_GAP } : { marginBottom: VIDEO_GAP }) : {}),
            "--vs-o-phone": phoneOrder === "videoFirst" ? -1 : 0,
            "--vs-o-desk": layout === "left" ? -1 : 0,
          } as CSSProperties
        }
      >
        {source ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: SHAPES[videoShape],
              overflow: "hidden",
              borderRadius: RADII[videoRadius],
              boxShadow: videoShadow ? "0 20px 45px -20px rgba(31,45,85,0.45)" : "none",
              backgroundColor: "#0B1220",
            }}
          >
            {videoInner}
          </div>
        ) : (
          placeholder
        )}
      </div>
    ) : null

  // ---- Text block -----------------------------------------------------------
  const makeWrapStyle = (align?: Align): CSSProperties => ({
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    ...(align ? { alignItems: ALIGN_ITEMS[align], textAlign: align } : {}),
    gap,
    color: colText,
    fontFamily: FONT_STACKS[bodyFont],
  })
  const textWrapStyle = makeWrapStyle(alignment)

  // With a tighter "Space between paragraphs", blocks of body text that follow each
  // other (paragraph, bullet list) sit that close instead of the wider text-part gap.
  const joinTop = (index: number): CSSProperties => {
    if (paragraphGap === "normal" || index === 0) return {}
    const prev = bodyBlocks[index - 1]
    const cur = bodyBlocks[index]
    if ((prev.kind === "text" || prev.kind === "list") && (cur.kind === "text" || cur.kind === "list")) {
      return { marginTop: `calc(${PARAGRAPH_GAPS[paragraphGap]} - ${gap})` }
    }
    return {}
  }

  // With "Heading position: Above the video", the heading part follows Text alignment
  // everywhere. The body text and buttons stay left beside the video on computers and
  // follow Text alignment on phones (where everything is stacked).
  const splitHeader = isSide && headingPosition === "aboveVideo" && (eyebrowText || headingText || leadText).length > 0

  // Top part of the text: small label, heading and lead text
  const headerParts = (
    <>
      {eyebrowText && (
        <p
          style={{
            margin: 0,
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
        <p style={{ margin: 0, fontSize: LEAD_SIZES[leadSize] ?? LEAD_SIZES.medium, fontWeight: 500, lineHeight: 1.45 }}>
          {formatInline(leadText)}
        </p>
      )}

    </>
  )

  // Bottom part of the text: body paragraphs and buttons
  const bodyParts = (
    <>
      {bodyBlocks.map((block, index) =>
        block.kind === "list" ? (
          <ul
            key={index}
            style={{
              margin: 0,
              paddingLeft: "1.35em",
              listStyleType: "disc",
              textAlign: "left",
              fontSize: BODY_SIZES[bodySize],
              fontWeight: WEIGHTS[bodyWeight],
              lineHeight: 1.7,
              ...joinTop(index),
            }}
          >
            {block.items.map((item, i) => (
              <li key={i} style={{ paddingLeft: "0.25em", marginTop: i === 0 ? 0 : LIST_GAPS[paragraphGap] }}>
                {formatInline(item)}
              </li>
            ))}
          </ul>
        ) : block.kind === "heading" ? (
          <SubHeading
            key={index}
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
            {formatInline(block.text)}
          </SubHeading>
        ) : paragraphGap !== "normal" ? (
          <div key={index} style={{ fontSize: BODY_SIZES[bodySize], ...joinTop(index) }}>
            {splitParagraphs(block.text).map((para, i) => (
              <p
                key={i}
                style={{
                  margin: 0,
                  marginTop: i === 0 ? 0 : PARAGRAPH_GAPS[paragraphGap],
                  fontSize: BODY_SIZES[bodySize],
                  fontWeight: WEIGHTS[bodyWeight],
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                  textWrap: "pretty",
                }}
              >
                {formatInline(para)}
              </p>
            ))}
          </div>
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
          className={phoneButtons === "full" ? "vs-btns vs-btns-full" : "vs-btns"}
          style={splitHeader ? undefined : { justifyContent: ALIGN_ITEMS[alignment] }}
        >
          {hasButton &&
            (isExternal(btnLink) ? (
              <a
                href={btnLink}
                {...(/^https?:/i.test(btnLink) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(trackingLabel.trim() ? { "data-track-label": trackingLabel.trim() } : {})}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-3.5 font-semibold no-underline transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: colButton, color: colButtonText }}
              >
                <span>{btnText}</span>
                <span aria-hidden="true">{"\u2192"}</span>
              </a>
            ) : (
              <Link
                href={btnLink}
                {...(trackingLabel.trim() ? { "data-track-label": trackingLabel.trim() } : {})}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-7 py-3.5 font-semibold no-underline transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: colButton, color: colButtonText }}
              >
                <span>{btnText}</span>
                <span aria-hidden="true">{"\u2192"}</span>
              </Link>
            ))}

          {hasSecond &&
            (isExternal(btn2Link) ? (
              <a
                href={btn2Link}
                {...(/^https?:/i.test(btn2Link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(secondTrackingLabel.trim() ? { "data-track-label": secondTrackingLabel.trim() } : {})}
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
                {...(secondTrackingLabel.trim() ? { "data-track-label": secondTrackingLabel.trim() } : {})}
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
    </>
  )

  const hasRestText = !!(bodyBlocks.length || hasButton || hasSecond)

  // "Heading position: Above the video" only applies to the side-by-side layouts.
  // The small label, heading and lead text go in a full-width row on top;
  // the body text and buttons stay beside the video.

  const headerBlock = splitHeader ? <div style={textWrapStyle}>{headerParts}</div> : null

  const textBlock = !hasText ? null : splitHeader ? (
    hasRestText ? (
      <div
        className="vs-body"
        style={{ ...makeWrapStyle(), "--vs-ai-phone": ALIGN_ITEMS[alignment], "--vs-ta-phone": alignment } as CSSProperties}
      >
        {bodyParts}
      </div>
    ) : null
  ) : (
    <div style={textWrapStyle}>
      {headerParts}
      {bodyParts}
    </div>
  )

  // Nothing to show at all (blank link, no text, not in the editor): render nothing.
  if (!videoBlock && !textBlock && !headerBlock) return null

  const [textCol, videoCol] = SIDE_COLUMNS[videoWidth]
  const sideVars = {
    "--vs-cols": `minmax(0, ${textCol}) minmax(0, ${videoCol})`,
    "--vs-align": verticalAlign === "top" ? "start" : "center",
    "--vs-gap": "clamp(1.5rem, 4vw, 3rem)",
  } as CSSProperties

  const stackedWrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: stackGap,
    maxWidth: CONTENT_WIDTHS[contentWidth],
    marginLeft: alignment === "left" ? 0 : "auto",
    marginRight: alignment === "right" ? 0 : "auto",
  }

  return (
    <section className={className} style={{ width: "100%", backgroundColor: colBackground }}>
      <style>{SECTION_CSS}</style>
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
        {isSide ? (
          headerBlock ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.75rem, 4vw, 3rem)" }}>
              {headerBlock}
              <div className="vs-side" style={sideVars}>
                {textBlock}
                {videoBlock}
              </div>
            </div>
          ) : (
            <div className="vs-side" style={sideVars}>
              {textBlock}
              {videoBlock}
            </div>
          )
        ) : (
          <div style={stackedWrapStyle}>
            {layout === "above" && videoBlock}
            {textBlock}
            {layout === "below" && videoBlock}
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoSection
