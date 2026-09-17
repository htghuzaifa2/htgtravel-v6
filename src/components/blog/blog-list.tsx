"use client";

import { useState, useMemo } from "react";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

const POSTS_PER_PAGE = 12;

export function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return BLOG_POSTS;
    return BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.keywords.some((kw) => kw.toLowerCase().includes(query)) ||
        post.metaDescription.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      window.history.replaceState({}, "", "/blog/");
    } else {
      window.history.replaceState({}, "", `/blog/?page=${page}`);
    }
    const grid = document.getElementById("blog-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Search */}
      <div className="mb-10 max-w-2xl mx-auto">
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
      </div>

      {/* Count */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post, i) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group glass rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border/30"
              >
                {/* Blog ID badge */}
                <span className="absolute top-4 right-4 text-xs font-mono font-bold text-muted-foreground/40 group-hover:text-teal/60 transition-colors">
                  #{String(post.id).padStart(3, "0")}
                </span>

                {/* Category badge */}
                <span className="inline-flex self-start items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-foreground leading-snug group-hover:text-teal transition-colors mb-4">
                  {post.title}
                </h3>

                {/* Meta description preview */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {post.metaDescription}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:text-gold transition-colors">
                  Read Guide
                  <svg
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              No guides found
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              No guides match &quot;{searchQuery}&quot;. Try a different search
              term.
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
        <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show only nearby pages + first/last
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
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
              );
            }
            if (
              (page === currentPage - 2 && page > 1) ||
              (page === currentPage + 2 && page < totalPages)
            ) {
              return (
                <span key={page} className="text-muted-foreground px-1">
                  …
                </span>
              );
            }
            return null;
          })}

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
    </>
  );
}
