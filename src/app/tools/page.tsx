import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, Plane, FileCheck, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Travel Tools & Calculators",
  description:
    "Free travel tools and calculators from HTG Travels. Estimate your trip budget, calculate visa fees, and plan your travel costs before booking. Mobile-friendly and accurate for 2026.",
  keywords: [
    "travel calculator",
    "trip budget calculator",
    "travel cost estimator",
    "Pakistan travel tools",
    "Umrah budget calculator",
    "visa cost calculator",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/",
  },
  openGraph: {
    title: "Travel Tools & Calculators — HTG Travels",
    description:
      "Free travel tools and calculators. Estimate your trip budget, calculate visa fees, and plan your travel costs.",
    type: "website",
  },
};

// Tools sitemap-friendly list of tools (kept in sync with sitemap-tools.xml)
const TOOLS = [
  {
    slug: "trip-budget-calculator",
    title: "Trip Budget Calculator",
    description:
      "Estimate the total cost of your international trip — flights, visa, hotels, food, insurance, and extras. Live results as you type, mobile-friendly, no signup.",
    icon: Calculator,
    badge: "Most Popular",
  },
  {
    slug: "#",
    title: "Visa Fee Estimator",
    description:
      "Coming soon — country-by-country visa fee lookup with the latest 2026 embassy charges for Pakistani passport holders.",
    icon: FileCheck,
    badge: "Coming Soon",
    disabled: true,
  },
  {
    slug: "#",
    title: "Umrah Package Builder",
    description:
      "Coming soon — build a custom Umrah package with hotel category, days, and group size to see the total cost from Pakistan.",
    icon: ShieldCheck,
    badge: "Coming Soon",
    disabled: true,
  },
  {
    slug: "#",
    title: "Flight Duration Finder",
    description:
      "Coming soon — check direct and connecting flight durations between any two cities from Pakistan.",
    icon: Plane,
    badge: "Coming Soon",
    disabled: true,
  },
];

export default function ToolsPage() {
  // WebSite JSON-LD for the tools hub
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HTG Travels — Free Travel Tools",
    description:
      "Free travel tools and calculators from HTG Travels. Estimate trip costs, visa fees, and more.",
    url: "https://htg.com.pk/tools/",
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.title,
      url: tool.slug === "#" ? "https://htg.com.pk/tools/" : `https://htg.com.pk/tools/${tool.slug}/`,
    })),
  };

  // BreadcrumbList for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://htg.com.pk/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://htg.com.pk/tools/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="Travel Tools"
        title="Free Travel Tools & Calculators"
        subtitle="Plan smarter before you book"
        intro="Free, mobile-friendly travel calculators and tools. Estimate your trip costs, visa fees, and package prices before reaching out — no signup, no email required."
      />

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {TOOLS.map((tool) => {
                const disabled = tool.disabled;
                return (
                  <div
                    key={tool.title}
                    className={`group relative glass rounded-2xl p-6 border border-border/60 transition-all duration-300 ${
                      disabled ? "opacity-70" : "hover:shadow-htg-lg hover:-translate-y-1 cursor-pointer"
                    }`}
                  >
                    {tool.badge && (
                      <span
                        className={`absolute top-4 right-4 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          tool.badge === "Coming Soon"
                            ? "bg-muted text-muted-foreground"
                            : "bg-gold/15 text-gold"
                        }`}
                      >
                        {tool.badge}
                      </span>
                    )}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    {disabled ? (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                        In Development
                      </span>
                    ) : (
                      <Link
                        href={`/tools/${tool.slug}/`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors group"
                      >
                        Open Tool
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
