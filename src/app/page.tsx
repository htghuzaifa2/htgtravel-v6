import { PalestineBanner } from "@/components/layout/palestine-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyWhatsApp } from "@/components/layout/sticky-whatsapp";
import { Hero } from "@/components/sections/hero";
import {
  TrustStrip, ServicesGrid, PopularRoutes, VisaPathways,
  UmrahSpotlight, HowItWorks, WhyHTG, Testimonials, FAQPreview, FinalCTA,
} from "@/components/sections/home-sections";
import {
  AboutSection, FlightsSection, VisaSection, UmrahSection,
  InsuranceSection, DestinationsSection, CorporateSection,
  BlogSection, FAQSection, ContactSection, PrivacySection, TermsSection,
} from "@/components/sections/detail-sections";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PalestineBanner />
      <Header />
      <main className="flex-1">
        {/* Home */}
        <Hero />
        <TrustStrip />
        <ServicesGrid />
        <PopularRoutes />
        <VisaPathways />
        <UmrahSpotlight />
        <HowItWorks />
        <WhyHTG />
        <Testimonials />
        <FAQPreview />
        <FinalCTA />

        {/* Detail pages (anchor-linked sections) */}
        <AboutSection />
        <FlightsSection />
        <VisaSection />
        <UmrahSection />
        <InsuranceSection />
        <DestinationsSection />
        <CorporateSection />
        <BlogSection />
        <FAQSection />
        <ContactSection />
        <PrivacySection />
        <TermsSection />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
