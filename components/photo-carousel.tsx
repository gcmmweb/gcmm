"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  image: string
  alt: string
  caption?: string
}

export function PhotoCarousel({
  className,
  photos = [
    {
      image: "/placeholder.svg?height=400&width=600",
      alt: "Photo 1",
      caption: "Beautiful landscape",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      alt: "Photo 2",
      caption: "City skyline",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      alt: "Photo 3",
      caption: "Mountain view",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      alt: "Photo 4",
      caption: "Ocean sunset",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      alt: "Photo 5",
      caption: "Forest path",
    },
  ],
  photosPerView = 3,
  photoWidth = "400px",
  photoHeight = "300px",
  gap = "24px",
  backgroundColor = "#ffffff",
  arrowColor = "#1f2937",
  arrowHoverColor = "#374151",
  arrowBackgroundColor = "#ffffff",
  arrowBackgroundHoverColor = "#f3f4f6",
  captionColor = "#1f2937",
  captionBackgroundColor = "rgba(255, 255, 255, 0.9)",
  showCaptions = true,
  autoplay = false,
  autoplayInterval = 3000,
  borderRadius = "12px",
  sectionPaddingY = "80px",
  sectionPaddingX = "40px",
  arrowSize = "48px",
  arrowIconSize = "24px",
}: {
  className?: string
  photos?: Photo[]
  photosPerView?: number
  photoWidth?: string
  photoHeight?: string
  gap?: string
  backgroundColor?: string
  arrowColor?: string
  arrowHoverColor?: string
  arrowBackgroundColor?: string
  arrowBackgroundHoverColor?: string
  captionColor?: string
  captionBackgroundColor?: string
  showCaptions?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  borderRadius?: string
  sectionPaddingY?: string
  sectionPaddingX?: string
  arrowSize?: string
  arrowIconSize?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLeftHovered, setIsLeftHovered] = useState(false)
  const [isRightHovered, setIsRightHovered] = useState(false)
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number | null>(null)
  const [actualPhotosPerView, setActualPhotosPerView] = useState(photosPerView)
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)

  // Responsive photos per view based on screen size
  useEffect(() => {
    const updatePhotosPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          // Mobile: 1 photo, and width should fill available space
          setActualPhotosPerView(1)
          setIsNarrowScreen(true)
        } else if (window.innerWidth < 1024) {
          // Tablet: 2 photos
          setActualPhotosPerView(Math.min(2, photosPerView))
          setIsNarrowScreen(false)
        } else {
          // Desktop: use prop value, always respect Photo Width setting
          setActualPhotosPerView(photosPerView)
          setIsNarrowScreen(false)
        }
      }
    }

    updatePhotosPerView()
    window.addEventListener('resize', updatePhotosPerView)
    return () => window.removeEventListener('resize', updatePhotosPerView)
  }, [photosPerView])

  const maxIndex = Math.max(0, photos.length - actualPhotosPerView)

  useEffect(() => {
    if (!autoplay || photos.length <= actualPhotosPerView) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [autoplay, autoplayInterval, maxIndex, photos.length, actualPhotosPerView])

  // Reset index when photos per view changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [maxIndex, currentIndex])

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const getImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg?height=400&width=600"
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url
    }
    return `/${url}`
  }

  const visiblePhotos = photos.slice(currentIndex, currentIndex + actualPhotosPerView)

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
          maxWidth: "1400px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "16px",
          paddingRight: "16px",
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
              style={{
                position: "absolute",
                left: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: arrowSize,
                height: arrowSize,
                borderRadius: "50%",
                backgroundColor: isLeftHovered ? arrowBackgroundHoverColor : arrowBackgroundColor,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease-out",
                zIndex: 10,
              }}
            >
              <ChevronLeft
                style={{
                  width: arrowIconSize,
                  height: arrowIconSize,
                  color: isLeftHovered ? arrowHoverColor : arrowColor,
                  transition: "color 0.3s ease-out",
                }}
              />
            </button>
          )}

          {/* Photos Container */}
          <div
            style={{
              display: "flex",
              gap: gap,
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.5s ease-out",
              paddingLeft: sectionPaddingX,
              paddingRight: sectionPaddingX,
            }}
          >
            {visiblePhotos.map((photo, index) => {
              const globalIndex = currentIndex + index
              return (
                <div
                  key={globalIndex}
                  onMouseEnter={() => setHoveredPhotoIndex(globalIndex)}
                  onMouseLeave={() => setHoveredPhotoIndex(null)}
                  style={{
                    position: "relative",
                    width: isNarrowScreen ? "100%" : photoWidth,
                    aspectRatio: `${parseInt(photoWidth) || 400} / ${parseInt(photoHeight) || 300}`,
                    flexShrink: 0,
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    boxShadow:
                      hoveredPhotoIndex === globalIndex
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transform: hoveredPhotoIndex === globalIndex ? "scale(1.02)" : "scale(1)",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  <Image
                    src={getImageUrl(photo.image)}
                    alt={photo.alt || `Photo ${globalIndex + 1}`}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                    }}
                  />
                  {showCaptions && photo.caption && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "12px 16px",
                        backgroundColor: captionBackgroundColor,
                        color: captionColor,
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        opacity: hoveredPhotoIndex === globalIndex ? 1 : 0,
                        transform: hoveredPhotoIndex === globalIndex ? "translateY(0)" : "translateY(100%)",
                        transition: "all 0.3s ease-out",
                      }}
                    >
                      {photo.caption}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
              style={{
                position: "absolute",
                right: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: arrowSize,
                height: arrowSize,
                borderRadius: "50%",
                backgroundColor: isRightHovered ? arrowBackgroundHoverColor : arrowBackgroundColor,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease-out",
                zIndex: 10,
              }}
            >
              <ChevronRight
                style={{
                  width: arrowIconSize,
                  height: arrowIconSize,
                  color: isRightHovered ? arrowHoverColor : arrowColor,
                  transition: "color 0.3s ease-out",
                }}
              />
            </button>
          )}
        </div>

        {/* Dots Indicator */}
        {photos.length > actualPhotosPerView && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "32px",
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: currentIndex === index ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: currentIndex === index ? arrowColor : "#d1d5db",
                  cursor: "pointer",
                  transition: "all 0.3s ease-out",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
