import type { Metadata } from "next";

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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
