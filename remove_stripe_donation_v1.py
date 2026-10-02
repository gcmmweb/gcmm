#!/usr/bin/env python3
"""
Removal script: Stripe Donation Page v1 (dead code) + app/api/stripe-donate route.

Scope (confirmed before running):
  - components/stripe-donation-page.tsx  (v1, 1,162 lines, registered as
    `StripeDonationPage` in plasmic-init.ts, only caller of /api/stripe-donate)
  - Its plasmic-init.ts registration + import line
  - app/api/stripe-donate/route.ts (706 lines) -- only v1 calls this route

DOES NOT TOUCH (verify these are untouched after running, before committing):
  - components/stripe-donation-page-v2.tsx (or whatever the actual v2 filename is)
  - Any `StripeDonationPageV2` import in app/[[...catchall]]/page.tsx
  - app/api/stripe-donate-v2/route.ts

Verification already done (per Junita, 2026-10-01):
  - Find All References in Plasmic Studio: only the `TEST` scratch page referenced
    StripeDonationPage (v1). No live page references it.
  - Manually confirmed in Plasmic Studio: component is not placed on any page.

Usage:
    cd /path/to/gcmm   # your local clone, on a fresh branch
    python3 remove_stripe_donation_v1.py --dry-run     # preview only, writes nothing
    python3 remove_stripe_donation_v1.py                # applies changes

After running:
    git diff            # review every change by hand before committing
    git status           # confirm only the expected files changed/deleted
"""

import argparse
import re
import sys
from pathlib import Path

REPO_ROOT = Path(".").resolve()

# --- Targets -----------------------------------------------------------------

V1_COMPONENT = REPO_ROOT / "components" / "stripe-donation-page.tsx"
V1_ROUTE = REPO_ROOT / "app" / "api" / "stripe-donate" / "route.ts"
PLASMIC_INIT = REPO_ROOT / "src" / "plasmic-init.ts"
PLASMIC_INIT_SERVER = REPO_ROOT / "src" / "plasmic-init-server.ts"

# Guardrails: these must NOT match anything we delete or edit.
FORBIDDEN_SUBSTRINGS = [
    "stripe-donation-page-v2",
    "StripeDonationPageV2",
    "stripe-donate-v2",
]


def fail(msg: str) -> None:
    print(f"\n[ABORT] {msg}\n", file=sys.stderr)
    sys.exit(1)


def check_file_exists(path: Path, label: str) -> None:
    if not path.exists():
        fail(f"{label} not found at expected path: {path}\n"
             f"Repo structure may differ from what's assumed here -- "
             f"update the path at the top of this script and re-run.")


def check_no_forbidden_overlap(path: Path) -> None:
    """Make sure a file we're about to touch doesn't ALSO reference v2 in a
    way that would mean deleting it breaks something else."""
    text = path.read_text(encoding="utf-8", errors="ignore")
    for needle in FORBIDDEN_SUBSTRINGS:
        if needle in text:
            fail(
                f"{path} contains '{needle}'. This script assumes a clean "
                f"separation between v1 and v2 -- stopping before touching "
                f"this file. Inspect manually."
            )


