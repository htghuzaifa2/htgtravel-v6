"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle2, Plane, FileCheck, ArrowRight } from "lucide-react";
import { openWhatsApp, flightInquiry, visaInquiry } from "@/lib/whatsapp";
import { FadeIn } from "@/components/animations";

const PAKISTANI_AIRPORTS = [
  "Sialkot (SKT)",
  "Lahore (LHE)",
  "Islamabad (ISB)",
  "Karachi (KHI)",
  "Peshawar (PEW)",
  "Multan (MUX)",
  "Quetta (UET)",
  "Faisalabad (LYP)",
];
const DEST_COUNTRIES = ["United Arab Emirates", "Saudi Arabia", "United Kingdom", "Turkey", "Malaysia", "Thailand", "Qatar", "Oman", "United States"];
const DEST_AIRPORTS: Record<string, string[]> = {
  "United Arab Emirates": ["Dubai (DXB)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"],
  "Saudi Arabia": ["Jeddah (JED)", "Riyadh (RUH)", "Medinah (MED)", "Dammam (DMM)"],
  "United Kingdom": ["London Heathrow (LHR)", "Manchester (MAN)", "Birmingham (BHX)"],
  "Turkey": ["Istanbul (IST)", "Istanbul Sabiha (SAW)"],
  "Malaysia": ["Kuala Lumpur (KUL)"],
  "Thailand": ["Bangkok (BKK)"],
  "Qatar": ["Doha (DOH)"],
  "Oman": ["Muscat (MCT)"],
  "United States": ["New York (JFK)", "Chicago (ORD)"],
};
const TRAVELERS = ["1 Adult", "2 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children", "3 Adults", "4+ Adults", "Group (10+)"];
const VISA_TYPES: Record<string, string[]> = {
  "Saudi Arabia": ["Tourist eVisa", "Umrah Visa", "Business Visa"],
  "United Arab Emirates": ["Tourist eVisa (30 Days)", "Tourist eVisa (60 Days)", "Transit Visa"],
  "United Kingdom": ["Standard Visitor Visa", "Business Visitor Visa", "Family Visitor Visa"],
  "Turkey": ["Tourist Sticker Visa", "E-Visa"],
  "Malaysia": ["Tourist eVisa", "Business eVisa"],
  "Thailand": ["Tourist Visa", "Visa on Arrival"],
  "Qatar": ["Tourist eVisa", "Hayya Entry Visa"],
  "Oman": ["Tourist eVisa", "Business Visa"],
  "United States": ["B1/B2 Visitor Visa", "F-1 Student Visa"],
};
const NATIONALITIES = ["Pakistani", "Indian", "Bangladeshi", "Afghan", "Other"];

