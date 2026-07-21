import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLASMIC_SERVER } from "@/src/plasmic-init-server";
import PlasmicClientPage from "./client-page";

type Props = {
  params: Promise<{ catchall?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getPathname(catchall?: string[]) {
  return "/" + (catchall ? catchall.join("/") : "");
}

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

  const pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);
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

export default async function CatchallPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const pathname = getPathname(resolvedParams?.catchall);

  const pageData = await PLASMIC_SERVER.maybeFetchComponentData(pathname);

  if (!pageData) {
    notFound();
  }

  // The Plasmic loader matches dynamic routes like /test-only-article/[slug]
  // and extracts the path parameters for us (e.g. { slug: "canada-day-26" }).
  // Without passing these down, CMS queries that filter by the slug URL param
  // receive undefined at runtime and fall back to the first row.
  const pageMeta = pageData.entryCompMetas[0];

  const query = Object.fromEntries(
    Object.entries(resolvedSearchParams ?? {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] ?? "" : value ?? "",
    ])
  );

  return (
    <PlasmicClientPage
      pathname={pathname}
      pageData={pageData}
      query={query}
      params={pageMeta?.params}
    />
  );
}
