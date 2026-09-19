"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plane, Hotel, Utensils, ShieldCheck, Plus, MapPin, Calendar, Users, RefreshCw, Download, FileCheck } from "lucide-react";
import { FadeIn } from "@/components/animations";

type TripType = "economy-backpack" | "mid-range" | "luxury";
type Destination = "dubai" | "saudi-arabia" | "uk" | "turkey" | "malaysia" | "thailand" | "usa" | "schengen";

const DESTINATIONS: Record<Destination, { label: string; flag: string; baseFlight: number; baseVisa: number; baseHotel: number; baseFood: number; currency: string }> = {
  "dubai":          { label: "Dubai, UAE",          flag: "🇦🇪", baseFlight: 95000,  baseVisa: 18000,  baseHotel: 12000, baseFood: 4000,  currency: "PKR" },
  "saudi-arabia":   { label: "Saudi Arabia (Umrah)", flag: "🇸🇦", baseFlight: 110000, baseVisa: 0,      baseHotel: 9000,  baseFood: 3500,  currency: "PKR" },
  "uk":             { label: "United Kingdom",     flag: "🇬🇧", baseFlight: 220000, baseVisa: 55000,  baseHotel: 22000, baseFood: 6000,  currency: "PKR" },
  "turkey":         { label: "Turkey (Istanbul)",  flag: "🇹🇷", baseFlight: 130000, baseVisa: 12000,  baseHotel: 10000, baseFood: 4500,  currency: "PKR" },
  "malaysia":       { label: "Malaysia (Kuala Lumpur)", flag: "🇲🇾", baseFlight: 145000, baseVisa: 8000, baseHotel: 8500,  baseFood: 3500,  currency: "PKR" },
  "thailand":       { label: "Thailand (Bangkok)", flag: "🇹🇭", baseFlight: 140000, baseVisa: 5000,  baseHotel: 7500,  baseFood: 3000,  currency: "PKR" },
  "usa":            { label: "United States",      flag: "🇺🇸", baseFlight: 380000, baseVisa: 75000,  baseHotel: 28000, baseFood: 9000,  currency: "PKR" },
  "schengen":       { label: "Schengen (Europe)",  flag: "🇪🇺", baseFlight: 240000, baseVisa: 35000,  baseHotel: 24000, baseFood: 7000,  currency: "PKR" },
};

const TRIP_TYPES: Record<TripType, { label: string; multiplier: number; description: string }> = {
  "economy-backpack": { label: "Economy / Backpacker", multiplier: 0.65, description: "Hostels, street food, public transport" },
  "mid-range":         { label: "Mid-Range Comfort",    multiplier: 1.0,  description: "3-star hotels, mixed dining, occasional taxi" },
  "luxury":            { label: "Luxury",                multiplier: 1.8,  description: "4-5 star hotels, fine dining, private transport" },
};

const fmtPKR = (n: number) =>
  "PKR " + Math.round(n).toLocaleString("en-PK", { maximumFractionDigits: 0 });

