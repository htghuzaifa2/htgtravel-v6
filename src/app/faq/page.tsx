import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about flights, visas, Umrah packages, insurance, payments, and support.",
};

// Build FAQ JSON-LD from the same data source — never drifts out of sync.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Answers to Common Travel Questions"
        intro="Everything you need to know about booking flights, processing visas, arranging Umrah, and getting travel insurance with HTG Travels."
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {FAQS.map((cat) => (
              <div key={cat.category}>
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">{cat.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {cat.items.map((faq, idx) => (
                    <AccordionItem key={idx} value={`${cat.category}-${idx}`}>
                      <AccordionTrigger className="text-left font-heading text-base font-semibold text-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Still Have Questions?"
        body="Message us on WhatsApp and we will reply within minutes."
        buttonLabel="Chat With Us on WhatsApp"
        icon={<MessageCircle className="h-4 w-4" />}
      />
    </>
  );
}
