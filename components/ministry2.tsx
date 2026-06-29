"use client"
import Image from "next/image"

interface MinistryPageProps {
  className?: string

  // Section Visibility Toggles
  showHeroSection?: boolean
  showIntroSection?: boolean
  showTextSection1?: boolean
  showTextSection2?: boolean
  showTextSection3?: boolean
  showTextSection4?: boolean
  showImageGallerySection?: boolean
  showTestimonialSection?: boolean
  showVideoSection?: boolean

  // Hero Section
  heroImage?: string
  heroImageAlt?: string
  heroHeight?: string
  heroOverline?: string
  heroTitle?: string
  heroSubtitle?: string
  heroBackgroundColor?: string
  heroTextColor?: string
  heroOverlineFontSize?: string
  heroTitleFontSize?: string
  heroSubtitleFontSize?: string
  heroOverlineLineHeight?: string
  heroTitleLineHeight?: string
  heroSubtitleLineHeight?: string
  heroOverlineFontWeight?: "normal" | "bold"
  heroTitleFontWeight?: "normal" | "bold"
  heroSubtitleFontWeight?: "normal" | "bold"
  heroOverlineFontStyle?: "normal" | "italic"
  heroTitleFontStyle?: "normal" | "italic"
  heroSubtitleFontStyle?: "normal" | "italic"

  // Intro Section
  introHeading?: string
  introText?: string
  introHighlightText?: string
  introBackgroundColor?: string
  introTextColor?: string
  introAlignment?: "left" | "center" | "right" | "justify"
  introShowButton?: boolean
  introButtonText?: string
  introButtonLink?: string
  introButtonColor?: string
  introButtonTextColor?: string
  introHeadingFontSize?: string
  introTextFontSize?: string
  introButtonFontSize?: string
  introHeadingLineHeight?: string
  introTextLineHeight?: string
  introHeadingFontWeight?: "normal" | "bold"
  introTextFontWeight?: "normal" | "bold"
  introHeadingFontStyle?: "normal" | "italic"
  introTextFontStyle?: "normal" | "italic"

  // Text Section 1
  textSection1Heading?: string
  textSection1Body?: string
  textSection1BackgroundColor?: string
  textSection1TextColor?: string
  textSection1Alignment?: "left" | "center" | "right" | "justify"
  textSection1ShowImage?: boolean
  textSection1Image?: string
  textSection1ImageAlt?: string
  textSection1ImageHeight?: string
  textSection1ShowButton?: boolean
  textSection1ButtonText?: string
  textSection1ButtonLink?: string
  textSection1ButtonColor?: string
  textSection1ButtonTextColor?: string
  textSection1HeadingFontSize?: string
  textSection1BodyFontSize?: string
  textSection1ButtonFontSize?: string
  textSection1HeadingLineHeight?: string
  textSection1BodyLineHeight?: string
  textSection1HeadingFontWeight?: "normal" | "bold"
  textSection1BodyFontWeight?: "normal" | "bold"
  textSection1HeadingFontStyle?: "normal" | "italic"
  textSection1BodyFontStyle?: "normal" | "italic"

  // Text Section 2
  textSection2Heading?: string
  textSection2Body?: string
  textSection2BackgroundColor?: string
  textSection2TextColor?: string
  textSection2Alignment?: "left" | "center" | "right" | "justify"
  textSection2ShowImage?: boolean
  textSection2Image?: string
  textSection2ImageAlt?: string
  textSection2ImageHeight?: string
  textSection2ShowButton?: boolean
  textSection2ButtonText?: string
  textSection2ButtonLink?: string
  textSection2ButtonColor?: string
  textSection2ButtonTextColor?: string
  textSection2HeadingFontSize?: string
  textSection2BodyFontSize?: string
  textSection2ButtonFontSize?: string
  textSection2HeadingLineHeight?: string
  textSection2BodyLineHeight?: string
  textSection2HeadingFontWeight?: "normal" | "bold"
  textSection2BodyFontWeight?: "normal" | "bold"
  textSection2HeadingFontStyle?: "normal" | "italic"
  textSection2BodyFontStyle?: "normal" | "italic"

