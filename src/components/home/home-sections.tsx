"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, PlaneTakeoff,
  Clock, Globe, MessageCircle, MapPin, BadgeCheck, FileText,
  TrendingUp, Layers, ArrowRight, Send,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { FadeIn, Stagger, StaggerItem, HoverLift } from "@/components/animations";
import { POPULAR_ROUTES, WHY_HTG_FEATURES, HOW_IT_WORKS_STEPS } from "@/lib/data";
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
    <section className="bg-sand border-y border-[#E5E0D8] dark:border-border">
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <item.icon className="h-5 w-5 text-teal flex-shrink-0" />
                <span className="text-sm font-medium text-charcoal dark:text-foreground">{item.label}</span>
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
                  className="group block h-full bg-white dark:bg-card rounded-2xl p-6 shadow-htg hover:shadow-htg-lg transition-all duration-300 border border-[#E5E0D8]/60 dark:border-border"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                    <svc.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-navy dark:text-foreground mb-2">{svc.title}</h3>
                  <p className="text-sm text-charcoal/80 dark:text-muted-foreground leading-relaxed">{svc.description}</p>
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
    <section className="py-16 lg:py-20 bg-sand/40">
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
                <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 dark:border-border hover:shadow-htg-lg transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-heading text-lg font-semibold text-navy dark:text-foreground">{route.code}</p>
                      <p className="text-sm text-charcoal dark:text-muted-foreground mt-1">{route.name}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-navy/5 dark:bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy dark:text-foreground">
                      {route.category}
                    </span>
                  </div>
                  <div className="mt-4 space-y-1.5 text-xs text-muted-grey dark:text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {route.duration}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Plane className="h-3.5 w-3.5" /> {route.airlines.join(", ")}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#E5E0D8] dark:border-border">
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

// ============ HOW IT WORKS ============
export function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-sand/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="Process" title="How It Works" />
        </FadeIn>
        <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div className="text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy/5 dark:bg-white/5 mb-5">
                  <span className="font-heading text-3xl font-bold text-gold">{step.number}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy dark:text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-charcoal/80 dark:text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
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
                  <div className="flex items-start gap-4 bg-white dark:bg-card rounded-2xl p-6 border border-[#E5E0D8]/60 dark:border-border shadow-htg hover:shadow-htg-lg transition-shadow h-full">
                    <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy dark:text-foreground mb-1">{feat.title}</h3>
                      <p className="text-sm text-charcoal/80 dark:text-muted-foreground leading-relaxed">{feat.description}</p>
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
    <section className="bg-gold py-16 lg:py-20 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-navy/10 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <FadeIn className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight">
          Need a Ticket or Visa Consultation Today?
        </h2>
        <p className="mt-4 text-base md:text-lg text-navy/80 leading-relaxed max-w-2xl mx-auto">
          Skip the queues. Send us your travel dates and passenger details on WhatsApp, and our team will find you the best live fares immediately.
        </p>
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.open(
                "https://wa.me/923251480148?text=" + encodeURIComponent("Hi HTG Travels, I need a travel consultation."),
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-7 py-3.5 text-sm font-semibold hover:bg-charcoal transition shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            Message +92 325 1480148 on WhatsApp
          </motion.button>
        </div>
      </FadeIn>
    </section>
  );
}
