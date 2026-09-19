import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt — served at /robots.txt
 *
 * EXPLICITLY ALLOWS ALL SEARCH ENGINES AND AI CRAWLERS.
 *
 * We do NOT block any bot — we want maximum discoverability across:
 *   - Traditional search engines: Google, Bing, Yandex, Baidu, DuckDuckGo,
 *     Brave, Ecosia, Startpage, Qwant, Sogou, Naver, Seznam, AhrefsBot,
 *     SemrushBot, MJ12bot (these power backlink indexes).
 *   - AI training / retrieval crawlers: GPTBot (OpenAI/ChatGPT),
 *     ChatGPT-User (ChatGPT live search), ClaudeBot + anthropic-ai
 *     (Anthropic/Claude), PerplexityBot + Perplexity-User, Google-Extended
 *     (Gemini training), CCBot (CommonCrawl — base corpus for many LLMs),
 *     Amazonbot (Amazon Rufus), Applebot-Extended (Apple Intelligence),
 *     Meta-ExternalAgent (Meta AI), Bytespider (ByteDance / Doubao),
 *     ClaudeWeb, Diffbot, ImagesiftBot, OAI-SearchBot (OpenAI search),
 *     Piplbot, cohere-ai, etc.
 *
 * Only `/api/`, `/_next/`, `/admin/` (admin-only paths if any) are
 * disallowed for ALL bots — these are infrastructure paths that should
 * never appear in search results.
 *
 * The sitemap index is referenced so search engines auto-discover every
 * sub-sitemap (pages, blog posts, tools).
 */

export const dynamic = "force-static";

// List of explicit AI / search bots to allow. This is a curated list of
// known bot user-agents from major AI labs and search engines. New bots
// that emerge in the future will be allowed automatically by the
// catch-all User-agent: * Allow: / rule.
const AI_AND_SEARCH_BOTS = [
  // — Traditional search engines —
  "Googlebot",          // Google
  "Bingbot",            // Bing
  "Slurp",              // Yahoo
  "DuckDuckBot",        // DuckDuckGo
  "Baiduspider",        // Baidu
  "YandexBot",          // Yandex
  "Sogou web spider",   // Sogou
  "Naverbot",           // Naver
  "Seznam",             // Seznam
  "Applebot",           // Apple (Siri / Spotlight
  "Exabot",             // Exalead
  "facebot",            // Facebook
  "facebookexternalhit", // Facebook Open Graph
  "LinkedInBot",        // LinkedIn
  "Twitterbot",        // Twitter / X

  // — Backlink / SEO indexers (power search visibility) —
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",           // Majestic
  "DotBot",            // Moz
  "Piplbot",
  "Discobot",
  "BlepBot",
  "DomainAppender",
  "linkdexbot",

  // — AI training crawlers (LLM corpus builders) —
  "GPTBot",            // OpenAI (ChatGPT training)
  "OAI-SearchBot",     // OpenAI (ChatGPT live search)
  "ChatGPT-User",     // ChatGPT user-initiated fetch
  "ClaudeBot",        // Anthropic (Claude training)
  "anthropic-ai",     // Anthropic (alternate user-agent)
  "Claude-Web",       // Anthropic (web fetch)
  "CCBot",            // Common Crawl — base corpus for many LLMs
  "Google-Extended",  // Google Gemini training
  "PerplexityBot",    // Perplexity training + answer retrieval
  "Perplexity-User", // Perplexity user-initiated fetch
  "Amazonbot",        // Amazon (Rufus + Alexa)
  "Applebot-Extended", // Apple Intelligence training
  "Meta-ExternalAgent", // Meta AI / Llama
  "Meta-ExternalFetcher", // Meta external fetch
  "Bytespider",       // ByteDance (Doubao, TikTok search)
  "cohere-ai",        // Cohere
  "Diffbot",          // Diffbot
  "ImagesiftBot",     // Imagesift (image AI)
  "img2dataset",      // Image dataset builder
  "Piplbot",
  "YouBot",           // You.com
  "Timpibot",         // Timpi
  "Online-Link-Analysis-Analyzer", // OLA
];

export default function robots(): MetadataRoute.Robots {
  // Common rules for every bot — allow everything except infra paths
  const commonAllow = ["/"];
  const commonDisallow = ["/api/", "/_next/", "/admin/", "/private/"];

  // Build per-bot rules (each AI bot gets explicit Allow so there's no
  // ambiguity for AI crawlers that may mis-interpret a generic * block).
  const rules = AI_AND_SEARCH_BOTS.map((ua) => ({
    userAgent: ua,
    allow: commonAllow,
    disallow: commonDisallow,
  }));

  // Catch-all for any future bot not in the list
  rules.push({
    userAgent: "*",
    allow: commonAllow,
    disallow: commonDisallow,
  });

  return {
    rules,
    // Reference the sitemap INDEX — search engines will follow it and
    // recursively fetch every sub-sitemap.
    sitemap: "https://htg.com.pk/sitemap.xml",
    host: "https://htg.com.pk",
  };
}
