import { Button } from "@/components/ui/button"

interface MediaItem {
  type: "image" | "video"
  src: string
  alt?: string
  caption?: string
}

interface ContentBlock {
  type: "text" | "media" | "quote" | "cta" | "divider"
  content?: string
  media?: MediaItem
  quote?: {
    text: string
    author?: string
    source?: string
  }
  cta?: {
    text: string
    link: string
    style: "primary" | "secondary" | "outline"
  }
}

interface TransformerBlogPageProps {
  // Header customization
  title?: string
  subtitle?: string
  author?: string
  publishDate?: string
  readTime?: string
  featuredImage?: string

  // Content blocks
  contentBlocks?: ContentBlock[]

  // Layout options
  layout?: "standard" | "wide" | "minimal" | "magazine"
  sidebar?: boolean

  // Color customization
  primaryColor?: string
  accentColor?: string
  backgroundColor?: string
  textColor?: string

  // Typography
  headingFont?: string
  bodyFont?: string
  fontSize?: "small" | "medium" | "large"

  // Background options
  backgroundType?: "solid" | "gradient" | "image" | "pattern"
  backgroundGradient?: string
  backgroundImage?: string

  // Interactive elements
  showSocialShare?: boolean
  showComments?: boolean
  showRelatedPosts?: boolean

  // SEO and metadata
  metaDescription?: string
  tags?: string[]
  category?: string

  // Custom CSS
  customCSS?: string

  // Plasmic styling support
  className?: string
}

