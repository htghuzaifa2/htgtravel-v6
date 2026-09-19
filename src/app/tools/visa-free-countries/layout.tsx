import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa-Free Countries for Pakistani Passport Holders",
  description:
    "Lookup visa policy for Pakistani citizens visiting 70+ countries. Filter by visa-free, visa-on-arrival, eVisa. Search by country or region. Updated for 2025.",
  keywords: [
    "visa-free countries for Pakistan",
    "Pakistani passport visa-free",
    "visa on arrival Pakistani passport",
    "eVisa for Pakistani citizens",
    "Pakistani passport power",
    "where can Pakistanis travel",
    "Schengen visa Pakistan",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/visa-free-countries/",
  },
  openGraph: {
    title: "Visa-Free Countries for Pakistani Passport | HTG Travels",
    description: "Lookup visa policy for Pakistani citizens visiting 70+ countries. Filter by visa-free, visa-on-arrival, eVisa.",
    type: "website",
  },
};

export default function VisaFreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
