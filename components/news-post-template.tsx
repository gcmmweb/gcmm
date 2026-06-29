"use client"

import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface NewsPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  slug: string
}

interface ContentBlock {
  type: "text" | "image" | "text-image" | "button"
  heading?: string
  text?: string
  headingColor?: string
  headingSize?: number
  headingFontWeight?: number
  imageUrl?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  imageBorderRadius?: number
  buttonText?: string
  buttonUrl?: string
  buttonBackgroundColor?: string
  buttonHoverBackgroundColor?: string
  buttonTextColor?: string
  buttonBorderRadius?: number
  buttonPaddingX?: number
  buttonPaddingY?: number
  buttonFontSize?: number
  backgroundColor?: string
  paddingTop?: number
  paddingBottom?: number
  textAlign?: "left" | "center" | "right"
  layoutStyle?: "side-by-side" | "stacked"
  imagePosition?: "left" | "right"
  maxWidth?: number
}

interface NewsPostTemplateProps {
  post?: {
    id?: string
    title?: string
    excerpt?: string
    image?: string
    date?: string
    slug?: string
  }
  heroTitle?: string
  heroTitleColor?: string
  heroTitleSize?: number
  heroTitleFontWeight?: number
  showQuote?: boolean
  heroQuote?: string
  heroQuoteColor?: string
  heroQuoteSize?: number
  heroAuthor?: string
  heroDate?: string
  postContent?: string
  contentFontSize?: number
  contentColor?: string
  contentLineHeight?: number
  contentBlocks?: ContentBlock[]
  newsletterTitle?: string
  newsletterTitleColor?: string
  newsletterTitleSize?: number
  newsletterBackgroundColor?: string
  newsletterTextColor?: string
  newsletterButtonColor?: string
  newsletterButtonHoverColor?: string
  recentPostsTitle?: string
  recentPostsTitleSize?: number
  recentPostsTitleColor?: string
  previousPostLabel?: string
  nextPostLabel?: string
  recentPosts?: NewsPost[]
  previousPost?: NewsPost & { url?: string }
  nextPost?: NewsPost & { url?: string }
  heroBackgroundImage?: string
  heroOverlayColor?: string
  heroOverlayOpacity?: number
  onNewsletterSignup?: (email: string, firstName: string, lastName: string, country: string) => void
  className?: string
}

