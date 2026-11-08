"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { ElementType, MouseEvent } from "react"
import Image from "next/image"
import { formatInline } from "@/lib/inline-format"

/**
 * Timeline: one reusable timeline for the whole site.
 *
 * - Edited like Content Section / Card Grid: a list with "+ Add item".
 * - Field names match the old "Timeline Page" (timelineEvents, year, title,
 *   description, highlight, hasImage, image) so "Swap component" keeps the
 *   saved entries and photos.
 * - **bold** and *italic* work in every text box (lib/inline-format).
 * - Motion is CSS plus a tiny scroll/visibility check. No libraries.
 *   Gentle motion is switched off for people who ask their device for
 *   reduced motion, and inside the Studio editor.
 */

type Level = "h1" | "h2" | "h3"
type FontChoice = "site" | "georgia" | "nunito" | "poppins" | "lexend"
type Look = "light" | "dark"
type Motion = "gentle" | "off"
type Spacing = "normal" | "small" | "none"

export interface TimelineEntry {
  year?: string
  title?: string
  description?: string
  highlight?: boolean
  hasImage?: boolean
  image?: string
  imageAlt?: string
  readMore?: "auto" | "off"
}

export interface TimelineProps {
  title?: string
  subtitle?: string
  headingLevel?: Level
  headingFont?: FontChoice
  timelineEvents?: TimelineEntry[]
  look?: Look
  readMoreEnabled?: boolean
  motion?: Motion
  showJumpTo?: boolean
  spacing?: Spacing
  className?: string
}

const FONT_STACKS: Record<FontChoice, string> = {
  site: "inherit",
  georgia: 'Georgia, Gelasio, "Times New Roman", serif',
  nunito: "Nunito, system-ui, sans-serif",
  poppins: "Poppins, system-ui, sans-serif",
  lexend: "Lexend, system-ui, sans-serif",
}

// Entry titles sit one level below the section heading.
const ENTRY_LEVEL: Record<Level, "h2" | "h3" | "h4"> = {
  h1: "h2",
  h2: "h3",
  h3: "h4",
}

function getImageUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url
  }
  return `/${url}`
}

// First four-digit year found in the Year box -> its decade (1984-1985 -> 1980).
function decadeOf(year: string): number | null {
  const m = /\b(1[5-9]\d\d|20\d\d)\b/.exec(year)
  return m ? Math.floor(Number(m[1]) / 10) * 10 : null
}

// Blank line = new paragraph. A single line break stays a line break.
function Paragraphs({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/\n\s*\n/).filter((b) => b.trim().length > 0)
  return (
    <>
      {blocks.map((b, i) => (
        <p key={i} className={className} style={{ whiteSpace: "pre-line" }}>
          {formatInline(b.trim())}
        </p>
      ))}
    </>
  )
}

