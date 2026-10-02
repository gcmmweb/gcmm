#!/usr/bin/env python3
"""
remove_dead_components_batch2.py

Removes 4 confirmed-dead Plasmic code components from the gcmm repo:
  - JoinOurMissionCTA      (components/join-our-mission-cta.tsx)
  - MinistryFeatures       (components/ministry-features.tsx)
  - StayConnected          (components/StayConnected.tsx)
  - TestimonialsSection    (components/testimonials-section.tsx)

For each component this script:
  1. Scans the whole repo (excluding node_modules/.git/.next) for ANY file
     other than src/plasmic-init.ts and the component's own file that
     references it (by import path or by identifier/registered name).
     If ANY such reference is found, the script aborts WITHOUT making any
     changes, for ANY component (fail-safe, all-or-nothing).
  2. Removes the import line(s) for the component from src/plasmic-init.ts.
  3. Removes the PLASMIC.registerComponent(...) call for the component from
     src/plasmic-init.ts (brace/paren-balanced removal, not a naive regex).
  4. Deletes the component's .tsx file.

It does NOT touch git (no branch/commit/push) — run it, then review with
`git diff`, branch, commit and push yourself, same as batch1.

Explicitly protected — the script will refuse to run if asked to touch any
of these (hard-coded guard, not just "don't ask for them"):
  TestimonialSlider, TestimonialQuote, TestimonialCard, MinistriesSection,
  Newsletter Signup Form

Usage:
    python3 remove_dead_components_batch2.py            # dry run (default)
    python3 remove_dead_components_batch2.py --apply    # actually writes changes

Run from the repo root (same directory as src/, components/, package.json).
"""

import argparse
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent
PLASMIC_INIT = REPO_ROOT / "src" / "plasmic-init.ts"

SEARCH_DIRS = ["src", "components", "app", "pages"]
EXCLUDE_DIR_NAMES = {"node_modules", ".git", ".next", "dist", "build", ".vercel"}
SEARCHABLE_EXTS = {".ts", ".tsx", ".js", ".jsx"}

COMPONENTS = [
    {"name": "JoinOurMissionCTA", "file": "components/join-our-mission-cta.tsx"},
    {"name": "MinistryFeatures", "file": "components/ministry-features.tsx"},
    {"name": "StayConnected", "file": "components/StayConnected.tsx"},
    {"name": "TestimonialsSection", "file": "components/testimonials-section.tsx"},
]

PROTECTED_NAMES = {
    "TestimonialSlider",
    "TestimonialQuote",
    "TestimonialCard",
    "MinistriesSection",
    "Newsletter Signup Form",
}

ALLOWED_REFERENCE_FILES = {"src/plasmic-init.ts"}  # plus the component's own file, added per-component


def die(msg):
    print(f"\nABORTED — no changes written.\n{msg}\n")
    sys.exit(1)


def guard_protected_components():
    names_being_removed = {c["name"] for c in COMPONENTS}
    clash = names_being_removed & PROTECTED_NAMES
    if clash:
        die(f"Refusing to run: {clash} is in the protected list and must never be removed by this script.")


def iter_candidate_files():
    for d in SEARCH_DIRS:
        base = REPO_ROOT / d
        if not base.exists():
            continue
        for root, dirs, files in os.walk(base):
            dirs[:] = [x for x in dirs if x not in EXCLUDE_DIR_NAMES]
            for f in files:
                p = Path(root) / f
                if p.suffix in SEARCHABLE_EXTS:
                    yield p


def rel(p: Path) -> str:
    return str(p.relative_to(REPO_ROOT)).replace(os.sep, "/")


def find_external_references(component):
    """
    Returns a list of (file, line_no, line_text) for any file (other than
    plasmic-init.ts and the component's own file) that imports the component
    by path or references its name/import identifier.
    """
    comp_name = component["name"]
    comp_file = component["file"]
    comp_file_abs = (REPO_ROOT / comp_file).resolve()

    # Match the file by its path stem regardless of alias/extension,
    # e.g. "./join-our-mission-cta" or "components/StayConnected"
    file_stem = Path(comp_file).stem  # e.g. "join-our-mission-cta" / "StayConnected"
    path_pattern = re.compile(re.escape(file_stem) + r"(['\"])", re.IGNORECASE)
    name_pattern = re.compile(r"\b" + re.escape(comp_name) + r"\b")

    allowed = {str((REPO_ROOT / f).resolve()) for f in ALLOWED_REFERENCE_FILES}
    allowed.add(str(comp_file_abs))

    hits = []
    for f in iter_candidate_files():
        f_abs = str(f.resolve())
        if f_abs in allowed:
            continue
        try:
            text = f.read_text(encoding="utf-8")
        except Exception:
            continue
        for i, line in enumerate(text.splitlines(), start=1):
            if path_pattern.search(line) or name_pattern.search(line):
                hits.append((rel(f), i, line.strip()))
    return hits


