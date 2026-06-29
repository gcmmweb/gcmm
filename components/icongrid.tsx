import * as React from "react"

export interface IconCardProps {
  /** Image URL for icon */
  imageUrl?: string
  /** Icon background color (when no image) */
  iconBackgroundColor?: string
  /** Heading text */
  heading?: string
  /** Body text */
  text?: string
  /** Custom heading color */
  headingColor?: string
  /** Custom text color */
  textColor?: string
  /** Icon size */
  iconSize?: "sm" | "md" | "lg" | "xl"
  /** Hover effect */
  hoverEffect?: "none" | "lift" | "scale" | "glow"
  /** Link URL */
  href?: string
  /** Open link in new tab */
  openInNewTab?: boolean
  /** Gap between icon and text */
  gap?: "sm" | "md" | "lg" | "xl"
  /** Additional CSS classes */
  className?: string
}

export const IconCard: React.FC<IconCardProps> = ({
  imageUrl,
  iconBackgroundColor = "#2563eb",
  heading = "Heading Heading",
  text = "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
  headingColor = "#000000",
  textColor = "#000000",
  iconSize = "md",
  hoverEffect = "none",
  href,
  openInNewTab = false,
  gap = "lg",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-20 h-20 min-w-20",
    md: "w-28 h-28 min-w-28",
    lg: "w-36 h-36 min-w-36",
    xl: "w-44 h-44 min-w-44",
  }

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  }

  const hoverClasses = {
    none: "",
    lift: "hover:translate-y-[-4px]",
    scale: "hover:scale-105",
    glow: "hover:shadow-xl",
  }

  const content = (
    <div
      className={`
        flex flex-col items-center
        md:flex-row md:items-start
        ${gapClasses[gap]}
        transition-all duration-300 ${hoverClasses[hoverEffect]}
        ${href ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      <div
        className={`
          ${sizeClasses[iconSize]}
          rounded-full
          flex items-center justify-center flex-shrink-0
          transition-all duration-300 overflow-hidden
        `}
        style={{ backgroundColor: imageUrl ? "transparent" : iconBackgroundColor }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={heading}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>

      <div className="flex flex-col gap-2 min-w-0 flex-1 text-center md:text-left">
        {heading && (
          <h3
            className="font-bold text-3xl leading-tight"
            style={{ color: headingColor }}
          >
            {heading}
          </h3>
        )}

        {text && (
          <p
            className="text-xl leading-relaxed"
            style={{ color: textColor }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    )
  }

  return content
}

IconCard.displayName = "IconCard"
