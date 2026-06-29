"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PhotoOverlay({
  className,
  backgroundImage = "/placeholder.svg?height=600&width=1200",
  title = "Discover Our Mission",
  subtitle = "Making a Difference",
  description = "Join us in our journey to create positive change in communities around the world through faith, service, and compassion.",
  buttonText = "Learn More",
  buttonUrl = "#",
  showButton = true,
  
  // Layout
  contentAlignment = "center",
  contentVerticalAlignment = "center",
  maxContentWidth = "800px",
  minHeight = "500px",
  paddingX = "24px",
  paddingY = "80px",
  
  // Gradient Overlay
  gradientType = "linear",
  gradientDirection = "to bottom",
  gradientColor1 = "rgba(0, 0, 0, 0.7)",
  gradientColor2 = "rgba(0, 0, 0, 0.3)",
  gradientOpacity = 1,
  
  // Background Image Settings
  backgroundPosition = "center",
  backgroundSize = "cover",
  imageOverlayColor = "rgba(0, 0, 0, 0)",
  
  // Typography
  titleColor = "#ffffff",
  titleFontSize = "3rem",
  titleFontWeight = "bold",
  titleFontFamily = "inherit",
  titleMarginBottom = "16px",
  subtitleColor = "#f3f4f6",
  subtitleFontSize = "1.25rem",
  subtitleFontWeight = "600",
  subtitleFontFamily = "inherit",
  subtitleMarginBottom = "24px",
  descriptionColor = "#e5e7eb",
  descriptionFontSize = "1.125rem",
  descriptionFontWeight = "400",
  descriptionFontFamily = "inherit",
  descriptionLineHeight = "1.75",
  descriptionMarginBottom = "32px",
  
  // Button Styling
  buttonBackground = "#2563eb",
  buttonHoverBackground = "#1d4ed8",
  buttonTextColor = "#ffffff",
  buttonFontFamily = "inherit",
  buttonPaddingX = "32px",
  buttonPaddingY = "14px",
  buttonBorderRadius = "8px",
  buttonFontSize = "1rem",
  buttonFontWeight = "600",
  
  // Animation
  enableParallax = false,
  parallaxSpeed = 0.5,
}: {
  className?: string
  backgroundImage?: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  showButton?: boolean
  
  contentAlignment?: "left" | "center" | "right"
  contentVerticalAlignment?: "top" | "center" | "bottom"
  maxContentWidth?: string
  minHeight?: string
  paddingX?: string
  paddingY?: string
  
  gradientType?: "linear" | "radial" | "none"
  gradientDirection?: string
  gradientColor1?: string
  gradientColor2?: string
  gradientOpacity?: number
  
  backgroundPosition?: string
  backgroundSize?: string
  imageOverlayColor?: string
  
  titleColor?: string
  titleFontSize?: string
  titleFontWeight?: string
  titleFontFamily?: string
  titleMarginBottom?: string
  subtitleColor?: string
  subtitleFontSize?: string
  subtitleFontWeight?: string
  subtitleFontFamily?: string
  subtitleMarginBottom?: string
  descriptionColor?: string
  descriptionFontSize?: string
  descriptionFontWeight?: string
  descriptionFontFamily?: string
  descriptionLineHeight?: string
  descriptionMarginBottom?: string
  
  buttonBackground?: string
  buttonHoverBackground?: string
  buttonTextColor?: string
  buttonFontFamily?: string
  buttonPaddingX?: string
  buttonPaddingY?: string
  buttonBorderRadius?: string
  buttonFontSize?: string
  buttonFontWeight?: string
  
  enableParallax?: boolean
  parallaxSpeed?: number
}) {
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const getImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg?height=600&width=1200"
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      return url
    }
    return `/${url}`
  }

  const getGradient = () => {
    if (gradientType === "none") return "none"
    
    if (gradientType === "radial") {
      return `radial-gradient(circle, ${gradientColor1}, ${gradientColor2})`
    }
    
    return `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`
  }

  const getContentJustification = () => {
    switch (contentAlignment) {
      case "left": return "flex-start"
      case "right": return "flex-end"
      default: return "center"
    }
  }

  const getVerticalAlignment = () => {
    switch (contentVerticalAlignment) {
      case "top": return "flex-start"
      case "bottom": return "flex-end"
      default: return "center"
    }
  }

  const getTextAlign = () => {
    return contentAlignment
  }

  const isExternalUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")
  }

  return (
    <section
      className={`photo-overlay-section ${className || ""}`}
      style={{
        position: "relative",
        width: "100%",
        minHeight: minHeight,
        overflow: "hidden",
        display: "flex",
        alignItems: getVerticalAlignment(),
        justifyContent: getContentJustification(),
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          transform: enableParallax ? `translateY(${scrollY * parallaxSpeed}px)` : "none",
          transition: enableParallax ? "none" : "transform 0.3s ease-out",
        }}
      >
        <Image
          src={getImageUrl(backgroundImage)}
          alt={title || "Background"}
          fill
          style={{
            objectFit: backgroundSize as any,
            objectPosition: backgroundPosition,
          }}
          priority
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=600&width=1200"
          }}
        />
      </div>

      {/* Image Overlay */}
      {imageOverlayColor !== "rgba(0, 0, 0, 0)" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: imageOverlayColor,
            zIndex: 1,
          }}
        />
      )}

      {/* Gradient Overlay */}
      {gradientType !== "none" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: getGradient(),
            opacity: gradientOpacity,
            zIndex: 2,
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: maxContentWidth,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          textAlign: getTextAlign() as any,
          marginLeft: contentAlignment === "left" ? "0" : contentAlignment === "right" ? "auto" : "auto",
          marginRight: contentAlignment === "left" ? "auto" : contentAlignment === "right" ? "0" : "auto",
        }}
        className="photo-overlay-content"
      >
        {subtitle && (
          <p
            style={{
              fontSize: subtitleFontSize,
              fontWeight: subtitleFontWeight,
              fontFamily: subtitleFontFamily,
              color: subtitleColor,
              marginBottom: subtitleMarginBottom,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {subtitle}
          </p>
        )}

        {title && (
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: titleFontWeight,
              fontFamily: titleFontFamily,
              color: titleColor,
              marginBottom: titleMarginBottom,
              lineHeight: "1.2",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            {title}
          </h1>
        )}

        {description && (
          <p
            style={{
              fontSize: descriptionFontSize,
              fontWeight: descriptionFontWeight,
              fontFamily: descriptionFontFamily,
              color: descriptionColor,
              lineHeight: descriptionLineHeight,
              marginBottom: descriptionMarginBottom,
            }}
          >
            {description}
          </p>
        )}

        {showButton && buttonText && (
          <Link
            href={buttonUrl || "#"}
            {...(isExternalUrl(buttonUrl || "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              paddingLeft: buttonPaddingX,
              paddingRight: buttonPaddingX,
              paddingTop: buttonPaddingY,
              paddingBottom: buttonPaddingY,
              backgroundColor: isButtonHovered ? buttonHoverBackground : buttonBackground,
              color: buttonTextColor,
              fontSize: buttonFontSize,
              fontWeight: buttonFontWeight,
              fontFamily: buttonFontFamily,
              borderRadius: buttonBorderRadius,
              textDecoration: "none",
              cursor: "pointer",
              transform: isButtonHovered ? "translateY(-2px)" : "translateY(0)",
              boxShadow: isButtonHovered
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-out",
            }}
          >
            <span>{buttonText}</span>
            <ArrowRight
              style={{
                width: "20px",
                height: "20px",
                transform: isButtonHovered ? "translateX(4px)" : "translateX(0)",
                transition: "transform 0.3s ease-out",
              }}
            />
          </Link>
        )}
      </div>

      <style>{`
        .photo-overlay-content {
          box-sizing: border-box;
        }
        
        .photo-overlay-section {
          min-height: ${minHeight};
        }
        
        /* Tablet and below */
        @media (max-width: 768px) {
          .photo-overlay-section {
            min-height: 450px !important;
          }
          
          .photo-overlay-content {
            padding-left: max(16px, 5vw) !important;
            padding-right: max(16px, 5vw) !important;
            padding-top: max(40px, 8vw) !important;
            padding-bottom: max(40px, 8vw) !important;
          }
          
          h1 {
            font-size: clamp(1.5rem, 5vw, calc(${titleFontSize} * 0.6)) !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          
          p {
            font-size: calc(${descriptionFontSize} * 0.9) !important;
          }
        }
        
        /* Mobile landscape and smaller tablets */
        @media (max-width: 640px) {
          .photo-overlay-section {
            min-height: 400px !important;
          }
          
          h1 {
            font-size: clamp(1.25rem, 6vw, calc(${titleFontSize} * 0.5)) !important;
            line-height: 1.15 !important;
          }
          
          p {
            font-size: calc(${descriptionFontSize} * 0.85) !important;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 480px) {
          .photo-overlay-section {
            min-height: 350px !important;
          }
          
          .photo-overlay-content {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
          
          h1 {
            font-size: clamp(1.125rem, 7vw, calc(${titleFontSize} * 0.45)) !important;
            line-height: 1.1 !important;
          }
          
          p {
            font-size: calc(${descriptionFontSize} * 0.8) !important;
          }
        }
      `}</style>
    </section>
  )
}