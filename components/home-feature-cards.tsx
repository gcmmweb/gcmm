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
  feature1Subtitle = "Help an entire city encounter the message of Christ.",
  feature1Description = "",
  feature1Image = "https://site-assets.plasmic.app/3c6c2f6072f409f64a84563e0f0715e4.webp",
  feature1Link = "/megacitymediacampaigns",
  feature2Title = "Satellite Media Outreach in the 10/40 Window",
  feature2Subtitle = "Bring Gospel to seekers beyond ordinary access.",
  feature2Description = "",
  feature2Image = "https://site-assets.plasmic.app/0bc259f4fe692a5c053db674009e935e.webp",
  feature2Link = "/10-40-media-outreach",
  feature3Title = "Media Outreach in Ukraine",
  feature3Subtitle = "Bring Gospel & trauma resources to people living through the war.",
  feature3Description = "",
  feature3Image = "https://site-assets.plasmic.app/c0e492a8ebfcddf9273d44e09ad742fc.webp",
  feature3Link = "/media-outreach-in-ukraine",
  feature4Title = "Jewish Ministry",
  feature4Subtitle = "Bless the people of Israel through trauma resources, media, and compassionate care.",
  feature4Description = "",
  feature4Image = "https://site-assets.plasmic.app/90ab16a2c52e4afbd1d9683f2d4158e8.webp",
  feature4Link = "/israel-jewish-ministries",
  feature5Title = "UkraineAid",
  feature5Subtitle = "Help families survive the realities of war with wood-burning stoves, medical supplies, and food.",
  feature5Description = "",
  feature5Image = "https://site-assets.plasmic.app/923d7350db73b3af668b0311dec7c4e4.webp",
  feature5Link = "/ukraineaid",
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
