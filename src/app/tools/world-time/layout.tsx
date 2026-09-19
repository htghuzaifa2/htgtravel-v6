import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World Time Zone Converter — Live Time in All Cities",
  description:
    "Live current time in 90+ major cities around the world. Pin your favorites, search by city or country. DST auto-applied. Free, mobile-friendly time zone converter for travelers.",
  keywords: [
    "world time converter",
    "time zone converter",
    "current time in dubai",
    "current time in london",
    "current time in saudi arabia",
    "Pakistan time",
    "international time zones",
    "travel time converter",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/world-time/",
  },
  openGraph: {
    title: "World Time Zone Converter — Live Time in 90+ Cities | HTG Travels",
    description: "Free world time zone converter. Live current time in 90+ major cities worldwide. Pin favorites, search, DST auto-applied.",
    type: "website",
  },
};

export default function WorldTimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
