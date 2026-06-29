import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from 'lucide-react'

interface StatItem {
  value: string
  label: string
}

interface TestimonialsProps {
  // Layout Options
  layout?: "grid" | "carousel" | "masonry" | "featured"
  columns?: 1 | 2 | 3 | 4
  showHeader?: boolean
  showStats?: boolean
  showCTA?: boolean

  // Content
  headerTitle?: string
  headerSubtitle?: string
  headerDescription?: string
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonUrl?: string

  stats?: StatItem[]

  // Testimony 1
  showTestimony1?: boolean
  testimony1Name?: string
  testimony1Title?: string
  testimony1Organization?: string
  testimony1Location?: string
  testimony1Quote?: string
  testimony1Statistic?: string
  testimony1StatisticLabel?: string

  // Testimony 2
  showTestimony2?: boolean
  testimony2Name?: string
  testimony2Title?: string
  testimony2Organization?: string
  testimony2Location?: string
  testimony2Quote?: string
  testimony2Statistic?: string
  testimony2StatisticLabel?: string

  // Testimony 3
  showTestimony3?: boolean
  testimony3Name?: string
  testimony3Title?: string
  testimony3Organization?: string
  testimony3Location?: string
  testimony3Quote?: string
  testimony3Statistic?: string
  testimony3StatisticLabel?: string

  // Testimony 4
  showTestimony4?: boolean
  testimony4Name?: string
  testimony4Title?: string
  testimony4Organization?: string
  testimony4Location?: string
  testimony4Quote?: string
  testimony4Statistic?: string
  testimony4StatisticLabel?: string

  // Styling - Using hex/rgb colors instead of Tailwind classes
  backgroundColor?: string
  headerTextColor?: string
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
  headerFont?: string
  bodyFont?: string
  nameFont?: string
  headerFontSize?: number
  subtitleFontSize?: number
  bodyFontSize?: number
  cardTitleFontSize?: number
  statValueFontSize?: number
  statLabelFontSize?: number

  // Visual Elements - Removed star ratings
  showQuoteIcon?: boolean
  showStatistics?: boolean
  cardStyle?: "minimal" | "bordered" | "shadow" | "elevated"

  // Animation
  enableHover?: boolean
  animationDelay?: number

  className?: string
}

const defaultStats: StatItem[] = [
  { value: "45+", label: "Countries Reached" },
  { value: "2M+", label: "Lives Impacted" },
  { value: "500+", label: "Partner Churches" },
  { value: "25", label: "Years of Ministry" },
]

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

