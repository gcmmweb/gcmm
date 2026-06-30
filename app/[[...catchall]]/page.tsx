"use client"

import {
  PlasmicComponent,
  type ComponentRenderData,
  PlasmicRootProvider,
  PageParamsProvider,
} from "@plasmicapp/loader-react"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { PLASMIC } from "@/src/plasmic-init"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CatchallPage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [pageData, setPageData] = useState<ComponentRenderData | null>(null)

  useEffect(() => {
    async function load() {
      const data = await PLASMIC.maybeFetchComponentData(pathname || "/")
      setPageData(data)
      setLoading(false)
    }
    load()
  }, [pathname])

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="spinner"
          style={{
            marginTop: "20px",
            width: "40px",
            height: "40px",
            border: "4px solid #ccc",
            borderTop: "4px solid #0070f3",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
      </div>
    )

  if (!pageData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4 text-balance">404 - Page Not Found</h1>

              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                We couldn't find the page you're looking for. It might have been moved, deleted, or you might have accidentally entered the
                wrong URL.
              </p>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const query = Object.fromEntries((searchParams ?? new URLSearchParams()).entries())
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PageParamsProvider route={pathname || "/"} query={query}>
        <PlasmicComponent component={pathname || "/"} />
      </PageParamsProvider>
    </PlasmicRootProvider>
  )
}
