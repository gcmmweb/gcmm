#!/usr/bin/env python3
"""
GCMM "Do Now" pre-TV-campaign fixes (Sep 2026)
Run from the repo root (gcmmfinal), on a fresh branch off main:

    git checkout main && git pull
    git checkout -b tv-launch-prep
    python3 fix_do_now.py
    git diff              # review
    git add -A
    git commit -m "TV launch prep: SEO counter fix, 16 legacy redirects, video wording"
    git push -u origin tv-launch-prep

Then open the Vercel preview for tv-launch-prep and verify before merging.

Covers:
  1. Homepage stat counters (500M+/110+/45+) now render in the initial HTML
     instead of 0/0/0 — the scroll-triggered count-up animation is unchanged.
  2. 16 new entries in LEGACY_REDIRECTS (old gcmministries.ca URLs + PDFs
     confirmed 404, per the Sep 24 review doc).
  3. "GCM Ministries" -> "GCMM" on the Videos page/section (3 occurrences).

NOT included (need your decision first, see bottom of this file's output):
  - /signup and /bringing-the-gospel-to-the-frontlines redirect targets
  - Newsletter canonical fix + Terms page title/description
    (both are Plasmic Studio Page Settings edits, not code -- see chat)
"""
import re
import sys
from pathlib import Path

ROOT = Path.cwd()
CHANGED = []


def edit(path: str, old: str, new: str, count_expected: int = 1):
    p = ROOT / path
    text = p.read_text()
    occurrences = text.count(old)
    if occurrences != count_expected:
        print(f"  ABORTED: {path} -> expected {count_expected} match(es) of "
              f"target text, found {occurrences}. File may have changed "
              f"since this script was written -- stopping without touching "
              f"it so nothing gets silently mismatched.")
        sys.exit(1)
    p.write_text(text.replace(old, new))
    CHANGED.append(path)


# ---------------------------------------------------------------------------
# 1. Homepage stat counters: SSR the real value, reset-then-animate on mount
# ---------------------------------------------------------------------------
print("[1/3] Fixing homepage stat counters (main-page-cinematic.tsx)...")

edit(
    "components/main-page-cinematic.tsx",
    'import { useEffect, useRef, useState } from "react"',
    'import { useEffect, useLayoutEffect, useRef, useState } from "react"',
)

OLD_COUNTER = '''function useCounter(end: number, duration = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref }
}'''

NEW_COUNTER = '''// FIX (Sep 2026, pre-TV-launch SEO review): this used to start every
// counter at 0 via useState(0), so the number only ever became correct
// after client JS ran the count-up animation. Google (and anyone/anything
// that doesn't execute JS) only ever saw "0M+", "0+", "0+" in the actual
// HTML response -- confirmed live: curl'ing the homepage showed literal
// `0<!-- -->M+` where "500M+" should be.
//
// Fix: seed state with the real `end` value so SSR/first paint has the
// correct number, then reset to 0 in a layout effect (fires after commit
// but before the browser paints) so real visitors still see the exact
// same start-at-0-and-count-up animation as before -- nothing changes
// visually, only what non-JS clients and crawlers receive.
function useCounter(end: number, duration = 2) {
  const [count, setCount] = useState(end)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useLayoutEffect(() => {
    setCount(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref }
}'''

edit("components/main-page-cinematic.tsx", OLD_COUNTER, NEW_COUNTER)
print("  OK")

# ---------------------------------------------------------------------------
# 2. 16 new LEGACY_REDIRECTS entries (11 old-domain pages + 5 old PDFs)
# ---------------------------------------------------------------------------
print("[2/3] Adding 16 legacy redirects (catchall page.tsx)...")

REDIRECT_ANCHOR = '''  "/1980-1989": "/history",
  "/2011-2020": "/history",
};'''

