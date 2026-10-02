#!/usr/bin/env python3
"""
Noindex patch: one shared rule for sitemap exclusion + noindex meta tag.

Changes:
  1. NEW  lib/indexing.ts   (shared helper: isNoIndexPath)
  2. EDIT app/sitemap.ts    (use helper; remove its local copy of the rules)
  3. EDIT app/[[...catchall]]/page.tsx  (noindex for any "_" segment or listed path)

Run from repo root, on a fresh branch off main:
    python3 apply_noindex_patch.py --dry-run
    python3 apply_noindex_patch.py
Needs indexing.ts next to this script.
"""
import argparse, re, sys
from pathlib import Path

ROOT = Path(".").resolve()
HERE = Path(__file__).resolve().parent
HELPER_SRC = HERE / "indexing.ts"
HELPER_DST = ROOT / "lib" / "indexing.ts"
SITEMAP = ROOT / "app" / "sitemap.ts"
PAGE = ROOT / "app" / "[[...catchall]]" / "page.tsx"


def fail(m):
    print(f"\n[ABORT] {m}\n", file=sys.stderr); sys.exit(1)


def sub_once(text, pattern, repl, label, flags=0):
    ms = list(re.finditer(pattern, text, flags))
    if len(ms) != 1:
        fail(f"{label}: expected exactly 1 match, found {len(ms)}. Not editing; do it by hand.")
    m = ms[0]
    return text[:m.start()] + m.expand(repl) + text[m.end():]


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    for p in (HELPER_SRC, SITEMAP, PAGE):
        if not p.exists(): fail(f"Missing file: {p}")
    if HELPER_DST.exists(): fail("lib/indexing.ts already exists. Review by hand.")

    # ---- sitemap.ts ----
    s = SITEMAP.read_text(encoding="utf-8")
    s = sub_once(
        s, r'(import \{ PLASMIC_SERVER \} from "@/src/plasmic-init-server";\n)',
        r'\1import { isNoIndexPath } from "@/lib/indexing";\n', "sitemap import")
    s = sub_once(
        s, r"const EXCLUDED_PATHS = new Set<string>\(\[.*?\]\);\n",
        "// The list of excluded paths now lives in lib/indexing.ts (shared with the\n"
        "// noindex meta tag in app/[[...catchall]]/page.tsx).\n", "EXCLUDED_PATHS block", re.DOTALL)
    s = sub_once(
        s, r"function isUnpublishedPath\(path: string\): boolean \{\n.*?\n\}\n",
        "", "isUnpublishedPath function", re.DOTALL)
    n = s.count("!EXCLUDED_PATHS.has(path) && !isUnpublishedPath(path)")
    if n != 2: fail(f"sitemap filters: expected 2 occurrences, found {n}.")
    s = s.replace("!EXCLUDED_PATHS.has(path) && !isUnpublishedPath(path)", "!isNoIndexPath(path)")
    for leftover in ("EXCLUDED_PATHS.has", "isUnpublishedPath("):
        if leftover in s: fail(f"sitemap still references {leftover}.")

    # ---- page.tsx ----
    t = PAGE.read_text(encoding="utf-8")
    t = sub_once(
        t, r'(import \{ PLASMIC_SERVER \} from "@/src/plasmic-init-server";\n)',
        r'\1import { isNoIndexPath } from "@/lib/indexing";\n', "page import")
    old = '...(pathname === "/thank-you" ? { robots: { index: false, follow: false } } : {}),'
    new = ('...(isNoIndexPath("/" + (resolvedParams?.catchall?.join("/") ?? "")) || isNoIndexPath(pathname)\n'
           '      ? { robots: { index: false, follow: false } }\n'
           '      : {}),')
    if t.count(old) != 1: fail(f"page.tsx robots line: expected 1, found {t.count(old)}.")
    t = t.replace(old, new)
    t = t.replace("// The thank-you page shouldn't appear in Google search results.",
                  "// Test/sandbox pages (any \"_\" path segment) and listed pages such as\n    // /thank-you shouldn't appear in Google search results. See lib/indexing.ts.", 1)

    print("sitemap.ts: import added, local rules removed, 2 filters now use isNoIndexPath")
    print("page.tsx:   import added, robots line now uses isNoIndexPath (raw path + normalized path)")
    print("lib/indexing.ts: new file")
    if a.dry_run:
        print("\n[dry-run] nothing written."); return
    HELPER_DST.parent.mkdir(exist_ok=True)
    HELPER_DST.write_text(HELPER_SRC.read_text(encoding="utf-8"), encoding="utf-8")
    SITEMAP.write_text(s, encoding="utf-8"); PAGE.write_text(t, encoding="utf-8")
    print("\n[applied] Now: git status (expect 1 new + 2 modified), git diff.")

if __name__ == "__main__":
    main()
