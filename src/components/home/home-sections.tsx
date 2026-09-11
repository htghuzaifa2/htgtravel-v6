"use client";

import Link from "next/link";
import {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, PlaneTakeoff,
  Clock, Globe, MessageCircle, MapPin, BadgeCheck, FileText,
  TrendingUp, Layers, ArrowRight, Send,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { FadeIn, Stagger, StaggerItem, HoverLift, MotionButton, AnimatedCounter } from "@/components/animations";
import { POPULAR_ROUTES, WHY_HTG_FEATURES, HOW_IT_WORKS_STEPS, AIRLINES } from "@/lib/data";
import { routeInquiry } from "@/lib/whatsapp";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, PlaneTakeoff,
  Clock, Globe, MessageCircle, MapPin, BadgeCheck, FileText, TrendingUp, Layers,
};

const services = [
  { icon: Plane, title: "Air Ticketing", description: "Book domestic and international flights with live fares from 20+ airlines. Official e-tickets issued directly.", link: "Book Flights", href: "/flights" },
  { icon: FileCheck, title: "Visa Consultation", description: "Tourist, business, Umrah, and student visas for 12+ countries. Document preparation and embassy guidance included.", link: "Explore Visas", href: "/visa" },
  { icon: ShieldCheck, title: "Umrah & Hajj", description: "Custom pilgrimage packages with hotels near Haram, direct flights, eVisa, and guided Ziyarat.", link: "View Packages", href: "/umrah" },
  { icon: Briefcase, title: "Travel Insurance", description: "Schengen-approved medical insurance, flight cancellation cover, and baggage protection.", link: "Get Insured", href: "/insurance" },
  { icon: Building2, title: "Hotel Bookings", description: "Verified hotels worldwide — from budget stays to 5-star Haram-view rooms. Confirmed vouchers for visa applications.", link: "Book Hotels", href: "/contact" },
  { icon: PlaneTakeoff, title: "Corporate Travel", description: "Dedicated account management, group fares, and invoice-ready billing for companies and organizations.", link: "Corporate Desk", href: "/corporate" },
];

const trustItems = [
  { icon: TrendingUp, label: "Live Airline Fares" },
  { icon: FileCheck, label: "Visa File Preparation" },
  { icon: MessageCircle, label: "24/7 WhatsApp Support" },
  { icon: Globe, label: "Pakistan-Wide Service" },
];

// ============ TRUST STRIP ============
export function TrustStrip() {
  return (
    <section className="bg-muted border-y border-border">
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <item.icon className="h-5 w-5 text-teal flex-shrink-0" />
                <span className="text-sm font-medium text-foreground dark:text-foreground">{item.label}</span>
              </div>
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </section>
  );
}

// ============ SERVICES GRID ============
export function ServicesGrid() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Services"
            title="Everything You Need for Your Journey"
            subtitle="From booking your seat to preparing your visa file — we handle it all from one desk."
          />
        </FadeIn>
        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <StaggerItem key={svc.title}>
              <HoverLift className="h-full">
                <Link
                  href={svc.href}
                  className="group block h-full bg-card rounded-2xl p-6 shadow-htg hover:shadow-htg-lg transition-all duration-300 border border-border/60"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                    <svc.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:text-gold transition-colors">
                    {svc.link}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// ============ POPULAR ROUTES ============
