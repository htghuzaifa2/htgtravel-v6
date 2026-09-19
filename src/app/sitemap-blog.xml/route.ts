import type { NextRequest } from "next/server";
import { BLOG_POSTS } from "@/lib/blog-data";

/**
 * Blog Posts Sitemap — served at /sitemap-blog.xml
 *
 * Contains every individual blog post URL (one <url> per slug). Pulled
 * from the same BLOG_POSTS source as the page itself — never drifts out
 * of sync. Add a post to blog-data.ts → it appears here automatically.
 */

const BASE_URL = "https://htg.com.pk";
const NOW = new Date().toISOString();

export const dynamic = "force-static";

export function GET(_req: NextRequest) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${BLOG_POSTS.map(
  (post) =>
    `  <url>\n    <loc>${BASE_URL}/blog/${post.slug}/</loc>\n    <lastmod>${NOW}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
