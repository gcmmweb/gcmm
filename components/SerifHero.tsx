"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { formatInline } from "@/lib/inline-format"

/**
 * SerifHero - a page opening with a big light serif heading that has one
 * italic word. First used on the About page (Garri's original look), rebuilt
 * as its own small piece so the old one-piece About Us Page can be retired.
 * It is not tied to the About page, so it can be used on any page or project.
 *
 * Look: small capital label above, big serif heading, short paragraph below,
 * soft blue fade at the top and a scroll icon at the bottom.
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
 *   JavaScript had started, which left a blank hero on slow phones. This is
 *   also why NOTHING here fades the text in: hidden text would slow the
 *   "largest contentful paint" that PageSpeed measures.
 * - No page-wide animation script.
 * - Every text field is blank-safe: leave it empty and it disappears.
 *
 * Motion (all CSS, no libraries, nothing that shifts the layout):
 * - Scroll icon: bounces a few times, then rests (or keeps bouncing, or stays
 *   still - a Studio dropdown). Hover or keyboard focus bounces it once more.
 * - Clicking or tapping the icon glides to the next section (a soft, slightly
 *   slow ease; the icon nudges down and fades as the page moves). The visitor
 *   can take over at any moment by scrolling, touching or pressing a key.
 * - The icon sits at the bottom of the first screen the visitor sees (not at the
 *   bottom of a tall hero that may run past the edge of the screen), and fades
 *   away once they scroll. One tiny scroll check that switches itself off after
 *   it fires once.
 * - Optional: a line draws under the italic heading word, once, on load.
 * - Everything stands still for visitors whose device asks for reduced motion.
 */

type Level = "h1" | "h2"
type HeightChoice = "tall" | "medium" | "short"
type IconMotion = "rest" | "loop" | "still"
type Accent = "none" | "underline"

// "tall" is the original 800px.
const MIN_HEIGHTS: Record<HeightChoice, string> = {
  tall: "800px",
  medium: "600px",
  short: "400px",
}

// Room to leave for the sticky site header when scrolling to the next section.
const HEADER_GAP = 56

// Height of the icon button (64) plus the breathing room under it (40).
const CUE_BLOCK = 104