def check_all_components_clean():
    any_hits = False
    for c in COMPONENTS:
        hits = find_external_references(c)
        if hits:
            any_hits = True
            print(f"\n--- External references found for {c['name']} ({c['file']}) ---")
            for fname, lineno, text in hits:
                print(f"  {fname}:{lineno}: {text}")
    if any_hits:
        die("One or more components still have references outside plasmic-init.ts and "
            "their own file. Nothing was changed. Re-run Find All References in Studio "
            "and this scan before retrying.")


def remove_balanced_call(content, call_start_regex):
    """
    Finds a statement starting with call_start_regex (e.g. 'PLASMIC.registerComponent(Foo')
    and removes the whole statement through its balanced closing ');', including a
    single trailing blank line if present. Returns (new_content, found: bool).
    """
    m = call_start_regex.search(content)
    if not m:
        return content, False

    start = m.start()
    # find the opening '(' that begins the call args (first '(' at/after match end - but
    # call_start_regex already includes up to and including the identifier + '(')
    open_paren_idx = content.index("(", m.start())
    depth = 0
    i = open_paren_idx
    while i < len(content):
        ch = content[i]
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
            if depth == 0:
                break
        i += 1
    else:
        return content, False  # unbalanced, bail out safely

    # consume trailing ';' and newline(s)
    end = i + 1
    if end < len(content) and content[end] == ";":
        end += 1
    # eat one trailing newline (and a following blank line, to avoid double gaps)
    while end < len(content) and content[end] == "\n":
        end += 1
        break

    new_content = content[:start] + content[end:]
    return new_content, True


def remove_import_lines(content, component):
    comp_name = component["name"]
    file_stem = Path(component["file"]).stem
    lines = content.splitlines(keepends=True)
    kept = []
    removed_any = False
    for line in lines:
        is_import = line.strip().startswith("import ")
        mentions_name = re.search(r"\b" + re.escape(comp_name) + r"\b", line)
        mentions_path = re.search(re.escape(file_stem) + r"['\"]", line, re.IGNORECASE)
        if is_import and (mentions_name or mentions_path):
            removed_any = True
            continue
        kept.append(line)
    return "".join(kept), removed_any


def process_plasmic_init(apply: bool):
    if not PLASMIC_INIT.exists():
        die(f"Could not find {rel(PLASMIC_INIT)}")

    content = PLASMIC_INIT.read_text(encoding="utf-8")
    original = content

    for c in COMPONENTS:
        content, import_removed = remove_import_lines(content, c)
        if not import_removed:
            die(f"Could not find an import line for {c['name']} in {rel(PLASMIC_INIT)}. "
                f"Refusing to guess — check the file manually.")

        call_regex = re.compile(r"PLASMIC\.registerComponent\(\s*" + re.escape(c["name"]) + r"\s*,")
        content, call_removed = remove_balanced_call(content, call_regex)
        if not call_removed:
            die(f"Could not find/parse PLASMIC.registerComponent({c['name']}, ...) in "
                f"{rel(PLASMIC_INIT)}. Refusing to guess — check the file manually.")

    if apply:
        PLASMIC_INIT.write_text(content, encoding="utf-8")
    else:
        print(f"\n[dry run] Would rewrite {rel(PLASMIC_INIT)}:")
        print(f"  original length: {len(original)} chars -> new length: {len(content)} chars")
        print(f"  (removed {len(COMPONENTS)} imports + {len(COMPONENTS)} registerComponent calls)")


def delete_component_files(apply: bool):
    for c in COMPONENTS:
        p = REPO_ROOT / c["file"]
        if not p.exists():
            die(f"Expected component file not found: {c['file']}")
        if apply:
            p.unlink()
            print(f"  deleted {c['file']}")
        else:
            print(f"  [dry run] would delete {c['file']}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true",
                         help="Actually write changes. Without this flag, runs as a dry run.")
    args = parser.parse_args()

    print("GCMM dead-component removal — batch 2")
    print("Components: " + ", ".join(c["name"] for c in COMPONENTS))

    guard_protected_components()

    print("\nScanning repo for external references (this aborts everything if any are found)...")
    check_all_components_clean()
    print("No external references found. Safe to proceed.")

    print(f"\n{'Applying' if args.apply else '[Dry run] Simulating'} changes to {rel(PLASMIC_INIT)}:")
    process_plasmic_init(args.apply)

    print(f"\n{'Deleting' if args.apply else '[Dry run] Simulating deletion of'} component files:")
    delete_component_files(args.apply)

    if args.apply:
        print("\nDone. Now run:")
        print("  git checkout -b cleanup/remove-dead-components-batch2")
        print("  git add -A")
        print("  git commit -m 'Remove dead components: JoinOurMissionCTA, MinistryFeatures, StayConnected, TestimonialsSection'")
        print("  git push -u origin cleanup/remove-dead-components-batch2")
        print("Then open the Vercel preview and confirm /50, /history, homepage, and a few article")
        print("pages still render correctly before anything else. Do NOT merge until after Oct 10.")
    else:
        print("\nThis was a dry run — nothing was written. Re-run with --apply to make the changes,")
        print("then `git diff` to review before branching/committing.")


if __name__ == "__main__":
    main()
