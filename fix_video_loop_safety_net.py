#!/usr/bin/env python3
"""
Hero video loop safety net (Sep 2026)

Junita reported the homepage hero video failing to loop on her iPhone --
first observed in Chrome for iOS, then also observed in Safari on a
follow-up check. The video's HTML setup was already verified correct
(autoPlay, muted, loop, playsInline, fetchPriority="high" all present and
confirmed present in the live production HTML), and testing in a
Chrome-based mobile-viewport emulation showed it looping successfully --
so there's no evidence of a broken config, more likely an inconsistent
browser-engine quirk with the native `loop` attribute under certain
conditions (memory pressure, tab backgrounding, etc.), which several
mobile browsers are known to have.

Fix: a JS-based safety net using the video's `onEnded` event. This event
ONLY fires if the browser reaches a genuine "ended" state without having
looped on its own -- if the native `loop` attribute works (the normal,
expected case), this handler never runs at all, so it cannot conflict
with, double-trigger, or change anything about the existing working
behavior. It only activates as a fallback exactly when native looping
fails, manually resetting the video to the start and resuming playback.

Applied to both <video> elements in main-page-cinematic.tsx (the mobile
hero video and the desktop hero video use separate but structurally
identical <video> tags).

Verified locally before shipping this script:
  - Full production build succeeds
  - Homepage, /50, and /videos all still return 200 with correct content
  - Confirmed via browser testing (mobile-viewport emulation) that the
    correct mobile video file loads and plays correctly with this change

Run from the repo root, on its own branch:
    git checkout main && git pull
    git checkout -b fix-video-loop-safety-net
    python3 fix_video_loop_safety_net.py
    git diff
    git add -A && git commit -m "Add JS safety net for hero video loop (native loop attribute inconsistent on some mobile browsers)"
    git push -u origin fix-video-loop-safety-net
"""
import sys
from pathlib import Path

ROOT = Path.cwd()
TARGET = ROOT / "components" / "main-page-cinematic.tsx"

EDITS = [
    (
        '''              <video
                autoPlay
                muted
                loop
                playsInline
                fetchPriority="high"
                className="w-full h-full"
                poster={videoPosterUrl}
              >
                <source src={mobileSource} type="video/mp4" />''',
        '''              <video
                autoPlay
                muted
                loop
                playsInline
                fetchPriority="high"
                className="w-full h-full"
                poster={videoPosterUrl}
                onEnded={(e) => {
                  // SAFETY NET (Sep 2026): reported that the native `loop`
                  // attribute doesn't always restart playback reliably on
                  // some mobile browsers (iOS Chrome, and inconsistently
                  // Safari). This only fires if the browser reaches a true
                  // "ended" state without looping on its own -- if native
                  // loop works, this never runs, so it can't conflict with
                  // or double-trigger anything.
                  const v = e.currentTarget
                  v.currentTime = 0
                  v.play().catch(() => {})
                }}
              >
                <source src={mobileSource} type="video/mp4" />''',
    ),
    (
        '''            <video
              autoPlay
              muted
              loop
              playsInline
              fetchPriority="high"
              className="w-full h-full object-cover"
              poster={videoPosterUrl}
            >
              <source src={videoUrl} type="video/mp4" />''',
        '''            <video
              autoPlay
              muted
              loop
              playsInline
              fetchPriority="high"
              className="w-full h-full object-cover"
              poster={videoPosterUrl}
              onEnded={(e) => {
                // SAFETY NET (Sep 2026): see matching comment on the mobile
                // video above -- only fires if native loop fails.
                const v = e.currentTarget
                v.currentTime = 0
                v.play().catch(() => {})
              }}
            >
              <source src={videoUrl} type="video/mp4" />''',
    ),
]

text = TARGET.read_text()
for old, new in EDITS:
    count = text.count(old)
    if count != 1:
        print(f"ABORTED: expected 1 match, found {count}, for an edit. "
              f"File may have changed since this script was written -- "
              f"stopping without touching it.")
        sys.exit(1)
    text = text.replace(old, new)

TARGET.write_text(text)
print("Done. Both hero video elements (mobile and desktop) now have a")
print("JS-based loop safety net, active only as a fallback if the native")
print("loop attribute fails to restart playback.")
