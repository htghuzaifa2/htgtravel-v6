import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

// Required for `output: "export"` (Cloudflare Pages static export).
export const dynamic = "force-static";

/**
 * Dynamic sitemap — generated at build time from the routes + blog posts.
 * Replaces the static /public/sitemap.xml + /public/blog-sitemap.xml files
 * (which are kept for backward compat but are now superseded).
 *
 * Next.js 16 will serve this at /sitemap.xml automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://htg.com.pk";
  const now = new Date();

  // Top-level routes
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/flights`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/visa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/umrah`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/corporate`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // All blog posts
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
