import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.15"],
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Photos are resized for each screen by Next (this replaces
    // unoptimized: true). Quality 85 keeps photos sharp. Resized
    // photos are kept for 31 days so Vercel does the work only once.
    formats: ["image/webp"],
    qualities: [85],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "site-assets.plasmic.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.plasmic.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.plasmic.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Self-hosted fonts: keep for 1 year. If a font file is ever replaced,
        // give the new file a new name.
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Hero photo and videos: keep for 7 days. If one is replaced, give the
        // new file a new name (for example hero-loop-v2.mp4).
        source: "/hero-poster.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/hero-loop.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/hero-loop-mobile.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/mongolia-campaign",
        destination: "/impact/mongolia",
        permanent: true,
      },
      {
        source: "/satellite-tv-broadcasting-the-gospel-into-countries-difficult-to-reach",
        destination: "/10-40-media-outreach",
        permanent: true,
      },
      {
        source: "/ukraineaid-donate",
        destination: "/donate",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/the-church-is-silent",
        destination: "/when-churches-fall-silent",
        permanent: true,
      },
      {
        source: "/ukrainians-open-to-the-gospel-during-war",
        destination: "/war-cannot-stop-the-gospel",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/five-life-saving-ambulances-to-kharkiv",
        destination: "/life-saving-ambulances-to-kharkiv",
        permanent: true,
      },
      {
        source: "/5000-fire-extinguishers-for-ukraine",
        destination: "/fire-extinguishers-for-ukraine",
        permanent: true,
      },
    ]
  },
}

export default nextConfig