"use client"

export interface BlogPageProps {
  className?: string

  // Layout control
  layoutType?: "hero-top" | "hero-bottom" | "hero-left" | "hero-right" | "no-hero" | "content-only"

  // Hero section
  showHero?: boolean
  heroImage?: string
  heroTitle?: string
  heroTitleColor?: string
  heroTitleSize?: "small" | "medium" | "large" | "xlarge"
  heroTitleWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"
  heroTitleTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  heroTitleStyle?: "normal" | "italic"
  heroTitleDecoration?: "none" | "underline" | "line-through"
  heroHeight?: number
  heroOverlayOpacity?: number
  heroAlignment?: "left" | "center" | "right"
  heroBorderRadius?: number
  heroShadow?: "none" | "small" | "medium" | "large"

  // Content section 1
  showContent1?: boolean
  content1Title?: string
  content1TitleColor?: string
  content1TitleSize?: "small" | "medium" | "large" | "xlarge"
  content1TitleWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"
  content1TitleTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  content1TitleStyle?: "normal" | "italic"
  content1Text?: string
  content1TextColor?: string
  content1TextSize?: "small" | "medium" | "large"
  content1TextWeight?: "normal" | "medium" | "semibold" | "bold"
  content1TextTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  content1TextStyle?: "normal" | "italic"
  content1TextDecoration?: "none" | "underline"
  content1BackgroundColor?: string
  content1PaddingTop?: number
  content1PaddingBottom?: number
  content1MaxWidth?: "narrow" | "medium" | "wide" | "full"
  content1Alignment?: "left" | "center" | "right"

  // Content section 2
  showContent2?: boolean
  content2Title?: string
  content2TitleColor?: string
  content2TitleSize?: "small" | "medium" | "large" | "xlarge"
  content2TitleWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"
  content2TitleTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  content2TitleStyle?: "normal" | "italic"
  content2Text?: string
  content2TextColor?: string
  content2TextSize?: "small" | "medium" | "large"
  content2TextWeight?: "normal" | "medium" | "semibold" | "bold"
  content2TextTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  content2TextStyle?: "normal" | "italic"
  content2BackgroundColor?: string
  content2PaddingTop?: number
  content2PaddingBottom?: number
  content2MaxWidth?: "narrow" | "medium" | "wide" | "full"
  content2Alignment?: "left" | "center" | "right"
  content2Image?: string
  content2ImagePosition?: "left" | "right" | "top" | "bottom"
  content2ImageSize?: "small" | "medium" | "large"
  content2ImageBorderRadius?: number

  // Content section 3
  showContent3?: boolean
  content3Title?: string
  content3TitleColor?: string
  content3TitleSize?: "small" | "medium" | "large" | "xlarge"
  content3TitleWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"
  content3Text?: string
  content3TextColor?: string
  content3TextSize?: "small" | "medium" | "large"
  content3TextWeight?: "normal" | "medium" | "semibold" | "bold"
  content3BackgroundColor?: string
  content3PaddingTop?: number
  content3PaddingBottom?: number
  content3MaxWidth?: "narrow" | "medium" | "wide" | "full"
  content3Alignment?: "left" | "center" | "right"

  // Optional buttons
  showPrimaryButton?: boolean
  primaryButtonText?: string
  primaryButtonUrl?: string
  primaryButtonColor?: string
  primaryButtonTextColor?: string
  primaryButtonSize?: "small" | "medium" | "large"
  primaryButtonBorderRadius?: number

  showSecondaryButton?: boolean
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  secondaryButtonColor?: string
  secondaryButtonTextColor?: string
  secondaryButtonSize?: "small" | "medium" | "large"
  secondaryButtonBorderRadius?: number

  buttonAlignment?: "left" | "center" | "right"
  buttonPosition?: "content1" | "content2" | "content3" | "bottom"
}

