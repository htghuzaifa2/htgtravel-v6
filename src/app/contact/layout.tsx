import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact HTG Travels — Pakistan",
  description:
    "Reach us on WhatsApp at +92 325 1480148 or email htghuzaifa@gmail.com. Pakistan-based travel desk serving travelers nationwide.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
