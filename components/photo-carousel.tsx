"use client"

import { Fragment, useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ContentSection } from "@/components/ContentSection"

// The text-style choices come straight from the Content Section, so they always match it.
type HeaderStyle = React.ComponentProps<typeof ContentSection>

interface Photo {
  image: string
  alt: string
  caption?: string
}

// Fisher-Yates shuffle (returns a new array, never changes the original).
function shuffled<T>(list: T[]): T[] {
  const a = list.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

// "Swipe row" style: photos sit in a row you can swipe or scroll (each photo snaps into place),
// the next photo peeks in, captions are always shown under the photo, and the arrows and dots
// are big enough to tap. Used when Style is set to "Swipe row".
type SwipeRowProps = {
  className?: string
  photos: Photo[]
  photoWidth: string
  photoHeight: string
  gap: string
  backgroundColor: string
  arrowColor: string
  arrowHoverColor: string
  arrowBackgroundColor: string
  arrowBackgroundHoverColor: string
  captionColor: string
  captionBackgroundColor: string
  captionPlacement: "below" | "hover"
  showCaptions: boolean
  borderRadius: string
  sectionPaddingY: string
  sectionPaddingTop?: string
  alignWithHeader?: boolean
  sectionPaddingX: string
  arrowSize: string
  arrowIconSize: string
  getImageUrl: (url: string) => string
}

function SwipeRow({
  className,
  photos,
  photoWidth,
  photoHeight,
  gap,
  backgroundColor,
  arrowColor,
  arrowHoverColor,
  arrowBackgroundColor,
  arrowBackgroundHoverColor,
  captionColor,
  captionBackgroundColor,
  captionPlacement,
  showCaptions,
  borderRadius,
  sectionPaddingY,
  sectionPaddingTop,
  alignWithHeader,
  sectionPaddingX,
  arrowSize,
  arrowIconSize,
  getImageUrl,
}: SwipeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [narrow, setNarrow] = useState(false)
  const [leftHover, setLeftHover] = useState(false)
  const [rightHover, setRightHover] = useState(false)

  // Distance from one photo to the next (photo width + gap), measured from the real page.
  const stepSize = () => {
    const track = trackRef.current
    const first = track ? (track.children[0] as HTMLElement | undefined) : undefined
    if (!track || !first) return 0
    const g = parseFloat(window.getComputedStyle(track).columnGap) || 0
    return first.offsetWidth + g
  }

  const update = () => {
    const track = trackRef.current
    if (!track) return
    const step = stepSize()
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(end)
    setActive(end ? photos.length - 1 : step > 0 ? Math.min(photos.length - 1, Math.round(track.scrollLeft / step)) : 0)
    setNarrow(window.innerWidth < 640)
  }

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length])

  const scrollBehavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: i * stepSize(), behavior: scrollBehavior() })
  }

  const nudge = (direction: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * stepSize(), behavior: scrollBehavior() })
  }

  // With a heading, the photos use the same page width and side space as the Content Sections,
  // so the first photo starts exactly under the heading text.
  const edge = alignWithHeader ? "clamp(1rem, calc(8vw - 1rem), 6rem)" : sectionPaddingX
  const innerMax = alignWithHeader ? "1280px" : "1400px"
  const ratio = `${parseInt(photoWidth) || 400} / ${parseInt(photoHeight) || 300}`
  // On phones the photo takes 82% of the row so the next photo peeks in.
  const slideWidth = `min(${photoWidth}, 82%)`
  const canScroll = !(atStart && atEnd)

  const arrowStyle = (hovered: boolean, disabled: boolean): React.CSSProperties => ({
    width: arrowSize,
    height: arrowSize,
    minWidth: "44px",
    minHeight: "44px",
    borderRadius: "50%",
    backgroundColor: hovered && !disabled ? arrowBackgroundHoverColor : arrowBackgroundColor,
    border: `2px solid ${arrowColor}`,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.35 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "all 0.3s ease-out",
  })

  return (
    <section
      className={className || ""}
      style={{
        backgroundColor,
        paddingTop: sectionPaddingTop ?? sectionPaddingY,
        paddingBottom: sectionPaddingY,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <style>{`.pc-swipe-track::-webkit-scrollbar{display:none}
.pc-cap-hover{opacity:0;transform:translateY(100%);transition:all .3s ease-out}
.pc-fig:hover .pc-cap-hover,.pc-fig:focus-within .pc-cap-hover{opacity:1;transform:translateY(0)}
.pc-cap-hover-fallback{display:none}
@media (hover:none),(pointer:coarse){.pc-cap-hover{display:none}.pc-cap-hover-fallback{display:block}}`}</style>
      <div style={{ maxWidth: innerMax, marginLeft: "auto", marginRight: "auto" }}>
        <div
          ref={trackRef}
          className="pc-swipe-track"
          onScroll={update}
          tabIndex={0}
          role="region"
          aria-label="Photo carousel"
          style={{
            display: "flex",
            gap,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: edge,
            paddingLeft: edge,
            paddingRight: edge,
            paddingBottom: "8px",
            scrollbarWidth: "none",
          }}
        >
          {photos.map((photo, index) => (
            <figure key={index} className="pc-fig" style={{ margin: 0, flex: "0 0 auto", width: slideWidth, scrollSnapAlign: "start" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: ratio,
                  borderRadius,
                  overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <Image
                  src={getImageUrl(photo.image)}
                  alt={photo.alt || `Photo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 82vw, 400px"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
                {showCaptions && photo.caption && captionPlacement === "hover" ? (
                  <div
                    className="pc-cap-hover"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "12px 16px",
                      backgroundColor: captionBackgroundColor,
                      color: captionColor,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    {photo.caption}
                  </div>
                ) : null}
              </div>
              {showCaptions && photo.caption && captionPlacement !== "hover" ? (
                <figcaption style={{ marginTop: "10px", fontSize: "15px", lineHeight: 1.5, color: captionColor }}>
                  {photo.caption}
                </figcaption>
              ) : null}
              {showCaptions && photo.caption && captionPlacement === "hover" ? (
                <figcaption
                  className="pc-cap-hover-fallback"
                  style={{ marginTop: "10px", fontSize: "15px", lineHeight: 1.5, color: captionColor }}
                >
                  {photo.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>

        {canScroll && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: narrow ? "center" : "space-between",
              marginTop: "16px",
              paddingLeft: edge,
              paddingRight: edge,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: i === active ? "28px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor: i === active ? arrowColor : "#d1d5db",
                      transition: "all 0.3s ease-out",
                    }}
                  />
                </button>
              ))}
            </div>
            {!narrow && (
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  aria-label="Previous photo"
                  onMouseEnter={() => setLeftHover(true)}
                  onMouseLeave={() => setLeftHover(false)}
                  style={arrowStyle(leftHover, atStart)}
                >
                  <ChevronLeft style={{ width: arrowIconSize, height: arrowIconSize, color: leftHover ? arrowHoverColor : arrowColor }} />
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  aria-label="Next photo"
                  onMouseEnter={() => setRightHover(true)}
                  onMouseLeave={() => setRightHover(false)}
                  style={arrowStyle(rightHover, atEnd)}
                >
                  <ChevronRight style={{ width: arrowIconSize, height: arrowIconSize, color: rightHover ? arrowHoverColor : arrowColor }} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export function PhotoCarousel({
  className,
  photos = [],
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
  randomizeOrder = false,
  carouselStyle = "classic",
  captionPlacement = "below",
  eyebrow = "",
  heading = "",
  headingLevel = "h2",
  lead = "",
  body = "",
  headerAlignment = "left",
  headingColor,
  textColor,
  eyebrowColor,
  eyebrowSize = "large",
  headingSize = "large",
  headingWeight = "regular",
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
  // Shuffles the photo order once per page load (browser only).
  // Off by default so existing carousels keep their current order.
  randomizeOrder?: boolean
  // "classic" = arrows and dots, one photo at a time (the default, unchanged).
  // "swipe" = a row you swipe or scroll, with captions under the photos.
  carouselStyle?: "classic" | "swipe"
  // Swipe row only: "below" = under the photo, "hover" = slides up over the photo on hover
  // (phones and tablets show it under the photo instead).
  captionPlacement?: "below" | "hover"
  // Optional heading block above the photos (styled like the Content Section).
  eyebrow?: string
  heading?: string
  headingLevel?: "h1" | "h2" | "h3"
  lead?: string
  body?: string
  headerAlignment?: "left" | "center"
  headingColor?: string
  textColor?: string
  eyebrowColor?: string
  eyebrowSize?: HeaderStyle["eyebrowSize"]
  headingSize?: HeaderStyle["headingSize"]
  headingWeight?: HeaderStyle["headingWeight"]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLeftHovered, setIsLeftHovered] = useState(false)
  const [isRightHovered, setIsRightHovered] = useState(false)
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number | null>(null)
  const [actualPhotosPerView, setActualPhotosPerView] = useState(photosPerView)
  const [isNarrowScreen, setIsNarrowScreen] = useState(false)

  // Display order. Starts as the normal CMS order so the server HTML and the
  // browser's first render match (no hydration mismatch). If Randomize Order
  // is on, it is shuffled once in the browser right after the page loads.
  const [orderedPhotos, setOrderedPhotos] = useState<Photo[]>(photos || [])
  const photosKey = (photos || []).map((p) => p.image).join("|")
  useEffect(() => {
    const list = photos || []
    setOrderedPhotos(randomizeOrder && list.length > 1 ? shuffled(list) : list)
    setCurrentIndex(0)
    // photosKey stands in for photos so a new array object with the same
    // photos does not trigger another shuffle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomizeOrder, photosKey])

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

  // No photos -> render nothing (no empty section, no sample photos).
  // This sits after every hook above, so hook order is unchanged.
  if (!photos || photos.length === 0) return null

  // Optional heading block above the photos. It is the real Content Section (text only), so it
  // looks exactly like the other sections on the page. No text at all = nothing is added.
  const hasHeader = [eyebrow, heading, lead, body].some((v) => typeof v === "string" && v.trim() !== "")
  const HEADER_GAP = "clamp(1.5rem, 3vw, 2.5rem)"
  const header = hasHeader ? (
    <ContentSection
      eyebrow={eyebrow || ""}
      heading={heading || ""}
      headingLevel={headingLevel}
      lead={lead || ""}
      body={body || ""}
      alignment={headerAlignment}
      showImage={false}
      backgroundColor={backgroundColor}
      spaceBottom="none"
      spaceTop="medium"
      contentWidth="wide"
      headingColor={headingColor || undefined}
      textColor={textColor || undefined}
      eyebrowColor={eyebrowColor || undefined}
      eyebrowSize={eyebrowSize}
      headingSize={headingSize}
      headingWeight={headingWeight}
    />
  ) : null
  // With a heading, one full-width box is the root and carries the layout settings from Studio.
  const Root: React.ElementType = hasHeader ? "div" : Fragment
  const rootProps = hasHeader ? { className, style: { width: "100%" } } : {}

  if (carouselStyle === "swipe") {
    return (
      <Root {...rootProps}>
      {header}
      <SwipeRow
        sectionPaddingTop={hasHeader ? HEADER_GAP : undefined}
        alignWithHeader={hasHeader}
        className={hasHeader ? undefined : className}
        photos={orderedPhotos.length > 0 ? orderedPhotos : photos}
        photoWidth={photoWidth}
        photoHeight={photoHeight}
        gap={gap}
        backgroundColor={backgroundColor}
        arrowColor={arrowColor}
        arrowHoverColor={arrowHoverColor}
        arrowBackgroundColor={arrowBackgroundColor}
        arrowBackgroundHoverColor={arrowBackgroundHoverColor}
        captionColor={captionColor}
        captionBackgroundColor={captionBackgroundColor}
        captionPlacement={captionPlacement}
        showCaptions={showCaptions}
        borderRadius={borderRadius}
        sectionPaddingY={sectionPaddingY}
        sectionPaddingX={sectionPaddingX}
        arrowSize={arrowSize}
        arrowIconSize={arrowIconSize}
        getImageUrl={getImageUrl}
      />
      </Root>
    )
  }

  const visiblePhotos = orderedPhotos.slice(currentIndex, currentIndex + actualPhotosPerView)

  return (
    <Root {...rootProps}>
    {header}
    <section
      className={hasHeader ? "" : className || ""}
      style={{
        backgroundColor,
        paddingTop: hasHeader ? HEADER_GAP : sectionPaddingY,
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
                    // Never wider than the box: a full row always fits, so
                    // Item 0 is the first, fully visible photo.
                    width: isNarrowScreen
                      ? "100%"
                      : `min(${photoWidth}, calc((100% - (${gap}) * ${Math.max(actualPhotosPerView - 1, 0)}) / ${Math.max(actualPhotosPerView, 1)}))`,
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
    </Root>
  )
}
