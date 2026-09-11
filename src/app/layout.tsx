import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HTG Travels — Flight Tickets & Visa Consultation in Sialkot",
  description:
    "Book domestic & international flights, get visa consultation, Umrah packages, and travel insurance. Sialkot-based travel desk. WhatsApp-first inquiry.",
  keywords: [
    "HTG Travels",
    "Sialkot travel agency",
    "flight tickets Pakistan",
    "visa consultation",
    "Umrah packages",
    "travel insurance",
    "Pakistan to Dubai flights",
    "UK visa Pakistan",
    "Schengen visa Pakistan",
  ],
  authors: [{ name: "HTG Travels" }],
  metadataBase: new URL("https://htg.com.pk"),
  alternates: {
    canonical: "https://htg.com.pk",
  },
  openGraph: {
    title: "HTG Travels — Flight Tickets & Visa Consultation in Sialkot",
    description:
      "Book domestic & international flights, get visa consultation, Umrah packages, and travel insurance. Sialkot-based travel desk.",
    url: "https://htg.com.pk",
    siteName: "HTG Travels",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTG Travels — Sialkot's Trusted Travel Desk",
    description:
      "Flight tickets, visa consultation, Umrah packages, and travel insurance. WhatsApp-first.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "HTG Travels",
  description:
    "Sialkot's trusted travel desk for domestic & international air ticketing, fast tourist visa processing, and travel insurance worldwide.",
  url: "https://htg.com.pk",
  telephone: "+923251480148",
  email: "htghuzaifa@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sialkot",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  openingHours: "Mo-Su 08:00-21:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
