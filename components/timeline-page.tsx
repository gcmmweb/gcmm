"use client"

import { useEffect, useRef, useState } from "react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  highlight?: boolean
  hasImage?: boolean
  image?: string
}

interface TimelinePageProps {
  title?: string
  subtitle?: string
  timelineEvents?: TimelineEvent[]
  backgroundColor?: string
  titleColor?: string
  subtitleColor?: string
  lineColor?: string
  accentColor?: string
  yearColor?: string
  highlightYearColor?: string
  eventTitleColor?: string
  eventDescriptionColor?: string
  dotColor?: string
  highlightDotColor?: string
  enableAnimations?: boolean
  className?: string
}

export function TimelinePage({
  title = "Our Story",
  subtitle = "A Journey of Faith and Service",
  timelineEvents = [],
  backgroundColor = "#0A0A0A",
  titleColor = "#FFFFFF",
  subtitleColor = "#999999",
  lineColor = "#F59E0B",
  accentColor = "#F59E0B",
  yearColor = "#999999",
  highlightYearColor = "#F59E0B",
  eventTitleColor = "#FFFFFF",
  eventDescriptionColor = "#CCCCCC",
  dotColor = "#666666",
  highlightDotColor = "#F59E0B",
  enableAnimations = true,
  className = "",
}: TimelinePageProps) {
  const [visibleEvents, setVisibleEvents] = useState<Set<number>>(new Set())
  const eventRefs = useRef<(HTMLDivElement | null)[]>([])

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
    if (trimmed.length === 0 || trimmed === "-" || trimmed.length === 1) {
      return fallback
    }
    return trimmed
  }

  return (
    <div className={className} style={{ width: "100%" }}>
      <section
        style={{
          backgroundColor: backgroundColor,
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
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
                color: titleColor,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "20px",
                color: subtitleColor,
                fontWeight: "300",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
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
                background: `linear-gradient(to bottom, ${lineColor}CC, ${lineColor}99, transparent)`,
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
                        backgroundColor: event.highlight ? highlightDotColor : dotColor,
                        boxShadow: event.highlight ? `0 0 20px ${highlightDotColor}80` : "none",
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
                          color: event.highlight ? highlightYearColor : yearColor,
                        }}
                      >
                        {year}
                      </div>

                      {/* Content Card - Fixed mobile layout to stack image below text */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "24px",
                        }}
                      >
                        {/* Text Content */}
                        <div>
                          <h3
                            style={{
                              fontSize: "28px",
                              fontWeight: "300",
                              color: eventTitleColor,
                              marginBottom: "16px",
                              lineHeight: "1.3",
                            }}
                          >
                            {title}
                          </h3>
                          <p
                            style={{
                              color: eventDescriptionColor,
                              lineHeight: "1.7",
                              fontWeight: "300",
                              fontSize: "18px",
                            }}
                          >
                            {description}
                          </p>
                        </div>

                        {/* Image - Now appears below text on all screen sizes */}
                        {event.hasImage && event.image && (
                          <div
                            style={{
                              width: "100%",
                              maxWidth: "400px",
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

export default TimelinePage