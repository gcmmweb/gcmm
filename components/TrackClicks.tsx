"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/track-event"

/**
 * TrackClicks - sends one Google Analytics event ("cta_click") whenever a
 * visitor clicks something that has a tracking label (data-track-label).
 *
 * Content Section, Video Section, Card Grid and Button Row all put that label
 * on their buttons. This one listener covers all of them, on every page.
 *
 * What is sent (nothing personal):
 *   cta_label - the tracking label you typed in Studio
 *   cta_text  - the button text (arrow removed)
 *   cta_url   - where the button goes (no ?query or #hash; mailto and tel
 *               links send only "mailto" or "tel", never the address or number)
 *
 * Renders nothing. If anything goes wrong it does nothing: analytics must
 * never be able to break a page.
 */

function describeDestination(href: string | null): string {
  if (!href) return ""
  try {
    const url = new URL(href, window.location.href)
    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return url.protocol.replace(":", "")
    }
    if (url.origin === window.location.origin) return url.pathname
    return url.origin + url.pathname
  } catch {
    return ""
  }
}

export function TrackClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      try {
        const target = event.target
        if (!(target instanceof Element)) return
        const el = target.closest("[data-track-label]")
        if (!el) return
        const label = (el.getAttribute("data-track-label") || "").trim()
        if (!label) return
        const text = (el.textContent || "")
          .replace(/\s+/g, " ")
          .replace(/\s*\u2192\s*$/, "")
          .trim()
        trackEvent("cta_click", {
          cta_label: label,
          cta_text: text,
          cta_url: describeDestination(el.getAttribute("href")),
          transport_type: "beacon",
        })
      } catch {
        /* never break the page */
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}

export default TrackClicks
