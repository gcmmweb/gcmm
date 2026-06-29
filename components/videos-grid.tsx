"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Eye } from "lucide-react"

interface VideoItem {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  views: string
  date: string
  category: string
}

export function VideosGrid({
  className,
  sectionTitle = "More videos from GCM Ministries",
  sectionSubtitle = "missions outreach",
  backgroundColor = "#f8fafc",
  
  // Typography
  titleFontSize = "3.75rem",
  titleFontFamily = "inherit",
  titleColor = "#0f172a",
  subtitleFontSize = "1.25rem",
  subtitleFontFamily = "inherit",
  subtitleColor = "#475569",
  
  videoItems = [
    {
      id: "1",
      title: "Mega City Campaigns in Russia",
      description: "Witness the powerful impact of our evangelistic campaigns in major Russian cities.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "8:32",
      views: "8,421",
      date: "Dec 10, 2024",
      category: "Campaigns",
    },
    {
      id: "2",
      title: "Ministry to the Jewish People",
      description: "Our dedicated outreach to Jewish communities around the world.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "15:18",
      views: "12,156",
      date: "Dec 8, 2024",
      category: "Outreach",
    },
    {
      id: "3",
      title: "Children's Aid Program",
      description: "Providing hope and essential supplies to children in need.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "6:45",
      views: "5,892",
      date: "Dec 5, 2024",
      category: "Humanitarian",
    },
  ],
}: {
  className?: string
  sectionTitle?: string
  sectionSubtitle?: string
  backgroundColor?: string
  titleFontSize?: string
  titleFontFamily?: string
  titleColor?: string
  subtitleFontSize?: string
  subtitleFontFamily?: string
  subtitleColor?: string
  videoItems?: VideoItem[]
}) {
  const [gridVisible, setGridVisible] = useState(false)
  const [visibleVideos, setVisibleVideos] = useState<boolean[]>(new Array(videoItems.length).fill(false))
  
  const gridRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLElement | null)[]>([])

  // Grid section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true)
        }
      },
      { threshold: 0.15, rootMargin: "-50px 0px" },
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Individual video card animations
  useEffect(() => {
    const observers = videoRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleVideos((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [videoItems.length])

  const getAnimationClass = (index: number) => {
    const isVisible = visibleVideos[index]
    const baseClasses = "transition-all duration-700 ease-out"
    const hiddenClasses = "opacity-0 translate-y-8 scale-95"
    const visibleClasses = "opacity-100 translate-y-0 scale-100"

    return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`
  }

  return (
    <section 
      ref={gridRef} 
      className={`py-28 font-light ${className || ""}`}
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-8 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div
            className={`mb-12 transition-all duration-1000 ease-out ${
              gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
            <h2 
              className="font-extralight mb-6 leading-tight tracking-tight"
              style={{
                fontSize: titleFontSize,
                fontFamily: titleFontFamily,
                color: titleColor,
              }}
            >
              {sectionTitle}
            </h2>
            <h3 
              className="font-normal tracking-wide uppercase"
              style={{
                fontSize: subtitleFontSize,
                fontFamily: subtitleFontFamily,
                color: subtitleColor,
              }}
            >
              {sectionSubtitle}
            </h3>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {videoItems.map((video, index) => (
            <article
              key={video.id}
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              className={`group cursor-pointer ${getAnimationClass(index)}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 hover:-translate-y-2">
                {/* Embedded Video */}
                <div className="relative overflow-hidden aspect-video">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-full uppercase tracking-wider shadow-sm">
                      {video.category}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full font-light shadow-sm">
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-3 leading-tight group-hover:text-slate-700 transition-colors duration-300">
                    {video.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-2 font-light tracking-wide">
                    {video.description}
                  </p>

                  {/* Video Meta */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-light">{video.views}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-light">{video.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}