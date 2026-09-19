import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Country Emergency Numbers Directory — Police, Ambulance, Fire",
  description:
    "Police, ambulance, and fire emergency numbers for 70+ countries. Search by country or region. Save before you travel. Includes unified 112 (EU), 911 (Americas), 999 (UK/Gulf), 110/119 (Asia) reference.",
  keywords: [
    "emergency numbers by country",
    "police number Pakistan",
    "ambulance number Dubai",
    "911 country emergency",
    "112 European emergency",
    "999 emergency number",
    "travel safety emergency",
  ],
  alternates: {
    canonical: "https://htg.com.pk/tools/emergency-numbers/",
  },
  openGraph: {
    title: "Country Emergency Numbers Directory | HTG Travels",
    description: "Police, ambulance, fire numbers for 70+ countries. Travel safety reference. Save before you travel.",
    type: "website",
  },
};

export default function EmergencyNumbersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
