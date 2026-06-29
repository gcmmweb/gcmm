import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const variantStyles = {
  primary: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    hoverBackgroundColor: "#1d4ed8",
    ringColor: "#3b82f6",
  },
  secondary: {
    backgroundColor: "#475569",
    color: "#ffffff",
    hoverBackgroundColor: "#334155",
    ringColor: "#64748b",
  },
  destructive: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
    hoverBackgroundColor: "#b91c1c",
    ringColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#334155",
    borderColor: "#cbd5e1",
    hoverBackgroundColor: "#f1f5f9",
    ringColor: "#64748b",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#334155",
    hoverBackgroundColor: "#f1f5f9",
    ringColor: "#64748b",
  },
  link: {
    backgroundColor: "transparent",
    color: "#2563eb",
    hoverColor: "#1d4ed8",
    ringColor: "#3b82f6",
  },
  success: {
    backgroundColor: "#16a34a",
    color: "#ffffff",
    hoverBackgroundColor: "#15803d",
    ringColor: "#22c55e",
  },
  warning: {
    backgroundColor: "#eab308",
    color: "#ffffff",
    hoverBackgroundColor: "#ca8a04",
    ringColor: "#facc15",
  },
  gradient: {
    backgroundImage: "linear-gradient(to right, #9333ea, #db2777)",
    color: "#ffffff",
    hoverBackgroundImage: "linear-gradient(to right, #7e22ce, #be185d)",
    ringColor: "#a855f7",
  },
  glassmorphism: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    hoverBackgroundColor: "rgba(255, 255, 255, 0.2)",
    ringColor: "rgba(255, 255, 255, 0.5)",
  },
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 sm:gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-center",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        destructive: "",
        outline: "border-2 bg-transparent",
        ghost: "bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline",
        success: "",
        warning: "",
        gradient: "",
        glassmorphism: "backdrop-blur-md border",
      },
      size: {
        xs: "h-auto min-h-[1.5rem] px-2 py-1 text-xs rounded sm:min-h-[1.75rem] sm:px-2.5",
        sm: "h-auto min-h-[1.75rem] px-2.5 py-1.5 text-xs rounded-md sm:min-h-[2rem] sm:px-3 sm:text-sm",
        md: "h-auto min-h-[2.25rem] px-3 py-2 text-sm rounded-lg sm:min-h-[2.5rem] sm:px-4",
        lg: "h-auto min-h-[2.5rem] px-4 py-2.5 text-sm rounded-lg sm:min-h-[3rem] sm:px-6 sm:text-base",
        xl: "h-auto min-h-[3rem] px-6 py-3 text-base rounded-xl sm:min-h-[3.5rem] sm:px-8 sm:text-lg",
        icon: "h-9 w-9 rounded-lg sm:h-10 sm:w-10 flex-shrink-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      elevation: {
        none: "",
        sm: "hover:translate-y-[-1px] active:translate-y-[0px]",
        md: "hover:translate-y-[-2px] active:translate-y-[0px]",
        lg: "hover:translate-y-[-4px] active:translate-y-[0px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      rounded: "lg",
      shadow: "none",
      elevation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children?: React.ReactNode
  /** Button variant style */
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success" | "warning" | "gradient" | "glassmorphism"
  /** Button size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon"
  /** Make button full width */
  fullWidth?: boolean
  /** Border radius style */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  /** Shadow intensity */
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
  /** Hover elevation effect */
  elevation?: "none" | "sm" | "md" | "lg"
  /** Loading state */
  loading?: boolean
  /** URL to navigate to (renders as link) */
  href?: string
  /** Open link in new tab */
  openInNewTab?: boolean
  /** Custom background color (overrides variant) */
  backgroundColor?: string
  /** Custom text color */
  textColor?: string
  /** Custom border color */
  borderColor?: string
  /** Custom border width */
  borderWidth?: string
  /** Custom font weight */
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold"
  /** Letter spacing */
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest"
  /** Text transform */
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize"
  /** Animation on click */
  clickAnimation?: "scale" | "pulse" | "bounce" | "none"
  /** Gradient direction (for gradient variant) */
  gradientDirection?: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl"
  /** Custom gradient colors (array of 2-4 colors) */
  gradientColors?: string[]
  /** Icon only mode (hides text on mobile) */
  iconOnly?: boolean
  /** Tooltip text */
  tooltip?: string
  /** Additional CSS classes */
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size,
      fullWidth,
      rounded,
      shadow,
      elevation,
      loading = false,
      href,
      openInNewTab = false,
      backgroundColor,
      textColor,
      borderColor,
      borderWidth,
      fontWeight,
      letterSpacing,
      textTransform,
      clickAnimation = "none",
      gradientDirection = "to-r",
      gradientColors,
      iconOnly = false,
      tooltip,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isClicked, setIsClicked] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (clickAnimation !== "none") {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 300)
      }
      onClick?.(e)
    }

    // Get variant styles
    const variantStyle = variant ? variantStyles[variant] : variantStyles.primary
    
    // Build custom styles with hover support
    const customStyles: React.CSSProperties = {
      ...(backgroundColor 
        ? { backgroundColor } 
        : variantStyle.backgroundColor && { backgroundColor: isHovered ? variantStyle.hoverBackgroundColor || variantStyle.backgroundColor : variantStyle.backgroundColor }
      ),
      ...(textColor 
        ? { color: textColor } 
        : variantStyle.color && { color: isHovered && variantStyle.hoverColor ? variantStyle.hoverColor : variantStyle.color }
      ),
      ...(borderColor 
        ? { borderColor } 
        : variantStyle.borderColor && { borderColor: variantStyle.borderColor }
      ),
      ...(borderWidth && { borderWidth }),
      ...(variantStyle.backgroundImage && !backgroundColor && {
        backgroundImage: isHovered && variantStyle.hoverBackgroundImage ? variantStyle.hoverBackgroundImage : variantStyle.backgroundImage
      }),
    }

    const fontWeightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    }

    const letterSpacingClasses = {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    }

    const textTransformClasses = {
      none: "",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    }

    const clickAnimationClasses = {
      scale: isClicked ? "scale-95" : "",
      pulse: isClicked ? "animate-pulse" : "",
      bounce: isClicked ? "animate-bounce" : "",
      none: "",
    }

    // Handle custom gradient colors
    let gradientStyle = {}
    if (variant === "gradient" && gradientColors && gradientColors.length >= 2) {
      const gradientString = `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
      gradientStyle = { backgroundImage: gradientString }
    }

    const classNames = `
      ${buttonVariants({ variant, size, fullWidth, rounded, shadow, elevation })}
      ${fontWeight ? fontWeightClasses[fontWeight] : ""}
      ${letterSpacing ? letterSpacingClasses[letterSpacing] : ""}
      ${textTransform ? textTransformClasses[textTransform] : ""}
      ${clickAnimationClasses[clickAnimation]}
      ${className || ""}
    `.trim()

    const combinedStyles = { ...customStyles, ...gradientStyle }

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!iconOnly && <span className="leading-tight">{children}</span>}
        {iconOnly && <span className="sr-only">{children}</span>}
      </>
    )

    // If href is provided, render as a link
    if (href) {
      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className={classNames}
          style={combinedStyles}
          title={tooltip}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={classNames}
        style={combinedStyles}
        disabled={disabled || loading}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={tooltip}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = "Button"