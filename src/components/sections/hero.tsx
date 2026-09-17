"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle2, Plane, FileCheck } from "lucide-react";
import { openWhatsApp, flightInquiry, visaInquiry, generalInquiry } from "@/lib/whatsapp";

const ORIGIN_COUNTRIES = ["Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "Turkey", "Malaysia"];
const DEST_COUNTRIES = ["United Arab Emirates", "Saudi Arabia", "United Kingdom", "Turkey", "Malaysia", "Thailand", "Qatar", "Oman", "United States"];
const PAKISTANI_AIRPORTS = ["Sialkot (SKT)", "Lahore (LHE)", "Islamabad (ISB)", "Karachi (KHI)", "Peshawar (PEW)", "Multan (MUX)", "Quetta (UET)"];
const UAE_AIRPORTS = ["Dubai (DXB)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"];
const SAUDI_AIRPORTS = ["Jeddah (JED)", "Riyadh (RUH)", "Medinah (MED)", "Dammam (DMM)"];
const UK_AIRPORTS = ["London Heathrow (LHR)", "Manchester (MAN)", "Birmingham (BHX)"];
const TRAVELERS = ["1 Adult", "2 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children", "3 Adults", "4+ Adults", "Group (10+)"];
const PASSENGER_CLASSES = ["1 Adult, Economy", "2 Adults, Economy", "1 Adult, Business", "2 Adults, Business", "Family (Economy)", "Group (10+)"];
const VISA_TYPES: Record<string, string[]> = {
  "Saudi Arabia": ["Tourist eVisa", "Umrah Visa", "Business Visa"],
  "United Arab Emirates": ["Tourist eVisa (30 Days)", "Tourist eVisa (60 Days)", "Transit Visa"],
  "United Kingdom": ["Standard Visitor Visa", "Business Visitor Visa", "Family Visitor Visa"],
  "Turkey": ["Tourist Sticker Visa", "E-Visa"],
  "Malaysia": ["Tourist eVisa", "Business eVisa"],
  "Thailand": ["Tourist Visa", "Visa on Arrival"],
  "Qatar": ["Tourist eVisa", "Hayya Entry Visa"],
  "Oman": ["Tourist eVisa", "Business Visa"],
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

  const getDestAirports = () => {
    switch (destCountry) {
      case "United Arab Emirates": return UAE_AIRPORTS;
      case "Saudi Arabia": return SAUDI_AIRPORTS;
      case "United Kingdom": return UK_AIRPORTS;
      default: return ["Capital City Airport"];
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-sand"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal">
              <Send className="h-3 w-3" />
              {`Sialkot's Trusted Travel Desk`}
            </span>
            <h1 className="mt-5 font-heading font-bold text-navy leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-[48px]">
              Fly From Sialkot.{" "}
              <span className="text-teal">Land Anywhere.</span>{" "}
              Visa Help Without the Guesswork.
            </h1>
            <p className="mt-6 text-base md:text-lg text-charcoal/80 leading-relaxed max-w-xl">
              HTG Travels compares live airline fares and prepares your visa file step by step — all through WhatsApp. No confusing price lists. No waiting rooms. Just answers in minutes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setTab("flight")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
              >
                <Plane className="h-4 w-4" />
                Request Flight Fare
              </button>
              <button
                onClick={() => setTab("visa")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent border-2 border-navy text-navy px-6 py-3 text-sm font-semibold hover:bg-navy hover:text-white transition"
              >
                <FileCheck className="h-4 w-4" />
                Ask Visa Expert
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-grey">
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
                Sialkot-based team
              </span>
            </div>
          </div>

          {/* Right Column — Quote Card */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-htg">
              <Tabs value={tab} onValueChange={(v) => setTab(v as "flight" | "visa")}>
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-sand">
                  <TabsTrigger
                    value="flight"
                    className="data-[state=active]:bg-white data-[state=active]:text-navy font-semibold"
                  >
                    Flight Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="visa"
                    className="data-[state=active]:bg-white data-[state=active]:text-navy font-semibold"
                  >
                    Visa Consultation
                  </TabsTrigger>
                </TabsList>

                {/* Flight Tab */}
                <TabsContent value="flight" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Origin Country</label>
                      <Select value={originCountry} onValueChange={setOriginCountry}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ORIGIN_COUNTRIES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Flying From</label>
                      <Select value={flyingFrom} onValueChange={setFlyingFrom}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {originCountry === "Pakistan"
                            ? PAKISTANI_AIRPORTS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)
                            : <SelectItem value="Capital City Airport">Capital City Airport</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Destination Country</label>
                      <Select value={destCountry} onValueChange={setDestCountry}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
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
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Destination To</label>
                      <Select value={destTo} onValueChange={setDestTo}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
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
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Travelers</label>
                      <Select value={travelers} onValueChange={setTravelers}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TRAVELERS.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Travel Date (Optional)</label>
                      <Input
                        type="date"
                        value={flightDate}
                        onChange={(e) => setFlightDate(e.target.value)}
                        className="h-11 bg-sand/50 border-[#E5E0D8]"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-grey pt-1">
                    Get direct consultation and live rates from our experts on WhatsApp.
                  </p>

                  <button
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    Get Live Rate on WhatsApp
                  </button>
                </TabsContent>

                {/* Visa Tab */}
                <TabsContent value="visa" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Destination Country</label>
                      <Select
                        value={visaCountry}
                        onValueChange={(v) => {
                          setVisaCountry(v);
                          const types = VISA_TYPES[v];
                          if (types && !types.includes(visaType)) setVisaType(types[0]);
                        }}
                      >
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
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
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Visa Type</label>
                      <Select value={visaType} onValueChange={setVisaType}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
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
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Travel Date</label>
                      <Input
                        type="date"
                        value={visaDate}
                        onChange={(e) => setVisaDate(e.target.value)}
                        className="h-11 bg-sand/50 border-[#E5E0D8]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-grey mb-1.5 block">Nationality</label>
                      <Select value={nationality} onValueChange={setNationality}>
                        <SelectTrigger className="h-11 bg-sand/50 border-[#E5E0D8]">
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

                  <p className="text-xs text-muted-grey pt-1">
                    Get direct consultation and live rates from our experts on WhatsApp.
                  </p>

                  <button
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    Get Live Rate on WhatsApp
                  </button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
