"use client"

// components/site-announcement.tsx
// The thin announcement ribbon shown above the header on every page.
// Text, link, colours, end date and on/off all come from the "Site Announcement"
// entry in the Plasmic CMS (see lib/site-announcement-server.ts).
//
// - Computer: label, sentence and link on one line (wraps if the screen is narrow).
// - Phone: three short lines (label / sentence / link), each cut off with ...
//   if it is too long, so it never breaks the layout.
// - The X remembers the choice in the visitor's browser. A NEW announcement
//   (different text) shows again.
// - After the end date the ribbon hides itself.
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { isExpired, type SiteAnnouncementData } from "@/lib/site-announcement"

const DISMISS_KEY = "gcmm-announcement-dismissed"

export function SiteAnnouncement({ data }: { data: SiteAnnouncementData | null }) {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!data) return
    // The page may be a saved copy from before the end date: check again here.
    if (isExpired(data.endsAt)) {
      setHidden(true)
      return
    }
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === data.key) setHidden(true)
    } catch {
      // Private browsing can block storage. Then the ribbon just shows.
    }
  }, [data])

  if (!data || hidden) return null
  // "Sandbox only" = test mode: show only on pages whose address starts with /sandbox
  if (data.sandboxOnly && !(pathname ?? "").startsWith("/sandbox")) return null

  const dismiss = () => {
    setHidden(true)
    try {
      window.localStorage.setItem(DISMISS_KEY, data.key)
    } catch {
      // ignore
    }
  }

  const hasPhoneSentence = data.phoneSentence !== ""

  return (
    <aside
      aria-label="Announcement"
      className="relative text-center text-[13px] leading-snug sm:text-[15px]"
      style={{ backgroundColor: data.backgroundColor, color: data.textColor }}
    >
      <div className="px-4 py-2 pr-12 sm:px-16 sm:py-[11px]">
        {data.label !== "" && (
          <span
            className="block truncate text-xs font-bold uppercase tracking-[1px] sm:mr-2 sm:inline sm:overflow-visible sm:whitespace-normal sm:text-[15px]"
            style={{ color: data.labelColor }}
          >
            {data.label}
          </span>
        )}

        {hasPhoneSentence ? (
          <>
            <span className="hidden sm:inline">{data.sentence}</span>
            <span className="block truncate sm:hidden">{data.phoneSentence}</span>
          </>
        ) : (
          <span className="block sm:inline">{data.sentence}</span>
        )}

        {data.linkUrl !== "" && data.linkText !== "" && (
          <a
            href={data.linkUrl}
            className="block truncate font-bold underline underline-offset-2 hover:opacity-80 sm:ml-2 sm:inline sm:overflow-visible sm:whitespace-normal"
            style={{ color: data.textColor }}
          >
            {data.linkText} &rarr;
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Close announcement"
        className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center hover:opacity-70 sm:right-3"
        style={{ color: data.textColor }}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  )
}
