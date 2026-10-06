// lib/video-source.ts
//
// ONE place that understands video links for the whole site. Paste anything:
//   - a YouTube share link (youtu.be/...), watch link, embed link, Shorts or Live link
//   - a Vimeo page link or player link (private "h=" codes are kept)
//   - the whole <iframe ...> embed code copied from YouTube or Vimeo
//   - a plain video file link (.mp4, .webm)
// and get back one clean description of the video. Returns null when the link
// is not recognised (the component then shows nothing on the live site).

export type VideoProvider = "youtube" | "vimeo" | "file"

export interface VideoSource {
  provider: VideoProvider
  id: string // YouTube id, Vimeo id, or the file address
  hash?: string // Vimeo private-link code
  start?: number // start time in seconds
  watchUrl: string // the video's own page (a real link, good for Google)
  embedUrl: string // player address with autoplay (used only after a click)
  thumbnailUrls: string[] // YouTube pictures, best first (Vimeo has none)
}

const YT_ID = /^[A-Za-z0-9_-]{11}$/

// Turns whatever was pasted into one clean https address (or "").
function cleanInput(raw: string): string {
  let s = (raw || "").trim()
  if (!s) return ""
  const iframe = s.match(/<iframe[^>]*?\ssrc\s*=\s*["']?([^"'\s>]+)/i)
  if (iframe) {
    s = iframe[1]
  } else if (/[<>"']/.test(s)) {
    const url = s.match(/https?:\/\/[^\s"'<>]+/i)
    if (url) s = url[0]
  }
  s = s
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/^[\s"'<>]+|[\s"'<>]+$/g, "")
  if (/^\/\//.test(s)) s = "https:" + s
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = "https://" + s
  return s
}

// "90", "1m30s", "1h2m3s" -> seconds
function parseTime(value: string | null | undefined): number | undefined {
  if (!value) return undefined
  if (/^\d+$/.test(value)) {
    const n = parseInt(value, 10)
    return n > 0 ? n : undefined
  }
  const m = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i)
  if (!m || !(m[1] || m[2] || m[3])) return undefined
  const n = (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0)
  return n > 0 ? n : undefined
}

function youtubeId(u: URL): string | null {
  const host = u.hostname.toLowerCase().replace(/^www\./, "").replace(/^m\./, "")
  const parts = u.pathname.split("/").filter(Boolean)
  if (host === "youtu.be") return parts[0] ?? null
  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "music.youtube.com") {
    if (parts[0] === "watch") return u.searchParams.get("v")
    if (["embed", "shorts", "live", "v"].includes(parts[0])) return parts[1] ?? null
  }
  return null
}

function vimeoParts(u: URL): { id: string; hash?: string } | null {
  const host = u.hostname.toLowerCase().replace(/^www\./, "")
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null
  const parts = u.pathname.split("/").filter(Boolean)
  const idx = parts.findIndex((p) => /^\d{6,}$/.test(p))
  if (idx === -1) return null
  let hash = u.searchParams.get("h") || undefined
  const next = parts[idx + 1]
  if (!hash && next && /^[A-Za-z0-9]{8,12}$/.test(next)) hash = next
  return { id: parts[idx], hash }
}

export function parseVideoSource(raw: string | undefined | null): VideoSource | null {
  const cleaned = cleanInput(raw ?? "")
  if (!cleaned) return null
  let u: URL
  try {
    u = new URL(cleaned)
  } catch {
    return null
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null

  const yt = youtubeId(u)
  if (yt && YT_ID.test(yt)) {
    const start = parseTime(u.searchParams.get("start")) ?? parseTime(u.searchParams.get("t"))
    return {
      provider: "youtube",
      id: yt,
      start,
      watchUrl: `https://www.youtube.com/watch?v=${yt}${start ? `&t=${start}s` : ""}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&playsinline=1${start ? `&start=${start}` : ""}`,
      thumbnailUrls: [
        `https://i.ytimg.com/vi/${yt}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
      ],
    }
  }

  const vm = vimeoParts(u)
  if (vm) {
    const start = parseTime(new URLSearchParams(u.hash.replace(/^#/, "")).get("t"))
    return {
      provider: "vimeo",
      id: vm.id,
      hash: vm.hash,
      start,
      watchUrl: `https://vimeo.com/${vm.id}${vm.hash ? `/${vm.hash}` : ""}`,
      embedUrl:
        `https://player.vimeo.com/video/${vm.id}?` +
        `${vm.hash ? `h=${vm.hash}&` : ""}autoplay=1&dnt=1&playsinline=1` +
        `${start ? `#t=${start}s` : ""}`,
      thumbnailUrls: [],
    }
  }

  if (/\.(mp4|webm|m4v|mov)$/i.test(u.pathname)) {
    return {
      provider: "file",
      id: u.toString(),
      watchUrl: u.toString(),
      embedUrl: u.toString(),
      thumbnailUrls: [],
    }
  }

  return null
}
