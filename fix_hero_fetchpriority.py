#!/usr/bin/env python3
"""
Fix: hero image missing fetchPriority=high (Sep 2026)

Root cause, confirmed via Next.js's own documentation and GitHub issues:
Starting in Next.js 16 (this project uses ^16.0.7), the `priority` prop on
<Image> was deprecated/changed -- it still generates a <link rel="preload">
for the image, but it NO LONGER automatically adds fetchPriority="high" to
either the preload link or the <img> tag itself. Per Next's own docs: "In
most cases, you should use loading="eager" or fetchPriority="high" instead
of preload."

This was invisible until checked directly: `priority` looked correctly set
in the code, the image wasn't lazy-loaded, but the browser was never told
to treat this LCP-critical hero image (on /50, the TV campaign landing
page) as high-priority -- confirmed missing from the live, served HTML.

Fix: add fetchPriority="high" explicitly alongside the existing `priority`
prop on the background Image in PhotoOverlay.tsx (used as the hero image
on /50 and several /impact/* pages).

Verified locally before shipping this script:
  - Full production build succeeds
  - Both the <img> tag AND the <link rel="preload"> now show
    fetchPriority="high" in the actual served HTML
  - /50, homepage, /videos, and three /impact/* pages that also use
    PhotoOverlay all still return 200 with correct content

Run from the repo root, on its own branch:
    git checkout main && git pull
    git checkout -b fix-hero-fetchpriority
    python3 fix_hero_fetchpriority.py
    git diff
    git add -A && git commit -m "Add fetchPriority=high to hero image (Next.js 16 deprecated priority's auto-behavior)"
    git push -u origin fix-hero-fetchpriority
"""
import sys
from pathlib import Path

ROOT = Path.cwd()
TARGET = ROOT / "components" / "PhotoOverlay.tsx"

OLD = "          priority\n          onError={(e) => {"
NEW = '          priority\n          fetchPriority="high"\n          onError={(e) => {'

text = TARGET.read_text()
count = text.count(OLD)
if count != 1:
    print(f"ABORTED: expected 1 match, found {count}. File may have "
          f"changed since this script was written -- stopping without "
          f"touching it.")
    sys.exit(1)

TARGET.write_text(text.replace(OLD, NEW))
print("Done. Hero image (PhotoOverlay component) now has explicit "
      "fetchPriority=\"high\".")
print()
print("This affects every page using PhotoOverlay as a hero, including")
print("/50 and several /impact/* pages -- all verified working.")
