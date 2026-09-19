import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Coins, CalendarDays, Stamp, Moon, Globe, Plane, Phone, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FadeIn } from "@/components/animations";

export const metadata: Metadata = {
  title: "Travel Tools & Calculators",
  description:
    "Free travel tools and calculators from HTG Travels: world time zone converter, currency converter, Hijri-Gregorian date converter, country info lookup, IATA airport codes, emergency numbers, visa-free countries, and more. Mobile-friendly, no signup.",
  keywords: [
    "travel tools",
    "world time converter",
    "currency converter",
    "Hijri date converter",
    "country info lookup",
    "airport codes",
    "emergency numbers",
    "visa-free countries Pakistan",
    "free travel calculators",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/",
  },
  openGraph: {
    title: "Travel Tools & Calculators — HTG Travels",
    description:
      "8 free travel tools: world time, currency, Hijri converter, country info, airport codes, emergency numbers, date calc, visa-free.",
    type: "website",
  },
};

// All tools listed on this page. Kept in sync with sitemap-tools.xml.
// NO pricing tools — only informational/lookup/conversion utilities.
const TOOLS = [
  {
    slug: "world-time",
    title: "World Time Zone Converter",
    description:
      "Live current time in 90+ major cities around the world. Pin your favorites, search by city or country. DST auto-applied.",
    icon: Clock,
    badge: "Live",
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    description:
      "Convert between 49 world currencies (PKR, USD, EUR, GBP, AED, SAR, and 44 more). Indicative rates, cross-rate table.",
    icon: Coins,
    badge: "Popular",
  },
  {
    slug: "hijri-converter",
    title: "Hijri ↔ Gregorian Converter",
    description:
      "Convert dates between Islamic Hijri calendar (Umm al-Qura — official Saudi calendar) and Gregorian. Includes upcoming Islamic dates (Ramadan, Eid, Hajj).",
    icon: Moon,
    badge: "Muslim",
  },
  {
    slug: "country-info",
    title: "Country Info Lookup",
    description:
      "One-stop reference for 60+ countries: capital, currency, language, plug type, voltage, frequency, driving side, calling code, emergency numbers.",
    icon: Globe,
    badge: "Traveler",
  },
  {
    slug: "airport-codes",
    title: "IATA Airport Code Lookup",
    description:
      "Search 90+ major airports by IATA code (LHR, JFK, DXB) or city name. Returns full name, location, IANA timezone, current local time.",
    icon: Plane,
    badge: null,
  },
  {
    slug: "emergency-numbers",
    title: "Country Emergency Numbers",
    description:
      "Police, ambulance, and fire emergency numbers for 70+ countries. Save before you travel. Travel safety tips included.",
    icon: Phone,
    badge: "Safety",
  },
  {
    slug: "date-calculator",
    title: "Travel Date Calculator",
    description:
      "Calculate days between two dates, add/subtract days (visa validity, passport expiry, insurance period), and find what day of week any date is.",
    icon: CalendarDays,
    badge: null,
  },
  {
    slug: "visa-free-countries",
    title: "Visa-Free Countries for Pakistani Passport",
    description:
      "Lookup visa policy for 70+ destinations for Pakistani citizens. Filter by visa-free, visa-on-arrival, eVisa, or region.",
    icon: Stamp,
    badge: "Updated 2025",
  },
];

export default function ToolsPage() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HTG Travels — Free Travel Tools",
    description:
      "Free travel tools: world time converter, currency converter, date calculator, visa-free countries lookup.",
    url: "https://htg.com.pk/tools/",
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.title,
      url: `https://htg.com.pk/tools/${tool.slug}/`,
    })),
  };

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
        intro="Free, mobile-friendly travel tools — world time converter, currency converter, date calculator, and visa-free countries lookup. No signup, no email required. All tools work offline once loaded."
      />

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  className="group relative glass rounded-2xl p-6 border border-border/60 transition-all duration-300 hover:shadow-htg-lg hover:-translate-y-1"
                >
                  {tool.badge && (
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-gold/15 text-gold">
                      {tool.badge}
                    </span>
                  )}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:text-gold transition-colors">
                    Open Tool
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </FadeIn>

          <div className="mt-12 p-6 rounded-2xl bg-muted/40 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">About these tools:</strong>{" "}
              All tools run entirely in your browser — no data is sent to any
              server, no signup required, and they work offline once loaded.
              The world time zone converter uses your device clock and IANA
              timezone database. The currency converter uses indicative rates
              updated periodically (not live market rates). The visa-free
              countries tool is informational only — always verify with the
              destination embassy before booking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
