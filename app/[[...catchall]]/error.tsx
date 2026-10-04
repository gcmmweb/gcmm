"use client"

// Shown by Next.js when rendering a page throws (for example Plasmic could
// not be reached AND there is no earlier good copy of the page to serve).
// Error screens are never saved, so this clears as soon as the problem does.
// For pages that already have a good copy, visitors never see this: Next.js
// keeps serving the last good copy instead (see page.tsx).

import { SiteUnavailableFallback } from "@/components/SiteUnavailableFallback"

export default function CatchallError() {
  return <SiteUnavailableFallback />
}
