"use client"

import { useEffect, useRef, useState } from "react"

export function MinistryVideo({
  className,
  backgroundColor = "#1a2332",
  headingColor = "#ffffff",
  subheadingColor = "#e2e8f0",
  heading = "See Our Ministry in Action",
  subheading = "Watch how we are reaching communities around the world",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  maxWidth = "800px",
  headingFontSize = "3rem",
  subheadingFontSize = "1.25rem",
  headingFontFamily = "inherit",
  subheadingFontFamily = "inherit",
  sectionPaddingTop = 80,
  sectionPaddingBottom = 80,
  sectionMarginTop = 0,
  sectionMarginBottom = 0,
}: {
  className?: string
  backgroundColor?: string
  headingColor?: string
  subheadingColor?: string
  heading?: string
  subheading?: string
  videoUrl?: string
  maxWidth?: string
  headingFontSize?: string
  subheadingFontSize?: string
  headingFontFamily?: string
  subheadingFontFamily?: string
  sectionPaddingTop?: number
  sectionPaddingBottom?: number
  sectionMarginTop?: number
  sectionMarginBottom?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={className || ""}
      style={{
        backgroundColor,
        paddingTop: sectionPaddingTop,
        paddingBottom: sectionPaddingBottom,
        marginTop: sectionMarginTop,
        marginBottom: sectionMarginBottom,
      }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto" style={{ maxWidth }}>
          {/* Heading */}
          <div className="text-center mb-12">
            <h2
              className={`font-light mb-6 leading-tight tracking-tight transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                color: headingColor,
                fontSize: headingFontSize,
                fontFamily: headingFontFamily,
              }}
            >
              {heading}
            </h2>

            <p
              className={`font-light leading-relaxed transition-all duration-1000 delay-200 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                color: subheadingColor,
                fontSize: subheadingFontSize,
                fontFamily: subheadingFontFamily,
              }}
            >
              {subheading}
            </p>
          </div>

          {/* Video Player */}
          <div
            className={`transition-all duration-1200 delay-400 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={videoUrl}
                title={heading}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}