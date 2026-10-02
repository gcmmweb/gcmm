#!/usr/bin/env python3
"""Adds the viewable-sandbox rule to lib/indexing.ts.
Any path segment equal to "sandbox" or starting with "sandbox-" is noindex
and out of the sitemap, but (unlike "_" pages) still renders on the site.
Run from repo root:  python3 add_sandbox_rule.py [--dry-run]"""
import sys
from pathlib import Path

F = Path("lib/indexing.ts")
if not F.exists():
    sys.exit("[ABORT] lib/indexing.ts not found. Run from repo root on the noindex branch.")
s = F.read_text(encoding="utf-8")
if "hasSandboxSegment" in s:
    sys.exit("[ABORT] Sandbox rule already present.")

old_fn = '''export function hasUnpublishedSegment(path: string): boolean {
  return path.split("/").some((segment) => segment.startsWith("_"));
}
'''
new_fn = old_fn + '''
// Viewable test pages: a segment named "sandbox" or starting with "sandbox-"
// (e.g. /sandbox-hero-test). These DO render on the site (so you can open
// them on a phone or a Vercel preview) but are noindex and out of the sitemap.
// Unlike "_" pages, the name survives getPathname()'s "_" -> "-" rewrite.
export function hasSandboxSegment(path: string): boolean {
  return path
    .toLowerCase()
    .split("/")
    .some((segment) => segment === "sandbox" || segment.startsWith("sandbox-"));
}
'''
old_ret = "return NOINDEX_PATHS.has(p.toLowerCase()) || hasUnpublishedSegment(p);"
new_ret = "return NOINDEX_PATHS.has(p.toLowerCase()) || hasUnpublishedSegment(p) || hasSandboxSegment(p);"
old_hdr = '// To launch it, rename the path without the underscore.\n'
new_hdr = old_hdr + ('//\n// Second convention: a segment named "sandbox" or starting with "sandbox-"\n'
                     '// (e.g. /sandbox-hero-test) is a test page you CAN open in a browser;\n'
                     '// it is noindex and left out of the sitemap, but still renders.\n')
for o in (old_fn, old_ret, old_hdr):
    if s.count(o) != 1:
        sys.exit(f"[ABORT] Expected exactly 1 match for:\n{o}\nfound {s.count(o)}. Edit by hand.")
s = s.replace(old_fn, new_fn).replace(old_ret, new_ret).replace(old_hdr, new_hdr)
if "--dry-run" in sys.argv:
    print("[dry-run] would add hasSandboxSegment and wire it into isNoIndexPath."); sys.exit()
F.write_text(s, encoding="utf-8")
print("[applied] lib/indexing.ts updated. Next: git diff lib/indexing.ts")