const CSS = `
.gtl{background:var(--gtl-bg);color:var(--gtl-body);font-family:inherit;--gtl-yw:11rem;--gtl-rail:3rem;--gtl-yfs:2rem;--gtl-tfs:1.125rem;width:100%}
.gtl *,.gtl *::before,.gtl *::after{box-sizing:border-box}
.gtl-light{--gtl-bg:transparent;--gtl-head:#1F2D55;--gtl-year:#1F2D55;--gtl-year-hi:#1F2D55;--gtl-title:#1F2D55;--gtl-body:#3B4252;--gtl-track:rgba(31,45,85,.16);--gtl-fill:#CBA86D;--gtl-dot-bg:#FFFFFF;--gtl-dot-ring:#CBA86D;--gtl-dot-hi:#F4A300;--gtl-dot-hi-ring:#1F2D55;--gtl-accent:#1F2D55;--gtl-accent-text:#FFFFFF;--gtl-chip-border:rgba(31,45,85,.3);--gtl-photo-bg:#EFEFEF;--gtl-note-bg:#FFF4D6;--gtl-note-text:#5A3E00}
.gtl-dark{--gtl-bg:#1F2D55;--gtl-head:#FFFFFF;--gtl-year:#EFECE7;--gtl-year-hi:#F4A300;--gtl-title:#FFFFFF;--gtl-body:#E4E7EF;--gtl-track:rgba(255,255,255,.2);--gtl-fill:#CBA86D;--gtl-dot-bg:#1F2D55;--gtl-dot-ring:#CBA86D;--gtl-dot-hi:#F4A300;--gtl-dot-hi-ring:#F4A300;--gtl-accent:#CBA86D;--gtl-accent-text:#1F2D55;--gtl-chip-border:rgba(203,168,109,.55);--gtl-photo-bg:#17224A;--gtl-note-bg:#FFF4D6;--gtl-note-text:#5A3E00}
.gtl-sp-normal{padding:clamp(3rem,7vw,6rem) clamp(1.25rem,4vw,2rem)}
.gtl-sp-small{padding:clamp(1.5rem,4vw,3rem) clamp(1.25rem,4vw,2rem)}
.gtl-sp-none{padding:0}
.gtl-in{max-width:1000px;margin:0 auto}
.gtl-head{margin:0 0 clamp(2rem,4vw,3.5rem)}
.gtl-h{margin:0;color:var(--gtl-head);font-weight:400;font-size:clamp(2rem,4.6vw,3rem);line-height:1.15;letter-spacing:-.01em}
.gtl-lead{margin:1rem 0 0;max-width:42rem;color:var(--gtl-body);font-size:clamp(1.0625rem,1.6vw,1.25rem);line-height:1.6}
.gtl-jump{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .75rem;margin:0 0 clamp(2rem,4vw,3rem)}
.gtl-jump-label{color:var(--gtl-body);font-size:1rem}
.gtl-jump ul{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;margin:0;padding:0}
.gtl-chip{display:inline-flex;align-items:center;min-height:2.75rem;padding:0 1.1rem;border:1px solid var(--gtl-chip-border);border-radius:999px;color:var(--gtl-title);font-size:1rem;text-decoration:none;transition:background-color .2s ease,color .2s ease}
.gtl-chip:hover{background:var(--gtl-accent);border-color:var(--gtl-accent);color:var(--gtl-accent-text)}
.gtl-chip:focus-visible,.gtl-more:focus-visible{outline:3px solid #F4A300;outline-offset:2px}
.gtl-wrap{position:relative}
.gtl-track{position:absolute;top:calc(var(--gtl-yfs)*1.1/2);bottom:0;left:calc(var(--gtl-yw) + var(--gtl-rail)/2 - 1px);width:2px;border-radius:2px;background:var(--gtl-track);overflow:hidden}
.gtl-fill{position:absolute;inset:0;background:var(--gtl-fill);transform-origin:top;transform:scaleY(var(--gtl-p,1))}
.gtl-list{list-style:none;margin:0;padding:0}
.gtl-item{display:grid;grid-template-columns:var(--gtl-yw) var(--gtl-rail) minmax(0,1fr);grid-template-areas:"year rail body";padding-bottom:clamp(2.5rem,5vw,4rem);scroll-margin-top:6rem;transition:opacity .8s ease}
.gtl-item:last-child{padding-bottom:0}
.gtl-hidden{opacity:0}
.gtl-year{grid-area:year;display:flex;justify-content:flex-end;align-items:flex-start;padding-right:.25rem;color:var(--gtl-year);font-size:var(--gtl-yfs);font-weight:400;line-height:1.1;letter-spacing:-.01em;white-space:nowrap}
.gtl-hi .gtl-year{color:var(--gtl-year-hi)}
.gtl-rail{grid-area:rail;position:relative}
.gtl-dot{--gtl-ds:.9rem;position:absolute;left:50%;top:calc(var(--gtl-yfs)*1.1/2);width:var(--gtl-ds);height:var(--gtl-ds);transform:translate(-50%,-50%);border:2px solid var(--gtl-dot-ring);border-radius:50%;background:var(--gtl-dot-bg)}
.gtl-hi .gtl-dot{--gtl-ds:1.5rem;border-color:var(--gtl-dot-hi-ring);background:var(--gtl-dot-hi);box-shadow:0 0 0 5px rgba(244,163,0,.28)}
.gtl-body{grid-area:body;min-width:0;padding-top:.1rem}
.gtl-etitle{margin:0 0 .75rem;color:var(--gtl-title);font-size:clamp(1.375rem,2.4vw,1.75rem);font-weight:400;line-height:1.25}
.gtl-text{max-width:40rem;font-size:var(--gtl-tfs);line-height:1.7}
.gtl-text p{margin:0 0 1em}
.gtl-text p:last-child{margin:0}
.gtl-clamp{max-height:calc(var(--gtl-tfs)*1.7*4);overflow:hidden}
.gtl-fade{-webkit-mask-image:linear-gradient(to bottom,#000 calc(100% - 1.7em),transparent);mask-image:linear-gradient(to bottom,#000 calc(100% - 1.7em),transparent)}
.gtl-more{display:inline-flex;align-items:center;justify-content:center;min-height:2.75rem;margin-top:.75rem;padding:0 1.5rem;border:2px solid var(--gtl-accent);border-radius:999px;background:transparent;color:var(--gtl-accent);font:inherit;font-size:1rem;font-weight:600;cursor:pointer;transition:background-color .2s ease,color .2s ease}
.gtl-more:hover{background:var(--gtl-accent);color:var(--gtl-accent-text)}
.gtl-photo{position:relative;width:100%;max-width:24rem;margin-top:1.25rem;aspect-ratio:4/3;overflow:hidden;border-radius:.5rem;background:var(--gtl-photo-bg)}
.gtl-note{max-width:24rem;margin:.75rem 0 0;padding:.5rem .75rem;border-radius:.375rem;background:var(--gtl-note-bg);color:var(--gtl-note-text);font-size:.9rem;line-height:1.4}
@media (max-width:767px){
.gtl{--gtl-yfs:1.75rem;--gtl-rail:2.25rem;--gtl-tfs:1.0625rem}
.gtl-track{left:calc(var(--gtl-rail)/2 - 1px)}
.gtl-item{grid-template-columns:var(--gtl-rail) minmax(0,1fr);grid-template-areas:"rail year" "rail body"}
.gtl-year{justify-content:flex-start;padding-right:0}
.gtl-body{padding-top:.5rem}
.gtl-photo{max-width:none}
.gtl-more{width:100%;min-height:3rem}
.gtl-note{max-width:none}
}
@media (prefers-reduced-motion:reduce){
.gtl-item,.gtl-chip,.gtl-more{transition:none}
.gtl-hidden{opacity:1}
}
`

