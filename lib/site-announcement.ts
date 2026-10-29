// lib/site-announcement.ts
// Shared helpers for the site-wide announcement ribbon. Safe to use in the
// browser and on the server (there are no secrets in this file).
//
// The ribbon text comes from the "Site Announcement" entries in the Plasmic
// CMS. This file turns one raw CMS entry into clean, safe data for the ribbon.

export type SiteAnnouncementData = {
  // Changes whenever the text changes. Used to remember "visitor closed this one".
  key: string
  label: string
  sentence: string
  // Optional shorter sentence for phones. Empty = phones use the long sentence.
  phoneSentence: string
  linkText: string
  linkUrl: string
  backgroundColor: string
  labelColor: string
  textColor: string
  // Moment the ribbon stops showing (milliseconds), or null = no end date.
  endsAt: number | null
  // true = only show on pages whose address starts with /sandbox
  sandboxOnly: boolean
}

// The three ready-made colour choices (same as the design board).
const THEMES: Record<string, { bg: string; label: string; text: string }> = {
  navy: { bg: "#1F2D55", label: "#F5B83D", text: "#FFFFFF" },
  teal: { bg: "#01566F", label: "#F5B83D", text: "#FFFFFF" },
  gold: { bg: "#F5B83D", label: "#1E2B45", text: "#1E2B45" },
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

// Only accept real hex colours like #1F2D55 or #fff; anything else is ignored.
function cleanColor(value: unknown, fallback: string): string {
  const v = clean(value)
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? v : fallback
}

// Only accept links that start with /, https://, http:// or mailto:
// (this blocks anything unsafe typed or pasted into the CMS by mistake).
function cleanUrl(value: unknown): string {
  const v = clean(value)
  if (v.startsWith("/") && !v.startsWith("//")) return v
  if (/^https?:\/\//i.test(v)) return v
  if (/^mailto:/i.test(v)) return v
  return ""
}

// ---- End date helpers (the ministry works in Pacific time) ----

const PACIFIC = "America/Vancouver"

function pacificParts(ms: number) {
  const opts: any = {
    timeZone: PACIFIC,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }
  const out: Record<string, string> = {}
  for (const p of new Intl.DateTimeFormat("en-CA", opts).formatToParts(new Date(ms))) {
    out[p.type] = p.value
  }
  return { y: +out.year, mo: +out.month, d: +out.day, h: +out.hour, mi: +out.minute }
}

// Pacific time is 7 or 8 hours behind UTC depending on the season.
function pacificOffsetMinutes(atMs: number): number {
  const p = pacificParts(atMs)
  const localAsUtc = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi)
  return Math.round((localAsUtc - Math.floor(atMs / 60000) * 60000) / 60000)
}

// 11:59:59 pm Pacific on the given day, as milliseconds.
function endOfDayPacific(y: number, mo: number, d: number): number {
  const offset = pacificOffsetMinutes(Date.UTC(y, mo - 1, d, 19, 0, 0))
  return Date.UTC(y, mo - 1, d, 23, 59, 59) - offset * 60000
}

// If the end date has no time of day (just a date), the ribbon stays up
// through the END of that day. If a time was set, that exact time is used.
export function parseEndsAt(raw: unknown): number | null {
  const s = clean(raw)
  if (!s) return null
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (dateOnly) return endOfDayPacific(+dateOnly[1], +dateOnly[2], +dateOnly[3])
  const utcMidnight = /^(\d{4})-(\d{2})-(\d{2})T00:00:00(?:\.0+)?Z$/.exec(s)
  if (utcMidnight) return endOfDayPacific(+utcMidnight[1], +utcMidnight[2], +utcMidnight[3])
  const ms = new Date(s).getTime()
  if (Number.isNaN(ms)) return null
  const p = pacificParts(ms)
  if (p.h === 0 && p.mi === 0) return endOfDayPacific(p.y, p.mo, p.d)
  return ms
}

export function isExpired(endsAt: number | null): boolean {
  return endsAt !== null && Date.now() > endsAt
}

// Turns one raw CMS entry into ribbon data, or null if the ribbon should NOT show
// (switched off, no sentence, or the end date has passed).
export function normalizeAnnouncement(raw: any): SiteAnnouncementData | null {
  if (!raw) return null
  const enabled = raw.enabled === true || raw.enabled === "true"
  const sentence = clean(raw.sentence)
  if (!enabled || !sentence) return null

  const endsAt = parseEndsAt(raw.endDate)
  if (isExpired(endsAt)) return null

  const theme = THEMES[clean(raw.color).toLowerCase()] ?? THEMES.navy
  const label = clean(raw.label)
  const phoneSentence = clean(raw.phoneSentence)
  const linkText = clean(raw.linkText)
  const linkUrl = cleanUrl(raw.linkUrl)

  return {
    key: [label, sentence, phoneSentence, linkText, linkUrl, clean(raw.endDate)].join("|"),
    label,
    sentence,
    phoneSentence,
    linkText,
    linkUrl,
    backgroundColor: cleanColor(raw.backgroundColor, theme.bg),
    labelColor: cleanColor(raw.labelColor, theme.label),
    textColor: cleanColor(raw.textColor, theme.text),
    endsAt,
    sandboxOnly: raw.sandboxOnly === true || raw.sandboxOnly === "true",
  }
}
