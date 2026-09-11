import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Domestic & International Flights",
  description:
    "Live fares from 20+ airlines. Book flights from Sialkot, Lahore, Islamabad, Karachi to Dubai, London, Jeddah, and 30+ routes.",
};

export default function FlightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
