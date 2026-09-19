"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CalendarDays, RefreshCw, Moon, Sun } from "lucide-react";

// Hijri-Gregorian Date Converter
//
// Uses the browser's built-in Intl.DateTimeFormat with the 'islamic-umalqura'
// calendar (the official calendar of Saudi Arabia, used by Google, Microsoft,
// and most modern apps). This is more accurate than 'islamic' (which uses
// tabular algorithms) and is the same calendar used by Saudi Arabia for
// official Hajj/Umrah dates.
//
// Limitations: Hijri dates depend on moon sighting. The Umm al-Qura calendar
// is an astronomical prediction; actual local sighting may differ by ±1 day
// for religious observances. For prayer/Hajj/Ramadan dates, always confirm
// with your local mosque or moon-sighting committee.

const ISLAMIC_MONTHS = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal",
  "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal",
  "Dhu al-Qi'dah", "Dhu al-Hijjah",
];

const GREGORIAN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const GREGORIAN_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function parseDate(s: string): Date | null {
  if (!s) return null;
  // Parse as UTC noon to avoid DST shift edge cases
  const d = new Date(s + "T12:00:00Z");
  if (isNaN(d.getTime())) return null;
  return d;
}

function toHijri(d: Date) {
  try {
    // Use 'islamic-umalqura' for accuracy matching Saudi official calendar
    const parts = new Intl.DateTimeFormat("en-US", {
      calendar: "islamic-umalqura",
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).formatToParts(d);
    const day = parts.find((p) => p.type === "day")?.value ?? "?";
    const monthStr = parts.find((p) => p.type === "month")?.value ?? "?";
    const year = parts.find((p) => p.type === "year")?.value ?? "?";
    // Convert month name to number
    const monthNum = ISLAMIC_MONTHS.findIndex(
      (m) => m.toLowerCase() === monthStr.toLowerCase() ||
        // Handle transliteration variants like "Rabi I", "Jumada I" produced by some Intl implementations
        monthStr.toLowerCase().startsWith(m.toLowerCase().split(" ")[0])
    );
    return { day, month: monthNum >= 0 ? ISLAMIC_MONTHS[monthNum] : monthStr, monthNum: monthNum >= 0 ? monthNum + 1 : 0, year };
  } catch {
    return null;
  }
}

function toGregorianString(d: Date) {
  const wd = GREGORIAN_WEEKDAYS[d.getUTCDay()];
  const day = d.getUTCDate();
  const month = GREGORIAN_MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${wd}, ${day} ${month} ${year}`;
}

function hijriToDate(day: number, month: number, year: number): Date | null {
  // Convert Hijri to Gregorian by using Intl to construct a Hijri date string
  // and parsing it back. The Intl API can format Gregorian -> Hijri but not
  // the reverse directly. We approximate by iterating through Gregorian days
  // to find the one whose Hijri date matches.
  //
  // For efficiency, we use a binary search around an initial estimate.
  // Average Hijri year = 354.367 days, Gregorian year = 365.242 days.
  // So 1 Hijri year ≈ 0.970 Gregorian years.
  const targetY = year;
  const estimateGregorianYear = Math.round(targetY * 354.367 / 365.242) + 622;
  // Start search around July 1 of estimated Gregorian year
  let low = Date.UTC(estimateGregorianYear - 1, 6, 1);
  let high = Date.UTC(estimateGregorianYear + 1, 6, 1);
  // Binary search for the matching Hijri date
  for (let i = 0; i < 50; i++) {
    const mid = Math.floor((low + high) / 2);
    const d = new Date(mid);
    const h = toHijri(d);
    if (!h) return null;
    const hDay = parseInt(h.day, 10);
    const hMonthNum = h.monthNum;
    const hYear = parseInt(h.year, 10);
    // Compare as (year, month, day) tuple
    const cmp = (hYear - year) || (hMonthNum - month) || (hDay - day);
    if (cmp === 0) return new Date(mid);
    if (cmp < 0) low = mid;
    else high = mid;
  }
  // Fallback: return closest
  return new Date(Math.floor((low + high) / 2));
}

const RELIGIOUS_DATES_2025 = [
  { gregorian: "2025-06-26", hijri: "1 Muharram 1447", event: "Islamic New Year (1 Muharram)" },
  { gregorian: "2025-07-05", hijri: "10 Muharram 1447", event: "Day of Ashura (10 Muharram)" },
  { gregorian: "2025-08-15", hijri: "27 Muharram 1447", event: "Birth of Prophet Muhammad ﷺ (varies by sect)" },
  { gregorian: "2025-09-04", hijri: "1 Rajab 1447", event: "Start of Rajab" },
  { gregorian: "2025-09-24", hijri: "21 Ramadan 1447", event: "Imam Ali's Martyrdom (Shia)" },
  { gregorian: "2026-02-18", hijri: "1 Ramadan 1447", event: "Start of Ramadan (1 Ramadan)" },
  { gregorian: "2026-03-19", hijri: "1 Shawwal 1447", event: "Eid al-Fitr (1 Shawwal)" },
  { gregorian: "2026-05-27", hijri: "10 Dhu al-Hijjah 1447", event: "Eid al-Adha (10 Dhu al-Hijjah)" },
  { gregorian: "2026-05-17", hijri: "8 Dhu al-Hijjah 1447", event: "Day of Arafah (9 Dhu al-Hijjah)" },
  { gregorian: "2026-08-15", hijri: "1 Muharram 1448", event: "Islamic New Year 1448" },
];

export default function HijriConverterPage() {
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);

  // Mode 1: Gregorian → Hijri
  const [gregorianDate, setGregorianDate] = useState(todayISO);
  const [hijriDay, setHijriDay] = useState(1);
  const [hijriMonth, setHijriMonth] = useState(9); // Ramadan by default
  const [hijriYear, setHijriYear] = useState(1447);

  // Result for Mode 1
  const hijriResult = useMemo(() => {
    const d = parseDate(gregorianDate);
    if (!d) return null;
    const h = toHijri(d);
    if (!h) return null;
    return { ...h, gregorianString: toGregorianString(d) };
  }, [gregorianDate]);

  // Result for Mode 2
  const gregorianResult = useMemo(() => {
    const d = hijriToDate(hijriDay, hijriMonth, hijriYear);
    if (!d) return null;
    return { date: d, gregorianString: toGregorianString(d), hijriString: `${hijriDay} ${ISLAMIC_MONTHS[hijriMonth - 1]} ${hijriYear} AH` };
  }, [hijriDay, hijriMonth, hijriYear]);

  const reset = useCallback(() => {
    setGregorianDate(todayISO);
    setHijriDay(1);
    setHijriMonth(9);
    setHijriYear(1447);
  }, [todayISO]);

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
            Hijri ↔ Gregorian Date Converter
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Convert dates between the Islamic Hijri calendar (Umm al-Qura —
            the official Saudi calendar used for Hajj/Umrah) and the Gregorian
            calendar. Plan Ramadan, Eid, and pilgrimage dates accurately.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* === Mode 1: Gregorian → Hijri === */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Moon className="h-5 w-5 text-teal" />
              Gregorian → Hijri
            </h2>
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Gregorian Date</label>
              <input
                type="date"
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                className="w-full h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20 sm:max-w-md"
              />
            </div>
            <div className="p-5 rounded-xl bg-muted/40 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Hijri Date (Umm al-Qura)
              </p>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground break-words">
                {hijriResult ? `${hijriResult.day} ${hijriResult.month} ${hijriResult.year} AH` : "—"}
              </p>
              {hijriResult && (
                <p className="text-xs text-muted-foreground mt-2">
                  {hijriResult.gregorianString}
                </p>
              )}
            </div>
          </div>

          {/* === Mode 2: Hijri → Gregorian === */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Sun className="h-5 w-5 text-gold" />
              Hijri → Gregorian
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Day</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={hijriDay}
                  onChange={(e) => setHijriDay(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-3 text-base text-center text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Month</label>
                <select
                  value={hijriMonth}
                  onChange={(e) => setHijriMonth(Number(e.target.value))}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-2 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                >
                  {ISLAMIC_MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Year (AH)</label>
                <input
                  type="number"
                  min={1}
                  max={1600}
                  value={hijriYear}
                  onChange={(e) => setHijriYear(Math.max(1, Math.min(1600, Number(e.target.value) || 1)))}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-3 text-base text-center text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
            </div>
            <div className="p-5 rounded-xl bg-muted/40 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Gregorian Date
              </p>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground break-words">
                {gregorianResult ? gregorianResult.gregorianString : "—"}
              </p>
              {gregorianResult && (
                <p className="text-xs text-muted-foreground mt-2">
                  {gregorianResult.hijriString}
                </p>
              )}
            </div>
          </div>

          {/* === Religious dates reference === */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-teal" />
              Upcoming Islamic Dates (2025-2026)
            </h2>
            <div className="space-y-2">
              {RELIGIOUS_DATES_2025.map((d) => (
                <div
                  key={d.event}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 p-3 rounded-lg bg-muted/40 border border-border/40"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{d.event}</p>
                    <p className="text-xs text-muted-foreground">{d.hijri}</p>
                  </div>
                  <div className="text-sm font-mono text-teal whitespace-nowrap">
                    {new Date(d.gregorian).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
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

          <div className="p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">About this calendar:</strong>{" "}
            This tool uses the Umm al-Qura calendar (the official calendar of
            Saudi Arabia, used by Google and Microsoft). It is based on
            astronomical moon-phase calculations. For religious observances
            (start of Ramadan, Eid), actual local moon-sighting may differ by
            ±1 day. Always confirm with your local mosque or moon-sighting
            committee before finalizing religious plans.
          </div>
        </div>
      </section>
    </>
  );
}
