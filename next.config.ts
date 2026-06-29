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
      // Add other image hosts you might use
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
}

export default nextConfig