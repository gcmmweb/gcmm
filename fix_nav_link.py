#!/usr/bin/env python3
"""Fix the broken /newsletter-signup nav link -> /newsletters (Sep 2026)"""
import pathlib

p = pathlib.Path("components/navigation-header.tsx")
text = p.read_text()
old = '{ label: "Newsletter sign-up", url: "/newsletter-signup" }'
new = '{ label: "Newsletter sign-up", url: "/newsletters" }'
count = text.count(old)
assert count == 1, f"expected 1 match, found {count}"
p.write_text(text.replace(old, new))
print("Fixed: nav link now points to /newsletters")
