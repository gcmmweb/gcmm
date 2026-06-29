"use client"

import { Facebook, Youtube, Instagram } from "lucide-react"
import { useState } from "react"

export function FooterSection({
  className,
  designerName = "Winston MacCabe.",
  designerUrl = "https://winstonmaccabe.com",
  slogan = "All Nations. All Media. This Generation.",
  copyrightText = "© 2025 Great Commission Media Ministries.",
  charityText = "Canadian Registered Charity: 82864 9467 RR0001",
  facebookUrl = "https://facebook.com",
  instagramUrl = "https://instagram.com",
  youtubeUrl = "https://youtube.com",
  giveUrl = "#",
  contactUrl = "#",
  giveButtonText = "GIVE NOW",
  contactButtonText = "CONTACT US",
  footerBackgroundColor = "#1e293b",
  designerBackgroundColor = "#000000",
  sloganTextColor = "#facc15",
  copyrightTextColor = "#ffffff",
  charityTextColor = "#ffffff",
  socialIconColor = "#ffffff",
  socialIconHoverColor = "#facc15",
  giveButtonBackgroundColor = "#ca8a04",
  giveButtonHoverBackgroundColor = "#a16207",
  giveButtonTextColor = "#000000",
  contactButtonBorderColor = "#ffffff",
  contactButtonTextColor = "#ffffff",
  contactButtonHoverBackgroundColor = "#ffffff",
  contactButtonHoverTextColor = "#1e293b",
  designerTextColor = "#ffffff",
  designerLinkColor = "#facc15",
  designerLinkHoverColor = "#fde047",
  dividerColor = "#4b5563",
  separatorColor = "#9ca3af",
  mainFooterPaddingY = "24px",
  socialIconGap = "32px",
  buttonGap = "16px",
  copyrightSectionPaddingY = "16px",
  designerSectionPaddingY = "8px",
  socialIconSize = 24,
}: {
  className?: string
  designerName?: string
  designerUrl?: string
  slogan?: string
  copyrightText?: string
  charityText?: string
  facebookUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  giveUrl?: string
  contactUrl?: string
  giveButtonText?: string
  contactButtonText?: string
  footerBackgroundColor?: string
  designerBackgroundColor?: string
  sloganTextColor?: string
  copyrightTextColor?: string
  charityTextColor?: string
  socialIconColor?: string
  socialIconHoverColor?: string
  giveButtonBackgroundColor?: string
  giveButtonHoverBackgroundColor?: string
  giveButtonTextColor?: string
  contactButtonBorderColor?: string
  contactButtonTextColor?: string
  contactButtonHoverBackgroundColor?: string
  contactButtonHoverTextColor?: string
  designerTextColor?: string
  designerLinkColor?: string
  designerLinkHoverColor?: string
  dividerColor?: string
  separatorColor?: string
  mainFooterPaddingY?: string
  socialIconGap?: string
  buttonGap?: string
  copyrightSectionPaddingY?: string
  designerSectionPaddingY?: string
  socialIconSize?: number
}) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [hoveredGiveButton, setHoveredGiveButton] = useState(false)
  const [hoveredContactButton, setHoveredContactButton] = useState(false)
  const [hoveredDesignerLink, setHoveredDesignerLink] = useState(false)

  return (
    <footer style={{ backgroundColor: footerBackgroundColor, color: copyrightTextColor }} className={className || ""}>
      {/* Main Footer Bar */}
      <div
        className="w-full px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: mainFooterPaddingY, paddingBottom: mainFooterPaddingY }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Slogan - Full width on mobile, flex-1 on desktop */}
          <div className="w-full lg:flex-1 text-center lg:text-left">
            <h3 style={{ color: sloganTextColor }} className="text-base sm:text-lg font-medium leading-tight">
              {slogan}
            </h3>
          </div>

          {/* Social Icons - Centered on all screens */}
          <div className="flex" style={{ gap: socialIconGap }}>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              onMouseEnter={() => setHoveredSocial("facebook")}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                color: hoveredSocial === "facebook" ? socialIconHoverColor : socialIconColor,
                transition: "color 200ms",
              }}
            >
              <Facebook size={socialIconSize} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onMouseEnter={() => setHoveredSocial("instagram")}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                color: hoveredSocial === "instagram" ? socialIconHoverColor : socialIconColor,
                transition: "color 200ms",
              }}
            >
              <Instagram size={socialIconSize} />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              onMouseEnter={() => setHoveredSocial("youtube")}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                color: hoveredSocial === "youtube" ? socialIconHoverColor : socialIconColor,
                transition: "color 200ms",
              }}
            >
              <Youtube size={socialIconSize} />
            </a>
          </div>

          {/* Action Buttons - Full width on mobile, flex-1 on desktop */}
          <div
            className="w-full lg:flex-1 flex flex-col sm:flex-row justify-center lg:justify-end gap-3 sm:gap-4"
            style={{ gap: buttonGap }}
          >
            <a
              href={giveUrl}
              className="px-6 py-2.5 rounded font-semibold text-sm text-center whitespace-nowrap"
              onMouseEnter={() => setHoveredGiveButton(true)}
              onMouseLeave={() => setHoveredGiveButton(false)}
              style={{
                backgroundColor: hoveredGiveButton ? giveButtonHoverBackgroundColor : giveButtonBackgroundColor,
                color: giveButtonTextColor,
                transition: "background-color 200ms",
              }}
            >
              {giveButtonText}
            </a>
            <a
              href={contactUrl}
              className="px-6 py-2.5 rounded font-semibold text-sm text-center whitespace-nowrap"
              onMouseEnter={() => setHoveredContactButton(true)}
              onMouseLeave={() => setHoveredContactButton(false)}
              style={{
                backgroundColor: hoveredContactButton ? contactButtonHoverBackgroundColor : "transparent",
                color: hoveredContactButton ? contactButtonHoverTextColor : contactButtonTextColor,
                border: `2px solid ${contactButtonBorderColor}`,
                transition: "background-color 200ms, color 200ms",
              }}
            >
              {contactButtonText}
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${dividerColor}` }}></div>

      <div
        style={{
          backgroundColor: footerBackgroundColor,
          paddingTop: copyrightSectionPaddingY,
          paddingBottom: copyrightSectionPaddingY,
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-center">
            <span style={{ color: copyrightTextColor }}>{copyrightText}</span>
            <span className="hidden sm:inline" style={{ color: separatorColor }}>
              |
            </span>
            <span style={{ color: charityTextColor }}>{charityText}</span>
          </div>
        </div>
      </div>

      {/* Designer Credit */}
      <div
        style={{
          backgroundColor: designerBackgroundColor,
          paddingTop: designerSectionPaddingY,
          paddingBottom: designerSectionPaddingY,
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs" style={{ color: designerTextColor }}>
              {"Designed by "}
              <a
                href={designerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                onMouseEnter={() => setHoveredDesignerLink(true)}
                onMouseLeave={() => setHoveredDesignerLink(false)}
                style={{
                  color: hoveredDesignerLink ? designerLinkHoverColor : designerLinkColor,
                  transition: "color 200ms",
                }}
              >
                {designerName}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
