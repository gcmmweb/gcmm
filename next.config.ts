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
    unoptimized: true,
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
    ]
  },
}

export default nextConfig