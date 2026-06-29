"use client"

import { useEffect, useRef, useState } from "react"

interface StaffMember {
  name: string
  role: string
  bio: string
  image: string
  links?: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
}

interface TimelineEvent {
  year: string
  title: string
  description: string
  highlight?: boolean
  hasImage?: boolean
  image?: string
}

interface AboutPageProps {
  // Staff Section Props
  staffSectionTitle?: string
  staffSectionSubtitle?: string
  staffMembers?: StaffMember[]
  staffBackgroundColor?: string
  staffTitleColor?: string
  staffSubtitleColor?: string
  staffCardBackgroundColor?: string
  staffCardTextColor?: string
  staffCardRoleColor?: string
  staffCardBioColor?: string
  staffCardBorderColor?: string
  staffLinkColor?: string
  staffLinkHoverColor?: string

  // Timeline Section Props
  timelineTitle?: string
  timelineSubtitle?: string
  timelineEvents?: TimelineEvent[]
  timelineBackgroundColor?: string
  timelineTitleColor?: string
  timelineSubtitleColor?: string
  timelineLineColor?: string
  timelineAccentColor?: string
  timelineYearColor?: string
  timelineHighlightYearColor?: string
  timelineEventTitleColor?: string
  timelineEventDescriptionColor?: string
  timelineDotColor?: string
  timelineHighlightDotColor?: string
  enableAnimations?: boolean

  className?: string
}