export function BlogPage({
  className = "",
  layoutType = "hero-top",
  showHero = true,
  heroImage = "/aerial-view-of-mountains-and-village.jpg",
  heroTitle = "WHEN A HEART REMAINS WITH THE MAITHILI PEOPLE",
  heroTitleColor = "#ffffff",
  heroTitleSize = "large",
  heroTitleWeight = "bold",
  heroTitleTransform = "uppercase",
  heroTitleStyle = "normal",
  heroTitleDecoration = "none",
  heroHeight = 600,
  heroOverlayOpacity = 0.3,
  heroAlignment = "center",
  heroBorderRadius = 0,
  heroShadow = "none",
  showContent1 = true,
  content1Title = "",
  content1TitleColor = "#1a1a1a",
  content1TitleSize = "large",
  content1TitleWeight = "bold",
  content1TitleTransform = "none",
  content1TitleStyle = "normal",
  content1Text = "Pastor Tomi's heart was touched by the Maithili. Ministry had begun with great momentum, only to be stopped, but never forgotten. Now, decades later, God has opened the door once again. The living stories of the Bible are finally being revealed to the Maithili people in their language, through Superbook.",
  content1TextColor = "#1a1a1a",
  content1TextSize = "medium",
  content1TextWeight = "normal",
  content1TextTransform = "none",
  content1TextStyle = "normal",
  content1TextDecoration = "none",
  content1BackgroundColor = "#ffffff",
  content1PaddingTop = 64,
  content1PaddingBottom = 64,
  content1MaxWidth = "medium",
  content1Alignment = "left",
  showContent2 = false,
  content2Title = "",
  content2TitleColor = "#1a1a1a",
  content2TitleSize = "medium",
  content2TitleWeight = "bold",
  content2TitleTransform = "none",
  content2TitleStyle = "normal",
  content2Text = "",
  content2TextColor = "#1a1a1a",
  content2TextSize = "medium",
  content2TextWeight = "normal",
  content2TextTransform = "none",
  content2TextStyle = "normal",
  content2BackgroundColor = "#f9fafb",
  content2PaddingTop = 64,
  content2PaddingBottom = 64,
  content2MaxWidth = "medium",
  content2Alignment = "left",
  content2Image = "",
  content2ImagePosition = "right",
  content2ImageSize = "medium",
  content2ImageBorderRadius = 8,
  showContent3 = false,
  content3Title = "",
  content3TitleColor = "#1a1a1a",
  content3TitleSize = "medium",
  content3TitleWeight = "bold",
  content3Text = "",
  content3TextColor = "#1a1a1a",
  content3TextSize = "medium",
  content3TextWeight = "normal",
  content3BackgroundColor = "#ffffff",
  content3PaddingTop = 64,
  content3PaddingBottom = 64,
  content3MaxWidth = "medium",
  content3Alignment = "left",
  content3TitleTransform = "none", // Declared content3TitleTransform
  showPrimaryButton = false,
  primaryButtonText = "Learn More",
  primaryButtonUrl = "#",
  primaryButtonColor = "#2563eb",
  primaryButtonTextColor = "#ffffff",
  primaryButtonSize = "medium",
  primaryButtonBorderRadius = 6,
  showSecondaryButton = false,
  secondaryButtonText = "Contact Us",
  secondaryButtonUrl = "#",
  secondaryButtonColor = "#ffffff",
  secondaryButtonTextColor = "#1a1a1a",
  secondaryButtonSize = "medium",
  secondaryButtonBorderRadius = 6,
  buttonAlignment = "left",
  buttonPosition = "content1",
}: BlogPageProps) {
  const titleSizeClasses = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-4xl lg:text-5xl",
    large: "text-4xl md:text-5xl lg:text-6xl",
    xlarge: "text-5xl md:text-6xl lg:text-7xl",
  }

  const textSizeClasses = {
    small: "text-sm md:text-base",
    medium: "text-base md:text-lg",
    large: "text-lg md:text-xl",
  }

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  }

  const transformClasses = {
    none: "normal-case",
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
  }

  const styleClasses = {
    normal: "not-italic",
    italic: "italic",
  }

  const decorationClasses = {
    none: "no-underline",
    underline: "underline",
    "line-through": "line-through",
  }

  const maxWidthClasses = {
    narrow: "max-w-2xl",
    medium: "max-w-4xl",
    wide: "max-w-6xl",
    full: "max-w-full",
  }

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const justifyClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  const shadowClasses = {
    none: "",
    small: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-lg",
  }

  const imageSizeClasses = {
    small: "md:w-1/3",
    medium: "md:w-1/2",
    large: "md:w-2/3",
  }

  const buttonSizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  }

  const HeroSection = () => {
    if (!showHero) return null

    return (
      <div
        className={`relative w-full overflow-hidden ${shadowClasses[heroShadow]}`}
        style={{
          height: `${heroHeight}px`,
          borderRadius: `${heroBorderRadius}px`,
        }}
      >
        <img
          src={heroImage || "/placeholder.svg"}
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${heroOverlayOpacity})`,
          }}
        />
        <div className={`relative flex h-full items-center px-4 ${justifyClasses[heroAlignment]}`}>
          <h1
            className={`max-w-5xl text-balance font-sans leading-tight tracking-tight ${titleSizeClasses[heroTitleSize]} ${weightClasses[heroTitleWeight]} ${transformClasses[heroTitleTransform]} ${styleClasses[heroTitleStyle]} ${decorationClasses[heroTitleDecoration]} ${alignmentClasses[heroAlignment]}`}
            style={{ color: heroTitleColor }}
          >
            {heroTitle}
          </h1>
        </div>
      </div>
    )
  }

  const ContentSection = ({
    show,
    title,
    titleColor,
    titleSize,
    titleWeight,
    titleTransform,
    titleStyle,
    text,
    textColor,
    textSize,
    textWeight,
    textTransform,
    textStyle,
    textDecoration,
    backgroundColor,
    paddingTop,
    paddingBottom,
    maxWidth,
    alignment,
    image,
    imagePosition,
    imageSize,
    imageBorderRadius,
    showButtons,
  }: {
    show: boolean
    title?: string
    titleColor: string
    titleSize: "small" | "medium" | "large" | "xlarge"
    titleWeight: "normal" | "medium" | "semibold" | "bold" | "extrabold"
    titleTransform: "none" | "uppercase" | "lowercase" | "capitalize"
    titleStyle: "normal" | "italic"
    text: string
    textColor: string
    textSize: "small" | "medium" | "large"
    textWeight: "normal" | "medium" | "semibold" | "bold"
    textTransform: "none" | "uppercase" | "lowercase" | "capitalize"
    textStyle: "normal" | "italic"
    textDecoration?: "none" | "underline"
    backgroundColor: string
    paddingTop: number
    paddingBottom: number
    maxWidth: "narrow" | "medium" | "wide" | "full"
    alignment: "left" | "center" | "right"
    image?: string
    imagePosition?: "left" | "right" | "top" | "bottom"
    imageSize?: "small" | "medium" | "large"
    imageBorderRadius?: number
    showButtons?: boolean
  }) => {
    if (!show) return null

    const hasImage = image && image.length > 0

    return (
      <div
        className="px-4 md:px-8 lg:px-16"
        style={{
          backgroundColor,
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
      >
        <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
          {hasImage && (imagePosition === "top" || imagePosition === "left") ? (
            <div className={`flex flex-col gap-8 ${imagePosition === "left" ? "md:flex-row" : ""} items-center`}>
              <div className={`w-full ${imagePosition === "left" ? imageSizeClasses[imageSize!] : ""}`}>
                <img
                  src={image || "/placeholder.svg"}
                  alt="Content image"
                  className="h-auto w-full object-cover"
                  style={{ borderRadius: `${imageBorderRadius}px` }}
                />
              </div>
              <div className={`w-full ${imagePosition === "left" ? "flex-1" : ""}`}>
                {title && (
                  <h2
                    className={`mb-6 text-balance font-sans leading-tight ${titleSizeClasses[titleSize]} ${weightClasses[titleWeight]} ${transformClasses[titleTransform]} ${styleClasses[titleStyle]} ${alignmentClasses[alignment]}`}
                    style={{ color: titleColor }}
                  >
                    {title}
                  </h2>
                )}
                <p
                  className={`text-pretty leading-relaxed ${textSizeClasses[textSize]} ${weightClasses[textWeight]} ${transformClasses[textTransform]} ${styleClasses[textStyle]} ${textDecoration ? decorationClasses[textDecoration] : ""} ${alignmentClasses[alignment]}`}
                  style={{ color: textColor }}
                >
                  {text}
                </p>
                {showButtons && <ButtonGroup />}
              </div>
            </div>
          ) : hasImage && (imagePosition === "bottom" || imagePosition === "right") ? (
            <div
              className={`flex flex-col gap-8 ${imagePosition === "right" ? "md:flex-row-reverse" : ""} items-center`}
            >
              <div className={`w-full ${imagePosition === "right" ? imageSizeClasses[imageSize!] : ""}`}>
                <img
                  src={image || "/placeholder.svg"}
                  alt="Content image"
                  className="h-auto w-full object-cover"
                  style={{ borderRadius: `${imageBorderRadius}px` }}
                />
              </div>
              <div className={`w-full ${imagePosition === "right" ? "flex-1" : ""}`}>
                {title && (
                  <h2
                    className={`mb-6 text-balance font-sans leading-tight ${titleSizeClasses[titleSize]} ${weightClasses[titleWeight]} ${transformClasses[titleTransform]} ${styleClasses[titleStyle]} ${alignmentClasses[alignment]}`}
                    style={{ color: titleColor }}
                  >
                    {title}
                  </h2>
                )}
                <p
                  className={`text-pretty leading-relaxed ${textSizeClasses[textSize]} ${weightClasses[textWeight]} ${transformClasses[textTransform]} ${styleClasses[textStyle]} ${textDecoration ? decorationClasses[textDecoration] : ""} ${alignmentClasses[alignment]}`}
                  style={{ color: textColor }}
                >
                  {text}
                </p>
                {showButtons && <ButtonGroup />}
              </div>
            </div>
          ) : (
            <>
              {title && (
                <h2
                  className={`mb-6 text-balance font-sans leading-tight ${titleSizeClasses[titleSize]} ${weightClasses[titleWeight]} ${transformClasses[titleTransform]} ${styleClasses[titleStyle]} ${alignmentClasses[alignment]}`}
                  style={{ color: titleColor }}
                >
                  {title}
                </h2>
              )}
              <p
                className={`text-pretty leading-relaxed ${textSizeClasses[textSize]} ${weightClasses[textWeight]} ${transformClasses[textTransform]} ${styleClasses[textStyle]} ${textDecoration ? decorationClasses[textDecoration] : ""} ${alignmentClasses[alignment]}`}
                style={{ color: textColor }}
              >
                {text}
              </p>
              {showButtons && <ButtonGroup />}
            </>
          )}
        </div>
      </div>
    )
  }

  const ButtonGroup = () => {
    if (!showPrimaryButton && !showSecondaryButton) return null

    return (
      <div className={`mt-8 flex flex-wrap gap-4 ${justifyClasses[buttonAlignment]}`}>
        {showPrimaryButton && (
          <a
            href={primaryButtonUrl}
            className={`inline-flex items-center justify-center font-medium transition-colors ${buttonSizeClasses[primaryButtonSize]}`}
            style={{
              backgroundColor: primaryButtonColor,
              color: primaryButtonTextColor,
              borderRadius: `${primaryButtonBorderRadius}px`,
            }}
          >
            {primaryButtonText}
          </a>
        )}
        {showSecondaryButton && (
          <a
            href={secondaryButtonUrl}
            className={`inline-flex items-center justify-center border-2 font-medium transition-colors ${buttonSizeClasses[secondaryButtonSize]}`}
            style={{
              backgroundColor: secondaryButtonColor,
              color: secondaryButtonTextColor,
              borderColor: secondaryButtonTextColor,
              borderRadius: `${secondaryButtonBorderRadius}px`,
            }}
          >
            {secondaryButtonText}
          </a>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {layoutType === "hero-top" && (
        <>
          <HeroSection />
          <ContentSection
            show={showContent1}
            title={content1Title}
            titleColor={content1TitleColor}
            titleSize={content1TitleSize}
            titleWeight={content1TitleWeight}
            titleTransform={content1TitleTransform}
            titleStyle={content1TitleStyle}
            text={content1Text}
            textColor={content1TextColor}
            textSize={content1TextSize}
            textWeight={content1TextWeight}
            textTransform={content1TextTransform}
            textStyle={content1TextStyle}
            textDecoration={content1TextDecoration}
            backgroundColor={content1BackgroundColor}
            paddingTop={content1PaddingTop}
            paddingBottom={content1PaddingBottom}
            maxWidth={content1MaxWidth}
            alignment={content1Alignment}
            showButtons={buttonPosition === "content1"}
          />
          <ContentSection
            show={showContent2}
            title={content2Title}
            titleColor={content2TitleColor}
            titleSize={content2TitleSize}
            titleWeight={content2TitleWeight}
            titleTransform={content2TitleTransform}
            titleStyle={content2TitleStyle}
            text={content2Text}
            textColor={content2TextColor}
            textSize={content2TextSize}
            textWeight={content2TextWeight}
            textTransform={content2TextTransform}
            textStyle={content2TextStyle}
            backgroundColor={content2BackgroundColor}
            paddingTop={content2PaddingTop}
            paddingBottom={content2PaddingBottom}
            maxWidth={content2MaxWidth}
            alignment={content2Alignment}
            image={content2Image}
            imagePosition={content2ImagePosition}
            imageSize={content2ImageSize}
            imageBorderRadius={content2ImageBorderRadius}
            showButtons={buttonPosition === "content2"}
          />
          <ContentSection
            show={showContent3}
            title={content3Title}
            titleColor={content3TitleColor}
            titleSize={content3TitleSize}
            titleWeight={content3TitleWeight}
            text={content3Text}
            textColor={content3TextColor}
            textSize={content3TextSize}
            textWeight={content3TextWeight}
            backgroundColor={content3BackgroundColor}
            paddingTop={content3PaddingTop}
            paddingBottom={content3PaddingBottom}
            maxWidth={content3MaxWidth}
            alignment={content3Alignment}
            showButtons={buttonPosition === "content3"}
            titleTransform={content3TitleTransform}
            titleStyle="normal"
            textTransform="none"
            textStyle="normal"
          />
          {buttonPosition === "bottom" && (
            <div className="px-4 py-8 md:px-8 lg:px-16">
              <div className={`mx-auto ${maxWidthClasses[content1MaxWidth]}`}>
                <ButtonGroup />
              </div>
            </div>
          )}
        </>
      )}

      {layoutType === "hero-bottom" && (
        <>
          <ContentSection
            show={showContent1}
            title={content1Title}
            titleColor={content1TitleColor}
            titleSize={content1TitleSize}
            titleWeight={content1TitleWeight}
            titleTransform={content1TitleTransform}
            titleStyle={content1TitleStyle}
            text={content1Text}
            textColor={content1TextColor}
            textSize={content1TextSize}
            textWeight={content1TextWeight}
            textTransform={content1TextTransform}
            textStyle={content1TextStyle}
            textDecoration={content1TextDecoration}
            backgroundColor={content1BackgroundColor}
            paddingTop={content1PaddingTop}
            paddingBottom={content1PaddingBottom}
            maxWidth={content1MaxWidth}
            alignment={content1Alignment}
            showButtons={buttonPosition === "content1"}
          />
          <HeroSection />
          <ContentSection
            show={showContent2}
            title={content2Title}
            titleColor={content2TitleColor}
            titleSize={content2TitleSize}
            titleWeight={content2TitleWeight}
            titleTransform={content2TitleTransform}
            titleStyle={content2TitleStyle}
            text={content2Text}
            textColor={content2TextColor}
            textSize={content2TextSize}
            textWeight={content2TextWeight}
            textTransform={content2TextTransform}
            textStyle={content2TextStyle}
            backgroundColor={content2BackgroundColor}
            paddingTop={content2PaddingTop}
            paddingBottom={content2PaddingBottom}
            maxWidth={content2MaxWidth}
            alignment={content2Alignment}
            image={content2Image}
            imagePosition={content2ImagePosition}
            imageSize={content2ImageSize}
            imageBorderRadius={content2ImageBorderRadius}
            showButtons={buttonPosition === "content2"}
          />
        </>
      )}

      {layoutType === "content-only" && (
        <>
          <ContentSection
            show={showContent1}
            title={content1Title}
            titleColor={content1TitleColor}
            titleSize={content1TitleSize}
            titleWeight={content1TitleWeight}
            titleTransform={content1TitleTransform}
            titleStyle={content1TitleStyle}
            text={content1Text}
            textColor={content1TextColor}
            textSize={content1TextSize}
            textWeight={content1TextWeight}
            textTransform={content1TextTransform}
            textStyle={content1TextStyle}
            textDecoration={content1TextDecoration}
            backgroundColor={content1BackgroundColor}
            paddingTop={content1PaddingTop}
            paddingBottom={content1PaddingBottom}
            maxWidth={content1MaxWidth}
            alignment={content1Alignment}
            showButtons={buttonPosition === "content1"}
          />
          <ContentSection
            show={showContent2}
            title={content2Title}
            titleColor={content2TitleColor}
            titleSize={content2TitleSize}
            titleWeight={content2TitleWeight}
            titleTransform={content2TitleTransform}
            titleStyle={content2TitleStyle}
            text={content2Text}
            textColor={content2TextColor}
            textSize={content2TextSize}
            textWeight={content2TextWeight}
            textTransform={content2TextTransform}
            textStyle={content2TextStyle}
            backgroundColor={content2BackgroundColor}
            paddingTop={content2PaddingTop}
            paddingBottom={content2PaddingBottom}
            maxWidth={content2MaxWidth}
            alignment={content2Alignment}
            image={content2Image}
            imagePosition={content2ImagePosition}
            imageSize={content2ImageSize}
            imageBorderRadius={content2ImageBorderRadius}
            showButtons={buttonPosition === "content2"}
          />
          <ContentSection
            show={showContent3}
            title={content3Title}
            titleColor={content3TitleColor}
            titleSize={content3TitleSize}
            titleWeight={content3TitleWeight}
            text={content3Text}
            textColor={content3TextColor}
            textSize={content3TextSize}
            textWeight={content3TextWeight}
            backgroundColor={content3BackgroundColor}
            paddingTop={content3PaddingTop}
            paddingBottom={content3PaddingBottom}
            maxWidth={content3MaxWidth}
            alignment={content3Alignment}
            showButtons={buttonPosition === "content3"}
            titleTransform={content3TitleTransform}
            titleStyle="normal"
            textTransform="none"
            textStyle="normal"
          />
        </>
      )}
    </div>
  )
}
