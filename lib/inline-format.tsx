import { Fragment } from "react"
import type { ReactNode } from "react"

/**
 * Lets editors format words inside any text box with simple markers:
 *
 *   **bold**        -> bold
 *   *italic*        -> italic
 *   ***both***      -> bold and italic
 *   [[words]]       -> bold and blue (city names, footnote titles)
 *
 * - Uses real <strong> / <em> tags, so screen readers and Google understand them.
 * - Never renders raw HTML, so nothing typed in a box can break or inject into the page.
 * - A marker must touch the word it formats: "5 * 3 * 2" and a lone "*" stay as typed.
 * - Pure text in, plain React out. No library, no scripts.
 */

// Weight used for **bold**. Change this one number to make bold lighter/heavier.
const BOLD_WEIGHT = 700

const PATTERN =
  /\*\*\*(?=\S)([\s\S]*?\S)\*\*\*|\*\*(?=\S)([\s\S]*?\S)\*\*|\*(?![*\s])([\s\S]*?[^\s*])\*(?!\*)/g

function formatStars(text: string): ReactNode {
  if (!text || text.indexOf("*") === -1) return text

  const out: ReactNode[] = []
  const re = new RegExp(PATTERN.source, "g")
  let last = 0
  let key = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(text)) !== null) {
    if (m[0].length === 0) {
      re.lastIndex++
      continue
    }
    if (m.index > last) out.push(text.slice(last, m.index))

    if (m[1] !== undefined) {
      out.push(
        <strong key={key++} style={{ fontWeight: BOLD_WEIGHT }}>
          <em>{m[1]}</em>
        </strong>
      )
    } else if (m[2] !== undefined) {
      out.push(
        <strong key={key++} style={{ fontWeight: BOLD_WEIGHT }}>
          {m[2]}
        </strong>
      )
    } else {
      out.push(<em key={key++}>{m[3]}</em>)
    }
    last = m.index + m[0].length
  }

  if (last === 0) return text
  if (last < text.length) out.push(text.slice(last))
  return out
}

// Blue used for [[words]]. Change this one color to change it everywhere.
const HIGHLIGHT_COLOR = "#1E4DB7"
const HIGHLIGHT = /\[\[([\s\S]+?)\]\]/g

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

export default formatInline
