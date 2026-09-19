import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hijri to Gregorian Date Converter (Umm al-Qura)",
  description:
    "Convert dates between Islamic Hijri calendar (Umm al-Qura — official Saudi calendar) and Gregorian. Plan Ramadan, Eid al-Fitr, Eid al-Adha, Hajj, Muharram, Ashura dates accurately. Free, mobile-friendly.",
  keywords: [
    "Hijri to Gregorian converter",
    "Islamic date converter",
    "Umm al-Qura calendar",
    "Ramadan 2026 date",
    "Eid al-Fitr date",
    "Eid al-Adha date",
    "Islamic New Year",
    "Hajj 2026 date",
    "Muslim date converter",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/hijri-converter/",
  },
  openGraph: {
    title: "Hijri ↔ Gregorian Date Converter | HTG Travels",
    description: "Convert between Islamic Hijri and Gregorian dates. Plan Ramadan, Eid, Hajj accurately. Umm al-Qura calendar.",
    type: "website",
  },
};

export default function HijriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
