#!/usr/bin/env python3
"""
Batch 1 removal: Article ("Article Text"), BlogPage, AboutPage ("About Page").

Verified by Junita in Plasmic Studio (Find All References): not used on any live page.

NEVER touches these look-alikes (live / separate):
  AboutUsPage (components/about-us), TransformerBlogPage, ArticleNavigation

Run from the repo root, on a fresh branch off main:
    python3 remove_dead_components_batch1.py --dry-run
    python3 remove_dead_components_batch1.py

Safety:
  - Aborts if ANY other source file (outside the target files and src/plasmic-init.ts)
    still imports one of the target modules.
  - Aborts if src/plasmic-init-server.ts references them.
  - Aborts if an import line or registration block is not found exactly once,
    or the extracted block does not look like one clean registerComponent call.
  - Writes plasmic-init.ts only after all three removals succeed in memory.
"""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path(".").resolve()
INIT = ROOT / "src" / "plasmic-init.ts"
INIT_SERVER = ROOT / "src" / "plasmic-init-server.ts"

# symbol, module path (as imported after "@/"), file to delete
TARGETS = [
    {"symbol": "Article",   "module": "components/Article",    "file": ROOT / "components" / "Article.tsx"},
    {"symbol": "BlogPage",  "module": "components/blog-page",  "file": ROOT / "components" / "blog-page.tsx"},
    {"symbol": "AboutPage", "module": "components/about-page", "file": ROOT / "components" / "about-page.tsx"},
]

SCAN_DIRS = ["app", "src", "components", "lib", "pages", "hooks", "utils"]
SCAN_EXT = {".ts", ".tsx", ".js", ".jsx", ".mjs"}


def fail(msg):
    print(f"\n[ABORT] {msg}\n", file=sys.stderr)
    sys.exit(1)


def find_importers(module, own_file):
    """Files (other than own_file and plasmic-init.ts) that import this module."""
    base = module.split("/")[-1]
    pat = re.compile(
        r"""(from\s+|import\s*\(\s*|require\s*\(\s*)["'](@/|\./|\.\./|[./]*)?(?:[\w./-]*/)?%s["']""" % re.escape(base)
    )
    hits = []
    for d in SCAN_DIRS:
        dp = ROOT / d
        if not dp.exists():
            continue
        for p in dp.rglob("*"):
            if p.suffix not in SCAN_EXT or "node_modules" in p.parts or ".next" in p.parts:
                continue
            if p == own_file or p == INIT:
                continue
            try:
                text = p.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue
            for i, line in enumerate(text.splitlines(), 1):
                if line.lstrip().startswith("//"):
                    continue
                if pat.search(line):
                    hits.append(f"{p.relative_to(ROOT)}:{i}: {line.strip()}")
    return hits


def extract_registration(text, symbol):
    start_re = re.compile(r"PLASMIC\.registerComponent\(\s*%s\s*,\s*\{" % re.escape(symbol))
    ms = list(start_re.finditer(text))
    if len(ms) != 1:
        fail(f"Expected exactly 1 registerComponent({symbol}, {{ ... }}) in plasmic-init.ts, found {len(ms)}.")
    m = ms[0]
    i0 = m.end() - 1
    depth, end = 0, None
    for i in range(i0, len(text)):
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                end = i
                break
    if end is None:
        fail(f"Brace matching failed for {symbol}.")
    if text[end + 1:end + 3] != ");":
        fail(f"Block for {symbol} does not close with '}});' where expected. Remove by hand.")
    block_end = end + 3
    if block_end < len(text) and text[block_end] == "\n":
        block_end += 1
    block = text[m.start():block_end]
    if block.count("registerComponent(") != 1:
        fail(f"Block for {symbol} swallowed another registerComponent. Remove by hand.")
    for other in ("AboutUsPage", "TransformerBlogPage", "ArticleNavigation", "StripeDonationPageV2"):
        if re.search(r"registerComponent\(\s*%s\b" % other, block):
            fail(f"Block for {symbol} contains a live component ({other}). Remove by hand.")
    return m.start(), block_end, block


def extract_import(text, symbol, module):
    pat = re.compile(
        r"^[ \t]*import\s*\{\s*%s\s*\}\s*from\s*[\"']@/%s[\"'];?[ \t]*\n?" % (re.escape(symbol), re.escape(module)),
        re.MULTILINE,
    )
    ms = list(pat.finditer(text))
    if len(ms) != 1:
        fail(f"Expected exactly 1 import of {{ {symbol} }} from \"@/{module}\", found {len(ms)}.")
    return ms[0].start(), ms[0].end(), ms[0].group(0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    print("=" * 70)
    print("Batch 1 removal: Article, BlogPage, AboutPage")
    print("Mode:", "DRY RUN" if args.dry_run else "APPLYING")
    print("=" * 70)

    if not INIT.exists():
        fail("src/plasmic-init.ts not found. Run from the repo root.")

    # 1. Other importers?
    problems = []
    for t in TARGETS:
        if not t["file"].exists():
            fail(f"{t['file'].relative_to(ROOT)} not found.")
        hits = find_importers(t["module"], t["file"])
        if hits:
            problems.append((t["symbol"], hits))
    if INIT_SERVER.exists():
        st = INIT_SERVER.read_text(encoding="utf-8", errors="ignore")
        for t in TARGETS:
            base = t["module"].split("/")[-1]
            if re.search(r"[\"']@?/?[\w./-]*%s[\"']" % re.escape(base), st):
                problems.append((t["symbol"], ["src/plasmic-init-server.ts references it"]))
    if problems:
        for sym, hits in problems:
            print(f"\n{sym} is still referenced:")
            for h in hits:
                print("   ", h)
        fail("Other files still import these components. Resolve those first.")
    print("Preflight OK: no other source files import the three components.\n")

    # 2. Edits in memory
    text = INIT.read_text(encoding="utf-8")
    removals = []
    for t in TARGETS:
        s, e, block = extract_registration(text, t["symbol"])
        removals.append((s, e, "registration", t["symbol"], block))
        s, e, line = extract_import(text, t["symbol"], t["module"])
        removals.append((s, e, "import", t["symbol"], line))

    removals.sort(key=lambda r: r[0])
    for a, b in zip(removals, removals[1:]):
        if a[1] > b[0]:
            fail("Overlapping removals detected. Stopping.")

    total = 0
    for s, e, kind, sym, chunk in removals:
        n = chunk.count("\n")
        total += n
        first = chunk.strip().splitlines()[0]
        print(f"- {kind:12s} {sym:10s} {n:4d} lines   {first[:80]}")
    print(f"\nTotal lines to remove from src/plasmic-init.ts: {total}")

    new_text = text
    for s, e, *_ in sorted(removals, key=lambda r: r[0], reverse=True):
        new_text = new_text[:s] + new_text[e:]

    for t in TARGETS:
        print(f"- delete file  {t['file'].relative_to(ROOT)}")

    if args.dry_run:
        print("\n[dry-run] Nothing written.")
        return

    INIT.write_text(new_text, encoding="utf-8")
    for t in TARGETS:
        t["file"].unlink()
    print("\n[applied] Done. Now: git status (expect 4 changes), git diff --stat, grep checks.")


if __name__ == "__main__":
    main()
