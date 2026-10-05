"use client"

// Shown by Next.js when rendering a page throws (for example Plasmic could
// not be reached AND there is no earlier good copy of the page to serve).
// Error screens are never saved, so this clears as soon as the problem does.
// For pages that already have a good copy, visitors never see this: Next.js
// keeps serving the last good copy instead (see page.tsx).
//
// /donate is special: a working way to give beats an apology, so it shows the
// built-in donation form (no Plasmic needed; payment goes through our own
// /api/stripe-donate-v2 route).

import { usePathname } from "next/navigation"
import { SiteUnavailableFallback } from "@/components/SiteUnavailableFallback"
import { StripeDonationPage } from "@/components/stripe-donation-page-v2"

export default function CatchallError() {
  const pathname = usePathname()
  if (pathname === "/donate") {
    return <StripeDonationPage />
  }
  return <SiteUnavailableFallback />
}
