import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter — Convert 49 World Currencies",
  description:
    "Free currency converter. Convert between 49 world currencies (PKR, USD, EUR, GBP, AED, SAR, and more). Indicative rates for travel planning. Mobile-friendly, no signup.",
  keywords: [
    "currency converter",
    "PKR to USD",
    "USD to PKR",
    "AED to PKR",
    "SAR to PKR",
    "currency exchange calculator",
    "travel money converter",
    "foreign exchange calculator",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/currency-converter/",
  },
  openGraph: {
    title: "Currency Converter — Convert 49 World Currencies | HTG Travels",
    description: "Free currency converter for 49 world currencies. Indicative rates for travel planning. Mobile-friendly.",
    type: "website",
  },
};

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
