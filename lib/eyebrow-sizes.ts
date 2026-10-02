/**
 * Eyebrow (small uppercase label above a heading): one shared size scale so
 * ContentSection, CardGrid and any future section look the same.
 *
 * "normal" is the original size. Bigger sizes get a little less letter-spacing
 * (and xl a slightly lighter weight) so large uppercase text does not look
 * stretched. Sizes scale down smoothly on phones.
 */
export type EyebrowSizeChoice = "small" | "normal" | "large" | "xl"

export const EYEBROW_STYLES: Record<
  EyebrowSizeChoice,
  { fontSize: string; fontWeight: number; letterSpacing: string }
> = {
  small: { fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em" },
  normal: { fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.14em" },
  large: { fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 700, letterSpacing: "0.1em" },
  xl: { fontSize: "clamp(1.125rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "0.06em" },
}
