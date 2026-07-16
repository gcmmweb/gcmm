"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface ArticleNavigationProps {
  previousPost?: {
    title: string
    url: string
    image?: string
  }
  nextPost?: {
    title: string
    url: string
    image?: string
  }
  previousLabel?: string
  nextLabel?: string
  borderColor?: string  
  backgroundColor?: string
  accentColor?: string
  titleColor?: string
  titleHoverColor?: string
  className?: string
}

export const ArticleNavigation = ({
  previousPost,
  nextPost,
  previousLabel = "Previous Article",
  nextLabel = "Next Article",
  borderColor = "#0057B8", // matches Recent Posts card border
  backgroundColor = "#F3F4F6", // matches Recent Posts card background
  accentColor = "#0057B8", // amber-600
  titleColor = "#1F2D55", // foreground
  titleHoverColor = "#0A6C93", // primary/blue
  className = "",
}: ArticleNavigationProps) => {
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <div className={`border-t pt-8 ${className}`} style={{ borderColor }}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Previous Article */}
        {previousPost ? (
          
            href={previousPost?.url}
            className="group flex items-center gap-3 rounded-lg p-3 transition-all md:flex-1 border hover:border-accent"
            style={{ borderColor, backgroundColor }}
          >
            <ChevronLeft
              className="h-5 w-5 flex-shrink-0"
              style={{ color: accentColor }}
            />
            {previousPost?.image && (
              <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                <img
                  src={previousPost?.image}
                  alt={previousPost?.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 overflow-hidden">
              <div
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{ color: accentColor }}
              >
                {previousLabel}
              </div>
              <h3 
                className="text-sm font-bold transition-colors line-clamp-2"
                style={{ color: titleColor }}
              >
                {previousPost?.title}
              </h3>
            </div>
          </a>
        ) : (
          <div className="md:flex-1" />
        )}

        {/* Next Article */}
        {nextPost ? (
          
            href={nextPost?.url}
            className="group flex items-center gap-3 rounded-lg p-3 transition-all md:flex-1 border hover:border-accent"
            style={{ borderColor, backgroundColor }}
          >
            {nextPost?.image && (
              <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                <img
                  src={nextPost?.image}
                  alt={nextPost?.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 overflow-hidden">
              <div
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{ color: accentColor }}
              >
                {nextLabel}
              </div>
              <h3 
                className="text-sm font-bold transition-colors line-clamp-2"
                style={{ color: titleColor }}
              >
                {nextPost?.title}
              </h3>
            </div>
            <ChevronRight
              className="h-5 w-5 flex-shrink-0"
              style={{ color: accentColor }}
            />
          </a>
        ) : (
          <div className="md:flex-1" />
        )}
      </div>
    </div>
  )
}