  // Text Section 3
  textSection3Heading?: string
  textSection3Body?: string
  textSection3BackgroundColor?: string
  textSection3TextColor?: string
  textSection3Alignment?: "left" | "center" | "right" | "justify"
  textSection3ShowImage?: boolean
  textSection3Image?: string
  textSection3ImageAlt?: string
  textSection3ImageHeight?: string
  textSection3ShowButton?: boolean
  textSection3ButtonText?: string
  textSection3ButtonLink?: string
  textSection3ButtonColor?: string
  textSection3ButtonTextColor?: string
  textSection3HeadingFontSize?: string
  textSection3BodyFontSize?: string
  textSection3ButtonFontSize?: string
  textSection3HeadingLineHeight?: string
  textSection3BodyLineHeight?: string
  textSection3HeadingFontWeight?: "normal" | "bold"
  textSection3BodyFontWeight?: "normal" | "bold"
  textSection3HeadingFontStyle?: "normal" | "italic"
  textSection3BodyFontStyle?: "normal" | "italic"

  // Text Section 4
  textSection4Heading?: string
  textSection4Body?: string
  textSection4BackgroundColor?: string
  textSection4TextColor?: string
  textSection4Alignment?: "left" | "center" | "right" | "justify"
  textSection4ShowImage?: boolean
  textSection4Image?: string
  textSection4ImageAlt?: string
  textSection4ImageHeight?: string
  textSection4ShowButton?: boolean
  textSection4ButtonText?: string
  textSection4ButtonLink?: string
  textSection4ButtonColor?: string
  textSection4ButtonTextColor?: string
  textSection4HeadingFontSize?: string
  textSection4BodyFontSize?: string
  textSection4ButtonFontSize?: string
  textSection4HeadingLineHeight?: string
  textSection4BodyLineHeight?: string
  textSection4HeadingFontWeight?: "normal" | "bold"
  textSection4BodyFontWeight?: "normal" | "bold"
  textSection4HeadingFontStyle?: "normal" | "italic"
  textSection4BodyFontStyle?: "normal" | "italic"

  // Image Gallery Section
  galleryHeading?: string
  galleryImage1?: string
  galleryImage2?: string
  galleryImage3?: string
  galleryImageHeight?: string
  galleryBackgroundColor?: string
  galleryHeadingFontSize?: string
  galleryHeadingLineHeight?: string
  galleryHeadingFontWeight?: "normal" | "bold"
  galleryHeadingFontStyle?: "normal" | "italic"

  // Testimonial Section
  testimonialQuote?: string
  testimonialAuthor?: string
  testimonialRole?: string
  testimonialImage?: string
  testimonialImageSize?: string
  testimonialBackgroundColor?: string
  testimonialTextColor?: string
  testimonialQuoteFontSize?: string
  testimonialAuthorFontSize?: string
  testimonialRoleFontSize?: string
  testimonialQuoteLineHeight?: string
  testimonialAuthorLineHeight?: string
  testimonialRoleLineHeight?: string
  testimonialQuoteFontWeight?: "normal" | "bold"
  testimonialAuthorFontWeight?: "normal" | "bold"
  testimonialRoleFontWeight?: "normal" | "bold"
  testimonialQuoteFontStyle?: "normal" | "italic"
  testimonialAuthorFontStyle?: "normal" | "italic"
  testimonialRoleFontStyle?: "normal" | "italic"

