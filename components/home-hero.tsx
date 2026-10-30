"use client"

// components/home-hero.tsx
// The homepage hero (video/poster, title, three buttons and the three stats).
// Split out of main-page-cinematic.tsx (Oct 2026) so other sections, like an appeal
// band, can sit between the hero and the ministry cards.
// All setting names and defaults are the same as the old "Cinematic Main Page",
// so values carry over in Plasmic Studio.
import React from "react"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

function getYouTubeVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com")) {
      // https://www.youtube.com/watch?v=ID or other variants
      return u.searchParams.get("v")
    }
    if (u.hostname === "youtu.be") {
      // https://youtu.be/ID or https://youtu.be/ID?si=...
      return u.pathname.slice(1) || null
    }
  } catch {
    return null
  }
  return null
}

function getVimeoVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    // Match vimeo.com/123456789 or player.vimeo.com/video/123456789
    if (u.hostname.includes("vimeo.com")) {
      const match = u.pathname.match(/\/(?:video\/)?(\d+)/)
      return match ? match[1] : null
    }
  } catch {
    return null
  }
  return null
}

// Counter animation hook
// FIX (Sep 2026, pre-TV-launch SEO review): this used to start every
// counter at 0 via useState(0), so the number only ever became correct
// after client JS ran the count-up animation. Google (and anyone/anything
// that doesn't execute JS) only ever saw "0M+", "0+", "0+" in the actual
// HTML response -- confirmed live: curl'ing the homepage showed literal
// `0<!-- -->M+` where "500M+" should be.
//
// Fix: seed state with the real `end` value so SSR/first paint has the
// correct number, then reset to 0 in a layout effect (fires after commit
// but before the browser paints) so real visitors still see the exact
// same start-at-0-and-count-up animation as before -- nothing changes
// visually, only what non-JS clients and crawlers receive.
function useCounter(end: number, duration = 2) {
  const [count, setCount] = useState(end)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useLayoutEffect(() => {
    setCount(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref }
}

export function HomeHero({
  className,
  // Hero Section
  heroTitle = "45 Years of Global",
  heroHighlight = "Ministry Commitment",
  heroSubtitle = "GCM Ministries partners with indigenous churches worldwide to share the Gospel through strategic media campaigns and compassionate outreach.",
  videoUrl = "/clip_1080p.mp4",
  mobileVideoUrl = "/hero-loop-mobile.mp4",
  videoPosterUrl = "/images/skdimore.jpeg",
  // Hero Colors
  heroOverlayColor = "#00000066",
  heroTitleColor = "#ffffff",
  heroSubtitleColor = "#e5e5e5",
  // Hero Buttons
  button1Text = "Watch Our Story",
  button1Link = "/videos",
  button1BgColor = "#ffffff",
  button1TextColor = "#000000",
  button1HoverBgColor = "#e5e5e5",
  button2Text = "Explore Ministries",
  button2Link = "/ministries",
  button2BorderColor = "#ffffff80",
  button2TextColor = "#ffffff",
  button2HoverBgColor = "#ffffff",
  button2HoverTextColor = "#000000",
  button3Text = "Sign Up for Our Newsletter",
  button3Link = "/signup",
  button3BorderColor = "#ffffff80",
  button3TextColor = "#ffffff",
  button3HoverBgColor = "#ffffff",
  button3HoverTextColor = "#000000",
  // Statistics
  stat1 = 450,
  stat2 = 112,
  stat3 = 100,
  stat1Label = "People Reached",
  stat1Suffix = "M+",
  stat2Label = "City Campaigns",
  stat2Suffix = "+",
  stat3Label = "Countries Served",
  stat3Suffix = "+",
  statsTextColor = "#ffffff",
  statsLabelColor = "#ffffffb3",
  statsBottomSpacingMobile = 64,
}: {
  className?: string
  heroTitle?: string
  heroHighlight?: string
  heroSubtitle?: string
  videoUrl?: string // MP4 path, YouTube URL, or Vimeo URL
  mobileVideoUrl?: string // Lightweight MP4 used only in the mobile hero block
  videoPosterUrl?: string
  heroOverlayColor?: string
  heroTitleColor?: string
  heroSubtitleColor?: string
  button1Text?: string
  button1Link?: string
  button1BgColor?: string
  button1TextColor?: string
  button1HoverBgColor?: string
  button2Text?: string
  button2Link?: string
  button2BorderColor?: string
  button2TextColor?: string
  button2HoverBgColor?: string
  button2HoverTextColor?: string
  button3Text?: string
  button3Link?: string
  button3BorderColor?: string
  button3TextColor?: string
  button3HoverBgColor?: string
  button3HoverTextColor?: string
  stat1?: number
  stat2?: number
  stat3?: number
  statsTextColor?: string
  statsLabelColor?: string
  statsBottomSpacingMobile?: number
  stat1Label?: string
  stat1Suffix?: string
  stat2Label?: string
  stat2Suffix?: string
  stat3Label?: string
  stat3Suffix?: string
}) {
  const { count: count1, ref: stat1Ref } = useCounter(stat1, 2.5)
  const { count: count2, ref: stat2Ref } = useCounter(stat2, 2.2)
  const { count: count3, ref: stat3Ref } = useCounter(stat3, 2.8)

  const youTubeId = getYouTubeVideoId(videoUrl)
  const vimeoId = getVimeoVideoId(videoUrl)

  // Added Sep 2026: mobile was autoplaying the exact same 1.8MB/25s desktop
  // hero video, downloaded fetchPriority="high" -- the single biggest thing
  // on the page, competing directly with everything needed to make the page
  // usable. This is a separate, purpose-made clip for the mobile block only:
  // 640x360, 6s loop, ~160KB (92% smaller) -- same motion/energy, a fraction
  // of the weight. Defaults to the compressed clip but falls back to the
  // main videoUrl if this prop is ever cleared in Plasmic.
  const mobileSource = mobileVideoUrl || videoUrl

  // FIX (Sep 2026): previously both the mobile AND desktop hero video blocks
  // below were always mounted in the DOM at the same time -- Tailwind's
  // `hidden` class only sets display:none, it does not stop the browser
  // from downloading/buffering a <video> (or an iframe embed). Confirmed
  // live: the "desktop-only" video was fully buffered even on a mobile-width
  // viewport, meaning mobile visitors downloaded the entire desktop hero
  // video for nothing. Now we detect the real viewport in JS and only mount
  // the actual video/iframe for whichever breakpoint is showing; the other
  // breakpoint's wrapper just shows the lightweight poster image instead.
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  useEffect(() => {
    // Start the mobile hero video only after the page has finished loading,
    // so the video download does not compete with the page itself.
    if (document.readyState === "complete") {
      setVideoReady(true)
      return
    }
    const onLoad = () => setVideoReady(true)
    window.addEventListener("load", onLoad)
    return () => window.removeEventListener("load", onLoad)
  }, [])
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mq.matches)
    setMounted(true)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
  <div className={cn("relative", className)}>
    {/* Hero Section */}
    <section
      className="
        relative
        overflow-hidden
        h-auto
        md:h-auto
        md:[aspect-ratio:16/9]
      "
    >
      {/* --- MOBILE: poster photo always stays in the page; the video is layered on top after load --- */}
      <div className="block md:hidden w-full bg-white">
        <div className="relative w-full aspect-[16/9]">
          {/* The poster photo is in the first HTML and is never removed, so the
              browser counts it as the main picture right away instead of waiting
              for JavaScript to swap in a video. */}
          <img
            src={videoPosterUrl || "/placeholder.svg"}
            alt="Mountain landscape"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {mounted && !isDesktop && youTubeId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1&playsinline=1`}
              title="Background video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen={false}
            />
          ) : mounted && !isDesktop && vimeoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
              title="Background video"
              allow="autoplay; fullscreen; picture-in-picture"
            />
          ) : mounted && !isDesktop && videoReady ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={videoPosterUrl}
              onEnded={(e) => {
                // Safety net: only runs if the browser reaches a true "ended"
                // state without looping on its own.
                const v = e.currentTarget
                v.currentTime = 0
                v.play().catch(() => {})
              }}
            >
              <source src={mobileSource} type="video/mp4" />
            </video>
          ) : null}
        </div>
      </div>

      {/* --- DESKTOP / TABLET: video as absolute background with overlay content --- */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden">
        {mounted && isDesktop ? (
          youTubeId ? (
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1&playsinline=1`}
              title="Background video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen={false}
            />
          ) : vimeoId ? (
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
              title="Background video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen={false}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              fetchPriority="high"
              className="w-full h-full object-cover"
              poster={videoPosterUrl}
              onEnded={(e) => {
                // SAFETY NET (Sep 2026): see matching comment on the mobile
                // video above -- only fires if native loop fails.
                const v = e.currentTarget
                v.currentTime = 0
                v.play().catch(() => {})
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              <img
                src={videoPosterUrl || "/placeholder.svg"}
                alt="Mountain landscape"
                className="w-full h-full object-cover"
              />
            </video>
          )
        ) : (
          <img
            src={videoPosterUrl || "/placeholder.svg"}
            alt="Mountain landscape"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: heroOverlayColor }} />
      </div>

      {/* Hero Content */}
      <div
        className="
          relative z-10
          w-full max-w-4xl mx-auto px-6
          flex flex-col items-center justify-center text-center
          pt-10 pb-16 md:pt-0 md:pb-0 md:h-full
        "
        style={{ paddingTop: 40 }}
      >

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="
            text-black
            md:[color:var(--hero-title)]
            text-5xl md:text-6xl lg:text-7xl 
            font-serif font-light leading-[1.1] mb-8 tracking-tight
          "
          style={{ "--hero-title": heroTitleColor } as React.CSSProperties}
        >
          {heroTitle}
          <br />
          <span className="font-normal">{heroHighlight}</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          className="
            text-black
            md:[color:var(--hero-subtitle)]
            text-lg md:text-xl font-light leading-relaxed mb-12 max-w-3xl mx-auto
          "
          style={{ "--hero-subtitle": heroSubtitleColor } as React.CSSProperties}
        >
          {heroSubtitle}
        </motion.p>

        {/* Hero Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            asChild
            className="font-medium px-8 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 flex items-center"
            style={{
              backgroundColor: button1BgColor,
              // pass the dynamic text colour into a CSS variable so child can use it at md+
              ["--btn-text" as any]: button1TextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = button1HoverBgColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = button1BgColor
            }}
          >
            <Link href={button1Link} className="text-black md:[color:var(--btn-text)]">
              <Play className="w-5 h-5 mr-2" />
              {button1Text}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="font-medium px-8 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 bg-transparent flex items-center"
            style={{
              borderColor: button2BorderColor,
              // pass the dynamic text colour into a CSS variable so child can use it at md+
              ["--btn-text" as any]: button2TextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = button2HoverBgColor
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button2HoverTextColor)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button2TextColor)
            }}
          >
            <Link href={button2Link} className="text-black md:[color:var(--btn-text)]">
              {button2Text}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="font-medium px-8 py-4 text-base tracking-wide rounded-full transition-all duration-300 hover:scale-105 bg-transparent flex items-center"
            style={{
              borderColor: button3BorderColor,
              // pass the dynamic text colour into a CSS variable so child can use it at md+
              ["--btn-text" as any]: button3TextColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = button3HoverBgColor
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button3HoverTextColor)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              ;(e.currentTarget as HTMLElement).style.setProperty("--btn-text", button3TextColor)
            }}
          >
            <Link href={button3Link} className="text-black md:[color:var(--btn-text)]">
              {button3Text}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          style={{ marginBottom: `${statsBottomSpacingMobile}px` }}
        >
          {[
            { count: count1, ref: stat1Ref, label: stat1Label, suffix: stat1Suffix },
            { count: count2, ref: stat2Ref, label: stat2Label, suffix: stat2Suffix },
            { count: count3, ref: stat3Ref, label: stat3Label, suffix: stat3Suffix },
          ].map(({ count, ref, label, suffix }, index) => (
            <div key={index} ref={ref} className="text-center">
              <motion.div
                className="
                  text-black
                  md:[color:var(--stats-text)]
                  text-3xl md:text-4xl font-serif font-light mb-2
                "
                style={{ ["--stats-text" as any]: statsTextColor }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 2.8 + index * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {count}
                {suffix}
              </motion.div>
              <div
                className="
                  text-black
                  md:[color:var(--stats-label)]
                  text-sm uppercase tracking-widest font-light
                "
                style={{ ["--stats-label" as any]: statsLabelColor }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

  </div>
)}
