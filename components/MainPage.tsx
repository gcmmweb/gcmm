"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Globe, Users, Heart, Award } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Counter animation hook
function useCounter(end: number, duration = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

export default function MainPage({ className }: { className?: string }) {
  const { count: count1, ref: stat1Ref } = useCounter(450, 2.5)
  const { count: count2, ref: stat2Ref } = useCounter(112, 2.2)
  const { count: count3, ref: stat3Ref } = useCounter(100, 2.8)

  return (
    <div className={cn("bg-white", className)}>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-black bg-opacity-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <div className="rounded-sm overflow-hidden">
                <img src="/logo.png" alt="GCM Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-slate-900"></div>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-10">
              {["Home", "Ministries", "News", "About", "Contact", "Videos"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-100 hover:text-blue-900 transition-colors font-medium text-sm tracking-wide"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 200 }}
              >
                <Button className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-7 py-2.5 text-sm tracking-wide">
                  Donate
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:hidden"
            >
              <button className="text-slate-700 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-16 pb-20 lg:pt-24 lg:pb-28 items-center">
            {/* Left Content - 2/3 */}
            <div className="lg:col-span-2">
              <div className="max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-slate-900 mb-8 leading-[1.1] tracking-tight"
                >
                  Advancing the
                  <br />
                  <span className="font-medium text-blue-900">Great Commission</span>
                  <br />
                  through Strategic Media
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-light max-w-2xl"
                >
                  Empowering global ministry through innovative media initiatives, strategic partnerships, and digital
                  platforms that reach communities worldwide with transformative Gospel content.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <Button className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-8 py-3.5 text-base tracking-wide">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Our Mission
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-900 hover:bg-blue-50 font-medium px-8 py-3.5 text-base tracking-wide"
                  >
                    Explore Ministries
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100"
                >
                  <div ref={stat1Ref}>
                    <motion.div
                      className="text-2xl md:text-3xl font-playfair font-light text-blue-900 mb-1"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.3, type: "spring", stiffness: 200 }}
                    >
                      {count1}M+
                    </motion.div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest font-medium">
                      Reached with the Gospel
                    </div>
                  </div>
                  <div ref={stat2Ref}>
                    <motion.div
                      className="text-2xl md:text-3xl font-playfair font-light text-blue-900 mb-1"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.5, type: "spring", stiffness: 200 }}
                    >
                      {count2}+
                    </motion.div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest font-medium">
                      City Campaigns Conducted
                    </div>
                  </div>
                  <div ref={stat3Ref}>
                    <motion.div
                      className="text-2xl md:text-3xl font-playfair font-light text-blue-900 mb-1"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.7, type: "spring", stiffness: 200 }}
                    >
                      {count3}M+
                    </motion.div>
                    <div className="text-xs text-slate-600 uppercase tracking-widest font-medium">
                      Watch in the Islamic World
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Content - 1/3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 100 }}
              className="lg:col-span-1"
            >
              <div className="">
                <div className="text-center">
                  <div className="rounded-full overflow-hidden mx-auto mb-32">
                    <img src="/viet.avif" alt="Ministry Badge" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-blue-50 py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
              {/* Left - 1/3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-playfair font-light text-slate-900 mb-6 leading-tight">
                  Our Global
                  <br />
                  <span className="text-blue-900 font-medium">Impact</span>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Through strategic partnerships and innovative technology, we're transforming how the Gospel reaches
                  communities worldwide.
                </p>
                <Button className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-3 text-sm tracking-wide">
                  View All Programs
                </Button>
              </motion.div>

              {/* Right - 2/3 */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Global Broadcasting",
                    description:
                      "Delivering transformative content across television and digital platforms to 100 million Arabs monthly.",
                  },
                  {
                    icon: Users,
                    title: "Mega City Campaigns",
                    description:
                      "GCM Ministries has conducted more than 110 city-wide, high-intensity megacity media campaigns.",
                  },
                  {
                    icon: Heart,
                    title: "Israel & Jewish Ministry",
                    description:
                      "The gospel to the Jews is God's priority.  Preaching the gospel to the Jews is first and foremost.",
                  },
                  {
                    icon: Award,
                    title: "Ministry Excellence",
                    description:
                      "Maintaining the highest standards in production, theological accuracy, and ministry effectiveness.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6"
                    >
                      <item.icon className="w-6 h-6 text-blue-900" />
                    </motion.div>
                    <h3 className="text-xl font-playfair font-medium text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}