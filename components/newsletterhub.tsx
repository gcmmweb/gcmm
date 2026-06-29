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

export function NewsletterHub({
  className,
  sectionTitle = "The latest",
  sectionSubtitle = "News & Articles",
  description = "Stay updated with our latest stories and insights from around the world.",
  
  showSearchBar = true,
  searchBarPlaceholder = "Search articles and blog posts...",
  searchBarBackground = "#ffffff",
  searchBarTextColor = "#1f2937",
  searchBarBorderColor = "#e5e7eb",
  searchBarBorderRadius = "9999px",
  searchBarPadding = "12px 24px",
  searchBarFontSize = "1rem",
  searchButtonBackground = "#0ea5e9",
  searchButtonHoverBackground = "#0284c7",
  searchButtonTextColor = "#ffffff",
  searchBarMarginBottom = "32px",
  clearButtonText = "Clear",
  clearButtonBackground = "#ef4444",
  clearButtonHoverBackground = "#dc2626",
  clearButtonTextColor = "#ffffff",
  clearButtonPadding = "12px 24px",
  clearButtonBorderRadius = "9999px",
  clearButtonFontSize = "1rem",
  clearButtonFontWeight = "600",
  
  backgroundImage = "",
  backgroundOverlayColor = "rgba(0, 0, 0, 0.5)",
  backgroundPosition = "center",
  backgroundSize = "cover",

  backgroundColor = "#ffffff",
  titleColor = "#1f2937",
  subtitleColor = "#1e3a8a",
  descriptionColor = "#4b5563",
  cardBackgroundColor = "#ffffff",
  cardBorderColor = "#e5e7eb",
  cardHoverBorderColor = "#d1d5db",
  titleTextColor = "#1e3a8a",
  titleHoverColor = "#1e40af",
  excerptColor = "#4b5563",
  metaColor = "#6b7280",
  metaHoverColor = "#1e3a8a",
  categoryBadgeBackground = "#ffffff",
  categoryBadgeText = "#1e3a8a",
  readMoreColor = "#2563eb",
  readMoreHoverColor = "#1d4ed8",
  viewMoreButtonText = "View More",
  viewMoreButtonBackground = "#2563eb",
  viewMoreButtonHoverBackground = "#1d4ed8",
  viewMoreButtonTextColor = "#ffffff",
  viewMoreButtonPaddingX = "32px",
  viewMoreButtonPaddingY = "12px",
  viewMoreButtonBorderRadius = "8px",

  sectionPaddingY = "80px",
  cardGap = "32px",
  headerMarginBottom = "64px",
  
  showCategoryButtons = true,
  categoryButtonsBackground = "#d4a574",
  categoryButtonsHoverBackground = "#b8935f",
  categoryButtonsTextColor = "#ffffff",
  categoryButtonsFontSize = "0.875rem",
  categoryButtonsFontWeight = "700",
  categoryButtonsPadding = "12px 24px",
  categoryButtonsBorderRadius = "4px",
  categoryButtonsGap = "12px",
  categoryButtonsMarginBottom = "48px",
  
  category1Name = "FEASTS & SPECIAL DAYS",
  category1Tag = "Feasts",
  category2Name = "MESSIANIC PERSPECTIVE",
  category2Tag = "Messianic",
  category3Name = "ARABIC MINISTRY NEWS",
  category3Tag = "Arabic",
  category4Name = "INSIGHTS FROM HEBREW",
  category4Tag = "Hebrew",
  category5Name = "JEWISH APOLOGETICS",
  category5Tag = "Apologetics",
  category6Name = "BIBLE TEACHINGS",
  category6Tag = "Bible",

  articles = [],
}: {
  className?: string
  sectionTitle?: string
  sectionSubtitle?: string
  description?: string
  
  showSearchBar?: boolean
  searchBarPlaceholder?: string
  searchBarBackground?: string
  searchBarTextColor?: string
  searchBarBorderColor?: string
  searchBarBorderRadius?: string
  searchBarPadding?: string
  searchBarFontSize?: string
  searchButtonBackground?: string
  searchButtonHoverBackground?: string
  searchButtonTextColor?: string
  searchBarMarginBottom?: string
  clearButtonText?: string
  clearButtonBackground?: string
  clearButtonHoverBackground?: string
  clearButtonTextColor?: string
  clearButtonPadding?: string
  clearButtonBorderRadius?: string
  clearButtonFontSize?: string
  clearButtonFontWeight?: string
  
  backgroundImage?: string
  backgroundOverlayColor?: string
  backgroundPosition?: string
  backgroundSize?: string

  backgroundColor?: string
  titleColor?: string
  subtitleColor?: string
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
  viewMoreButtonBackground?: string
  viewMoreButtonHoverBackground?: string
  viewMoreButtonTextColor?: string
  viewMoreButtonPaddingX?: string
  viewMoreButtonPaddingY?: string
  viewMoreButtonBorderRadius?: string

  sectionPaddingY?: string
  cardGap?: string
  headerMarginBottom?: string
  
  showCategoryButtons?: boolean
  categoryButtonsBackground?: string
  categoryButtonsHoverBackground?: string
  categoryButtonsTextColor?: string
  categoryButtonsFontSize?: string
  categoryButtonsFontWeight?: string
  categoryButtonsPadding?: string
  categoryButtonsBorderRadius?: string
  categoryButtonsGap?: string
  categoryButtonsMarginBottom?: string
  
  category1Name?: string
  category1Tag?: string
  category2Name?: string
  category2Tag?: string
  category3Name?: string
  category3Tag?: string
  category4Name?: string
  category4Tag?: string
  category5Name?: string
  category5Tag?: string
  category6Name?: string
  category6Tag?: string

  articles?: Article[]
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredReadMore, setHoveredReadMore] = useState<number | null>(null)
  const [visibleArticles, setVisibleArticles] = useState<boolean[]>([])
  const [displayCount, setDisplayCount] = useState(9)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isClearButtonHovered, setIsClearButtonHovered] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const articleRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q")
    if (q) setSearchQuery(q)
  }, [])

  const categories = [
    { name: category1Name, tag: category1Tag },
    { name: category2Name, tag: category2Tag },
    { name: category3Name, tag: category3Tag },
    { name: category4Name, tag: category4Tag },
    { name: category5Name, tag: category5Tag },
    { name: category6Name, tag: category6Tag },
  ].filter(cat => cat.name && cat.tag)

  // Filter articles by selected category and search query
  const filteredArticles = articles.filter(article => {
    // Filter by category
if (selectedCategory && !article.category?.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false
    }
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        article.title?.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query)
      )
    }
    return true
  })

  const reversedArticles = [...filteredArticles].reverse()
  const displayedArticles = reversedArticles.slice(0, displayCount)
  const hasMore = displayCount < reversedArticles.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

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
  }, [displayedArticles.length])

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is now handled by the searchQuery state
  }

  const handleCategoryClick = (categoryTag: string) => {
    if (selectedCategory === categoryTag) {
      setSelectedCategory(null) // Deselect if clicking the same category
    } else {
      setSelectedCategory(categoryTag)
    }
    setDisplayCount(9) // Reset display count when category changes
  }

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden ${className || ""}`}
      style={{
        backgroundColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
        backgroundImage: backgroundImage ? `url(${getImageUrl(backgroundImage)})` : "none",
        backgroundPosition: backgroundPosition,
        backgroundSize: backgroundSize,
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {backgroundImage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: backgroundOverlayColor,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: headerMarginBottom,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(32px)",
            transition: "all 1s ease-out",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              marginBottom: "16px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "all 1s ease-out 0.3s",
            }}
          >
            <span style={{ color: titleColor }}>{sectionTitle}</span>
            <br />
            <span
              style={{
                background: `linear-gradient(to right, ${subtitleColor}, ${titleTextColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {sectionSubtitle}
            </span>
          </h2>

          <p
            style={{
              fontSize: "1.25rem",
              maxWidth: "672px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.75",
              color: descriptionColor,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "all 1s ease-out 0.5s",
            }}
          >
            {description}
          </p>
        </div>

        {showSearchBar && (
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              gap: "8px",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: searchBarMarginBottom,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "all 1s ease-out 0.6s",
            }}
          >
            <input
              type="text"
              placeholder={searchBarPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: searchBarPadding,
                backgroundColor: searchBarBackground,
                color: searchBarTextColor,
                borderRadius: searchBarBorderRadius,
                border: `1px solid ${searchBarBorderColor}`,
                fontSize: searchBarFontSize,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
              onMouseEnter={() => setIsClearButtonHovered(true)}
              onMouseLeave={() => setIsClearButtonHovered(false)}
              style={{
                padding: clearButtonPadding,
                backgroundColor: isClearButtonHovered ? clearButtonHoverBackground : clearButtonBackground,
                color: clearButtonTextColor,
                borderRadius: clearButtonBorderRadius,
                border: "none",
                cursor: "pointer",
                fontSize: clearButtonFontSize,
                fontWeight: clearButtonFontWeight,
                transition: "all 0.3s ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {clearButtonText}
            </button>
          </form>
        )}

        {showCategoryButtons && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: categoryButtonsGap,
              justifyContent: "center",
              marginBottom: categoryButtonsMarginBottom,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "all 1s ease-out 0.7s",
            }}
          >
            {categories.map((category, index) => (
              <button
                key={category.tag}
                onClick={() => handleCategoryClick(category.tag)}
                style={{
                  display: "inline-block",
                  padding: categoryButtonsPadding,
                  backgroundColor:
                    selectedCategory === category.tag
                      ? categoryButtonsHoverBackground
                      : hoveredCategoryIndex === index
                        ? categoryButtonsHoverBackground
                        : categoryButtonsBackground,
                  color: categoryButtonsTextColor,
                  fontSize: categoryButtonsFontSize,
                  fontWeight: categoryButtonsFontWeight,
                  borderRadius: categoryButtonsBorderRadius,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s ease-out",
                  transform: hoveredCategoryIndex === index || selectedCategory === category.tag ? "translateY(-2px)" : "translateY(0)",
                  boxShadow:
                    hoveredCategoryIndex === index || selectedCategory === category.tag
                      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                      : "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredCategoryIndex(index)}
                onMouseLeave={() => setHoveredCategoryIndex(null)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {filteredArticles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: descriptionColor }}>
            <p style={{ fontSize: "1.125rem" }}>No articles found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: cardGap,
                gridAutoRows: "minmax(200px, auto)",
              }}
              className="news-grid"
            >
              {displayedArticles.map((article, index) => {
                const isCenterFeatured = index === 4
                const isFirstNine = index < 9
                
                let gridColumn = "auto"
                let gridRow = "auto"
                
                if (isFirstNine) {
                  if (index === 0) {
                    gridColumn = "1"
                    gridRow = "1"
                  } else if (index === 1) {
                    gridColumn = "2"
                    gridRow = "1"
                  } else if (index === 2) {
                    gridColumn = "3"
                    gridRow = "1"
                  } else if (index === 3) {
                    gridColumn = "4"
                    gridRow = "1"
                  } else if (index === 4) {
                    gridColumn = "2 / 4"
                    gridRow = "2 / 4"
                  } else if (index === 5) {
                    gridColumn = "1"
                    gridRow = "2"
                  } else if (index === 6) {
                    gridColumn = "4"
                    gridRow = "2"
                  } else if (index === 7) {
                    gridColumn = "1"
                    gridRow = "3"
                  } else if (index === 8) {
                    gridColumn = "4"
                    gridRow = "3"
                  }
                }
                
                return (
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
                      transition: `all 0.6s ease-out ${index * 0.1}s`,
                      gridColumn: gridColumn,
                      gridRow: gridRow,
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link
                      href={article.url || "#"}
                      style={{ display: "block" }}
                      {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <div
                        style={{
                          position: "relative",
                          paddingBottom: isCenterFeatured ? "100%" : "75%",
                          overflow: "hidden",
                        }}
                      >
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
                          flexWrap: "wrap",
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
                            fontSize: isCenterFeatured ? "1.875rem" : "1.125rem",
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
                          WebkitLineClamp: isCenterFeatured ? 5 : 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          fontSize: isCenterFeatured ? "1rem" : "0.875rem",
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
                )
              })}
            </div>

            {hasMore && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "48px",
                }}
              >
                <button
                  onClick={() => setDisplayCount((prev) => prev + 8)}
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
                    backgroundColor: isButtonHovered ? viewMoreButtonHoverBackground : viewMoreButtonBackground,
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
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .news-grid > article {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }
        
        @media (max-width: 640px) {
          .news-grid {
            grid-template-columns: 1fr !important;
          }
          .news-grid > article {
            grid-column: span 1 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  )
}