REDIRECT_INSERT = '''  "/1980-1989": "/history",
  "/2011-2020": "/history",
  // Added Sep 2026 (pre-TV-launch review): old gcmministries.ca pages that
  // still 404 after the domain-level forward to gcmm.ca. Destinations
  // chosen by closest topical match per the Sep 24 redirect audit -- worth
  // a skim since a couple are "closest available" rather than exact:
  // /a-call-to-prayer -> the prayer-themed Ukraine story is the nearest
  // live match, not a literal renamed page.
  "/2021-2030": "/history",
  "/2000-2010": "/history",
  "/support-radio-ministry-to-russia": "/reaching-russian-speakers",
  "/a-call-to-prayer": "/national-prayer-breakfast-in-ukraine",
  "/cairo-egypt-a-door-of-opportunity": "/cairo-egypt-door-of-opportunity",
  "/news-from-mongolias-evangelism-media-campaign": "/impact/mongolia",
  "/evangelism-mongolia": "/impact/mongolia",
  "/when-you-do-this-for-the-least-of-these": "/mongolia-bus-ads-city-dump",
  "/viewer-response-skyrockets-across-the-middle-east-and-africa":
    "/middle-east-media-ministry",
  "/introduce-arab-to-jesus-christ": "/middle-east-media-ministry",
  "/feedback-from-pastors-about-city-campaign-success":
    "/megacitymediacampaigns",
  // Confirmed with Junita (Sep 2026): the newsletter signup form lives at
  // the bottom of /newsletters, and /rescue-mission-to-frontline-villages
  // is confirmed as the same Ukraine story as the old frontline URL.
  "/signup": "/newsletters",
  "/bringing-the-gospel-to-the-frontlines":
    "/rescue-mission-to-frontline-villages",
  // Old newsletter/magazine PDFs from the same gcmministries.ca domain,
  // same pattern as the wp-content/uploads entries above -- normalized
  // to getPathname()'s lowercase+hyphen form.
  "/wp-content/uploads/2024/05/gcmm-cdn-4pgmay24-digital.pdf": "/newsletters",
  "/wp-content/uploads/2024/07/gcmm-cdn-nwsljune24lite.pdf": "/newsletters",
  "/wp-content/uploads/2025/02/gcmm-cdn-febmar-nwsl-digital.pdf":
    "/newsletters",
  "/wp-content/uploads/2023/08/gcmm-cad-newsletter-july-2023-digitalformat.pdf":
    "/newsletters",
  "/wp-content/uploads/2022/09/gcmm-cdn-nwsltr-sept-2022-lite.pdf":
    "/newsletters",
};'''

edit("app/[[...catchall]]/page.tsx", REDIRECT_ANCHOR, REDIRECT_INSERT)
print("  OK")

# ---------------------------------------------------------------------------
# 3. "GCM Ministries" -> "GCMM" on the Videos page
# ---------------------------------------------------------------------------
# NOTE: verified via a real `npm run build` + `npm run start` against live
# Plasmic data that the component files' own default params (below) are
# NOT what actually renders -- Plasmic's registerComponent `defaultValue`
# in src/plasmic-init.ts is what the live page actually uses. Both are
# fixed here: plasmic-init.ts because it's the one that's actually live,
# the component files as the correct fallback for any non-Plasmic usage.
print("[3/3] Fixing 'GCM Ministries' -> 'GCMM' on Videos page...")

edit(
    "components/videos-page.tsx",
    'moreVideosTitle = "More videos from GCM Ministries",',
    'moreVideosTitle = "More videos from GCMM",',
)
edit(
    "components/videos-page.tsx",
    'featuredVideoDescription = "Discover how GCM Ministries is reaching '
    'nations through strategic media campaigns and compassionate outreach '
    'across the globe.",',
    'featuredVideoDescription = "Discover how GCMM is reaching nations '
    'through strategic media campaigns and compassionate outreach across '
    'the globe.",',
)
edit(
    "components/videos-grid.tsx",
    'sectionTitle = "More videos from GCM Ministries",',
    'sectionTitle = "More videos from GCMM",',
)

edit(
    "src/plasmic-init.ts",
    '''    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "More videos from GCM Ministries",
      description: "Main title for the video grid section",
    },''',
    '''    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "More videos from GCMM",
      description: "Main title for the video grid section",
    },''',
)
edit(
    "src/plasmic-init.ts",
    '''      moreVideosTitle: {
        type: "string",
        displayName: "More Videos Title",
        defaultValue: "More videos from GCM Ministries",
        description: "Title for the additional videos section",
      },''',
    '''      moreVideosTitle: {
        type: "string",
        displayName: "More Videos Title",
        defaultValue: "More videos from GCMM",
        description: "Title for the additional videos section",
      },''',
)
edit(
    "src/plasmic-init.ts",
    '''      featuredVideoDescription: {
        type: "string",
        displayName: "Featured Video Description",
        defaultValue:
          "Discover how GCM Ministries is reaching nations through strategic media campaigns and compassionate outreach across the globe.",
        description: "Description of the featured video",
      },''',
    '''      featuredVideoDescription: {
        type: "string",
        displayName: "Featured Video Description",
        defaultValue:
          "Discover how GCMM is reaching nations through strategic media campaigns and compassionate outreach across the globe.",
        description: "Description of the featured video",
      },''',
)
print("  OK")

print()
print(f"Done. {len(CHANGED)} file(s) changed (18 redirects total, 16 old-domain")
print("+ /signup + /bringing-the-gospel-to-the-frontlines):")
for f in CHANGED:
    print(f"  - {f}")
print()
print("Not in this script -- Plasmic Studio Page Settings edits, not code:")
print("  - Newsletter canonical (www) + Terms page title/description.")
print("    Step-by-step instructions are in chat.")
