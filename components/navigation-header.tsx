"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, Menu, Search, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export interface DropdownItemWithUrl {
  label: string
  url: string
}

export function NavigationHeader({
  className,
  logoSrc = "/logo.png",
  logoAlt = "GCM Logo",
  logoWidth = 120,
  logoHeight = 40,
  navigationItems = ["Home", "Who we are", "What we do", "Get involved", "News", "Contact", "Videos"],
  homeUrl = "/",
  newsUrl = "/news",
  contactUrl = "/contact",
  videosUrl = "/videos",
  donateText = "Donate",
  donateUrl = "/donate",
  showDonateButton = true,
  showHome = true,
  showWhoWeAre = true,
  showWhatWeDo = true,
  showGetInvolved = true,
  showNews = true,
  showContact = true,
  showVideos = true,
  showSearch = true,
  searchPlaceholder = "Search articles...",
  headerBackgroundColor = "#000000",
  textColor = "#f3f4f6",
  hoverTextColor = "#1e3a8a",
  buttonBackgroundColor = "#1e3a8a",
  buttonHoverColor = "#1e40af",
  buttonTextColor = "#ffffff",
  navItemSpacing = 40,
  navItemPaddingX = 28,
  navItemPaddingY = 10,
  fontFamily = "font-sans",
  fontSize = "text-sm",
  fontWeight = "font-medium",
  whoWeAreDropdownItems = [
    { label: "About", url: "/about" },
    { label: "History", url: "/history" },
    { label: "Team", url: "/team" },
  ],
  whatWeDoDropdownItems = [
    { label: "Mega City Media Campaign", url: "/mega-city-media-campaign" },
    { label: "Media Outreach to the 10/40 Window", url: "/media-outreach-10-40-window" },
    { label: "Recovery from Trauma", url: "/recovery-from-trauma" },
    { label: "Israel Jewish Ministry", url: "/israel-jewish-ministry" },
    { label: "Humanitarian Aid to Ukraine", url: "/humanitarian-aid-ukraine" },
  ],
  getInvolvedDropdownItems = [
    { label: "Pray", url: "/pray" },
    { label: "Donate", url: "/donate-involved" },
    { label: "News & Stories (Newsletter hub)", url: "/news-stories" },
    { label: "Newsletter sign-up", url: "/newsletter-signup" },
    { label: "Contact us", url: "/contact-us" },
  ],
  onMobileMenuClick,
}: {
  className?: string
  logoSrc?: string
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
  navigationItems?: string[]
  homeUrl?: string
  newsUrl?: string
  contactUrl?: string
  videosUrl?: string
  donateText?: string
  donateUrl?: string
  showDonateButton?: boolean
  showHome?: boolean
  showWhoWeAre?: boolean
  showWhatWeDo?: boolean
  showGetInvolved?: boolean
  showNews?: boolean
  showContact?: boolean
  showVideos?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  headerBackgroundColor?: string
  textColor?: string
  hoverTextColor?: string
  buttonBackgroundColor?: string
  buttonHoverColor?: string
  buttonTextColor?: string
  navItemSpacing?: number
  navItemPaddingX?: number
  navItemPaddingY?: number
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  whoWeAreDropdownItems?: DropdownItemWithUrl[]
  whatWeDoDropdownItems?: DropdownItemWithUrl[]
  getInvolvedDropdownItems?: DropdownItemWithUrl[]
  onMobileMenuClick?: () => void
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const router = useRouter()

  const visibilityMap = {
    Home: showHome,
    "Who we are": showWhoWeAre,
    "What we do": showWhatWeDo,
    "Get involved": showGetInvolved,
    News: showNews,
    Contact: showContact,
    Videos: showVideos,
  }

  const visibleNavigationItems = navigationItems.filter(
    (item) => visibilityMap[item as keyof typeof visibilityMap] !== false,
  )

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    onMobileMenuClick?.()
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setMobileOpenDropdown(null)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
    }
  }

  const getDropdownItemUrl = (item: string, dropdownType: string): string => {
    if (dropdownType === "Who we are") {
      const found = whoWeAreDropdownItems.find((d) => d.label === item)
      return found?.url || `/${item.toLowerCase().replace(/\s+/g, "-")}`
    }
    if (dropdownType === "What we do") {
      const found = whatWeDoDropdownItems.find((d) => d.label === item)
      return found?.url || `/${item.toLowerCase().replace(/\s+/g, "-")}`
    }
    if (dropdownType === "Get involved") {
      const found = getInvolvedDropdownItems.find((d) => d.label === item)
      return found?.url || `/${item.toLowerCase().replace(/\s+/g, "-")}`
    }
    return `/${item.toLowerCase().replace(/\s+/g, "-")}`
  }

  const getNavigationItemUrl = (item: string): string => {
    switch (item) {
      case "Home":
        return homeUrl
      case "News":
        return newsUrl
      case "Contact":
        return contactUrl
      case "Videos":
        return videosUrl
      default:
        return `/${item.toLowerCase().replace(/\s+/g, "-")}`
    }
  }

  const hasDropdown = (item: string) => {
    return item === "Who we are" || item === "What we do" || item === "Get involved"
  }

  const getDropdownItems = (item: string) => {
    if (item === "Who we are") return whoWeAreDropdownItems
    if (item === "What we do") return whatWeDoDropdownItems
    if (item === "Get involved") return getInvolvedDropdownItems
    return []
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: headerBackgroundColor }}
        className={cn(`border-b border-black sticky top-0 z-50 backdrop-blur-md`, className)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center"
              style={{ gap: `16px` }}
            >
              <Link
                href={homeUrl}
                className="flex items-center hover:opacity-80 transition-opacity duration-200"
                style={{ gap: `12px` }}
              >
                <img
                  src={logoSrc || "/placeholder.svg"}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-auto max-w-none object-contain"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div
              className="hidden lg:flex flex-row flex-nowrap items-center"
              style={{ gap: `${navItemSpacing * 0.6}px`, marginLeft: "24px" }}
            >
              {visibleNavigationItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {hasDropdown(item) ? (
                    <div className="relative">
                      <button
                        className={`transition-colors ${fontWeight} ${fontFamily} ${fontSize} tracking-wide flex items-center gap-1 whitespace-nowrap`}
                        style={{
                          color: hoveredItem === item || openDropdown === item ? hoverTextColor : textColor,
                          paddingLeft: `${navItemPaddingX * 0.6}px`,
                          paddingRight: `${navItemPaddingX * 0.6}px`,
                          paddingTop: `${navItemPaddingY}px`,
                          paddingBottom: `${navItemPaddingY}px`,
                        }}
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {openDropdown === item && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg overflow-hidden z-50"
                          >
                            {getDropdownItems(item).map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                href={dropdownItem.url}
                                className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-sm"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={getNavigationItemUrl(item)}
                      className={`transition-colors ${fontWeight} ${fontFamily} ${fontSize} tracking-wide whitespace-nowrap`}
                      style={{
                        color: hoveredItem === item ? hoverTextColor : textColor,
                        paddingLeft: `${navItemPaddingX * 0.6}px`,
                        paddingRight: `${navItemPaddingX * 0.6}px`,
                        paddingTop: `${navItemPaddingY}px`,
                        paddingBottom: `${navItemPaddingY}px`,
                      }}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {item}
                    </Link>
                  )}
                </motion.div>
              ))}

              {showSearch && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0, type: "spring", stiffness: 200 }}
                >
                  <button
                    onClick={toggleSearch}
                    className="transition-colors p-2 hover:bg-white/10 rounded-md"
                    style={{ color: textColor }}
                    aria-label="Search articles"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {showDonateButton && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 200 }}
                >
                  <Link href={donateUrl}>
                    <Button
                      className={`cursor-pointer ${fontWeight} ${fontFamily} ${fontSize} tracking-wide`}
                      style={{
                        backgroundColor: isButtonHovered ? buttonHoverColor : buttonBackgroundColor,
                        color: buttonTextColor,
                        paddingLeft: `${navItemPaddingX * 0.7}px`,
                        paddingRight: `${navItemPaddingX * 0.7}px`,
                        paddingTop: `${navItemPaddingY}px`,
                        paddingBottom: `${navItemPaddingY}px`,
                      }}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      {donateText}
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:hidden flex items-center space-x-2"
            >
              {showSearch && (
                <button
                  onClick={toggleSearch}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
                  style={{ color: textColor }}
                  aria-label="Search articles"
                >
                  <Search className="w-6 h-6" />
                </button>
              )}
              <button
                className="p-2 hover:bg-white/10 rounded-md transition-colors"
                style={{ color: textColor }}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-t border-gray-700 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder={searchPlaceholder}
  className="w-full px-4 py-2 bg-white border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  autoFocus
