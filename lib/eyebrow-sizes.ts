/**
 * Eyebrow (small uppercase label above a heading): one shared size scale so
 * ContentSection, CardGrid and any future section look the same.
 *
 * "normal" is the original size. Bigger sizes get a little less letter-spacing
 * (and a slightly lighter weight) so large uppercase text does not look
 * stretched. Sizes scale down smoothly on phones.
 *
 * Large and Extra large also get a little extra space under the label on
 * phones (up to 8px, fading to 0 by tablet width), so a big hero label does not
 * sit tight on the heading. Small and Normal keep their original spacing.
 */
export type EyebrowSizeChoice = "small" | "normal" | "large" | "xl"

const PHONE_EXTRA_GAP = "clamp(0px, calc((1024px - 100vw) * 0.02), 8px)"

export const EYEBROW_STYLES: Record<
  EyebrowSizeChoice,
  { fontSize: string; fontWeight: number; letterSpacing: string; marginBottom: string }
> = {
  small: { fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", marginBottom: "0px" },
  normal: { fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.14em", marginBottom: "0px" },
  large: { fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: PHONE_EXTRA_GAP },
  xl: { fontSize: "clamp(1.125rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: PHONE_EXTRA_GAP },
}
