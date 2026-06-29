"use client"

import type React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface NewsletterPostProps {
  // Top Banner / Hero
  bannerImage?: string
  bannerTitle?: string | ReactNode
  bannerSubtitle?: string | ReactNode
  bannerHeight?: number
  bannerOverlayOpacity?: number

  // Post Content
  postTitle?: string | ReactNode
  postDate?: string
  postAuthor?: string
  postImage?: string
  postContent?: string | ReactNode

  // Quote Section
  quoteText?: string
  quoteAuthor?: string
  quoteBackgroundColor?: string

  // Navigation
  previousPost?: {
    title: string
    url: string
  }
  nextPost?: {
    title: string
    url: string
  }

  // Recent Posts (Sidebar)
  recentPosts?: Array<{
    title: string
    excerpt: string
    image: string
    url: string
    date?: string
  }>

  // Newsletter Signup
  showNewsletterSignup?: boolean
  signupTitle?: string
  signupBackgroundColor?: string

  className?: string
}

export const NewsletterPost = ({
  bannerImage = "/images/getimage.png",
  bannerTitle = "Ministry Newsletter",
  bannerSubtitle = "Stories of transformation and hope",
  bannerHeight = 400,
  bannerOverlayOpacity = 0.5,
  postTitle = "Article Title",
  postDate = "January 15, 2024",
  postAuthor = "Ministry Team",
  postImage,
  postContent = "Article content goes here...",
  quoteText,
  quoteAuthor,
  quoteBackgroundColor = "#f8f9fa",
  previousPost,
  nextPost,
  recentPosts = [],
  showNewsletterSignup = true,
  signupTitle = "STAY CONNECTED WITH US",
  signupBackgroundColor = "#1e3a5f",
  className = "",
}: NewsletterPostProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "United States",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your newsletter signup logic here
  }

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Top Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: `${bannerHeight}px`,
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black" style={{ opacity: bannerOverlayOpacity }} />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            {typeof bannerTitle === "string" ? (
              <h1 className="mb-4 text-5xl font-bold md:text-6xl">{bannerTitle}</h1>
            ) : (
              bannerTitle
            )}
            {typeof bannerSubtitle === "string" ? (
              <p className="text-xl text-white/90 md:text-2xl">{bannerSubtitle}</p>
            ) : (
              bannerSubtitle
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Article Content */}
          <article className="flex-1">
            {/* Post Meta */}
            <div className="mb-6 text-sm text-muted-foreground">
              <span>{postDate}</span>
              {postAuthor && (
                <>
                  <span className="mx-2">•</span>
                  <span>By {postAuthor}</span>
                </>
              )}
            </div>

            {/* Post Title */}
            {typeof postTitle === "string" ? (
              <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">{postTitle}</h1>
            ) : (
              <div className="mb-6">{postTitle}</div>
            )}

            {/* Featured Image */}
            {postImage && (
              <img
                src={postImage || "/placeholder.svg"}
                alt="Post featured image"
                className="mb-8 w-full rounded-lg object-cover"
                style={{ maxHeight: "500px" }}
              />
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              {typeof postContent === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: postContent }} />
              ) : (
                postContent
              )}
            </div>

            {/* Quote Section */}
            {quoteText && (
              <div className="my-12 rounded-lg p-8" style={{ backgroundColor: quoteBackgroundColor }}>
                <blockquote className="text-center">
                  <p className="mb-4 text-2xl font-medium italic text-foreground md:text-3xl">"{quoteText}"</p>
                  {quoteAuthor && <footer className="text-lg text-muted-foreground">— {quoteAuthor}</footer>}
                </blockquote>
              </div>
            )}

            {/* Newsletter Signup in Content */}
            {showNewsletterSignup && (
              <div className="my-12 rounded-lg p-8 text-white" style={{ backgroundColor: signupBackgroundColor }}>
                <h2 className="mb-6 text-center text-3xl font-bold">{signupTitle}</h2>
                <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-white/95 text-foreground placeholder:text-muted-foreground"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-white/95 text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/95 text-foreground placeholder:text-muted-foreground"
                    required
                  />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full rounded-md border border-input bg-white/95 px-3 py-2 text-foreground"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                  <Button type="submit" className="w-full bg-sky-500 text-lg font-semibold hover:bg-sky-600" size="lg">
                    SIGN-UP
                  </Button>
                </form>
              </div>
            )}

            {/* Previous/Next Navigation */}
            {(previousPost || nextPost) && (
              <div className="mt-12 border-t border-border pt-8">
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                  {/* Previous Article */}
                  {previousPost ? (
                    <a
                      href={previousPost.url}
                      className="group flex flex-1 items-start gap-3 rounded-lg p-4 transition-colors hover:bg-muted"
                    >
                      <ChevronLeft className="mt-1 h-8 w-8 flex-shrink-0 text-amber-600" />
                      <div className="flex-1">
                        <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-amber-600">
                          Previous Article
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary">
                          {previousPost.title}
                        </h3>
                      </div>
                    </a>
                  ) : (
                    <div className="flex-1" />
                  )}

                  {/* Next Article */}
                  {nextPost ? (
                    <a
                      href={nextPost.url}
                      className="group flex flex-1 items-start gap-3 rounded-lg p-4 text-right transition-colors hover:bg-muted"
                    >
                      <div className="flex-1">
                        <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-amber-600">
                          Next Article
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary">{nextPost.title}</h3>
                      </div>
                      <ChevronRight className="mt-1 h-8 w-8 flex-shrink-0 text-amber-600" />
                    </a>
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar - Recent Posts */}
          {recentPosts.length > 0 && (
            <aside className="w-full lg:w-80">
              <div className="sticky top-6">
                <div className="mb-6 border-b-4 border-gray-300 pb-2">
                  <h2 className="text-2xl font-bold uppercase text-foreground">Recent Posts</h2>
                </div>
                <div className="space-y-6">
                  {recentPosts.map((post, index) => (
                    <Card key={index} className="overflow-hidden border-none shadow-sm">
                      <a href={post.url} className="group block">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                          )}
                          <div className="text-sm font-semibold uppercase text-blue-600 group-hover:text-blue-700">
                            Read More »
                          </div>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}