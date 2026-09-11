"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plane, Clock, CheckCircle2, Send, TrendingUp, FileText, ArrowRight,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { AIRLINES } from "@/lib/data";
import { cn } from "@/lib/utils";

const PAKISTANI_AIRPORTS = ["Sialkot (SKT)", "Lahore (LHE)", "Islamabad (ISB)", "Karachi (KHI)", "Peshawar (PEW)", "Multan (MUX)", "Quetta (UET)", "Faisalabad (LYP)"];
const DEST_AIRPORTS: Record<string, string[]> = {
  "United Arab Emirates": ["Dubai (DXB)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"],
  "Saudi Arabia": ["Jeddah (JED)", "Riyadh (RUH)", "Medinah (MED)", "Dammam (DMM)"],
  "United Kingdom": ["London Heathrow (LHR)", "Manchester (MAN)", "Birmingham (BHX)"],
  "Turkey": ["Istanbul (IST)", "Istanbul Sabiha (SAW)"],
  "Malaysia": ["Kuala Lumpur (KUL)"],
  "Thailand": ["Bangkok (BKK)"],
  "Qatar": ["Doha (DOH)"],
  "Oman": ["Muscat (MCT)"],
};

const whyBook = [
  { icon: TrendingUp, title: "Live Fares, Not Old Prices", description: "We quote real-time airfares based on your exact dates, not outdated price lists." },
  { icon: FileText, title: "Official E-Tickets", description: "Every booking comes with a valid airline e-ticket sent to your WhatsApp and email." },
  { icon: Clock, title: "Urgent Bookings Welcome", description: "Need a ticket in the next few hours? We prioritize emergency bookings." },
  { icon: CheckCircle2, title: "Date Change Support", description: "Plans changed? We handle rescheduling and rebooking for you." },
];

export default function FlightsPage() {
  const [tripType, setTripType] = useState<"round" | "oneway">("round");
  const [fromAirport, setFromAirport] = useState("Sialkot (SKT)");
  const [destCountry, setDestCountry] = useState("United Arab Emirates");
  const [toAirport, setToAirport] = useState("Dubai (DXB)");
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [paxClass, setPaxClass] = useState("1 Adult, Economy");

  const submit = () => {
    const msg = `Hi HTG Travels, I need a flight quote.\n\nTrip Type: ${tripType === "round" ? "Round Trip" : "One Way"}\nFrom: ${fromAirport} (Pakistan)\nTo: ${toAirport} (${destCountry})\nDeparture: ${depDate || "Flexible"}\n${tripType === "round" ? `Return: ${retDate || "Flexible"}\n` : ""}Passengers: ${paxClass}\n\nPlease share live rates.`;
    window.open("https://wa.me/923251480148?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero
        eyebrow="Flights"
        title="Official Airline Ticketing Desk"
        subtitle="Domestic & International Air Tickets"
        intro="Book real-time seats across all domestic Pakistani airlines (PIA, AirSial, Fly Jinnah, Serene) and premier global carriers. Message us for instant live airfares and official e-tickets."
      />

      {/* Quote Form */}
      <section className="py-16 lg:py-20">
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
                <label className="text-xs font-medium text-muted-grey mb-1.5 block">Departure Airport</label>
                <Select value={fromAirport} onValueChange={setFromAirport}>
                  <SelectTrigger className="h-11 bg-sand/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAKISTANI_AIRPORTS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
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
      </section>

      {/* Airlines */}
      <section className="bg-sand/40 py-16 lg:py-20">
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
      </section>

      {/* Why Book With HTG */}
      <section className="py-16 lg:py-20">
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
      </section>

      {/* Browse Routes Link */}
      <section className="bg-sand/40 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading text-xl font-semibold text-navy mb-2">Looking for a specific route?</h3>
          <p className="text-sm text-charcoal/80 mb-5">Browse all our flight destinations from Pakistan with live rate inquiry on WhatsApp.</p>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-gold transition-colors"
          >
            Browse All Flight Routes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <FinalCTA
        heading="Ready to Book Your Flight?"
        body="Send us your route and dates on WhatsApp. We will reply with live fares and available options within minutes."
        buttonLabel="Get Live Fare on WhatsApp"
        icon={<Plane className="h-4 w-4" />}
      />
    </>
  );
}
