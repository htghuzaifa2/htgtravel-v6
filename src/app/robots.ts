import type { MetadataRoute } from "next";

// Required for `output: "export"` (Cloudflare Pages static export).
export const dynamic = "force-static";

/**
 * Dynamic robots.txt — Next.js 16 serves this at /robots.txt automatically.
 * Replaces the static /public/robots.txt (kept for backward compat).
 *
 * Allowing all bots to crawl, with explicit sitemap references so search
 * engines always find the latest URLs.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/admin/"],
    },
    sitemap: [
      "https://htg.com.pk/sitemap.xml",
      // Legacy static sitemaps (kept until search engines migrate to the dynamic one)
      "https://htg.com.pk/sitemap.xml",
    ],
    host: "https://htg.com.pk",
  };
}