  // Video Section
  videoHeading?: string
  videoSubheading?: string
  videoEmbedUrl?: string
  videoBackgroundColor?: string
  videoHeadingFontSize?: string
  videoSubheadingFontSize?: string
  videoHeadingLineHeight?: string
  videoSubheadingLineHeight?: string
  videoHeadingFontWeight?: "normal" | "bold"
  videoSubheadingFontWeight?: "normal" | "bold"
  videoHeadingFontStyle?: "normal" | "italic"
  videoSubheadingFontStyle?: "normal" | "italic"
  videoSectionPaddingY?: number
  videoSectionPaddingX?: number
  videoSectionMarginY?: number
  videoMaxWidth?: string
}

export function Ministry2({
  className = "",

  // Section Visibility
  showHeroSection = true,
  showIntroSection = true,
  showTextSection1 = true,
  showTextSection2 = true,
  showTextSection3 = true,
  showTextSection4 = true,
  showImageGallerySection = true,
  showTestimonialSection = true,
  showVideoSection = true,

  // Hero Section
  heroImage = "/images/image.png",
  heroImageAlt = "Ministry impact across cities",
  heroHeight = "700px",
  heroOverline = "TRANSFORMING COMMUNITIES",
  heroTitle = "Mega City Media Campaigns",
  heroSubtitle = "Reaching millions with hope and faith through strategic media outreach",
  heroBackgroundColor = "#1e293b",
  heroTextColor = "#ffffff",
  heroOverlineFontSize = "0.875rem",
  heroTitleFontSize = "3rem",
  heroSubtitleFontSize = "1.25rem",
  heroOverlineLineHeight = "1.5",
  heroTitleLineHeight = "1.2",
  heroSubtitleLineHeight = "1.5",
  heroOverlineFontWeight = "bold",
  heroTitleFontWeight = "normal",
  heroSubtitleFontWeight = "normal",
  heroOverlineFontStyle = "normal",
  heroTitleFontStyle = "normal",
  heroSubtitleFontStyle = "normal",

  // Intro Section
  introHeading = "It's all about the Great Commission",
  introText = "GCM Ministries has, together with thousands of local churches, conducted",
  introHighlightText = "more than 110 city-wide, high-intensity Mega City Media Campaigns.",
  introBackgroundColor = "#f8fafc",
  introTextColor = "#1e293b",
  introAlignment = "center",
  introShowButton = false,
  introButtonText = "Learn More",
  introButtonLink = "#",
  introButtonColor = "#1e40af",
  introButtonTextColor = "#ffffff",
  introHeadingFontSize = "2.25rem",
  introTextFontSize = "1.25rem",
  introButtonFontSize = "1rem",
  introHeadingLineHeight = "1.3",
  introTextLineHeight = "1.6",
  introHeadingFontWeight = "normal",
  introTextFontWeight = "normal",
  introHeadingFontStyle = "normal",
  introTextFontStyle = "normal",

  // Text Section 1
  textSection1Heading = "Our Approach",
  textSection1Body = "Through strategic partnerships with local churches and communities, we create targeted media campaigns that reach people where they are. Our multi-platform approach includes television broadcasts, radio programs, digital content, and community events that work together to share a message of hope and transformation.",
  textSection1BackgroundColor = "#ffffff",
  textSection1TextColor = "#1e293b",
  textSection1Alignment = "left",
  textSection1ShowImage = false,
  textSection1Image = "/community-gathering-ministry.jpg",
  textSection1ImageAlt = "Ministry approach",
  textSection1ImageHeight = "400px",
  textSection1ShowButton = false,
  textSection1ButtonText = "Discover Our Method",
  textSection1ButtonLink = "#",
  textSection1ButtonColor = "#1e40af",
  textSection1ButtonTextColor = "#ffffff",
  textSection1HeadingFontSize = "1.875rem",
  textSection1BodyFontSize = "1.125rem",
  textSection1ButtonFontSize = "1rem",
  textSection1HeadingLineHeight = "1.3",
  textSection1BodyLineHeight = "1.6",
  textSection1HeadingFontWeight = "normal",
  textSection1BodyFontWeight = "normal",
  textSection1HeadingFontStyle = "normal",
  textSection1BodyFontStyle = "normal",

  // Text Section 2
  textSection2Heading = "Global Impact",
  textSection2Body = "From the bustling streets of major urban centers to remote communities around the world, our ministry has touched lives across multiple continents. Each campaign is carefully tailored to the cultural context and spiritual needs of the region, ensuring that the message resonates authentically with local populations.",
  textSection2BackgroundColor = "#f1f5f9",
  textSection2TextColor = "#1e293b",
  textSection2Alignment = "center",
  textSection2ShowImage = false,
  textSection2Image = "/media-campaign-billboard.jpg",
  textSection2ImageAlt = "Global impact",
  textSection2ImageHeight = "400px",
  textSection2ShowButton = false,
  textSection2ButtonText = "View Our Reach",
  textSection2ButtonLink = "#",
  textSection2ButtonColor = "#1e40af",
  textSection2ButtonTextColor = "#ffffff",
  textSection2HeadingFontSize = "1.875rem",
  textSection2BodyFontSize = "1.125rem",
  textSection2ButtonFontSize = "1rem",
  textSection2HeadingLineHeight = "1.3",
  textSection2BodyLineHeight = "1.6",
  textSection2HeadingFontWeight = "normal",
  textSection2BodyFontWeight = "normal",
  textSection2HeadingFontStyle = "normal",
  textSection2BodyFontStyle = "normal",

  // Text Section 3
  textSection3Heading = "Lasting Change",
  textSection3Body = "The true measure of our success is not in numbers alone, but in the transformed lives and strengthened communities we witness. Through follow-up programs and ongoing support, we ensure that the impact of our campaigns continues long after the initial outreach, fostering sustainable spiritual growth and community development.",
  textSection3BackgroundColor = "#1e40af",
  textSection3TextColor = "#ffffff",
  textSection3Alignment = "right",
  textSection3ShowImage = false,
  textSection3Image = "/broadcasting-studio-equipment.jpg",
  textSection3ImageAlt = "Lasting change",
  textSection3ImageHeight = "400px",
  textSection3ShowButton = false,
  textSection3ButtonText = "See the Results",
  textSection3ButtonLink = "#",
  textSection3ButtonColor = "#ffffff",
  textSection3ButtonTextColor = "#1e40af",
  textSection3HeadingFontSize = "1.875rem",
  textSection3BodyFontSize = "1.125rem",
  textSection3ButtonFontSize = "1rem",
  textSection3HeadingLineHeight = "1.3",
  textSection3BodyLineHeight = "1.6",
  textSection3HeadingFontWeight = "normal",
  textSection3BodyFontWeight = "normal",
  textSection3HeadingFontStyle = "normal",
  textSection3BodyFontStyle = "normal",

  // Text Section 4
  textSection4Heading = "Looking Forward",
  textSection4Body = "As we continue to expand our reach, we remain committed to innovation and excellence in ministry. New technologies and communication platforms provide unprecedented opportunities to share our message with even greater effectiveness, while maintaining the personal touch and cultural sensitivity that have always been hallmarks of our work.",
  textSection4BackgroundColor = "#0f172a",
  textSection4TextColor = "#ffffff",
  textSection4Alignment = "center",
  textSection4ShowImage = false,
  textSection4Image = "/ministry-leader-portrait.jpg",
  textSection4ImageAlt = "Looking forward",
  textSection4ImageHeight = "400px",
  textSection4ShowButton = false,
  textSection4ButtonText = "Join Our Vision",
  textSection4ButtonLink = "#",
  textSection4ButtonColor = "#fbbf24",
  textSection4ButtonTextColor = "#0f172a",
  textSection4HeadingFontSize = "1.875rem",
  textSection4BodyFontSize = "1.125rem",
  textSection4ButtonFontSize = "1rem",
  textSection4HeadingLineHeight = "1.3",
  textSection4BodyLineHeight = "1.6",
  textSection4HeadingFontWeight = "normal",
  textSection4BodyFontWeight = "normal",
  textSection4HeadingFontStyle = "normal",
  textSection4BodyFontStyle = "normal",

  // Image Gallery
  galleryHeading = "Our Impact in Action",
  galleryImage1 = "/media-campaign-billboard.jpg",
  galleryImage2 = "/community-gathering-ministry.jpg",
  galleryImage3 = "/broadcasting-studio-equipment.jpg",
  galleryImageHeight = "500px",
  galleryBackgroundColor = "#f1f5f9",
  galleryHeadingFontSize = "2.25rem",
  galleryHeadingLineHeight = "1.3",
  galleryHeadingFontWeight = "normal",
  galleryHeadingFontStyle = "normal",

  // Testimonial
  testimonialQuote = "Through these campaigns, we have seen entire communities transformed by the message of hope and faith.",
  testimonialAuthor = "John Haukka",
  testimonialRole = "Ministry Director",
  testimonialImage = "/ministry-leader-portrait.jpg",
  testimonialImageSize = "300px",
  testimonialBackgroundColor = "#1e40af",
  testimonialTextColor = "#ffffff",
  testimonialQuoteFontSize = "1.5rem",
  testimonialAuthorFontSize = "1.125rem",
  testimonialRoleFontSize = "1rem",
  testimonialQuoteLineHeight = "1.5",
  testimonialAuthorLineHeight = "1.4",
  testimonialRoleLineHeight = "1.5",
  testimonialQuoteFontWeight = "normal",
  testimonialAuthorFontWeight = "bold",
  testimonialRoleFontWeight = "normal",
  testimonialQuoteFontStyle = "italic",
  testimonialAuthorFontStyle = "normal",
  testimonialRoleFontStyle = "normal",

  // Video Section
  videoHeading = "See Our Ministry in Action",
  videoSubheading = "Watch how we are reaching communities around the world",
  videoEmbedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  videoBackgroundColor = "#0f172a",
  videoHeadingFontSize = "2.25rem",
  videoSubheadingFontSize = "1.25rem",
  videoHeadingLineHeight = "1.3",
  videoSubheadingLineHeight = "1.5",
  videoHeadingFontWeight = "normal",
  videoSubheadingFontWeight = "normal",
  videoHeadingFontStyle = "normal",
  videoSubheadingFontStyle = "normal",
  videoSectionPaddingY = 80,
  videoSectionPaddingX = 24,
  videoSectionMarginY = 0,
  videoMaxWidth = "56rem",
}: MinistryPageProps) {
  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      case "justify":
        return "text-justify"
      default:
        return "text-left"
    }
  }

  return (
    <div className={className}>
      {/* Hero Section */}
      {showHeroSection && (
        <section
          style={{
            backgroundColor: heroBackgroundColor,
            color: heroTextColor,
            minHeight: heroHeight,
          }}
          className="relative flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage || "/placeholder.svg"}
              alt={heroImageAlt}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
            <div 
              style={{ 
                fontSize: heroOverlineFontSize, 
                lineHeight: heroOverlineLineHeight,
                fontWeight: heroOverlineFontWeight,
                fontStyle: heroOverlineFontStyle
              }} 
              className="tracking-wider mb-6 opacity-90"
            >
              {heroOverline}
            </div>
            <h1 
              style={{ 
                fontSize: heroTitleFontSize, 
                lineHeight: heroTitleLineHeight,
                fontWeight: heroTitleFontWeight,
                fontStyle: heroTitleFontStyle
              }} 
              className="font-serif mb-6 text-balance"
            >
              {heroTitle}
            </h1>
            <p 
              style={{ 
                fontSize: heroSubtitleFontSize, 
                lineHeight: heroSubtitleLineHeight,
                fontWeight: heroSubtitleFontWeight,
                fontStyle: heroSubtitleFontStyle
              }} 
              className="opacity-90 text-pretty max-w-3xl mx-auto"
            >
              {heroSubtitle}
            </p>
          </div>
        </section>
      )}

      {/* Intro Section */}
      {showIntroSection && (
        <section
          style={{
            backgroundColor: introBackgroundColor,
            color: introTextColor,
          }}
          className="py-20 px-6"
        >
          <div className={`max-w-4xl mx-auto ${getAlignmentClass(introAlignment)}`}>
            <h2 
              style={{ 
                fontSize: introHeadingFontSize, 
                lineHeight: introHeadingLineHeight,
                fontWeight: introHeadingFontWeight,
                fontStyle: introHeadingFontStyle
              }} 
              className="font-serif mb-8 text-balance"
            >
              {introHeading}
            </h2>
            <p 
              style={{ 
                fontSize: introTextFontSize, 
                lineHeight: introTextLineHeight,
                fontWeight: introTextFontWeight,
                fontStyle: introTextFontStyle
              }} 
              className="text-pretty"
            >
              {introText} <span className="font-bold">{introHighlightText}</span>
            </p>
            {introShowButton && (
              <div className="mt-8">
                <a
                  href={introButtonLink}
                  style={{ 
                    backgroundColor: introButtonColor, 
                    color: introButtonTextColor,
                    fontSize: introButtonFontSize 
                  }}
                  className="inline-block px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {introButtonText}
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {showTextSection1 && (
        <section
          style={{
            backgroundColor: textSection1BackgroundColor,
            color: textSection1TextColor,
          }}
          className="py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            {textSection1ShowImage && (
              <div 
                className="relative w-full mb-12 rounded-lg overflow-hidden"
                style={{ height: textSection1ImageHeight }}
              >
                <Image
                  src={textSection1Image || "/placeholder.svg"}
                  alt={textSection1ImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={`max-w-4xl mx-auto ${getAlignmentClass(textSection1Alignment)}`}>
              <h2 
                style={{ 
                  fontSize: textSection1HeadingFontSize, 
                  lineHeight: textSection1HeadingLineHeight,
                  fontWeight: textSection1HeadingFontWeight,
                  fontStyle: textSection1HeadingFontStyle
                }} 
                className="font-serif mb-6 text-balance"
              >
                {textSection1Heading}
              </h2>
              <p 
                style={{ 
                  fontSize: textSection1BodyFontSize, 
                  lineHeight: textSection1BodyLineHeight,
                  fontWeight: textSection1BodyFontWeight,
                  fontStyle: textSection1BodyFontStyle
                }} 
                className="text-pretty"
              >
                {textSection1Body}
              </p>
              {textSection1ShowButton && (
                <div className="mt-8">
                  <a
                    href={textSection1ButtonLink}
                    style={{ 
                      backgroundColor: textSection1ButtonColor, 
                      color: textSection1ButtonTextColor,
                      fontSize: textSection1ButtonFontSize 
                    }}
                    className="inline-block px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {textSection1ButtonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showTextSection2 && (
        <section
          style={{
            backgroundColor: textSection2BackgroundColor,
            color: textSection2TextColor,
          }}
          className="py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            {textSection2ShowImage && (
              <div 
                className="relative w-full mb-12 rounded-lg overflow-hidden"
                style={{ height: textSection2ImageHeight }}
              >
                <Image
                  src={textSection2Image || "/placeholder.svg"}
                  alt={textSection2ImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={`max-w-4xl mx-auto ${getAlignmentClass(textSection2Alignment)}`}>
              <h2 
                style={{ 
                  fontSize: textSection2HeadingFontSize, 
                  lineHeight: textSection2HeadingLineHeight,
                  fontWeight: textSection2HeadingFontWeight,
                  fontStyle: textSection2HeadingFontStyle
                }} 
                className="font-serif mb-6 text-balance"
              >
                {textSection2Heading}
              </h2>
              <p 
                style={{ 
                  fontSize: textSection2BodyFontSize, 
                  lineHeight: textSection2BodyLineHeight,
                  fontWeight: textSection2BodyFontWeight,
                  fontStyle: textSection2BodyFontStyle
                }} 
                className="text-pretty"
              >
                {textSection2Body}
              </p>
              {textSection2ShowButton && (
                <div className="mt-8">
                  <a
                    href={textSection2ButtonLink}
                    style={{ 
                      backgroundColor: textSection2ButtonColor, 
                      color: textSection2ButtonTextColor,
                      fontSize: textSection2ButtonFontSize 
                    }}
                    className="inline-block px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {textSection2ButtonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showTextSection3 && (
        <section
          style={{
            backgroundColor: textSection3BackgroundColor,
            color: textSection3TextColor,
          }}
          className="py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            {textSection3ShowImage && (
              <div 
                className="relative w-full mb-12 rounded-lg overflow-hidden"
                style={{ height: textSection3ImageHeight }}
              >
                <Image
                  src={textSection3Image || "/placeholder.svg"}
                  alt={textSection3ImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={`max-w-4xl mx-auto ${getAlignmentClass(textSection3Alignment)}`}>
              <h2 
                style={{ 
                  fontSize: textSection3HeadingFontSize, 
                  lineHeight: textSection3HeadingLineHeight,
                  fontWeight: textSection3HeadingFontWeight,
                  fontStyle: textSection3HeadingFontStyle
                }} 
                className="font-serif mb-6 text-balance"
              >
                {textSection3Heading}
              </h2>
              <p 
                style={{ 
                  fontSize: textSection3BodyFontSize, 
                  lineHeight: textSection3BodyLineHeight,
                  fontWeight: textSection3BodyFontWeight,
                  fontStyle: textSection3BodyFontStyle
                }} 
                className="text-pretty"
              >
                {textSection3Body}
              </p>
              {textSection3ShowButton && (
                <div className="mt-8">
                  <a
                    href={textSection3ButtonLink}
                    style={{ 
                      backgroundColor: textSection3ButtonColor, 
                      color: textSection3ButtonTextColor,
                      fontSize: textSection3ButtonFontSize 
                    }}
                    className="inline-block px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {textSection3ButtonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showTextSection4 && (
        <section
          style={{
            backgroundColor: textSection4BackgroundColor,
            color: textSection4TextColor,
          }}
          className="py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            {textSection4ShowImage && (
              <div 
                className="relative w-full mb-12 rounded-lg overflow-hidden"
                style={{ height: textSection4ImageHeight }}
              >
                <Image
                  src={textSection4Image || "/placeholder.svg"}
                  alt={textSection4ImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={`max-w-4xl mx-auto ${getAlignmentClass(textSection4Alignment)}`}>
              <h2 
                style={{ 
                  fontSize: textSection4HeadingFontSize, 
                  lineHeight: textSection4HeadingLineHeight,
                  fontWeight: textSection4HeadingFontWeight,
                  fontStyle: textSection4HeadingFontStyle
                }} 
                className="font-serif mb-6 text-balance"
              >
                {textSection4Heading}
              </h2>
              <p 
                style={{ 
                  fontSize: textSection4BodyFontSize, 
                  lineHeight: textSection4BodyLineHeight,
                  fontWeight: textSection4BodyFontWeight,
                  fontStyle: textSection4BodyFontStyle
                }} 
                className="text-pretty"
              >
                {textSection4Body}
              </p>
              {textSection4ShowButton && (
                <div className="mt-8">
                  <a
                    href={textSection4ButtonLink}
                    style={{ 
                      backgroundColor: textSection4ButtonColor, 
                      color: textSection4ButtonTextColor,
                      fontSize: textSection4ButtonFontSize 
                    }}
                    className="inline-block px-8 py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {textSection4ButtonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery Section */}
      {showImageGallerySection && (
        <section style={{ backgroundColor: galleryBackgroundColor }} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 
              style={{ 
                fontSize: galleryHeadingFontSize, 
                lineHeight: galleryHeadingLineHeight,
                fontWeight: galleryHeadingFontWeight,
                fontStyle: galleryHeadingFontStyle
              }} 
              className="font-serif mb-12 text-center text-balance"
            >
              {galleryHeading}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div 
                className="relative overflow-hidden rounded-lg"
                style={{ height: galleryImageHeight }}
              >
                <Image
                  src={galleryImage1 || "/placeholder.svg"}
                  alt="Ministry impact 1"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div 
                className="relative overflow-hidden rounded-lg"
                style={{ height: galleryImageHeight }}
              >
                <Image
                  src={galleryImage2 || "/placeholder.svg"}
                  alt="Ministry impact 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div 
                className="relative overflow-hidden rounded-lg"
                style={{ height: galleryImageHeight }}
              >
                <Image
                  src={galleryImage3 || "/placeholder.svg"}
                  alt="Ministry impact 3"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {showTestimonialSection && (
        <section
          style={{
            backgroundColor: testimonialBackgroundColor,
            color: testimonialTextColor,
          }}
          className="py-20 px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3">
                <div 
                  className="relative rounded-full overflow-hidden mx-auto"
                  style={{ 
                    width: testimonialImageSize,
                    height: testimonialImageSize
                  }}
                >
                  <Image
                    src={testimonialImage || "/placeholder.svg"}
                    alt={testimonialAuthor}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <blockquote 
                  style={{ 
                    fontSize: testimonialQuoteFontSize, 
                    lineHeight: testimonialQuoteLineHeight,
                    fontWeight: testimonialQuoteFontWeight,
                    fontStyle: testimonialQuoteFontStyle
                  }} 
                  className="font-serif mb-6 text-pretty"
                >
                  "{testimonialQuote}"
                </blockquote>
                <div 
                  style={{ 
                    fontSize: testimonialAuthorFontSize, 
                    lineHeight: testimonialAuthorLineHeight,
                    fontWeight: testimonialAuthorFontWeight,
                    fontStyle: testimonialAuthorFontStyle
                  }}
                >
                  {testimonialAuthor}
                </div>
                <div 
                  style={{ 
                    fontSize: testimonialRoleFontSize, 
                    lineHeight: testimonialRoleLineHeight,
                    fontWeight: testimonialRoleFontWeight,
                    fontStyle: testimonialRoleFontStyle
                  }} 
                  className="opacity-80"
                >
                  {testimonialRole}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {showVideoSection && (
        <section
          style={{
            backgroundColor: videoBackgroundColor,
            paddingTop: videoSectionPaddingY,
            paddingBottom: videoSectionPaddingY,
            paddingLeft: videoSectionPaddingX,
            paddingRight: videoSectionPaddingX,
            marginTop: videoSectionMarginY,
            marginBottom: videoSectionMarginY,
          }}
        >
          <div className="mx-auto text-center" style={{ maxWidth: videoMaxWidth }}>
            <h2 
              style={{ 
                fontSize: videoHeadingFontSize, 
                lineHeight: videoHeadingLineHeight,
                fontWeight: videoHeadingFontWeight,
                fontStyle: videoHeadingFontStyle
              }} 
              className="font-serif mb-4 text-white text-balance"
            >
              {videoHeading}
            </h2>
            <p 
              style={{ 
                fontSize: videoSubheadingFontSize, 
                lineHeight: videoSubheadingLineHeight,
                fontWeight: videoSubheadingFontWeight,
                fontStyle: videoSubheadingFontStyle
              }} 
              className="text-white/80 mb-10 text-pretty"
            >
              {videoSubheading}
            </p>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                src={videoEmbedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Ministry2