"use client"

import Link from "next/link"
import { useState } from "react"
import type { CSSProperties } from "react"

/**
 * CampaignTiles - photo tiles for the Mega City Media Campaigns, with tabs.
 *
 * - Each campaign is one item in a list ("+ Add item"): name, year tag, photo, link, continent.
 * - Tabs: Latest, Upcoming, one per continent, and All. A tab only appears when it has campaigns.
 * - The list order is the display order, so keep it newest first.
 * - Every tile is written into the page once, so every link is in the page's HTML for Google.
 * - Blank-safe: no photo = plain colour block, no year = no tag, no link = tile is not clickable.
 * - Light hover lift (CSS only), switched off for visitors who have "reduce motion" turned on.
 * - No global CSS: all style names start with ct-.
 */

// Brand colors
const NAVY = "#1F2D55"
const TEAL = "#0A6C93"
const WHITE = "#FFFFFF"

const PAGE_MAX_WIDTH = "1280px"

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
  xl: "clamp(1rem, calc(8vw - 1rem), 6rem)",
}

const CONTINENTS = ["Europe", "Asia", "Middle East", "Africa", "South America & Caribbean"]

export interface CampaignItem {
  name?: string
  year?: string
  photo?: string
  link?: string
  continent?: string
  upcoming?: boolean
}

interface CampaignTilesProps {
  className?: string

  campaigns?: CampaignItem[]
  latestCount?: number
  featureFirst?: boolean

  latestLabel?: string
  upcomingLabel?: string
  allLabel?: string
  largeTileText?: string
  upcomingTileText?: string

  navyColor?: string
  barTextColor?: string
  yearTagColor?: string
  yearTagTextColor?: string
  upcomingTagColor?: string
  backgroundColor?: string

  spaceY?: SpaceChoice
  spaceTop?: SpaceChoice
  spaceBottom?: SpaceChoice
  spaceX?: SpaceChoice
}

function isExternal(url: string) {
  return /^(https?:|mailto:|tel:)/i.test(url)
}

const CT_CSS = `
.ct-tab{border:1.5px solid color-mix(in srgb,var(--ct-navy) 35%,transparent);background:transparent;color:var(--ct-navy);border-radius:9999px;padding:0.45rem 1.1rem;min-height:44px;font-weight:600;font-size:0.9rem;line-height:1.2;cursor:pointer}
.ct-tab:hover{background:color-mix(in srgb,var(--ct-navy) 8%,transparent)}
.ct-tab[aria-pressed="true"]{background:var(--ct-navy);color:var(--ct-bar-text);border-color:var(--ct-navy)}
.ct-tab:focus-visible{outline:2px solid var(--ct-navy);outline-offset:2px}
@media (max-width:640px){.ct-tab{padding:0.4rem 0.85rem;font-size:0.82rem}}
@media (prefers-reduced-motion:no-preference){.ct-tab{transition:background-color 200ms ease,color 200ms ease}}
.ct-feature-photo{aspect-ratio:16/9}
@media (min-width:1024px){.ct-feature-photo{aspect-ratio:auto;flex:1 1 auto;min-height:14rem}}
`

