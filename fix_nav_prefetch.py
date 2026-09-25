#!/usr/bin/env python3
"""
Fix: navigation prefetch storm (Sep 2026)

Confirmed live on gcmm.ca/50: page load triggers ~60 background prefetch
requests for ~15 nav-dropdown routes (Donate, Contact, About, Team, History,
Ukraine, Israel, 10/40 Window, etc.), each fetched multiple times, before any
user interaction. This is Next.js's automatic <Link> viewport-prefetch acting
on the dropdown menus, which (since the Sep 2026 SEO fix) are now *always*
mounted in the DOM -- just visually hidden -- instead of only mounting on
hover. Good for crawlers, but it means every dropdown link is "in the
viewport" from first paint, so all of them prefetch immediately.

Measured impact on https://www.gcmm.ca/50 (mobile, Slow 4G, real PageSpeed
Insights run): Performance 40, LCP 21.3s, 5.2MB total payload, 1.9MB unused JS.

Fix: prefetch={false} on every nav <Link>. This does NOT remove the links
from the HTML (crawlers still see them fine) and does NOT change anything
visually -- it only stops the browser from silently pre-downloading every
other page in the background. Clicking a nav link still works exactly the
same, just without the invisible head start.

Run from the repo root, on its own branch:
    git checkout main && git pull
    git checkout -b fix-nav-prefetch-storm
    python3 fix_nav_prefetch.py
    git diff
    git add -A && git commit -m "Disable prefetch on nav links to fix prefetch storm"
    git push -u origin fix-nav-prefetch-storm
"""
import sys
from pathlib import Path

ROOT = Path.cwd()
CHANGED = []


def edit(path: str, old: str, new: str, count_expected: int = 1):
    p = ROOT / path
    text = p.read_text()
    occurrences = text.count(old)
    if occurrences != count_expected:
        print(f"  ABORTED: {path} -> expected {count_expected} match(es), "
              f"found {occurrences}. File may have changed since this "
              f"script was written -- stopping without touching it.")
        sys.exit(1)
    p.write_text(text.replace(old, new))
    CHANGED.append(path)


print("Fixing components/navigation-header.tsx (6 Link elements)...")

# 1. Logo -> home link
edit(
    "components/navigation-header.tsx",
    '''              <Link
                href={homeUrl}
                className="flex items-center hover:opacity-80 transition-opacity duration-200"
                style={{ gap: `12px` }}
              >''',
    '''              <Link
                href={homeUrl}
                prefetch={false}
                className="flex items-center hover:opacity-80 transition-opacity duration-200"
                style={{ gap: `12px` }}
              >''',
)

# 2. Desktop dropdown items (always-mounted -- the main source of the storm)
edit(
    "components/navigation-header.tsx",
    '''                        {getDropdownItems(item).map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.url}
                            className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-sm"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}''',
    '''                        {getDropdownItems(item).map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.url}
                            prefetch={false}
                            className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-sm"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}''',
)

# 3. Desktop top-level items without a dropdown (Home/News/Contact/Videos etc.)
edit(
    "components/navigation-header.tsx",
    '''                    <Link
                      href={getNavigationItemUrl(item)}
                      className={`transition-colors ${fontWeight} ${fontFamily} ${fontSize} tracking-wide whitespace-nowrap`}
                      style={{
                        color: hoveredItem === item ? hoverTextColor : textColor,
                        paddingLeft: `${navItemPaddingX * 0.6}px`,
                        paddingRight: `${navItemPaddingX * 0.6}px`,
                        paddingTop: `${navItemPaddingY}px`,
                        paddingBottom: `${navItemPaddingY}px`,
                      }}''',
    '''                    <Link
                      href={getNavigationItemUrl(item)}
                      prefetch={false}
                      className={`transition-colors ${fontWeight} ${fontFamily} ${fontSize} tracking-wide whitespace-nowrap`}
                      style={{
                        color: hoveredItem === item ? hoverTextColor : textColor,
                        paddingLeft: `${navItemPaddingX * 0.6}px`,
                        paddingRight: `${navItemPaddingX * 0.6}px`,
                        paddingTop: `${navItemPaddingY}px`,
                        paddingBottom: `${navItemPaddingY}px`,
                      }}''',
)

# 4. Desktop Donate button
edit(
    "components/navigation-header.tsx",
    '                  <Link href={donateUrl}>',
    '                  <Link href={donateUrl} prefetch={false}>',
)

# 5. Mobile dropdown items (only mounts when opened, but fix for consistency)
edit(
    "components/navigation-header.tsx",
    '''                                  {getDropdownItems(item).map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.label}
                                      href={dropdownItem.url}
                                      className="block pl-12 pr-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                                      onClick={closeMobileMenu}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}''',
    '''                                  {getDropdownItems(item).map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.label}
                                      href={dropdownItem.url}
                                      prefetch={false}
                                      className="block pl-12 pr-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm"
                                      onClick={closeMobileMenu}
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  ))}''',
)

# 6. Mobile top-level items + mobile Donate button
edit(
    "components/navigation-header.tsx",
    '''                          <Link
                            href={getNavigationItemUrl(item)}
                            className={`block px-6 py-3 text-gray-900 hover:bg-gray-50 hover:text-blue-900 transition-colors ${fontWeight} ${fontFamily} text-base`}
                            onClick={closeMobileMenu}
                          >
                            {item}
                          </Link>''',
    '''                          <Link
                            href={getNavigationItemUrl(item)}
                            prefetch={false}
                            className={`block px-6 py-3 text-gray-900 hover:bg-gray-50 hover:text-blue-900 transition-colors ${fontWeight} ${fontFamily} text-base`}
                            onClick={closeMobileMenu}
                          >
                            {item}
                          </Link>''',
)
edit(
    "components/navigation-header.tsx",
    '                    <Link href={donateUrl} onClick={closeMobileMenu}>',
    '                    <Link href={donateUrl} prefetch={false} onClick={closeMobileMenu}>',
)

print("  OK -- 8 Link elements updated")
print()
print(f"Done. {len(CHANGED)} edit(s) in components/navigation-header.tsx")
print()
print("Not touched (out of scope for this fix, can revisit separately):")
print("  - Footer links (give/contact) -- much smaller contribution, lower priority")
