"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Globe, Clock } from "lucide-react";

// All major world time zones by country/region. UTC-offset-based so it works
// even when the user's device clock is wrong — we compute current time at
// each location from the user's local Date + the known UTC offset.
//
// Offset is in hours from UTC. DST is auto-applied where applicable via
// Intl.DateTimeFormat with timeZone, which is supported in all modern
// browsers and Node 18+.

type Zone = { city: string; country: string; flag: string; iana: string };

const ZONES: Zone[] = [
  // Pakistan
  { city: "Karachi", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Lahore", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Islamabad", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },

  // Middle East
  { city: "Dubai", country: "UAE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { city: "Abu Dhabi", country: "UAE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { city: "Riyadh", country: "Saudi Arabia", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { city: "Jeddah", country: "Saudi Arabia", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { city: "Doha", country: "Qatar", flag: "🇶🇦", iana: "Asia/Qatar" },
  { city: "Muscat", country: "Oman", flag: "🇴🇲", iana: "Asia/Muscat" },
  { city: "Kuwait City", country: "Kuwait", flag: "🇰🇼", iana: "Asia/Kuwait" },
  { city: "Manama", country: "Bahrain", flag: "🇧🇭", iana: "Asia/Bahrain" },
  { city: "Tehran", country: "Iran", flag: "🇮🇷", iana: "Asia/Tehran" },
  { city: "Baghdad", country: "Iraq", flag: "🇮🇶", iana: "Asia/Baghdad" },
  { city: "Amman", country: "Jordan", flag: "🇯🇴", iana: "Asia/Amman" },
  { city: "Beirut", country: "Lebanon", flag: "🇱🇧", iana: "Asia/Beirut" },
  { city: "Jerusalem", country: "Israel", flag: "🇮🇱", iana: "Asia/Jerusalem" },

  // South Asia
  { city: "New Delhi", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Mumbai", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Dhaka", country: "Bangladesh", flag: "🇧🇩", iana: "Asia/Dhaka" },
  { city: "Colombo", country: "Sri Lanka", flag: "🇱🇰", iana: "Asia/Colombo" },
  { city: "Kathmandu", country: "Nepal", flag: "🇳🇵", iana: "Asia/Kathmandu" },
  { city: "Kabul", country: "Afghanistan", flag: "🇦🇫", iana: "Asia/Kabul" },

  // East & Southeast Asia
  { city: "Beijing", country: "China", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { city: "Shanghai", country: "China", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { city: "Hong Kong", country: "Hong Kong", flag: "🇭🇰", iana: "Asia/Hong_Kong" },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { city: "Seoul", country: "South Korea", flag: "🇰🇷", iana: "Asia/Seoul" },
  { city: "Taipei", country: "Taiwan", flag: "🇹🇼", iana: "Asia/Taipei" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", iana: "Asia/Singapore" },
  { city: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾", iana: "Asia/Kuala_Lumpur" },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭", iana: "Asia/Bangkok" },
  { city: "Hanoi", country: "Vietnam", flag: "🇻🇳", iana: "Asia/Ho_Chi_Minh" },
  { city: "Jakarta", country: "Indonesia", flag: "🇮🇩", iana: "Asia/Jakarta" },
  { city: "Manila", country: "Philippines", flag: "🇵🇭", iana: "Asia/Manila" },

  // Central Asia
  { city: "Tashkent", country: "Uzbekistan", flag: "🇺🇿", iana: "Asia/Tashkent" },
  { city: "Almaty", country: "Kazakhstan", flag: "🇰🇿", iana: "Asia/Almaty" },

  // Oceania
  { city: "Sydney", country: "Australia", flag: "🇦🇺", iana: "Australia/Sydney" },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", iana: "Australia/Melbourne" },
  { city: "Perth", country: "Australia", flag: "🇦🇺", iana: "Australia/Perth" },
  { city: "Auckland", country: "New Zealand", flag: "🇳🇿", iana: "Pacific/Auckland" },
  { city: "Fiji", country: "Fiji", flag: "🇫🇯", iana: "Pacific/Fiji" },

  // Europe
  { city: "London", country: "United Kingdom", flag: "🇬🇧", iana: "Europe/London" },
  { city: "Manchester", country: "United Kingdom", flag: "🇬🇧", iana: "Europe/London" },
  { city: "Dublin", country: "Ireland", flag: "🇮🇪", iana: "Europe/Dublin" },
  { city: "Paris", country: "France", flag: "🇫🇷", iana: "Europe/Paris" },
  { city: "Berlin", country: "Germany", flag: "🇩🇪", iana: "Europe/Berlin" },
  { city: "Munich", country: "Germany", flag: "🇩🇪", iana: "Europe/Berlin" },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪", iana: "Europe/Berlin" },
  { city: "Madrid", country: "Spain", flag: "🇪🇸", iana: "Europe/Madrid" },
  { city: "Barcelona", country: "Spain", flag: "🇪🇸", iana: "Europe/Madrid" },
  { city: "Rome", country: "Italy", flag: "🇮🇹", iana: "Europe/Rome" },
  { city: "Milan", country: "Italy", flag: "🇮🇹", iana: "Europe/Rome" },
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", iana: "Europe/Amsterdam" },
  { city: "Brussels", country: "Belgium", flag: "🇧🇪", iana: "Europe/Brussels" },
  { city: "Vienna", country: "Austria", flag: "🇦🇹", iana: "Europe/Vienna" },
  { city: "Zurich", country: "Switzerland", flag: "🇨🇭", iana: "Europe/Zurich" },
  { city: "Geneva", country: "Switzerland", flag: "🇨🇭", iana: "Europe/Zurich" },
  { city: "Copenhagen", country: "Denmark", flag: "🇩🇰", iana: "Europe/Copenhagen" },
  { city: "Stockholm", country: "Sweden", flag: "🇸🇪", iana: "Europe/Stockholm" },
  { city: "Oslo", country: "Norway", flag: "🇳🇴", iana: "Europe/Oslo" },
  { city: "Helsinki", country: "Finland", flag: "🇫🇮", iana: "Europe/Helsinki" },
  { city: "Warsaw", country: "Poland", flag: "🇵🇱", iana: "Europe/Warsaw" },
  { city: "Prague", country: "Czech Republic", flag: "🇨🇿", iana: "Europe/Prague" },
  { city: "Budapest", country: "Hungary", flag: "🇭🇺", iana: "Europe/Budapest" },
  { city: "Athens", country: "Greece", flag: "🇬🇷", iana: "Europe/Athens" },
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹", iana: "Europe/Lisbon" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷", iana: "Europe/Istanbul" },
  { city: "Moscow", country: "Russia", flag: "🇷🇺", iana: "Europe/Moscow" },
  { city: "Kyiv", country: "Ukraine", flag: "🇺🇦", iana: "Europe/Kyiv" },
  { city: "Bucharest", country: "Romania", flag: "🇷🇴", iana: "Europe/Bucharest" },
  { city: "Sofia", country: "Bulgaria", flag: "🇧🇬", iana: "Europe/Sofia" },
  { city: "Belgrade", country: "Serbia", flag: "🇷🇸", iana: "Europe/Belgrade" },
  { city: "Zagreb", country: "Croatia", flag: "🇭🇷", iana: "Europe/Zagreb" },
  { city: "Reykjavik", country: "Iceland", flag: "🇮🇸", iana: "Atlantic/Reykjavik" },

  // Africa
  { city: "Cairo", country: "Egypt", flag: "🇪🇬", iana: "Africa/Cairo" },
  { city: "Lagos", country: "Nigeria", flag: "🇳🇬", iana: "Africa/Lagos" },
  { city: "Nairobi", country: "Kenya", flag: "🇰🇪", iana: "Africa/Nairobi" },
  { city: "Johannesburg", country: "South Africa", flag: "🇿🇦", iana: "Africa/Johannesburg" },
  { city: "Cape Town", country: "South Africa", flag: "🇿🇦", iana: "Africa/Johannesburg" },
  { city: "Casablanca", country: "Morocco", flag: "🇲🇦", iana: "Africa/Casablanca" },
  { city: "Algiers", country: "Algeria", flag: "🇩🇿", iana: "Africa/Algiers" },
  { city: "Tunis", country: "Tunisia", flag: "🇹🇳", iana: "Africa/Tunis" },
  { city: "Accra", country: "Ghana", flag: "🇬🇭", iana: "Africa/Accra" },
  { city: "Addis Ababa", country: "Ethiopia", flag: "🇪🇹", iana: "Africa/Addis_Ababa" },

  // Americas
  { city: "New York", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Washington DC", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Chicago", country: "United States", flag: "🇺🇸", iana: "America/Chicago" },
  { city: "Houston", country: "United States", flag: "🇺🇸", iana: "America/Chicago" },
  { city: "Denver", country: "United States", flag: "🇺🇸", iana: "America/Denver" },
  { city: "Los Angeles", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "San Francisco", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "Seattle", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "Anchorage", country: "United States", flag: "🇺🇸", iana: "America/Anchorage" },
  { city: "Honolulu", country: "United States", flag: "🇺🇸", iana: "Pacific/Honolulu" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", iana: "America/Toronto" },
  { city: "Vancouver", country: "Canada", flag: "🇨🇦", iana: "America/Vancouver" },
  { city: "Montreal", country: "Canada", flag: "🇨🇦", iana: "America/Toronto" },
  { city: "Mexico City", country: "Mexico", flag: "🇲🇽", iana: "America/Mexico_City" },
  { city: "Bogotá", country: "Colombia", flag: "🇨🇴", iana: "America/Bogota" },
  { city: "Lima", country: "Peru", flag: "🇵🇪", iana: "America/Lima" },
  { city: "Quito", country: "Ecuador", flag: "🇪🇨", iana: "America/Guayaquil" },
  { city: "Santiago", country: "Chile", flag: "🇨🇱", iana: "America/Santiago" },
  { city: "Buenos Aires", country: "Argentina", flag: "🇦🇷", iana: "America/Argentina/Buenos_Aires" },
  { city: "São Paulo", country: "Brazil", flag: "🇧🇷", iana: "America/Sao_Paulo" },
  { city: "Rio de Janeiro", country: "Brazil", flag: "🇧🇷", iana: "America/Sao_Paulo" },
  { city: "Caracas", country: "Venezuela", flag: "🇻🇪", iana: "America/Caracas" },
  { city: "Montevideo", country: "Uruguay", flag: "🇺🇾", iana: "America/Montevideo" },
  { city: "Asunción", country: "Paraguay", flag: "🇵🇾", iana: "America/Asuncion" },
  { city: "La Paz", country: "Bolivia", flag: "🇧🇴", iana: "America/La_Paz" },
  { city: "Havana", country: "Cuba", flag: "🇨🇺", iana: "America/Havana" },
  { city: "Santo Domingo", country: "Dominican Republic", flag: "🇩🇴", iana: "America/Santo_Domingo" },
  { city: "San Juan", country: "Puerto Rico", flag: "🇵🇷", iana: "America/Puerto_Rico" },
];

function getTimeInZone(iana: string, now: Date) {
  try {
    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
    const dateStr = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(now);
    const ampm = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(now);
    // Compute offset
    const offsetFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      timeZoneName: "shortOffset",
    }).format(now);
    const offsetMatch = offsetFmt.match(/GMT([+-]\d{1,2}:?\d{0,2})/);
    const offset = offsetMatch ? `UTC${offsetMatch[1]}` : "";
    return { time: timeStr, date: dateStr, ampm, offset };
  } catch {
    return { time: "--:--:--", date: "Unknown", ampm: "", offset: "" };
  }
}

export default function WorldTimePage() {
  const [now, setNow] = useState(new Date());
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["Asia/Karachi", "Asia/Dubai", "Asia/Riyadh", "Europe/London", "America/New_York"]);

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const toggleFavorite = (iana: string) => {
    setFavorites((prev) =>
      prev.includes(iana) ? prev.filter((x) => x !== iana) : [...prev, iana]
    );
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return ZONES;
    const q = search.toLowerCase();
    return ZONES.filter(
      (z) =>
        z.city.toLowerCase().includes(q) ||
        z.country.toLowerCase().includes(q) ||
        z.iana.toLowerCase().includes(q)
    );
  }, [search]);

  const favZones = filtered.filter((z) => favorites.includes(z.iana));
  const otherZones = filtered.filter((z) => !favorites.includes(z.iana));

  return (
    <>
      <section className="pattern-navy relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link
            href="/tools/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-on-navy-muted hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            World Time Zone Converter
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Live current time in {ZONES.length} major cities around the world.
            Tap any city to add it to your favorites. DST is auto-applied.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, country, or timezone (e.g. Dubai, Pakistan, Asia/Karachi)..."
                className="w-full h-14 rounded-2xl input-recessed border-transparent pl-12 pr-4 text-base text-foreground focus:ring-2 focus:ring-teal/20 outline-none"
              />
            </div>
          </div>

          {/* Favorites */}
          {favZones.length > 0 && (
            <div className="mb-10">
              <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" />
                Pinned ({favZones.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favZones.map((z) => (
                  <TimeCard key={`${z.iana}-${z.city}`} zone={z} now={now} pinned onToggle={toggleFavorite} />
                ))}
              </div>
            </div>
          )}

          {/* All cities */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-teal" />
              All Cities ({otherZones.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherZones.map((z) => (
                <TimeCard key={`${z.iana}-${z.city}`} zone={z} now={now} onToggle={toggleFavorite} />
              ))}
            </div>
            {otherZones.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No cities found matching &ldquo;{search}&rdquo;.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function TimeCard({
  zone,
  now,
  pinned,
  onToggle,
}: {
  zone: Zone;
  now: Date;
  pinned?: boolean;
  onToggle: (iana: string) => void;
}) {
  const t = getTimeInZone(zone.iana, now);
  return (
    <button
      type="button"
      data-no-touch-target
      onClick={() => onToggle(zone.iana)}
      className={`group text-left glass rounded-2xl p-5 border transition-all duration-200 hover:shadow-md ${
        pinned ? "border-gold/60 bg-gold/5" : "border-border/60 hover:border-teal/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{zone.flag}</span>
            <span className="font-heading text-base font-semibold text-foreground">{zone.city}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{zone.country}</p>
        </div>
        <span
          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
            pinned ? "bg-gold/20 text-gold" : "bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          }`}
        >
          {pinned ? "Pinned" : "Pin"}
        </span>
      </div>
      <div className="font-mono text-3xl font-bold text-foreground tabular-nums tracking-tight">
        {t.time}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {t.date} · {t.offset}
      </div>
    </button>
  );
}
