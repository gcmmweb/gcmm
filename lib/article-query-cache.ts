// lib/article-query-cache.ts
//
// WHY THIS FILE EXISTS (Oct 2026): the Article Template page in Plasmic Studio
// loads each article through four "data queries" (newsPosts, recentPosts,
// previousPost, nextPost). On this site those queries only ran in the visitor's
// browser, so the HTML the server sent contained the template's SAMPLE text
// ("Original article date", "unprecedented Mega City...") and the real article
// appeared only after the page loaded. Google and AI crawlers that read the raw
// HTML could see the sample text instead of the real article.
//
// Plasmic lets us hand the page ready-made query results (prefetchedQueryData).
// The page then renders the real article on the server. This file builds that
// hand-off: for one article slug it fetches the same four things the Studio
// queries fetch, and files each result under the exact lookup key Plasmic
// expects ("$q.$.<query id>.$.<the query's settings>").
//
// IMPORTANT - these query settings are a COPY of what is set in Plasmic Studio
// (Article/Article Template > Data queries). If someone changes a query there
// (a different limit, sort order, table...), update the matching entry below.
// If they drift apart nothing breaks: Plasmic simply does not find the ready-made
// result for that query and loads it in the browser exactly like before.
//
// Every failure in here is swallowed on purpose (returns undefined). This helper
// must never be able to take a page down.

const CMS_HOST = "https://data.plasmic.app";
const CMS_ID = "bYeJVtRFReZ4zCMpwREGgw";
const TABLE_ID = "newsPosts";
const QUERY_ID = "plasmicCms.fetchContent";

// Same lookup key Plasmic builds in @plasmicapp/data-sources (makeQueryCacheKey):
// object keys sorted alphabetically at every level, then JSON.
function sortDeep(value: unknown): unknown {
  if (typeof value !== "object" || value === null) return value;
  if (Array.isArray(value)) return value.map(sortDeep);
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value as object).sort()) {
    out[key] = sortDeep((value as Record<string, unknown>)[key]);
  }
  return out;
}

export function makeQueryKey(settings: Record<string, unknown>): string {
  return `$q.$.${QUERY_ID}.$.${JSON.stringify(sortDeep([settings]))}`;
}

type CmsQuery = {
  where?: unknown;
  limit?: number;
  orderBy?: string;
  desc?: boolean;
  fields?: string[];
};

// Same request Plasmic's own "cms.fetch content" function sends.
async function cmsRows(token: string, query: CmsQuery): Promise<any[]> {
  const q = {
    where: query.where,
    limit: query.limit,
    order: query.orderBy
      ? [{ field: query.orderBy, dir: query.desc ? "desc" : "asc" }]
      : undefined,
    fields: query.fields,
  };
  const url = new URL(
    `${CMS_HOST}/api/v1/cms/databases/${CMS_ID}/tables/${TABLE_ID}/query`
  );
  url.searchParams.set("q", JSON.stringify(q));
  url.searchParams.set("draft", "0");
  const res = await fetch(url.toString(), {
    headers: {
      accept: "*/*",
      "x-plasmic-api-cms-tokens": `${CMS_ID}:${token}`,
    },
    // Same freshness as the metadata fetch in page.tsx.
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`CMS responded ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json?.rows)) throw new Error("CMS reply had no rows");
  return json.rows;
}

export async function buildArticleQueryData(
  slug: string
): Promise<Record<string, unknown> | undefined> {
  const token = process.env.PLASMIC_CMS_PUBLIC_TOKEN;
  if (!token || !slug) return undefined;

  try {
    const base = { host: CMS_HOST, cmsId: CMS_ID, cmsPublicToken: token, tableId: TABLE_ID };
    const cache: Record<string, unknown> = {};

    // 1) newsPosts: the article itself, found by its slug.
    const articleRows = await cmsRows(token, {
      where: { $and: [{ slug }] },
      limit: 1,
    });
    if (articleRows.length === 0) return undefined;
    cache[
      makeQueryKey({
        ...base,
        whereLogic: { and: [{ "==": [{ var: "slug" }, slug] }] },
        limit: 1,
      })
    ] = articleRows;

    const date = articleRows[0]?.data?.date;

    // 2) recentPosts: newest 4 articles (same for every article page).
    const recentRows = await cmsRows(token, { orderBy: "date", desc: true, limit: 4 });
    cache[
      makeQueryKey({ ...base, orderBy: "date", orderDirection: "desc", limit: 4 })
    ] = recentRows;

    // 3) previousPost / 4) nextPost: depend on this article's date, exactly like
    // the Studio queries do ($q.newsPosts.data[0].data.date).
    if (date) {
      const previousRows = await cmsRows(token, {
        where: { $and: [{ date: { $lt: date } }] },
        orderBy: "date",
        desc: true,
        limit: 1,
      });
      cache[
        makeQueryKey({
          ...base,
          orderBy: "date",
          whereLogic: { and: [{ "<": [{ var: "date" }, date] }] },
          orderDirection: "desc",
          limit: 1,
        })
      ] = previousRows;

      const nextRows = await cmsRows(token, {
        where: { $and: [{ date: { $gt: date } }] },
        orderBy: "date",
        desc: false,
        limit: 1,
        fields: [],
      });
      cache[
        makeQueryKey({
          ...base,
          select: [],
          whereLogic: { and: [{ ">": [{ var: "date" }, date] }] },
          orderBy: "date",
          limit: 1,
        })
      ] = nextRows;
    }

    return cache;
  } catch (err) {
    console.warn(`Article query prefetch failed for ${slug}:`, err);
    return undefined;
  }
}
