import type { Metadata } from "next";
import {
  FileCheck, Clock, FileText, BadgeCheck, ShieldCheck, CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { VISA_COUNTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "UK, USA, Schengen & UAE Visa Consultation",
  description:
    "Fast tourist visa processing for Saudi Arabia, UAE, UK, Turkey, Malaysia, Schengen, and more. Document prep included. 12+ countries.",
};

const whyProcess = [
  { icon: FileCheck, title: "Document Scrutiny", description: "Every document is thoroughly pre-checked before embassy submission to minimize chances of delays or rejections." },
  { icon: Clock, title: "Express Fast-Track", description: "Emergency travel? We provide urgent processing options for Dubai and Azerbaijan eVisas within hours." },
  { icon: FileText, title: "Ticket & Hotel Vouchers", description: "We provide confirmed return flight itineraries and verified hotel reservations required for embassy visa applications." },
];

const processSteps = [
  { step: "1", title: "Consultation", description: "Message us on WhatsApp with your destination and travel purpose. We explain the requirements." },
  { step: "2", title: "Document Checklist", description: "We send you a personalized list of documents needed for your specific visa." },
  { step: "3", title: "File Preparation", description: "You share your documents. We review, organize, and prepare your file." },
  { step: "4", title: "Appointment Guidance", description: "For visas requiring biometrics or interviews, we guide you through booking and preparation." },
  { step: "5", title: "Submission & Follow-Up", description: "We submit your application and track its progress until a decision is made." },
];

export default function VisaPage() {
  return (
    <>
      <PageHero
        eyebrow="Visa Consultation"
        title="Worldwide Visa Consultancy Desk"
        subtitle="Tourist & Visit Visa Services"
        intro="Fast, hassle-free tourist visa processing for Saudi Arabia, Dubai (UAE), Azerbaijan, Turkey, Malaysia, Thailand, and international destinations. Message us on WhatsApp for rapid approvals."
      />

      {/* Visa Cards */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Destinations"
            title="Choose Your Destination Country"
            subtitle="Official visa processing fees and embassy requirements are quoted according to current government exchange rates."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISA_COUNTRIES.map((v) => (
              <div key={v.country} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                    <span className="text-3xl">{v.flag}</span>
                    <span>{v.country}</span>
                  </p>
                </div>
                <span className="mt-3 inline-flex self-start items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                  {v.visaType}
                </span>
                <div className="mt-4 space-y-2 text-xs">
                  <p className="text-foreground/80"><span className="font-medium text-muted-foreground">Processing Time: </span>{v.processingTime}</p>
                  <p className="text-foreground/80"><span className="font-medium text-muted-foreground">Visa Validity: </span>{v.validity}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Basic Requirements:</p>
                  <ul className="space-y-1.5">
                    {v.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-1.5 text-xs text-foreground/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal flex-shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 pt-4 border-t border-[#E5E0D8]">
                  <p className="text-sm font-semibold text-teal mb-3">Visa Fee: Live Rate on Request</p>
                  <WhatsAppButton
                    message={`Hi HTG Travels, I need visa consultation for ${v.country} (${v.visaType}). Please share requirements and live processing fees.`}
                    variant="outline"
                    size="sm"
                    fullWidth
                  >
                    Apply on WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Process With HTG */}
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Why Process Your Visa With HTG Travels?"
            subtitle="We handle end-to-end documentation, photo specifications, cover letters, and embassy appointments."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyProcess.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="How Your Visa Application Works" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-5 border border-[#E5E0D8]/60 shadow-htg text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold font-heading text-base font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Start Your Visa Application Today"
        body="Send us your destination and travel date on WhatsApp. We will reply with the full requirements and live processing fees."
        buttonLabel="Start Visa Consultation on WhatsApp"
        icon={<FileCheck className="h-4 w-4" />}
      />
    </>
  );
}