export default function TripBudgetCalculator() {
  const [destination, setDestination] = useState<Destination>("dubai");
  const [tripType, setTripType] = useState<TripType>("mid-range");
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [extras, setExtras] = useState(15000);
  const [includeInsurance, setIncludeInsurance] = useState(true);

  const dest = DESTINATIONS[destination];
  const tt = TRIP_TYPES[tripType];

  const breakdown = useMemo(() => {
    const flightTotal = dest.baseFlight * travelers;
    const visaTotal = dest.baseVisa * travelers;
    const hotelTotal = dest.baseHotel * days * tt.multiplier;
    const foodTotal = dest.baseFood * days * travelers * tt.multiplier;
    const insurancePerPersonPerDay = 850;
    const insuranceTotal = includeInsurance ? insurancePerPersonPerDay * days * travelers : 0;
    const extrasTotal = extras * travelers;
    const grand = flightTotal + visaTotal + hotelTotal + foodTotal + insuranceTotal + extrasTotal;

    return {
      flight: flightTotal,
      visa: visaTotal,
      hotel: hotelTotal,
      food: foodTotal,
      insurance: insuranceTotal,
      extras: extrasTotal,
      grand,
      perPerson: grand / Math.max(travelers, 1),
      perDay: grand / Math.max(days, 1),
    };
  }, [dest, tt, days, travelers, extras, includeInsurance]);

  const reset = useCallback(() => {
    setDestination("dubai");
    setTripType("mid-range");
    setDays(7);
    setTravelers(2);
    setExtras(15000);
    setIncludeInsurance(true);
  }, []);

  // Simple CSV export — works on all devices, no backend
  const exportCSV = useCallback(() => {
    const rows = [
      ["Category", "Amount (PKR)"],
      ["Flights", breakdown.flight],
      ["Visa", breakdown.visa],
      ["Hotels", breakdown.hotel],
      ["Food & Dining", breakdown.food],
      ["Insurance", breakdown.insurance],
      ["Extras & Shopping", breakdown.extras],
      ["TOTAL", breakdown.grand],
      ["Per Person", breakdown.perPerson],
      ["Per Day", breakdown.perDay],
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trip-budget-${dest.label.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [breakdown, dest]);

  const destOptions = Object.entries(DESTINATIONS) as [Destination, typeof dest][];
  const ttOptions = Object.entries(TRIP_TYPES) as [TripType, typeof tt][];

  return (
    <>
      <section className="pattern-navy relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link
            href="/tools/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-on-navy-muted hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Trip Budget Calculator
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Get an instant estimate of your total trip cost from Pakistan —
            flights, visa, hotels, food, insurance, and extras. No signup.
            Mobile-friendly.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ============ INPUTS ============ */}
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Plane className="h-5 w-5 text-teal" />
                  Trip Details
                </h2>

                {/* Destination */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-teal" />
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value as Destination)}
                    className="w-full h-12 rounded-xl bg-card border border-border px-4 text-base text-foreground focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                  >
                    {destOptions.map(([key, d]) => (
                      <option key={key} value={key}>
                        {d.flag} {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Trip Type */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Hotel className="h-4 w-4 text-teal" />
                    Trip Style
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value as TripType)}
                    className="w-full h-12 rounded-xl bg-card border border-border px-4 text-base text-foreground focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                  >
                    {ttOptions.map(([key, t]) => (
                      <option key={key} value={key}>
                        {t.label} — {t.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Days — slider + number */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-teal" />
                      Trip Length
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDays(Math.max(1, days - 1))}
                        className="h-9 w-9 rounded-lg bg-muted text-foreground font-bold hover:bg-muted/70 transition"
                        aria-label="Decrease days"
                      >−</button>
                      <input
                        type="number"
                        min={1}
                        max={90}
                        value={days}
                        onChange={(e) => setDays(Math.max(1, Math.min(90, Number(e.target.value) || 1)))}
                        className="w-16 h-9 text-center rounded-lg bg-card border border-border text-foreground text-base focus:border-teal outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setDays(Math.min(90, days + 1))}
                        className="h-9 w-9 rounded-lg bg-muted text-foreground font-bold hover:bg-muted/70 transition"
                        aria-label="Increase days"
                      >+</button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-[#0FA3A3]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{days} day{days !== 1 ? "s" : ""}</p>
                </div>

                {/* Travelers */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-teal" />
                      Travelers
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="h-9 w-9 rounded-lg bg-muted text-foreground font-bold hover:bg-muted/70 transition"
                        aria-label="Decrease travelers"
                      >−</button>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={travelers}
                        onChange={(e) => setTravelers(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                        className="w-16 h-9 text-center rounded-lg bg-card border border-border text-foreground text-base focus:border-teal outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.min(20, travelers + 1))}
                        className="h-9 w-9 rounded-lg bg-muted text-foreground font-bold hover:bg-muted/70 transition"
                        aria-label="Increase travelers"
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* Extras */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Plus className="h-4 w-4 text-teal" />
                    Extras / Shopping (per person)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">PKR</span>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={extras}
                      onChange={(e) => setExtras(Math.max(0, Number(e.target.value) || 0))}
                      className="flex-1 h-12 rounded-xl bg-card border border-border px-4 text-base text-foreground focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* Insurance toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border">
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-teal" />
                      Include Travel Insurance
                    </label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ~PKR 850/person/day (Schengen-approved)
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={includeInsurance}
                    onClick={() => setIncludeInsurance(!includeInsurance)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${includeInsurance ? "bg-teal" : "bg-muted-foreground/30"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${includeInsurance ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-transparent border-2 border-border text-foreground px-5 py-3 text-sm font-semibold hover:bg-muted transition active:scale-95"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={exportCSV}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-teal text-white px-5 py-3 text-sm font-semibold hover:brightness-110 shadow-md active:scale-95 transition"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* ============ RESULTS ============ */}
              <div className="lg:sticky lg:top-8 self-start">
                <div className="glass-strong rounded-2xl p-6 sm:p-8">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal mb-1">
                      Estimated Total
                    </p>
                    <p className="font-heading text-3xl sm:text-4xl font-bold text-foreground break-words">
                      {fmtPKR(breakdown.grand)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      for {travelers} traveler{travelers !== 1 ? "s" : ""} · {days} day{days !== 1 ? "s" : ""} · {dest.flag} {dest.label}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">Per Person</p>
                      <p className="font-heading text-lg font-bold text-foreground">{fmtPKR(breakdown.perPerson)}</p>
                    </div>
                    <div className="rounded-xl bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">Per Day (total)</p>
                      <p className="font-heading text-lg font-bold text-foreground">{fmtPKR(breakdown.perDay)}</p>
                    </div>
                  </div>

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Cost Breakdown
                  </h3>
                  <div className="space-y-2.5">
                    <Row icon={<Plane className="h-4 w-4 text-teal" />} label="Flights" value={breakdown.flight} />
                    <Row icon={<FileCheck className="h-4 w-4 text-gold" />} label="Visa" value={breakdown.visa} />
                    <Row icon={<Hotel className="h-4 w-4 text-teal" />} label="Hotels" value={breakdown.hotel} />
                    <Row icon={<Utensils className="h-4 w-4 text-gold" />} label="Food & Dining" value={breakdown.food} />
                    {includeInsurance && (
                      <Row icon={<ShieldCheck className="h-4 w-4 text-teal" />} label="Insurance" value={breakdown.insurance} />
                    )}
                    <Row icon={<Plus className="h-4 w-4 text-gold" />} label="Extras" value={breakdown.extras} />
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      These are estimates based on 2026 market rates from Pakistan. Actual costs vary by
                      season, airline, hotel choice, and exchange rate. For exact live fares, message us
                      on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-foreground">
        {icon}
        {label}
      </span>
      <span className="font-semibold text-foreground tabular-nums">{fmtPKR(value)}</span>
    </div>
  );
}
