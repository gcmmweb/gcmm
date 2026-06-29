"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight, SatelliteDish } from "lucide-react"

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
    {/* Main billboard rectangular frame */}
    <rect x="2" y="3" width="20" height="11" rx="0.5" fill="none" stroke="currentColor" />
    {/* Inner frame detail */}
    <rect x="3" y="4" width="18" height="9" rx="0.3" fill="none" stroke="currentColor" strokeWidth="1" />
    {/* Left support post */}
    <line x1="6" y1="14" x2="6" y2="21" strokeWidth="2" />
    {/* Right support post */}
    <line x1="18" y1="14" x2="18" y2="21" strokeWidth="2" />
    {/* Ground/base left */}
    <line x1="4" y1="21" x2="8" y2="21" strokeWidth="2" />
    {/* Ground/base right */}
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
    {/* Upper triangle */}
    <path d="M12 2 L20 16 L4 16 Z" />
    {/* Lower triangle (inverted) */}
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
    {/* Left arm and hand reaching right */}
    <path d="M2 14 L6 14 L6 11 C6 10 6.5 9 7.5 9 C8 9 8.5 9.5 8.5 10 L8.5 13" />
    <path d="M8.5 11 C8.5 10 9 9.5 9.5 9.5 C10 9.5 10.5 10 10.5 11 L10.5 13" />
    <circle cx="3.5" cy="14" r="1.5" fill="currentColor" />

    {/* Right arm and hand reaching right */}
    <path d="M22 14 L18 14 L18 11 C18 10 17.5 9 16.5 9 C16 9 15.5 9.5 15.5 10 L15.5 13" />
    <path d="M15.5 11 C15.5 10 15 9.5 14.5 9.5 C14 9.5 13.5 10 13.5 11 L13.5 13" />
    <circle cx="20.5" cy="14" r="1.5" fill="currentColor" />

    {/* Center connection/heart */}
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
    {/* Parabolic dish */}
    <path d="M4 16 Q12 9 20 16" strokeWidth="2" />
    {/* Dish rim/edge */}
    <path d="M4 16 L20 16" strokeWidth="1.5" />
    {/* Central support pole */}
    <line x1="12" y1="16" x2="12" y2="20" strokeWidth="2" />
    {/* Receiver arm */}
    <line x1="12" y1="12" x2="12" y2="7" strokeWidth="1.5" />
    {/* LNB receiver */}
    <rect x="10.5" y="5" width="3" height="2" rx="0.5" fill="currentColor" />
    {/* Signal waves */}
    <path d="M15 6 Q17 6 17 4" strokeWidth="1" />
    <path d="M9 6 Q7 6 7 4" strokeWidth="1" />
  </svg>
)

