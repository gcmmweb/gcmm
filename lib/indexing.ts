// Single source of truth for "this path must not be found via search engines".
// Used by BOTH app/sitemap.ts (leave it out of the sitemap) and
// app/[[...catchall]]/page.tsx generateMetadata() (add a noindex tag).
//
// GCMM convention (SOP): any path segment starting with "_" marks a
// test / sandbox / not-yet-launched page, e.g. /_sandbox or /impact/_ethiopia.
// To launch it, rename the path without the underscore.
//
// Second convention: a segment named "sandbox" or starting with "sandbox-"
// (e.g. /sandbox-hero-test) is a test page you CAN open in a browser;
// it is noindex and left out of the sitemap, but still renders.

// Specific pages that are always kept out of search results.
//  - archive-news-old, news-stories-archive-ignore, donate-old-archieve,
//    archive-signup: old/archived content
//  - testpage-2, test: internal test pages
//  - -ministries: broken/malformed page path (leading hyphen)
//  - only-believe: built for future use, not live yet
//  - thank-you: post-donation conversion-tracking page. If indexed, a visitor
//    could land on it from Google and trigger the donation-tracking pixel
//    without an actual donation, corrupting conversion data.
const NOINDEX_PATHS = new Set<string>([
  "/archive-news-old",
  "/testpage-2",
  "/news-stories-archive-ignore",
  "/donate-old-archieve",
  "/test",
  "/archive-signup",
  "/-ministries",
  "/only-believe",
  "/thank-you",
]);

export function hasUnpublishedSegment(path: string): boolean {
  return path.split("/").some((segment) => segment.startsWith("_"));
}

// Viewable test pages: a segment named "sandbox" or starting with "sandbox-"
// (e.g. /sandbox-hero-test). These DO render on the site (so you can open
// them on a phone or a Vercel preview) but are noindex and out of the sitemap.
// Unlike "_" pages, the name survives getPathname()'s "_" -> "-" rewrite.
export function hasSandboxSegment(path: string): boolean {
  return path
    .toLowerCase()
    .split("/")
    .some((segment) => segment === "sandbox" || segment.startsWith("sandbox-"));
}

// NOTE: pass the RAW path (underscores intact). getPathname() in the catchall
// route rewrites "_" to "-", which would hide the underscore convention.
export function isNoIndexPath(path: string): boolean {
  const p = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return NOINDEX_PATHS.has(p.toLowerCase()) || hasUnpublishedSegment(p) || hasSandboxSegment(p);
}
