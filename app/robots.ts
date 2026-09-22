import type { MetadataRoute } from "next";

const baseUrl = "https://www.gcmm.ca";

// FIX (Sep 2026): /robots.txt was returning a 404 — there was no
// app/robots.ts file, so the request fell through to the catchall route's
// standard "page not found" handler. A missing robots.txt doesn't block
// crawling (Google defaults to "crawl everything" when there isn't one),
// but it does mean crawlers get no explicit sitemap pointer and the site
// has no place to add crawl rules later if ever needed.
//
// Deliberately permissive: no Disallow rules. Pages that shouldn't be
// indexed (e.g. /thank-you, /donate-test-only) already handle that via
// their own noindex meta tag, which requires the page to actually be
// crawled to take effect — disallowing them here would block the crawl
// that lets Google see the noindex directive in the first place.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
