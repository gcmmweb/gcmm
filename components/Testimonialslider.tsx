"use client"

import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  title?: string
  organization?: string
  location?: string
  // NEW: each testimony can carry its own "read more" destination.
  // Leave this blank in the CMS for any testimony that has no full story yet —
  // the button simply won't render on that slide.
  readMoreUrl?: string
}

interface TestimonialSliderProps {
  // Content
  testimonials?: Testimonial[]

  // Visibility
  showAttribution?: boolean
  showQuoteIcon?: boolean
  showName?: boolean
  showTitle?: boolean
  showOrganization?: boolean
  showLocation?: boolean

  // Styling
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  arrowColor?: string
  quoteIconColor?: string
  
  // Individual Element Colors
  nameColor?: string
  titleColor?: string
  organizationColor?: string
  locationColor?: string
  locationBadgeColor?: string

  // Typography - Quote
  quoteFontSize?: string
  quoteLineHeight?: string
  quoteFontWeight?: "normal" | "bold"
  quoteFontStyle?: "normal" | "italic"
  quoteFont?: string

  // Typography - Attribution
  nameFontSize?: string
  nameLineHeight?: string
  nameFontWeight?: "normal" | "bold"
  nameFontStyle?: "normal" | "italic"

  titleFontSize?: string
  titleLineHeight?: string
  titleFontWeight?: "normal" | "bold"
  titleFontStyle?: "normal" | "italic"

  organizationFontSize?: string
  organizationLineHeight?: string
  organizationFontWeight?: "normal" | "bold"
  organizationFontStyle?: "normal" | "italic"

  locationFontSize?: string
  locationLineHeight?: string
  locationFontWeight?: "normal" | "bold"
  locationFontStyle?: "normal" | "italic"

  // Layout
  alignment?: "left" | "center" | "right"
  maxWidth?: string
  mobileMaxWidth?: string
  padding?: string
  mobilePadding?: string
  
  // Navigation
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number

  // Read More Button
  // NOTE: showReadMore is now a MASTER on/off switch for the whole component.
  // The actual per-slide visibility is controlled by whether that testimony
  // has a readMoreUrl set (see Testimonial interface above).
  showReadMore?: boolean
  readMoreText?: string
  readMoreOpenInNewTab?: boolean
  readMoreFontSize?: string
  readMoreFontWeight?: "normal" | "bold"
  readMoreBackgroundColor?: string
  readMoreTextColor?: string
  readMoreHoverBackgroundColor?: string
  readMoreHoverTextColor?: string

  className?: string
}

