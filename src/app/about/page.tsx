import type { Metadata } from "next";
import {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, Clock, MapPin,
  Compass, Award, MessageCircle, Globe, Star, TrendingUp, Layers, Sparkles, CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export const metadata: Metadata = {
  title: "About HTG Travels — Pakistan's Trusted Travel Desk",
  description:
    "Learn about HTG Travels — our mission, values, and why travelers across Pakistan trust us for flights, visas, Umrah, and travel insurance.",
};

const features = [
  { icon: Globe, title: "Official Airline Ticketing", description: "Direct seat access across all Pakistani domestic airlines (PIA, AirSial, Fly Jinnah, Serene Air) and premier global carriers including Emirates, Qatar Airways, and Turkish Airlines." },
  { icon: FileCheck, title: "Visa Consultation & Processing", description: "End-to-end tourist and business visa assistance for UK, USA, Schengen, UAE, Saudi Arabia, Turkey, Malaysia, and more — from documentation to embassy appointments." },
  { icon: Compass, title: "Tailored Travel Planning", description: "Every trip is customized around your budget and schedule. We arrange flights, verified hotels, travel insurance, and ground transport on demand." },
  { icon: Award, title: "Dynamic Real-Time Pricing", description: "No rigid outdated price lists. We quote live real-time airfares and hotel rates so you get the best value on your exact dates." },
  { icon: MessageCircle, title: "24/7 WhatsApp Support", description: "Instant response on WhatsApp for emergency flight bookings, date changes, visa submissions, and on-trip assistance." },
  { icon: ShieldCheck, title: "Trusted & Verified", description: "Trusted travel desk ensuring safe transactions, valid airline e-tickets, authentic hotel vouchers, and verified visa processing." },
];

const differences = [
  { icon: TrendingUp, title: "No rigid price traps", description: "Real-time airfare and seasonal accommodation quotes. You see what we see." },
  { icon: Layers, title: "Flights + Visa + Insurance", description: "Complete travel solutions from a single desk. No running between agents." },
  { icon: MessageCircle, title: "Dedicated WhatsApp Desk", description: "Instant ticketing, date changes, and customer care. One number for everything." },
];

const values = [
  { title: "Transparency", description: "Real-time fares and clear service charges. No hidden fees." },
  { title: "Speed", description: "WhatsApp replies within minutes during working hours." },
  { title: "Care", description: "We guide you through documents, dates, and embassy steps." },
  { title: "Accuracy", description: "Verified tickets, hotel vouchers, and visa checklists." },
];

const services = [
  "Air ticketing for domestic and international airlines.",
  "Tourist and business visa consultation.",
  "Umrah and Hajj travel arrangements.",
  "Travel medical and cancellation insurance.",
  "Hotel bookings and group travel.",
  "Corporate travel accounts and invoicing.",
];

const quickLinks = [
  { icon: Plane, title: "Instant Air Ticketing", description: "Live seat reservations on all domestic & international airlines with official e-tickets.", href: "/flights" },
  { icon: FileCheck, title: "Visa Consultation Desk", description: "Fast-track tourist & business eVisas, dedicated embassy appointments and file prep.", href: "/visa" },
  { icon: ShieldCheck, title: "Travel Insurance", description: "Schengen-approved medical insurance, flight cancellation & baggage protection.", href: "/insurance" },
  { icon: MessageCircle, title: "24/7 WhatsApp Support", description: "Rapid response for urgent bookings, date changes, live pricing and on-trip support.", href: "/contact" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HTG Travels"
        title="Our Mission & Promise"
        subtitle="Pakistan's Trusted Travel Desk"
        intro="Welcome to HTG Travels — your modern travel desk based in Sialkot, Punjab, Pakistan. We specialize in fast airline ticketing, expert visa consultation, and tailored travel planning for Pakistani travelers across the country and worldwide."
      />

      {/* Who We Are */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-5">
            A Travel Desk Built on Transparency & Speed
          </h2>
          <div className="space-y-4 text-base text-foreground/85 leading-relaxed">
            <p>
              In a world where airline fares and hotel rates fluctuate daily, travelers need honesty, real-time rates, and instant communication. At HTG Travels, we don&apos;t lock you into rigid overpriced packages. Instead, we connect directly with global airline reservation engines and verified hotel suppliers to give you customized live quotes within minutes on WhatsApp.
            </p>
            <p>
              We are not a faceless online booking portal. We are a local team based in Sialkot, and every inquiry you send reaches a real person who knows the routes, the airlines, and the visa processes. Whether you are flying from Lahore, Karachi, Islamabad, Sialkot, or any other Pakistani city — whether you are heading to Dubai for work, London for family, or Makkah for Umrah — we treat your journey like our own.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differences.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travelers Rely */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-teal mb-3">Our Strengths</span>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Why Travelers Rely on HTG Travels</h2>
            <p className="mt-3 text-base text-foreground/80">Fast, reliable, and tailored to your journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <feat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-teal mb-3">Our Values</span>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" />
                  {v.title}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E5E0D8]/60">
                <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready CTA */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Ready to Plan Your Next Journey?
          </h2>
          <p className="text-base text-foreground/80 mb-6 max-w-2xl mx-auto">
            Get in touch with our travel team on WhatsApp to get real-time airfares, visa consultation, or travel insurance quotations.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <MessageCircle className="h-4 w-4" />
            Message Us on WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((q) => (
              <a key={q.title} href={q.href} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow block">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-foreground mb-4">
                  <q.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{q.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{q.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
