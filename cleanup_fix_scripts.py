#!/usr/bin/env python3
"""Remove the one-off fix_*.py scripts from the repo (Sep 2026).

These were diagnostic/one-time tools, not application code. They never
ran automatically and had no effect on the live site -- this just tidies
the project root. Git history keeps them recoverable forever if ever
needed.
"""
import pathlib

FILES = [
    "fix_do_now.py",
    "fix_nav_prefetch.py",
    "fix_dead_components.py",
    "fix_nav_link.py",
]

for name in FILES:
    p = pathlib.Path(name)
    if p.exists():
        p.unlink()
        print(f"Deleted {name}")
    else:
        print(f"Skipped {name} (not found here)")
