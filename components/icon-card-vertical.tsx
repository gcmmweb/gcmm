import React from "react"

export interface IconCardVerticalProps {
  // Content
  iconUrl?: string
  title?: string
  description?: string

  // Layout & Spacing
  iconSize?: number
  gap?: number
  padding?: string

  // Icon styling
  iconBackgroundColor?: string
  iconColor?: string
  iconBorderRadius?: string
  iconPadding?: string
  showIconBackground?: boolean

  // Text styling
  titleColor?: string
  titleSize?: string
  titleWeight?: string
  titleFont?: string
  descriptionColor?: string
  descriptionSize?: string
  descriptionFont?: string
  descriptionLineHeight?: string

  // Card styling
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  boxShadow?: string

  // Hover effects
  hoverTransform?: string
  hoverShadow?: string
  hoverBorderColor?: string

  // Responsive breakpoint (in pixels)
  mobileBreakpoint?: number

  // Alignment
  textAlign?: "left" | "center" | "right"

  // Custom class
  className?: string
}

export const IconCardVertical: React.FC<IconCardVerticalProps> = ({
  iconUrl,
  title = "Card Title",
  description = "Card description goes here",

  // Layout & Spacing
  iconSize = 48,
  gap = 20,
  padding = "32px",

  // Icon styling
  iconBackgroundColor = "#f0f4ff",
  iconColor = "#3b82f6",
  iconBorderRadius = "12px",
  iconPadding = "16px",
  showIconBackground = true,

  // Text styling
  titleColor = "#1a1a1a",
  titleSize = "24px",
  titleWeight = "600",
  titleFont = '"Inter", sans-serif',
  descriptionColor = "#666666",
  descriptionSize = "16px",
  descriptionFont = '"Inter", sans-serif',
  descriptionLineHeight = "1.6",

  // Card styling
  backgroundColor = "#ffffff",
  borderColor = "#e5e7eb",
  borderWidth = "1px",
  borderRadius = "16px",
  boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)",

  // Hover effects
  hoverTransform = "translateY(-4px)",
  hoverShadow = "0 12px 24px rgba(0, 0, 0, 0.1)",
  hoverBorderColor = "#3b82f6",

  // Responsive
  mobileBreakpoint = 768,

  // Alignment
  textAlign = "left",

  className = "",
}) => {
  const cardId = React.useId()

  const iconSizePx = `${iconSize}px`

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .icon-card-${cardId} {
          display: flex;
          flex-direction: column;
          gap: ${gap}px;
          padding: ${padding};
          background-color: ${backgroundColor};
          border: ${borderWidth} solid ${borderColor};
          border-radius: ${borderRadius};
          box-shadow: ${boxShadow};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out;
          height: 100%;
        }
        
        .icon-card-${cardId}:hover {
          transform: ${hoverTransform};
          box-shadow: ${hoverShadow};
          border-color: ${hoverBorderColor};
        }
        
        .icon-card-${cardId} .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: ${textAlign};
          flex-shrink: 0;
        }
        
        .icon-card-${cardId} .icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          ${showIconBackground ? `background-color: ${iconBackgroundColor};` : ""}
          ${showIconBackground ? `border-radius: ${iconBorderRadius};` : ""}
          ${showIconBackground ? `padding: ${iconPadding};` : ""}
          color: ${iconColor};
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        .icon-card-${cardId}:hover .icon-container {
          transform: scale(1.05);
        }
        
        .icon-card-${cardId} .content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: ${textAlign};
          flex: 1;
        }
        
        .icon-card-${cardId} .title {
          margin: 0;
          color: ${titleColor};
          font-size: ${titleSize};
          font-weight: ${titleWeight};
          font-family: ${titleFont};
          line-height: 1.3;
        }
        
        .icon-card-${cardId} .description {
          margin: 0;
          color: ${descriptionColor};
          font-size: ${descriptionSize};
          font-family: ${descriptionFont};
          line-height: ${descriptionLineHeight};
        }
        
        /* Desktop: icon to the left of text */
        @media (min-width: ${mobileBreakpoint}px) {
          .icon-card-${cardId} {
            flex-direction: row;
            align-items: flex-start;
          }
          
          .icon-card-${cardId} .icon-wrapper {
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className={`icon-card-${cardId} ${className}`}>
        <div className="icon-wrapper">
          <div className="icon-container">
            {iconUrl ? (
              <img src={iconUrl || "/placeholder.svg"} alt="" width={iconSize} height={iconSize} />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width={iconSize}
                height={iconSize}
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            )}
          </div>
        </div>

        <div className="content">
          <h3 className="title">{title}</h3>
          <p className="description">{description}</p>
        </div>
      </div>
    </>
  )
}

export default IconCardVertical
