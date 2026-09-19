import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Date Calculator — Days Between Dates",
  description:
    "Free travel date calculator. Calculate days between two dates, add or subtract days from a date (visa validity, passport expiry, insurance periods). Find what day of the week any date falls on. Mobile-friendly.",
  keywords: [
    "date calculator",
    "days between dates",
    "visa validity calculator",
    "passport expiry calculator",
    "add days to date",
    "travel date calculator",
    "day of week finder",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/date-calculator/",
  },
  openGraph: {
    title: "Travel Date Calculator — Days Between Dates | HTG Travels",
    description: "Calculate days between two dates, add/subtract days for visa validity, passport expiry. Mobile-friendly.",
    type: "website",
  },
};

export default function DateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
