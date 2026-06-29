"use client"
import { useEffect, useRef, useState } from "react"

// Font weight mapping
const fontWeightMap: Record<string, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
}

export function OurVisionSection({
  className,
  sectionTitle = "What is Great Commission Media Ministries?",
  sectionTitleFontWeight = "light",
  sectionTitleColor = "#6b7280",
  sectionTitleColorFrom = "",
  sectionTitleColorTo = "",
  useGradientForTitle = false,
  sectionSubtitle = "",
  sectionSubtitleFontWeight = "black",
  subtitleColorFrom = "#2563eb",
  subtitleColorTo = "#1e293b",
  useGradientForSubtitle = true,
  backgroundColor = "#eff6ff",
  
  introLabel = "Who We Are",
  introLabelColor = "#6b7280",
  introHeading = "Great Commission Media Ministries",
  introHeadingColor = "#111827",
  introHeadingFontWeight = "black",
  introText = "Great Commission Media Ministries uses high‑impact media campaigns to share the message of Jesus in major cities around the world, partnering with local churches to follow up with those who respond.",
  introTextColor = "#4b5563",
  introVideoThumbnail = "/images/gcm-intro-thumbnail.jpg",
  introVideoUrl = "https://vimeo.com/XXXXXXXX",
  
  learnMoreText = "Learn more",
  learnMoreColor = "#1d4ed8",
  learnMoreHoverColor = "#1e40af",
  learnMoreUrl = "/about",
  
  playButtonColor = "#1d4ed8",
  playButtonBackgroundColor = "#ffffff",
  
  cardBackgroundColor = "#ffffff",
  cardBorderColor = "#f3f4f6",
  cardHoverBorderColor = "#bfdbfe",
  
  missionTitle = "Our Purpose",
  missionTitleColor = "#111827",
  missionTitleFontWeight = "black",
  missionText = "The purpose of Great Commission Media Ministries is to conduct high-impact Mega City Media Saturation Campaigns in cities with the message that God gives the power to change.",
  missionTextColor = "#4b5563",
  missionDotColorFrom = "#2563eb",
  missionDotColorTo = "#1e293b",
  missionLineColorFrom = "#2563eb",
  missionLineColorTo = "#1e293b",
  
  passionTitle = "Our Passion",
  passionTitleColor = "#111827",
  passionTitleFontWeight = "black",
  passionText = "Partnering together with local indigenous churches to lift up Jesus in cities so everyone has the opportunity to respond resulting in changed lives.",
  passionTextColor = "#4b5563",
  passionDotColorFrom = "#2563eb",
  passionDotColorTo = "#1e293b",
  passionLineColorFrom = "#2563eb",
  passionLineColorTo = "#1e293b",
  
  showBottomQuote = true,
  bottomQuote = "Transforming cities, one heart at a time, through the power of media and the message of hope.",
  bottomQuoteColor = "#374151",
  bottomQuoteBackgroundColor = "#ffffff",
  bottomQuoteLineColorFrom = "#2563eb",
  bottomQuoteLineColorTo = "#1e293b",
}: {
  className?: string
  sectionTitle?: string
  /** Font weight for the main section title. Default: "light" */
  sectionTitleFontWeight?: string
  sectionTitleColor?: string
  /** Start color for title gradient (only used when useGradientForTitle is true) */
  sectionTitleColorFrom?: string
  /** End color for title gradient (only used when useGradientForTitle is true) */
  sectionTitleColorTo?: string
  /** If true, the title uses a gradient from sectionTitleColorFrom to sectionTitleColorTo. Default: false */
  useGradientForTitle?: boolean
  sectionSubtitle?: string
  /** Font weight for the subtitle. Default: "black" */
  sectionSubtitleFontWeight?: string
  subtitleColorFrom?: string
  subtitleColorTo?: string
  /** If true, the subtitle uses a gradient from subtitleColorFrom to subtitleColorTo. If false, it uses subtitleColorFrom as a solid color. Default: true */
  useGradientForSubtitle?: boolean
  backgroundColor?: string
  
  introLabel?: string
  introLabelColor?: string
  introHeading?: string
  introHeadingColor?: string
  introHeadingFontWeight?: string
  introText?: string
  introTextColor?: string
  introVideoThumbnail?: string
  introVideoUrl?: string
  
  learnMoreText?: string
  learnMoreColor?: string
  learnMoreHoverColor?: string
  learnMoreUrl?: string
  
  playButtonColor?: string
  playButtonBackgroundColor?: string
  
  cardBackgroundColor?: string
  cardBorderColor?: string
  cardHoverBorderColor?: string
  
  missionTitle?: string
  missionTitleColor?: string
  missionTitleFontWeight?: string
  missionText?: string
  missionTextColor?: string
  missionDotColorFrom?: string
  missionDotColorTo?: string
  missionLineColorFrom?: string
  missionLineColorTo?: string
  
  passionTitle?: string
  passionTitleColor?: string
  passionTitleFontWeight?: string
  passionText?: string
  passionTextColor?: string
  passionDotColorFrom?: string
  passionDotColorTo?: string
  passionLineColorFrom?: string
  passionLineColorTo?: string
  
  showBottomQuote?: boolean
  bottomQuote?: string
  bottomQuoteColor?: string
  bottomQuoteBackgroundColor?: string
  bottomQuoteLineColorFrom?: string
  bottomQuoteLineColorTo?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isLearnMoreHovered, setIsLearnMoreHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const getVideoEmbed = (url: string) => {
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) return { type: "vimeo" as const, id: vimeoMatch[1] }

    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    )
    if (ytMatch) return { type: "youtube" as const, id: ytMatch[1] }

    return null
  }

  const video = getVideoEmbed(introVideoUrl)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-24 lg:py-32 overflow-hidden ${className || ""}`}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-5xl lg:text-6xl leading-[0.9] mb-4 tracking-tight">
            {/* Section Title — font weight + color now controlled via props */}
            {useGradientForTitle ? (
              <span
                className={`${fontWeightMap[sectionTitleFontWeight] || "font-light"} bg-clip-text text-transparent`}
                style={{
                  backgroundImage: `linear-gradient(to right, ${sectionTitleColorFrom || sectionTitleColor}, ${sectionTitleColorTo || sectionTitleColor})`,
                }}
              >
                {sectionTitle}
              </span>
            ) : (
              <span
                className={fontWeightMap[sectionTitleFontWeight] || "font-light"}
                style={{ color: sectionTitleColor }}
              >
                {sectionTitle}
              </span>
            )}

            {sectionSubtitle && (
              <>
                <br />
                {useGradientForSubtitle ? (
                  <span
                    className={`${fontWeightMap[sectionSubtitleFontWeight] || "font-black"} bg-clip-text text-transparent`}
                    style={{
                      backgroundImage: `linear-gradient(to right, ${subtitleColorFrom}, ${subtitleColorTo})`,
                    }}
                  >
                    {sectionSubtitle}
                  </span>
                ) : (
                  <span
                    className={fontWeightMap[sectionSubtitleFontWeight] || "font-black"}
                    style={{ color: subtitleColorFrom }}
                  >
                    {sectionSubtitle}
                  </span>
                )}
              </>
            )}
          </h2>
        </div>

        {/* Intro + Video */}
        <div
          className={`mb-24 transition-all duration-1200 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div 
            className="rounded-3xl shadow-xl p-8 lg:p-12 relative overflow-hidden"
            style={{
              backgroundColor: cardBackgroundColor,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: cardBorderColor,
            }}
          >
            {/* Soft background */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom right, ${subtitleColorFrom}, ${subtitleColorTo})`
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                {introLabel && (
                  <h2 
                    className="text-sm font-semibold tracking-[0.25em] uppercase mb-3"
                    style={{ color: introLabelColor }}
                  >
                    {introLabel}
                  </h2>
                )}
                <h3 
                  className={`text-3xl lg:text-4xl ${fontWeightMap[introHeadingFontWeight] || "font-black"} mb-6 leading-tight`}
                  style={{ color: introHeadingColor }}
                >
                  {introHeading}
                </h3>
                <p 
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: introTextColor }}
                >
                  {introText}
                </p>
                <a
                  href={learnMoreUrl}
                  className="group inline-flex items-center text-sm font-semibold tracking-wide"
                  style={{
                    color: isLearnMoreHovered ? learnMoreHoverColor : learnMoreColor,
                  }}
                  onMouseEnter={() => setIsLearnMoreHovered(true)}
                  onMouseLeave={() => setIsLearnMoreHovered(false)}
                >
                  {learnMoreText}
                  <span 
                    className="ml-2 h-px transition-all"
                    style={{
                      backgroundColor: isLearnMoreHovered ? learnMoreHoverColor : learnMoreColor,
                      width: isLearnMoreHovered ? '3.5rem' : '2.5rem',
                    }}
                  />
                </a>
              </div>

              {/* Right: Video */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black">
                {!showVideo ? (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="block relative w-full group"
                  >
                    <div
                      className="w-full h-64 lg:h-80 bg-cover bg-center"
                      style={{ backgroundImage: `url('${introVideoThumbnail}')` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <span 
                        className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: playButtonBackgroundColor,
                          opacity: 0.9,
                        }}
                      >
                        <span 
                          className="ml-1 inline-block border-y-[10px] border-y-transparent"
                          style={{
                            borderLeftWidth: '14px',
                            borderLeftColor: playButtonColor,
                          }}
                        />
                      </span>
                    </span>
                  </button>
                ) : (
                  <div className="w-full h-64 lg:h-80">
                    {video ? (
                      <iframe
                        src={video.type === "vimeo"
                          ? `https://player.vimeo.com/video/${video.id}?autoplay=1`
                          : `https://www.youtube.com/embed/${video.id}?autoplay=1`
                        }
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        Invalid video URL
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div
            className={`group transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div 
              className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 h-full"
              style={{
                backgroundColor: cardBackgroundColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorderColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cardHoverBorderColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cardBorderColor
              }}
            >
              <div className="p-8 lg:p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${missionDotColorFrom}, ${missionDotColorTo})`
                      }}
                    />
                    <h3 
                      className={`text-2xl lg:text-3xl ${fontWeightMap[missionTitleFontWeight] || "font-black"} tracking-tight`}
                      style={{ color: missionTitleColor }}
                    >
                      {missionTitle}
                    </h3>
                  </div>
                  <div 
                    className="w-24 h-1 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${missionLineColorFrom}, ${missionLineColorTo})`
                    }}
                  />
                </div>
                <p 
                  className="text-lg font-medium leading-relaxed tracking-wide"
                  style={{ color: missionTextColor }}
                >
                  {missionText}
                </p>
              </div>
            </div>
          </div>

          {/* Passion Card */}
          <div
            className={`group transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div 
              className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 h-full"
              style={{
                backgroundColor: cardBackgroundColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorderColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cardHoverBorderColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cardBorderColor
              }}
            >
              <div className="p-8 lg:p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${passionDotColorFrom}, ${passionDotColorTo})`
                      }}
                    />
                    <h3 
                      className={`text-2xl lg:text-3xl ${fontWeightMap[passionTitleFontWeight] || "font-black"} tracking-tight`}
                      style={{ color: passionTitleColor }}
                    >
                      {passionTitle}
                    </h3>
                  </div>
                  <div 
                    className="w-24 h-1 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${passionLineColorFrom}, ${passionLineColorTo})`
                    }}
                  />
                </div>
                <p 
                  className="text-lg font-medium leading-relaxed tracking-wide"
                  style={{ color: passionTextColor }}
                >
                  {passionText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        {showBottomQuote && (
          <div
            className={`text-center mt-24 transition-all duration-1200 delay-1100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div 
              className="max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-8 lg:p-12"
              style={{
                backgroundColor: `${bottomQuoteBackgroundColor}80`,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: cardBorderColor,
              }}
            >
              <blockquote 
                className="text-2xl lg:text-3xl font-light leading-relaxed tracking-wide mb-6"
                style={{ color: bottomQuoteColor }}
              >
                "{bottomQuote}"
              </blockquote>
              <div 
                className="w-32 h-1 rounded-full mx-auto"
                style={{
                  background: `linear-gradient(to right, ${bottomQuoteLineColorFrom}, ${bottomQuoteLineColorTo})`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}