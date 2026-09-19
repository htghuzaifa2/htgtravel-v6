import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Country Info Lookup — Capital, Currency, Plugs, Voltage, Emergency Numbers",
  description:
    "Comprehensive country info for travelers: capital, currency code + symbol, official language, plug type, voltage, frequency, driving side, calling code, and emergency numbers (police, ambulance, fire) for 60+ countries. Mobile-friendly, no signup.",
  keywords: [
    "country information lookup",
    "plug type by country",
    "voltage by country",
    "driving side by country",
    "emergency numbers by country",
    "calling code directory",
    "currency by country",
    "official language by country",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/country-info/",
  },
  openGraph: {
    title: "Country Info Lookup — Plug, Voltage, Currency, Emergency | HTG Travels",
    description: "60+ countries: capital, currency, plug type, voltage, frequency, driving side, calling code, emergency numbers.",
    type: "website",
  },
};

export default function CountryInfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
