#!/usr/bin/env python3
"""
fix_donation_tracking.py  (Oct 2026)

What this does (analytics + labeling only, never touches amounts or charges):
  1. Donation form: hands the gift details to the thank-you page through
     sessionStorage instead of the web address (no donor name / campaign ID in
     the URL), and sends the campaign ID along to the payment API.
  2. Payment API: adds campaign_id to the Stripe metadata (next to the
     existing campaign name) on one-time AND monthly gifts.
  3. Thank-you page: waits for Google Analytics to load (it loads lazily),
     then sends ONE standard GA4 "purchase" event per gift (transaction_id =
     Stripe payment ID, so refreshes/back-button can't count it twice and GA4
     shows real dollar totals + counts).
  4. /thank-you gets a noindex tag, and old /donation-success redirects to it.

Safe by design: every edit must match EXACTLY ONE place, or the script stops
before changing anything. Run from the repo root:  python3 fix_donation_tracking.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(".")
FORM = ROOT / "components" / "stripe-donation-page-v2.tsx"
ROUTE = ROOT / "app" / "api" / "stripe-donate-v2" / "route.ts"
THANKS = ROOT / "components" / "donation-thank-you-page.tsx"
CATCHALL = ROOT / "app" / "[[...catchall]]" / "page.tsx"

files = {p: p.read_text(encoding="utf-8") for p in (FORM, ROUTE, THANKS, CATCHALL)}
problems = []


def replace_once(path, old, new, label):
    text = files[path]
    n = text.count(old)
    if n != 1:
        problems.append(f"[{path.name}] {label}: expected 1 match, found {n}")
        return
    files[path] = text.replace(old, new)


# ---------------------------------------------------------------- 1. FORM
replace_once(
    FORM,
    "          matchEmailText: selectedCampaign.matchEmailText,\n        }\n",
    "          matchEmailText: selectedCampaign.matchEmailText,\n"
    "          // Internal code (e.g. \"mcmc\"). Goes to Stripe metadata only, never shown to donors.\n"
    "          campaignId: selectedCampaign.campaignId,\n        }\n",
    "add campaignId to the data sent to the API",
)

form_text = files[FORM]
start_marker = "    // LIVE — redirects to the real thank-you page after a successful donation.\n"
end_marker = "    window.location.href = `/thank-you?${params.toString()}`\n"
si = form_text.find(start_marker)
ei = form_text.find(end_marker)
if form_text.count(start_marker) != 1 or form_text.count(end_marker) != 1 or ei < si:
    problems.append("[stripe-donation-page-v2.tsx] redirect block: markers not found exactly once")
else:
    new_block = '''    // LIVE — redirects to the real thank-you page after a successful donation.
    // The gift details travel in this tab's session storage, NOT the web address:
    // that keeps the donor's name and the internal campaign ID out of the URL
    // (and out of Google Analytics page addresses), and gives the thank-you page
    // a Stripe payment ID so one gift is only ever counted once.
    try {
      const donationRecord = {
        tx: result?.payment_intent_id || `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        campaignId: redirectCampaignId || "",
        campaignName: selectedCampaign?.name || "",
        amount: Number(redirectAmount) || 0,
        frequency: redirectFrequency || "one-time",
        name: redirectName || "",
      }
      window.sessionStorage.setItem("gcmm_donation", JSON.stringify(donationRecord))
    } catch {
      // Storage blocked (e.g. strict private mode): the thank-you page simply
      // shows its generic version and skips analytics. The gift itself is fine.
    }

    window.location.href = "/thank-you"
'''
    files[FORM] = form_text[:si] + new_block + form_text[ei + len(end_marker):]

# ---------------------------------------------------------------- 2. ROUTE
replace_once(
    ROUTE,
    "  signatureTitleOverride?: string // Optional: overrides the global signature title for THIS campaign only (e.g. UkraineAid adds \"| UkraineAid\")\n}\n",
    "  signatureTitleOverride?: string // Optional: overrides the global signature title for THIS campaign only (e.g. UkraineAid adds \"| UkraineAid\")\n"
    "  campaignId?: string // Internal short code (e.g. \"mcmc\"). Stored in Stripe metadata, never shown to donors.\n}\n",
    "add campaignId to CampaignData type",
)
replace_once(
    ROUTE,
    '    const campaignName = email_customization?.campaign?.name || "General Ministry Support"\n',
    '    const campaignName = email_customization?.campaign?.name || "General Ministry Support"\n'
    "    // Comes from the browser, so keep it to safe characters and a sane length.\n"
    '    const campaignId = String(email_customization?.campaign?.campaignId || "")\n'
    '      .replace(/[^a-zA-Z0-9_-]/g, "")\n'
    "      .slice(0, 60)\n",
    "define a cleaned campaignId next to campaignName",
)
replace_once(
    ROUTE,
    'metadata: { campaign: campaignName, account_id: account_id || "" },',
    'metadata: { campaign: campaignName, campaign_id: campaignId, account_id: account_id || "" },',
    "customer metadata",
)
route_text = files[ROUTE]
pattern = re.compile(r'(\n([ \t]+)campaign: campaignName,)(\n[ \t]+account_id: account_id \|\| "",)')
matches = pattern.findall(route_text)
if len(matches) != 3:
    problems.append(f"[route.ts] subscription / update / one-time metadata blocks: expected 3, found {len(matches)}")
else:
    files[ROUTE] = pattern.sub(lambda m: f"{m.group(1)}\n{m.group(2)}campaign_id: campaignId,{m.group(3)}", route_text)

# ------------------------------------------------------------- 3. THANK-YOU
replace_once(
    THANKS,
    'import { useEffect } from "react"\n',
    'import { useEffect, useState } from "react"\n',
    "import useState",
)
replace_once(
    THANKS,
    "const FALLBACK_HEADLINE =",
    '''// What the donation form leaves in this browser tab (session storage) right
// after a successful gift. It never appears in the web address.
interface DonationRecord {
  tx: string // Stripe payment ID — used so one gift is only counted once
  campaignId: string
  campaignName: string
  amount: number
  frequency: string
  name: string
}

const FALLBACK_HEADLINE =''',
    "add DonationRecord type",
)
replace_once(
    THANKS,
    '''  const campaignId = searchParams?.get("campaign") ?? ""
  const amount = searchParams?.get("amount") ?? ""
  const frequency = searchParams?.get("frequency") ?? ""
  const donorName = searchParams?.get("name") ?? ""
''',
    '''  // Read the gift details the donation form left in this tab. Done in an
  // effect (not during render) so the server and browser HTML always match.
  const [record, setRecord] = useState<DonationRecord | null>(null)
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("gcmm_donation")
      if (raw) setRecord(JSON.parse(raw))
    } catch {
      // Storage unavailable or unreadable: just show the generic page.
    }
  }, [])

  // Display values: the donation record when present; otherwise the old URL
  // parameters (kept so old links / Studio preview still render). URL
  // parameters are display-only — they are NEVER used for analytics.
  const campaignId = record?.campaignId ?? searchParams?.get("campaign") ?? ""
  const amount = record ? String(record.amount || "") : searchParams?.get("amount") ?? ""
  const frequency = record?.frequency ?? searchParams?.get("frequency") ?? ""
  const donorName = record?.name ?? searchParams?.get("name") ?? ""
''',
    "read donation record",
)

thanks_text = files[THANKS]
t_start = thanks_text.find("  // Fires once per page load. This is what lets GA4")
t_end_marker = "  }, [amount, campaignId, frequency])\n"
t_end = thanks_text.find(t_end_marker)
if thanks_text.count("  // Fires once per page load. This is what lets GA4") != 1 or thanks_text.count(t_end_marker) != 1 or t_end < t_start:
    problems.append("[donation-thank-you-page.tsx] old tracking effect: markers not found exactly once")
else:
    new_effect = '''  // Sends ONE standard GA4 "purchase" event per gift. Why this shape:
  //  - Google Analytics loads lazily (after the page is idle), so we WAIT for
  //    it (up to ~20s) instead of checking once and giving up.
  //  - Only a real donation record from the form triggers it (a typed-in or
  //    shared URL can't create fake donations).
  //  - transaction_id (the Stripe payment ID) + a saved "already sent" flag
  //    mean refreshing or revisiting the page never counts the gift twice.
  //  - "purchase" with value + currency is what makes GA4 show dollar totals.
  useEffect(() => {
    if (!record || !record.tx || !(Number(record.amount) > 0)) return
    const trackedKey = `gcmm_tracked_${record.tx}`
    try {
      if (window.localStorage.getItem(trackedKey)) return
    } catch {
      // Storage blocked: carry on; transaction_id still protects against repeats in GA4.
    }

    let tries = 0
    const timer = window.setInterval(() => {
      const gtag = (window as any).gtag
      if (typeof gtag === "function") {
        window.clearInterval(timer)
        try {
          if (window.localStorage.getItem(trackedKey)) return
          window.localStorage.setItem(trackedKey, "1")
        } catch {
          // ignore
        }
        const value = Number(record.amount)
        const id = record.campaignId || "general"
        gtag("event", "purchase", {
          transaction_id: record.tx,
          value,
          currency: "CAD",
          items: [
            {
              item_id: id,
              item_name: record.campaignName || id,
              price: value,
              quantity: 1,
            },
          ],
          campaign_id: id,
          frequency: record.frequency || "unknown",
        })
      } else if (++tries > 80) {
        window.clearInterval(timer)
      }
    }, 250)
    return () => window.clearInterval(timer)
  }, [record])
'''
    files[THANKS] = thanks_text[:t_start] + new_effect + thanks_text[t_end + len(t_end_marker):]

# ------------------------------------------------------------ 4. CATCH-ALL
replace_once(
    CATCHALL,
    '  "/news": "/news-stories",\n',
    '  "/news": "/news-stories",\n'
    "  // Old return address named in the payment code; the real page is /thank-you.\n"
    '  "/donation-success": "/thank-you",\n',
    "redirect /donation-success to /thank-you",
)
replace_once(
    CATCHALL,
    "  return {\n    title,\n    description,\n    alternates: {\n      canonical: canonicalUrl,\n",
    "  return {\n    title,\n    description,\n"
    "    // The thank-you page shouldn't appear in Google search results.\n"
    '    ...(pathname === "/thank-you" ? { robots: { index: false, follow: false } } : {}),\n'
    "    alternates: {\n      canonical: canonicalUrl,\n",
    "noindex /thank-you",
)

# ------------------------------------------------------------------ WRITE
if problems:
    print("STOPPED — nothing was changed. These edits did not match your current files:\n")
    for p in problems:
        print("  -", p)
    print("\nSend this output to Claude and we'll adjust the script to your files.")
    sys.exit(1)

for path, text in files.items():
    path.write_text(text, encoding="utf-8")
print("Done. Changed:")
for path in files:
    print("  -", path)
print("\nNext: git diff   (review), then branch + preview, then a small test gift.")
