"use client";

import { useState, useMemo } from "react";
import {
  Plane, FileCheck, ShieldCheck, Building2, Briefcase, Clock, MapPin,
  CheckCircle2, Search, Send, Mail, MessageCircle, Compass, Award,
  Users, Globe, Star, FileText, Sparkles, ArrowRight,
  TrendingUp, PlaneTakeoff, Luggage, BadgeCheck, Layers,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import {
  AIRLINES, ALL_ROUTES, VISA_COUNTRIES, UMRAH_PACKAGES, INSURANCE_PLANS,
  FAQS, BLOG_POSTS,
} from "@/lib/data";
import {
  routeInquiry, umrahInquiry, insuranceInquiry,
  corporateInquiry, contactInquiry,
} from "@/lib/whatsapp";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const umrahBadgeClasses: Record<string, string> = {
  gold: "bg-gold/20 text-gold border-gold/30",
  teal: "bg-teal/20 text-teal border-teal/30",
  navy: "bg-white/10 text-white border-white/30",
  red: "bg-red-500/20 text-red-300 border-red-500/30",
};

const insuranceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  PlaneTakeoff,
  Luggage,
  Briefcase,
};

// =================== ABOUT SECTION ===================
export function AboutSection() {
  const features = [
    { icon: Globe, title: "Official Airline Ticketing", description: "Direct seat access across all Pakistani domestic airlines (PIA, AirSial, Fly Jinnah, Serene Air) and premier global carriers including Emirates, Qatar Airways, and Turkish Airlines." },
    { icon: FileCheck, title: "Visa Consultation & Processing", description: "End-to-end tourist and business visa assistance for UK, USA, Schengen, UAE, Saudi Arabia, Turkey, Malaysia, and more — from documentation to embassy appointments." },
    { icon: Compass, title: "Tailored Travel Planning", description: "Every trip is customized around your budget and schedule. We arrange flights, verified hotels, travel insurance, and ground transport on demand." },
    { icon: Award, title: "Dynamic Real-Time Pricing", description: "No rigid outdated price lists. We quote live real-time airfares and hotel rates so you get the best value on your exact dates." },
    { icon: MessageCircle, title: "24/7 WhatsApp Support", description: "Instant response on WhatsApp for emergency flight bookings, date changes, visa submissions, and on-trip assistance." },
    { icon: ShieldCheck, title: "Trusted & Verified", description: "Trusted travel desk in Sialkot ensuring safe transactions, valid airline e-tickets, authentic hotel vouchers, and verified visa processing." },
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
    { icon: Plane, title: "Instant Air Ticketing", description: "Live seat reservations on all domestic & international airlines with official e-tickets." },
    { icon: FileCheck, title: "Visa Consultation Desk", description: "Fast-track tourist & business eVisas, dedicated embassy appointments and file prep." },
    { icon: ShieldCheck, title: "Travel Insurance", description: "Schengen-approved medical insurance, flight cancellation & baggage protection." },
    { icon: MessageCircle, title: "24/7 WhatsApp Support", description: "Rapid response for urgent bookings, date changes, live pricing and on-trip support." },
  ];

  const differences = [
    { icon: TrendingUp, title: "No rigid price traps", description: "Real-time airfare and seasonal accommodation quotes. You see what we see." },
    { icon: Layers, title: "Flights + Visa + Insurance", description: "Complete travel solutions from a single desk. No running between agents." },
    { icon: MessageCircle, title: "Dedicated WhatsApp Desk", description: "Instant ticketing, date changes, and customer care. One number for everything." },
  ];

  return (
    <section id="about" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            About HTG Travels
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Our Mission & Promise
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Your Trusted Travel Desk in Sialkot</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Welcome to HTG Travels — your modern travel desk based in Sialkot, Punjab, Pakistan. We specialize in fast airline ticketing, expert visa consultation, and tailored travel planning for destinations worldwide.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-5">
            A Travel Desk Built on Transparency & Speed
          </h2>
          <div className="space-y-4 text-base text-charcoal/85 leading-relaxed">
            <p>
              In a world where airline fares and hotel rates fluctuate daily, travelers need honesty, real-time rates, and instant communication. At HTG Travels, we don&apos;t lock you into rigid overpriced packages. Instead, we connect directly with global airline reservation engines and verified hotel suppliers to give you customized live quotes within minutes on WhatsApp.
            </p>
            <p>
              We are not a faceless online booking portal. We are a local team based in Sialkot, and every inquiry you send reaches a real person who knows the routes, the airlines, and the visa processes. Whether you are flying to Dubai for work, London for family, or Makkah for Umrah — we treat your journey like our own.
            </p>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-sand/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy text-center mb-10">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differences.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Travelers Rely */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Strengths"
            title="Why Travelers Rely on HTG Travels"
            subtitle="Fast, reliable, and tailored to your journey."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <feat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">{feat.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-sand/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Values" title="Our Values" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60">
                <h3 className="font-heading text-lg font-semibold text-navy mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold" />
                  {v.title}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-6 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E5E0D8]/60">
                <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ready CTA */}
      <div className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-4">
            Ready to Plan Your Next Journey?
          </h2>
          <p className="text-base text-charcoal/80 mb-6 max-w-2xl mx-auto">
            Get in touch with our travel team on WhatsApp to get real-time airfares, visa consultation, or travel insurance quotations.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <MessageCircle className="h-4 w-4" />
            Message Us on WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      {/* Quick Links */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((q) => (
              <div key={q.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy mb-4">
                  <q.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{q.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{q.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =================== FLIGHTS SECTION ===================
export function FlightsSection() {
  const [tripType, setTripType] = useState<"round" | "oneway">("round");
  const [originCountry, setOriginCountry] = useState("Pakistan");
  const [fromAirport, setFromAirport] = useState("Sialkot (SKT)");
  const [destCountry, setDestCountry] = useState("United Arab Emirates");
  const [toAirport, setToAirport] = useState("Dubai (DXB)");
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [paxClass, setPaxClass] = useState("1 Adult, Economy");

  const PAKISTANI_AIRPORTS = ["Sialkot (SKT)", "Lahore (LHE)", "Islamabad (ISB)", "Karachi (KHI)", "Peshawar (PEW)", "Multan (MUX)", "Quetta (UET)"];
  const DEST_AIRPORTS: Record<string, string[]> = {
    "United Arab Emirates": ["Dubai (DXB)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"],
    "Saudi Arabia": ["Jeddah (JED)", "Riyadh (RUH)", "Medinah (MED)"],
    "United Kingdom": ["London Heathrow (LHR)", "Manchester (MAN)", "Birmingham (BHX)"],
  };

  const submit = () => {
    const msg = `Hi HTG Travels, I need a flight quote.\n\nTrip Type: ${tripType === "round" ? "Round Trip" : "One Way"}\nFrom: ${fromAirport} (${originCountry})\nTo: ${toAirport} (${destCountry})\nDeparture: ${depDate || "Flexible"}\n${tripType === "round" ? `Return: ${retDate || "Flexible"}\n` : ""}Passengers: ${paxClass}\n\nPlease share live rates.`;
    window.open("https://wa.me/923251480148?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
  };

  const whyBook = [
    { icon: TrendingUp, title: "Live Fares, Not Old Prices", description: "We quote real-time airfares based on your exact dates, not outdated price lists." },
    { icon: FileText, title: "Official E-Tickets", description: "Every booking comes with a valid airline e-ticket sent to your WhatsApp and email." },
    { icon: Clock, title: "Urgent Bookings Welcome", description: "Need a ticket in the next few hours? We prioritize emergency bookings." },
    { icon: CheckCircle2, title: "Date Change Support", description: "Plans changed? We handle rescheduling and rebooking for you." },
  ];

  return (
    <section id="flights" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Flights
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Official Airline Ticketing Desk
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Domestic & International Air Tickets</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Book real-time seats across all domestic Pakistani airlines (PIA, AirSial, Fly Jinnah, Serene) and premier global carriers. Message us for instant live airfares and official e-tickets.
          </p>
        </div>
      </div>

      {/* Quote Form */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-[#E5E0D8]">
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setTripType("round")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition",
                  tripType === "round" ? "bg-navy text-white" : "bg-sand/60 text-charcoal hover:bg-sand"
                )}
              >
                Round Trip (Return)
              </button>
              <button
                onClick={() => setTripType("oneway")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition",
                  tripType === "oneway" ? "bg-navy text-white" : "bg-sand/60 text-charcoal hover:bg-sand"
                )}
              >
                One Way
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Origin Country</label>
                <Select value={originCountry} onValueChange={setOriginCountry}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Departure Airport</label>
                <Select value={fromAirport} onValueChange={setFromAirport}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {originCountry === "Pakistan" ? PAKISTANI_AIRPORTS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>) : <SelectItem value="Capital City Airport">Capital City Airport</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Destination Country</label>
                <Select value={destCountry} onValueChange={setDestCountry}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(DEST_AIRPORTS).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Arrival Airport</label>
                <Select value={toAirport} onValueChange={setToAirport}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(DEST_AIRPORTS[destCountry] || []).map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Departure Date</label>
                <Input type="date" value={depDate} onChange={(e) => setDepDate(e.target.value)} className="h-11 bg-sand/50" />
              </div>
              {tripType === "round" && (
                <div>
                  <label className="text-xs font-medium text-muted-grey mb-1.5 block">Return Date</label>
                  <Input type="date" value={retDate} onChange={(e) => setRetDate(e.target.value)} className="h-11 bg-sand/50" />
                </div>
              )}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Passengers & Class</label>
                <Select value={paxClass} onValueChange={setPaxClass}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["1 Adult, Economy", "2 Adults, Economy", "1 Adult, Business", "2 Adults, Business", "Family (Economy)", "Group (10+)"].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-grey">
              Instant live seat check & direct WhatsApp confirmation with e-ticket voucher.
            </p>
            <button
              onClick={submit}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
            >
              <Send className="h-4 w-4" />
              Check Live Rates & Book on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Airlines */}
      <div className="bg-sand/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Partners"
            title="Direct Ticketing Partners for Domestic & International Airlines"
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {AIRLINES.map((a) => (
              <div key={a} className="bg-white rounded-xl p-4 text-center border border-[#E5E0D8]/60 shadow-sm hover:shadow-md transition">
                <p className="font-heading text-sm font-semibold text-navy">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Book With HTG */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Book With Us" title="Why Book Your Flight With HTG Travels" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBook.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Ready to Book Your Flight?</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Send us your route and dates on WhatsApp. We will reply with live fares and available options within minutes.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <Plane className="h-4 w-4" />
            Get Live Fare on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== VISA SECTION ===================
export function VisaSection() {
  return (
    <section id="visa" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Visa Consultation
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Worldwide Visa Consultancy Desk
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Tourist & Visit Visa Services</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Fast, hassle-free tourist visa processing for Saudi Arabia, Dubai (UAE), Azerbaijan, Turkey, Malaysia, Thailand, and international destinations. Message us on WhatsApp for rapid approvals.
          </p>
        </div>
      </div>

      {/* Visa Cards */}
      <div className="py-16 lg:py-20">
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
                  <p className="font-heading text-xl font-semibold text-navy flex items-center gap-2">
                    <span className="text-3xl">{v.flag}</span>
                    <span>{v.country}</span>
                  </p>
                </div>
                <span className="mt-3 inline-flex self-start items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                  {v.visaType}
                </span>
                <div className="mt-4 space-y-2 text-xs">
                  <p className="text-charcoal/80"><span className="font-medium text-muted-grey">Processing Time: </span>{v.processingTime}</p>
                  <p className="text-charcoal/80"><span className="font-medium text-muted-grey">Visa Validity: </span>{v.validity}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                  <p className="text-xs font-medium text-muted-grey mb-2">Basic Requirements:</p>
                  <ul className="space-y-1.5">
                    {v.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-1.5 text-xs text-charcoal/80">
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
      </div>

      {/* Why Process With HTG */}
      <div className="bg-sand/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Why Process Your Visa With HTG Travels?"
            subtitle="We handle end-to-end documentation, photo specifications, cover letters, and embassy appointments."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FileCheck, title: "Document Scrutiny", description: "Every document is thoroughly pre-checked before embassy submission to minimize chances of delays or rejections." },
              { icon: Clock, title: "Express Fast-Track", description: "Emergency travel? We provide urgent processing options for Dubai and Azerbaijan eVisas within hours." },
              { icon: FileText, title: "Ticket & Hotel Vouchers", description: "We provide confirmed return flight itineraries and verified hotel reservations required for embassy visa applications." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="How Your Visa Application Works" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Consultation", description: "Message us on WhatsApp with your destination and travel purpose. We explain the requirements." },
              { step: "2", title: "Document Checklist", description: "We send you a personalized list of documents needed for your specific visa." },
              { step: "3", title: "File Preparation", description: "You share your documents. We review, organize, and prepare your file." },
              { step: "4", title: "Appointment Guidance", description: "For visas requiring biometrics or interviews, we guide you through booking and preparation." },
              { step: "5", title: "Submission & Follow-Up", description: "We submit your application and track its progress until a decision is made." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-5 border border-[#E5E0D8]/60 shadow-htg text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold font-heading text-base font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-heading text-sm font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-xs text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Start Your Visa Application Today</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Send us your destination and travel date on WhatsApp. We will reply with the full requirements and live processing fees.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <FileCheck className="h-4 w-4" />
            Start Visa Consultation on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== UMRAH SECTION ===================
export function UmrahSection() {
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
    <section id="umrah" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Umrah & Hajj
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Tailored Pilgrimage Packages 2026
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Hajj & Umrah Services</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Experience a spiritually serene journey to the Holy Sanctuaries. We provide custom Umrah packages with 0-meter Haram hotels, direct flights, instant Saudi eVisas, and VIP GMC transfers tailored to your dates.
          </p>
        </div>
      </div>

      {/* Quote Builder */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-[#E5E0D8]">
            <h2 className="font-heading text-xl font-semibold text-navy mb-1">Custom Umrah Quote Builder</h2>
            <p className="text-xs text-muted-grey mb-6">Tell us your preferences and we&apos;ll send a live quote on WhatsApp.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["7 Days (Quick Umrah)", "10 Days", "14 Days", "21 Days"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Hotel Category</label>
                <Select value={hotel} onValueChange={setHotel}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["5-Star VIP (0m Haram)", "4-Star Premium (150m)", "3-Star Economy (Shuttle)", "Custom"].map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Pilgrim Group</label>
                <Select value={pilgrims} onValueChange={setPilgrims}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["1 Pilgrim (Single Room)", "2 Pilgrims (Double)", "3-4 Pilgrims (Family)", "5+ Pilgrims (Group)"].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Travel Month</label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Current Month", "Next Month", "Ramadan", "Shawwal", "Custom Date"].map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-grey">Verified hotel vouchers, genuine eVisas, and transparent live quotations.</p>
            <button
              onClick={submitUmrah}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
            >
              <Send className="h-4 w-4" />
              Get Instant Umrah Quotation on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Package List */}
      <div className="bg-sand/40 py-16 lg:py-20">
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
                className="bg-white rounded-2xl border border-[#E5E0D8]/60 shadow-htg overflow-hidden hover:shadow-htg-lg transition-shadow"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", umrahBadgeClasses[pkg.badgeStyle])}>
                        {pkg.badge}
                      </span>
                      <h3 className="mt-3 font-heading text-xl lg:text-2xl font-semibold text-navy">{pkg.title}</h3>
                      <p className="mt-1 text-xs text-muted-grey">{pkg.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal/80 leading-relaxed mb-5">{pkg.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                    <div className="bg-sand/40 rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-grey uppercase tracking-wide mb-1">Makkah Hotel</p>
                      <p className="text-sm text-charcoal">{pkg.hotel.makkah}</p>
                    </div>
                    <div className="bg-sand/40 rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-grey uppercase tracking-wide mb-1">Madinah Hotel</p>
                      <p className="text-sm text-charcoal">{pkg.hotel.madinah}</p>
                    </div>
                    <div className="bg-sand/40 rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-grey uppercase tracking-wide mb-1">Transport</p>
                      <p className="text-sm text-charcoal">{pkg.hotel.transport}</p>
                    </div>
                  </div>

                  <details className="group">
                    <summary className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-teal hover:text-gold transition-colors list-none">
                      <ArrowRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform" />
                      View All Inclusions
                    </summary>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pkg.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-xs text-charcoal/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal flex-shrink-0 mt-0.5" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="mt-6 pt-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
      </div>

      {/* Pilgrimage Assistance */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Full Support"
            title="Complete Pilgrimage Assistance From Start to Finish"
            subtitle="We manage all logistics so you can dedicate your entire focus to prayers and worship."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Fast Saudi eVisa", description: "24 to 48 hours approval with mandatory Saudi medical insurance and multi-entry options." },
              { icon: Building2, title: "Courtyard Hotels", description: "Direct booking with verified Clock Tower, Swissotel, and Markaziyah hotels with Kaabah/Haram views." },
              { icon: Plane, title: "VIP Transfers", description: "Private GMC Yukon, Hiace, or 300 km/h Haramain Bullet Train tickets between Jeddah, Makkah & Madinah." },
              { icon: MapPin, title: "Guided Ziyarat", description: "Insightful historical Ziyarat tours in Makkah (Hira, Thawr) and Madinah (Quba, Uhud, Qiblatayn)." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Begin Your Pilgrimage Journey Today</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Send us your preferred dates, group size, and budget on WhatsApp. We will build a custom Umrah or Hajj package for you.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <Send className="h-4 w-4" />
            Request Umrah Package on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== INSURANCE SECTION ===================
export function InsuranceSection() {
  return (
    <section id="insurance" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Travel Insurance
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Travel Insurance for Visa & Peace of Mind
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Medical, Cancellation & Baggage Protection</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Whether you need Schengen-approved medical coverage for a visa application or protection against flight cancellations, we provide insurance plans for every journey.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSURANCE_PLANS.map((plan) => {
              const Icon = insuranceIconMap[plan.icon] ?? ShieldCheck;
              return (
                <div key={plan.id} className="bg-white rounded-2xl p-6 lg:p-8 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy">{plan.name}</h3>
                      <p className="text-xs text-muted-grey">Coverage: {plan.coverage}</p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/80 leading-relaxed mb-3">{plan.description}</p>
                  <p className="text-xs text-muted-grey mb-5"><span className="font-medium text-charcoal">Best for:</span> {plan.bestFor}</p>
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
      </div>

      {/* Why Get Insured */}
      <div className="bg-sand/40 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Us" title="Why Get Insured With HTG?" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BadgeCheck, title: "Visa-Compliant", description: "Our Schengen plans meet all embassy requirements. Certificate issued same day." },
              { icon: ShieldCheck, title: "Verified Insurers", description: "We work with reputable local and international insurance providers." },
              { icon: Clock, title: "Instant Issuance", description: "Most policies issued within 2–4 hours on WhatsApp." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg text-center">
                <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Travel Protected. Travel Confident.</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Message us on WhatsApp with your travel dates and destination. We will send you the best insurance options within minutes.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <ShieldCheck className="h-4 w-4" />
            Get Insurance Quote on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== DESTINATIONS SECTION ===================
export function DestinationsSection() {
  const [filter, setFilter] = useState<"all" | "Domestic" | "International">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    let list = ALL_ROUTES;
    if (filter !== "all") list = list.filter((r) => r.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) =>
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.airlines.join(",").toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageRoutes = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <section id="destinations" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Destinations
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            160+ Routes From Pakistan
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Domestic & International Flight Destinations</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Browse our most requested routes or search for your specific destination. Every route is quoted with live fares on WhatsApp.
          </p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 mb-8 items-center justify-between">
            <Tabs value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
              <TabsList className="bg-sand">
                <TabsTrigger value="all" className="data-[state=active]:bg-navy data-[state=active]:text-white">All</TabsTrigger>
                <TabsTrigger value="Domestic" className="data-[state=active]:bg-navy data-[state=active]:text-white">Domestic</TabsTrigger>
                <TabsTrigger value="International" className="data-[state=active]:bg-navy data-[state=active]:text-white">International</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-grey" />
              <Input
                placeholder="Search routes (e.g. Sialkot, Dubai, SKT, London, International...)"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 bg-white border-[#E5E0D8] h-10"
              />
            </div>
          </div>

          <p className="text-xs text-muted-grey mb-6">
            Showing {pageRoutes.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{(currentPage - 1) * perPage + pageRoutes.length} of {filtered.length} flight routes · Page {currentPage} of {totalPages}
          </p>

          {pageRoutes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E0D8]/60">
              <p className="text-charcoal mb-4">No routes found matching your search.</p>
              <WhatsAppButton message={`Hi HTG Travels, I'm looking for a flight route that I couldn't find on your site. Can you help?`} variant="primary" size="md">
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageRoutes.map((route) => (
                <div key={route.code} className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-heading text-base font-semibold text-navy">{route.code}</p>
                      <p className="text-sm text-charcoal">{route.name}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="inline-flex items-center rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy">
                        {route.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                        {route.frequency}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal/80 leading-relaxed mb-3">{route.description}</p>
                  <div className="space-y-1 text-xs text-muted-grey mb-4">
                    <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {route.duration}</p>
                    <p className="flex items-center gap-1.5"><Plane className="h-3.5 w-3.5" /> {route.airlines.join(", ")}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#E5E0D8]">
                    <p className="text-sm font-semibold text-teal mb-3">Live Rate on Request</p>
                    <WhatsAppButton
                      message={routeInquiry(route.code, route.name)}
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      Inquire Rates
                    </WhatsAppButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded-md border border-[#E5E0D8] bg-white text-charcoal disabled:opacity-40 hover:bg-sand transition"
              >
                ← Prev
              </button>
              <span className="px-3 text-sm text-charcoal">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm rounded-md border border-[#E5E0D8] bg-white text-charcoal disabled:opacity-40 hover:bg-sand transition"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Can&apos;t Find Your Route?</h2>
          <p className="text-base text-charcoal/80 mb-6">
            We book flights to 160+ destinations worldwide. Send us your route on WhatsApp and we will find the best available fare.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <Plane className="h-4 w-4" />
            Ask for Your Route on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== CORPORATE SECTION ===================
export function CorporateSection() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelers, setTravelers] = useState("");
  const [route, setRoute] = useState("");
  const [dates, setDates] = useState("");
  const [notes, setNotes] = useState("");

  const submit = () => {
    window.open(
      "https://wa.me/923251480148?text=" +
        encodeURIComponent(corporateInquiry({ company, contact, email, phone, travelers, route, dates, notes })),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="corporate" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Corporate Travel
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Corporate & Group Travel Solutions
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Dedicated Account Management for Businesses</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            From company travel policies to group Umrah bookings, we provide dedicated account management, group fares, and invoice-ready billing for organizations of all sizes.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-[#E5E0D8]">
            <h2 className="font-heading text-xl font-semibold text-navy mb-6">Corporate Quote Request</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Company Name</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" className="bg-sand/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Contact Person</label>
                <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Full name" className="bg-sand/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" className="bg-sand/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92..." className="bg-sand/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Number of Travelers</label>
                <Input value={travelers} onChange={(e) => setTravelers(e.target.value)} placeholder="e.g. 15" className="bg-sand/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Route / Destination</label>
                <Input value={route} onChange={(e) => setRoute(e.target.value)} placeholder="e.g. Sialkot to Dubai" className="bg-sand/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Travel Dates</label>
                <Input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="e.g. 15-22 December 2026" className="bg-sand/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Special Requirements</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Visa assistance, hotel, group Umrah, billing terms, etc." className="bg-sand/50 min-h-[100px]" />
              </div>
            </div>
            <button
              onClick={submit}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
            >
              <Send className="h-4 w-4" />
              Request Corporate Quote on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-sand/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Benefits" title="Why Choose HTG for Corporate Travel" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Dedicated Account Manager", description: "One point of contact for all your company's travel needs." },
              { icon: Briefcase, title: "Group Fares", description: "Special discounted rates for groups of 10 or more travelers." },
              { icon: FileText, title: "Invoice-Ready Billing", description: "Proper invoices for company accounting and GST filing." },
              { icon: Clock, title: "Flexible Payment Terms", description: "Credit terms available for established corporate accounts." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Clients" title="Who We Serve" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Corporates", description: "Employee travel, client visits, conference attendance." },
              { title: "NGOs & Non-Profits", description: "Field staff travel, volunteer groups, aid missions." },
              { title: "Government Offices", description: "Official delegations, training groups." },
              { title: "Umrah Groups", description: "Family groups, mosque committees, community organizations." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E0D8]/60 shadow-htg">
                <h3 className="font-heading text-base font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Let&apos;s Discuss Your Corporate Travel Needs</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Send us your requirements on WhatsApp. We will assign a dedicated account manager within 24 hours.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <Briefcase className="h-4 w-4" />
            Request Corporate Consultation on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== BLOG SECTION ===================
export function BlogSection() {
  return (
    <section id="blog" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Blog & Guides
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Travel Guides & Visa Tips
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Helpful Resources for Pakistani Travelers</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Practical guides on visa applications, flight booking, Umrah preparation, and travel tips — written by our team in Sialkot.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-htg border border-[#E5E0D8]/60 hover:shadow-htg-lg transition-shadow flex flex-col">
                {/* Cover image placeholder */}
                <div className="h-40 bg-gradient-to-br from-navy via-teal/30 to-gold/30 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-white/40" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-teal/10 text-teal hover:bg-teal/20">{post.category}</Badge>
                    <span className="text-xs text-muted-grey">{post.readingTime}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-navy mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-charcoal/80 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E0D8]">
                    <span className="text-xs text-muted-grey">
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <WhatsAppButton
                      message={`Hi HTG Travels, I'd like to know more about your article: "${post.title}". Can you share more details?`}
                      variant="outline"
                      size="sm"
                    >
                      Read More
                    </WhatsAppButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Have a Travel Question?</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Our team is happy to help. Message us on WhatsApp with your question and we will reply within minutes.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== FAQ SECTION ===================
export function FAQSection() {
  return (
    <section id="faq" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            FAQ
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Answers to Common Travel Questions</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            Everything you need to know about booking flights, processing visas, arranging Umrah, and getting travel insurance with HTG Travels.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {FAQS.map((cat) => (
              <div key={cat.category}>
                <h2 className="font-heading text-2xl font-semibold text-navy mb-5">{cat.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {cat.items.map((faq, idx) => (
                    <AccordionItem key={idx} value={`${cat.category}-${idx}`}>
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
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-3">Still Have Questions?</h2>
          <p className="text-base text-charcoal/80 mb-6">
            Message us on WhatsApp and we will reply within minutes.
          </p>
          <WhatsAppButton variant="gold" size="lg">
            <MessageCircle className="h-4 w-4" />
            Chat With Us on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// =================== CONTACT SECTION ===================
export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    window.open(
      "https://wa.me/923251480148?text=" +
        encodeURIComponent(contactInquiry({ name, email, message })),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="contact" className="bg-background">
      {/* Hero */}
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            Contact
          </span>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            We&apos;re Here to Help
          </h1>
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">Get in Touch</p>
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            At HTG Travels, we value our travelers and are always here to help. Whether you need a flight quote, visa consultation, Umrah package, or a custom Pakistan tour itinerary, our team is ready to assist you on WhatsApp in minutes.
          </p>
        </div>
      </div>

      {/* Palestine Support */}
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-htg border border-[#E5E0D8] text-center">
            <p className="text-5xl mb-3">🇵🇸</p>
            <h2 className="font-heading text-2xl font-semibold text-navy mb-2">We Stand with Palestine</h2>
            <p className="text-sm text-charcoal/80 max-w-xl mx-auto mb-4">
              Solidarity with the Palestinian people in their struggle for freedom, justice, and human rights.
            </p>
            <p className="font-heading text-lg font-bold text-navy mb-4">FREE PALESTINE</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["⚖️ Justice", "🕊️ Freedom", "☮️ Peace", "❤️ Humanity"].map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-sand px-4 py-2 text-sm font-medium text-charcoal">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-navy mb-2">Email Support</h3>
              <a href={`mailto:${SITE.email}`} className="block text-sm text-teal hover:text-gold transition-colors break-all">
                {SITE.email}
              </a>
              <p className="mt-2 text-xs text-muted-grey">Our support team responds within 24 hours.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-navy mb-2">WhatsApp</h3>
              <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="block text-sm text-teal hover:text-gold transition-colors">
                {SITE.whatsappDisplay}
              </a>
              <p className="mt-2 text-xs text-muted-grey">Chat with us instantly on WhatsApp.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-htg border border-[#E5E0D8]/60 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-navy mb-2">Office</h3>
              <p className="text-sm text-charcoal">{SITE.location}</p>
              <p className="mt-2 text-xs text-muted-grey">{SITE.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-[#E5E0D8]">
            <h2 className="font-heading text-xl font-semibold text-navy mb-1">Send Us a Message</h2>
            <p className="text-xs text-muted-grey mb-6">
              The form does not submit to a server. It opens WhatsApp with a pre-filled message containing the form data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="bg-sand/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Email Address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="bg-sand/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Your Message</label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." className="bg-sand/50 min-h-[140px]" />
              </div>
            </div>
            <button
              onClick={submit}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
            >
              <Send className="h-4 w-4" />
              Send Message via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-htg border border-[#E5E0D8]">
            <iframe
              title="Sialkot, Punjab, Pakistan location map"
              src="https://www.google.com/maps?q=Sialkot,Punjab,Pakistan&output=embed"
              className="w-full h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Our Commitment */}
      <div className="bg-sand/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy mb-4">Our Commitment</h2>
          <p className="text-base text-charcoal/80 leading-relaxed">
            We believe in building trust through clear communication. Every query is important to us, and our goal is to provide you with fast, professional, and reliable support at every step of your journey with HTG Travels.
          </p>
        </div>
      </div>
    </section>
  );
}

// =================== PRIVACY POLICY ===================
export function PrivacySection() {
  return (
    <section id="privacy" className="bg-background">
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Privacy Policy
          </h1>
        </div>
      </div>
      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-sm">
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
      </div>
    </section>
  );
}

// =================== TERMS OF SERVICE ===================
export function TermsSection() {
  return (
    <section id="terms" className="bg-background">
      <div className="pattern-navy py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-sand/70">Last Updated: September 11, 2026</p>
        </div>
      </div>

      <div className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-charcoal">
            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 1: Introduction</h2>
              <p className="text-base leading-relaxed">
                Welcome to htg.com.pk. By accessing our website, you agree to be bound by these Terms of Service. This website provides information about our travel agency services — flight ticketing, visa consultation, Umrah and Hajj packages, northern Pakistan tours, and international holiday packages — and allows you to initiate travel inquiries via WhatsApp.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 2: Intellectual Property</h2>
              <p className="text-base leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of HTG Travels and is protected by copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 3: Disclaimer of Warranties</h2>
              <p className="text-base leading-relaxed">
                This website is provided &quot;as is,&quot; without any warranties of any kind. We do not guarantee that the information is always accurate, complete, or current. Airline fares, visa requirements, hotel availability, and package pricing are subject to change without notice. All fares and quotes are confirmed live at the time of booking.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 4: Governing Law</h2>
              <p className="text-base leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of Pakistan. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-navy mb-3">Section 5: Contact</h2>
              <p className="text-base leading-relaxed">
                For any questions about these Terms of Service, contact us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-teal hover:text-gold transition-colors font-medium">{SITE.email}</a>{" "}
                or on WhatsApp at{" "}
                <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-teal hover:text-gold transition-colors font-medium">{SITE.whatsappDisplay}</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
