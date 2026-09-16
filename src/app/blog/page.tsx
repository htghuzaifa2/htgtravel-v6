"use client";

import { useState, useMemo } from "react";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { BLOG_POSTS } from "@/lib/blog-data";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations";

const POSTS_PER_PAGE = 10;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Real-time search — filters as user types (no enter needed)
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return BLOG_POSTS;
    return BLOG_POSTS.filter((post) =>
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.keywords.some((kw) => kw.toLowerCase().includes(query)) ||
      post.metaDescription.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Update URL with page number (without reload — uses history API)
  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      window.history.replaceState({}, "", "/blog/");
    } else {
      window.history.replaceState({}, "", `/blog/?page=${page}`);
    }
    // Scroll to top of blog grid
    const grid = document.getElementById("blog-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          {/* Search Bar */}
          <FadeIn className="mb-10 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search guides (e.g. UK visa, Umrah, flights, insurance...)"
                className="w-full h-14 pl-12 pr-4 rounded-full glass border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </FadeIn>

          {/* Results count */}
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? `${filteredPosts.length} guide${filteredPosts.length !== 1 ? "s" : ""} found for "${searchQuery}"`
                : `Showing ${currentPosts.length} of ${BLOG_POSTS.length} guides`}
            </p>
          </div>

          {/* Blog Grid */}
          <div id="blog-grid">
            {currentPosts.length > 0 ? (
              <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map((post, i) => (
                  <StaggerItem key={post.slug} index={i}>
                    <a
                      href={`/blog/${post.slug}/`}
                      className="group glass rounded-2xl p-8 h-full flex flex-col justify-between glow-border relative overflow-hidden block"
                    >
                      <span className="inline-flex self-start items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal mb-4">
                        {post.category}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground leading-snug group-hover:text-teal transition-colors">
                        {post.title}
                      </h3>
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
            ) : (
              <div className="text-center py-20">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No guides found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  No guides match "{searchQuery}". Try a different search term.
                </p>
                <button
                  onClick={() => handleSearchChange("")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:brightness-110 transition shadow-md"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`inline-flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold transition-all ${
                    currentPage === page
                      ? "bg-gold text-navy shadow-md"
                      : "border border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-all"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
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