export function TestimonialSlider({
  // Content
  testimonials = [
    {
      quote: "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
      name: "Sarah Chen",
      title: "Ministry Leader",
      organization: "Hope Church International",
      location: "Singapore",
      readMoreUrl: "",
    },
    {
      quote: "The impact of their work is truly remarkable. We've reached thousands of people who might never have heard our message otherwise.",
      name: "John Smith",
      title: "Pastor",
      organization: "Community Church",
      location: "United States",
      readMoreUrl: "",
    },
    {
      quote: "Working with GCM has been a game-changer for our ministry. Their expertise in digital media is unmatched.",
      name: "Maria Garcia",
      title: "Communications Director",
      organization: "Faith Ministry",
      location: "Spain",
      readMoreUrl: "",
    },
  ],

  // Visibility
  showAttribution = true,
  showQuoteIcon = true,
  showName = true,
  showTitle = true,
  showOrganization = true,
  showLocation = true,

  // Styling
  backgroundColor = "transparent",
  textColor = "#1e293b",
  accentColor = "#1F2D55",
  arrowColor = "#1F2D55",
  quoteIconColor = "#1F2D55",
  
  // Individual Element Colors
  nameColor = "#1F2D55",
  titleColor = "#1e293b",
  organizationColor = "#64748b",
  locationColor = "#ffffff",
  locationBadgeColor = "#1F2D55",

  // Typography - Quote
  quoteFontSize = "1.25rem",
  quoteLineHeight = "1.8",
  quoteFontWeight = "normal",
  quoteFontStyle = "normal",
  quoteFont = "font-sans",

  // Typography - Attribution
  nameFontSize = "1.125rem",
  nameLineHeight = "1.4",
  nameFontWeight = "bold",
  nameFontStyle = "normal",

  titleFontSize = "1rem",
  titleLineHeight = "1.5",
  titleFontWeight = "normal",
  titleFontStyle = "normal",

  organizationFontSize = "1rem",
  organizationLineHeight = "1.5",
  organizationFontWeight = "normal",
  organizationFontStyle = "normal",

  locationFontSize = "0.875rem",
  locationLineHeight = "1.5",
  locationFontWeight = "normal",
  locationFontStyle = "normal",

  // Layout
  alignment = "left",
  maxWidth = "900px",
  mobileMaxWidth = "100%",
  padding = "3rem 1.5rem",
  mobilePadding = "2rem 0.5rem",
  
  // Navigation
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,

  // Read More Button (master switch + shared styling only — URL now lives per-testimony)
  showReadMore = false,
  readMoreText = "Read More",
  readMoreOpenInNewTab = false,
  readMoreFontSize = "1rem",
  readMoreFontWeight = "normal",
  readMoreBackgroundColor = "#1F2D55",
  readMoreTextColor = "#ffffff",
  readMoreHoverBackgroundColor = "#0A6C93",
  readMoreHoverTextColor = "#ffffff",

  className = "",
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-play functionality
  useState(() => {
    if (autoPlay && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  })

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const getButtonAlignment = () => {
    switch (alignment) {
      case "left":
        return "flex-start"
      case "center":
        return "center"
      case "right":
        return "flex-end"
      default:
        return "flex-start"
    }
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  // Per-slide check: only render the button if this specific testimony has a URL
  const currentReadMoreUrl = currentTestimonial.readMoreUrl?.trim()
  const canShowReadMore = showReadMore && !!currentReadMoreUrl

  return (
    <div
      className={`relative ${className}`}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .testimonial-outer-wrapper {
            background-color: ${backgroundColor};
            padding: ${padding};
          }
          .testimonial-content-wrapper {
            max-width: ${maxWidth};
          }
          .testimonial-flex-container {
            gap: 1.5rem;
          }
          .testimonial-arrow {
            padding: 0.5rem;
          }
          .testimonial-arrow svg {
            width: 2rem;
            height: 2rem;
          }
          @media (max-width: 768px) {
            .testimonial-outer-wrapper {
              padding: ${mobilePadding};
            }
            .testimonial-content-wrapper {
              max-width: ${mobileMaxWidth};
            }
            .testimonial-flex-container {
              gap: 0.5rem;
            }
            .testimonial-arrow {
              padding: 0.25rem;
            }
            .testimonial-arrow svg {
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        `
      }} />
      <div className="testimonial-outer-wrapper">
      <div
        className={`mx-auto testimonial-content-wrapper ${getAlignmentClass()}`}
      >
        <div className="flex items-center testimonial-flex-container">
          {/* Left Arrow */}
          {showArrows && testimonials.length > 1 && (
            <button
              onClick={goToPrevious}
              className="flex-shrink-0 testimonial-arrow rounded-full transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                color: arrowColor,
                focusRingColor: arrowColor,
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {showQuoteIcon && (
              <Quote
                className="w-12 h-12 mb-4 opacity-40"
                style={{ 
                  color: quoteIconColor,
                  margin: alignment === "center" ? "0 auto 1rem" : alignment === "right" ? "0 0 1rem auto" : "0 0 1rem 0"
                }}
              />
            )}

            {/* Location Badge */}
            {showLocation && currentTestimonial.location && (
              <div 
                className="inline-block px-4 py-1 rounded-full mb-4 font-semibold text-sm"
                style={{ 
                  backgroundColor: locationBadgeColor,
                  color: locationColor,
                }}
              >
                {currentTestimonial.location}
              </div>
            )}

            <blockquote
              className={`${quoteFont} mb-6`}
              style={{
                fontSize: quoteFontSize,
                lineHeight: quoteLineHeight,
                fontWeight: quoteFontWeight,
                fontStyle: quoteFontStyle,
                color: textColor,
              }}
            >
              {currentTestimonial.quote}
            </blockquote>

            {showAttribution && (
              <div className="space-y-1">
                {showName && currentTestimonial.name && (
                  <div
                    style={{
                      fontSize: nameFontSize,
                      lineHeight: nameLineHeight,
                      fontWeight: nameFontWeight,
                      fontStyle: nameFontStyle,
                      color: nameColor,
                    }}
                  >
                    {currentTestimonial.name}
                  </div>
                )}

                {showTitle && currentTestimonial.title && (
                  <div
                    style={{
                      fontSize: titleFontSize,
                      lineHeight: titleLineHeight,
                      fontWeight: titleFontWeight,
                      fontStyle: titleFontStyle,
                      color: titleColor,
                    }}
                  >
                    {currentTestimonial.title}
                  </div>
                )}

                {showOrganization && currentTestimonial.organization && (
                  <div
                    style={{
                      fontSize: organizationFontSize,
                      lineHeight: organizationLineHeight,
                      fontWeight: organizationFontWeight,
                      fontStyle: organizationFontStyle,
                      color: organizationColor,
                    }}
                  >
                    {currentTestimonial.organization}
                  </div>
                )}
              </div>
            )}

            {/* Read More Button — only appears when THIS testimony has a URL */}
            {canShowReadMore && (
              <div 
                className="mt-6"
                style={{ 
                  display: 'flex',
                  justifyContent: getButtonAlignment()
                }}
              >
                <a
                  href={currentReadMoreUrl}
                  target={readMoreOpenInNewTab ? "_blank" : undefined}
                  rel={readMoreOpenInNewTab ? "noopener noreferrer" : undefined}
                  className="inline-block px-6 py-3 rounded-lg transition-all duration-200"
                  style={{
                    fontSize: readMoreFontSize,
                    fontWeight: readMoreFontWeight,
                    backgroundColor: isHovering ? readMoreHoverBackgroundColor : readMoreBackgroundColor,
                    color: isHovering ? readMoreHoverTextColor : readMoreTextColor,
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {readMoreText}
                </a>
              </div>
            )}

            {/* Dots Navigation */}
            {showDots && testimonials.length > 1 && (
              <div className="flex gap-2 mt-8" style={{ justifyContent: alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start" }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="w-2 h-2 rounded-full transition-all focus:outline-none"
                    style={{
                      backgroundColor: index === currentIndex ? accentColor : textColor,
                      opacity: index === currentIndex ? 1 : 0.3,
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {showArrows && testimonials.length > 1 && (
            <button
              onClick={goToNext}
              className="flex-shrink-0 testimonial-arrow rounded-full transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                color: arrowColor,
                focusRingColor: arrowColor,
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
