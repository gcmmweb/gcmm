import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  // Content
  name?: string
  title?: string
  organization?: string
  location?: string
  quote?: string
  statistic?: string
  statisticLabel?: string

  // Styling
  backgroundColor?: string
  cardBackgroundColor?: string
  cardTextColor?: string
  accentColor?: string
  borderColor?: string
  
  // Card Detail Colors
  nameColor?: string
  titleColor?: string
  organizationColor?: string
  locationColor?: string

  // Typography
  bodyFont?: string
  headerFont?: string
  nameFont?: string
  bodyFontSize?: number
  cardTitleFontSize?: number
  statValueFontSize?: number
  statLabelFontSize?: number

  // Visual Elements
  showQuoteIcon?: boolean
  showStatistic?: boolean
  cardStyle?: "minimal" | "bordered" | "shadow" | "elevated"

  // Animation
  enableHover?: boolean

  // Layout
  maxWidth?: string
  centered?: boolean

  className?: string
}

// Font family mapping
const fontFamilyMap: { [key: string]: string } = {
  "sans": "ui-sans-serif, system-ui, sans-serif",
  "serif": "ui-serif, Georgia, serif",
  "mono": "ui-monospace, monospace",
  "inter": "'Inter', sans-serif",
  "roboto": "'Roboto', sans-serif",
  "open-sans": "'Open Sans', sans-serif",
  "lato": "'Lato', sans-serif",
  "montserrat": "'Montserrat', sans-serif",
  "playfair": "'Playfair Display', serif",
  "merriweather": "'Merriweather', serif",
  "poppins": "'Poppins', sans-serif",
}

export function TestimonialCard({
  name = "Sarah Chen",
  title = "Ministry Leader",
  organization = "Hope Church International",
  location = "Singapore",
  quote = "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
  statistic = "300%",
  statisticLabel = "increase in engagement",

  backgroundColor = "transparent",
  cardBackgroundColor = "#1e293b",
  cardTextColor = "#f1f5f9",
  accentColor = "#fbbf24",
  borderColor = "#334155",
  
  // Card detail colors
  nameColor = "#ffffff",
  titleColor = "#fbbf24",
  organizationColor = "#94a3b8",
  locationColor = "#64748b",

  bodyFont = "sans",
  headerFont = "sans",
  nameFont = "sans",
  bodyFontSize = 16,
  cardTitleFontSize = 18,
  statValueFontSize = 36,
  statLabelFontSize = 14,

  showQuoteIcon = true,
  showStatistic = true,
  cardStyle = "elevated",

  enableHover = true,

  maxWidth = "600px",
  centered = true,

  className = "",
}: TestimonialCardProps) {
  const getCardStyleClasses = () => {
    switch (cardStyle) {
      case "minimal":
        return ""
      case "bordered":
        return "border"
      case "shadow":
        return "shadow-lg"
      case "elevated":
        return "shadow-xl border"
      default:
        return "shadow-xl border"
    }
  }

  const getFontFamily = (font: string) => {
    return fontFamilyMap[font] || fontFamilyMap["sans"]
  }

  return (
    <div 
      className={`py-8 ${className}`} 
      style={{ backgroundColor }}
    >
      <div 
        className={`${centered ? 'mx-auto' : ''}`}
        style={{ maxWidth }}
      >
        <div
          className={`
            ${getCardStyleClasses()}
            ${enableHover ? "hover:scale-105 transition-all duration-300" : ""}
            p-6 flex flex-col rounded-lg
          `}
          style={{ 
            backgroundColor: cardBackgroundColor,
            color: cardTextColor,
            borderColor: borderColor,
          }}
        >
          {showQuoteIcon && (
            <Quote 
              className="w-8 h-8 mb-4 opacity-60" 
              style={{ color: accentColor }} 
            />
          )}

          <div 
            className="mb-6 leading-relaxed" 
            style={{ 
              fontSize: `${bodyFontSize}px`,
              fontFamily: getFontFamily(bodyFont),
            }}
          >
            "{quote}"
          </div>

          {showStatistic && statistic && (
            <div 
              className="mb-4 p-4 rounded-lg" 
              style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
            >
              <div 
                className="font-bold" 
                style={{ fontSize: `${statValueFontSize}px`, color: accentColor }}
              >
                {statistic}
              </div>
              <div 
                style={{ fontSize: `${statLabelFontSize}px`, color: '#94a3b8' }}
              >
                {statisticLabel}
              </div>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div 
                className="font-semibold" 
                style={{ 
                  fontSize: `${cardTitleFontSize}px`,
                  color: nameColor,
                  fontFamily: getFontFamily(nameFont),
                }}
              >
                {name}
              </div>
              <div 
                className="font-medium" 
                style={{ 
                  fontSize: `${statLabelFontSize}px`, 
                  color: titleColor,
                }}
              >
                {title}
              </div>
              <div 
                style={{ 
                  fontSize: `${statLabelFontSize}px`, 
                  color: organizationColor,
                }}
              >
                {organization}
              </div>
              <div 
                className="mt-1" 
                style={{ 
                  fontSize: `${statLabelFontSize - 2}px`, 
                  color: locationColor,
                }}
              >
                {location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}