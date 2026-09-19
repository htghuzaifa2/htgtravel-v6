import type { NextRequest } from "next/server";

/**
 * Tools Sitemap — served at /sitemap-tools.xml
 *
 * Contains all interactive tool pages on the site. Currently:
 *   /tools/                       — Tools landing page (lists all tools)
 *   /tools/trip-budget-calculator — Trip budget calculator
 *
 * When you add a new tool, append its URL to the TOOLS array below and it
 * will automatically appear in this sitemap (and in the sitemap index).
 */

const BASE_URL = "https://htg.com.pk";
const NOW = new Date().toISOString();

export const dynamic = "force-static";

const TOOLS: { url: string; changefreq: string; priority: number }[] = [
  { url: "/tools/", changefreq: "monthly", priority: 0.7 },
  { url: "/tools/trip-budget-calculator/", changefreq: "monthly", priority: 0.7 },
];

export function GET(_req: NextRequest) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${TOOLS.map(
  (t) =>
    `  <url>\n    <loc>${BASE_URL}${t.url}</loc>\n    <lastmod>${NOW}</lastmod>\n    <changefreq>${t.changefreq}</changefreq>\n    <priority>${t.priority}</priority>\n  </url>`
).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
