// lib/track-event.ts
//
// Sends one event to Google Analytics 4. Safe to call at any time:
//  - if Google's tag has already loaded, it is used directly;
//  - if not yet (the tag loads late on purpose), the event is queued and Google
//    sends it as soon as the tag arrives (so early clicks are not lost);
//  - any problem is swallowed: analytics must never be able to break a page.

type Params = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, params: Params = {}): void {
  try {
    if (typeof window === "undefined") return
    const w = window as unknown as {
      dataLayer?: unknown[]
      gtag?: (...args: unknown[]) => void
    }
    const clean: Record<string, string | number | boolean> = {}
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === "") continue
      clean[key] = typeof value === "string" ? value.slice(0, 100) : value
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", name, clean)
      return
    }
    w.dataLayer = w.dataLayer || []
    // Google's tag only understands "arguments" objects in the queue, not arrays.
    const queue = w.dataLayer
    ;(function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      queue.push(arguments)
    })("event", name, clean)
  } catch {
    /* never break the page */
  }
}
