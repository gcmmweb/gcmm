"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface AboutUsPageProps {
  className?: string

  // Section visibility toggles
  showHeroSection?: boolean
  showStatsSection?: boolean
  showMissionSection?: boolean
  showVideoSection?: boolean
  showValuesSection?: boolean
  showTimelineSection?: boolean
  showCtaSection?: boolean

  // Hero Section
  heroSubtitle?: string
  heroTitle?: string
  heroTitleItalicWord?: string
  heroTitleSuffix?: string
  heroDescription?: string

  // Stats Section
  showStat1?: boolean
  stat1Number?: string
  stat1Label?: string
  showStat2?: boolean
  stat2Number?: string
  stat2Label?: string
  showStat3?: boolean
  stat3Number?: string
  stat3Label?: string
  showStat4?: boolean
  stat4Number?: string
  stat4Label?: string

  // Mission Section
  missionHeading?: string
  missionParagraph1?: string
  missionParagraph2?: string
  missionParagraph3?: string

  // Video Section
  videoHeading?: string
  videoDescription?: string
  videoButtonText?: string
  videoUrl?: string
  videoSectionBgColor?: string
  videoButtonBgColor?: string
  videoButtonTextColor?: string
  videoButtonLink?: string

  // Values Section
  valuesHeading?: string
  
  // Individual value toggles
  showValue1?: boolean
  value1Title?: string
  value1Description?: string
  value1IconType?: "image" | "text"
  value1IconImage?: string
  value1IconText?: string
  
  showValue2?: boolean
  value2Title?: string
  value2Description?: string
  value2IconType?: "image" | "text"
  value2IconImage?: string
  value2IconText?: string
  
  showValue3?: boolean
  value3Title?: string
  value3Description?: string
  value3IconType?: "image" | "text"
  value3IconImage?: string
  value3IconText?: string
  
  showValue4?: boolean
  value4Title?: string
  value4Description?: string
  value4IconType?: "image" | "text"
  value4IconImage?: string
  value4IconText?: string
  
  showValue5?: boolean
  value5Title?: string
  value5Description?: string
  value5IconType?: "image" | "text"
  value5IconImage?: string
  value5IconText?: string
  
  showValue6?: boolean
  value6Title?: string
  value6Description?: string
  value6IconType?: "image" | "text"
  value6IconImage?: string
  value6IconText?: string

  // Timeline Section
  timelineHeading?: string
  timeline1Year?: string
  timeline1Title?: string
  timeline1Description?: string
  timeline2Year?: string
  timeline2Title?: string
  timeline2Description?: string
  timeline3Year?: string
  timeline3Title?: string
  timeline3Description?: string
  timeline4Year?: string
  timeline4Title?: string
  timeline4Description?: string

  // CTA Section
  ctaHeading?: string
  ctaDescription?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonBgColor?: string
  primaryButtonTextColor?: string
  primaryButtonLink?: string
  secondaryButtonBgColor?: string
  secondaryButtonTextColor?: string
  secondaryButtonBorderColor?: string
  secondaryButtonLink?: string
}

