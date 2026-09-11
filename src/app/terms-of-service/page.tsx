import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "HTG Travels Terms of Service — governing law, disclaimers, and contact information.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" />
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-charcoal">
            <p className="text-sm text-muted-grey">Last Updated: September 11, 2026</p>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 1: Introduction</h2>
              <p className="text-base leading-relaxed">
                Welcome to htg.com.pk. By accessing our website, you agree to be bound by these Terms of Service. This website provides information about our travel agency services — flight ticketing, visa consultation, Umrah and Hajj packages, and international holiday packages — and allows you to initiate travel inquiries via WhatsApp.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 2: Intellectual Property</h2>
              <p className="text-base leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of HTG Travels and is protected by copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 3: Disclaimer of Warranties</h2>
              <p className="text-base leading-relaxed">
                This website is provided &quot;as is,&quot; without any warranties of any kind. We do not guarantee that the information is always accurate, complete, or current. Airline fares, visa requirements, hotel availability, and package pricing are subject to change without notice. All fares and quotes are confirmed live at the time of booking.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 4: Governing Law</h2>
              <p className="text-base leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of Pakistan. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 5: Contact</h2>
              <p className="text-base leading-relaxed">
                For any questions about these Terms of Service, contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-teal hover:text-gold transition-colors font-medium">{SITE.email}</a>{" "}
                or on WhatsApp at{" "}
                <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-teal hover:text-gold transition-colors font-medium">{SITE.whatsappDisplay}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
