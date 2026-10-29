// lib/site-announcement-server.ts
// Server-only: reads the "Site Announcement" entries from the Plasmic CMS and
// returns the one that should be showing right now (or null for "no ribbon").
// Used by app/layout.tsx.
//
// This NEVER throws. If the CMS is slow, unreachable, or the model does not
// exist yet, the answer is simply "no ribbon" and the site works as normal.
import { normalizeAnnouncement, type SiteAnnouncementData } from "@/lib/site-announcement"

// Same CMS database and read-only token the news articles already use.
const PLASMIC_CMS_DATABASE_ID = "bYeJVtRFReZ4zCMpwREGgw"
// Must match the model's identifier shown in Plasmic CMS (Site Announcement model).
const ANNOUNCEMENT_TABLE = "siteAnnouncement"

export async function getSiteAnnouncement(): Promise<SiteAnnouncementData | null> {
  const token = process.env.PLASMIC_CMS_PUBLIC_TOKEN
  if (!token) return null

  try {
    const query = encodeURIComponent(JSON.stringify({ limit: 20 }))
    const url = `https://data.plasmic.app/api/v1/cms/databases/${PLASMIC_CMS_DATABASE_ID}/tables/${ANNOUNCEMENT_TABLE}/query?q=${query}`
    const res = await fetch(url, {
      headers: {
        "x-plasmic-api-cms-tokens": `${PLASMIC_CMS_DATABASE_ID}:${token}`,
      },
      // IMPORTANT: keep this at 3600 to match app/[[...catchall]]/page.tsx.
      // A smaller number here would make every page rebuild more often and
      // bring back the Vercel cost the Oct 2026 cost fix removed.
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null

    const data = await res.json()
    // First entry that is switched on, has not ended, and has a sentence.
    for (const row of data?.rows ?? []) {
      const announcement = normalizeAnnouncement(row?.data)
      if (announcement) return announcement
    }
    return null
  } catch (err) {
    console.warn("Site announcement fetch failed:", err)
    return null
  }
}