export function CampaignTiles({
  className,

  campaigns = [],
  latestCount = 5,
  featureFirst = true,

  latestLabel = "Latest",
  upcomingLabel = "Upcoming",
  allLabel = "All",
  largeTileText = "See what happened",
  upcomingTileText = "Learn more",

  navyColor,
  barTextColor,
  yearTagColor,
  yearTagTextColor,
  upcomingTagColor,
  backgroundColor,

  spaceY = "medium",
  spaceTop,
  spaceBottom,
  spaceX = "xl",
}: CampaignTilesProps) {
  const [active, setActive] = useState("latest")

  const items = (campaigns || []).filter((c) => c && c.name && c.name.trim())
  if (items.length === 0) return null

  const past = items.filter((c) => !c.upcoming)
  const upcoming = items.filter((c) => c.upcoming)

  const colNavy = (navyColor || "").trim() || NAVY
  const colBarText = (barTextColor || "").trim() || WHITE
  const colYear = (yearTagColor || "").trim() || TEAL
  const colYearText = (yearTagTextColor || "").trim() || WHITE
  const colUpcoming = (upcomingTagColor || "").trim() || colYear

  const latestN = Math.max(1, Math.floor(Number(latestCount) || 5))
  const latestText = (latestLabel || "").trim() || "Latest"
  const upcomingText = (upcomingLabel || "").trim() || "Upcoming"
  const allText = (allLabel || "").trim() || "All"

  type Tab = { key: string; label: string; count?: number }
  const tabs: Tab[] = []
  if (past.length > 0) tabs.push({ key: "latest", label: latestText })
  if (upcoming.length > 0) tabs.push({ key: "upcoming", label: upcomingText, count: upcoming.length })
  CONTINENTS.forEach((k) => {
    const n = past.filter((c) => c.continent === k).length
    if (n > 0) tabs.push({ key: k, label: k, count: n })
  })
  if (past.length > 0) tabs.push({ key: "all", label: allText + " " + past.length })

  const current = tabs.some((t) => t.key === active) ? active : tabs[0].key

  const pastIndex = new Map<CampaignItem, number>()
  past.forEach((c, i) => pastIndex.set(c, i))

  const isVisible = (c: CampaignItem) => {
    if (current === "upcoming") return Boolean(c.upcoming)
    if (c.upcoming) return false
    if (current === "latest") return (pastIndex.get(c) ?? 0) < latestN
    if (current === "all") return true
    return c.continent === current
  }

  const renderTile = (c: CampaignItem, index: number) => {
    const visible = isVisible(c)
    const name = (c.name || "").trim()
    const year = (c.year || "").trim()
    const photo = (c.photo || "").trim()
    const link = (c.link || "").trim()

    const feature =
      visible && current === "latest" && featureFirst && (pastIndex.get(c) ?? 1) === 0
    const wide = visible && current === "upcoming"
    const big = feature || wide
    const hasLink = link.length > 0

    const wrapperClass = feature ? "col-span-2 lg:row-span-2" : wide ? "col-span-2" : ""

    const photoClass = feature ? "ct-feature-photo" : ""
    const photoStyle: CSSProperties = {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "color-mix(in srgb, var(--ct-navy) 10%, white)",
      aspectRatio: feature ? undefined : wide ? "16 / 9" : "3 / 2",
    }

    const tagText = year
    const tagColor = c.upcoming ? colUpcoming : colYear

    const inner = (
      <div
        className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white ${
          hasLink
            ? "transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            : ""
        }`}
        style={{ borderColor: "color-mix(in srgb, var(--ct-navy) 15%, transparent)" }}
      >
        <div className={photoClass} style={photoStyle}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          {tagText && (
            <span
              className="absolute left-2.5 top-2.5 rounded-md px-2.5 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: tagColor, color: colYearText }}
            >
              {tagText}
            </span>
          )}
        </div>
        <div
          className="flex items-center justify-between gap-3 px-3.5 py-3"
          style={{ backgroundColor: colNavy, color: colBarText }}
        >
          <span className={`font-semibold ${big ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>
            {name}
          </span>
          {hasLink && (
            <span className="flex shrink-0 items-center gap-1.5 text-sm">
              {big && <span>{c.upcoming ? upcomingTileText : largeTileText}</span>}
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          )}
        </div>
      </div>
    )

    const linkClass =
      "block h-full rounded-xl no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

    let body = inner
    if (hasLink) {
      body = isExternal(link) ? (
        <a
          href={link}
          {...(/^https?:/i.test(link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={linkClass}
        >
          {inner}
        </a>
      ) : (
        <Link href={link} prefetch={false} className={linkClass}>
          {inner}
        </Link>
      )
    }

    return (
      <div key={index} className={wrapperClass} hidden={!visible}>
        {body}
      </div>
    )
  }

  const sectionStyle = {
    width: "100%",
    backgroundColor: (backgroundColor || "").trim() || "transparent",
    fontFamily: "inherit",
    "--ct-navy": colNavy,
    "--ct-bar-text": colBarText,
  } as CSSProperties

  return (
    <section className={className} style={sectionStyle}>
      <style>{CT_CSS}</style>
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
          gap: "clamp(1.25rem, 2.5vw, 2rem)",
        }}
      >
        {tabs.length > 1 && (
          <div role="group" aria-label="Filter campaigns" className="flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                className="ct-tab"
                aria-pressed={t.key === current}
                onClick={() => setActive(t.key)}
              >
                {t.label}
                {t.count !== undefined && (
                  <span style={{ opacity: 0.7, marginLeft: "0.4rem", fontSize: "0.85em" }}>{t.count}</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map((c, i) => renderTile(c, i))}
        </div>
      </div>
    </section>
  )
}

export default CampaignTiles
