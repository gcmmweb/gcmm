import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// SCHEDULED CMS REFRESH (Sep 2026)
// ---------------------------------------------------------------------------
// Problem: Plasmic's own CMS requests (homepage "latest stories", newsletters,
// article content, News & Stories grid) are made inside Plasmic's code without
// any cache setting, and Next.js stores them in its Data Cache for 1 YEAR
// (verified in .next/cache/fetch-cache: revalidate 31536000). So the HTML the
// server sends to Google kept showing CMS data from the last deploy — e.g. a
// removed article's card stayed on the homepage until the next code push, and
// new stories/newsletters wouldn't appear there either. (Visitors' browsers
// always fetched fresh data, so only the server copy was stale.)
//
// Fix: Vercel Cron calls this route every 15 minutes (see vercel.json).
// revalidatePath("/", "layout") marks every page AND the CMS data it used as
// stale; each page then re-renders with fresh CMS data on its next visit.
//
// Security: only runs when called with the CRON_SECRET that Vercel attaches to
// its own cron requests. If CRON_SECRET isn't configured, it refuses to run —
// so nobody on the internet can trigger site-wide refreshes.
// ---------------------------------------------------------------------------
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString() });
}
