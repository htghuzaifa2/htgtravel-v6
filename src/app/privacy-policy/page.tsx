import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HTG Travels privacy policy — we do not collect or store your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-charcoal">
            <div>
              <p className="text-base leading-relaxed">
                Your privacy is important to us. At HTG Travels, we are committed to being transparent about how we handle data.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Our Core Privacy Principle</h2>
              <p className="text-base leading-relaxed">
                We do not collect or store your personal data. Our website is designed to be a client-side application, meaning the core functionalities run directly in your browser without sending your personal information to our servers.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">What Data We Handle (and Where It Stays)</h2>

              <h3 className="font-heading text-base font-semibold text-navy mt-5 mb-2">Travel Inquiries & WhatsApp</h3>
              <p className="text-sm leading-relaxed">
                When you use our inquiry forms or WhatsApp buttons, your information (name, travel dates, destination, number of passengers) is used to pre-fill a WhatsApp message. This data is not stored on our servers. The message is sent directly from your device to our WhatsApp number, and your privacy is then subject to WhatsApp&apos;s policies.
              </p>

              <h3 className="font-heading text-base font-semibold text-navy mt-5 mb-2">Visa Document Submissions</h3>
              <p className="text-sm leading-relaxed">
                When you engage our visa consultation service, you will share personal documents (passport, bank statements, employer letters) with us via WhatsApp or email. These documents are stored only for the duration of your visa application and are deleted once the application is decided. We do not share your documents with any third party except the relevant embassy or visa application centre.
              </p>

              <h3 className="font-heading text-base font-semibold text-navy mt-5 mb-2">Third-Party Services</h3>
              <p className="text-sm leading-relaxed">
                We may use analytics tools that collect anonymous usage data to help us improve our website. This information is aggregated and does not contain any personally identifiable information. We also use external fonts and icons, which may involve requests to third-party servers.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Questions?</h2>
              <p className="text-base leading-relaxed">
                If you have any questions about our privacy practices, please feel free to contact us at{" "}
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
