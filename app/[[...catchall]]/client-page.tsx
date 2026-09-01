"use client"

import { useSearchParams } from "next/navigation"
import {
  PlasmicComponent,
  PlasmicRootProvider,
  PageParamsProvider,
  type ComponentRenderData,
} from "@plasmicapp/loader-react"
import { PLASMIC } from "@/src/plasmic-init"

export default function PlasmicClientPage({
  pathname,
  pageData,
  params,
}: {
  pathname: string
  pageData: ComponentRenderData
  // URL path parameters (e.g. { slug: "canada-day-26" } for
  // /test-only-article/[slug] pages), matched by the Plasmic loader.
  params?: Record<string, string>
}) {
  // FIX: this used to be read server-side in page.tsx and passed down as a
  // prop. Reading it there forced the whole page to skip caching and hit
  // Plasmic live on every single visit — confirmed via a log test that
  // showed the same page fetching Plasmic data ~15 times in under a minute
  // despite a 300s cache setting. Reading it here instead (client-side)
  // gives Plasmic-authored pages the exact same query values as before,
  // just computed a moment later — with no visible difference to visitors —
  // while letting the server-rendered shell actually be cached.
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={pageData}>
      <PageParamsProvider route={pathname} params={params} query={query}>
        <PlasmicComponent component={pathname} />
      </PageParamsProvider>
    </PlasmicRootProvider>
  )
}
