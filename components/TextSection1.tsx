"use client"
import Image from "next/image"

interface TextSection1Props {
  className?: string

  // Content
  heading?: string
  body?: string

  // Styling
  backgroundColor?: string
  textColor?: string
  alignment?: "left" | "center" | "right" | "justify"

  // Image
  showImage?: boolean
  image?: string
  imageAlt?: string

  // Button
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
  buttonColor?: string
  buttonTextColor?: string

  // Typography - Heading
  headingFontSize?: string
  headingLineHeight?: string
  headingFontWeight?: "normal" | "bold"
  headingFontStyle?: "normal" | "italic"

  // Typography - Body
  bodyFontSize?: string
  bodyLineHeight?: string
  bodyFontWeight?: "normal" | "bold"
  bodyFontStyle?: "normal" | "italic"

  // Typography - Button
  buttonFontSize?: string
}

export function TextSection1({
  className = "",

  // Content
  heading = "Our Approach",
  body = "Through strategic partnerships with local churches and communities, we create targeted media campaigns that reach people where they are. Our multi-platform approach includes television broadcasts, radio programs, digital content, and community events that work together to share a message of hope and transformation.",

  // Styling
  backgroundColor = "#ffffff",
  textColor = "#1e293b",
  alignment = "left",

  // Image
  showImage = false,
  image = "/community-gathering-ministry.jpg",
  imageAlt = "Ministry approach",

  // Button
  showButton = false,
  buttonText = "Discover Our Method",
  buttonLink = "#",
  buttonColor = "#1e40af",
  buttonTextColor = "#ffffff",

  // Typography - Heading
  headingFontSize = "1.875rem",
  headingLineHeight = "1.3",
  headingFontWeight = "normal",
  headingFontStyle = "normal",

  // Typography - Body
  bodyFontSize = "1.125rem",
  bodyLineHeight = "1.6",
  bodyFontWeight = "normal",
  bodyFontStyle = "normal",

  // Typography - Button
  buttonFontSize = "1rem",
}: TextSection1Props) {
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
    <section
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {showImage && (
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full mb-8 sm:mb-10 md:mb-12 rounded-lg overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className={`max-w-4xl mx-auto ${getAlignmentClass(alignment)}`}>
          <h2
            style={{
              fontSize: headingFontSize,
              lineHeight: headingLineHeight,
              fontWeight: headingFontWeight,
              fontStyle: headingFontStyle,
            }}
            className="font-serif mb-4 sm:mb-5 md:mb-6 text-balance text-[clamp(1.5rem,5vw,1.875rem)]"
          >
            {heading}
          </h2>
          <p
            style={{
              fontSize: bodyFontSize,
              lineHeight: bodyLineHeight,
              fontWeight: bodyFontWeight,
              fontStyle: bodyFontStyle,
            }}
            className="text-pretty text-[clamp(1rem,3vw,1.125rem)] leading-relaxed"
          >
            {body}
          </p>
          {showButton && (
            <div className="mt-6 sm:mt-7 md:mt-8">
              <a
                href={buttonLink}
                style={{
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                  fontSize: buttonFontSize,
                }}
                className="inline-block px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity text-[clamp(0.9rem,2.5vw,1rem)]"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TextSection1