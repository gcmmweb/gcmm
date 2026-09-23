"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import {
  PlasmicComponent,
  PlasmicRootProvider,
  PageParamsProvider,
  type ComponentRenderData,
} from "@plasmicapp/loader-react"
import { PLASMIC } from "@/src/plasmic-init"

type Props = {
  pathname: string
  pageData: ComponentRenderData
  // URL path parameters (e.g. { slug: "canada-day-26" } for
  // /test-only-article/[slug] pages), matched by the Plasmic loader.
  params?: Record<string, string>
}

function PlasmicPage({ pathname, pageData, params, query }: Props & { query: Record<string, string> }) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={pageData}>
      <PageParamsProvider route={pathname} params={params} query={query}>
        <PlasmicComponent component={pathname} />
      </PageParamsProvider>
    </PlasmicRootProvider>
  )
}

// Reads URL query params (?foo=bar) in the browser. useSearchParams() opts
// everything inside its nearest <Suspense> boundary out of server rendering.
function PlasmicPageWithQuery(props: Props) {
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  return <PlasmicPage {...props} query={query} />
}

export default function PlasmicClientPage(props: Props) {
  // FIX (Sep 2026): query params are read client-side (moved here on Sep 1 so
  // the server shell can be cached with revalidate=300 — that part was right).
  // But useSearchParams() makes the whole tree inside its <Suspense> boundary
  // skip server rendering, and the boundary's fallback was `null` — so every
  // page on the site was sending an EMPTY <body> to browsers and crawlers
  // (verified: 116 of 116 sitemap pages had zero server-rendered text/links).
  // Google had to execute JS just to see any content or internal links, and
  // nothing could paint until all JS downloaded and ran.
  //
  // The fallback now renders the full page with an empty query, so the
  // server HTML contains the real content. After hydration, the query-aware
  // version takes over — identical to what visitors got before this fix.
  return (
    <Suspense fallback={<PlasmicPage {...props} query={{}} />}>
      <PlasmicPageWithQuery {...props} />
    </Suspense>
  )
}
