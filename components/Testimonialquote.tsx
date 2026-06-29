import { Quote } from 'lucide-react'

interface TestimonialQuoteProps {
  // Content
  quote?: string
  name?: string
  title?: string
  organization?: string
  location?: string

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
  
  // Individual Element Colors
  nameColor?: string
  titleColor?: string
  organizationColor?: string
  locationColor?: string

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
  padding?: string

  className?: string
}

export function TestimonialQuote({
  // Content
  quote = "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
  name = "Sarah Chen",
  title = "Ministry Leader",
  organization = "Hope Church International",
  location = "Singapore",

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
  accentColor = "#fbbf24",
  
  // Individual Element Colors
  nameColor = "#1e293b",
  titleColor = "#fbbf24",
  organizationColor = "#64748b",
  locationColor = "#94a3b8",

  // Typography - Quote
  quoteFontSize = "1.125rem",
  quoteLineHeight = "1.8",
  quoteFontWeight = "normal",
  quoteFontStyle = "italic",
  quoteFont = "font-serif",

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
  maxWidth = "800px",
  padding = "3rem 1.5rem",

  className = "",
}: TestimonialQuoteProps) {
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

  return (
    <div
      className={`${className}`}
      style={{
        backgroundColor,
        padding,
      }}
    >
      <div
        className={`mx-auto ${getAlignmentClass()}`}
        style={{ maxWidth }}
      >
        {showQuoteIcon && (
          <Quote
            className="w-10 h-10 mb-4 opacity-40"
            style={{ 
              color: accentColor,
              margin: alignment === "center" ? "0 auto 1rem" : alignment === "right" ? "0 0 1rem auto" : "0 0 1rem 0"
            }}
          />
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
          "{quote}"
        </blockquote>

        {showAttribution && (
          <div className="space-y-1">
            {showName && name && (
              <div
                style={{
                  fontSize: nameFontSize,
                  lineHeight: nameLineHeight,
                  fontWeight: nameFontWeight,
                  fontStyle: nameFontStyle,
                  color: nameColor,
                }}
              >
                {name}
              </div>
            )}

            {showTitle && title && (
              <div
                style={{
                  fontSize: titleFontSize,
                  lineHeight: titleLineHeight,
                  fontWeight: titleFontWeight,
                  fontStyle: titleFontStyle,
                  color: titleColor,
                }}
              >
                {title}
              </div>
            )}

            {showOrganization && organization && (
              <div
                style={{
                  fontSize: organizationFontSize,
                  lineHeight: organizationLineHeight,
                  fontWeight: organizationFontWeight,
                  fontStyle: organizationFontStyle,
                  color: organizationColor,
                }}
              >
                {organization}
              </div>
            )}

            {showLocation && location && (
              <div
                style={{
                  fontSize: locationFontSize,
                  lineHeight: locationLineHeight,
                  fontWeight: locationFontWeight,
                  fontStyle: locationFontStyle,
                  color: locationColor,
                }}
              >
                {location}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TestimonialQuote