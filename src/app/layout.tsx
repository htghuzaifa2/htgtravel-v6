import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { PalestineBanner } from "@/components/layout/palestine-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyWhatsApp } from "@/components/layout/sticky-whatsapp";

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
  title: {
    default: "HTG Travels — Flight Tickets & Visa Consultation in Pakistan",
    template: "%s | HTG Travels",
  },
  description:
    "Book domestic & international flights, get visa consultation, Umrah packages, and travel insurance. Pakistan-based travel desk serving travelers nationwide. WhatsApp-first inquiry.",
  keywords: [
    "HTG Travels",
    "Pakistan travel agency",
    "flight tickets Pakistan",
    "visa consultation",
    "Umrah packages",
    "travel insurance",
    "Pakistan to Dubai flights",
    "UK visa Pakistan",
    "Schengen visa Pakistan",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  authors: [{ name: "HTG Travels" }],
  metadataBase: new URL("https://htg.com.pk"),
  alternates: {
    canonical: "https://htg.com.pk",
  },
  openGraph: {
    title: "HTG Travels — Flight Tickets & Visa Consultation in Pakistan",
    description:
      "Book domestic & international flights, get visa consultation, Umrah packages, and travel insurance. Pakistan-based travel desk.",
    url: "https://htg.com.pk",
    siteName: "HTG Travels",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTG Travels — Pakistan's Trusted Travel Desk",
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
    "Pakistan's trusted travel desk for domestic & international air ticketing, fast tourist visa processing, and travel insurance worldwide.",
  url: "https://htg.com.pk",
  telephone: "+923251480148",
  email: "htghuzaifa@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sialkot",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: ["Pakistan", "Worldwide"],
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
        {/* Auto-detect browser/device theme. Default to light if not detected.
            Checks localStorage first (user override), then prefers-color-scheme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(t!=='light'&&!t){if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <PalestineBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <StickyWhatsApp />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
