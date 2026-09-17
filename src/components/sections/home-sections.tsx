"use client";

import {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, PlaneTakeoff,
  Clock, Globe, Headphones, MapPin, BadgeCheck, FileText,
  TrendingUp, Layers, MessageCircle, TrendingDown, Star,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  POPULAR_ROUTES, VISA_COUNTRIES, UMRAH_PACKAGES, TESTIMONIALS,
  FAQS, WHY_HTG_FEATURES, HOW_IT_WORKS_STEPS,
} from "@/lib/data";
import { routeInquiry, umrahInquiry } from "@/lib/whatsapp";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, PlaneTakeoff,
  Clock, Globe, Headphones, MapPin, BadgeCheck, FileText,
  TrendingUp, Layers, MessageCircle, TrendingDown,
};

const services = [
  { icon: Plane, title: "Air Ticketing", description: "Book domestic and international flights with live fares from 20+ airlines. Official e-tickets issued directly.", link: "Book Flights →", href: "#flights" },
  { icon: FileCheck, title: "Visa Consultation", description: "Tourist, business, Umrah, and student visas for 12+ countries. Document preparation and embassy guidance included.", link: "Explore Visas →", href: "#visa" },
  { icon: ShieldCheck, title: "Umrah & Hajj", description: "Custom pilgrimage packages with hotels near Haram, direct flights, eVisa, and guided Ziyarat.", link: "View Packages →", href: "#umrah" },
  { icon: Briefcase, title: "Travel Insurance", description: "Schengen-approved medical insurance, flight cancellation cover, and baggage protection.", link: "Get Insured →", href: "#insurance" },
  { icon: Building2, title: "Hotel Bookings", description: "Verified hotels worldwide — from budget stays to 5-star Haram-view rooms. Confirmed vouchers for visa applications.", link: "Book Hotels →", href: "#contact" },
  { icon: PlaneTakeoff, title: "Corporate Travel", description: "Dedicated account management, group fares, and invoice-ready billing for companies and organizations.", link: "Corporate Desk →", href: "#corporate" },
];

const trustItems = [
  { icon: TrendingUp, label: "Live Airline Fares" },
  { icon: FileCheck, label: "Visa File Preparation" },
  { icon: MessageCircle, label: "24/7 WhatsApp Support" },
  { icon: MapPin, label: "Sialkot-Based Travel Desk" },
];

const umrahCards = UMRAH_PACKAGES.slice(0, 3);

const umrahBadgeClasses: Record<string, string> = {
  gold: "bg-gold/20 text-gold border-gold/30",
  teal: "bg-teal/20 text-teal border-teal/30",
  navy: "bg-white/10 text-white border-white/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
};

