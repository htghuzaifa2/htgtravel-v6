import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { BLOG_POSTS } from "@/lib/blog-data";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";

export const metadata: Metadata = {
  title: "Travel Guides & Visa Tips | HTG Travels",
  description:
    "Practical guides on visa applications, flight booking, Umrah preparation, and travel tips for Pakistani travelers. Written by our team in Sialkot.",
  keywords: [
    "travel guide Pakistan",
    "visa guide Pakistan",
    "Umrah tips",
    "cheap flights Pakistan",
    "UK visa guide Pakistan",
    "Schengen visa Pakistan",
    "UAE visa Pakistan",
  ],
  openGraph: {
    title: "Travel Guides & Visa Tips | HTG Travels",
    description: "Practical guides for Pakistani travelers — visa tips, flight deals, and Umrah advice.",
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Travel Guides & Visa Tips"
        subtitle="Helpful Resources for Pakistani Travelers"
        intro="Practical guides on visa applications, flight booking, Umrah preparation, and travel tips — written by our team in Sialkot."
      />

      <section className="py-16 lg:py-20 bg-background topo-bg relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <StaggerItem key={post.slug} index={i}>
                <a
                  href={`/blog/${post.slug}/`}
                  className="group glass rounded-2xl p-8 h-full flex flex-col justify-between glow-border relative overflow-hidden block"
                >
                  {/* Category badge */}
                  <span className="inline-flex self-start items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal mb-4">
                    {post.category}
                  </span>
                  {/* Title only — no description, no date */}
                  <h3 className="font-heading text-xl font-bold text-foreground leading-snug group-hover:text-teal transition-colors">
                    {post.title}
                  </h3>
                  {/* Read more link */}
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:text-gold transition-colors">
                    Read Guide
                    <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCTA
        heading="Have a Travel Question?"
        body="Our team is happy to help. Message us on WhatsApp with your question and we will reply within minutes."
        buttonLabel="Ask on WhatsApp"
      />
    </>
  );
}
