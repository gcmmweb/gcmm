"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface MinistryPageProps {
  className?: string
  heroContent?: string | ReactNode
  heroBackgroundColor?: string
  heroBackgroundImage?: string
  heroOverlayColor?: string
  heroOverlayOpacity?: number
  heroHeight?: number
  heroPaddingTop?: number
  heroPaddingBottom?: number
  heroTextAlign?: "left" | "center" | "right"
  pageBackgroundColor?: string
  maxWidth?: number
  fontFamily?: string
}

export function MinistryPage({
  className = "",
  heroContent = "<h1>Youth Ministry</h1><p>Empowering the next generation to live out their faith</p>",
  heroBackgroundColor = "#2c3e50",
  heroBackgroundImage = "/youth-group-gathering-worship.jpg",
  heroOverlayColor = "#000000",
  heroOverlayOpacity = 0.4,
  heroHeight = 500,
  heroPaddingTop = 120,
  heroPaddingBottom = 120,
  heroTextAlign = "center",
  pageBackgroundColor = "#ffffff",
  maxWidth = 1200,
  fontFamily = "system-ui, -apple-system, sans-serif",
}: MinistryPageProps) {
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heroContent = heroContentRef.current
    if (!heroContent) return

    const allElements = heroContent.querySelectorAll("h1, h2, h3, h4, h5, h6, p, img, video, iframe, div")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add("visible")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
    )

    // Observe each element with a staggered delay attribute
    allElements.forEach((el, index) => {
      const element = el as HTMLElement
      element.classList.add("animate-item")
      element.style.setProperty("--delay", `${index * 0.12}s`)
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [heroContent])

  const renderRichText = (content: string | ReactNode | undefined) => {
    if (!content) return null
    if (typeof content === "string") {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }
    return content
  }

  return (
    <div
      className={className}
      style={{
        fontFamily,
        backgroundColor: pageBackgroundColor,
        height: "auto",
        minHeight: "auto",
      }}
    >
      <style>{`
        .hero-content h1 {
          font-size: clamp(28px, 8vw, 64px);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 24px 0;
        }
        .hero-content h2 {
          font-size: clamp(24px, 6vw, 48px);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 20px 0;
        }
        .hero-content h3 {
          font-size: clamp(20px, 5vw, 36px);
          font-weight: 600;
          line-height: 1.3;
          margin: 0 0 16px 0;
        }
        .hero-content h4 {
          font-size: clamp(18px, 4vw, 28px);
          font-weight: 600;
          line-height: 1.3;
          margin: 0 0 14px 0;
        }
        .hero-content h5 {
          font-size: clamp(16px, 3.5vw, 22px);
          font-weight: 500;
          line-height: 1.4;
          margin: 0 0 12px 0;
        }
        .hero-content h6 {
          font-size: clamp(14px, 3vw, 18px);
          font-weight: 500;
          line-height: 1.4;
          margin: 0 0 10px 0;
        }
        .hero-content p {
          font-size: clamp(16px, 3vw, 20px);
          line-height: 1.6;
          margin: 0 0 16px 0;
          opacity: 0.9;
        }
        .hero-content *:last-child {
          margin-bottom: 0;
        }
        
        /* Fix embedded videos/iframes overflowing on mobile */
        .hero-content iframe,
        .hero-content video,
        .hero-content embed,
        .hero-content object {
          max-width: 100%;
          height: auto;
        }
        
        /* Responsive wrapper for video embeds */
        .hero-content div[style*="padding-bottom"] {
          max-width: 100%;
        }
        
        /* Individual element animations - no flash, starts in place */
        .hero-content .animate-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
          transition-delay: var(--delay, 0s);
        }
        
        .hero-content .animate-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Images and videos get a subtle scale effect */
        .hero-content img.animate-item,
        .hero-content video.animate-item,
        .hero-content iframe.animate-item {
          transform: translateY(30px) scale(0.98);
        }
        
        .hero-content img.animate-item.visible,
        .hero-content video.animate-item.visible,
        .hero-content iframe.animate-item.visible {
          transform: translateY(0) scale(1);
        }
      `}</style>

      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          minHeight: `${heroHeight}px`,
          backgroundColor: heroBackgroundColor,
          backgroundImage: heroBackgroundImage ? `url(${heroBackgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        {heroBackgroundImage && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: heroOverlayColor,
              opacity: heroOverlayOpacity,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Hero Content */}
        <div
          ref={heroContentRef}
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: heroTextAlign,
            maxWidth: `${maxWidth}px`,
            width: "100%",
            paddingTop: `${heroPaddingTop}px`,
            paddingBottom: `${heroPaddingBottom}px`,
            paddingLeft: "20px",
            paddingRight: "20px",
            color: "#ffffff",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {renderRichText(heroContent)}
        </div>
      </div>
    </div>
  )
}