const CSS = `
@keyframes gsh-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-22%)}}
@keyframes gsh-bounce-again{0%,100%{transform:translateY(0)}50%{transform:translateY(-22%)}}
@keyframes gsh-dot{0%{transform:translateY(0);opacity:1}70%{transform:translateY(8px);opacity:0}100%{transform:translateY(0);opacity:0}}
@keyframes gsh-dot-again{0%{transform:translateY(0);opacity:1}70%{transform:translateY(8px);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes gsh-draw{from{background-size:0% 3px}to{background-size:100% 3px}}
.gsh-icon{display:block}
.gsh-m-rest{animation:gsh-bounce 1.1s ease-in-out 1.2s 3 both}
.gsh-m-rest .gsh-dot{animation:gsh-dot 1.1s ease-in-out 1.2s 3 both}
.gsh-m-loop{animation:gsh-bounce 1.1s ease-in-out infinite}
.gsh-m-loop .gsh-dot{animation:gsh-dot 1.1s ease-in-out infinite}
.gsh-cue{background:transparent;border:0;border-radius:9999px;padding:12px 14px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.gsh-cue:hover .gsh-m-rest,.gsh-cue:focus-visible .gsh-m-rest{animation:gsh-bounce-again .8s ease-in-out 2}
.gsh-cue:hover .gsh-m-rest .gsh-dot,.gsh-cue:focus-visible .gsh-m-rest .gsh-dot{animation:gsh-dot-again .8s ease-in-out 2}
.gsh-cue:focus-visible{outline:3px solid var(--gsh-accent);outline-offset:2px}
@keyframes gsh-go{0%{transform:translateY(0);opacity:1}100%{transform:translateY(18px);opacity:0}}\n@keyframes gsh-dot-fast{0%{transform:translateY(0);opacity:1}100%{transform:translateY(10px);opacity:0}}\n.gsh-cue.gsh-going .gsh-icon{animation:gsh-go .6s ease-in forwards!important}\n.gsh-cue.gsh-going .gsh-dot{animation:gsh-dot-fast .35s ease-in 2!important}\n.gsh-underline em{background-image:linear-gradient(var(--gsh-accent),var(--gsh-accent));background-repeat:no-repeat;background-position:0 100%;background-size:0% 3px;padding-bottom:.04em;-webkit-box-decoration-break:clone;box-decoration-break:clone;animation:gsh-draw 1s cubic-bezier(.22,.61,.36,1) .6s forwards}
@media (prefers-reduced-motion:reduce){
.gsh-m-rest,.gsh-m-loop,.gsh-m-rest .gsh-dot,.gsh-m-loop .gsh-dot,.gsh-cue:hover .gsh-m-rest,.gsh-cue:hover .gsh-m-rest .gsh-dot,.gsh-cue:focus-visible .gsh-m-rest,.gsh-cue:focus-visible .gsh-m-rest .gsh-dot{animation:none!important}
.gsh-underline em{animation:none!important;background-size:100% 3px!important}\n.gsh-cue.gsh-going .gsh-icon,.gsh-cue.gsh-going .gsh-dot{animation:none!important}
.gsh-fade{transition:none!important}
}
`

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
  scrollIconClick?: boolean
  scrollIconMotion?: IconMotion
  headingAccent?: Accent
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
  scrollIconClick = true,
  scrollIconMotion = "rest",
  headingAccent = "none",
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
  const motion: IconMotion = scrollIconMotion === "loop" || scrollIconMotion === "still" ? scrollIconMotion : "rest"

  const headingText = (heading || "").trim()

  const label = (eyebrow || "").trim()
  const leadText = (lead || "").trim()
  // Blank lines start a new paragraph; a single Enter stays a line break.
  const bodyParagraphs = (body || "")
    .split(/\n(?:[ \t]*\n)+/)
    .map((part) => part.trim())
    .filter(Boolean)

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [going, setGoing] = useState(false)
  // Where the icon sits, measured down from the top of the hero. It goes at the
  // bottom of the first screen the visitor sees, but never on top of the text.
  // null until measured.
  const [cueTop, setCueTop] = useState<number | null>(null)

  useEffect(() => {
    if (!showScrollIcon) return
    const el = sectionRef.current
    if (!el) return
    const start = el.getBoundingClientRect().top
    const measure = () => {
      const r = el.getBoundingClientRect()
      const firstScreen = Math.min(r.height, window.innerHeight - r.top)
      const content = contentRef.current
      const textBottom = content ? content.getBoundingClientRect().bottom - r.top : 0
      const wanted = Math.max(firstScreen - CUE_BLOCK, textBottom + 12)
      setCueTop(Math.round(Math.max(0, Math.min(wanted, r.height - 72))))
    }
    // The icon has done its job once the visitor starts scrolling: fade it out.
    // One passive scroll check that removes itself after it fires.
    const check = () => {
      if (Math.abs(el.getBoundingClientRect().top - start) > 60) {
        setScrolled(true)
        window.removeEventListener("scroll", check)
      }
    }
    measure()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", check, { passive: true })
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", check)
    }
  }, [showScrollIcon])

  // Glide down to whatever section comes next on the page. Slower and softer
  // than the browser's own smooth scroll, and the visitor can take over at any
  // moment by scrolling, touching or pressing a key.
  const goNext = () => {
    const el = sectionRef.current
    if (!el) return
    let node: Element | null = el
    while (node && !node.nextElementSibling) node = node.parentElement
    const target = node ? (node.nextElementSibling as HTMLElement | null) : null
    if (!target) return
    const from = window.scrollY
    const to = Math.max(0, target.getBoundingClientRect().top + from - HEADER_GAP)
    const dist = to - from
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || Math.abs(dist) < 8) {
      window.scrollTo({ top: to, behavior: "instant" as ScrollBehavior })
      return
    }
    setGoing(true)
    const duration = Math.min(1100, Math.max(650, Math.abs(dist) * 0.9))
    const t0 = performance.now()
    let stopped = false
    const stop = () => {
      stopped = true
      cleanup()
    }
    const cleanup = () => {
      window.removeEventListener("wheel", stop)
      window.removeEventListener("touchstart", stop)
      window.removeEventListener("keydown", stop)
    }
    window.addEventListener("wheel", stop, { passive: true })
    window.addEventListener("touchstart", stop, { passive: true })
    window.addEventListener("keydown", stop)
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const step = (now: number) => {
      if (stopped) return
      const t = Math.min(1, (now - t0) / duration)
      window.scrollTo({ top: from + dist * ease(t), behavior: "instant" as ScrollBehavior })
      if (t < 1) requestAnimationFrame(step)
      else cleanup()
    }
    requestAnimationFrame(step)
  }

  const ready = cueTop !== null
  const icon = (
    <span className={ready ? `gsh-icon gsh-m-${motion}` : "gsh-icon"}>
      <span
        className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
        style={{ borderColor: accent }}
      >
        <span className="gsh-dot block w-1 h-3 rounded-full" style={{ backgroundColor: accent }} />
      </span>
    </span>
  )

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center px-6 py-20 overflow-hidden ${className || ""}`}
      style={{ minHeight: MIN_HEIGHTS[height] || MIN_HEIGHTS.tall, backgroundColor: bg, "--gsh-accent": accent } as CSSProperties}
    >
      <style>{CSS}</style>

      {/* Soft fade of the accent color at the top (5%, same as the original) */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${accent} 5%, transparent), transparent)`,
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto text-center">
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
            className={`text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.95] mb-8 text-balance [&_em]:font-normal ${headingAccent === "underline" ? "gsh-underline" : ""}`}
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
          className="gsh-fade absolute left-0 right-0 flex justify-center"
          style={{
            top: cueTop === null ? undefined : cueTop,
            bottom: cueTop === null ? 40 : undefined,
            opacity: scrolled || !ready ? 0 : 1,
            transition: "opacity .5s ease",
            pointerEvents: "none",
          }}
          aria-hidden={scrolled || !scrollIconClick ? true : undefined}
        >
          {scrollIconClick ? (
            <button
              type="button"
              className={`gsh-cue${going ? " gsh-going" : ""}`}
              onClick={goNext}
              aria-label="Scroll down to the next section"
              tabIndex={scrolled ? -1 : 0}
              style={{ pointerEvents: scrolled ? "none" : "auto" }}
            >
              {icon}
            </button>
          ) : (
            icon
          )}
        </div>
      ) : null}
    </section>
  )
}

export default SerifHero
