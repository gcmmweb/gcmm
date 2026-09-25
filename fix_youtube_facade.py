#!/usr/bin/env python3
"""
YouTube click-to-load facade (Sep 2026) -- priority item #2 from the
morning performance reports

Both DebugBear and PageSpeed reports confirmed real cost from the
embedded YouTube video on /50 (the "Mega City Media Campaigns" section):
up to ~1.7MB transferred and ~650ms-1s of main-thread CPU time -- loading
immediately on every page visit, whether anyone watches it or not.

Root cause: components/video-ministries-section.tsx embedded a real
<iframe src="youtube.com/embed/...easy=0&rel=0"> directly in the initial
render. Even with autoplay=0, creating a YouTube iframe loads a real
chunk of YouTube's own player infrastructure right away.

Fix: standard "click-to-load" facade pattern. Show a lightweight static
thumbnail (YouTube's own public thumbnail image, ~10-20KB) with a play
button overlay. Only create the real iframe -- with autoplay=1, so
clicking still feels instant -- once the visitor actually clicks it.

Verified locally before shipping this script:
  - Full production build succeeds
  - /50's initial HTML: 1 iframe -> 0 iframes (confirmed via curl on both
    the local build and current production, which also has exactly 1
    iframe, same video ID -- so this precisely targets the real thing)
  - The facade thumbnail (i.ytimg.com) renders correctly in its place
  - 8 pages checked (including /50 and several /impact/* and other pages
    that use this shared component) all still return 200 with correct
    content

Scope note: this only changes the YouTube case. Vimeo and direct-video
(<video>) rendering in this same component are untouched -- lower
priority since the reports specifically measured YouTube cost, and
keeping the change scoped and verifiable matters more than doing
everything at once.

Run from the repo root, on its own branch:
    git checkout main && git pull
    git checkout -b fix-youtube-facade
    python3 fix_youtube_facade.py
    git diff
    git add -A && git commit -m "Add click-to-load facade for YouTube embed (was eager-loading ~1.7MB on every visit)"
    git push -u origin fix-youtube-facade
"""
import sys
from pathlib import Path

ROOT = Path.cwd()
TARGET = ROOT / "components" / "video-ministries-section.tsx"

EDITS = [
    (
        'import React from "react"\nimport Link from "next/link"\nimport { Play } from "lucide-react"',
        'import React, { useState } from "react"\nimport Link from "next/link"\nimport { Play } from "lucide-react"',
    ),
    (
        "  const youTubeId = getYouTubeVideoId(videoUrl)",
        '''  const youTubeId = getYouTubeVideoId(videoUrl)
  // FACADE (Sep 2026): don't load the ~1.7MB YouTube player iframe until
  // someone actually clicks play -- confirmed via DebugBear/PageSpeed that
  // the eager iframe (even with autoplay=0) was costing real transfer size
  // and main-thread CPU time on every page load, whether anyone watched
  // the video or not.
  const [isPlaying, setIsPlaying] = useState(false)''',
    ),
    (
        '''              {youTubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youTubeId}?autoplay=0&rel=0`}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : vimeoId ? (''',
        '''              {youTubeId ? (
                isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&rel=0`}
                    title="Video"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play video"
                    className="group absolute inset-0 w-full h-full cursor-pointer border-0 p-0"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
                        <Play className="ml-1 h-7 w-7 fill-white text-white" />
                      </span>
                    </span>
                  </button>
                )
              ) : vimeoId ? (''',
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
print("Done. YouTube embed in video-ministries-section.tsx now uses a")
print("click-to-load facade instead of an eager iframe.")
print()
print("This affects every page using this shared component, including /50.")
