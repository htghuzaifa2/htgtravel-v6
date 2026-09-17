import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { BlogList } from "@/components/blog/blog-list";

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
          <BlogList />
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
