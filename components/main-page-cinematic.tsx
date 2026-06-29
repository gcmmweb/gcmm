"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, BookOpen, SatelliteDish, Heart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const BillboardIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="11" rx="0.5" fill="none" stroke="currentColor" />
    <rect x="3" y="4" width="18" height="9" rx="0.3" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="6" y1="14" x2="6" y2="21" strokeWidth="2" />
    <line x1="18" y1="14" x2="18" y2="21" strokeWidth="2" />
    <line x1="4" y1="21" x2="8" y2="21" strokeWidth="2" />
    <line x1="16" y1="21" x2="20" y2="21" strokeWidth="2" />
  </svg>
)

const StarOfDavidIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2 L20 16 L4 16 Z" />
    <path d="M12 22 L4 8 L20 8 Z" />
  </svg>
)

const HelpingHandsIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 14 L6 14 L6 11 C6 10 6.5 9 7.5 9 C8 9 8.5 9.5 8.5 10 L8.5 13" />
    <path d="M8.5 11 C8.5 10 9 9.5 9.5 9.5 C10 9.5 10.5 10 10.5 11 L10.5 13" />
    <circle cx="3.5" cy="14" r="1.5" fill="currentColor" />
    <path d="M22 14 L18 14 L18 11 C18 10 17.5 9 16.5 9 C16 9 15.5 9.5 15.5 10 L15.5 13" />
    <path d="M15.5 11 C15.5 10 15 9.5 14.5 9.5 C14 9.5 13.5 10 13.5 11 L13.5 13" />
    <circle cx="20.5" cy="14" r="1.5" fill="currentColor" />
    <path d="M10.5 13 L12 15 L13.5 13" strokeWidth="2" />
  </svg>
)

const SatelliteIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 16 Q12 9 20 16" strokeWidth="2" />
    <path d="M4 16 L20 16" strokeWidth="1.5" />
    <line x1="12" y1="16" x2="12" y2="20" strokeWidth="2" />
    <line x1="12" y1="12" x2="12" y2="7" strokeWidth="1.5" />
    <rect x="10.5" y="5" width="3" height="2" rx="0.5" fill="currentColor" />
    <path d="M15 6 Q17 6 17 4" strokeWidth="1" />
    <path d="M9 6 Q7 6 7 4" strokeWidth="1" />
  </svg>
)

function getYouTubeVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com")) {
      // https://www.youtube.com/watch?v=ID or other variants
      return u.searchParams.get("v")
    }
    if (u.hostname === "youtu.be") {
      // https://youtu.be/ID or https://youtu.be/ID?si=...
      return u.pathname.slice(1) || null
    }
  } catch {
    return null
  }
  return null
}

function getVimeoVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    // Match vimeo.com/123456789 or player.vimeo.com/video/123456789
    if (u.hostname.includes("vimeo.com")) {
      const match = u.pathname.match(/\/(?:video\/)?(\d+)/)
      return match ? match[1] : null
    }
  } catch {
    return null
  }
  return null
}

// Counter animation hook
function useCounter(end: number, duration = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref }
}

