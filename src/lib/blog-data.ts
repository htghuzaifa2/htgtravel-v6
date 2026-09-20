export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  keywords: string[];
  /** Unique per-post business promotion rendered as a styled CTA card. */
  promo: {
    headline: string;
    body: string;
    cta: string;
    /** Prefilled WhatsApp message (unique per post — doubles as campaign tracking). */
    waText: string;
  };
  content: BlogBlock[];
};

export type BlogPostSeed = Omit<BlogPost, "id">;

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string };

// Batches are grouped by theme. IDs are auto-assigned in stable order.
import { visaCore } from "./blog-posts/visa-core";
import { visaSchengen } from "./blog-posts/visa-schengen";
import { visaProcess } from "./blog-posts/visa-process";
import { umrahCore } from "./blog-posts/umrah-core";
import { umrahFamily } from "./blog-posts/umrah-family";
import { umrahPractical } from "./blog-posts/umrah-practical";
import { hajj } from "./blog-posts/hajj";
import { flights } from "./blog-posts/flights";
import { insurance } from "./blog-posts/insurance";
import { destinationsAsia } from "./blog-posts/destinations-asia";
import { destinationsWorld } from "./blog-posts/destinations-world";
import { planningOne } from "./blog-posts/planning-1";
import { planningTwo } from "./blog-posts/planning-2";

const SEEDS: BlogPostSeed[] = [
  ...visaCore,
  ...visaSchengen,
  ...visaProcess,
  ...umrahCore,
  ...umrahFamily,
  ...umrahPractical,
  ...hajj,
  ...flights,
  ...insurance,
  ...destinationsAsia,
  ...destinationsWorld,
  ...planningOne,
  ...planningTwo,
];

// Auto-generate IDs for all posts at runtime
export const BLOG_POSTS: BlogPost[] = SEEDS.map((post, index) => ({
  ...post,
  id: index + 1,
}));