// People with JavaScript off still get the full text and the full line.
const NOSCRIPT_CSS = `.gtl-clamp{max-height:none!important;overflow:visible!important}.gtl-fade{-webkit-mask-image:none!important;mask-image:none!important}.gtl-more{display:none!important}`

interface EntryProps {
  event: TimelineEntry
  id: string
  textId: string
  EntryTitle: ElementType
  titleFont: string
  readMoreOn: boolean
  motionOn: boolean
  inEditor: boolean
}

function Entry({ event, id, textId, EntryTitle, titleFont, readMoreOn, motionOn, inEditor }: EntryProps) {
  const rootRef = useRef<HTMLLIElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [overflows, setOverflows] = useState(false)

  const year = (event.year || "").trim()
  const title = (event.title || "").trim()
  const description = (event.description || "").trim()
  const photoUrl = (event.image || "").trim()
  const hasPhoto = photoUrl.length > 0 && event.hasImage !== false
  const alt = (event.imageAlt || "").trim()
  const clampOn = readMoreOn && event.readMore !== "off"

  // Fade in once, the first time the entry scrolls into view.
  useEffect(() => {
    if (!motionOn) {
      setHidden(false)
      return
    }
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    setHidden(true)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setHidden(false)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [motionOn])

  // Show the Read more button only when the text is really longer than 4 lines.
  useEffect(() => {
    if (!clampOn) {
      setOverflows(false)
      return
    }
    const el = textRef.current
    if (!el) return
    let raf = 0
    const measure = () => {
      if (open) return
      setOverflows(el.scrollHeight > el.clientHeight + 1)
    }
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("resize", onResize)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [clampOn, open, description])

  const showButton = clampOn && (overflows || open)
  const textClass = ["gtl-text", clampOn && !open ? "gtl-clamp" : "", clampOn && !open && overflows ? "gtl-fade" : ""]
    .filter(Boolean)
    .join(" ")

  return (
    <li
      ref={rootRef}
      id={id}
      className={["gtl-item", event.highlight ? "gtl-hi" : "", hidden ? "gtl-hidden" : ""].filter(Boolean).join(" ")}
    >
      <div className="gtl-year">
        <span>{year}</span>
      </div>
      <div className="gtl-rail" aria-hidden="true">
        <span className="gtl-dot" />
      </div>
      <div className="gtl-body">
        {title && (
          <EntryTitle className="gtl-etitle" style={{ fontFamily: titleFont }}>
            {formatInline(title)}
          </EntryTitle>
        )}
        {description && (
          <div id={textId} ref={textRef} className={textClass}>
            <Paragraphs text={description} />
          </div>
        )}
        {showButton && (
          <button
            type="button"
            className="gtl-more"
            aria-expanded={open}
            aria-controls={textId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Show less" : "Read more"}
          </button>
        )}
        {hasPhoto && (
          <div className="gtl-photo">
            <Image
              src={getImageUrl(photoUrl)}
              alt={alt || (year ? `Ministry work in ${year}` : "Ministry work")}
              fill
              sizes="(max-width: 767px) calc(100vw - 4.75rem), 384px"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        )}
        {hasPhoto && !alt && inEditor && (
          <p className="gtl-note">Add a photo description for this photo (it helps people using screen readers and Google).</p>
        )}
      </div>
    </li>
  )
}

export function Timeline({
  title,
  subtitle,
  headingLevel = "h2",
  headingFont = "georgia",
  timelineEvents = [],
  look = "light",
  readMoreEnabled = true,
  motion = "gentle",
  showJumpTo = false,
  spacing = "normal",
  className = "",
}: TimelineProps) {
  const uid = "gtl" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const wrapRef = useRef<HTMLDivElement>(null)
  const [inEditor, setInEditor] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    try {
      setInEditor(window.self !== window.top)
    } catch {
      setInEditor(true)
    }
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const motionOn = motion === "gentle" && !inEditor && !reduced

  // The line fills as you scroll down the timeline.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || !motionOn) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / Math.max(r.height, 1)))
      wrap.style.setProperty("--gtl-p", String(p))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      wrap.style.removeProperty("--gtl-p")
    }
  }, [motionOn, timelineEvents.length])

  const Heading: Level = headingLevel
  const EntryTitle: ElementType = ENTRY_LEVEL[headingLevel]
  const headingText = (title || "").trim()
  const leadText = (subtitle || "").trim()
  const headingId = `${uid}-h`
  const font = FONT_STACKS[headingFont] ?? FONT_STACKS.georgia

  // "Jump to" buttons: one per decade, pointing at the first entry of that decade.
  const chips: { label: string; target: string }[] = []
  if (showJumpTo) {
    const seen = new Set<number>()
    timelineEvents.forEach((ev, i) => {
      const d = decadeOf((ev.year || "").trim())
      if (d !== null && !seen.has(d)) {
        seen.add(d)
        chips.push({ label: `${d}s`, target: `${uid}-e${i}` })
      }
    })
  }

  const onJump = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    const el = document.getElementById(target)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
  }

  const rootClass = ["gtl", look === "dark" ? "gtl-dark" : "gtl-light", `gtl-sp-${spacing}`, className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={rootClass} aria-labelledby={headingText ? headingId : undefined}>
      <style>{CSS}</style>
      <noscript>
        <style>{NOSCRIPT_CSS}</style>
      </noscript>
      <div className="gtl-in">
        {(headingText || leadText) && (
          <div className="gtl-head">
            {headingText && (
              <Heading id={headingId} className="gtl-h" style={{ fontFamily: font }}>
                {formatInline(headingText)}
              </Heading>
            )}
            {leadText && (
              <div className="gtl-lead">
                <Paragraphs text={leadText} />
              </div>
            )}
          </div>
        )}

        {chips.length > 1 && (
          <nav className="gtl-jump" aria-label="Jump to">
            <span className="gtl-jump-label">Jump to</span>
            <ul>
              {chips.map((c) => (
                <li key={c.target}>
                  <a className="gtl-chip" href={`#${c.target}`} onClick={(e) => onJump(e, c.target)}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="gtl-wrap" ref={wrapRef}>
          <div className="gtl-track" aria-hidden="true">
            <div className="gtl-fill" />
          </div>
          <ol className="gtl-list">
            {timelineEvents.map((ev, i) => (
              <Entry
                key={i}
                event={ev}
                id={`${uid}-e${i}`}
                textId={`${uid}-t${i}`}
                EntryTitle={EntryTitle}
                titleFont={font}
                readMoreOn={readMoreEnabled}
                motionOn={motionOn}
                inEditor={inEditor}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Timeline
