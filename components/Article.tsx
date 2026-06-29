"use client"

import { CSSProperties } from "react"

interface TextSegment {
  text: string
  bold?: boolean
  italic?: boolean
}

export function Article({
  className,
  content = "This is a sample article with **bold text** and *italic text*. You can also combine ***bold and italic*** formatting.",
  fontSize = "1.125rem",
  fontFamily = "Georgia, serif",
  lineHeight = "1.8",
  textColor = "#1f2937",
  textAlign = "left",
  maxWidth = "800px",
  paddingX = "24px",
  paddingY = "48px",
  backgroundColor = "transparent",
  
  // Bold styling
  boldFontWeight = "700",
  boldColor = "",
  
  // Italic styling
  italicStyle = "italic",
  italicColor = "",
}: {
  className?: string
  content?: string
  fontSize?: string
  fontFamily?: string
  lineHeight?: string
  textColor?: string
  textAlign?: "left" | "center" | "right" | "justify"
  maxWidth?: string
  paddingX?: string
  paddingY?: string
  backgroundColor?: string
  
  boldFontWeight?: string
  boldColor?: string
  
  italicStyle?: string
  italicColor?: string
}) {
  // Parse the content to identify bold and italic text
  const parseContent = (text: string): TextSegment[] => {
    const segments: TextSegment[] = []
    let currentIndex = 0
    
    // Regex to match ***text*** (bold + italic), **text** (bold), or *text* (italic)
    const regex = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g
    let match
    
    while ((match = regex.exec(text)) !== null) {
      // Add plain text before the match
      if (match.index > currentIndex) {
        segments.push({
          text: text.substring(currentIndex, match.index),
        })
      }
      
      const matchedText = match[0]
      
      // Determine if it's bold, italic, or both
      if (matchedText.startsWith("***") && matchedText.endsWith("***")) {
        // Bold and italic
        segments.push({
          text: matchedText.slice(3, -3),
          bold: true,
          italic: true,
        })
      } else if (matchedText.startsWith("**") && matchedText.endsWith("**")) {
        // Bold only
        segments.push({
          text: matchedText.slice(2, -2),
          bold: true,
        })
      } else if (matchedText.startsWith("*") && matchedText.endsWith("*")) {
        // Italic only
        segments.push({
          text: matchedText.slice(1, -1),
          italic: true,
        })
      }
      
      currentIndex = regex.lastIndex
    }
    
    // Add remaining plain text
    if (currentIndex < text.length) {
      segments.push({
        text: text.substring(currentIndex),
      })
    }
    
    return segments
  }

  const segments = parseContent(content)

  const getSegmentStyle = (segment: TextSegment): CSSProperties => {
    const style: CSSProperties = {}
    
    if (segment.bold) {
      style.fontWeight = boldFontWeight
      if (boldColor) {
        style.color = boldColor
      }
    }
    
    if (segment.italic) {
      style.fontStyle = italicStyle
      if (italicColor) {
        style.color = italicColor
      }
    }
    
    // If both bold and italic have colors, italic color takes precedence
    if (segment.bold && segment.italic && boldColor && italicColor) {
      style.color = italicColor
    }
    
    return style
  }

  return (
    <article
      className={className || ""}
      style={{
        backgroundColor,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        display: "flex",
        justifyContent: textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center",
      }}
    >
      <div
        style={{
          maxWidth,
          width: "100%",
          fontSize,
          fontFamily,
          lineHeight,
          color: textColor,
          textAlign,
        }}
      >
        {segments.map((segment, index) => {
          const style = getSegmentStyle(segment)
          
          if (Object.keys(style).length > 0) {
            return (
              <span key={index} style={style}>
                {segment.text}
              </span>
            )
          }
          
          return <span key={index}>{segment.text}</span>
        })}
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          article {
            padding-left: max(16px, 5vw) !important;
            padding-right: max(16px, 5vw) !important;
          }
        }
      `}</style>
    </article>
  )
}