export function MinistriesPage({
  className,
  heroTitle = "Our Global",
  heroSubtitle = "Ministries",
  heroDescription = "Reaching nations through strategic media campaigns and compassionate outreach across the globe",

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

  // Mega City Campaigns
  campaignsTitle = "Mega City Campaigns",
  campaignsDescription = "Highly effective month-long evangelistic mega-city campaigns spear-headed by GCM Ministries have taken place in Russia, Central Asia, India, Nepal, the Middle East, Cuba, South America, and even Israel. This has been an extremely effective way of bringing in the harvest of this generation for the Kingdom of God.",
  campaignsImage = "/placeholder.svg?height=400&width=600",

  // Jewish Ministry
  jewishTitle = "Ministry to the Jewish People",
  jewishSubtitle = "Preaching the Gospel to the Jews is first and foremost",
  jewishDescription1 = "Each day of the year is a new opportunity that we want to use for the Kingdom of God.",
  jewishDescription2 = 'The Bible speaks of "hearing of wars and rumors of wars". This should not alarm us, but encourage us to preach the Gospel, as according to the Gospel of Mark the end is still to come. (Mark 13:7-10)',
  jewishDescription3 = "The GCMM Israel ministry department's main goal again this year is to share the Gospel with Jews worldwide. The cornerstone of this ministry is media production. We produce programming for many TV channels, for radio, and social media for Russian-speaking Jews.",
  jewishImage = "/placeholder.svg?height=400&width=600",

  // Children's Aid
  childrenTitle = "Poverty Aid to Children",
  childrenDescription = "GCM Ministries delivers clothing essentials, hygiene products, food, and the gospel message to children suffering in areas where evangelistic media campaigns are held. We try to help those with the most need, spiritually and physically.",
  childrenImage = "/placeholder.svg?height=400&width=600",

  // Islamic World
  islamicTitle = "The Arab and Islamic World",
  islamicSubtitle = "The Challenges of Reaching 1.4 Billion Muslims",
  islamicDescription1 = "There are about 1.4 billion Muslims in the World. That is approximately 21% of the world's population.",
  islamicDescription2 = "The largest Islamic area is located between the 10 and 40-degree parallels known as the 10/40 Window, where 300 million people live. 80% of them have not heard the Gospel even one time.",
  islamicDescription3 = "We want to facilitate disciple-making movements in every Arab and Muslim country, which will eventually lead to the formation and growth of new churches in countries and areas where there are none. This is why our mission to reach them is so challenging.",
  islamicDescription4 = "GCM Ministries uses all means possible to meet this challenge using TV, Radio, the Internet, literature, outreach, humanitarian aid, and training the Christians to spread the Good News and salvation message to the Arab and Islamic world.",
  islamicImage = "/placeholder.svg?height=400&width=600",

  // Feature Card Styling
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
}: {
  className?: string
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
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
  campaignsTitle?: string
  campaignsDescription?: string
  campaignsImage?: string
  jewishTitle?: string
  jewishSubtitle?: string
  jewishDescription1?: string
  jewishDescription2?: string
  jewishDescription3?: string
  jewishImage?: string
  childrenTitle?: string
  childrenDescription?: string
  childrenImage?: string
  islamicTitle?: string
  islamicSubtitle?: string
  islamicDescription1?: string
  islamicDescription2?: string
  islamicDescription3?: string
  islamicDescription4?: string
  islamicImage?: string
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
}) {
  // Animation states for each section
  const [heroVisible, setHeroVisible] = useState(false)
  const [campaignsVisible, setCampaignsVisible] = useState(false)
  const [jewishVisible, setJewishVisible] = useState(false)
  const [childrenVisible, setChildrenVisible] = useState(false)
  const [islamicVisible, setIslamicVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  // Refs for each section
  const heroRef = useRef<HTMLElement>(null)
  const campaignsRef = useRef<HTMLElement>(null)
  const jewishRef = useRef<HTMLElement>(null)
  const childrenRef = useRef<HTMLElement>(null)
  const islamicRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  // Setup intersection observers
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-50px 0px",
    }

    const observers = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: campaignsRef, setter: setCampaignsVisible },
      { ref: jewishRef, setter: setJewishVisible },
      { ref: childrenRef, setter: setChildrenVisible },
      { ref: islamicRef, setter: setIslamicVisible },
      { ref: ctaRef, setter: setCtaVisible },
    ].map(({ ref, setter }) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setter(true)
        }
      }, observerOptions)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const featureCards = [
    {
      icon: BillboardIcon, // Using custom billboard icon
      title: feature1Title,
      subtitle: feature1Subtitle,
      description: feature1Description,
      image: feature1Image,
      link: feature1Link,
    },
    {
      icon: SatelliteDish, // Using lucide-react satellite dish icon
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
      icon: StarOfDavidIcon, // Using custom Star of David icon (six-pointed hexagram)
      title: feature4Title,
      subtitle: feature4Subtitle,
      description: feature4Description,
      image: feature4Image,
      link: feature4Link,
    },
    {
      icon: HelpingHandsIcon, // Using custom helping hands icon
      title: feature5Title,
      subtitle: feature5Subtitle,
      description: feature5Description,
      image: feature5Image,
      link: feature5Link,
    },
  ]

  return (
    <main className={`overflow-hidden ${className || ""}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 lg:py-40 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-20">
            <h1
              className={`text-6xl lg:text-7xl font-light text-gray-900 leading-[0.9] mb-8 tracking-tight transition-all duration-1200 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <span className="text-blue-500 font-extralight">{heroTitle}</span>
              <br />
              <span className="text-blue-900 font-normal">{heroSubtitle}</span>
            </h1>

            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {heroDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featureCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: (500 + index * 100) / 1000 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                style={{
                  backgroundColor: featureCardBgColor,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: featureCardBorderColor,
                }}
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={heroVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (800 + index * 100) / 1000,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: featureCardIconBgColor }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: featureCardIconColor }} />
                  </motion.div>
                  <h3
                    className="text-base font-serif font-medium mb-1 leading-tight"
                    style={{ color: featureCardTitleColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium mb-2 italic" style={{ color: featureCardSubtitleColor }}>
                    {item.subtitle}
                  </p>
                  <p
                    className="text-sm leading-relaxed font-light flex-grow mb-3"
                    style={{ color: featureCardDescriptionColor }}
                  >
                    {item.description}
                  </p>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-auto bg-transparent text-xs"
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
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mega City Campaigns */}
      <section ref={campaignsRef} className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={campaignsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">{campaignsTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">{campaignsDescription}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={campaignsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <Image src={campaignsImage || "/placeholder.svg"} alt={campaignsTitle} fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Jewish Ministry */}
      <section ref={jewishRef} className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={jewishVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-xl order-2 lg:order-1"
            >
              <Image src={jewishImage || "/placeholder.svg"} alt={jewishTitle} fill className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={jewishVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-2 tracking-tight">{jewishTitle}</h2>
              <p className="text-xl text-blue-600 font-light mb-8">{jewishSubtitle}</p>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed font-light">{jewishDescription1}</p>
                <p className="text-gray-600 leading-relaxed font-light">{jewishDescription2}</p>
                <p className="text-gray-600 leading-relaxed font-light">{jewishDescription3}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Children's Aid */}
      <section ref={childrenRef} className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={childrenVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">{childrenTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">{childrenDescription}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={childrenVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <Image src={childrenImage || "/placeholder.svg"} alt={childrenTitle} fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Islamic World */}
      <section ref={islamicRef} className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={islamicVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-xl order-2 lg:order-1"
            >
              <Image src={islamicImage || "/placeholder.svg"} alt={islamicTitle} fill className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={islamicVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-2 tracking-tight">{islamicTitle}</h2>
              <p className="text-xl text-blue-600 font-light mb-8">{islamicSubtitle}</p>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed font-light">{islamicDescription1}</p>
                <p className="text-gray-600 leading-relaxed font-light">{islamicDescription2}</p>
                <p className="text-gray-600 leading-relaxed font-light">{islamicDescription3}</p>
                <p className="text-gray-600 leading-relaxed font-light">{islamicDescription4}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
