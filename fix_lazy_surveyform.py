#!/usr/bin/env python3
"""
Lazy-load SurveyForm (Sep 2026) -- first test of the bundle-splitting plan

This is a small-scale test of the plan for reducing the shared Plasmic
bundle (currently ~667KB, containing 50+ components regardless of which
page actually uses them). Converts ONE component -- SurveyForm (31KB
source) -- from a static import to a lazy (next/dynamic) import, using
the EXACT SAME pattern already proven safe in this codebase for
OurVisionSection, MainPageCinematic, MissionMapPage, and
StripeDonationPageV2 (see src/plasmic-init.ts lines ~22-103).

SurveyForm was chosen because: not used on /50 (the TV campaign landing
page -- confirmed by scrolling the full live page), not part of
nav/header/footer, not part of the donation flow (which was deliberately
avoided per the optimization plan, even though the two Stripe donation
components are larger, since donations are business-critical and this
is exactly the kind of thing to test with something lower-stakes first).

Verified locally before shipping this script:
  - Production build succeeds cleanly
  - The shared page bundle drops from 667KB to 654KB (~13KB smaller)
  - survey-form.tsx's code is completely gone from the shared bundle
    (confirmed via source map analysis) -- it now lives in its own
    13KB async chunk that only loads on pages that actually render it
  - /50, homepage, and 8 other key pages all still return 200 with
    correct content
  - app/api/survey/route.ts (the backend that handles submissions) is
    a completely separate file, untouched by this change

NOT verified (needs checking on the Vercel preview before merging):
  - Whether SurveyForm actually still displays/works correctly on
    whatever page(s) use it in Plasmic Studio -- no live URL using it
    turned up in the sitemap, so this could not be tested end-to-end.
    Per the optimization plan's own recommended sequence: open
    /plasmic-host in Plasmic Studio and check that editing/rendering
    an instance of "Survey Form" still works normally before merging.

Run from the repo root, on its own branch:
    git checkout main && git pull
    git checkout -b lazy-load-surveyform
    python3 fix_lazy_surveyform.py
    git diff
    git add -A && git commit -m "Lazy-load SurveyForm to shrink shared Plasmic bundle"
    git push -u origin lazy-load-surveyform
"""
import sys
from pathlib import Path

ROOT = Path.cwd()
PLASMIC_INIT = ROOT / "src" / "plasmic-init.ts"

OLD = 'import { SurveyForm } from "@/components/survey-form"'
NEW = '''// LAZY (Sep 2026): 31KB, not used on /50 (the TV campaign landing page) or
// nav/header/footer/donation flow. Was loading in the shared bundle on
// every Plasmic-driven page regardless of use, per real bundle analysis.
const SurveyForm = dynamic(() =>
  import("@/components/survey-form").then((m) => ({ default: m.SurveyForm }))
);'''

text = PLASMIC_INIT.read_text()
count = text.count(OLD)
if count != 1:
    print(f"ABORTED: expected 1 match, found {count}. File may have "
          f"changed since this script was written -- stopping without "
          f"touching it.")
    sys.exit(1)

PLASMIC_INIT.write_text(text.replace(OLD, NEW))
print("Done. SurveyForm now lazy-loaded via next/dynamic.")
print()
print("Before merging to main, please also do in Plasmic Studio:")
print("  1. Open /plasmic-host")
print("  2. Find a page/arena that uses the 'Survey Form' component")
print("     (I could not find one live via the sitemap -- it may only")
print("     exist as a draft, or on a page not yet published)")
print("  3. Confirm it still displays and behaves normally")
print("  4. If you truly can't find where it's used, that itself is")
print("     useful information -- worth flagging separately")