export function AboutUsPage({
  className,

  // Section visibility - all default to true
  showHeroSection = true,
  showStatsSection = true,
  showMissionSection = true,
  showVideoSection = true,
  showValuesSection = true,
  showTimelineSection = true,
  showCtaSection = true,

  // Hero Section
  heroSubtitle = "Since 1978",
  heroTitle = "Broadcasting",
  heroTitleItalicWord = "hope",
  heroTitleSuffix = "to the world",
  heroDescription = "For over 45 years, Great Commission Media Ministries has been sharing the transformative message of faith across borders and generations.",

  // Stats Section
  showStat1 = true,
  stat1Number = "45+",
  stat1Label = "Years of Ministry",
  showStat2 = true,
  stat2Number = "180+",
  stat2Label = "Countries Reached",
  showStat3 = true,
  stat3Number = "25+",
  stat3Label = "Languages",
  showStat4 = true,
  stat4Number = "∞",
  stat4Label = "Lives Transformed",

  // Mission Section
  missionHeading = "Our mission is to empower believers worldwide",
  missionParagraph1 = "In 1978, Hannu and Laura Haukka embarked on an extraordinary journey—using shortwave radio broadcasts to reach the isolated communities of the Soviet Union with a message of hope and faith.",
  missionParagraph2 = "What began as a small radio ministry has grown into a worldwide multimedia movement, touching lives across continents through television, digital platforms, and community outreach.",
  missionParagraph3 = "Today, we continue that legacy with the same passion and purpose: to share God's transformative love with every person, in every nation.",

  // Video Section
  videoHeading = "Power to change lives",
  videoDescription = "Through innovative media and authentic storytelling, we create content that speaks to the heart, challenges perspectives, and inspires transformation.",
  videoButtonText = "Watch Our Story",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  videoSectionBgColor = "#1F2D55",
  videoButtonBgColor = "#D4A574",
  videoButtonTextColor = "#0A0A0A",
  videoButtonLink = "#",

  // Values Section
  valuesHeading = "What drives us",
  
  showValue1 = true,
  value1Title = "Authenticity",
  value1Description = "We believe in genuine storytelling that resonates with real human experiences and challenges.",
  value1IconType = "text",
  value1IconImage = "",
  value1IconText = "✦",
  
  showValue2 = true,
  value2Title = "Innovation",
  value2Description = "Embracing new technologies and creative approaches to share timeless truth in fresh ways.",
  value2IconType = "text",
  value2IconImage = "",
  value2IconText = "◆",
  
  showValue3 = true,
  value3Title = "Global Impact",
  value3Description = "Building bridges across cultures and languages to create a worldwide community of faith.",
  value3IconType = "text",
  value3IconImage = "",
  value3IconText = "●",
  
  showValue4 = true,
  value4Title = "Excellence",
  value4Description = "Pursuing the highest quality in everything we create, honoring both our mission and our audience.",
  value4IconType = "text",
  value4IconImage = "",
  value4IconText = "■",
  
  showValue5 = true,
  value5Title = "Compassion",
  value5Description = "Leading with empathy and understanding, meeting people where they are with grace and truth.",
  value5IconType = "text",
  value5IconImage = "",
  value5IconText = "▲",
  
  showValue6 = true,
  value6Title = "Integrity",
  value6Description = "Operating with transparency and accountability in all aspects of our ministry and stewardship.",
  value6IconType = "text",
  value6IconImage = "",
  value6IconText = "★",

  // Timeline Section
  timelineHeading = "Our journey",
  timeline1Year = "1978",
  timeline1Title = "The Beginning",
  timeline1Description = "Hannu and Laura Haukka begin shortwave radio broadcasts to the Soviet Union, sharing hope behind the Iron Curtain.",
  timeline2Year = "1990s",
  timeline2Title = "Digital Expansion",
  timeline2Description = "As technology evolves, GCM embraces new platforms, launching television programs and early digital initiatives.",
  timeline3Year = "2000s",
  timeline3Title = "Global Reach",
  timeline3Description = "Ministry expands to over 180 countries with content translated into 25+ languages.",
  timeline4Year = "Today",
  timeline4Title = "Multimedia Movement",
  timeline4Description = "A comprehensive digital-first approach combining streaming, social media, and traditional broadcasting to reach every generation.",

  // CTA Section
  ctaHeading = "Join us in changing the world",
  ctaDescription = "Your partnership helps us reach more people with a message that transforms lives.",
  primaryButtonText = "Partner With Us",
  secondaryButtonText = "Contact Our Team",
  primaryButtonBgColor = "#D4A574",
  primaryButtonTextColor = "#0A0A0A",
  primaryButtonLink = "#",
  secondaryButtonBgColor = "transparent",
  secondaryButtonTextColor = "#ffffff",
  secondaryButtonBorderColor = "#ffffff",
  secondaryButtonLink = "#",
}: AboutUsPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".observe-animation")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const stats = [
    showStat1 && { number: stat1Number, label: stat1Label },
    showStat2 && { number: stat2Number, label: stat2Label },
    showStat3 && { number: stat3Number, label: stat3Label },
    showStat4 && { number: stat4Number, label: stat4Label },
  ].filter((s): s is { number: string; label: string } => Boolean(s && s.number && s.number.trim()))

  // Build values array with only visible values
  const values = [
    showValue1 && { title: value1Title, description: value1Description, iconType: value1IconType, iconImage: value1IconImage, iconText: value1IconText },
    showValue2 && { title: value2Title, description: value2Description, iconType: value2IconType, iconImage: value2IconImage, iconText: value2IconText },
    showValue3 && { title: value3Title, description: value3Description, iconType: value3IconType, iconImage: value3IconImage, iconText: value3IconText },
    showValue4 && { title: value4Title, description: value4Description, iconType: value4IconType, iconImage: value4IconImage, iconText: value4IconText },
    showValue5 && { title: value5Title, description: value5Description, iconType: value5IconType, iconImage: value5IconImage, iconText: value5IconText },
    showValue6 && { title: value6Title, description: value6Description, iconType: value6IconType, iconImage: value6IconImage, iconText: value6IconText },
  ].filter(Boolean) as Array<{ title: string; description: string; iconType: "image" | "text"; iconImage: string; iconText: string }>

  const timeline = [
    { year: timeline1Year, title: timeline1Title, description: timeline1Description },
    { year: timeline2Year, title: timeline2Title, description: timeline2Description },
    { year: timeline3Year, title: timeline3Title, description: timeline3Description },
    { year: timeline4Year, title: timeline4Title, description: timeline4Description },
  ]

  // Helper function to check if icon is SVG or text
  const isSvgIcon = (icon: string) => {
    return icon.trim().startsWith('<svg')
  }

  return (
    <main className={`bg-[#FAFAF8] ${className || ""}`}>
      {/* Hero Section */}
      {showHeroSection && (
        <section
          ref={heroRef}
          className="relative flex items-center justify-center px-6 py-20 overflow-hidden"
          style={{ minHeight: "800px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B4B6B]/5 to-transparent" />

          <div
            className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="mb-6 inline-block">
              <span className="text-sm font-medium tracking-[0.2em] text-[#1B4B6B] uppercase">{heroSubtitle}</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.95] mb-8 text-balance text-[#0A0A0A]">
              {heroTitle} <span className="italic font-normal">{heroTitleItalicWord}</span> {heroTitleSuffix}
            </h1>

            <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed text-balance">
              {heroDescription}
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#1B4B6B] rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-[#1B4B6B] rounded-full animate-pulse" />
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {showStatsSection && (
        <section ref={statsRef} className="py-24 px-6 bg-[#1B4B6B] text-white observe-animation">
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-2 gap-12 ${stats.length === 3 ? "md:grid-cols-3" : stats.length === 2 ? "md:grid-cols-2" : stats.length === 1 ? "md:grid-cols-1" : "md:grid-cols-4"}`}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "800ms",
                  }}
                >
                  <div className="text-5xl md:text-7xl font-light mb-3 font-serif">{stat.number}</div>
                  <div className="text-sm md:text-base uppercase tracking-wider text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Statement */}
      {showMissionSection && (
        <section className="py-32 px-6 observe-animation">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-12 text-[#0A0A0A]">
              {missionHeading}
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-[#4A4A4A] leading-relaxed">
              <p>{missionParagraph1}</p>
              <p>{missionParagraph2}</p>
              <p className="text-[#1B4B6B] font-medium text-2xl pt-6 italic">{missionParagraph3}</p>
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {showVideoSection && (
        <section className="py-24 px-6 text-white observe-animation" style={{ backgroundColor: videoSectionBgColor }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-6xl font-serif font-light leading-tight mb-8">{videoHeading}</h3>
                <p className="text-lg text-white/80 leading-relaxed mb-8">{videoDescription}</p>
                <Button
                  asChild
                  size="lg"
                  className="font-medium"
                  style={{
                    backgroundColor: videoButtonBgColor,
                    color: videoButtonTextColor,
                  }}
                >
                  <a href={videoButtonLink}>{videoButtonText}</a>
                </Button>
              </div>

              <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Ministry Video"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Grid */}
      {showValuesSection && values.length > 0 && (
        <section className="py-32 px-6 observe-animation">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-20 text-center text-[#0A0A0A]">
              {valuesHeading}
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group p-8 border border-[#E8E8E5] hover:border-[#1B4B6B] rounded-lg transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="mb-6 text-[#D4A574] group-hover:scale-110 transition-transform duration-300">
                    {value.iconType === "image" && value.iconImage ? (
                      <img 
                        src={value.iconImage} 
                        alt={value.title}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <span className="text-5xl">{value.iconText}</span>
                    )}
                  </div>
                  <h4 className="text-2xl font-medium mb-4 text-[#0A0A0A]">{value.title}</h4>
                  <p className="text-[#4A4A4A] leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {showTimelineSection && (
        <section className="py-32 px-6 bg-[#F5F5F3] observe-animation">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-20 text-center text-[#0A0A0A]">
              {timelineHeading}
            </h3>

            <div className="space-y-16">
              {timeline.map((milestone, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-start group">
                  <div className="flex-shrink-0 w-32">
                    <div className="text-5xl font-serif font-light text-[#1B4B6B] group-hover:text-[#D4A574] transition-colors">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 border-l-2 border-[#E8E8E5] pl-8 pb-8">
                    <h4 className="text-3xl font-medium mb-4 text-[#0A0A0A]">{milestone.title}</h4>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {showCtaSection && (
        <section className="py-32 px-6 bg-[#1B4B6B] text-white observe-animation">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-8">{ctaHeading}</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">{ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="font-medium text-lg px-10"
                style={{
                  backgroundColor: primaryButtonBgColor,
                  color: primaryButtonTextColor,
                }}
              >
                <a href={primaryButtonLink}>{primaryButtonText}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-medium text-lg px-10 bg-transparent"
                style={{
                  backgroundColor: secondaryButtonBgColor,
                  color: secondaryButtonTextColor,
                  borderColor: secondaryButtonBorderColor,
                  borderWidth: "2px",
                }}
              >
                <a href={secondaryButtonLink}>{secondaryButtonText}</a>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default AboutUsPage