"use client"

// components/home-feature-cards.tsx
// The row of five ministry cards on the homepage.
// Split out of main-page-cinematic.tsx (Oct 2026). All setting names and
// defaults are the same as the old "Cinematic Main Page", so values carry over
// in Plasmic Studio.
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, SatelliteDish, Heart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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

export function HomeFeatureCards({
  className,
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
  feature1Description = "Through 30-day Mega City Media Campaigns, GCMM partners with local churches to bring evangelism to an unprecedented scale\u2014saturating cities with the Gospel through TV, radio, billboards, and digital media, fulfilling the Great Commission, one city at a time.",
  feature1Image = "/city-media-campaign-billboard.jpg",
  feature1Link = "/campaigns",
  feature2Title = "Media Outreach to the 10/40 Window",
  feature2Subtitle = "Reaching Hearts Behind Closed Doors",
  feature2Description = "GCMM reaches millions in the Arabic world through satellite TV and social media\u2014broadcasting in 7 languages via 18 satellites. With 1,300 programs produced annually and 200,000 monthly viewer interactions, we provide personal discipleship and partner with underground churches.",
  feature2Image = "/satellite-dish-broadcasting.jpg",
  feature2Link = "/arabic-ministry",
  feature3Title = "Recovery from Trauma",
  feature3Subtitle = "Restoring Souls in a Wounded Nation",
  feature3Description = "GCMM's Christ-centred book, Recovery from Trauma, brings healing through Psalm 23, expert guidance, and real-life stories. Created with Ukrainian Christian psychologists, it offers peace to a hurting nation\u2014meeting spiritual hunger with Gospel hope.",
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
                <img src={item.image || "/placeholder.svg"} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
