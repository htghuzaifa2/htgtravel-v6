import type { NextRequest } from "next/server";

/**
 * Sitemap Index — served at /sitemap.xml
 *
 * This is a sitemap INDEX (root element <sitemapindex>) that points to all
 * sub-sitemaps. Search engines (Google, Bing, Yandex, Baidu, DuckDuckGo,
 * Brave, ChatGPT, Claude, Perplexity, etc.) all follow the sitemap index
 * convention and will recursively fetch every sub-sitemap listed here.
 *
 * Sub-sitemaps:
 *   /sitemap-pages.xml  — all main website pages (home, flights, visa,
 *                          umrah, insurance, destinations, corporate,
 *                          /blog index, /tools index, about, contact, faq,
 *                          privacy-policy, terms-of-service)
 *   /sitemap-blog.xml   — all 240+ blog post URLs (one per slug)
 *   /sitemap-tools.xml  — all interactive tool pages (currently /tools/)
 *
 * Each sub-sitemap route handler (app/sitemap-*.xml/route.ts) emits valid
 * XML with a <urlset> root and <url><loc><lastmod><changefreq><priority>
 * entries.
 */

const BASE_URL = "https://htg.com.pk";
const NOW = new Date().toISOString();

export const dynamic = "force-static";

export function GET(_req: NextRequest) {
  const subSitemaps = [
    { loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: NOW },
    { loc: `${BASE_URL}/sitemap-blog.xml`, lastmod: NOW },
    { loc: `${BASE_URL}/sitemap-tools.xml`, lastmod: NOW },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subSitemaps
  .map(
    (s) =>
      `  <sitemap>\n    <loc>${escapeXml(s.loc)}</loc>\n    <lastmod>${s.lastmod}</lastmod>\n  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
