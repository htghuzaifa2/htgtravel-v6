import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
    },
    alternates: {
      canonical: `https://htg.com.pk/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link href="/blog/" className="text-teal hover:text-gold transition-colors">&larr; Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Get related posts — same category first, then different category, no repeats
  // Sort by ID descending (newest first)
  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).sort((a, b) => b.id - a.id);
  const otherCategory = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  ).sort((a, b) => b.id - a.id);
  const relatedPosts = [...sameCategory, ...otherCategory].slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="pattern-navy relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(20,184,184,0.5), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-on-navy-muted hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Blog ID + Category badges */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-mono font-bold text-white/80">
              ID: {String(post.id).padStart(3, "0")}
            </span>
            <span className="inline-flex items-center rounded-full bg-gold/10 border border-gold/20 px-3 py-1.5 text-xs font-semibold text-gold">
              {post.category}
            </span>
          </div>

          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px] break-words">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-20">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3 key={i} className="font-heading text-xl font-semibold text-foreground mt-6 mb-3">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 mb-4">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-base text-muted-foreground leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={i} className="my-8 rounded-2xl bg-gradient-to-br from-gold/10 to-teal/10 border border-gold/20 p-6">
                    <p className="text-base md:text-lg font-medium text-foreground italic">
                      {block.text}
                    </p>
                    <div className="mt-4">
                      <a
                        href={SITE.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:brightness-110 transition shadow-md"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Message on WhatsApp
                      </a>
                    </div>
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* CTA at bottom of article */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                Need Help With Your Travel Plans?
              </h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                Our team is ready to assist with flights, visas, Umrah packages, and more — all on WhatsApp.
              </p>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:brightness-110 transition shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                Chat With Us on WhatsApp
              </a>
            </div>
          </div>

          {/* Related Posts — no repeats, same category first */}
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4">More Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}/`}
                  className="group glass rounded-xl p-5 hover:shadow-lg transition-all border border-border/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground/60">
                      ID: {String(related.id).padStart(3, "0")}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                      {related.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-teal transition-colors leading-snug">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to Blog button */}
          <div className="mt-8 text-center">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Guides ({BLOG_POSTS.length} total)
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
