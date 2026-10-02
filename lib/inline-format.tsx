import type { ReactNode } from "react"

/**
 * Lets editors format words inside any text box with simple markers:
 *
 *   **bold**        -> bold
 *   *italic*        -> italic
 *   ***both***      -> bold and italic
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

export function formatInline(text: string): ReactNode {
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

export default formatInline
