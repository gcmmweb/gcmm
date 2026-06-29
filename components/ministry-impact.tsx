import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

// Mock data - in Plasmic, this would be connected to your CMS
const articles = [
  {
    id: 1,
    title: "Restoring Souls in a Wounded Nation",
    excerpt:
      "Discover how God is working through local ministries to bring healing and hope to communities affected by conflict and trauma.",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-15",
    category: "Ministry Impact",
    slug: "restoring-souls-wounded-nation",
  },
  {
    id: 2,
    title: "When a heart remains with the Maithili people",
    excerpt:
      "A powerful testimony of long-term commitment to unreached people groups and the transformation that follows faithful service.",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-10",
    category: "Testimonies",
    slug: "heart-remains-maithili-people",
  },
  {
    id: 3,
    title: "God is doing something new in Egypt",
    excerpt:
      "Witness the remarkable growth of the church in Egypt and how strategic media is opening doors for the Gospel.",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-08",
    category: "Global Reach",
    slug: "god-doing-something-new-egypt",
  },
  {
    id: 4,
    title: "War Does Not Stop the Gospel",
    excerpt:
      "Stories of courage and faith from believers who continue to share Christ's love even in the midst of conflict zones.",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-05",
    category: "Perseverance",
    slug: "war-does-not-stop-gospel",
  },
  {
    id: 5,
    title: "Encounters with the Messiah in Israel",
    excerpt:
      "Remarkable testimonies of Jewish people discovering their Messiah through strategic outreach and media initiatives.",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-03",
    category: "Israel Ministry",
    slug: "encounters-messiah-israel",
  },
  {
    id: 6,
    title: "See the impact of THE GOSPEL IN MONGOLIA",
    excerpt:
      "From nomadic traditions to modern cities, see how the Gospel is transforming lives across Mongolia through innovative approaches.",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-01-01",
    category: "Asia Pacific",
    slug: "gospel-impact-mongolia",
  },
]

export default function NewsArticlesPage() {
  // Sort articles by date (most recent first)
  const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full bg-gray-50" style={{ minHeight: "90px", maxHeight: "1200px" }}>
      {/* Header Section */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Latest</h1>
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-800">News & Articles</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stay updated with the latest stories of God's work around the world through strategic media initiatives,
              ministry partnerships, and transformative Gospel content reaching communities globally.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="w-full pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Article Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(article.date)}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Load More Section */}
      <div className="w-full pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  )
}