"use client"

import React from "react"
import Link from "next/link"
import { Play } from "lucide-react"

function getYouTubeVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v")
    }
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1) || null
    }
  } catch {
    return null
  }
  return null
}

function getVimeoVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes("vimeo.com")) {
      const parts = u.pathname.split("/").filter(Boolean)
      return parts[parts.length - 1] || null
    }
  } catch {
    return null
  }
  return null
}

export interface VideoMinistriesSectionProps {
  className?: string

  // Eyebrow
  showEyebrow?: boolean
  eyebrow?: string
  eyebrowColor?: string

  // Title
  title?: string
  titleColor?: string
  titleSize?: string

  // Description (supports \n\n for paragraphs)
  description?: string
  descriptionColor?: string
  descriptionSize?: string

  // CTA
  ctaText?: string
  ctaUrl?: string
  ctaStyle?: "link" | "button"
  buttonBgColor?: string
  buttonTextColor?: string
  buttonHoverBgColor?: string
  linkColor?: string
  linkUnderlineColor?: string

  // Video
  videoUrl?: string
  videoPosterUrl?: string
  videoAspectRatio?: string

  // Section
  backgroundColor?: string
  textColor?: string
  sectionPaddingY?: number
  reverseOnMobile?: boolean
}

export const VideoMinistriesSection: React.FC<VideoMinistriesSectionProps> = ({
  className = "",

  showEyebrow = false,
  eyebrow = "WHO WE ARE",
  eyebrowColor = "#475569",

  title = "Great Commission Media Ministries",
  titleColor = "#1e3a8a",
  titleSize = "32px",

  description = "The Great Commission is not limited by borders, language barriers, censorship, distance, or fear.\n\nIn many places, people cannot easily walk into a church, meet a pastor, or ask questions about Jesus openly. But a broadcast can enter a home. A digital message can reach a phone. A printed resource can be read in secret. A trained follow-up worker can pray, listen, and help someone take the next step.\n\nGCMM exists to help the Gospel reach people who are often beyond the reach of traditional mission — and to connect that message with personal care, discipleship, and local witness.",
  descriptionColor = "#1f2937",
  descriptionSize = "16px",

  ctaText = "Learn more",
  ctaUrl = "",
  ctaStyle = "link",
  buttonBgColor = "#f59e0b",
  buttonTextColor = "#ffffff",
  buttonHoverBgColor = "#d97706",
  linkColor = "#1e3a8a",
  linkUnderlineColor = "#1e3a8a",

  videoUrl = "",
  videoPosterUrl = "/placeholder.svg",
  videoAspectRatio = "16/9",

  backgroundColor = "#f3f4f6",
  textColor = "#1f2937",
  sectionPaddingY = 96,
  reverseOnMobile = false,
}) => {
  const youTubeId = getYouTubeVideoId(videoUrl)
  const vimeoId = getVimeoVideoId(videoUrl)
  const isDirectVideo = !!(videoUrl && !youTubeId && !vimeoId)

  return (
    <section
      className={className}
      style={{
        backgroundColor,
        color: textColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
            reverseOnMobile ? "flex-col-reverse" : ""
          }`}
        >
          {/* Text column */}
          <div className="flex flex-col gap-4 order-2 md:order-1">
            {showEyebrow && eyebrow && (
              <span
                className="uppercase tracking-widest text-sm font-semibold"
                style={{ color: eyebrowColor }}
              >
                {eyebrow}
              </span>
            )}

            {title && (
              <h2
                className="font-serif font-bold leading-tight"
                style={{ color: titleColor, fontSize: titleSize }}
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                className="leading-relaxed whitespace-pre-line"
                style={{ color: descriptionColor, fontSize: descriptionSize }}
              >
                {description}
              </p>
            )}

            {ctaText && ctaUrl && ctaStyle === "button" && (
              <div>
                <Link
                  href={ctaUrl}
                  className="inline-block px-6 py-3 rounded-md font-medium transition-colors"
                  style={{
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = buttonHoverBgColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = buttonBgColor
                  }}
                >
                  {ctaText}
                </Link>
              </div>
            )}

            {ctaText && ctaUrl && ctaStyle === "link" && (
              <div>
                <Link
                  href={ctaUrl}
                  className="inline-flex items-center gap-3 font-medium transition-opacity hover:opacity-80"
                  style={{ color: linkColor }}
                >
                  <span>{ctaText}</span>
                  <span
                    className="inline-block w-12 h-px"
                    style={{ backgroundColor: linkUnderlineColor }}
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Video column */}
          <div className="order-1 md:order-2">
            <div
              className="relative w-full overflow-hidden rounded-lg shadow-xl"
              style={{ aspectRatio: videoAspectRatio, backgroundColor: "#000000" }}
            >
              {youTubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youTubeId}?autoplay=0&rel=0`}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : vimeoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0`}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : isDirectVideo ? (
                <video
                  controls
                  playsInline
                  poster={videoPosterUrl}
                  className="w-full h-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "#1f2937" }}
                >
                  <img
                    src={videoPosterUrl || "/placeholder.svg"}
                    alt="Video poster"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoMinistriesSection
