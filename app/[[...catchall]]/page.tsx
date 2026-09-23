import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { PLASMIC_SERVER } from "@/src/plasmic-init-server";
import PlasmicClientPage from "./client-page";
import { SiteUnavailableFallback } from "@/components/SiteUnavailableFallback";
// NOTE (Sep 2026): this was briefly changed to a next/dynamic(..., { ssr:
// false }) import to keep this component's bundle out of every route's
// shared chunk — but Next.js disallows ssr:false with next/dynamic inside
// Server Components (this file does server-side data fetching, so it's a
// Server Component), which broke the production build. Reverted to a plain
// static import. This is safe: the actual bug (Stripe's JS loading on every
// page) is fixed inside stripe-donation-page-v2.tsx itself — loadStripe()
// now only runs lazily, inside a useEffect, once this component actually
// mounts. Since it only mounts here when pathname === "/donate", that lazy
// call never fires on other pages regardless of whether this import is
// static or dynamic.
import { StripeDonationPage } from "@/components/stripe-donation-page-v2";

type Props = {
  params: Promise<{ catchall?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// TEST: added per Plasmic's own documented App Router pattern (their
// nextjs-quickstart docs show this combined with searchParams the same way
// this file uses it). Caches each page's rendered output for 300s instead
// of fetching Plasmic live on every visit — meaning most visitors during a
// Plasmic hiccup would just see the last good cached version instead of
// hitting the failure at all. NEEDS VERIFICATION on our actual setup before
// we trust it — see the diagnostic log below.
export const revalidate = 300;
export const fetchCache = 'default-cache';

function getPathname(catchall?: string[]) {
  const raw = "/" + (catchall ? catchall.join("/") : "");
  // Normalize: lowercase + underscores → hyphens (CMS slugs are all lowercase-hyphenated)
  return raw.toLowerCase().replace(/_/g, '-');
}

// Old WordPress-era article URLs that were never migrated into the CMS
// after the move to this site — the Article Template still catches them
// (matching "/[slug]"), but with no matching CMS row they'd otherwise show
// wrong/default metadata or 404. Confirmed via Search Console: zero clicks
// and zero impressions over the full 16-month history for these URLs, so
// there's no SEO value being preserved here — these are courtesy redirects
// for anyone with an old bookmark or link, not an SEO necessity.
// Add more old-slug -> new-path pairs here as they're identified.
//
// NOTE on the two "gospel"/"egypt" entries below: these aren't actually
// missing content — the real articles exist in the CMS, just under
// shorter/different slugs than these old URLs used. Confirmed directly
// in the CMS (Sep 2026):
//   - /the-gospel-is-reaching-millions -> real article's actual slug is
//     "gospel-reaching-millions" (same article, shorter slug)
//   - /god-is-in-egypt -> no exact match, but a real, topically-matching
//     article exists at "god-is-doing-something-new-in-egypt"
// /your-voice-matters was an old feedback survey that no longer exists;
// redirecting to /contact since that page offers the same "reach out to
// us" purpose via text or email.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/why-media": "/about",
  "/the-gospel-is-reaching-millions": "/gospel-reaching-millions",
  "/god-is-in-egypt": "/god-is-doing-something-new-in-egypt",
  "/your-voice-matters": "/contact",
  // Added Sep 2026 (SEO discoverability review): these three were still
  // being linked to from the old gcmministries.ca domain, which forwards
  // path-for-path to gcmm.ca — but none of these paths exist here anymore,
  // so visitors and Google were landing on 404s. /our-work and /impact
  // have no single dedicated replacement page (impact stories now live as
  // individual /impact/[country] pages with no hub), so both point to
  // Mega City Media Campaigns as the closest overview of GCMM's work.
  "/our-work": "/megacitymediacampaigns",
  "/impact": "/megacitymediacampaigns",
  "/news-articles": "/news-stories",
  // Found via the Sep 2026 Search Console Soft 404 validation sweep.
  "/israel-ministry": "/israel-jewish-ministries",
  // TEMPORARY: no dedicated Partners page exists yet. Routing to /about for
  // now so the old link isn't a dead end. Once a real Partners page is
  // built, update this destination — don't just leave it pointed at /about.
  "/our-partners": "/about",
  // Found via the Sep 2026 Search Console "Not found (404)" report.
  "/news": "/news-stories",
  // Old WordPress newsletter PDFs still linked from past emails. The
  // newsletters page is their closest live equivalent.
  // NOTE: keys must be in getPathname()'s normalized form (lowercase, "_"
  // turned into "-"), or they will never match.
  "/wp-content/uploads/2023/11/gcmm-cad-4-pages-newsletter-nov-2023lite.pdf": "/newsletters",
  "/wp-content/uploads/2024/03/gcmm-cad-8pg-nwltfeb2024-digital.pdf": "/newsletters",
  "/wp-content/uploads/2024/08/cdn-mm-summer2024digital.pdf": "/newsletters",
  "/wp-content/uploads/2025/05/gcmm-cdn-may-nwsl-digital.pdf": "/newsletters",
};

// The CMS database ID is not sensitive (it's a public project identifier).
// The token, however, must come from an environment variable — never commit
// it directly. This should be the PUBLIC/read token, not the secret one.
const PLASMIC_CMS_DATABASE_ID = "bYeJVtRFReZ4zCMpwREGgw";
const PLASMIC_CMS_PUBLIC_TOKEN = process.env.PLASMIC_CMS_PUBLIC_TOKEN;

type ArticleCmsMeta = {
  title?: string;
  excerpt?: string;
  coverImage?: string;
};

// Looks up a single News Post row by slug and returns just the fields we
// need for social-share metadata. Returns null on any failure so callers
// can safely fall back to the page's static Page Settings metadata.
async function fetchArticleMetaBySlug(
  slug: string
): Promise<ArticleCmsMeta | null> {
  if (!PLASMIC_CMS_PUBLIC_TOKEN) {
    console.warn(
      "PLASMIC_CMS_PUBLIC_TOKEN is not set — falling back to static page metadata."
    );
    return null;
  }

  try {
    const query = encodeURIComponent(
      JSON.stringify({ limit: 1, where: { slug } })
    );
    const url = `https://data.plasmic.app/api/v1/cms/databases/${PLASMIC_CMS_DATABASE_ID}/tables/newsPosts/query?q=${query}`;

    const res = await fetch(url, {
      headers: {
        "x-plasmic-api-cms-tokens": `${PLASMIC_CMS_DATABASE_ID}:${PLASMIC_CMS_PUBLIC_TOKEN}`,
      },
      // Keep this reasonably fresh — social crawlers should see recent edits
      // without needing a full redeploy. Adjust to taste.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const row = data?.rows?.[0]?.data;

    if (!row) {
      return null;
    }

    return {
      title: row.title,
      excerpt: row.excerpt,
      coverImage: row.coverImage,
    };
  } catch (err) {
    console.warn("Failed to fetch article metadata from CMS:", err);
    return null;
  }
}

// Enumerates every real article slug from the CMS, so generateStaticParams
// can list actual article paths (not just the "/[slug]" template itself).
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
    console.warn("Failed to fetch article slugs for generateStaticParams:", err);
    return [];
  }
}

// Tells Next.js every known real path up front, so these become properly
// cached static routes with working ISR — sidestepping a known Next.js bug
// (vercel/next.js#62195) where dynamic catch-all routes with NO known params
// never actually cache, regardless of revalidate/fetchCache settings.
export async function generateStaticParams(): Promise<{ catchall?: string[] }[]> {
  const pageModules = await PLASMIC_SERVER.fetchPages();
  const staticPagePaths = pageModules
    .filter((mod) => !mod.path.includes("["))
    .map((mod) => ({
      catchall: mod.path === "/" ? undefined : mod.path.substring(1).split("/"),
    }));

  const articleSlugs = await fetchAllArticleSlugs();
  const articlePaths = articleSlugs.map((slug) => ({ catchall: [slug] }));

  return [...staticPagePaths, ...articlePaths];
}

// Runs on the SERVER, before the page is ever sent to a browser or crawler
// (Google, Facebook, WhatsApp, iMessage, etc). For most pages, Plasmic's
// fetched page data already includes the page's Title/Description/OG Image
// (set in Plasmic Studio's Page Settings) inside a "pageMetadata" field, and
// we use that directly. But for the shared article template (URL path
// "/[slug]"), that static metadata is the same for every article — so for
// pages with a resolved "slug" param, we instead look up that specific
// article's own title/excerpt/coverImage from the CMS and use those, so
// each article gets its own correct social-share preview.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const pathname = getPathname(resolvedParams?.catchall);

  // FIX: this call used to be unguarded — a Plasmic API timeout here threw
  // an unhandled error and crashed the whole page before it even reached the
  // render step below. Metadata is non-critical, so on failure we just skip
  // it and let the page render with defaults instead of taking the page down.
  let pageData;
  try {
    pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);
  } catch (err) {
    console.error(`Plasmic metadata fetch failed for ${pathname}:`, err);
    return {};
  }

  const entryMeta = pageData?.entryCompMetas?.[0];
  const meta = entryMeta?.pageMetadata;

  // If this route resolved to a page with a "slug" URL parameter, treat it
  // as an article and try to pull real per-article metadata from the CMS.
  const slug = (entryMeta?.params as Record<string, string> | undefined)
    ?.slug;

  let title = meta?.title || undefined;
  let description = meta?.description || undefined;
  let ogImage = meta?.openGraphImageUrl || undefined;

  if (slug) {
    const articleMeta = await fetchArticleMetaBySlug(slug);
    if (articleMeta) {
      title = articleMeta.title || title;
      description = articleMeta.excerpt || description;
      ogImage = articleMeta.coverImage || ogImage;
    }
  }

  if (!meta && !slug) {
    return {};
  }

  // FIX (Sep 2026): previously this used Plasmic's static per-page
  // "canonical" field directly with no per-article override — meaning every
  // article sharing the "/[slug]" template got the exact same canonical URL
  // (whatever was hardcoded in that one shared field), regardless of which
  // article it actually was. Confirmed via Search Console + live testing:
  // ~76 articles were all self-declaring /canada-day-26 as their canonical.
  // Now: if Plasmic has an explicit canonical set for this specific page,
  // respect it (e.g. standalone pages may intentionally point elsewhere).
  // Otherwise, default to the page's own real URL — the correct, safe
  // default for any page, and immune to this class of bug going forward
  // regardless of what is or isn't set in Plasmic's Page Settings.
  const canonicalUrl = meta?.canonical || `https://www.gcmm.ca${pathname}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function CatchallPage({ params }: Props) {
  const resolvedParams = await params;
  const pathname = getPathname(resolvedParams?.catchall);

  // FIX: several old "/donate-*" URLs (donate-sat-tv, etc.) no longer exist
  // as their own pages — all donations now go through the single /donate
  // page with a campaign dropdown. Redirect any old variant straight there
  // in case the old link is still shared/bookmarked anywhere, instead of
  // showing a dead end. Placed before the Plasmic fetch so we don't waste
  // an API call on a URL we're about to redirect away from.
  // NOTE: /donate-test-only is intentionally excluded — that's a real,
  // currently-used internal test page, not a stale link. Do not redirect it.
  if (
    pathname !== "/donate" &&
    pathname !== "/donate-test-only" &&
    pathname.startsWith("/donate-")
  ) {
    permanentRedirect("/donate");
  }

  // Old WordPress-era URLs with no CMS entry (see LEGACY_REDIRECTS above).
  if (pathname in LEGACY_REDIRECTS) {
    permanentRedirect(LEGACY_REDIRECTS[pathname]);
  }

  // Old-site country pages: /Country/Impact-India -> /impact/india,
  // /Country/Impact-South-Sudan -> /impact/southsudan. Found via Search
  // Console (Sep 2026); pattern-based so other old country links work too.
  const oldCountryPage = pathname.match(/^\/country\/impact-([a-z-]+)$/i);
  if (oldCountryPage) {
    permanentRedirect(`/impact/${oldCountryPage[1].toLowerCase().replace(/-/g, "")}`);
  }

  // FIX: this was the actual outage cause — an unguarded call that crashed
  // to a 500 whenever Plasmic's API was slow or unreachable. Now it degrades
  // to a lightweight, Plasmic-free fallback page instead of taking the whole
  // route down for every visitor.
  let pageData;
  try {
    pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);
  } catch (err) {
    console.error(`Plasmic fetch failed for ${pathname}:`, err);

    // Donations are revenue-critical — don't just apologize, actually let
    // people give. StripeDonationPage has no Plasmic dependency itself, so
    // it renders fine even while Plasmic's API is down. It'll show its own
    // built-in defaults (org info, a single "Where Most Needed" campaign)
    // rather than whatever specific campaigns are configured in Plasmic
    // Studio, since fetching that config is exactly what's failing — but a
    // working donation path beats none. Payment itself goes through our own
    // /api/stripe-donate-v2 route, which doesn't depend on Plasmic either.
    if (pathname === "/donate") {
      return <StripeDonationPage />;
    }

    return <SiteUnavailableFallback pathname={pathname} />;
  }

  if (!pageData) {
    notFound();
  }

  // The Plasmic loader matches dynamic routes like /test-only-article/[slug]
  // and extracts the path parameters for us (e.g. { slug: "canada-day-26" }).
  // Without passing these down, CMS queries that filter by the slug URL param
  // receive undefined at runtime and fall back to the first row.
  const pageMeta = pageData.entryCompMetas[0];

  // FIX: the Article Template page ("/[slug]") matches ANY single-segment
  // path, even ones with no matching CMS row — e.g. a made-up URL like
  // /some-random-text was rendering an empty template and returning HTTP 200
  // instead of a real 404. This is what Search Console was flagging as
  // "Soft 404" (Sep 2026). Reuses the same CMS lookup already used for
  // metadata below — real articles are unaffected (they have a matching row
  // and pass straight through); only slugs with no matching article now 404.
  // NOTE: /donate-test-only is excluded here too (same reason as the
  // redirect check above) — it's a real, intentionally-built Plasmic page
  // that matches "/[slug]" but isn't backed by a CMS article row, so the
  // CMS lookup below would incorrectly 404 it otherwise.
  const slug = (pageMeta?.params as Record<string, string> | undefined)?.slug;
  if (slug && slug !== "donate-test-only") {
    const articleMeta = await fetchArticleMetaBySlug(slug);
    if (!articleMeta) {
      notFound();
    }
  }

  // FIX: query params used to be read here on the SERVER (via searchParams),
  // which forced Next.js to treat this whole route as "must render fresh on
  // every request" — silently defeating the revalidate=300 caching above.
  // Confirmed empirically via the CACHE TEST log: every single reload was
  // hitting Plasmic live, not just once per 5 minutes as intended. Query
  // params are now read inside PlasmicClientPage itself, on the client, so
  // the server-rendered shell here can actually be cached. The Suspense
  // wrapper is required by Next.js whenever a client component reads
  // searchParams, so the static parts around it can still prerender.
  return (
    <>
      {pathname === "/" && (
        // Preload the hero poster so the browser starts fetching it the
        // moment it parses <head> — independent of MainPageCinematic's
        // lazy-load status or React hydration timing.
        <link
          rel="preload"
          as="image"
          href="/hero-poster.jpg"
          fetchPriority="high"
        />
      )}
      <Suspense fallback={null}>
        <PlasmicClientPage
          pathname={pathname}
          pageData={pageData}
          params={pageMeta?.params}
        />
      </Suspense>
    </>
  );
}
