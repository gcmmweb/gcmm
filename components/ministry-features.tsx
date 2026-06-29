"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, SatelliteDish, Heart } from "lucide-react"
import Link from "next/link"
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

export function MinistryFeatures({
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
  cardBgColor = "#ffffff",
  cardBorderColor = "#e5e7eb",
  iconBgColor = "#f1f5f9",
  iconColor = "#334155",
  titleColor = "#0f172a",
  subtitleColor = "#475569",
  descriptionColor = "#475569",
  buttonBorderColor = "#e5e7eb",
  buttonTextColor = "#000000",
  buttonHoverBgColor = "#f9fafb",
  sectionBgColor = "#ffffff",
  sectionPaddingY = 96,
}: {
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
  cardBgColor?: string
  cardBorderColor?: string
  iconBgColor?: string
  iconColor?: string
  titleColor?: string
  subtitleColor?: string
  descriptionColor?: string
  buttonBorderColor?: string
  buttonTextColor?: string
  buttonHoverBgColor?: string
  sectionBgColor?: string
  sectionPaddingY?: number
}) {
  const features = [
    {
      title: feature1Title,
      subtitle: feature1Subtitle,
      description: feature1Description,
      image: feature1Image,
      link: feature1Link,
    },
    {
      title: feature2Title,
      subtitle: feature2Subtitle,
      description: feature2Description,
      image: feature2Image,
      link: feature2Link,
    },
    {
      title: feature3Title,
      subtitle: feature3Subtitle,
      description: feature3Description,
      image: feature3Image,
      link: feature3Link,
    },
    {
      title: feature4Title,
      subtitle: feature4Subtitle,
      description: feature4Description,
      image: feature4Image,
      link: feature4Link,
    },
    {
      title: feature5Title,
      subtitle: feature5Subtitle,
      description: feature5Description,
      image: feature5Image,
      link: feature5Link,
    },
  ]

  const featureIcons = [BillboardIcon, SatelliteDish, BookOpen, StarOfDavidIcon, Heart]

  return (
    <section
      style={{
        backgroundColor: sectionBgColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6 items-start">
          {features.map((item, index) => {
            const IconComponent = featureIcons[index] || BillboardIcon
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                style={{
                  backgroundColor: cardBgColor,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: cardBorderColor,
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
                    style={{ backgroundColor: iconBgColor }}
                  >
                    {React.createElement(IconComponent, { className: "w-6 h-6", style: { color: iconColor } })}
                  </motion.div>
                  <h3
                    className="text-lg font-serif font-medium mb-2 leading-tight"
                    style={{ color: titleColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium mb-3 italic" style={{ color: subtitleColor }}>
                    {item.subtitle}
                  </p>
                  <p
                    className="text-sm leading-relaxed font-light flex-grow mb-4"
                    style={{ color: descriptionColor }}
                  >
                    {item.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-auto bg-transparent"
                    style={{
                      borderColor: buttonBorderColor,
                      color: buttonTextColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = buttonHoverBgColor
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
            )
          })}
        </div>
      </div>
    </section>
  )
}