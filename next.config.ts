import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages static export
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