// ============ TRUST STRIP ============
export function TrustStrip() {
  return (
    <section className="bg-sand border-y border-[#E5E0D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 justify-center md:justify-start">
              <item.icon className="h-5 w-5 text-teal flex-shrink-0" />
              <span className="text-sm font-medium text-charcoal">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES GRID ============
export function ServicesGrid() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything You Need for Your Journey"
          subtitle="From booking your seat to preparing your visa file — we handle it all from one desk."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <a
              key={svc.title}
              href={svc.href}
              className="group bg-white rounded-2xl p-6 shadow-htg hover:shadow-htg-lg transition-all duration-300 hover:-translate-y-1 border border-[#E5E0D8]/60"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                <svc.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-navy mb-2">{svc.title}</h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">{svc.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-teal group-hover:text-gold transition-colors">
                {svc.link}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ POPULAR ROUTES ============
export function PopularRoutes() {
  return (
    <section className="py-16 lg:py-20 bg-sand/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Flights"
          title="Most Requested Flights From Sialkot"
          subtitle="Fares change daily. Send us a message for today's best rate on your route."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <div
              key={route.code}
              className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-heading text-lg font-semibold text-navy">{route.code}</p>
                  <p className="text-sm text-charcoal mt-1">{route.name}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-navy/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">
                  {route.category}
                </span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-muted-grey">
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {route.duration}
                </p>
                <p className="flex items-center gap-1.5">
                  <Plane className="h-3.5 w-3.5" /> {route.airlines.join(", ")}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                <p className="text-sm font-semibold text-teal mb-3">Live Rate on Request</p>
                <WhatsAppButton
                  message={routeInquiry(route.code, route.name)}
                  variant="outline"
                  size="sm"
                  fullWidth
                >
                  Get Live Fare
                </WhatsAppButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors"
          >
            Browse All 160+ Routes →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ VISA PATHWAYS ============
export function VisaPathways() {
  const cards = VISA_COUNTRIES.slice(0, 6);
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visa Consultation"
          title="Visa Consultation for Every Destination"
          subtitle="We handle document preparation, application filing, and embassy appointment guidance for 12+ countries."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((v) => (
            <div
              key={v.country}
              className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-heading text-2xl font-semibold text-navy flex items-center gap-2">
                    <span className="text-3xl">{v.flag}</span>
                    <span>{v.country}</span>
                  </p>
                </div>
              </div>
              <span className="mt-3 inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                {v.visaType}
              </span>
              <div className="mt-4 space-y-1.5 text-xs text-muted-grey">
                <p><span className="font-medium text-charcoal">Processing:</span> {v.processingTime}</p>
                <p><span className="font-medium text-charcoal">Key Req:</span> Passport copy, photo, CNIC</p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                <p className="text-sm font-semibold text-teal mb-3">Live Rate on Request</p>
                <WhatsAppButton
                  message={`Hi HTG Travels, I need visa consultation for ${v.country} (${v.visaType}). Please share requirements and fees.`}
                  variant="outline"
                  size="sm"
                  fullWidth
                >
                  Start Consultation
                </WhatsAppButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#visa"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors"
          >
            View All Visa Destinations →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ UMRAH SPOTLIGHT ============
export function UmrahSpotlight() {
  return (
    <section className="py-16 lg:py-20 pattern-navy relative overflow-hidden">
      <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Umrah & Hajj"
          title="Umrah & Hajj From Sialkot"
          subtitle="Custom pilgrimage packages with hotels near the Haram, direct flights from Sialkot, instant Saudi eVisa, and guided Ziyarat. Every package tailored to your dates and budget."
          variant="light"
        />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {umrahCards.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${umrahBadgeClasses[pkg.badgeStyle]}`}>
                {pkg.badge}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-white">{pkg.title}</h3>
              <p className="mt-2 text-xs text-white/60">{pkg.duration}</p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{pkg.description}</p>

              <div className="mt-5 space-y-2 text-xs text-white/70">
                <p><span className="font-semibold text-gold">Makkah:</span> {pkg.hotel.makkah}</p>
                <p><span className="font-semibold text-gold">Madinah:</span> {pkg.hotel.madinah}</p>
                <p><span className="font-semibold text-gold">Transport:</span> {pkg.hotel.transport}</p>
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-sm font-semibold text-teal mb-3">Live Rate on Request</p>
                <WhatsAppButton
                  message={umrahInquiry({ package: pkg.title })}
                  variant="gold"
                  size="sm"
                  fullWidth
                >
                  Request Quote
                </WhatsAppButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#umrah"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-white transition-colors"
          >
            View All Umrah Packages →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
export function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-sand/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy/5 mb-5">
                <span className="font-heading text-3xl font-bold text-gold">{step.number}</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-navy mb-2">{step.title}</h3>
              <p className="text-sm text-charcoal/80 leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <WhatsAppButton
            variant="gold"
            size="lg"
          >
            <MessageCircle className="h-4 w-4" />
            Start on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// ============ WHY HTG ============
export function WhyHTG() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Travelers Choose HTG Travels"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_HTG_FEATURES.map((feat) => {
            const Icon = iconMap[feat.icon] ?? Star;
            return (
              <div
                key={feat.title}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg hover:shadow-htg-lg transition-shadow"
              >
                <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-navy mb-1">{feat.title}</h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============
export function Testimonials() {
  return (
    <section className="py-16 lg:py-20 bg-sand/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Travelers Say"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg flex flex-col"
            >
              <div className="flex gap-0.5 text-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-charcoal leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 pt-5 border-t border-[#E5E0D8]">
                <p className="font-heading text-sm font-semibold text-navy">{t.name}</p>
                <p className="text-xs text-muted-grey">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FAQ PREVIEW ============
export function FAQPreview() {
  const previewFaqs = FAQS[0].items.slice(0, 4).concat(FAQS[1].items.slice(0, 1));
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
        />
        <div className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {previewFaqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-heading text-base font-semibold text-navy hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-charcoal/80 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#faq"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors"
          >
            View All FAQs →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
export function FinalCTA() {
  return (
    <section className="bg-gold py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight">
          Need a Ticket or Visa Consultation Today?
        </h2>
        <p className="mt-4 text-base md:text-lg text-navy/80 leading-relaxed max-w-2xl mx-auto">
          Skip the queues. Send us your travel dates and passenger details on WhatsApp, and our team will find you the best live fares immediately.
        </p>
        <div className="mt-8">
          <button
            onClick={() => {
              window.open("https://wa.me/923251480148?text=" + encodeURIComponent("Hi HTG Travels, I need a travel consultation."), "_blank", "noopener,noreferrer");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-7 py-3.5 text-sm font-semibold hover:bg-charcoal transition shadow-md"
            style={{ height: "52px" }}
          >
            <MessageCircle className="h-4 w-4" />
            Message +92 325 1480148 on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
