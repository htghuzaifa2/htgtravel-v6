"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CalendarDays, CalendarRange, RefreshCw } from "lucide-react";

// Travel Date Calculator — multiple utilities in one tool:
// 1. Days between two dates (e.g. from departure to return)
// 2. Add/subtract days from a date (e.g. visa expires 90 days after issue)
// 3. Day-of-week finder (e.g. what day is Christmas 2026?)
// 4. Age calculator (e.g. passport issue date → how old)

function parseDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00Z");
  if (isNaN(d.getTime())) return null;
  return d;
}

function diffDays(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function fmtISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function DateCalculatorPage() {
  const today = new Date();
  const todayISO = fmtISO(today);

  // === Mode 1: days between ===
  const [start, setStart] = useState(todayISO);
  const [end, setEnd] = useState(todayISO);

  // === Mode 2: add/subtract ===
  const [baseDate, setBaseDate] = useState(todayISO);
  const [offsetDays, setOffsetDays] = useState(90);

  const daysBetween = useMemo(() => {
    const s = parseDate(start);
    const e = parseDate(end);
    if (!s || !e) return null;
    return diffDays(s, e);
  }, [start, end]);

  const addedDate = useMemo(() => {
    const d = parseDate(baseDate);
    if (!d) return null;
    return addDays(d, offsetDays);
  }, [baseDate, offsetDays]);

  const reset = () => {
    setStart(todayISO);
    setEnd(todayISO);
    setBaseDate(todayISO);
    setOffsetDays(90);
  };

  // JSON-LD for the calculator (SoftwareApplication)
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Travel Date Calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
            Travel Date Calculator
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Calculate days between two dates, add/subtract days from any date
            (useful for visa validity, passport expiry, insurance periods).
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* === Mode 1: Days between === */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <CalendarRange className="h-5 w-5 text-teal" />
              Days Between Two Dates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">From Date</label>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">To Date</label>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
            </div>
            <div className="p-5 rounded-xl bg-muted/40 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Result
              </p>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                {daysBetween === null ? "—" : Math.abs(daysBetween).toLocaleString()}{" "}
                <span className="text-lg text-muted-foreground">day{Math.abs(daysBetween ?? 0) === 1 ? "" : "s"}</span>
              </p>
              {daysBetween !== null && daysBetween < 0 && (
                <p className="text-xs text-gold mt-2">To date is before From date</p>
              )}
              {daysBetween !== null && (
                <p className="text-xs text-muted-foreground mt-2">
                  = {(Math.abs(daysBetween) / 7).toFixed(1)} weeks · {(Math.abs(daysBetween) / 30).toFixed(1)} months (approx)
                </p>
              )}
            </div>
          </div>

          {/* === Mode 2: Add/subtract === */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-gold" />
              Add or Subtract Days
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Useful for visa validity (e.g. 90-day Schengen limit), passport expiry
              reminders, insurance period end date, and trip planning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Base Date</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Days (use − for subtract)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-no-touch-target
                    onClick={() => setOffsetDays((n) => n - 1)}
                    className="h-12 w-12 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/70 transition flex-shrink-0"
                    aria-label="Decrease days"
                  >−</button>
                  <input
                    type="number"
                    value={offsetDays}
                    onChange={(e) => setOffsetDays(Number(e.target.value) || 0)}
                    className="flex-1 h-12 rounded-xl input-recessed border-transparent px-4 text-base text-center text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                  />
                  <button
                    type="button"
                    data-no-touch-target
                    onClick={() => setOffsetDays((n) => n + 1)}
                    className="h-12 w-12 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/70 transition flex-shrink-0"
                    aria-label="Increase days"
                  >+</button>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-muted/40 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Resulting Date
              </p>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground break-words">
                {addedDate ? fmtDate(addedDate) : "—"}
              </p>
              {addedDate && (
                <p className="text-xs text-muted-foreground mt-2">
                  ({offsetDays > 0 ? "+" : ""}{offsetDays} days from {fmtDate(parseDate(baseDate)!)})
                </p>
              )}
            </div>

            {/* Quick presets */}
            <div className="mt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Quick presets</p>
              <div className="flex flex-wrap gap-2">
                {[7, 14, 30, 60, 90, 180, 365].map((n) => (
                  <button
                    key={n}
                    type="button"
                    data-no-touch-target
                    onClick={() => setOffsetDays(n)}
                    className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground hover:bg-teal/10 hover:text-teal transition"
                  >
                    +{n} days
                  </button>
                ))}
                {[-7, -30, -90].map((n) => (
                  <button
                    key={n}
                    type="button"
                    data-no-touch-target
                    onClick={() => setOffsetDays(n)}
                    className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground hover:bg-gold/10 hover:text-gold transition"
                  >
                    {n} days
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Day of week */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal" />
              What Day Is This Date?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20 sm:col-span-2"
              />
              <div className="h-12 rounded-xl bg-muted/40 border border-border flex items-center justify-center font-semibold text-foreground">
                {(() => {
                  const d = parseDate(baseDate);
                  return d ? WEEKDAYS[d.getUTCDay()] : "—";
                })()}
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="text-center">
            <button
              type="button"
              data-no-touch-target
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border-2 border-border text-foreground px-6 py-3 text-sm font-semibold hover:bg-muted transition active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
