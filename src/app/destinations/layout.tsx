import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Routes From Pakistan",
  description:
    "Browse domestic and international flight routes from Sialkot, Lahore, Islamabad, and Karachi. Live fares on WhatsApp.",
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
