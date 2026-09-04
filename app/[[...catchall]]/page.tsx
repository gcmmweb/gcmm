import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PLASMIC_SERVER } from "@/src/plasmic-init-server";
import PlasmicClientPage from "./client-page";
import { SiteUnavailableFallback } from "@/components/SiteUnavailableFallback";
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
  return "/" + (catchall ? catchall.join("/") : "");

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

  return {
    title,
    description,
    alternates: meta?.canonical ? { canonical: meta.canonical } : undefined,
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
    <Suspense fallback={null}>
      <PlasmicClientPage
        pathname={pathname}
        pageData={pageData}
        params={pageMeta?.params}
      />
    </Suspense>
  );
}