export function TransformerBlogPage({
  title = "Transform Your Ministry: A Journey of Faith and Innovation",
  subtitle = "Discover how modern technology can amplify your spiritual message and reach souls across the globe",
  author = "GCM Ministries Team",
  publishDate = "December 15, 2024",
  readTime = "8 min read",
  featuredImage = "/ministry-transformation-digital-faith.jpg",

  contentBlocks = [
    {
      type: "text",
      content:
        "In an era where digital transformation touches every aspect of our lives, ministry work stands at a unique crossroads. The question isn't whether technology will change how we spread the Gospel, but how we can harness its power to create deeper, more meaningful connections with those seeking spiritual guidance.",
    },
    {
      type: "media",
      media: {
        type: "image",
        src: "/digital-ministry-community-connection.jpg",
        alt: "Digital ministry connecting communities",
        caption: "Modern ministry bridges physical and digital spaces to create lasting spiritual connections",
      },
    },
    {
      type: "text",
      content:
        "The landscape of ministry has evolved dramatically over the past decade. Where once we relied solely on physical gatherings and printed materials, we now have unprecedented opportunities to reach hearts and minds through multiple channels simultaneously.",
    },
    {
      type: "quote",
      quote: {
        text: "Technology is not the enemy of authentic ministry—it's a powerful tool that, when used with wisdom and intention, can amplify our message of hope and love to reach those who need it most.",
        author: "Rev. Sarah Johnson",
        source: "Digital Ministry Conference 2024",
      },
    },
    {
      type: "text",
      content:
        "Consider the impact of live streaming services during global challenges, or how social media platforms have become modern-day town squares where spiritual conversations naturally unfold. These aren't replacements for traditional ministry—they're extensions of it.",
    },
    {
      type: "cta",
      cta: {
        text: "Join Our Digital Ministry Workshop",
        link: "/workshop",
        style: "primary",
      },
    },
  ],

  layout = "standard",
  sidebar = true,

  primaryColor = "#8b5cf6",
  accentColor = "#f59e0b",
  backgroundColor = "from-gray-900 via-gray-800 to-gray-900",
  textColor = "#ffffff",

  headingFont = "font-serif",
  bodyFont = "font-sans",
  fontSize = "medium",

  backgroundType = "gradient",
  backgroundGradient = "from-gray-900 via-gray-800 to-gray-900",
  backgroundImage = "/ministry-transformation-digital-faith.jpg", // Declare the backgroundImage variable

  showSocialShare = true,
  showComments = true,
  showRelatedPosts = true,

  tags = ["Ministry", "Technology", "Digital Transformation", "Faith"],
  category = "Ministry Innovation",

  customCSS = "",
  className = "",
}: TransformerBlogPageProps) {
  const getBackgroundClasses = () => {
    switch (backgroundType) {
      case "gradient":
        return `bg-gradient-to-br ${backgroundGradient}`
      case "image":
        return "bg-cover bg-center bg-no-repeat"
      case "pattern":
        return "bg-pattern"
      default:
        return "bg-background"
    }
  }

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case "small":
        return "text-sm"
      case "large":
        return "text-lg"
      default:
        return "text-base"
    }
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case "wide":
        return "max-w-7xl"
      case "minimal":
        return "max-w-2xl"
      case "magazine":
        return "max-w-6xl"
      default:
        return "max-w-4xl"
    }
  }

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <div key={index} className={`prose prose-lg max-w-none ${bodyFont} ${getFontSizeClasses()}`}>
            <p className="leading-relaxed text-gray-100 mb-6">{block.content}</p>
          </div>
        )

      case "media":
        return (
          <div key={index} className="my-8">
            {block.media?.type === "image" ? (
              <figure className="space-y-3">
                <img
                  src={block.media.src || "/placeholder.svg"}
                  alt={block.media.alt || ""}
                  className="w-full rounded-lg shadow-2xl"
                />
                {block.media.caption && (
                  <figcaption className="text-sm text-gray-400 text-center italic">{block.media.caption}</figcaption>
                )}
              </figure>
            ) : (
              <figure className="space-y-3">
                <video src={block.media?.src} controls className="w-full rounded-lg shadow-2xl" />
                {block.media?.caption && (
                  <figcaption className="text-sm text-gray-400 text-center italic">{block.media.caption}</figcaption>
                )}
              </figure>
            )}
          </div>
        )

      case "quote":
        return (
          <blockquote key={index} className="my-8 border-l-4 border-accent pl-6 py-4 bg-gray-800/50 rounded-r-lg">
            <p className="text-xl italic text-gray-100 mb-4 leading-relaxed">"{block.quote?.text}"</p>
            {(block.quote?.author || block.quote?.source) && (
              <footer className="text-gray-400">
                {block.quote?.author && <cite className="font-semibold">{block.quote.author}</cite>}
                {block.quote?.source && <span className="ml-2">— {block.quote.source}</span>}
              </footer>
            )}
          </blockquote>
        )

      case "cta":
        return (
          <div key={index} className="my-8 text-center">
            <Button
              className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                block.cta?.style === "primary"
                  ? "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl"
                  : block.cta?.style === "secondary"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "border-2 border-accent text-accent hover:bg-accent hover:text-white"
              }`}
            >
              {block.cta?.text}
            </Button>
          </div>
        )

      case "divider":
        return (
          <div key={index} className="my-12 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={`min-h-screen ${getBackgroundClasses()} ${className}`}
      style={{
        color: textColor,
        backgroundImage: backgroundType === "image" ? `url(${backgroundImage})` : undefined,
        ...(customCSS ? { "--custom-css": customCSS } : {}),
      }}
    >
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className={`relative ${getLayoutClasses()} mx-auto px-6 py-16`}>
          <div className="text-center space-y-6">
            {/* Category & Meta Info */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-300">
              {category && (
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">{category}</span>
              )}
              <span>{publishDate}</span>
              <span>•</span>
              <span>{readTime}</span>
              <span>•</span>
              <span>By {author}</span>
            </div>

            {/* Title */}
            <h1 className={`text-4xl md:text-6xl font-bold ${headingFont} leading-tight text-balance`}>{title}</h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-pretty">
                {subtitle}
              </p>
            )}

            {/* Tags */}
            {tags && Array.isArray(tags) && tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-gray-600/50 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <div className={`${getLayoutClasses()} mx-auto px-6 -mt-8`}>
          <img src={featuredImage || "/placeholder.svg"} alt={title} className="w-full rounded-xl shadow-2xl" />
        </div>
      )}

      {/* Main Content */}
      <main className={`${getLayoutClasses()} mx-auto px-6 py-16`}>
        <div className={`grid gap-8 ${sidebar ? "lg:grid-cols-3" : "grid-cols-1"}`}>
          {/* Article Content */}
          <article className={sidebar ? "lg:col-span-2" : "col-span-1"}>
            <div className="space-y-6">{contentBlocks?.map((block, index) => renderContentBlock(block, index))}</div>
          </article>

          {/* Sidebar */}
          {sidebar && (
            <aside className="space-y-8">
              {/* Author Bio */}
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{author?.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{author}</p>
                    <p className="text-sm text-gray-400">Ministry Leader</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Passionate about bridging traditional ministry with modern technology to reach more souls for Christ.
                </p>
              </div>

              {/* Related Posts */}
              {showRelatedPosts && (
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="group cursor-pointer">
                        <h4 className="font-medium group-hover:text-accent transition-colors">
                          Building Digital Communities of Faith
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">5 min read</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