export const NewsPostTemplate = ({
  post,
  heroTitle,
  heroTitleColor = "#ffffff",
  heroTitleSize = 64,
  heroTitleFontWeight = 700,
  showQuote = true,
  heroQuote,
  heroQuoteColor = "#ffffff",
  heroQuoteSize = 24,
  heroAuthor,
  heroDate,
  postContent,
  contentFontSize = 18,
  contentColor = "#4a4a4a",
  contentLineHeight = 1.8,
  contentBlocks = [],
  newsletterTitle = "Stay Connected With Us",
  newsletterTitleColor = "#ffffff",
  newsletterTitleSize = 24,
  newsletterBackgroundColor = "#1e3a5f",
  newsletterTextColor = "#ffffff",
  newsletterButtonColor = "#4a9eff",
  newsletterButtonHoverColor = "#3b87d9",
  recentPostsTitle = "Recent Posts",
  recentPostsTitleSize = 20,
  recentPostsTitleColor = "#1a1a1a",
  previousPostLabel = "Previous Article",
  nextPostLabel = "Next Article",
  recentPosts = [],
  previousPost,
  nextPost,
  heroBackgroundImage,
  heroOverlayColor = "#000000",
  heroOverlayOpacity = 0.5,
  onNewsletterSignup,
  className = "",
}: NewsPostTemplateProps) => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [signupMessage, setSignupMessage] = useState("")
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay || "0"
            el.style.transitionDelay = `${delay}s`
            el.classList.add("visible")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".animate-item")
        items.forEach((item, index) => {
          const el = item as HTMLElement
          el.dataset.delay = (index * 0.12).toString()
          observer.observe(el)
        })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && firstName && lastName) {
      setIsSubmittingNewsletter(true)

      const formData = new FormData()
      formData.append("EMAIL", email)
      formData.append("FNAME", firstName)
      formData.append("LNAME", lastName)

      try {
        await fetch(
          "https://GCMM.us4.list-manage.com/subscribe/post?u=318fc9b1880100b326b3ddf87&id=b03a1478c0&f_id=00f81feaf0",
          {
            method: "POST",
            body: formData,
            mode: "no-cors",
          },
        )
        setIsNewsletterSubmitted(true)
        setEmail("")
        setFirstName("")
        setLastName("")
        setTimeout(() => setIsNewsletterSubmitted(false), 5000)
      } catch (error) {
        console.error("Subscription error:", error)
      } finally {
        setIsSubmittingNewsletter(false)
      }
    }
  }

  const renderRichText = (content: string | undefined) => {
    if (!content) return null
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  const renderContentBlock = (block: ContentBlock, index: number) => {
    return (
      <div
        key={index}
        className="animate-item"
        style={{
          backgroundColor: block.backgroundColor || "#ffffff",
          paddingTop: `${block.paddingTop || 60}px`,
          paddingBottom: `${block.paddingBottom || 60}px`,
        }}
      >
        <div
          style={{
            maxWidth: `${block.maxWidth || 1200}px`,
            margin: "0 auto",
            padding: "0 40px",
            display: block.layoutStyle === "stacked" ? "block" : "flex",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {block.type === "text" && (
            <div style={{ flex: 1 }}>
              {block.heading && (
                <h2
                  style={{
                    fontSize: `${block.headingSize || 42}px`,
                    fontWeight: block.headingFontWeight || 700,
                    color: block.headingColor || "#1a1a1a",
                    marginBottom: "20px",
                    lineHeight: 1.3,
                  }}
                >
                  {renderRichText(block.heading)}
                </h2>
              )}
              {block.text && (
                <div
  className="content-block-text"
  style={{
    fontSize: `${contentFontSize}px`,
    color: contentColor,
  }}
>
  {renderRichText(block.text)}
</div>


              )}
            </div>
          )}

          {block.type === "image" && block.imageUrl && (
            <div
              style={{
                flex: 1,
                order: block.imagePosition === "left" ? -1 : 0,
              }}
            >
              <img
                src={block.imageUrl || "/placeholder.svg"}
                alt={block.imageAlt || "Content image"}
                style={{
                  width: "100%",
                  maxWidth: `${block.imageWidth || "100%"}px`,
                  height: "auto",
                  borderRadius: `${block.imageBorderRadius || 0}px`,
                }}
              />
            </div>
          )}

          {block.type === "text-image" && (
            <>
              <div style={{ flex: 1 }}>
                {block.heading && (
                  <h2
                    style={{
                      fontSize: `${block.headingSize || 42}px`,
                      fontWeight: block.headingFontWeight || 700,
                      color: block.headingColor || "#1a1a1a",
                      marginBottom: "20px",
                    }}
                  >
                    {renderRichText(block.heading)}
                  </h2>
                )}
                {block.text && (
                  <div
  className="content-block-text"
  style={{
    fontSize: `${contentFontSize}px`,
    color: contentColor,
  }}
>
  {renderRichText(block.text)}
</div>


                )}
              </div>
              {block.imageUrl && (
                <div
                  style={{
                    flex: 1,
                    order: block.imagePosition === "left" ? -1 : 0,
                  }}
                >
                  <img
                    src={block.imageUrl || "/placeholder.svg"}
                    alt={block.imageAlt || "Content image"}
                    style={{
                      width: "100%",
                      borderRadius: `${block.imageBorderRadius || 0}px`,
                    }}
                  />
                </div>
              )}
            </>
          )}

          {block.type === "button" && block.buttonText && (
            <div style={{ textAlign: "center" }}>
              <a
                href={block.buttonUrl || "#"}
                style={{
                  display: "inline-block",
                  backgroundColor: block.buttonBackgroundColor || "#4a9eff",
                  color: block.buttonTextColor || "#ffffff",
                  padding: `${block.buttonPaddingY || 12}px ${block.buttonPaddingX || 32}px`,
                  borderRadius: `${block.buttonBorderRadius || 4}px`,
                  textDecoration: "none",
                  fontSize: `${block.buttonFontSize || 16}px`,
                  fontWeight: 600,
                  transition: "background-color 200ms ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = block.buttonHoverBackgroundColor || "#3b87d9"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = block.buttonBackgroundColor || "#4a9eff"
                }}
              >
                {block.buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  const displayTitle = heroTitle || post?.title
  const displayQuote = heroQuote || post?.excerpt
  const displayAuthor = heroAuthor
  const displayDate = heroDate || post?.date
  const displayContent = postContent || post?.excerpt
  const displayNewsletterTitle = newsletterTitle
  const displayRecentPostsTitle = recentPostsTitle
  const displayPreviousLabel = previousPostLabel
  const displayNextLabel = nextPostLabel

  return (
    <div ref={containerRef} className={`news-post-template bg-white ${className}`}>
      <style>{`
        /* Responsive heading sizes using clamp() */
        .news-post-template .hero-content h1,
        .news-post-template .hero-content .hero-title {
          font-size: clamp(28px, 5vw, 64px) !important;
        }
        
        .news-post-template .hero-content h2 {
          font-size: clamp(20px, 4vw, 48px) !important;
        }
        
        .news-post-template .post-content h1 {
          font-size: clamp(24px, 4vw, 42px) !important;
        }
        
        .news-post-template .post-content h2 {
          font-size: clamp(20px, 3.5vw, 36px) !important;
        }
        
        .news-post-template .post-content h3 {
          font-size: clamp(18px, 3vw, 28px) !important;
        }
        
        .news-post-template .post-content h4 {
          font-size: clamp(16px, 2.5vw, 24px) !important;
        }
        
        .news-post-template .post-content h5 {
          font-size: clamp(16px, 2.5vw, 24px) !important;
        }
        
        .news-post-template .post-content h6 {
          font-size: clamp(16px, 2.5vw, 24px) !important;
        }
        
        .news-post-template .post-content p {
          font-size: clamp(14px, 2vw, 18px) !important;
          margin: 0 0 1.5em 0 !important;
        }
        
        .news-post-template .post-content p:last-child {
          margin-bottom: 0 !important;
        }
        
        .news-post-template .post-content img {
          display: block;
          margin: 1.5em 0 !important;
          max-width: 100%;
          height: auto;
        }
        
        .news-post-template .post-content h1,
        .news-post-template .post-content h2,
        .news-post-template .post-content h3,
        .news-post-template .post-content h4,
        .news-post-template .post-content h5,
        .news-post-template .post-content h6 {
          margin: 1.5em 0 0.75em 0 !important;
        }
        
        .news-post-template .post-content h1:first-child,
        .news-post-template .post-content h2:first-child,
        .news-post-template .post-content h3:first-child,
        .news-post-template .post-content h4:first-child,
        .news-post-template .post-content h5:first-child,
        .news-post-template .post-content h6:first-child {
          margin-top: 0 !important;
        }
        
        .news-post-template .post-content figure {
          margin: 1.5em 0 !important;
        }
        
        .news-post-template .post-content figcaption {
          margin-top: 0.5em !important;
          font-size: 0.875em;
          color: #666;
        }
        
        .news-post-template .post-content blockquote {
          margin: 1.5em 0 !important;
          padding-left: 1.5em;
          border-left: 3px solid #d4a574;
        }
        
        .news-post-template .post-content ul,
        .news-post-template .post-content ol {
          margin: 1.5em 0 !important;
          padding-left: 1.5em;
        }
        
        .news-post-template .post-content li {
          margin-bottom: 0.5em !important;
        }

        /* Video and iframe overflow fix */
        .news-post-template iframe,
        .news-post-template video,
        .news-post-template embed,
        .news-post-template object {
          max-width: 100% !important;
          width: 100% !important;
        }
        
        .news-post-template .post-content {
          overflow-x: hidden;
        }
        
        .news-post-template .post-content > div {
          overflow-x: hidden;
        }

        /* Scroll animation styles */
        .news-post-template .animate-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .news-post-template .animate-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .news-post-template .animate-item.img-item {
          transform: translateY(30px) scale(0.98);
        }
        
        .news-post-template .animate-item.img-item.visible {
          transform: translateY(0) scale(1);
        }

        @media (max-width: 768px) {
          .news-post-template .main-content-wrapper {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 40px 20px !important;
          }

          .news-post-template .post-content {
            order: 1;
          }

          .news-post-template .sidebar {
            order: 2;
            max-width: 100%;
          }
          
          .news-post-template .hero-content {
            padding: 20px !important;
          }
        }
      `}</style>

      {/* Hero Banner */}
      <div
        className="animate-item"
        style={{
          backgroundImage: `url(${heroBackgroundImage || post?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: heroOverlayColor,
            opacity: heroOverlayOpacity,
          }}
        />

        {/* Hero Content */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: heroTitleColor,
            maxWidth: "800px",
            padding: "40px",
          }}
        >
          <h1
            className="animate-item hero-title"
            style={{
              fontWeight: heroTitleFontWeight,
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {renderRichText(displayTitle)}
          </h1>

          {displayQuote && showQuote && (
            <div
              className="animate-item"
              style={{
                fontSize: `clamp(16px, 3vw, ${heroQuoteSize}px)`,
                marginTop: "20px",
                opacity: 0.95,
                maxWidth: "600px",
                margin: "20px auto 0",
                color: heroQuoteColor,
                display: "flex",
                alignItems: "center",
                gap: "0px",
                justifyContent: "center",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  fontSize: `clamp(19px, 3.6vw, ${heroQuoteSize * 1.2}px)`,
                  opacity: 0.7,
                  lineHeight: 1,
                  fontWeight: 300,
                  marginRight: "-4px",
                }}
              >
                "
              </span>
              <span
                style={{
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
              >
                {renderRichText(displayQuote)}
              </span>
              <span
                style={{
                  fontSize: `clamp(19px, 3.6vw, ${heroQuoteSize * 1.2}px)`,
                  opacity: 0.7,
                  lineHeight: 1,
                  fontWeight: 300,
                  marginLeft: "-4px",
                }}
              >
                "
              </span>
            </div>
          )}

          <div
            className="animate-item"
            style={{
              fontSize: "16px",
              marginTop: "20px",
              opacity: 0.9,
            }}
          >
            {displayAuthor && <span>{displayAuthor}</span>}
            {displayAuthor && displayDate && <span> • </span>}
            {displayDate && <span>{new Date(displayDate).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>

      {/* Content Blocks */}
      {contentBlocks && contentBlocks.length > 0 && (
        <div>{contentBlocks.map((block, idx) => renderContentBlock(block, idx))}</div>
      )}

      {/* Main Content Area */}
      <div
        className="main-content-wrapper"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "60px",
          padding: "60px 40px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Main Post Content */}
        <div className="post-content" style={{ minWidth: 0 }}>
          <div
            className="animate-item"
            style={{
              fontSize: `${contentFontSize}px`,
              color: contentColor,
              lineHeight: contentLineHeight,
              marginBottom: "60px",
            }}
          >
            {renderRichText(displayContent)}
          </div>

          {/* Navigation Buttons */}    
          <div
            className="animate-item"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "80px",
              paddingTop: "40px",
              borderTop: "1px solid #e5e5e5",
              minWidth: 0,
            }}
          >
            {previousPost ? (
              <a
                href={previousPost.url || `/news/${previousPost.slug}`}
                style={{
                  flex: "1",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                  padding: "20px",
                  borderRadius: "8px",
                  transition: "background-color 200ms ease",
                  cursor: "pointer",
                  minWidth: 0,
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <ChevronLeft style={{ width: "24px", height: "24px", color: "#d4a574", flexShrink: 0 }} />
                <div style={{ minWidth: "0" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#d4a574",
                      fontWeight: 600,
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {displayPreviousLabel}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#1a1a1a",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {previousPost.title}
                  </div>
                </div>
              </a>
            ) : (
              <div />
            )}

            {nextPost ? (
              <a
                href={nextPost.url || `/news/${nextPost.slug}`}
                style={{
                  flex: "1",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                  padding: "20px",
                  borderRadius: "8px",
                  justifyContent: "flex-end",
                  transition: "background-color 200ms ease",
                  cursor: "pointer",
                  textAlign: "right",
                  minWidth: 0,
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <div style={{ minWidth: "0" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#d4a574",
                      fontWeight: 600,
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {displayNextLabel}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#1a1a1a",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {nextPost.title}
                  </div>
                </div>
                <ChevronRight style={{ width: "24px", height: "24px", color: "#d4a574", flexShrink: 0 }} />
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Newsletter Signup */}
          <div className="animate-item" style={{ marginBottom: "40px" }}>
            {isNewsletterSubmitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "24px",
                  backgroundColor: "#1e3a5f",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(217, 119, 6, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    style={{ width: "32px", height: "32px", color: "#d97706" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px" }}>Thank You!</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6 }}>Check your email to confirm your subscription.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSignup}
                style={{
                  backgroundColor: "#1e3a5f",
                  borderRadius: "8px",
                  padding: "20px",
                  color: "#ffffff",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    color: "#ffffff",
                  }}
                >
                  {typeof displayNewsletterTitle === "string"
                    ? displayNewsletterTitle.replace(/<[^>]*>/g, "")
                    : displayNewsletterTitle}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    marginBottom: "16px",
                  }}
                />

                <button
                  type="submit"
                  disabled={isSubmittingNewsletter}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#4a9eff",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: isSubmittingNewsletter ? "not-allowed" : "pointer",
                    opacity: isSubmittingNewsletter ? 0.6 : 1,
                    transition: "background-color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmittingNewsletter) e.currentTarget.style.backgroundColor = "#3b87d9"
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmittingNewsletter) e.currentTarget.style.backgroundColor = "#4a9eff"
                  }}
                >
                  {isSubmittingNewsletter ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>

          {/* Recent Posts */}
          {recentPosts && recentPosts.length > 0 && (
            <div>
              <h2
                className="animate-item"
                style={{
                  fontSize: `${recentPostsTitleSize}px`,
                  fontWeight: 700,
                  marginBottom: "30px",
                  color: recentPostsTitleColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  paddingBottom: "15px",
                  borderBottom: "2px solid #e5e5e5",
                }}
              >
                {typeof displayRecentPostsTitle === "string"
                  ? displayRecentPostsTitle.replace(/<[^>]*>/g, "")
                  : displayRecentPostsTitle}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {recentPosts.map((recentPost) => (
                  <a
                    key={recentPost.id}
                    href={`/news/${recentPost.slug}`}
                    className="animate-item"
                    style={{
                      textDecoration: "none",
                      transition: "opacity 200ms ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.8"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1"
                    }}
                  >
                    {recentPost.image && (
                      <div
                        style={{
                          width: "100%",
                          height: "180px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          marginBottom: "12px",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        <img
                          src={recentPost.image || "/placeholder.svg"}
                          alt={recentPost.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        marginBottom: "8px",
                        lineHeight: 1.4,
                      }}
                    >
                      {recentPost.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#999999",
                        marginBottom: "12px",
                      }}
                    >
                      {new Date(recentPost.date).toLocaleDateString()}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#4a9eff",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      Read More »
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