export function PopularRoutes() {
  return (
    <section className="py-16 lg:py-20 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Popular Flights"
            title="Most Requested Flights From Pakistan"
            subtitle="Fares change daily. Send us a message for today's best rate on your route."
          />
        </FadeIn>
        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <StaggerItem key={route.code}>
              <HoverLift className="h-full">
                <div className="bg-card rounded-2xl p-6 shadow-htg border border-border/60 hover:shadow-htg-lg transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-heading text-lg font-semibold text-foreground">{route.code}</p>
                      <p className="text-sm text-muted-foreground mt-1">{route.name}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                      {route.category}
                    </span>
                  </div>
                  <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {route.duration}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Plane className="h-3.5 w-3.5" /> {route.airlines.join(", ")}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
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
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn delay={0.2} className="mt-10 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors group"
          >
            Browse All Flight Routes
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

// ============ STATS (animated counters) ============
export function StatsSection() {
  const stats = [
    { value: 20, suffix: "+", label: "Airline Partners", icon: Plane },
    { value: 12, suffix: "+", label: "Visa Countries", icon: FileCheck },
    { value: 160, suffix: "+", label: "Flight Routes", icon: Globe },
    { value: 11, suffix: "", label: "Umrah Packages", icon: ShieldCheck },
  ];
  return (
    <section className="py-12 lg:py-16 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center glow-border">
                <stat.icon className="h-6 w-6 text-teal mx-auto mb-2" />
                <div className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1.8} />
                </div>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============ BENTO GRID (services + highlights) ============
export function BentoGrid() {
  return (
    <section className="py-16 lg:py-20 bg-background flight-paths-bg relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <FadeIn>
          <SectionHeading
            eyebrow="What We Do"
            title="One Desk. Every Travel Need."
            subtitle="Flights, visas, Umrah, insurance, hotels — all handled by one team on WhatsApp."
          />
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px]">
          {/* Big feature card — Flights (spans 2 cols, 2 rows on desktop) */}
          <FadeIn delay={0.05} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <Link href="/flights" className="group glass rounded-3xl p-8 h-full flex flex-col justify-between glow-border relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-teal/10 dark:bg-teal/20 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-cyan-500 text-white mb-4">
                  <Plane className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">Air Ticketing</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                  Book domestic and international flights with live fares from 20+ airlines. Official e-tickets issued directly to your WhatsApp.
                </p>
              </div>
              <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:text-gold transition-colors">
                Book Flights
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </FadeIn>

          {/* Visa card (spans 2 cols on desktop) */}
          <FadeIn delay={0.1} className="md:col-span-1 lg:col-span-2">
            <Link href="/visa" className="group glass rounded-3xl p-6 h-full flex flex-col justify-between glow-border relative overflow-hidden">
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 dark:bg-gold/20 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber-500 text-navy mb-3">
                  <FileCheck className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">Visa Consultation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Tourist, business, Umrah, student visas for 12+ countries.</p>
              </div>
              <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal group-hover:text-gold transition-colors">
                Explore Visas
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </FadeIn>

          {/* Umrah card */}
          <FadeIn delay={0.15}>
            <Link href="/umrah" className="group glass rounded-3xl p-6 h-full flex flex-col justify-between glow-border relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal/10 dark:bg-teal/20 rounded-full blur-xl group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal mb-2">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-1">Umrah &amp; Hajj</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Custom pilgrimage packages</p>
              </div>
            </Link>
          </FadeIn>

          {/* Insurance card */}
          <FadeIn delay={0.2}>
            <Link href="/insurance" className="group glass rounded-3xl p-6 h-full flex flex-col justify-between glow-border relative overflow-hidden">
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold mb-2">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-1">Travel Insurance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Schengen-approved coverage</p>
              </div>
            </Link>
          </FadeIn>

          {/* Corporate card (spans 2 cols on desktop) */}
          <FadeIn delay={0.25} className="md:col-span-1 lg:col-span-2">
            <Link href="/corporate" className="group glass rounded-3xl p-6 h-full flex flex-col justify-between glow-border relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">Corporate Travel</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Dedicated account management, group fares, invoice-ready billing.</p>
              </div>
              <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal group-hover:text-gold transition-colors">
                Corporate Desk
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
export function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Process" title="How It Works" />
        </FadeIn>
        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div className="text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 mb-5">
                  <span className="font-heading text-3xl font-bold text-gold">{step.number}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn delay={0.2} className="mt-12 text-center">
          <WhatsAppButton variant="gold" size="lg">
            <MessageCircle className="h-4 w-4" />
            Start on WhatsApp
          </WhatsAppButton>
        </FadeIn>
      </div>
    </section>
  );
}

// ============ WHY HTG ============
export function WhyHTG() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Why Choose Us" title="Why Travelers Choose HTG Travels" />
        </FadeIn>
        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_HTG_FEATURES.map((feat) => {
            const Icon = iconMap[feat.icon] ?? BadgeCheck;
            return (
              <StaggerItem key={feat.title}>
                <HoverLift>
                  <div className="flex items-start gap-4 bg-card rounded-2xl p-6 border border-border/60 shadow-htg hover:shadow-htg-lg transition-shadow h-full">
                    <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{feat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                </HoverLift>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0B1F2A] to-[#0A1530] py-16 lg:py-20">
      {/* Subtle ambient blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 bg-teal/10 dark:bg-teal/15 rounded-full blur-3xl pointer-events-none drift-blob"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold/10 dark:bg-gold/15 rounded-full blur-3xl pointer-events-none drift-blob-2"
      />
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <FadeIn className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
          Need a Ticket or Visa Consultation Today?
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
          Skip the queues. Send us your travel dates and passenger details on WhatsApp, and our team will find you the best live fares immediately.
        </p>
        <div className="mt-8">
          <MotionButton
            onClick={() => {
              window.open(
                "https://wa.me/923251480148?text=" + encodeURIComponent("Hi HTG Travels, I need a travel consultation."),
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy hover:brightness-110 transition shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="h-4 w-4" />
            Message +92 325 1480148 on WhatsApp
          </MotionButton>
        </div>
      </FadeIn>
    </section>
  );
}
