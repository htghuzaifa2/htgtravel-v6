"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Globe, Stamp, Plane } from "lucide-react";

// Visa policy data for Pakistani passport holders as of late 2025.
// Sources: Henley Passport Index, IATA Travel Centre, embassy public pages.
// Status can change — always verify with the destination embassy before booking.
//
// NO PRICING DATA in this tool — only visa policy info.

type VisaStatus = "visa-free" | "visa-on-arrival" | "evisa" | "visa-required";

type Country = {
  name: string;
  flag: string;
  iso: string;
  status: VisaStatus;
  stayDays?: number;
  notes?: string;
  region: "Asia" | "Middle East" | "Europe" | "Africa" | "Americas" | "Oceania" | "Caribbean";
};

const COUNTRIES: Country[] = [
  // ===== VISA-FREE =====
  { name: "Afghanistan", flag: "🇦🇫", iso: "AF", status: "visa-free", region: "Asia" },
  { name: "Bhutan", flag: "🇧🇹", iso: "BT", status: "visa-free", region: "Asia" },
  { name: "Dominica", flag: "🇩🇲", iso: "DM", status: "visa-free", stayDays: 21, region: "Caribbean" },
  { name: "Gambia", flag: "🇬🇲", iso: "GM", status: "visa-free", region: "Africa" },
  { name: "Haiti", flag: "🇭🇹", iso: "HT", status: "visa-free", stayDays: 90, region: "Caribbean" },
  { name: "Micronesia", flag: "🇫🇲", iso: "FM", status: "visa-free", stayDays: 30, region: "Oceania" },
  { name: "Saint Kitts & Nevis", flag: "🇰🇳", iso: "KN", status: "visa-free", stayDays: 90, region: "Caribbean" },
  { name: "Saint Vincent & Grenadines", flag: "🇻🇨", iso: "VC", status: "visa-free", stayDays: 30, region: "Caribbean" },
  { name: "Trinidad & Tobago", flag: "🇹🇹", iso: "TT", status: "visa-free", stayDays: 30, region: "Caribbean" },
  { name: "Vanuatu", flag: "🇻🇺", iso: "VU", status: "visa-free", stayDays: 30, region: "Oceania" },
  { name: "Yemen", flag: "🇾🇪", iso: "YE", status: "visa-free", region: "Middle East" },

  // ===== VISA ON ARRIVAL =====
  { name: "Bangladesh", flag: "🇧🇩", iso: "BD", status: "visa-on-arrival", stayDays: 30, region: "Asia" },
  { name: "Cambodia", flag: "🇰🇭", iso: "KH", status: "visa-on-arrival", stayDays: 30, region: "Asia" },
  { name: "Cape Verde", flag: "🇨🇻", iso: "CV", status: "visa-on-arrival", region: "Africa" },
  { name: "Comoros", flag: "🇰🇲", iso: "KM", status: "visa-on-arrival", region: "Africa" },
  { name: "Guinea-Bissau", flag: "🇬🇼", iso: "GW", status: "visa-on-arrival", region: "Africa" },
  { name: "Indonesia", flag: "🇮🇩", iso: "ID", status: "visa-on-arrival", stayDays: 30, region: "Asia" },
  { name: "Madagascar", flag: "🇲🇬", iso: "MG", status: "visa-on-arrival", stayDays: 90, region: "Africa" },
  { name: "Maldives", flag: "🇲🇻", iso: "MV", status: "visa-on-arrival", stayDays: 30, region: "Asia" },
  { name: "Mauritania", flag: "🇲🇷", iso: "MR", status: "visa-on-arrival", region: "Africa" },
  { name: "Mozambique", flag: "🇲🇿", iso: "MZ", status: "visa-on-arrival", stayDays: 30, region: "Africa" },
  { name: "Nepal", flag: "🇳🇵", iso: "NP", status: "visa-on-arrival", stayDays: 90, region: "Asia" },
  { name: "Palau", flag: "🇵🇼", iso: "PW", status: "visa-on-arrival", stayDays: 30, region: "Oceania" },
  { name: "Rwanda", flag: "🇷🇼", iso: "RW", status: "visa-on-arrival", stayDays: 30, region: "Africa" },
  { name: "Samoa", flag: "🇼🇸", iso: "WS", status: "visa-on-arrival", stayDays: 60, region: "Oceania" },
  { name: "Seychelles", flag: "🇸🇨", iso: "SC", status: "visa-on-arrival", region: "Africa" },
  { name: "Sierra Leone", flag: "🇸🇱", iso: "SL", status: "visa-on-arrival", region: "Africa" },
  { name: "Somalia", flag: "🇸🇴", iso: "SO", status: "visa-on-arrival", region: "Africa" },
  { name: "Sri Lanka", flag: "🇱🇰", iso: "LK", status: "visa-on-arrival", stayDays: 30, region: "Asia" },
  { name: "Timor-Leste", flag: "🇹🇱", iso: "TL", status: "visa-on-arrival", stayDays: 30, region: "Asia" },
  { name: "Tuvalu", flag: "🇹🇻", iso: "TV", status: "visa-on-arrival", stayDays: 30, region: "Oceania" },

  // ===== EVISA =====
  { name: "Albania", flag: "🇦🇱", iso: "AL", status: "evisa", region: "Europe" },
  { name: "Antigua & Barbuda", flag: "🇦🇬", iso: "AG", status: "evisa", region: "Caribbean" },
  { name: "Armenia", flag: "🇦🇲", iso: "AM", status: "evisa", stayDays: 120, region: "Asia" },
  { name: "Azerbaijan", flag: "🇦🇿", iso: "AZ", status: "evisa", stayDays: 30, region: "Asia" },
  { name: "Bahrain", flag: "🇧🇭", iso: "BH", status: "evisa", stayDays: 14, region: "Middle East" },
  { name: "Barbados", flag: "🇧🇧", iso: "BB", status: "evisa", region: "Caribbean" },
  { name: "Belize", flag: "🇧🇿", iso: "BZ", status: "evisa", region: "Caribbean" },
  { name: "Benin", flag: "🇧🇯", iso: "BJ", status: "evisa", region: "Africa" },
  { name: "Bolivia", flag: "🇧🇴", iso: "BO", status: "evisa", region: "Americas" },
  { name: "Bosnia & Herzegovina", flag: "🇧🇦", iso: "BA", status: "evisa", region: "Europe" },
  { name: "Botswana", flag: "🇧🇼", iso: "BW", status: "evisa", region: "Africa" },
  { name: "Burundi", flag: "🇧🇮", iso: "BI", status: "evisa", region: "Africa" },
  { name: "Cambodia", flag: "🇰🇭", iso: "KH2", status: "evisa", stayDays: 30, region: "Asia", notes: "Also visa-on-arrival" },
  { name: "Côte d'Ivoire", flag: "🇨🇮", iso: "CI", status: "evisa", region: "Africa" },
  { name: "Djibouti", flag: "🇩🇯", iso: "DJ", status: "evisa", region: "Africa" },
  { name: "Ecuador", flag: "🇪🇨", iso: "EC", status: "evisa", region: "Americas" },
  { name: "Egypt", flag: "🇪🇬", iso: "EG", status: "evisa", stayDays: 30, region: "Africa" },
  { name: "Equatorial Guinea", flag: "🇬🇶", iso: "GQ", status: "evisa", region: "Africa" },
  { name: "Ethiopia", flag: "🇪🇹", iso: "ET", status: "evisa", region: "Africa" },
  { name: "Gabon", flag: "🇬🇦", iso: "GA", status: "evisa", region: "Africa" },
  { name: "Georgia", flag: "🇬🇪", iso: "GE", status: "evisa", region: "Asia" },
  { name: "Guinea", flag: "🇬🇳", iso: "GN", status: "evisa", region: "Africa" },
  { name: "India", flag: "🇮🇳", iso: "IN", status: "evisa", stayDays: 60, region: "Asia", notes: "e-Tourist Visa, 30/60/365 days variants" },
  { name: "Iran", flag: "🇮🇷", iso: "IR", status: "evisa", region: "Middle East" },
  { name: "Jordan", flag: "🇯🇴", iso: "JO", status: "evisa", region: "Middle East" },
  { name: "Kenya", flag: "🇰🇪", iso: "KE", status: "evisa", region: "Africa" },
  { name: "Kuwait", flag: "🇰🇼", iso: "KW", status: "evisa", region: "Middle East" },
  { name: "Laos", flag: "🇱🇦", iso: "LA", status: "evisa", stayDays: 30, region: "Asia" },
  { name: "Lesotho", flag: "🇱🇸", iso: "LS", status: "evisa", region: "Africa" },
  { name: "Malawi", flag: "🇲🇼", iso: "MW", status: "evisa", region: "Africa" },
  { name: "Moldova", flag: "🇲🇩", iso: "MD", status: "evisa", region: "Europe" },
  { name: "Mongolia", flag: "🇲🇳", iso: "MN", status: "evisa", region: "Asia" },
  { name: "Montserrat", flag: "🇲🇸", iso: "MS2", status: "evisa", region: "Caribbean" },
  { name: "Myanmar", flag: "🇲🇲", iso: "MM", status: "evisa", stayDays: 28, region: "Asia" },
  { name: "Namibia", flag: "🇳🇦", iso: "NA", status: "evisa", region: "Africa" },
  { name: "Nigeria", flag: "🇳🇬", iso: "NG", status: "evisa", region: "Africa" },
  { name: "Oman", flag: "🇴🇲", iso: "OM", status: "evisa", stayDays: 30, region: "Middle East" },
  { name: "Pakistan", flag: "🇵🇰", iso: "PK", status: "visa-free", region: "Asia", notes: "Home country" },
  { name: "Qatar", flag: "🇶🇦", iso: "QA", status: "evisa", stayDays: 30, region: "Middle East" },
  { name: "Russia", flag: "🇷🇺", iso: "RU", status: "evisa", region: "Europe" },
  { name: "São Tomé & Príncipe", flag: "🇸🇹", iso: "ST", status: "evisa", region: "Africa" },
  { name: "Saudi Arabia", flag: "🇸🇦", iso: "SA", status: "evisa", region: "Middle East", notes: "Tourist eVisa + Umrah visa" },
  { name: "South Sudan", flag: "🇸🇸", iso: "SS", status: "evisa", region: "Africa" },
  { name: "St. Lucia", flag: "🇱🇨", iso: "LC", status: "evisa", region: "Caribbean" },
  { name: "Suriname", flag: "🇸🇷", iso: "SR", status: "evisa", region: "Americas" },
  { name: "Tajikistan", flag: "🇹🇯", iso: "TJ", status: "evisa", region: "Asia" },
  { name: "Tanzania", flag: "🇹🇿", iso: "TZ", status: "evisa", region: "Africa" },
  { name: "Togo", flag: "🇹🇬", iso: "TG", status: "evisa", region: "Africa" },
  { name: "Tunisia", flag: "🇹🇳", iso: "TN", status: "evisa", region: "Africa" },
  { name: "Türkiye", flag: "🇹🇷", iso: "TR", status: "evisa", stayDays: 30, region: "Europe" },
  { name: "Turkmenistan", flag: "🇹🇲", iso: "TM", status: "evisa", region: "Asia" },
  { name: "Uganda", flag: "🇺🇬", iso: "UG", status: "evisa", region: "Africa" },
  { name: "United Arab Emirates", flag: "🇦🇪", iso: "AE", status: "evisa", stayDays: 30, region: "Middle East" },
  { name: "Uzbekistan", flag: "🇺🇿", iso: "UZ", status: "evisa", stayDays: 30, region: "Asia" },
  { name: "Zambia", flag: "🇿🇲", iso: "ZM", status: "evisa", region: "Africa" },
  { name: "Zimbabwe", flag: "🇿🇼", iso: "ZW", status: "evisa", region: "Africa" },
];

