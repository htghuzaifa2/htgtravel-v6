"use client";

import { useState } from "react";
import {
  Plane, Clock, MapPin, Building2, Send, CheckCircle2, ArrowRight,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { UMRAH_PACKAGES } from "@/lib/data";
import { umrahInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const umrahBadgeClasses: Record<string, string> = {
  gold: "bg-gold/20 text-gold border-gold/30",
  teal: "bg-teal/20 text-teal border-teal/30",
  navy: "bg-white/10 text-white border-white/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
};

const assistanceFeatures = [
  { icon: Clock, title: "Fast Saudi eVisa", description: "24 to 48 hours approval with mandatory Saudi medical insurance and multi-entry options." },
  { icon: Building2, title: "Courtyard Hotels", description: "Direct booking with verified Clock Tower, Swissotel, and Markaziyah hotels with Kaabah/Haram views." },
  { icon: Plane, title: "VIP Transfers", description: "Private GMC Yukon, Hiace, or 300 km/h Haramain Bullet Train tickets between Jeddah, Makkah & Madinah." },
  { icon: MapPin, title: "Guided Ziyarat", description: "Insightful historical Ziyarat tours in Makkah (Hira, Thawr) and Madinah (Quba, Uhud, Qiblatayn)." },
];

export default function UmrahPage() {
  const [duration, setDuration] = useState("10 Days");
  const [hotel, setHotel] = useState("4-Star Premium (150m)");
  const [pilgrims, setPilgrims] = useState("2 Pilgrims (Double)");
  const [month, setMonth] = useState("Next Month");

  const submitUmrah = () => {
    window.open(
      "https://wa.me/923251480148?text=" +
        encodeURIComponent(umrahInquiry({ duration, hotel, pilgrims, month })),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Umrah & Hajj"
        title="Tailored Pilgrimage Packages 2026"
        subtitle="Hajj & Umrah Services"
        intro="Experience a spiritually serene journey to the Holy Sanctuaries. We provide custom Umrah packages with 0-meter Haram hotels, direct flights from Pakistan, instant Saudi eVisas, and VIP GMC transfers tailored to your dates."
      />

      {/* Quote Builder */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-border">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-1">Custom Umrah Quote Builder</h2>
            <p className="text-xs text-muted-foreground mb-6">Tell us your preferences and we&apos;ll send a live quote on WhatsApp.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="h-11 bg-muted/60"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["7 Days (Quick Umrah)", "10 Days", "14 Days", "21 Days"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Hotel Category</label>
                <Select value={hotel} onValueChange={setHotel}>
                  <SelectTrigger className="h-11 bg-muted/60"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["5-Star VIP (0m Haram)", "4-Star Premium (150m)", "3-Star Economy (Shuttle)", "Custom"].map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Pilgrim Group</label>
                <Select value={pilgrims} onValueChange={setPilgrims}>
                  <SelectTrigger className="h-11 bg-muted/60"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["1 Pilgrim (Single Room)", "2 Pilgrims (Double)", "3-4 Pilgrims (Family)", "5+ Pilgrims (Group)"].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Travel Month</label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="h-11 bg-muted/60"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Current Month", "Next Month", "Ramadan", "Shawwal", "Custom Date"].map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Verified hotel vouchers, genuine eVisas, and transparent live quotations.</p>
            <button
              onClick={submitUmrah}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300 ease-out"
            >
              <Send className="h-4 w-4" />
              Get Instant Umrah Quotation on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Package List */}
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Packages"
            title="Choose Your Preferred Umrah Tier"
            subtitle="Each tier can be customized for your exact travel dates, airline choice, and room configuration. Contact us for today's live pricing."
          />
          <div className="mt-12 space-y-6">
            {UMRAH_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-card rounded-2xl border border-border/60 shadow-htg overflow-hidden hover:shadow-htg-lg transition-shadow"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", umrahBadgeClasses[pkg.badgeStyle])}>
                        {pkg.badge}
                      </span>
                      <h3 className="mt-3 font-heading text-xl lg:text-2xl font-semibold text-foreground">{pkg.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{pkg.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed mb-5">{pkg.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                    <div className="bg-muted/40 rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Makkah Hotel</p>
                      <p className="text-sm text-foreground">{pkg.hotel.makkah}</p>
                    </div>
                    <div className="bg-muted/40 rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Madinah Hotel</p>
                      <p className="text-sm text-foreground">{pkg.hotel.madinah}</p>
                    </div>
                    <div className="bg-muted/40 rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Transport</p>
                      <p className="text-sm text-foreground">{pkg.hotel.transport}</p>
                    </div>
                  </div>

                  <details className="group">
                    <summary className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-teal hover:text-gold transition-colors list-none">
                      <ArrowRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform" />
                      View All Inclusions
                    </summary>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pkg.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-xs text-foreground/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal flex-shrink-0 mt-0.5" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-teal">Pricing: Real-Time Rates on Request</p>
                    <WhatsAppButton
                      message={umrahInquiry({ package: pkg.title, duration: pkg.duration.split("|")[0].trim() })}
                      variant="gold"
                      size="sm"
                    >
                      Inquire Live Rates
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilgrimage Assistance */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Full Support"
            title="Complete Pilgrimage Assistance From Start to Finish"
            subtitle="We manage all logistics so you can dedicate your entire focus to prayers and worship."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assistanceFeatures.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/60 shadow-htg">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
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
        heading="Begin Your Pilgrimage Journey Today"
        body="Send us your preferred dates, group size, and budget on WhatsApp. We will build a custom Umrah or Hajj package for you."
        buttonLabel="Request Umrah Package on WhatsApp"
        icon={<Send className="h-4 w-4" />}
      />
    </>
  );
}
