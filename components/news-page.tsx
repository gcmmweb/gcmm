"use client"

import { NewsPostTemplate } from "./news-post-template"
import { useState } from "react"

// Sample news data
const newsData = {
  featured: {
    id: "1",
    title: "Transforming Lives Through Community Service",
    excerpt: "How our ministry is making a real impact in local communities",
    image: "/community-service.jpg",
    content: `<p>Our ministry has always been about more than just spiritual guidance—it's about creating meaningful change in the lives of those we serve. Through dedicated community service initiatives, we've witnessed transformations that extend far beyond the walls of our church.</p>
    
    <p>Over the past year, our volunteers have invested more than 5,000 hours in community projects, from organizing food banks to mentoring at-risk youth. The impact has been profound, touching the lives of over 1,000 families in our region.</p>
    
    <p>What makes our approach different is our commitment to sustainable change. We don't just provide temporary relief; we work alongside community members to build lasting solutions. Whether it's through job training programs, educational scholarships, or mental health resources, we're invested in the long-term wellbeing of those we serve.</p>
    
    <p>As we look to the future, we invite you to join us in this mission. Together, we can create communities where everyone has the opportunity to thrive spiritually and materially.</p>`,
    quote:
      "The most powerful ministry is one that meets people where they are and helps them become who God calls them to be.",
    author: "Pastor James Mitchell",
    date: "2025-01-15",
    slug: "transforming-lives-community",
  },
  recent: [
    {
      id: "2",
      title: "Faith and Healing: A Journey of Hope",
      excerpt: "Personal testimony from our community",
      image: "/healing-hope.jpg",
      content: "Lorem ipsum dolor sit amet...",
      author: "Sarah Johnson",
      date: "2025-01-10",
      slug: "faith-healing-journey",
    },
    {
      id: "3",
      title: "Youth Ministry Launches New Program",
      excerpt: "Empowering the next generation of leaders",
      image: "/youth-leadership.jpg",
      content: "Lorem ipsum dolor sit amet...",
      author: "Michael Chen",
      date: "2025-01-05",
      slug: "youth-ministry-program",
    },
    {
      id: "4",
      title: "Building Stronger Families",
      excerpt: "Resources and support for family growth",
      image: "/family-growth.jpg",
      content: "Lorem ipsum dolor sit amet...",
      author: "Lisa Rodriguez",
      date: "2024-12-28",
      slug: "building-stronger-families",
    },
  ],
}

export const NewsPage = () => {
  const [showMessage, setShowMessage] = useState(false)

  const handleNewsletterSignup = (email: string, firstName: string, lastName: string, country: string) => {
    console.log("Newsletter signup:", { email, firstName, lastName, country })
    setShowMessage(true)
    // Here you would typically send this to your backend
  }

  const previousPost = newsData.recent[0]
  const nextPost = newsData.recent[1]

  return (
    <NewsPostTemplate
      post={newsData.featured}
      recentPosts={newsData.recent}
      previousPost={previousPost}
      nextPost={nextPost}
      heroBackgroundImage={newsData.featured.image}
      heroOverlayOpacity={0.5}
      onNewsletterSignup={handleNewsletterSignup}
    />
  )
}