export function MainPageCinematic({
  className,
  // Hero Section
  heroTitle = "45 Years of Global",
  heroHighlight = "Ministry Commitment",
  heroSubtitle = "GCM Ministries partners with indigenous churches worldwide to share the Gospel through strategic media campaigns and compassionate outreach.",
  videoUrl = "/clip_1080p.mp4",
  videoPosterUrl = "/images/skdimore.jpeg",
  // Hero Colors
  heroOverlayColor = "#00000066",
  heroTitleColor = "#ffffff",
  heroSubtitleColor = "#e5e5e5",
  // Hero Buttons
  button1Text = "Watch Our Story",
  button1Link = "/videos",
  button1BgColor = "#ffffff",
  button1TextColor = "#000000",
  button1HoverBgColor = "#e5e5e5",
  button2Text = "Explore Ministries",
  button2Link = "/ministries",
  button2BorderColor = "#ffffff80",
  button2TextColor = "#ffffff",
  button2HoverBgColor = "#ffffff",
  button2HoverTextColor = "#000000",
  button3Text = "Sign Up for Our Newsletter",
  button3Link = "/signup",
  button3BorderColor = "#ffffff80",
  button3TextColor = "#ffffff",
  button3HoverBgColor = "#ffffff",
  button3HoverTextColor = "#000000",
  // Statistics
  stat1 = 450,
  stat2 = 112,
  stat3 = 100,
  stat1Label = "People Reached",
  stat1Suffix = "M+",
  stat2Label = "City Campaigns",
  stat2Suffix = "+",
  stat3Label = "Countries Served",
  stat3Suffix = "+",
  statsTextColor = "#ffffff",
  statsLabelColor = "#ffffffb3",
  statsBottomSpacingMobile = 64,
  // Feature Cards
  featureCardBgColor = "#ffffff",
  featureCardBorderColor = "#e5e7eb",
  featureCardIconBgColor = "#f1f5f9",
  featureCardIconColor = "#334155",
  featureCardTitleColor = "#0f172a",
  featureCardSubtitleColor = "#475569",
  featureCardDescriptionColor = "#475569",
  featureCardButtonBorderColor = "#e5e7eb",
  featureCardButtonTextColor = "#000000",
  featureCardButtonHoverBgColor = "#f9fafb",
  contentSectionBgColor = "#ffffff",
  contentSectionPaddingY = 96,
  feature1Title = "Mega City Media Campaigns",
  feature1Subtitle = "How do you evangelize to a whole city?",
  feature1Description = "Through 30-day Mega City Media Campaigns, GCMM partners with local churches to bring evangelism to an unprecedented scale—saturating cities with the Gospel through TV, radio, billboards, and digital media, fulfilling the Great Commission, one city at a time.",
  feature1Image = "/city-media-campaign-billboard.jpg",
  feature1Link = "/campaigns",
  feature2Title = "Media Outreach to the 10/40 Window",
  feature2Subtitle = "Reaching Hearts Behind Closed Doors",
  feature2Description = "GCMM reaches millions in the Arabic world through satellite TV and social media—broadcasting in 7 languages via 18 satellites. With 1,300 programs produced annually and 200,000 monthly viewer interactions, we provide personal discipleship and partner with underground churches.",
  feature2Image = "/satellite-dish-broadcasting.jpg",
  feature2Link = "/arabic-ministry",
  feature3Title = "Recovery from Trauma",
  feature3Subtitle = "Restoring Souls in a Wounded Nation",
  feature3Description = "GCMM's Christ-centred book, Recovery from Trauma, brings healing through Psalm 23, expert guidance, and real-life stories. Created with Ukrainian Christian psychologists, it offers peace to a hurting nation—meeting spiritual hunger with Gospel hope.",
  feature3Image = "/healing-book-recovery.jpg",
  feature3Link = "/trauma-recovery",
  feature4Title = "Israel Jewish Ministry",
  feature4Subtitle = "Blessing Israel, Reaching the Jewish People",
  feature4Description = "GCMM is committed to blessing Israel and the Jewish people through media outreach, humanitarian aid, and education. We produce media for Jews in Israel and beyond, support refugees and new immigrants, and host healing camps for youth.",
  feature4Image = "/jerusalem-israel-ministry.jpg",
  feature4Link = "/israel-ministry",
  feature5Title = "Humanitarian Aid to Ukraine",
  feature5Subtitle = "Faith in Action: Serving Ukraine in Its Darkest Hour",
  feature5Description = "In war-torn Ukraine, GCMM brings life-saving aid and the love of Christ. We've delivered over 5,000 tons of food, medical supplies, ambulances, and 12,000 wood-burning stoves, working through local churches and 400 chaplains.",
  feature5Image = "/humanitarian-aid-supplies.jpg",
  feature5Link = "/ukraine-aid",
}: {
  className?: string
  heroTitle?: string
  heroHighlight?: string
  heroSubtitle?: string
  videoUrl?: string // MP4 path, YouTube URL, or Vimeo URL
  videoPosterUrl?: string
  heroOverlayColor?: string
  heroTitleColor?: string
  heroSubtitleColor?: string
  button1Text?: string
  button1Link?: string
  button1BgColor?: string
  button1TextColor?: string
  button1HoverBgColor?: string
  button2Text?: string
  button2Link?: string
  button2BorderColor?: string
  button2TextColor?: string
  button2HoverBgColor?: string
  button2HoverTextColor?: string
  button3Text?: string
  button3Link?: string
  button3BorderColor?: string
  button3TextColor?: string
  button3HoverBgColor?: string
  button3HoverTextColor?: string
  stat1?: number
  stat2?: number
  stat3?: number
  statsTextColor?: string
  statsLabelColor?: string
  statsBottomSpacingMobile?: number
  featureCardBgColor?: string
  featureCardBorderColor?: string
  featureCardIconBgColor?: string
  featureCardIconColor?: string
  featureCardTitleColor?: string
  featureCardSubtitleColor?: string
  featureCardDescriptionColor?: string
  featureCardButtonBorderColor?: string
  featureCardButtonTextColor?: string
  featureCardButtonHoverBgColor?: string
  contentSectionBgColor?: string
  contentSectionPaddingY?: number
  feature1Title?: string
  feature1Subtitle?: string
  feature1Description?: string
  feature1Image?: string
  feature1Link?: string
  feature2Title?: string
  feature2Subtitle?: string
  feature2Description?: string
  feature2Image?: string
  feature2Link?: string
  feature3Title?: string
  feature3Subtitle?: string
  feature3Description?: string
  feature3Image?: string
  feature3Link?: string
  feature4Title?: string
  feature4Subtitle?: string
  feature4Description?: string
  feature4Image?: string
  feature4Link?: string
  feature5Title?: string
  feature5Subtitle?: string
  feature5Description?: string
  feature5Image?: string
  feature5Link?: string
}) {
  const { count: count1, ref: stat1Ref } = useCounter(stat1, 2.5)
  const { count: count2, ref: stat2Ref } = useCounter(stat2, 2.2)
  const { count: count3, ref: stat3Ref } = useCounter(stat3, 2.8)

  const youTubeId = getYouTubeVideoId(videoUrl)
  const vimeoId = getVimeoVideoId(videoUrl)

  const featureCards = [
    {
      icon: BillboardIcon,
      title: feature1Title,
      subtitle: feature1Subtitle,
      description: feature1Description,
      image: feature1Image,
      link: feature1Link,
    },
    {
      icon: SatelliteDish,
      title: feature2Title,
      subtitle: feature2Subtitle,
      description: feature2Description,
      image: feature2Image,
      link: feature2Link,
    },
    {
      icon: BookOpen,
      title: feature3Title,
      subtitle: feature3Subtitle,
      description: feature3Description,
      image: feature3Image,
      link: feature3Link,
    },
    {
      icon: StarOfDavidIcon,
      title: feature4Title,
      subtitle: feature4Subtitle,
      description: feature4Description,
      image: feature4Image,
      link: feature4Link,
    },
    {
      icon: Heart,
      title: feature5Title,
      subtitle: feature5Subtitle,
      description: feature5Description,
      image: feature5Image,
      link: feature5Link,
    },
  ]

  return (
  <div className={cn("relative", className)}>
    {/* Hero Section */}
    <section
      className="
        relative
        overflow-hidden
        h-auto
        md:h-auto
        md:[aspect-ratio:16/9]
      "
    >
      {/* --- MOBILE: video as a normal block at the top, white background under it --- */}
      <div className="block md:hidden w-full bg-white">
        <div className="w-full aspect-[16/9]">
          {youTubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1&playsinline=1`}
              title="Background video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen={false}
            />
          ) : vimeoId ? (
<iframe
  className="w-full h-full"
  src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
  title="Background video"
  allow="autoplay; fullscreen; picture-in-picture"
/>

          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full"
              poster={videoPosterUrl}
            >
              <source src={videoUrl} type="video/mp4" />
              <img
                src={videoPosterUrl || "/placeholder.svg"}
                alt="Mountain landscape"
                className="w-full h-full"
              />
            </video>
          )}
        </div>
      </div>

      {/* --- DESKTOP / TABLET: video as absolute background with overlay content --- */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
        {youTubeId ? (
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1&playsinline=1`}
            title="Background video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen={false}
          />
        ) : vimeoId ? (
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
            title="Background video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={false}
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={videoPosterUrl}
          >
            <source src={videoUrl} type="video/mp4" />
            <img
              src={videoPosterUrl || "/placeholder.svg"}
              alt="Mountain landscape"
              className="w-full h-full object-cover"
            />
          </video>
        )}
        <div className="absolute inset-0" style={{ backgroundColor: heroOverlayColor }} />
      </div>

      {/* Hero Content */}
      <div
        className="
          relative z-10
          w-full max-w-4xl mx-auto px-6
          flex flex-col items-center justify-center text-center
          pt-10 pb-16 md:pt-0 md:pb-0 md:h-full
        "
        style={{ paddingTop: 40 }}
      >

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="
            text-black
            md:[color:var(--hero-title)]
            text-5xl md:text-6xl lg:text-7xl 
            font-serif font-light leading-[1.1] mb-8 tracking-tight
          "
          style={{ "--hero-title": heroTitleColor } as React.CSSProperties}
        >
          {heroTitle}
          <br />
          <span className="font-normal">{heroHighlight}</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          className="
            text-black
            md:[color:var(--hero-subtitle)]
            text-lg md:text-xl font-light leading-relaxed mb-12 max-w-3xl mx-auto
          "
          style={{ "--hero-subtitle": heroSubtitleColor } as React.CSSProperties}
        >
          {heroSubtitle}
        </motion.p>

        {/* Hero Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            asChild
            className="font-medium px-8 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 flex items-center"
            style={{
              backgroundColor: button1BgColor,
              // pass the dynamic text colour into a CSS variable so child can use it at md+
              ["--btn-text" as any]: button1TextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = button1HoverBgColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = button1BgColor
            }}
          >
            <Link href={button1Link} className="text-black md:[color:var(--btn-text)]">
              <Play className="w-5 h-5 mr-2" />
              {button1Text}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="font-medium px-8 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 bg-transparent flex items-center"
            style={{
              borderColor: button2BorderColor,
              // pass the dynamic text colour into a CSS variable so child can use it at md+
              ["--btn-text" as any]: button2TextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = button2HoverBgColor
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button2HoverTextColor)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button2TextColor)
            }}
          >
            <Link href={button2Link} className="text-black md:[color:var(--btn-text)]">
              {button2Text}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="font-medium px-8 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 bg-transparent flex items-center"
            style={{
              borderColor: button3BorderColor,
              // pass the dynamic text colour into a CSS variable so child can use it at md+
              ["--btn-text" as any]: button3TextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = button3HoverBgColor
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button3HoverTextColor)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button3TextColor)
            }}
          >
            <Link href={button3Link} className="text-black md:[color:var(--btn-text)]">
              {button3Text}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          style={{ marginBottom: `${statsBottomSpacingMobile}px` }}
        >
          {[
            { count: count1, ref: stat1Ref, label: stat1Label, suffix: stat1Suffix },
            { count: count2, ref: stat2Ref, label: stat2Label, suffix: stat2Suffix },
            { count: count3, ref: stat3Ref, label: stat3Label, suffix: stat3Suffix },
          ].map(({ count, ref, label, suffix }, index) => (
            <div key={index} ref={ref} className="text-center">
              <motion.div
                className="
                  text-black
                  md:[color:var(--stats-text)]
                  text-3xl md:text-4xl font-serif font-light mb-2
                "
                style={{ ["--stats-text" as any]: statsTextColor }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 2.8 + index * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {count}
                {suffix}
              </motion.div>
              <div
                className="
                  text-black
                  md:[color:var(--stats-label)]
                  text-sm uppercase tracking-widest font-light
                "
                style={{ ["--stats-label" as any]: statsLabelColor }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Content Sections - Feature cards now automatically grow/shrink with content using flexbox */}
    <section
      style={{
        backgroundColor: contentSectionBgColor,
        paddingTop: contentSectionPaddingY,
        paddingBottom: contentSectionPaddingY,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6 items-start">
          {featureCards.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              style={{
                backgroundColor: featureCardBgColor,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: featureCardBorderColor,
              }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: featureCardIconBgColor }}
                >
                  {React.createElement(item.icon, { className: "w-6 h-6", style: { color: featureCardIconColor } })}
                </motion.div>
                <h3
                  className="text-lg font-serif font-medium mb-2 leading-tight"
                  style={{ color: featureCardTitleColor }}
                >
                  {item.title}
                </h3>
                <p className="text-sm font-medium mb-3 italic" style={{ color: featureCardSubtitleColor }}>
                  {item.subtitle}
                </p>
                <p
                  className="text-sm leading-relaxed font-light flex-grow mb-4"
                  style={{ color: featureCardDescriptionColor }}
                >
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-auto bg-transparent"
                  style={{
                    borderColor: featureCardButtonBorderColor,
                    color: featureCardButtonTextColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = featureCardButtonHoverBgColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  <Link href={item.link} className="flex items-center justify-center">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
)}