def remove_plasmic_registration(dry_run: bool) -> None:
    """Remove the import line and PLASMIC.registerComponent(...) block for
    the v1 component from plasmic-init.ts, leaving everything else (incl.
    v2's registration, if present in the same file) untouched."""
    check_file_exists(PLASMIC_INIT, "plasmic-init.ts")
    text = PLASMIC_INIT.read_text(encoding="utf-8")

    # NOTE: we deliberately do NOT scan the whole file for v2 references --
    # plasmic-init.ts legitimately contains a separate StripeDonationPageV2
    # import + registration elsewhere, and that's expected to stay. The
    # guardrails below instead check only the specific lines/blocks this
    # script is about to remove, so a healthy file with both v1 and v2
    # present doesn't trigger a false abort.

    # 1. Find the import line for the v1 component.
    #    Expect something like:
    #    import { StripeDonationPage } from "./components/stripe-donation-page";
    import_pattern = re.compile(
        r'^.*import\s*\{\s*StripeDonationPage\s*\}.*from\s*["\']'
        r'.*stripe-donation-page["\'];?\s*$',
        re.MULTILINE,
    )
    import_matches = import_pattern.findall(text)

    if len(import_matches) == 0:
        fail(
            "Could not find the expected import line for `StripeDonationPage` "
            "pointing at the v1 file path in plasmic-init.ts. The import may "
            "be aliased, multi-line, or formatted differently than assumed. "
            "Stopping -- edit this file by hand instead of trusting this script."
        )
    if len(import_matches) > 1:
        fail(
            "Found more than one matching import line for StripeDonationPage "
            "in plasmic-init.ts. Refusing to guess which one is v1 -- "
            "review manually."
        )

    import_line = import_matches[0]
    # Double-check it's really the v1 path, not v2 under a different alias.
    if "v2" in import_line.lower():
        fail("Matched import line looks like it references v2. Stopping.")

    # 2. Find the registerComponent(...) call block that registers this
    #    exact component under the name "StripeDonationPage".
    #    This is intentionally conservative: it looks for the call starting
    #    with PLASMIC.registerComponent(StripeDonationPage, { ... }) and
    #    captures up to the matching closing `});` at column 0 or with
    #    minimal indentation -- if the structure doesn't match, it aborts
    #    rather than guessing where the block ends.
    register_start_pattern = re.compile(
        r'PLASMIC\.registerComponent\(\s*StripeDonationPage\s*,\s*\{'
    )
    start_match = register_start_pattern.search(text)
    if not start_match:
        fail(
            "Could not find `PLASMIC.registerComponent(StripeDonationPage, {` "
            "in plasmic-init.ts. Registration may be structured differently "
            "than assumed -- remove this block by hand instead."
        )

    # Brace-match forward from the opening `{` to find the end of this call.
    start_idx = start_match.end() - 1  # index of the opening brace
    depth = 0
    end_idx = None
    for i in range(start_idx, len(text)):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                end_idx = i
                break
    if end_idx is None:
        fail("Brace matching failed while scanning the registerComponent block. Stopping.")

    # Extend to consume a trailing `);` and newline, if present.
    tail = text[end_idx + 1:end_idx + 4]
    consumed = 1
    if tail.startswith(")"):
        consumed += 1
        if tail[1:2] == ";":
            consumed += 1
    block_end = end_idx + consumed
    # Also eat one trailing newline so we don't leave a blank line behind.
    if block_end < len(text) and text[block_end] == "\n":
        block_end += 1

    register_block = text[start_match.start():block_end]

    # Guardrail scoped to just this block: make sure brace-matching didn't
    # accidentally swallow a neighboring v2-related line.
    for needle in FORBIDDEN_SUBSTRINGS:
        if needle in register_block:
            fail(
                f"The extracted registerComponent block unexpectedly "
                f"contains '{needle}'. Brace-matching may have run too far "
                f"and swallowed unrelated code. Stopping -- remove this "
                f"block by hand instead."
            )

    print("--- plasmic-init.ts: import line to remove ---")
    print(import_line)
    print("\n--- plasmic-init.ts: registerComponent block to remove ---")
    print(register_block)

    if dry_run:
        print("\n[dry-run] Not writing changes to plasmic-init.ts.")
        return

    new_text = text.replace(import_line, "").replace(register_block, "")
    PLASMIC_INIT.write_text(new_text, encoding="utf-8")
    print(f"\n[applied] Updated {PLASMIC_INIT}")


def delete_file(path: Path, label: str, dry_run: bool) -> None:
    check_file_exists(path, label)
    check_no_forbidden_overlap(path)
    print(f"\n--- {label}: marked for deletion ---\n{path}")
    if dry_run:
        print("[dry-run] Not deleting.")
        return
    path.unlink()
    print(f"[applied] Deleted {path}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Show what would change without writing or deleting anything."
    )
    args = parser.parse_args()

    print("=" * 70)
    print("Stripe Donation Page v1 removal script")
    print("Mode:", "DRY RUN (no changes written)" if args.dry_run else "APPLYING CHANGES")
    print("=" * 70)

    # Safety: confirm we're being run from inside the actual repo, not
    # somewhere random -- plasmic-init.ts should exist at repo root.
    if not PLASMIC_INIT.exists():
        fail(
            "src/plasmic-init.ts not found. Run this "
            "script from the root of your local gcmm repo clone, on a "
            "dedicated branch."
        )

    # Preflight: the server init file must not reference v1 either.
    if PLASMIC_INIT_SERVER.exists():
        server_text = PLASMIC_INIT_SERVER.read_text(encoding="utf-8")
        if re.search(r"stripe-donation-page[\"']|StripeDonationPage\\b(?!V2)", server_text):
            fail("src/plasmic-init-server.ts references the v1 component. "
                 "Review it by hand before deleting anything.")
        print("Preflight OK: src/plasmic-init-server.ts has no v1 references.")

    remove_plasmic_registration(args.dry_run)
    delete_file(V1_COMPONENT, "components/stripe-donation-page.tsx (v1)", args.dry_run)
    delete_file(V1_ROUTE, "app/api/stripe-donate/route.ts", args.dry_run)

    print("\n" + "=" * 70)
    if args.dry_run:
        print("Dry run complete. Re-run without --dry-run to apply.")
    else:
        print("Done. Now run:")
        print("  git status   # confirm only the 3 expected changes")
        print("  git diff     # review plasmic-init.ts edit line by line")
        print("Then commit, push, and open a Vercel preview.")
        print("Before merging, confirm on the preview that:")
        print("  - /donate still renders correctly (it uses v2, untouched)")
        print("  - no build errors referencing StripeDonationPage")
    print("=" * 70)


if __name__ == "__main__":
    main()