export function TestimonialsSection({
  layout = "grid",
  columns = 2,
  showHeader = true,
  showStats = true,
  showCTA = true,

  headerTitle = "Stories of Impact",
  headerSubtitle = "Transforming Communities Worldwide",
  headerDescription = "See how Great Commission Media Ministries is partnering with local churches and organizations to share the Gospel through strategic media campaigns and compassionate outreach.",
  ctaTitle = "Ready to Make an Impact?",
  ctaDescription = "Join thousands of ministry leaders who are transforming their communities through strategic media ministry.",
  ctaButtonText = "Partner With Us",
  ctaButtonUrl = "#contact",

  stats = defaultStats,

  // Testimony 1 defaults
  showTestimony1 = true,
  testimony1Name = "Sarah Chen",
  testimony1Title = "Ministry Leader",
  testimony1Organization = "Hope Church International",
  testimony1Location = "Singapore",
  testimony1Quote = "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
  testimony1Statistic = "300%",
  testimony1StatisticLabel = "increase in engagement",

  // Testimony 2 defaults
  showTestimony2 = true,
  testimony2Name = "Pastor Michael Rodriguez",
  testimony2Title = "Senior Pastor",
  testimony2Organization = "Nueva Vida Church",
  testimony2Location = "Mexico City, Mexico",
  testimony2Quote = "The impact has been incredible. What once took months of planning now happens in weeks, and our message reaches thousands more people across Latin America.",
  testimony2Statistic = "15,000+",
  testimony2StatisticLabel = "people reached monthly",

  // Testimony 3 defaults
  showTestimony3 = true,
  testimony3Name = "Dr. Amara Okafor",
  testimony3Title = "Director of Missions",
  testimony3Organization = "African Gospel Network",
  testimony3Location = "Lagos, Nigeria",
  testimony3Quote = "GCM's culturally sensitive approach to media ministry has helped us share the Gospel effectively across 12 African nations. The results speak for themselves.",
  testimony3Statistic = "12",
  testimony3StatisticLabel = "nations impacted",

  // Testimony 4 defaults
  showTestimony4 = true,
  testimony4Name = "Rev. James Thompson",
  testimony4Title = "Missionary",
  testimony4Organization = "Global Harvest Ministry",
  testimony4Location = "Mumbai, India",
  testimony4Quote = "The training and resources provided have equipped our local teams to create compelling content that resonates with our communities. We've seen unprecedented growth.",
  testimony4Statistic = "85%",
  testimony4StatisticLabel = "growth in local participation",

  backgroundColor = "#0f172a",
  headerTextColor = "#ffffff",
  cardBackgroundColor = "#1e293b",
  cardTextColor = "#f1f5f9",
  accentColor = "#fbbf24",
  borderColor = "#334155",
  
  // Card detail colors
  nameColor = "#ffffff",
  titleColor = "#fbbf24",
  organizationColor = "#94a3b8",
  locationColor = "#64748b",

  headerFont = "sans",
  bodyFont = "sans",
  nameFont = "sans",
  headerFontSize = 48,
  subtitleFontSize = 20,
  bodyFontSize = 16,
  cardTitleFontSize = 18,
  statValueFontSize = 36,
  statLabelFontSize = 14,

  showQuoteIcon = true,
  showStatistics = true,
  cardStyle = "elevated",

  enableHover = true,
  animationDelay = 0,

  className = "",
}: TestimonialsProps) {
  const testimonials = [
    showTestimony1 && {
      id: "1",
      name: testimony1Name,
      title: testimony1Title,
      organization: testimony1Organization,
      location: testimony1Location,
      quote: testimony1Quote,
      statistic: testimony1Statistic,
      statisticLabel: testimony1StatisticLabel,
    },
    showTestimony2 && {
      id: "2",
      name: testimony2Name,
      title: testimony2Title,
      organization: testimony2Organization,
      location: testimony2Location,
      quote: testimony2Quote,
      statistic: testimony2Statistic,
      statisticLabel: testimony2StatisticLabel,
    },
    showTestimony3 && {
      id: "3",
      name: testimony3Name,
      title: testimony3Title,
      organization: testimony3Organization,
      location: testimony3Location,
      quote: testimony3Quote,
      statistic: testimony3Statistic,
      statisticLabel: testimony3StatisticLabel,
    },
    showTestimony4 && {
      id: "4",
      name: testimony4Name,
      title: testimony4Title,
      organization: testimony4Organization,
      location: testimony4Location,
      quote: testimony4Quote,
      statistic: testimony4Statistic,
      statisticLabel: testimony4StatisticLabel,
    },
  ].filter(Boolean)

  const getCardStyleClasses = () => {
    switch (cardStyle) {
      case "minimal":
        return ""
      case "bordered":
        return `border`
      case "shadow":
        return "shadow-lg"
      case "elevated":
        return "shadow-xl border"
      default:
        return "shadow-xl border"
    }
  }

  const getGridColumns = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 lg:grid-cols-2"
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      default:
        return "grid-cols-1 lg:grid-cols-2"
    }
  }

  const getFontFamily = (font: string) => {
    return fontFamilyMap[font] || fontFamilyMap["sans"]
  }

  const renderTestimonialCard = (testimonial: any, index: number) => (
    <div
      key={testimonial.id}
      className={`
        ${getCardStyleClasses()}
        ${enableHover ? "hover:scale-105 transition-all duration-300" : ""}
        p-6 h-full flex flex-col rounded-lg
      `}
      style={{ 
        animationDelay: `${animationDelay + index * 100}ms`,
        backgroundColor: cardBackgroundColor,
        color: cardTextColor,
        borderColor: borderColor,
      }}
    >
      {showQuoteIcon && <Quote className="w-8 h-8 mb-4 opacity-60" style={{ color: accentColor }} />}

      <div 
        className="mb-6 flex-grow leading-relaxed" 
        style={{ 
          fontSize: `${bodyFontSize}px`,
          fontFamily: getFontFamily(bodyFont),
        }}
      >
        "{testimonial.quote}"
      </div>

      {showStatistics && testimonial.statistic && (
        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}>
          <div className="font-bold" style={{ fontSize: `${statValueFontSize}px`, color: accentColor }}>
            {testimonial.statistic}
          </div>
          <div style={{ fontSize: `${statLabelFontSize}px`, color: '#94a3b8' }}>
            {testimonial.statisticLabel}
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
            {testimonial.name}
          </div>
          <div 
            className="font-medium" 
            style={{ 
              fontSize: `${statLabelFontSize}px`, 
              color: titleColor,
            }}
          >
            {testimonial.title}
          </div>
          <div 
            style={{ 
              fontSize: `${statLabelFontSize}px`, 
              color: organizationColor,
            }}
          >
            {testimonial.organization}
          </div>
          <div 
            className="mt-1" 
            style={{ 
              fontSize: `${statLabelFontSize - 2}px`, 
              color: locationColor,
            }}
          >
            {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className={`py-16 lg:py-24 ${className}`} style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-16">
            <h2
              className="font-bold mb-4 text-balance"
              style={{ 
                fontSize: `${headerFontSize}px`, 
                color: headerTextColor,
                fontFamily: getFontFamily(headerFont),
              }}
            >
              {headerTitle}
            </h2>
            <p
              className="font-medium mb-6"
              style={{ 
                fontSize: `${subtitleFontSize}px`, 
                color: accentColor,
                fontFamily: getFontFamily(headerFont),
              }}
            >
              {headerSubtitle}
            </p>
            <p
              className="opacity-90 max-w-3xl mx-auto leading-relaxed text-pretty"
              style={{ 
                fontSize: `${bodyFontSize}px`, 
                color: headerTextColor,
                fontFamily: getFontFamily(bodyFont),
              }}
            >
              {headerDescription}
            </p>
          </div>
        )}

        {showStats && stats.length > 0 && (
          <div className={`grid gap-8 mb-16`} style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-bold mb-2" style={{ fontSize: `${statValueFontSize}px`, color: accentColor }}>
                  {stat.value}
                </div>
                <div className="opacity-75" style={{ fontSize: `${statLabelFontSize}px`, color: headerTextColor }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`grid ${getGridColumns()} gap-8 mb-16`}>
          {testimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
        </div>

        {showCTA && (
          <div className="text-center">
            <h3
              className="font-bold mb-4"
              style={{ 
                fontSize: `${subtitleFontSize + 4}px`, 
                color: headerTextColor,
                fontFamily: getFontFamily(headerFont),
              }}
            >
              {ctaTitle}
            </h3>
            <p
              className="opacity-90 mb-8 max-w-2xl mx-auto"
              style={{ 
                fontSize: `${bodyFontSize}px`, 
                color: headerTextColor,
                fontFamily: getFontFamily(bodyFont),
              }}
            >
              {ctaDescription}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3"
              style={{ fontSize: `${bodyFontSize + 2}px` }}
            >
              <a href={ctaButtonUrl} className="inline-flex items-center space-x-2">
                <span>{ctaButtonText}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}