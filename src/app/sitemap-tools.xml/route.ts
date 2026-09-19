import type { MetadataRoute } from "next";

/**
 * Tools Sitemap — served at /sitemap-tools.xml
 *
 * All interactive tool pages on the site. Add a tool's URL here when you
 * publish a new one — it will auto-appear in the sitemap index.
 */

const BASE_URL = "https://htg.com.pk";
const NOW = new Date().toISOString();

export const dynamic = "force-static";

const TOOLS: { url: string; changefreq: string; priority: number }[] = [
  { url: "/tools/", changefreq: "monthly", priority: 0.7 },
  { url: "/tools/world-time/", changefreq: "monthly", priority: 0.8 },
  { url: "/tools/currency-converter/", changefreq: "weekly", priority: 0.8 },
  { url: "/tools/date-calculator/", changefreq: "monthly", priority: 0.7 },
  { url: "/tools/visa-free-countries/", changefreq: "monthly", priority: 0.8 },
];

export function GET() {
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
