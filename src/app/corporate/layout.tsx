import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate & Group Travel",
  description:
    "Dedicated account management, group fares, and invoice-ready billing for companies and organizations.",
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
