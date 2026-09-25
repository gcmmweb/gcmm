#!/usr/bin/env python3
"""
Remove 3 confirmed-dead components (Sep 2026)

NewsletterHub, ModernNewsSection, and NewsletterSignup were confirmed dead:
only ever appeared on Winston's abandoned "testpage2" test page, not linked
anywhere on the live site, absent from the sitemap. Junita confirmed 100%
removal on Sep 24, 2026, after double-checking testpage2 herself.

Why this matters for the TV launch: every one of Plasmic's ~47 registered
components gets bundled into EVERY page's JavaScript, whether that page
uses it or not (confirmed via real bundle analysis on gcmm.ca/50 -- these
three showed up in the /50 bundle despite /50 never using them). Removing
dead registrations is a zero-risk way to shave a little off that shared
bundle for every page on the site.

This script:
  1. Removes the `import` line for each component from src/plasmic-init.ts
  2. Removes each component's full `PLASMIC.registerComponent(...)` block
  3. Deletes the now-unused source files entirely (git history keeps them
     recoverable forever -- `git log --all --full-history -- <path>` finds
     the commit, `git checkout <commit>~1 -- <path>` restores it, if ever
     needed)

Note: this does NOT remove the components from the Plasmic Studio project
itself (that's a Studio-side action, separate from this code) and does NOT
touch the two old Plasmic pages (Archive/signup, Archive/newsletterpage-old)
-- both are Junita's to handle directly in Studio.

Run from the repo root, on its own branch:
    git checkout main && git pull
    git checkout -b remove-dead-components
    python3 fix_dead_components.py
    git diff
    git add -A && git commit -m "Remove 3 confirmed-dead components (NewsletterHub, ModernNewsSection, NewsletterSignup)"
    git push -u origin remove-dead-components
"""
import sys
from pathlib import Path

ROOT = Path.cwd()
PLASMIC_INIT = ROOT / "src" / "plasmic-init.ts"

# Files to delete entirely once unregistered.
FILES_TO_DELETE = [
    "components/newsletterhub.tsx",
    "components/NewsArticles.tsx",
    "components/newsletter-signup.tsx",
]

# Exact import lines to remove.
IMPORT_LINES = [
    "import { ModernNewsSection } from '@/components/NewsArticles';",
    'import { NewsletterSignup } from "@/components/newsletter-signup"',
    "import { NewsletterHub} from \"@/components/newsletterhub\"",
]

# (component name, marker used to find its registerComponent block)
COMPONENTS = ["NewsletterHub", "NewsletterSignup", "ModernNewsSection"]


def find_register_block_range(lines, component_name):
    """Return (start_idx, end_idx) 0-indexed, inclusive, for this
    component's full PLASMIC.registerComponent(...) block, bounded by
    the next registerComponent(...) call in the file (or EOF)."""
    start = None
    for i, line in enumerate(lines):
        if line.startswith(f"PLASMIC.registerComponent({component_name},"):
            start = i
            break
    if start is None:
        print(f"  ABORTED: could not find registerComponent block for "
              f"{component_name}. File may have changed since this script "
              f"was written -- stopping without touching it.")
        sys.exit(1)

    end = len(lines)
    for j in range(start + 1, len(lines)):
        if lines[j].startswith("PLASMIC.registerComponent("):
            end = j  # exclusive
            break

    # Walk back from `end` to the block's own closing "});" so we don't
    # eat the blank line(s) before the next block -- keeps spacing tidy.
    k = end - 1
    while k > start and lines[k].strip() == "":
        k -= 1
    return start, k  # inclusive


print("Removing dead component registrations from src/plasmic-init.ts...")
text = PLASMIC_INIT.read_text()
lines = text.split("\n")

# 1. Find all three block ranges BEFORE deleting anything, so line
#    numbers don't shift out from under us.
ranges = []
for name in COMPONENTS:
    start, end = find_register_block_range(lines, name)
    ranges.append((start, end))
    print(f"  Found {name}: lines {start + 1}-{end + 1}")

# 2. Build the set of line indices to drop: the three blocks + the three
#    import lines (matched by exact content, wherever they are).
drop = set()
for start, end in ranges:
    drop.update(range(start, end + 1))

import_hits = 0
for i, line in enumerate(lines):
    if line in IMPORT_LINES:
        drop.add(i)
        import_hits += 1

if import_hits != len(IMPORT_LINES):
    print(f"  ABORTED: expected to find {len(IMPORT_LINES)} import lines, "
          f"found {import_hits}. Stopping without touching the file.")
    sys.exit(1)

new_lines = [line for i, line in enumerate(lines) if i not in drop]
PLASMIC_INIT.write_text("\n".join(new_lines))
print(f"  OK -- removed {len(drop)} lines total "
      f"(3 imports + 3 registerComponent blocks)")

print()
print("Deleting the now-unused source files...")
for rel_path in FILES_TO_DELETE:
    p = ROOT / rel_path
    if p.exists():
        p.unlink()
        print(f"  Deleted {rel_path}")
    else:
        print(f"  Skipped {rel_path} (already gone)")

print()
print("Done. Recoverable any time via git history if ever needed:")
print("  git log --all --full-history -- components/newsletterhub.tsx")