const STATUS_META: Record<VisaStatus, { label: string; color: string; bg: string; icon: typeof Stamp }> = {
  "visa-free": { label: "Visa-Free", color: "text-green-700 dark:text-green-300", bg: "bg-green-500/15 border-green-500/30", icon: Stamp },
  "visa-on-arrival": { label: "Visa on Arrival", color: "text-teal-700 dark:text-teal-300", bg: "bg-teal-500/15 border-teal-500/30", icon: Plane },
  "evisa": { label: "eVisa Available", color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-500/15 border-amber-500/30", icon: Stamp },
  "visa-required": { label: "Visa Required", color: "text-red-700 dark:text-red-300", bg: "bg-red-500/15 border-red-500/30", icon: Stamp },
};

export default function VisaFreePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | VisaStatus>("all");
  const [region, setRegion] = useState<"all" | Country["region"]>("all");

  const filtered = useMemo(() => {
    let list = COUNTRIES;
    if (filter !== "all") list = list.filter((c) => c.status === filter);
    if (region !== "all") list = list.filter((c) => c.region === region);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, filter, region]);

  const counts = useMemo(() => {
    const c = { "visa-free": 0, "visa-on-arrival": 0, "evisa": 0, "visa-required": 0 };
    COUNTRIES.forEach((country) => { c[country.status]++; });
    return c;
  }, []);

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
            Visa-Free Countries for Pakistani Passport
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Lookup visa policy for Pakistani citizens visiting {COUNTRIES.length}+ destinations.
            Filter by visa status (visa-free, visa-on-arrival, eVisa) or region.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {(["visa-free", "visa-on-arrival", "evisa"] as VisaStatus[]).map((s) => {
              const meta = STATUS_META[s];
              return (
                <div key={s} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
                  {meta.label}: {counts[s]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or region..."
                className="w-full h-14 rounded-2xl input-recessed border-transparent pl-12 pr-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All" count={COUNTRIES.length} />
              {(["visa-free", "visa-on-arrival", "evisa"] as VisaStatus[]).map((s) => (
                <FilterChip
                  key={s}
                  active={filter === s}
                  onClick={() => setFilter(s)}
                  label={STATUS_META[s].label}
                  count={counts[s]}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip small active={region === "all"} onClick={() => setRegion("all")} label="All Regions" />
              {(["Asia", "Middle East", "Europe", "Africa", "Americas", "Oceania", "Caribbean"] as Country["region"][]).map((r) => (
                <FilterChip
                  key={r}
                  small
                  active={region === r}
                  onClick={() => setRegion(r)}
                  label={r}
                />
              ))}
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} countries found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const meta = STATUS_META[c.status];
              const Icon = meta.icon;
              return (
                <div key={`${c.iso}-${c.name}`} className="glass rounded-2xl p-4 border border-border/60 hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-3xl">{c.flag}</span>
                      <div className="min-w-0">
                        <p className="font-heading text-base font-semibold text-foreground truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.region}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.bg} ${meta.color}`}>
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </div>
                  {c.stayDays && (
                    <p className="text-xs text-muted-foreground mt-2">Up to {c.stayDays} days stay</p>
                  )}
                  {c.notes && (
                    <p className="text-[11px] text-muted-foreground mt-1 italic">{c.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No countries found matching your filters.
            </p>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Visa policies
            change frequently. This data is indicative and based on publicly available
            sources (Henley Passport Index, IATA, embassy pages) as of late 2025.
            Always verify current visa requirements with the destination country&apos;s
            official embassy or consulate before booking travel. HTG Travels can help
            you with document preparation and visa consultation.
          </div>
        </div>
      </section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
  small,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      data-no-touch-target
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-${small ? "3" : "4"} py-1.5 text-xs font-medium transition ${
        active
          ? "bg-teal text-white border-teal"
          : "bg-transparent text-foreground border-border hover:bg-muted hover:border-teal/40"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[10px] ${active ? "text-white/80" : "text-muted-foreground"}`}>({count})</span>
      )}
    </button>
  );
}
