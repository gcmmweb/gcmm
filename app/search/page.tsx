"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSearch() {
    const q = query.trim()
    if (!q) return
    router.push(`/news-stories?q=${encodeURIComponent(q)}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">Search Articles</h1>
        <p className="mb-8 text-muted-foreground">
          Search our collection of news and stories.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none"
            autoFocus
          />
          <Button variant="default" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
