"use client"

// ALL STORIES LIST (Sep 2026)
// ---------------------------------------------------------------------------
// Why this exists: article grids on gcmm.ca (News & Stories feed, "related
// stories") are filled from the Plasmic CMS in the browser, and "View More"
// is a button, not a link. Google doesn't click buttons, so ~70 of the ~78
// articles had no crawlable link pointing to them at all.
//
// This component renders a plain list of links to EVERY published article.
// The article list is fetched on the SERVER (app/[[...catchall]]/page.tsx,
// fetchAllStories) and handed down through React context, so the links are
// part of the HTML Google receives — no clicking or JavaScript needed.
//
// Data is only fetched for the paths in ALL_STORIES_PATHS (page.tsx), to
// avoid adding ~10KB to every page. If you place this component on a page
// that is NOT in that list, it renders nothing on the live site — add the
// page's path to ALL_STORIES_PATHS first.
// ---------------------------------------------------------------------------

import { createContext, useContext, type ReactNode } from "react"
import Link from "next/link"
import { usePlasmicCanvasContext } from "@plasmicapp/loader-nextjs"

export type StoryLink = {
  slug: string
  title: string
  // Pre-formatted on the server ("Sep 22, 2026", UTC) so server and browser
  // render identical text — avoids hydration mismatches from time zones.
  dateLabel: string
  year: string
}

const AllStoriesContext = createContext<StoryLink[] | undefined>(undefined)

export function AllStoriesProvider({
  stories,
  children,
}: {
  stories?: StoryLink[]
  children: ReactNode
}) {
  return <AllStoriesContext.Provider value={stories}>{children}</AllStoriesContext.Provider>
}

// Shown only inside Plasmic Studio's editor, which has no server data.
const STUDIO_SAMPLE: StoryLink[] = [
  { slug: "#", title: "Sample story title — the real list appears on the live site", dateLabel: "Sep 22, 2026", year: "2026" },
  { slug: "#", title: "Another sample story title", dateLabel: "Sep 8, 2026", year: "2026" },
  { slug: "#", title: "An older sample story", dateLabel: "Nov 14, 2025", year: "2025" },
]

type Props = {
  className?: string
  heading?: string
  showDates?: boolean
  groupByYear?: boolean
  headingColor?: string
  linkColor?: string
  dateColor?: string
}

function StoryList({
  stories,
  showDates,
  linkColor,
  dateColor,
}: {
  stories: StoryLink[]
  showDates: boolean
  linkColor: string
  dateColor: string
}) {
  return (
    <ul className="columns-1 md:columns-2 lg:columns-3 gap-x-10 list-none p-0 m-0">
      {stories.map((s, i) => (
        <li key={`${s.slug}-${i}`} className="break-inside-avoid mb-3 leading-snug">
          <Link href={s.slug === "#" ? "#" : `/${s.slug}`} className="hover:underline" style={{ color: linkColor }}>
            {s.title}
          </Link>
          {showDates && (
            <span className="block text-sm mt-0.5" style={{ color: dateColor }}>
              {s.dateLabel}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function AllStoriesList({
  className,
  heading = "All Stories",
  showDates = true,
  groupByYear = false,
  headingColor = "#1F2D55",
  linkColor = "#1F2D55",
  dateColor = "#6B7890",
}: Props) {
  const serverStories = useContext(AllStoriesContext)
  const inStudio = !!usePlasmicCanvasContext()
  const stories = serverStories ?? (inStudio ? STUDIO_SAMPLE : undefined)

  // Live page with no server data (page not in ALL_STORIES_PATHS, or the CMS
  // was unreachable): render nothing rather than an empty or fake list.
  if (!stories || stories.length === 0) return null

  const groups: [string, StoryLink[]][] = groupByYear
    ? Object.entries(
        stories.reduce<Record<string, StoryLink[]>>((acc, s) => {
          ;(acc[s.year] ||= []).push(s)
          return acc
        }, {})
      ).sort(([a], [b]) => Number(b) - Number(a))
    : [["", stories]]

  return (
    <section className={className} aria-label={heading || "All stories"}>
      {heading && (
        <h2 className="text-2xl md:text-3xl font-serif mb-6" style={{ color: headingColor }}>
          {heading}
        </h2>
      )}
      {groups.map(([year, list]) => (
        <div key={year || "all"} className={groupByYear ? "mb-8" : undefined}>
          {groupByYear && (
            <h3 className="text-lg font-semibold mb-3" style={{ color: headingColor }}>
              {year}
            </h3>
          )}
          <StoryList stories={list} showDates={showDates} linkColor={linkColor} dateColor={dateColor} />
        </div>
      ))}
    </section>
  )
}