export function AboutPage({
  // Staff defaults
  staffSectionTitle = "Our Team",
  staffSectionSubtitle = "Meet the people behind our mission",
  staffMembers = [],
  staffBackgroundColor = "#FFFFFF",
  staffTitleColor = "#1A1A1A",
  staffSubtitleColor = "#666666",
  staffCardBackgroundColor = "#FFFFFF",
  staffCardTextColor = "#1A1A1A",
  staffCardRoleColor = "#666666",
  staffCardBioColor = "#4A4A4A",
  staffCardBorderColor = "#E5E5E5",
  staffLinkColor = "#666666",
  staffLinkHoverColor = "#1A1A1A",

  // Timeline defaults
  timelineTitle = "Our Story",
  timelineSubtitle = "A Journey of Faith and Service",
  timelineEvents = [],
  timelineBackgroundColor = "#0A0A0A",
  timelineTitleColor = "#FFFFFF",
  timelineSubtitleColor = "#999999",
  timelineLineColor = "#F59E0B",
  timelineAccentColor = "#F59E0B",
  timelineYearColor = "#999999",
  timelineHighlightYearColor = "#F59E0B",
  timelineEventTitleColor = "#FFFFFF",
  timelineEventDescriptionColor = "#CCCCCC",
  timelineDotColor = "#666666",
  timelineHighlightDotColor = "#F59E0B",
  enableAnimations = true,

  className = "",
}: AboutPageProps) {
  const [visibleEvents, setVisibleEvents] = useState<Set<number>>(new Set())
  const eventRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    console.log("[v0] Timeline events:", timelineEvents)
    console.log("[v0] Number of timeline events:", timelineEvents.length)
  }, [timelineEvents])

  useEffect(() => {
    if (!enableAnimations) return

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
        if (entry.isIntersecting) {
          setVisibleEvents((prev) => new Set([...prev, index]))
        }
      })
    }, observerOptions)

    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [enableAnimations, timelineEvents.length])

  const getValidText = (text: string | undefined, fallback: string): string => {
    if (!text) return fallback
    const trimmed = text.trim()
    // Check if it's empty, just whitespace, or a single character like "-"
    if (trimmed.length === 0 || trimmed === "-" || trimmed.length === 1) {
      return fallback
    }
    return trimmed
  }

  return (
    <div className={className} style={{ width: "100%" }}>
      {/* Staff Section */}
      <section
        style={{
          backgroundColor: staffBackgroundColor,
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Staff Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "80px",
            }}
          >
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "300",
                color: staffTitleColor,
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              {staffSectionTitle}
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: staffSubtitleColor,
                fontWeight: "300",
              }}
            >
              {staffSectionSubtitle}
            </p>
          </div>

          {/* Staff Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            {staffMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: staffCardBackgroundColor,
                  border: `1px solid ${staffCardBorderColor}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {/* Staff Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    backgroundColor: "#F5F5F5",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={member.image || "/placeholder.svg?height=400&width=400"}
                    alt={member.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Staff Info */}
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: staffCardTextColor,
                      marginBottom: "4px",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: staffCardRoleColor,
                      marginBottom: "12px",
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: staffCardBioColor,
                    }}
                  >
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  {member.links && (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "16px",
                      }}
                    >
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: staffLinkColor, transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = staffLinkHoverColor)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = staffLinkColor)}
                        >
                          <svg style={{ width: "20px", height: "20px" }} fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: staffLinkColor, transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = staffLinkHoverColor)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = staffLinkColor)}
                        >
                          <svg style={{ width: "20px", height: "20px" }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {member.links.twitter && (
                        <a
                          href={member.links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: staffLinkColor, transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = staffLinkHoverColor)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = staffLinkColor)}
                        >
                          <svg style={{ width: "20px", height: "20px" }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                      {member.links.website && (
                        <a
                          href={member.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: staffLinkColor, transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = staffLinkHoverColor)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = staffLinkColor)}
                        >
                          <svg
                            style={{ width: "20px", height: "20px" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        style={{
          backgroundColor: timelineBackgroundColor,
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Timeline Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "80px",
            }}
          >
            <h2
              style={{
                fontSize: "56px",
                fontWeight: "200",
                color: timelineTitleColor,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              {timelineTitle}
            </h2>
            <p
              style={{
                fontSize: "20px",
                color: timelineSubtitleColor,
                fontWeight: "300",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {timelineSubtitle}
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Timeline Line */}
            <div
              style={{
                position: "absolute",
                left: "24px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: `linear-gradient(to bottom, ${timelineLineColor}CC, ${timelineLineColor}99, transparent)`,
              }}
            />

            {/* Timeline Events */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "80px",
                paddingBottom: "80px",
              }}
            >
              {timelineEvents.map((event, index) => {
                const year = getValidText(event.year, "2024")
                const title = getValidText(event.title, "New Event")
                const description = getValidText(event.description, "Add your event description here.")

                console.log(`[v0] Event ${index}:`, {
                  year,
                  title,
                  description,
                  hasImage: event.hasImage,
                  image: event.image,
                })

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      eventRefs.current[index] = el
                    }}
                    data-index={index}
                    style={{
                      position: "relative",
                      opacity: enableAnimations && !visibleEvents.has(index) ? 0 : 1,
                      transform: enableAnimations && !visibleEvents.has(index) ? "translateY(32px)" : "translateY(0)",
                      transition: "all 1s ease-out",
                      transitionDelay: enableAnimations ? `${index * 80}ms` : "0ms",
                    }}
                  >
                    {/* Timeline Dot */}
                    <div
                      style={{
                        position: "absolute",
                        left: "24px",
                        transform: "translate(-50%, -8px)",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: event.highlight ? timelineHighlightDotColor : timelineDotColor,
                        boxShadow: event.highlight ? `0 0 20px ${timelineHighlightDotColor}80` : "none",
                      }}
                    />

                    {/* Content */}
                    <div
                      style={{
                        marginLeft: "48px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                      }}
                    >
                      {/* Year */}
                      <div
                        style={{
                          fontSize: "48px",
                          fontWeight: "200",
                          letterSpacing: "-0.02em",
                          color: event.highlight ? timelineHighlightYearColor : timelineYearColor,
                        }}
                      >
                        {year}
                      </div>

                      {/* Content Card */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: event.hasImage && event.image ? "2fr 1fr" : "1fr",
                          gap: "24px",
                        }}
                      >
                        {/* Text Content */}
                        <div>
                          <h3
                            style={{
                              fontSize: "28px",
                              fontWeight: "300",
                              color: timelineEventTitleColor,
                              marginBottom: "16px",
                              lineHeight: "1.3",
                            }}
                          >
                            {title}
                          </h3>
                          <p
                            style={{
                              color: timelineEventDescriptionColor,
                              lineHeight: "1.7",
                              fontWeight: "300",
                              fontSize: "18px",
                            }}
                          >
                            {description}
                          </p>
                        </div>

                        {/* Image */}
                        {event.hasImage && event.image && (
                          <div
                            style={{
                              aspectRatio: "1",
                              borderRadius: "8px",
                              overflow: "hidden",
                              backgroundColor: "#1A1A1A",
                              border: "1px solid #333333",
                            }}
                          >
                            <img
                              src={event.image || "/placeholder.svg?height=400&width=400"}
                              alt={`Ministry work in ${year}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                opacity: 0.8,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