export function Hero() {
  const [tab, setTab] = useState<"flight" | "visa">("flight");

  // Flight form state
  const [originCountry, setOriginCountry] = useState("Pakistan");
  const [flyingFrom, setFlyingFrom] = useState("Sialkot (SKT)");
  const [destCountry, setDestCountry] = useState("United Arab Emirates");
  const [destTo, setDestTo] = useState("Dubai (DXB)");
  const [travelers, setTravelers] = useState("1 Adult");
  const [flightDate, setFlightDate] = useState("");

  // Visa form state
  const [visaCountry, setVisaCountry] = useState("Saudi Arabia");
  const [visaType, setVisaType] = useState("Tourist eVisa");
  const [visaDate, setVisaDate] = useState("");
  const [nationality, setNationality] = useState("Pakistani");

  const handleSubmit = () => {
    if (tab === "flight") {
      openWhatsApp(
        flightInquiry({
          tripType: "Round Trip",
          from: `${flyingFrom} (${originCountry})`,
          to: `${destTo} (${destCountry})`,
          date: flightDate || "Flexible",
          pax: travelers,
        })
      );
    } else {
      openWhatsApp(
        visaInquiry({
          country: visaCountry,
          visaType,
          date: visaDate || "Flexible",
          nationality,
        })
      );
    }
  };

  const getDestAirports = () => DEST_AIRPORTS[destCountry] ?? ["Capital City Airport"];

  return (
    <section className="relative overflow-hidden bg-background topo-bg">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — defensive: plain JSX, no framer-motion entrance animation.
              Content is visible by default; entrance reveal is handled by the
              defensive CSS `.reveal` system (scoped to html.js-anim). */}
          <FadeIn>
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal pill-modern"
              >
                <Send className="h-3 w-3" />
                Pakistan&apos;s Trusted Travel Desk
              </span>
              <h1
                className="mt-5 font-heading font-bold text-foreground leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-[56px] break-words"
              >
                Fly From Pakistan.{" "}
                <span className="text-gradient">Land Anywhere.</span>{" "}
                Visa Help Without the Guesswork.
              </h1>
              <p
                className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl break-words"
              >
                HTG Travels compares live airline fares and prepares your visa file step by step — all through WhatsApp. No confusing price lists. No waiting rooms. Just answers in minutes.
              </p>

              <div
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  onClick={() => setTab("flight")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300 ease-out"
                >
                  <Plane className="h-4 w-4" />
                  Request Flight Fare
                </button>
                <button
                  onClick={() => setTab("visa")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent border-2 border-foreground/30 text-foreground px-6 py-3 text-sm font-semibold hover:bg-foreground/10 hover:border-foreground/60 hover:-translate-y-0.5 backdrop-blur-sm active:scale-95 transition-all duration-300 ease-out"
                >
                  <FileCheck className="h-4 w-4" />
                  Ask Visa Expert
                </button>
              </div>

              <div
                className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
              >
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  Authorized ticketing for 20+ airlines
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  24/7 WhatsApp support
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  Pakistan-wide service
                </span>
              </div>

              <div>
                <Link
                  href="/destinations"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors group"
                >
                  Browse all flight routes
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Right Column — Quote Card.
              Defensive: removed framer-motion entrance animation (was causing
              the card to stay at opacity:0 if hydration failed). Card is now
              visible immediately; entrance reveal handled by FadeIn. */}
          <FadeIn delay={150}>
            <div className="glass rounded-3xl p-6 sm:p-8 min-h-[540px] flex flex-col">
              <Tabs value={tab} onValueChange={(v) => setTab(v as "flight" | "visa")} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-foreground/5 rounded-xl p-1 h-12 backdrop-blur-sm">
                  <TabsTrigger
                    value="flight"
                    className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md font-semibold rounded-lg transition-all"
                  >
                    Flight Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="visa"
                    className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-md font-semibold rounded-lg transition-all"
                  >
                    Visa Consultation
                  </TabsTrigger>
                </TabsList>

                {/* Flight Tab */}
                <TabsContent value="flight" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Flying From</label>
                      <Select value={flyingFrom} onValueChange={setFlyingFrom}>
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PAKISTANI_AIRPORTS.map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Destination Country</label>
                      <Select value={destCountry} onValueChange={setDestCountry}>
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DEST_COUNTRIES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Destination To</label>
                      <Select value={destTo} onValueChange={setDestTo}>
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getDestAirports().map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Travelers</label>
                      <Select value={travelers} onValueChange={setTravelers}>
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TRAVELERS.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Travel Date (Optional)</label>
                      <Input
                        type="date"
                        value={flightDate}
                        onChange={(e) => setFlightDate(e.target.value)}
                        className="h-11 input-recessed border-transparent"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground pt-1">
                    Get direct consultation and live rates from our experts on WhatsApp.
                  </p>

                  <button
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300 ease-out"
                  >
                    <Send className="h-4 w-4" />
                    Get Live Rate on WhatsApp
                  </button>
                </TabsContent>

                {/* Visa Tab */}
                <TabsContent value="visa" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Destination Country</label>
                      <Select
                        value={visaCountry}
                        onValueChange={(v) => {
                          setVisaCountry(v);
                          const types = VISA_TYPES[v];
                          if (types && !types.includes(visaType)) setVisaType(types[0]);
                        }}
                      >
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(VISA_TYPES).map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Visa Type</label>
                      <Select value={visaType} onValueChange={setVisaType}>
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(VISA_TYPES[visaCountry] || []).map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Travel Date</label>
                      <Input
                        type="date"
                        value={visaDate}
                        onChange={(e) => setVisaDate(e.target.value)}
                        className="h-11 input-recessed border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nationality</label>
                      <Select value={nationality} onValueChange={setNationality}>
                        <SelectTrigger className="h-11 input-recessed border-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {NATIONALITIES.map((n) => (
                            <SelectItem key={n} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground pt-1">
                    Get direct consultation and live rates from our experts on WhatsApp.
                  </p>

                  <button
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300 ease-out"
                  >
                    <Send className="h-4 w-4" />
                    Get Live Rate on WhatsApp
                  </button>
                </TabsContent>
              </Tabs>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
