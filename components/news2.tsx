"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"

interface Article {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  url: string
}

// Font weight mapping
const fontWeightMap: Record<string, string> = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
}

export function News2({
  className,
  sectionTitle = "The latest",
  sectionTitleFontWeight = "bold",
  sectionSubtitle = "News & Articles",
  description = "Stay updated with our latest stories and insights from around the world.",

  backgroundColor = "#eff6ff",
  titleColor = "#111827",
  subtitleColor = "#2563eb",
  sectionTitleGradientFrom = "#2563eb",
  sectionTitleGradientTo = "#1e293b",
  useSectionTitleGradient = true,
  descriptionColor = "#111827",
  cardBackgroundColor = "#ffffff",
  cardBorderColor = "#f3f4f6",
  cardHoverBorderColor = "#e5e7eb",
  titleTextColor = "#111827",
  titleHoverColor = "#2563eb",
  excerptColor = "#4b5563",
  metaColor = "#6b7280",
  metaHoverColor = "#2563eb",
  categoryBadgeBackground = "#ffffff",
  categoryBadgeText = "#374151",
  readMoreColor = "#2563eb",
  readMoreHoverColor = "#1d4ed8",
  viewMoreButtonText = "View More",
  showViewMoreButton = true,
  viewMoreButtonUrl = "",
  viewMoreButtonBackground = "#2563eb",
  viewMoreButtonHoverBackground = "#1d4ed8",
  viewMoreButtonTextColor = "#ffffff",
  viewMoreButtonGradientFrom = "#2563eb",
  viewMoreButtonGradientTo = "#1d4ed8",
  viewMoreButtonHoverGradientFrom = "#1d4ed8",
  viewMoreButtonHoverGradientTo = "#1e40af",
  useButtonGradient = false,
  viewMoreButtonPaddingX = "32px",
  viewMoreButtonPaddingY = "12px",
  viewMoreButtonBorderRadius = "8px",

  sectionPaddingY = "96px",
  cardGap = "40px",
  headerMarginBottom = "64px",

  articles = [
    {
      title: "Restoring Souls in a Wounded Nation",
      excerpt: "Discover how communities are finding hope and healing through faith-based initiatives.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Ministry",
      url: "/articles/restoring-souls-wounded-nation",
    },
    {
      title: "When a heart remains with the Maithili people",
      excerpt: "A touching story of dedication and service among the Maithili community.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      category: "Missions",
      url: "/articles/heart-remains-maithili-people",
    },
    {
      title: "God is doing something new in Egypt",
      excerpt: "Witnessing transformation and renewal in the heart of the Middle East.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Global",
      url: "/articles/god-doing-something-new-egypt",
    },
  ],
}: {
  className?: string
  sectionTitle?: string
  /** Font weight for the section title. Options: light, normal, medium, semibold, bold, extrabold, black. Default: "bold" */
  sectionTitleFontWeight?: string
  sectionSubtitle?: string
  description?: string

  backgroundColor?: string
  titleColor?: string
  subtitleColor?: string
  sectionTitleGradientFrom?: string
  sectionTitleGradientTo?: string
  useSectionTitleGradient?: boolean
  descriptionColor?: string
  cardBackgroundColor?: string
  cardBorderColor?: string
  cardHoverBorderColor?: string
  titleTextColor?: string
  titleHoverColor?: string
  excerptColor?: string
  metaColor?: string
  metaHoverColor?: string
  categoryBadgeBackground?: string
  categoryBadgeText?: string
  readMoreColor?: string
  readMoreHoverColor?: string
  viewMoreButtonText?: string
  showViewMoreButton?: boolean
  viewMoreButtonUrl?: string
  viewMoreButtonBackground?: string
  viewMoreButtonHoverBackground?: string
  viewMoreButtonTextColor?: string
  viewMoreButtonGradientFrom?: string
  viewMoreButtonGradientTo?: string
  viewMoreButtonHoverGradientFrom?: string
  viewMoreButtonHoverGradientTo?: string
  useButtonGradient?: boolean
  viewMoreButtonPaddingX?: string
  viewMoreButtonPaddingY?: string
  viewMoreButtonBorderRadius?: string

  sectionPaddingY?: string
  cardGap?: string
  headerMarginBottom?: string

  articles?: Article[]
}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredReadMore, setHoveredReadMore] = useState<number | null>(null)
  const [visibleArticles, setVisibleArticles] = useState<boolean[]>([])
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const articleRefs = useRef<(HTMLElement | null)[]>([])

  const reversedArticles = [...articles].reverse()

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    articleRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleArticles((prev) => {
                  const newVisible = [...prev]
                  newVisible[index] = true
                  return newVisible
                })
                observer.disconnect()
              }
            })
          },
          { threshold: 0.2 },
        )

        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [reversedArticles.length])

  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
  }

  const getImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg?height=300&width=400"
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url
    }
    return `/${url}`
  }

  const titleFontWeight = fontWeightMap[sectionTitleFontWeight] || "700"

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden ${className || ""}`}
      style={{
        backgroundColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: headerMarginBottom,
          }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
            style={{ fontWeight: titleFontWeight }}
          >
            {/* Section Title */}
            {useSectionTitleGradient ? (
              <span
                className="bg-clip-text text-transparent block"
                style={{
                  backgroundImage: `linear-gradient(to right, ${sectionTitleGradientFrom}, ${sectionTitleGradientTo})`,
                }}
              >
                {sectionTitle}
              </span>
            ) : (
              <span
                className="block"
                style={{ color: titleColor }}
              >
                {sectionTitle}
              </span>
            )}
            {/* Section Subtitle */}
            {sectionSubtitle && (
              <span
                className="bg-clip-text text-transparent block"
                style={{
                  backgroundImage: `linear-gradient(to right, ${subtitleColor}, ${titleTextColor})`,
                }}
              >
                {sectionSubtitle}
              </span>
            )}
          </h2>

          <p
            style={{
              fontSize: "1.25rem",
              maxWidth: "672px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.75",
              color: descriptionColor,
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: cardGap,
          }}
        >
          {reversedArticles.map((article, index) => (
            <article
              key={index}
              ref={(el) => {
                articleRefs.current[index] = el
              }}
              style={{
                backgroundColor: cardBackgroundColor,
                borderRadius: "16px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: hoveredCard === index ? cardHoverBorderColor : cardBorderColor,
                boxShadow:
                  hoveredCard === index
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                overflow: "hidden",
                transform:
                  hoveredCard === index
                    ? "translateY(-8px)"
                    : visibleArticles[index]
                      ? "translateY(0)"
                      : "translateY(40px)",
                opacity: visibleArticles[index] ? 1 : 0,
                transition: `all 0.6s ease-out ${index * 0.15}s`,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link
                href={article.url || "#"}
                style={{ display: "block" }}
                {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div style={{ position: "relative", paddingBottom: "75%", overflow: "hidden" }}>
                  <Image
                    src={getImageUrl(article.image) || "/placeholder.svg?height=300&width=400"}
                    alt={article.title || "Article image"}
                    fill
                    style={{
                      objectFit: "cover",
                      transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
                      transition: "transform 0.7s ease-out",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
                      opacity: hoveredCard === index ? 1 : 0,
                      transition: "opacity 0.3s ease-out",
                    }}
                  />

                  <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        backgroundColor: categoryBadgeBackground,
                        color: categoryBadgeText,
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        borderRadius: "9999px",
                        backdropFilter: "blur(8px)",
                        transform: hoveredCard === index ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.3s ease-out",
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    fontSize: "0.875rem",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: hoveredCard === index ? metaHoverColor : metaColor,
                      transition: "color 0.3s ease-out",
                    }}
                  >
                    <Calendar style={{ width: "16px", height: "16px" }} />
                    <span>{article.date}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: hoveredCard === index ? metaHoverColor : metaColor,
                      transition: "color 0.3s ease-out",
                    }}
                  >
                    <Clock style={{ width: "16px", height: "16px" }} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Link
                  href={article.url || "#"}
                  {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "12px",
                      lineHeight: "1.3",
                      color: hoveredCard === index ? titleHoverColor : titleTextColor,
                      transition: "color 0.3s ease-out",
                      cursor: "pointer",
                    }}
                  >
                    {article.title}
                  </h3>
                </Link>

                <p
                  style={{
                    lineHeight: "1.75",
                    marginBottom: "24px",
                    color: excerptColor,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Link
                    href={article.url || "#"}
                    {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: "600",
                      color: hoveredReadMore === index ? readMoreHoverColor : readMoreColor,
                      transform: hoveredReadMore === index ? "translateX(4px)" : "translateX(0)",
                      transition: "all 0.2s ease-out",
                      textDecoration: "none",
                    }}
                    onMouseEnter={() => setHoveredReadMore(index)}
                    onMouseLeave={() => setHoveredReadMore(null)}
                  >
                    <span>Read More</span>
                    <ArrowRight
                      style={{
                        width: "16px",
                        height: "16px",
                        transform: hoveredReadMore === index ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.2s ease-out",
                      }}
                    />
                  </Link>

                  <div
                    style={{
                      width: "48px",
                      height: "4px",
                      borderRadius: "9999px",
                      background: `linear-gradient(to right, ${subtitleColor}, ${titleTextColor})`,
                      opacity: hoveredCard === index ? 1 : 0,
                      transform: hoveredCard === index ? "scaleX(1)" : "scaleX(0)",
                      transition: "all 0.3s ease-out",
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {showViewMoreButton && viewMoreButtonUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <Link
              href={viewMoreButtonUrl}
              {...(isExternalUrl(viewMoreButtonUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: viewMoreButtonPaddingX,
                paddingRight: viewMoreButtonPaddingX,
                paddingTop: viewMoreButtonPaddingY,
                paddingBottom: viewMoreButtonPaddingY,
                background: useButtonGradient
                  ? isButtonHovered
                    ? `linear-gradient(to right, ${viewMoreButtonHoverGradientFrom}, ${viewMoreButtonHoverGradientTo})`
                    : `linear-gradient(to right, ${viewMoreButtonGradientFrom}, ${viewMoreButtonGradientTo})`
                  : isButtonHovered
                    ? viewMoreButtonHoverBackground
                    : viewMoreButtonBackground,
                color: viewMoreButtonTextColor,
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: viewMoreButtonBorderRadius,
                border: "none",
                cursor: "pointer",
                transform: isButtonHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isButtonHovered
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease-out",
                textDecoration: "none",
              }}
            >
              <span>{viewMoreButtonText}</span>
              <ArrowRight
                style={{
                  width: "20px",
                  height: "20px",
                  transform: isButtonHovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s ease-out",
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}