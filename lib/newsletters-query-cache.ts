// lib/newsletters-query-cache.ts
//
// WHY THIS FILE EXISTS (Oct 2026): the /newsletters page in Plasmic Studio loads
// its cards through two "data queries" (newsletters, previousNewsletters). They
// only ran in the visitor's browser, so the first HTML said "Loading...", the page
// jumped when the cards arrived, and Google could not see the newsletter PDF
// links. Same idea as lib/article-query-cache.ts: fetch the same two things on the
// server and hand them to Plasmic ready-made (prefetchedQueryData).
//
// IMPORTANT - these query settings are a COPY of what is set in Plasmic Studio
// (Newsletter & Sign Up > Page data > Data queries):
//   newsletters          : table Newsletters, order by date descending, limit 1
//   previousNewsletters  : table Newsletters, order by date descending, limit 6, offset 1
// If someone changes a query there, update the matching entry below. If they drift
// apart nothing breaks: Plasmic does not find the ready-made result and loads the
// list in the browser exactly like before.
//
// The CMS token comes from the Vercel environment variable
// PLASMIC_NEWSLETTERS_CMS_TOKEN (the "CMS public token" shown in the Studio query).
// Every failure in here is swallowed on purpose (returns undefined).

const CMS_HOST = "https://data.plasmic.app";
const CMS_ID = "1Vst9mERqGLxkyb6Mhm7be";
const TABLE_ID = "newsletters";
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

function makeQueryKey(settings: Record<string, unknown>): string {
  return `$q.$.${QUERY_ID}.$.${JSON.stringify(sortDeep([settings]))}`;
}

async function cmsRows(
  token: string,
  opts: { limit: number; offset?: number }
): Promise<any[]> {
  const q = {
    limit: opts.limit,
    fields: [],
    offset: opts.offset,
    order: [{ field: "date", dir: "desc" }],
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
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`CMS responded ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json?.rows)) throw new Error("CMS reply had no rows");
  return json.rows;
}

export async function buildNewslettersQueryData(): Promise<
  Record<string, unknown> | undefined
> {
  const token = process.env.PLASMIC_NEWSLETTERS_CMS_TOKEN;
  if (!token) return undefined;

  try {
    const base = {
      host: CMS_HOST,
      cmsId: CMS_ID,
      cmsPublicToken: token,
      tableId: TABLE_ID,
      select: [],
    };
    const cache: Record<string, unknown> = {};

    // 1) newsletters: the newest issue (the big "Latest Newsletter" card).
    const latest = await cmsRows(token, { limit: 1 });
    cache[
      makeQueryKey({ ...base, orderBy: "date", orderDirection: "desc", limit: 1 })
    ] = latest;

    // 2) previousNewsletters: the 6 issues after the newest one.
    const previous = await cmsRows(token, { limit: 6, offset: 1 });
    cache[
      makeQueryKey({
        ...base,
        orderBy: "date",
        orderDirection: "desc",
        limit: 6,
        offset: 1,
      })
    ] = previous;

    return cache;
  } catch (err) {
    console.warn("Newsletters query prefetch failed:", err);
    return undefined;
  }
}
