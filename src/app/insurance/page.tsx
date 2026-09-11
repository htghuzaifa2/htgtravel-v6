import type { Metadata } from "next";
import {
  ShieldCheck, PlaneTakeoff, Briefcase, Clock, BadgeCheck,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { INSURANCE_PLANS } from "@/lib/data";
import { insuranceInquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Travel Insurance for Visa & Peace of Mind",
  description:
    "Schengen-approved medical insurance, flight cancellation cover, and baggage protection. Instant issuance on WhatsApp.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  PlaneTakeoff,
  Luggage: Briefcase,
  Briefcase,
};

const whyInsured = [
  { icon: BadgeCheck, title: "Visa-Compliant", description: "Our Schengen plans meet all embassy requirements. Certificate issued same day." },
  { icon: ShieldCheck, title: "Verified Insurers", description: "We work with reputable local and international insurance providers." },
  { icon: Clock, title: "Instant Issuance", description: "Most policies issued within 2–4 hours on WhatsApp." },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Travel Insurance"
        title="Travel Insurance for Visa & Peace of Mind"
        subtitle="Medical, Cancellation & Baggage Protection"
        intro="Whether you need Schengen-approved medical coverage for a visa application or protection against flight cancellations, we provide insurance plans for every journey."
      />

      {/* Plans */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSURANCE_PLANS.map((plan) => {
              const Icon = iconMap[plan.icon] ?? ShieldCheck;
              return (
                <div key={plan.id} className="bg-white rounded-2xl p-6 lg:p-8 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground">Coverage: {plan.coverage}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{plan.description}</p>
                  <p className="text-xs text-muted-foreground mb-5"><span className="font-medium text-foreground">Best for:</span> {plan.bestFor}</p>
                  <div className="mt-auto pt-5 border-t border-[#E5E0D8]">
                    <p className="text-sm font-semibold text-teal mb-3">Price: Live Rate on Request</p>
                    <WhatsAppButton
                      message={insuranceInquiry(plan.name)}
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      Get Quote on WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Get Insured */}
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Us" title="Why Get Insured With HTG?" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyInsured.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg text-center">
                <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Travel Protected. Travel Confident."
        body="Message us on WhatsApp with your travel dates and destination. We will send you the best insurance options within minutes."
        buttonLabel="Get Insurance Quote on WhatsApp"
        icon={<ShieldCheck className="h-4 w-4" />}
      />
    </>
  );
}
