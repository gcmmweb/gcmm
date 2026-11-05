#!/usr/bin/env python3
"""
1. Turns OFF the even two-line splitting (text-wrap: balance) on Content Section
   headings and ## subheadings, so they fill the full width like the body text.
   (Card Grid card titles are left alone.)
2. Adds blue words: put [[double square brackets]] around words and they show
   bold and blue (city names, footnote title). Works in every text box that
   already supports **bold** and *italic*.

Run from the repo root.
  python3 fix_heading_wrap_and_blue.py            (dry run, writes nothing)
  python3 fix_heading_wrap_and_blue.py --apply    (makes the changes)
"""
import sys
from pathlib import Path

APPLY = "--apply" in sys.argv


def find(options):
    for n in options:
        p = Path(n)
        if p.exists():
            return p
    print("ERROR: could not find any of: " + ", ".join(options))
    sys.exit(1)


def once(text, old, new, label):
    n = text.count(old)
    if n != 1:
        print("ERROR: expected 1 match for %s, found %d" % (label, n))
        sys.exit(1)
    return text.replace(old, new)


content = find(["components/ContentSection.tsx", "src/components/ContentSection.tsx"])
inline = find(["lib/inline-format.tsx", "lib/inline-format.ts", "src/lib/inline-format.tsx", "src/lib/inline-format.ts"])
init = find(["plasmic-init.ts", "src/plasmic-init.ts"])

# ---------- 1. ContentSection.tsx : no balanced wrapping on headings ----------
cs = content.read_text(encoding="utf-8")
old = '                textWrap: "balance",\n'
if cs.count('textWrap: "balance",') != 2:
    print("ERROR: expected 2 balance lines in ContentSection, found %d" % cs.count('textWrap: "balance",'))
    sys.exit(1)
cs = cs.replace('              textWrap: "balance",\n', "", 1)
cs = cs.replace('                textWrap: "balance",\n', "", 1)
if 'textWrap: "balance"' in cs:
    print("ERROR: a balance line is still left; stopping")
    sys.exit(1)
new_content = cs

# ---------- 2. inline-format : [[blue words]] ----------
fmt = inline.read_text(encoding="utf-8")
fmt = once(fmt, 'import type { ReactNode } from "react"\n',
           'import { Fragment } from "react"\nimport type { ReactNode } from "react"\n', "import")
fmt = once(fmt, " *   ***both***      -> bold and italic\n",
           " *   ***both***      -> bold and italic\n *   [[words]]       -> bold and blue (city names, footnote titles)\n", "header")
fmt = once(fmt, "export function formatInline(text: string): ReactNode {",
           "function formatStars(text: string): ReactNode {", "rename")
extra = '''
// Blue used for [[words]]. Change this one color to change it everywhere.
const HIGHLIGHT_COLOR = "#1E4DB7"
const HIGHLIGHT = /\\[\\[([\\s\\S]+?)\\]\\]/g

// [[words]] become bold + blue. Everything around them still uses **bold** / *italic*.
// The text is split at the [[ ]] first, so a lone * inside (like "Omsk*") stays as typed.
export function formatInline(text: string): ReactNode {
  if (!text || text.indexOf("[[") === -1) return formatStars(text)

  const out: ReactNode[] = []
  const re = new RegExp(HIGHLIGHT.source, "g")
  let last = 0
  let key = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(<Fragment key={key++}>{formatStars(text.slice(last, m.index))}</Fragment>)
    }
    out.push(
      <strong key={key++} style={{ fontWeight: BOLD_WEIGHT, color: HIGHLIGHT_COLOR }}>
        {formatStars(m[1])}
      </strong>
    )
    last = m.index + m[0].length
  }

  if (last === 0) return formatStars(text)
  if (last < text.length) {
    out.push(<Fragment key={key++}>{formatStars(text.slice(last))}</Fragment>)
  }
  return out
}

'''
fmt = once(fmt, "export default formatInline", extra.lstrip("\n") + "export default formatInline", "export")
new_inline = fmt

# ---------- 3. plasmic-init.ts : help text (the (i) icon) ----------
pi = init.read_text(encoding="utf-8")
pi = once(pi, "Long bullets wrap neatly under the text.",
          "Long bullets wrap neatly under the text. Blue bold words: put [[double square brackets]] around them (example: [[Omsk*]]).",
          "Content Section body help")
pi = once(pi, "A line starting with ## becomes a subheading.\",",
          "A line starting with ## becomes a subheading. Blue bold words: put [[double square brackets]] around them (example: [[Omsk*]]).\",",
          "Photo Carousel body help")
new_init = pi

print("ContentSection.tsx : heading and ## subheading no longer balance-wrap")
print("inline-format      : [[words]] shows bold and blue (#1E4DB7)")
print("plasmic-init.ts    : help text updated for Content Section and Photo Carousel body")
if APPLY:
    content.write_text(new_content, encoding="utf-8")
    inline.write_text(new_inline, encoding="utf-8")
    init.write_text(new_init, encoding="utf-8")
    print("DONE. Now run: git diff")
else:
    print("DRY RUN only. Nothing written. Add --apply to make the changes.")
