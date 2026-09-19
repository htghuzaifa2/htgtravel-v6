"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Phone, Shield, Heart, Flame, Globe } from "lucide-react";

// Country Emergency Numbers Directory — police, ambulance, fire numbers
// for every country a Pakistani traveler is likely to visit.
// No pricing — safety reference info only.
// Sources: WHO, national emergency services directories. Updated late 2025.

type Country = {
  name: string;
  iso: string;
  flag: string;
  region: string;
  police: string;
  ambulance: string;
  fire: string;
  // Some countries have a single unified number (EU 112, etc.)
  unified?: string;
  notes?: string;
};

const COUNTRIES: Country[] = [
  // ===== Unified emergency numbers (EU 112, etc.) =====
  { name: "Pakistan", iso: "PK", flag: "🇵🇰", region: "South Asia", police: "15", ambulance: "1120", fire: "16", notes: "Rescue 1122 in Punjab" },
  { name: "India", iso: "IN", flag: "🇮🇳", region: "South Asia", police: "100", ambulance: "108", fire: "101" },
  { name: "Bangladesh", iso: "BD", flag: "🇧🇩", region: "South Asia", police: "999", ambulance: "199", fire: "955" },
  { name: "Sri Lanka", iso: "LK", flag: "🇱🇰", region: "South Asia", police: "119", ambulance: "110", fire: "118" },
  { name: "Nepal", iso: "NP", flag: "🇳🇵", region: "South Asia", police: "100", ambulance: "102", fire: "101" },
  { name: "Afghanistan", iso: "AF", flag: "🇦🇫", region: "South Asia", police: "100", ambulance: "102", fire: "101" },

  { name: "Saudi Arabia", iso: "SA", flag: "🇸🇦", region: "Middle East", police: "999", ambulance: "997", fire: "999" },
  { name: "UAE", iso: "AE", flag: "🇦🇪", region: "Middle East", police: "999", ambulance: "998", fire: "997" },
  { name: "Qatar", iso: "QA", flag: "🇶🇦", region: "Middle East", police: "999", ambulance: "999", fire: "999", unified: "999" },
  { name: "Oman", iso: "OM", flag: "🇴🇲", region: "Middle East", police: "999", ambulance: "999", fire: "999" },
  { name: "Kuwait", iso: "KW", flag: "🇰🇼", region: "Middle East", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Bahrain", iso: "BH", flag: "🇧🇭", region: "Middle East", police: "999", ambulance: "999", fire: "999" },
  { name: "Turkey", iso: "TR", flag: "🇹🇷", region: "Middle East", police: "155", ambulance: "112", fire: "110" },
  { name: "Iran", iso: "IR", flag: "🇮🇷", region: "Middle East", police: "110", ambulance: "115", fire: "125" },
  { name: "Iraq", iso: "IQ", flag: "🇮🇶", region: "Middle East", police: "122", ambulance: "122", fire: "122", unified: "122" },
  { name: "Jordan", iso: "JO", flag: "🇯🇴", region: "Middle East", police: "911", ambulance: "911", fire: "911", unified: "911" },
  { name: "Lebanon", iso: "LB", flag: "🇱🇧", region: "Middle East", police: "112", ambulance: "140", fire: "175" },
  { name: "Israel", iso: "IL", flag: "🇮🇱", region: "Middle East", police: "100", ambulance: "101", fire: "102" },
  { name: "Egypt", iso: "EG", flag: "🇪🇬", region: "Middle East", police: "122", ambulance: "123", fire: "180" },

  { name: "China", iso: "CN", flag: "🇨🇳", region: "East Asia", police: "110", ambulance: "120", fire: "119" },
  { name: "Hong Kong", iso: "HK", flag: "🇭🇰", region: "East Asia", police: "999", ambulance: "999", fire: "999" },
  { name: "Japan", iso: "JP", flag: "🇯🇵", region: "East Asia", police: "110", ambulance: "119", fire: "119", notes: "Police & ambulance/fire share lines" },
  { name: "South Korea", iso: "KR", flag: "🇰🇷", region: "East Asia", police: "112", ambulance: "119", fire: "119" },
  { name: "Taiwan", iso: "TW", flag: "🇹🇼", region: "East Asia", police: "110", ambulance: "119", fire: "119" },
  { name: "Singapore", iso: "SG", flag: "🇸🇬", region: "Southeast Asia", police: "999", ambulance: "995", fire: "995" },
  { name: "Malaysia", iso: "MY", flag: "🇲🇾", region: "Southeast Asia", police: "999", ambulance: "999", fire: "999" },
  { name: "Thailand", iso: "TH", flag: "🇹🇭", region: "Southeast Asia", police: "191", ambulance: "1669", fire: "199" },
  { name: "Vietnam", iso: "VN", flag: "🇻🇳", region: "Southeast Asia", police: "113", ambulance: "115", fire: "114" },
  { name: "Indonesia", iso: "ID", flag: "🇮🇩", region: "Southeast Asia", police: "110", ambulance: "118", fire: "113" },
  { name: "Philippines", iso: "PH", flag: "🇵🇭", region: "Southeast Asia", police: "117", ambulance: "911", fire: "911" },
  { name: "Cambodia", iso: "KH", flag: "🇰🇭", region: "Southeast Asia", police: "117", ambulance: "119", fire: "118" },
  { name: "Myanmar", iso: "MM", flag: "🇲🇲", region: "Southeast Asia", police: "199", ambulance: "192", fire: "191" },

  { name: "Uzbekistan", iso: "UZ", flag: "🇺🇿", region: "Central Asia", police: "102", ambulance: "103", fire: "101" },
  { name: "Kazakhstan", iso: "KZ", flag: "🇰🇿", region: "Central Asia", police: "102", ambulance: "103", fire: "101" },

  // ===== EU countries — most use 112 as universal =====
  { name: "United Kingdom", iso: "GB", flag: "🇬🇧", region: "Europe", police: "999", ambulance: "999", fire: "999", unified: "999" },
  { name: "Ireland", iso: "IE", flag: "🇮🇪", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "France", iso: "FR", flag: "🇫🇷", region: "Europe", police: "17", ambulance: "15", fire: "18", unified: "112" },
  { name: "Germany", iso: "DE", flag: "🇩🇪", region: "Europe", police: "110", ambulance: "112", fire: "112", unified: "112" },
  { name: "Spain", iso: "ES", flag: "🇪🇸", region: "Europe", police: "091", ambulance: "112", fire: "080", unified: "112" },
  { name: "Italy", iso: "IT", flag: "🇮🇹", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Netherlands", iso: "NL", flag: "🇳🇱", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Belgium", iso: "BE", flag: "🇧🇪", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Austria", iso: "AT", flag: "🇦🇹", region: "Europe", police: "112", ambulance: "144", fire: "122", unified: "112" },
  { name: "Switzerland", iso: "CH", flag: "🇨🇭", region: "Europe", police: "112", ambulance: "144", fire: "118", unified: "112" },
  { name: "Sweden", iso: "SE", flag: "🇸🇪", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Norway", iso: "NO", flag: "🇳🇴", region: "Europe", police: "112", ambulance: "113", fire: "110" },
  { name: "Denmark", iso: "DK", flag: "🇩🇰", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Finland", iso: "FI", flag: "🇫🇮", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Poland", iso: "PL", flag: "🇵🇱", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Czech Republic", iso: "CZ", flag: "🇨🇿", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Hungary", iso: "HU", flag: "🇭🇺", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Greece", iso: "GR", flag: "🇬🇷", region: "Europe", police: "100", ambulance: "166", fire: "199", unified: "112" },
  { name: "Portugal", iso: "PT", flag: "🇵🇹", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Russia", iso: "RU", flag: "🇷🇺", region: "Europe", police: "102", ambulance: "103", fire: "101" },
  { name: "Ukraine", iso: "UA", flag: "🇺🇦", region: "Europe", police: "102", ambulance: "103", fire: "101" },
  { name: "Romania", iso: "RO", flag: "🇷🇴", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Bulgaria", iso: "BG", flag: "🇧🇬", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Iceland", iso: "IS", flag: "🇮🇸", region: "Europe", police: "112", ambulance: "112", fire: "112", unified: "112" },

  { name: "South Africa", iso: "ZA", flag: "🇿🇦", region: "Africa", police: "10111", ambulance: "10177", fire: "10111" },
  { name: "Nigeria", iso: "NG", flag: "🇳🇬", region: "Africa", police: "112", ambulance: "112", fire: "112", unified: "112" },
  { name: "Kenya", iso: "KE", flag: "🇰🇪", region: "Africa", police: "999", ambulance: "999", fire: "999" },
  { name: "Morocco", iso: "MA", flag: "🇲🇦", region: "Africa", police: "19", ambulance: "150", fire: "15" },
  { name: "Tunisia", iso: "TN", flag: "🇹🇳", region: "Africa", police: "197", ambulance: "190", fire: "198" },
  { name: "Algeria", iso: "DZ", flag: "🇩🇿", region: "Africa", police: "17", ambulance: "16", fire: "14" },
  { name: "Ethiopia", iso: "ET", flag: "🇪🇹", region: "Africa", police: "991", ambulance: "902", fire: "939" },
  { name: "Ghana", iso: "GH", flag: "🇬🇭", region: "Africa", police: "191", ambulance: "193", fire: "192" },

  { name: "United States", iso: "US", flag: "🇺🇸", region: "North America", police: "911", ambulance: "911", fire: "911", unified: "911" },
  { name: "Canada", iso: "CA", flag: "🇨🇦", region: "North America", police: "911", ambulance: "911", fire: "911", unified: "911" },
  { name: "Mexico", iso: "MX", flag: "🇲🇽", region: "North America", police: "911", ambulance: "911", fire: "911", unified: "911" },
  { name: "Brazil", iso: "BR", flag: "🇧🇷", region: "South America", police: "190", ambulance: "192", fire: "193" },
  { name: "Argentina", iso: "AR", flag: "🇦🇷", region: "South America", police: "911", ambulance: "911", fire: "911", unified: "911" },
  { name: "Chile", iso: "CL", flag: "🇨🇱", region: "South America", police: "133", ambulance: "131", fire: "132" },
  { name: "Colombia", iso: "CO", flag: "🇨🇴", region: "South America", police: "123", ambulance: "123", fire: "123", unified: "123" },
  { name: "Peru", iso: "PE", flag: "🇵🇪", region: "South America", police: "105", ambulance: "106", fire: "116" },
  { name: "Venezuela", iso: "VE", flag: "🇻🇪", region: "South America", police: "911", ambulance: "911", fire: "911", unified: "911" },
  { name: "Cuba", iso: "CU", flag: "🇨🇺", region: "North America", police: "106", ambulance: "104", fire: "105" },
  { name: "Dominican Republic", iso: "DO", flag: "🇩🇴", region: "North America", police: "911", ambulance: "911", fire: "911", unified: "911" },

  { name: "Australia", iso: "AU", flag: "🇦🇺", region: "Oceania", police: "000", ambulance: "000", fire: "000", unified: "000" },
  { name: "New Zealand", iso: "NZ", flag: "🇳🇿", region: "Oceania", police: "111", ambulance: "111", fire: "111", unified: "111" },
  { name: "Fiji", iso: "FJ", flag: "🇫🇯", region: "Oceania", police: "911", ambulance: "911", fire: "911", unified: "911" },
];

const REGIONS = ["All", "South Asia", "Middle East", "East Asia", "Southeast Asia", "Central Asia", "Europe", "Africa", "North America", "South America", "Oceania"];

export default function EmergencyNumbersPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    let list = COUNTRIES;
    if (region !== "All") list = list.filter((c) => c.region === region);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.iso.toLowerCase() === q ||
          c.region.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, region]);

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
            Country Emergency Numbers Directory
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Police, ambulance, and fire emergency numbers for {COUNTRIES.length}+
            countries. Save these before you travel — knowing the local emergency
            number can save a life.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-6 space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country name (e.g. Dubai, Saudi Arabia, USA)..."
                className="w-full h-14 rounded-2xl input-recessed border-transparent pl-12 pr-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  data-no-touch-target
                  onClick={() => setRegion(r)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                    region === r
                      ? "bg-teal text-white border-teal"
                      : "bg-transparent text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{filtered.length} countries found</p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <div key={c.iso} className="glass rounded-2xl p-5 border border-border/60 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{c.flag}</span>
                      <h3 className="font-heading text-base font-semibold text-foreground truncate">{c.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{c.region}</p>
                  </div>
                  {c.unified && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap">
                      Unified
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <EmergencyPill icon={<Shield className="h-4 w-4" />} label="Police" number={c.police} color="text-blue-700 dark:text-blue-300 bg-blue-500/10" />
                  <EmergencyPill icon={<Heart className="h-4 w-4" />} label="Ambulance" number={c.ambulance} color="text-red-700 dark:text-red-300 bg-red-500/10" />
                  <EmergencyPill icon={<Flame className="h-4 w-4" />} label="Fire" number={c.fire} color="text-amber-700 dark:text-amber-300 bg-amber-500/10" />
                </div>

                {c.unified && (
                  <div className="mt-3 pt-3 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-amber-700 dark:text-amber-300">{c.unified}</strong> works for all emergencies
                    </p>
                  </div>
                )}
                {c.notes && (
                  <p className="text-[11px] text-muted-foreground mt-2 italic text-center">
                    {c.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No countries found matching your filters.
            </p>
          )}

          {/* Safety banner */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-amber-500/10 border border-red-500/20">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
              Travel Safety Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-teal mt-0.5">•</span> Save your home country&apos;s embassy number before traveling abroad</li>
              <li className="flex items-start gap-2"><span className="text-teal mt-0.5">•</span> In the EU, 112 works in all 27 member states — even without a SIM</li>
              <li className="flex items-start gap-2"><span className="text-teal mt-0.5">•</span> Most mobile networks allow emergency calls even without credit/SIM (GSM standard)</li>
              <li className="flex items-start gap-2"><span className="text-teal mt-0.5">•</span> For Pakistani citizens abroad, the Ministry of Foreign Affairs operates a 24/7 helpline: <strong className="text-foreground">+92 51 9207850</strong></li>
              <li className="flex items-start gap-2"><span className="text-teal mt-0.5">•</span> Always know the local emergency number of your destination — it can save your life</li>
            </ul>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Emergency
            numbers can change. Always verify with your hotel, tour operator,
            or local authorities upon arrival. This directory is for general
            reference only.
          </div>
        </div>
      </section>
    </>
  );
}

function EmergencyPill({ icon, label, number, color }: { icon: React.ReactNode; label: string; number: string; color: string }) {
  return (
    <div className={`p-2 rounded-lg ${color}`}>
      <div className="flex items-center justify-center mb-1 opacity-80">
        {icon}
      </div>
      <p className="text-[10px] uppercase tracking-wider opacity-80">{label}</p>
      <p className="font-mono font-bold text-base tabular-nums">{number}</p>
    </div>
  );
}
