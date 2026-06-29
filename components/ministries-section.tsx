"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, SatelliteDish, BookOpen, Heart } from "lucide-react"

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

const HandHeartIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export interface MinistriesSectionProps {
  className?: string

  // Section
  sectionBgColor?: string
  sectionPaddingY?: number

  // Card 1 — Mega City Media Campaigns
  card1Image?: string
  card1Title?: string
  card1Description?: string
  card1Link?: string

  // Card 2 — Satellite Media Outreach
  card2Image?: string
  card2Title?: string
  card2Description?: string
  card2Link?: string

  // Card 3 — Media Outreach in Ukraine
  card3Image?: string
  card3Title?: string
  card3Description?: string
  card3Link?: string

  // Card 4 — Jewish Ministry
  card4Image?: string
  card4Title?: string
  card4Description?: string
  card4Link?: string

  // Card 5 — UkraineAid
  card5Image?: string
  card5Title?: string
  card5Description?: string
  card5Link?: string

  // Card styling
  cardBgColor?: string
  cardBorderColor?: string
  cardBorderRadius?: string
  cardShadow?: string
  cardHoverShadow?: string

  // Image styling
  imageHeight?: number

  // Icon styling
  showIcon?: boolean
  iconBgColor?: string
  iconColor?: string

  // Text styling
  titleColor?: string
  titleSize?: string
  descriptionColor?: string
  descriptionSize?: string

  // Button styling
  buttonBorderColor?: string
  buttonTextColor?: string
  buttonHoverBgColor?: string
  buttonLabel?: string
}

export const MinistriesSection: React.FC<MinistriesSectionProps> = ({
  className = "",

  sectionBgColor = "#ffffff",
  sectionPaddingY = 96,

  card1Image = "/city-media-campaign-billboard.jpg",
  card1Title = "Mega City Media Campaigns",
  card1Description = "Help an entire city encounter the message of Christ.",
  card1Link = "/megacitymediacampaigns",

  card2Image = "/satellite-dish-broadcasting.jpg",
  card2Title = "Satellite Media Outreach in the 10/40 Window",
  card2Description = "Bring Gospel to seekers beyond ordinary access.",
  card2Link = "/satellitemediaoutreach",

  card3Image = "/humanitarian-aid-supplies.jpg",
  card3Title = "Media Outreach in Ukraine",
  card3Description = "Bring Gospel & trauma resources to people living through the war.",
  card3Link = "/mediaoutreach",

  card4Image = "/jerusalem-israel-ministry.jpg",
  card4Title = "Jewish Ministry",
  card4Description = "Bless the people of Israel through trauma resources, media, and compassionate care.",
  card4Link = "/jewishministry",

  card5Image = "/ukraine-aid-stoves.jpg",
  card5Title = "UkraineAid",
  card5Description = "Help families survive the realities of war with wood-burning stoves, medical supplies, and food.",
  card5Link = "/ukraineaid",

  cardBgColor = "#ffffff",
  cardBorderColor = "#e5e7eb",
  cardBorderRadius = "0.5rem",
  cardShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  cardHoverShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",

  imageHeight = 192,

  showIcon = true,
  iconBgColor = "#f1f5f9",
  iconColor = "#334155",

  titleColor = "#0f172a",
  titleSize = "18px",
  descriptionColor = "#475569",
  descriptionSize = "14px",

  buttonBorderColor = "#e5e7eb",
  buttonTextColor = "#000000",
  buttonHoverBgColor = "#f9fafb",
  buttonLabel = "Learn More",
}) => {
  const cards = [
    { image: card1Image, title: card1Title, description: card1Description, link: card1Link, icon: BillboardIcon },
    { image: card2Image, title: card2Title, description: card2Description, link: card2Link, icon: SatelliteDish },
    { image: card3Image, title: card3Title, description: card3Description, link: card3Link, icon: BookOpen },
    { image: card4Image, title: card4Title, description: card4Description, link: card4Link, icon: StarOfDavidIcon },
    { image: card5Image, title: card5Title, description: card5Description, link: card5Link, icon: HandHeartIcon },
  ]

  return (
    <section
      className={className}
      style={{
        backgroundColor: sectionBgColor,
        paddingTop: sectionPaddingY,
        paddingBottom: sectionPaddingY,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                style={{
                  backgroundColor: cardBgColor,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: cardBorderColor,
                  borderRadius: cardBorderRadius,
                  boxShadow: cardShadow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = cardHoverShadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = cardShadow
                }}
              >
                <div className="relative w-full overflow-hidden" style={{ height: imageHeight }}>
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  {showIcon && (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: iconBgColor }}
                    >
                      <Icon className="w-5 h-5" style={{ color: iconColor }} />
                    </div>
                  )}
                  <h3
                    className="font-serif font-medium mb-3 leading-tight"
                    style={{ color: titleColor, fontSize: titleSize }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="italic leading-relaxed font-light flex-grow mb-4"
                    style={{ color: descriptionColor, fontSize: descriptionSize }}
                  >
                    {card.description}
                  </p>
                  {card.link && (
                    <Link
                      href={card.link}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors w-full mt-auto"
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: buttonBorderColor,
                        color: buttonTextColor,
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = buttonHoverBgColor
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      {buttonLabel}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MinistriesSection
