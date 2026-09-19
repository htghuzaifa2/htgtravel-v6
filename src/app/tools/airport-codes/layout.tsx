import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IATA Airport Code Lookup — Search 90+ Major Airports",
  description:
    "Search 90+ major airports worldwide by IATA code (LHR, JFK, DXB) or city name. Returns full airport name, city, country, IANA timezone, and current local time at the airport. Free, mobile-friendly.",
  keywords: [
    "IATA airport code lookup",
    "airport code search",
    "LHR airport",
    "JFK airport",
    "DXB airport",
    "ISB Islamabad airport",
    "LHE Lahore airport",
    "airport code finder",
    "what does LHR mean",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/airport-codes/",
  },
  openGraph: {
    title: "IATA Airport Code Lookup — Search 90+ Airports | HTG Travels",
    description: "Search by IATA code or city name. Returns full name, location, current local time.",
    type: "website",
  },
};

export default function AirportCodesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
