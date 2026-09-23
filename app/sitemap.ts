import type { MetadataRoute } from "next";
import { PLASMIC_SERVER } from "@/src/plasmic-init-server";

const baseUrl = "https://www.gcmm.ca";

// Same CMS database/credentials pattern already used in
// app/[[...catchall]]/page.tsx (see fetchAllArticleSlugs there) — kept
// as a separate, self-contained copy here rather than importing from that
// file, so this sitemap has no dependency on the catchall route's internals.
const PLASMIC_CMS_DATABASE_ID = "bYeJVtRFReZ4zCMpwREGgw";
const PLASMIC_CMS_PUBLIC_TOKEN = process.env.PLASMIC_CMS_PUBLIC_TOKEN;

async function fetchAllArticleSlugs(): Promise<string[]> {
  if (!PLASMIC_CMS_PUBLIC_TOKEN) return [];
  try {
    const query = encodeURIComponent(JSON.stringify({ limit: 500 }));
    const url = `https://data.plasmic.app/api/v1/cms/databases/${PLASMIC_CMS_DATABASE_ID}/tables/newsPosts/query?q=${query}`;
    const res = await fetch(url, {
      headers: {
        "x-plasmic-api-cms-tokens": `${PLASMIC_CMS_DATABASE_ID}:${PLASMIC_CMS_PUBLIC_TOKEN}`,
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.rows ?? [])
      .map((row: any) => row?.data?.slug)
      .filter(Boolean);
  } catch (err) {
    console.warn("Sitemap: failed to fetch article slugs:", err);
    return [];
  }
}

// Confirmed with Junita (Sep 2026) as archive/test/not-yet-ready pages that
// should stay out of the public sitemap — real pages in Plasmic, just not
// meant for search visibility:
//   - archive-news-old, news-stories-archive-ignore, donate-old-archieve,
//     archive-signup: old/archived content
//   - testpage-2, test: internal test pages
//   - -ministries: broken/malformed page path (leading hyphen), needs a
//     real fix later — not urgent, excluded from sitemap for now
//   - only-believe: built for future use, not live yet
//   - thank-you: post-donation conversion-tracking page. Deliberately kept
//     out of search results — if indexed, a visitor could land on it
//     directly from Google and trigger the donation-tracking pixel without
//     an actual donation happening, corrupting conversion data.
const EXCLUDED_PATHS = new Set<string>([
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

// GCMM convention (Plasmic has no draft/unpublish feature): a path segment
// starting with "_" (e.g. /impact/_ethiopia) marks a campaign/page that is
// built but not launched yet. Those must never be advertised to Google —
// previously /impact/_ethiopia was listed here, inviting it to be indexed.
// Launching a page = renaming it without the underscore; it then appears in
// the sitemap automatically.
function isUnpublishedPath(path: string): boolean {
  return path.split("/").some((segment) => segment.startsWith("_"));
}

// Hand-tuned priority/frequency for the pages that matter most. Any real
// page not listed here (dynamic Plasmic pages, CMS articles) still gets
// included below automatically, just with sensible defaults instead of
// custom tuning.
const PRIORITY_OVERRIDES: Record<
  string,
  { priority: number; changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> }
> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/donate": { priority: 0.9, changeFrequency: "monthly" },
  "/megacitymediacampaigns": { priority: 0.8, changeFrequency: "monthly" },
  "/10-40-media-outreach": { priority: 0.8, changeFrequency: "monthly" },
  "/media-outreach-in-ukraine": { priority: 0.8, changeFrequency: "monthly" },
  "/israel-jewish-ministries": { priority: 0.8, changeFrequency: "monthly" },
  "/ukraineaid": { priority: 0.8, changeFrequency: "monthly" },
  "/50": { priority: 0.8, changeFrequency: "monthly" },
  "/pray": { priority: 0.7, changeFrequency: "monthly" },
  "/news-stories": { priority: 0.7, changeFrequency: "weekly" },
  "/about": { priority: 0.6, changeFrequency: "yearly" },
  "/history": { priority: 0.5, changeFrequency: "yearly" },
  "/team": { priority: 0.5, changeFrequency: "yearly" },
  "/signup": { priority: 0.5, changeFrequency: "yearly" },
  "/videos": { priority: 0.5, changeFrequency: "monthly" },
  "/contact": { priority: 0.5, changeFrequency: "yearly" },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // FIX: this file used to be a hardcoded list of 16 URLs, typed out
  // manually and already stale — missing all 22 country impact pages and
  // every real CMS article (Search Console confirmed only 16 discovered
  // pages, Sep 2026). Now built from the same live sources the site itself
  // renders from, so it stays accurate as pages/articles are added or
  // removed instead of needing manual upkeep.
  let plasmicPaths: string[] = [];
  try {
    const pageModules = await PLASMIC_SERVER.fetchPages();
    // Exclude template routes like "/[slug]" (only real, concrete pages
    // belong in a sitemap) and the confirmed archive/test/not-ready pages.
    plasmicPaths = pageModules
      .map((mod) => mod.path)
      .filter((path) => !path.includes("[") && !EXCLUDED_PATHS.has(path) && !isUnpublishedPath(path));
  } catch (err) {
    console.warn("Sitemap: failed to fetch Plasmic pages:", err);
  }

  const articleSlugs = await fetchAllArticleSlugs();
  const articlePaths = articleSlugs
    .map((slug) => `/${slug}`)
    .filter((path) => !EXCLUDED_PATHS.has(path) && !isUnpublishedPath(path));

  const allPaths = Array.from(new Set([...plasmicPaths, ...articlePaths]));

  // Safety net: if both fetches above failed, still return a sitemap with
  // at least the homepage rather than an empty one.
  if (allPaths.length === 0) {
    allPaths.push("/");
  }

  return allPaths.map((path) => {
    const override = PRIORITY_OVERRIDES[path];
    return {
      url: path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: override?.changeFrequency ?? "monthly",
      priority: override?.priority ?? 0.6,
    };
  });
}
