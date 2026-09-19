import type { NextRequest } from "next/server";

/**
 * Pages Sitemap — served at /sitemap-pages.xml
 *
 * Contains all top-level routes (the "section index" pages). Individual
 * blog posts and tool pages are in their own sitemaps (/sitemap-blog.xml
 * and /sitemap-tools.xml respectively).
 */

const BASE_URL = "https://htg.com.pk";
const NOW = new Date().toISOString();

export const dynamic = "force-static";

const PAGES: { url: string; changefreq: string; priority: number }[] = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/flights", changefreq: "weekly", priority: 0.9 },
  { url: "/visa", changefreq: "weekly", priority: 0.9 },
  { url: "/umrah", changefreq: "weekly", priority: 0.9 },
  { url: "/insurance", changefreq: "monthly", priority: 0.7 },
  { url: "/destinations", changefreq: "weekly", priority: 0.8 },
  { url: "/corporate", changefreq: "monthly", priority: 0.7 },
  { url: "/blog", changefreq: "daily", priority: 0.8 },
  { url: "/tools", changefreq: "monthly", priority: 0.7 },
  { url: "/about", changefreq: "monthly", priority: 0.6 },
  { url: "/contact", changefreq: "monthly", priority: 0.6 },
  { url: "/faq", changefreq: "monthly", priority: 0.6 },
  { url: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { url: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
];

export function GET(_req: NextRequest) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (p) =>
    `  <url>\n    <loc>${BASE_URL}${p.url}</loc>\n    <lastmod>${NOW}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
