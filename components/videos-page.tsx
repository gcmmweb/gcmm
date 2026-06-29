"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Eye, Calendar } from "lucide-react"

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

export function VideosPage({
  className,
  pageTitle = "TV & Video",
  pageSubtitle = "A general overview of Great Commission Media Ministries.",
  moreVideosTitle = "More videos from GCM Ministries",
  moreVideosSubtitle = "missions outreach",

  // Featured Video
  featuredVideoTitle = "Great Commission Media Ministries Overview",
  featuredVideoDescription = "Discover how GCM Ministries is reaching nations through strategic media campaigns and compassionate outreach across the globe.",
  featuredVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  featuredVideoDuration = "12:45",
  featuredVideoViews = "15,234",
  featuredVideoDate = "Dec 15, 2024",

  // Video Grid Items
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
    {
      id: "4",
      title: "Islamic World Outreach",
      description: "Reaching 1.4 billion Muslims with the Gospel message.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "11:22",
      views: "9,734",
      date: "Dec 3, 2024",
      category: "Missions",
    },
    {
      id: "5",
      title: "Training Indigenous Workers",
      description: "Equipping local leaders to reach their own communities.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "9:15",
      views: "6,543",
      date: "Nov 28, 2024",
      category: "Training",
    },
    {
      id: "6",
      title: "Media Production Behind the Scenes",
      description: "See how we create content in 40 different languages.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "7:38",
      views: "4,321",
      date: "Nov 25, 2024",
      category: "Production",
    },
  ],
}: {
  className?: string
  pageTitle?: string
  pageSubtitle?: string
  moreVideosTitle?: string
  moreVideosSubtitle?: string

  featuredVideoTitle?: string
  featuredVideoDescription?: string
  featuredVideoUrl?: string
  featuredVideoDuration?: string
  featuredVideoViews?: string
  featuredVideoDate?: string

  videoItems?: VideoItem[]
}) {
  const [selectedVideo, setSelectedVideo] = useState({
    title: featuredVideoTitle,
    description: featuredVideoDescription,
    url: featuredVideoUrl,
    duration: featuredVideoDuration,
    views: featuredVideoViews,
    date: featuredVideoDate,
  })

  // Animation states
  const [heroVisible, setHeroVisible] = useState(false)
  const [videoVisible, setVideoVisible] = useState(false)
  const [gridVisible, setGridVisible] = useState(false)
  const [visibleVideos, setVisibleVideos] = useState<boolean[]>(new Array(videoItems.length).fill(false))

  // Refs
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLElement | null)[]>([])

  // Intersection observers
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "-50px 0px",
    }

    const observers = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: videoRef, setter: setVideoVisible },
      { ref: gridRef, setter: setGridVisible },
    ].map(({ ref, setter }) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setter(true)
        }
      }, observerOptions)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
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

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo({
      title: video.title,
      description: video.description,
      url: video.videoUrl,
      duration: video.duration,
      views: video.views,
      date: video.date,
    })
  }

  const getAnimationClass = (index: number) => {
    const isVisible = visibleVideos[index]
    const baseClasses = "transition-all duration-700 ease-out"
    const hiddenClasses = "opacity-0 translate-y-8 scale-95"
    const visibleClasses = "opacity-100 translate-y-0 scale-100"

    return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`
  }

  return (
    <main className={`overflow-hidden font-light ${className || ""}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="py-32 lg:py-40 bg-gradient-to-b from-slate-50 via-white to-gray-50/30">
        <div className="container mx-auto px-8 lg:px-12 max-w-6xl">
          <div className="text-center">
            <h1
              className={`text-6xl lg:text-7xl font-extralight text-slate-900 leading-[0.9] mb-12 tracking-tight transition-all duration-1400 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <span className="text-slate-900 font-light">{pageTitle}</span>
            </h1>

            <div
              className={`max-w-4xl mx-auto transition-all duration-1200 delay-400 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-light tracking-wide">
                {pageSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section ref={videoRef} className="py-28 bg-white">
        <div className="container mx-auto px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            {/* Video Player */}
            <div
              className={`lg:col-span-2 transition-all duration-1200 ease-out ${
                videoVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-12 scale-95"
              }`}
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <iframe
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Video Info */}
            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                videoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100">
                <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6 leading-tight tracking-tight">
                  {selectedVideo.title}
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed font-light tracking-wide mb-8">
                  {selectedVideo.description}
                </p>

                {/* Video Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Clock className="w-5 h-5" />
                    <span className="font-light tracking-wide">{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Eye className="w-5 h-5" />
                    <span className="font-light tracking-wide">{selectedVideo.views} views</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar className="w-5 h-5" />
                    <span className="font-light tracking-wide">{selectedVideo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Videos Section */}
      <section ref={gridRef} className="py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-8 lg:px-12 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div
              className={`mb-12 transition-all duration-1000 ease-out ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-24 h-px bg-slate-300 mx-auto mb-8"></div>
              <h2 className="text-5xl lg:text-6xl font-extralight text-slate-900 mb-6 leading-tight tracking-tight">
                {moreVideosTitle}
              </h2>
              <h3 className="text-xl font-normal text-slate-600 tracking-wide uppercase">{moreVideosSubtitle}</h3>
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
                onClick={() => handleVideoSelect(video)}
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
    </main>
  )
}
