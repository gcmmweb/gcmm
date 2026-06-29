"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

interface Post {
  title: string
  image: string
  date: string
  category: string
  url: string
}

export function RecentPosts({
  className,
  title = "Recent Posts",
  backgroundColor = "#f9fafb",
  titleColor = "#1f2937",
  cardBackgroundColor = "#ffffff",
  cardBorderColor = "#e5e7eb",
  cardHoverBorderColor = "#d1d5db",
  postTitleColor = "#1f2937",
  postTitleHoverColor = "#1e40af",
  metaColor = "#6b7280",
  categoryBadgeBackground = "#eff6ff",
  categoryBadgeText = "#1e40af",
  readMoreColor = "#2563eb",
  readMoreHoverColor = "#1d4ed8",
  sectionPaddingY = "80px",
  posts = [
    {
      title: "Understanding Biblical Prophecy",
      image: "/placeholder.svg?height=200&width=300",
      date: "Dec 8, 2024",
      category: "Bible Study",
      url: "/posts/understanding-biblical-prophecy",
    },
    {
      title: "The Power of Prayer",
      image: "/placeholder.svg?height=200&width=300",
      date: "Dec 5, 2024",
      category: "Devotional",
      url: "/posts/power-of-prayer",
    },
    {
      title: "Living in Faith",
      image: "/placeholder.svg?height=200&width=300",
      date: "Dec 1, 2024",
      category: "Inspiration",
      url: "/posts/living-in-faith",
    },
  ],
}: {
  className?: string
  title?: string
  backgroundColor?: string
  titleColor?: string
  cardBackgroundColor?: string
  cardBorderColor?: string
  cardHoverBorderColor?: string
  postTitleColor?: string
  postTitleHoverColor?: string
  metaColor?: string
  categoryBadgeBackground?: string
  categoryBadgeText?: string
  readMoreColor?: string
  readMoreHoverColor?: string
  sectionPaddingY?: string
  posts?: Post[]
}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredReadMore, setHoveredReadMore] = useState<number | null>(null)

  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
  }

  const getImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg?height=200&width=300"
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url
    }
    return `/${url}`
  }

  return (
    <section
      className={className || ""}
      style={{
        backgroundColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "48px",
            color: titleColor,
          }}
        >
          {title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            width: "100%",
          }}
        >
          {posts.map((post, index) => (
            <article
              key={index}
              style={{
                backgroundColor: cardBackgroundColor,
                borderRadius: "12px",
                border: `1px solid ${hoveredCard === index ? cardHoverBorderColor : cardBorderColor}`,
                overflow: "hidden",
                transform: hoveredCard === index ? "translateY(-4px)" : "translateY(0)",
                boxShadow:
                  hoveredCard === index
                    ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-out",
                minWidth: 0,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link
                href={post.url || "#"}
                style={{ display: "block" }}
                {...(isExternalUrl(post.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "66.67%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={getImageUrl(post.image)}
                    alt={post.title || "Post image"}
                    fill
                    style={{
                      objectFit: "cover",
                      transform: hoveredCard === index ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.5s ease-out",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        backgroundColor: categoryBadgeBackground,
                        color: categoryBadgeText,
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        borderRadius: "9999px",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.875rem",
                    marginBottom: "12px",
                    color: metaColor,
                  }}
                >
                  <Calendar style={{ width: "14px", height: "14px" }} />
                  <span>{post.date}</span>
                </div>

                <Link
                  href={post.url || "#"}
                  {...(isExternalUrl(post.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "bold",
                      marginBottom: "16px",
                      lineHeight: "1.4",
                      color: hoveredCard === index ? postTitleHoverColor : postTitleColor,
                      transition: "color 0.3s ease-out",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>

                <Link
                  href={post.url || "#"}
                  {...(isExternalUrl(post.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "600",
                    fontSize: "0.875rem",
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
                      width: "14px",
                      height: "14px",
                      transform: hoveredReadMore === index ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.2s ease-out",
                    }}
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}