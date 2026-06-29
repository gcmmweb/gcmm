"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"

// Function to get animation class based on index
const getAnimationClass = (index: number) => {
  const classes = [
    "animate-fade-in-up",
    "animate-fade-in-up delay-100",
    "animate-fade-in-up delay-200",
    "animate-fade-in-up delay-300",
    "animate-fade-in-up delay-400",
    "animate-fade-in-up delay-500",
  ]
  return classes[index] || ""
}

export function ModernNewsSection({
  className,
  sectionTitle = "The latest",
  sectionSubtitle = "News & Articles",
  description = "Stay updated with our latest stories and insights from around the world.",

  backgroundColor = "#eff6ff",
  titleColor = "#6b7280",
  subtitleColor = "#2563eb",
  descriptionColor = "#4b5563",
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
  buttonGradientFrom = "#2563eb",
  buttonGradientTo = "#1e293b",
  buttonHoverGradientFrom = "#1d4ed8",
  buttonHoverGradientTo = "#7c3aed",

  sectionPaddingY = "96px",
  cardGap = "40px",
  headerMarginBottom = "64px",

  // Article 1
  showArticle1 = true,
  article1Image = "/placeholder.svg?height=300&width=400",
  article1Title = "Restoring Souls in a Wounded Nation",
  article1Excerpt = "Discover how communities are finding hope and healing through faith-based initiatives.",
  article1Date = "Dec 15, 2024",
  article1ReadTime = "5 min read",
  article1Category = "Ministry",
  article1Url = "/articles/restoring-souls-wounded-nation",

  // Article 2
  showArticle2 = true,
  article2Image = "/placeholder.svg?height=300&width=400",
  article2Title = "When a heart remains with the Maithili people",
  article2Excerpt = "A touching story of dedication and service among the Maithili community.",
  article2Date = "Dec 12, 2024",
  article2ReadTime = "7 min read",
  article2Category = "Missions",
  article2Url = "/articles/heart-remains-maithili-people",

  // Article 3
  showArticle3 = true,
  article3Image = "/placeholder.svg?height=300&width=400",
  article3Title = "God is doing something new in Egypt",
  article3Excerpt = "Witnessing transformation and renewal in the heart of the Middle East.",
  article3Date = "Dec 10, 2024",
  article3ReadTime = "6 min read",
  article3Category = "Global",
  article3Url = "/articles/god-doing-something-new-egypt",

  // Article 4
  showArticle4 = true,
  article4Image = "/placeholder.svg?height=300&width=400",
  article4Title = "War Does Not Stop the Gospel",
  article4Excerpt = "How faith continues to flourish even in the midst of conflict and uncertainty.",
  article4Date = "Dec 8, 2024",
  article4ReadTime = "8 min read",
  article4Category = "Testimony",
  article4Url = "/articles/war-does-not-stop-gospel",

  // Article 5
  showArticle5 = true,
  article5Image = "/placeholder.svg?height=300&width=400",
  article5Title = "Encounters with the Messiah in Israel",
  article5Excerpt = "Personal stories of spiritual encounters in the Holy Land.",
  article5Date = "Dec 5, 2024",
  article5ReadTime = "4 min read",
  article5Category = "Israel",
  article5Url = "/articles/encounters-messiah-israel",

  // Article 6
  showArticle6 = true,
  article6Image = "/placeholder.svg?height=300&width=400",
  article6Title = "See the impact of THE GOSPEL IN MONGOLIA",
  article6Excerpt = "Exploring the growing influence of faith in Mongolia's remote communities.",
  article6Date = "Dec 3, 2024",
  article6ReadTime = "9 min read",
  article6Category = "Asia",
  article6Url = "/articles/gospel-impact-mongolia",

  showViewAllButton = true,
  viewAllUrl = "/news",
  viewAllText = "View All Articles",
  viewAllButtonTextColor = "#ffffff",
  viewAllButtonBackgroundColor = "#2563eb",
  viewAllButtonHoverBackgroundColor = "#1d4ed8",
}: {
  className?: string
  sectionTitle?: string
  sectionSubtitle?: string
  description?: string

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
  buttonGradientFrom?: string
  buttonGradientTo?: string
  buttonHoverGradientFrom?: string
  buttonHoverGradientTo?: string

  sectionPaddingY?: string
  cardGap?: string
  headerMarginBottom?: string

  // Article 1 props
  showArticle1?: boolean
  article1Image?: string
  article1Title?: string
  article1Excerpt?: string
  article1Date?: string
  article1ReadTime?: string
  article1Category?: string
  article1Url?: string

  // Article 2 props
  showArticle2?: boolean
  article2Image?: string
  article2Title?: string
  article2Excerpt?: string
  article2Date?: string
  article2ReadTime?: string
  article2Category?: string
  article2Url?: string

  // Article 3 props
  showArticle3?: boolean
  article3Image?: string
  article3Title?: string
  article3Excerpt?: string
  article3Date?: string
  article3ReadTime?: string
  article3Category?: string
  article3Url?: string

  // Article 4 props
  showArticle4?: boolean
  article4Image?: string
  article4Title?: string
  article4Excerpt?: string
  article4Date?: string
  article4ReadTime?: string
  article4Category?: string
  article4Url?: string

  // Article 5 props
  showArticle5?: boolean
  article5Image?: string
  article5Title?: string
  article5Excerpt?: string
  article5Date?: string
  article5ReadTime?: string
  article5Category?: string
  article5Url?: string

  // Article 6 props
  showArticle6?: boolean
  article6Image?: string
  article6Title?: string
  article6Excerpt?: string
  article6Date?: string
  article6ReadTime?: string
  article6Category?: string
  article6Url?: string

  showViewAllButton?: boolean
  viewAllUrl?: string
  viewAllText?: string
  viewAllButtonTextColor?: string
  viewAllButtonBackgroundColor?: string
  viewAllButtonHoverBackgroundColor?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredReadMore, setHoveredReadMore] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const articleRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      })
    }, {})

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const allArticles = [
    {
      id: 1,
      show: showArticle1,
      title: article1Title,
      excerpt: article1Excerpt,
      image: article1Image,
      date: article1Date,
      readTime: article1ReadTime,
      category: article1Category,
      url: article1Url,
    },
    {
      id: 2,
      show: showArticle2,
      title: article2Title,
      excerpt: article2Excerpt,
      image: article2Image,
      date: article2Date,
      readTime: article2ReadTime,
      category: article2Category,
      url: article2Url,
    },
    {
      id: 3,
      show: showArticle3,
      title: article3Title,
      excerpt: article3Excerpt,
      image: article3Image,
      date: article3Date,
      readTime: article3ReadTime,
      category: article3Category,
      url: article3Url,
    },
    {
      id: 4,
      show: showArticle4,
      title: article4Title,
      excerpt: article4Excerpt,
      image: article4Image,
      date: article4Date,
      readTime: article4ReadTime,
      category: article4Category,
      url: article4Url,
    },
    {
      id: 5,
      show: showArticle5,
      title: article5Title,
      excerpt: article5Excerpt,
      image: article5Image,
      date: article5Date,
      readTime: article5ReadTime,
      category: article5Category,
      url: article5Url,
    },
    {
      id: 6,
      show: showArticle6,
      title: article6Title,
      excerpt: article6Excerpt,
      image: article6Image,
      date: article6Date,
      readTime: article6ReadTime,
      category: article6Category,
      url: article6Url,
    },
  ]

  const articles = allArticles.filter((article) => article.show)

  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
  }

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
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div
          className={`text-center space-y-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ marginBottom: headerMarginBottom }}
        >
          <h2
            className={`text-5xl lg:text-6xl font-bold leading-tight transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span style={{ color: titleColor }}>{sectionTitle}</span>
            <br />
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${subtitleColor}, ${titleTextColor})`,
              }}
            >
              {sectionSubtitle}
            </span>
          </h2>

          <p
            className={`text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ color: descriptionColor }}
          >
            {description}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: cardGap }}>
          {articles.map((article, index) => (
            <article
              key={article.id}
              ref={(el) => {
                articleRefs.current[index] = el
              }}
              className={`group rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 ${getAnimationClass(index)}`}
              style={{
                backgroundColor: cardBackgroundColor,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: hoveredCard === index ? cardHoverBorderColor : cardBorderColor,
                transitionDelay: `${index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <Link
                href={article.url || "#"}
                className="block"
                {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={article.image || "/placeholder.svg?height=300&width=400"}
                    alt={article.title || "Article image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 backdrop-blur-sm text-xs font-semibold rounded-full transform transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: categoryBadgeBackground,
                        color: categoryBadgeText,
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div
                    className="flex items-center gap-1 transition-colors duration-300"
                    style={{ color: hoveredCard === index ? metaHoverColor : metaColor }}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div
                    className="flex items-center gap-1 transition-colors duration-300"
                    style={{ color: hoveredCard === index ? metaHoverColor : metaColor }}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <Link
                  href={article.url || "#"}
                  {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <h3
                    className="text-xl lg:text-2xl font-bold mb-3 leading-tight transition-colors duration-300 cursor-pointer"
                    style={{ color: hoveredCard === index ? titleHoverColor : titleTextColor }}
                  >
                    {article.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p
                  className="leading-relaxed mb-6 line-clamp-3 transition-colors duration-300"
                  style={{ color: excerptColor }}
                >
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center justify-between">
                  <Link
                    href={article.url || "#"}
                    {...(isExternalUrl(article.url || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-200 group/btn transform hover:translate-x-1"
                    style={{ color: hoveredReadMore === index ? readMoreHoverColor : readMoreColor }}
                    onMouseEnter={() => setHoveredReadMore(index)}
                    onMouseLeave={() => setHoveredReadMore(null)}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>

                  <div
                    className="w-12 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${buttonGradientFrom}, ${buttonGradientTo})`,
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <Link
              href={viewAllUrl || "/articles"}
              {...(isExternalUrl(viewAllUrl || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              style={{
                color: viewAllButtonTextColor,
                backgroundColor: hoveredButton ? viewAllButtonHoverBackgroundColor : viewAllButtonBackgroundColor,
              }}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