/>

                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: buttonBackgroundColor,
                      color: buttonTextColor,
                    }}
                    className="px-6 py-2"
                  >
                    Search
                  </Button>
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="hover:text-gray-300 p-2"
                    style={{ color: textColor }}
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <img
                    src={logoSrc || "/placeholder.svg"}
                    alt={logoAlt}
                    width={logoWidth * 0.8}
                    height={logoHeight * 0.8}
                    className="h-auto max-w-none object-contain"
                  />
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="flex-1 py-6">
                  <nav className="space-y-1">
                    {visibleNavigationItems.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {hasDropdown(item) ? (
                          <div>
                            <button
                              className={`w-full flex items-center justify-between px-6 py-3 text-gray-900 hover:bg-gray-50 transition-colors ${fontWeight} ${fontFamily} text-base`}
                              onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item ? null : item)}
                            >
                              <span>{item}</span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  mobileOpenDropdown === item ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {mobileOpenDropdown === item && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="bg-gray-50 overflow-hidden"
                                >
                                  {getDropdownItems(item).map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.label}
                                      href={dropdownItem.url}
                                      className="block pl-12 pr-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                                      onClick={closeMobileMenu}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={getNavigationItemUrl(item)}
                            className={`block px-6 py-3 text-gray-900 hover:bg-gray-50 hover:text-blue-900 transition-colors ${fontWeight} ${fontFamily} text-base`}
                            onClick={closeMobileMenu}
                          >
                            {item}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Mobile Donate Button */}
                {showDonateButton && (
                  <div className="p-6 border-t border-gray-200">
                    <Link href={donateUrl} onClick={closeMobileMenu}>
                      <Button
                        className={`w-full ${fontWeight} ${fontFamily} py-3 text-base`}
                        style={{
                          backgroundColor: buttonBackgroundColor,
                          color: buttonTextColor,
                        }}
                      >
                        {donateText}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
