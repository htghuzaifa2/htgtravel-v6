import type { Metadata } from "next";

/**
 * Metadata for the Trip Budget Calculator page.
 *
 * Page itself is a client component (uses useState/useMemo), so metadata
 * must live in this layout.tsx. Next.js merges this with the parent
 * layout's metadata (title template `%s | HTG Travels`).
 */
export const metadata: Metadata = {
  title: "Trip Budget Calculator — Estimate Your Travel Cost",
  description:
    "Free trip budget calculator. Estimate the total cost of your international trip from Pakistan — flights, visa, hotels, food, insurance, and extras. Mobile-friendly, instant results, CSV export.",
  keywords: [
    "trip budget calculator",
    "travel cost estimator",
    "Pakistan travel calculator",
    "Umrah budget",
    "Dubai trip cost from Pakistan",
    "UK visa cost calculator",
    "Schengen trip budget",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/trip-budget-calculator/",
  },
  openGraph: {
    title: "Trip Budget Calculator — Estimate Your Travel Cost | HTG Travels",
    description:
      "Free trip budget calculator. Estimate total trip cost — flights, visa, hotels, food, insurance. Mobile-friendly.",
    type: "website",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
