"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Plane } from "lucide-react";

// IATA Airport Code Lookup — search by IATA code (LHR, JFK, DXB) or city name.
// Returns full airport name, city, country, ISO country code, and IANA time zone
// for current time at the airport.
//
// Sources: IATA official codes, airport websites. Updated late 2025.

type Airport = { code: string; name: string; city: string; country: string; iso: string; flag: string; iana: string };

const AIRPORTS: Airport[] = [
  // Pakistan
  { code: "ISB", name: "Islamabad International Airport", city: "Islamabad", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "LHE", name: "Allama Iqbal International Airport", city: "Lahore", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "KHI", name: "Jinnah International Airport", city: "Karachi", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "PEW", name: "Bacha Khan International Airport", city: "Peshawar", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "MUX", name: "Multan International Airport", city: "Multan", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "SKT", name: "Sialkot International Airport", city: "Sialkot", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "UET", name: "Quetta International Airport", city: "Quetta", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "LYP", name: "Faisalabad International Airport", city: "Faisalabad", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },
  { code: "GIL", name: "Gilgit Airport", city: "Gilgit", country: "Pakistan", iso: "PK", flag: "🇵🇰", iana: "Asia/Karachi" },

  // UAE
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE", iso: "AE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { code: "AUH", name: "Zayed International Airport", city: "Abu Dhabi", country: "UAE", iso: "AE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { code: "SHJ", name: "Sharjah International Airport", city: "Sharjah", country: "UAE", iso: "AE", flag: "🇦🇪", iana: "Asia/Dubai" },

  // Saudi Arabia
  { code: "JED", name: "King Abdulaziz International Airport", city: "Jeddah", country: "Saudi Arabia", iso: "SA", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { code: "RUH", name: "King Khalid International Airport", city: "Riyadh", country: "Saudi Arabia", iso: "SA", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { code: "MED", name: "Prince Mohammad bin Abdulaziz Airport", city: "Medinah", country: "Saudi Arabia", iso: "SA", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { code: "DMM", name: "King Fahd International Airport", city: "Dammam", country: "Saudi Arabia", iso: "SA", flag: "🇸🇦", iana: "Asia/Riyadh" },

  // Qatar, Oman, Kuwait, Bahrain
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar", iso: "QA", flag: "🇶🇦", iana: "Asia/Qatar" },
  { code: "MCT", name: "Muscat International Airport", city: "Muscat", country: "Oman", iso: "OM", flag: "🇴🇲", iana: "Asia/Muscat" },
  { code: "KWI", name: "Kuwait International Airport", city: "Kuwait City", country: "Kuwait", iso: "KW", flag: "🇰🇼", iana: "Asia/Kuwait" },
  { code: "BAH", name: "Bahrain International Airport", city: "Manama", country: "Bahrain", iso: "BH", flag: "🇧🇭", iana: "Asia/Bahrain" },

  // Turkey & Iran
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", iso: "TR", flag: "🇹🇷", iana: "Europe/Istanbul" },
  { code: "SAW", name: "Sabiha Gökçen International Airport", city: "Istanbul", country: "Turkey", iso: "TR", flag: "🇹🇷", iana: "Europe/Istanbul" },
  { code: "IKA", name: "Tehran Imam Khomeini International Airport", city: "Tehran", country: "Iran", iso: "IR", flag: "🇮🇷", iana: "Asia/Tehran" },

  // South Asia
  { code: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India", iso: "IN", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India", iso: "IN", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India", iso: "IN", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { code: "BLR", name: "Kempegowda International Airport", city: "Bangalore", country: "India", iso: "IN", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India", iso: "IN", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { code: "DAC", name: "Hazrat Shahjalal International Airport", city: "Dhaka", country: "Bangladesh", iso: "BD", flag: "🇧🇩", iana: "Asia/Dhaka" },
  { code: "CMB", name: "Bandaranaike International Airport", city: "Colombo", country: "Sri Lanka", iso: "LK", flag: "🇱🇰", iana: "Asia/Colombo" },
  { code: "KTM", name: "Tribhuvan International Airport", city: "Kathmandu", country: "Nepal", iso: "NP", flag: "🇳🇵", iana: "Asia/Kathmandu" },

  // East & Southeast Asia
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China", iso: "CN", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { code: "PVG", name: "Shanghai Pudong International Airport", city: "Shanghai", country: "China", iso: "CN", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { code: "CAN", name: "Guangzhou Baiyun International Airport", city: "Guangzhou", country: "China", iso: "CN", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong", iso: "HK", flag: "🇭🇰", iana: "Asia/Hong_Kong" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan", iso: "JP", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan", iso: "JP", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { code: "KIX", name: "Kansai International Airport", city: "Osaka", country: "Japan", iso: "JP", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea", iso: "KR", flag: "🇰🇷", iana: "Asia/Seoul" },
  { code: "TPE", name: "Taoyuan International Airport", city: "Taipei", country: "Taiwan", iso: "TW", flag: "🇹🇼", iana: "Asia/Taipei" },
  { code: "SIN", name: "Changi Airport", city: "Singapore", country: "Singapore", iso: "SG", flag: "🇸🇬", iana: "Asia/Singapore" },
  { code: "KUL", name: "Kuala Lumpur International Airport", city: "Kuala Lumpur", country: "Malaysia", iso: "MY", flag: "🇲🇾", iana: "Asia/Kuala_Lumpur" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", iso: "TH", flag: "🇹🇭", iana: "Asia/Bangkok" },
  { code: "DMK", name: "Don Mueang International Airport", city: "Bangkok", country: "Thailand", iso: "TH", flag: "🇹🇭", iana: "Asia/Bangkok" },
  { code: "HAN", name: "Noi Bai International Airport", city: "Hanoi", country: "Vietnam", iso: "VN", flag: "🇻🇳", iana: "Asia/Ho_Chi_Minh" },
  { code: "SGN", name: "Tan Son Nhat International Airport", city: "Ho Chi Minh City", country: "Vietnam", iso: "VN", flag: "🇻🇳", iana: "Asia/Ho_Chi_Minh" },
  { code: "CGK", name: "Soekarno-Hatta International Airport", city: "Jakarta", country: "Indonesia", iso: "ID", flag: "🇮🇩", iana: "Asia/Jakarta" },
  { code: "MNL", name: "Ninoy Aquino International Airport", city: "Manila", country: "Philippines", iso: "PH", flag: "🇵🇭", iana: "Asia/Manila" },
  { code: "PNH", name: "Phnom Penh International Airport", city: "Phnom Penh", country: "Cambodia", iso: "KH", flag: "🇰🇭", iana: "Asia/Bangkok" },

  // Europe
  { code: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom", iso: "GB", flag: "🇬🇧", iana: "Europe/London" },
  { code: "LGW", name: "London Gatwick Airport", city: "London", country: "United Kingdom", iso: "GB", flag: "🇬🇧", iana: "Europe/London" },
  { code: "MAN", name: "Manchester Airport", city: "Manchester", country: "United Kingdom", iso: "GB", flag: "🇬🇧", iana: "Europe/London" },
  { code: "BHX", name: "Birmingham Airport", city: "Birmingham", country: "United Kingdom", iso: "GB", flag: "🇬🇧", iana: "Europe/London" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland", iso: "IE", flag: "🇮🇪", iana: "Europe/Dublin" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France", iso: "FR", flag: "🇫🇷", iana: "Europe/Paris" },
  { code: "ORY", name: "Paris-Orly Airport", city: "Paris", country: "France", iso: "FR", flag: "🇫🇷", iana: "Europe/Paris" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", iso: "DE", flag: "🇩🇪", iana: "Europe/Berlin" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", iso: "DE", flag: "🇩🇪", iana: "Europe/Berlin" },
  { code: "MAD", name: "Madrid-Barajas Airport", city: "Madrid", country: "Spain", iso: "ES", flag: "🇪🇸", iana: "Europe/Madrid" },
  { code: "BCN", name: "Barcelona-El Prat Airport", city: "Barcelona", country: "Spain", iso: "ES", flag: "🇪🇸", iana: "Europe/Madrid" },
  { code: "FCO", name: "Rome-Fiumicino Airport", city: "Rome", country: "Italy", iso: "IT", flag: "🇮🇹", iana: "Europe/Rome" },
  { code: "LIN", name: "Milan-Linate Airport", city: "Milan", country: "Italy", iso: "IT", flag: "🇮🇹", iana: "Europe/Rome" },
  { code: "AMS", name: "Amsterdam Schiphol Airport", city: "Amsterdam", country: "Netherlands", iso: "NL", flag: "🇳🇱", iana: "Europe/Amsterdam" },
  { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium", iso: "BE", flag: "🇧🇪", iana: "Europe/Brussels" },
  { code: "VIE", name: "Vienna International Airport", city: "Vienna", country: "Austria", iso: "AT", flag: "🇦🇹", iana: "Europe/Vienna" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland", iso: "CH", flag: "🇨🇭", iana: "Europe/Zurich" },
  { code: "GVA", name: "Geneva Airport", city: "Geneva", country: "Switzerland", iso: "CH", flag: "🇨🇭", iana: "Europe/Zurich" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", iso: "DK", flag: "🇩🇰", iana: "Europe/Copenhagen" },
  { code: "ARN", name: "Stockholm Arlanda Airport", city: "Stockholm", country: "Sweden", iso: "SE", flag: "🇸🇪", iana: "Europe/Stockholm" },
  { code: "OSL", name: "Oslo Airport", city: "Oslo", country: "Norway", iso: "NO", flag: "🇳🇴", iana: "Europe/Oslo" },
  { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland", iso: "FI", flag: "🇫🇮", iana: "Europe/Helsinki" },
  { code: "WAW", name: "Warsaw Chopin Airport", city: "Warsaw", country: "Poland", iso: "PL", flag: "🇵🇱", iana: "Europe/Warsaw" },
  { code: "PRG", name: "Prague Airport", city: "Prague", country: "Czech Republic", iso: "CZ", flag: "🇨🇿", iana: "Europe/Prague" },
  { code: "BUD", name: "Budapest Airport", city: "Budapest", country: "Hungary", iso: "HU", flag: "🇭🇺", iana: "Europe/Budapest" },
  { code: "SVO", name: "Sheremetyevo International Airport", city: "Moscow", country: "Russia", iso: "RU", flag: "🇷🇺", iana: "Europe/Moscow" },
  { code: "KBP", name: "Boryspil International Airport", city: "Kyiv", country: "Ukraine", iso: "UA", flag: "🇺🇦", iana: "Europe/Kyiv" },
  { code: "ATH", name: "Athens International Airport", city: "Athens", country: "Greece", iso: "GR", flag: "🇬🇷", iana: "Europe/Athens" },
  { code: "LIS", name: "Humberto Delgado Airport", city: "Lisbon", country: "Portugal", iso: "PT", flag: "🇵🇹", iana: "Europe/Lisbon" },
  { code: "KEF", name: "Keflavík International Airport", city: "Reykjavik", country: "Iceland", iso: "IS", flag: "🇮🇸", iana: "Atlantic/Reykjavik" },

  // Africa
  { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt", iso: "EG", flag: "🇪🇬", iana: "Africa/Cairo" },
  { code: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria", iso: "NG", flag: "🇳🇬", iana: "Africa/Lagos" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya", iso: "KE", flag: "🇰🇪", iana: "Africa/Nairobi" },
  { code: "JNB", name: "OR Tambo International Airport", city: "Johannesburg", country: "South Africa", iso: "ZA", flag: "🇿🇦", iana: "Africa/Johannesburg" },
  { code: "CPT", name: "Cape Town International Airport", city: "Cape Town", country: "South Africa", iso: "ZA", flag: "🇿🇦", iana: "Africa/Johannesburg" },
  { code: "CMN", name: "Mohammed V International Airport", city: "Casablanca", country: "Morocco", iso: "MA", flag: "🇲🇦", iana: "Africa/Casablanca" },
  { code: "ALG", name: "Houari Boumediene Airport", city: "Algiers", country: "Algeria", iso: "DZ", flag: "🇩🇿", iana: "Africa/Algiers" },
  { code: "ADD", name: "Bole International Airport", city: "Addis Ababa", country: "Ethiopia", iso: "ET", flag: "🇪🇹", iana: "Africa/Addis_Ababa" },

  // Americas
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/New_York" },
  { code: "EWR", name: "Newark Liberty International Airport", city: "New York", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/New_York" },
  { code: "LGA", name: "LaGuardia Airport", city: "New York", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/New_York" },
  { code: "IAD", name: "Dulles International Airport", city: "Washington, D.C.", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/New_York" },
  { code: "ORD", name: "O'Hare International Airport", city: "Chicago", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/Chicago" },
  { code: "IAH", name: "George Bush Intercontinental Airport", city: "Houston", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/Chicago" },
  { code: "DEN", name: "Denver International Airport", city: "Denver", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/Denver" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/New_York" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "United States", iso: "US", flag: "🇺🇸", iana: "America/New_York" },
  { code: "HNL", name: "Daniel K. Inouye International Airport", city: "Honolulu", country: "United States", iso: "US", flag: "🇺🇸", iana: "Pacific/Honolulu" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada", iso: "CA", flag: "🇨🇦", iana: "America/Toronto" },
  { code: "YVR", name: "Vancouver International Airport", city: "Vancouver", country: "Canada", iso: "CA", flag: "🇨🇦", iana: "America/Vancouver" },
  { code: "YUL", name: "Montréal-Trudeau International Airport", city: "Montreal", country: "Canada", iso: "CA", flag: "🇨🇦", iana: "America/Toronto" },
  { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico", iso: "MX", flag: "🇲🇽", iana: "America/Mexico_City" },
  { code: "BOG", name: "El Dorado International Airport", city: "Bogotá", country: "Colombia", iso: "CO", flag: "🇨🇴", iana: "America/Bogota" },
  { code: "LIM", name: "Jorge Chávez International Airport", city: "Lima", country: "Peru", iso: "PE", flag: "🇵🇪", iana: "America/Lima" },
  { code: "EZE", name: "Ministro Pistarini International Airport", city: "Buenos Aires", country: "Argentina", iso: "AR", flag: "🇦🇷", iana: "America/Argentina/Buenos_Aires" },
  { code: "GRU", name: "São Paulo-Guarulhos International Airport", city: "São Paulo", country: "Brazil", iso: "BR", flag: "🇧🇷", iana: "America/Sao_Paulo" },
  { code: "GIG", name: "Rio de Janeiro/Galeão Airport", city: "Rio de Janeiro", country: "Brazil", iso: "BR", flag: "🇧🇷", iana: "America/Sao_Paulo" },
  { code: "SCL", name: "Arturo Merino Benítez International Airport", city: "Santiago", country: "Chile", iso: "CL", flag: "🇨🇱", iana: "America/Santiago" },

  // Oceania
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia", iso: "AU", flag: "🇦🇺", iana: "Australia/Sydney" },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", iso: "AU", flag: "🇦🇺", iana: "Australia/Melbourne" },
  { code: "PER", name: "Perth Airport", city: "Perth", country: "Australia", iso: "AU", flag: "🇦🇺", iana: "Australia/Perth" },
  { code: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", iso: "NZ", flag: "🇳🇿", iana: "Pacific/Auckland" },
  { code: "NAN", name: "Nadi International Airport", city: "Nadi", country: "Fiji", iso: "FJ", flag: "🇫🇯", iana: "Pacific/Fiji" },
];

function getCurrentTime(iana: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

export default function AirportCodesPage() {
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(new Date());

  // Tick every minute for live time display
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return AIRPORTS.sort((a, b) => a.code.localeCompare(b.code));
    const q = search.toUpperCase();
    const ql = search.toLowerCase();
    return AIRPORTS.filter(
      (a) =>
        a.code.includes(q) ||
        a.name.toLowerCase().includes(ql) ||
        a.city.toLowerCase().includes(ql) ||
        a.country.toLowerCase().includes(ql) ||
        a.iso.toLowerCase() === ql
    ).sort((a, b) => a.code.localeCompare(b.code));
  }, [search]);

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
            IATA Airport Code Lookup
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Search {AIRPORTS.length}+ major airports worldwide by IATA code
            (e.g. LHR, JFK, DXB) or city name. Returns full airport name, city,
            country, and current local time at the airport.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search IATA code, airport name, city, or country (e.g. LHR, Heathrow, London, UK)..."
              className="w-full h-14 rounded-2xl input-recessed border-transparent pl-12 pr-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
            />
          </div>

          <p className="text-sm text-muted-foreground mb-4">{filtered.length} airports found</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <div key={a.code} className="glass rounded-2xl p-5 border border-border/60 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{a.flag}</span>
                      <h3 className="font-mono text-xl font-bold text-foreground tracking-tight">{a.code}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{a.city}, {a.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Local time</p>
                    <p className="font-mono text-sm font-semibold text-teal tabular-nums">
                      {getCurrentTime(a.iana)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed break-words">{a.name}</p>
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">IANA: {a.iana}</span>
                  <Plane className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No airports found matching &ldquo;{search}&rdquo;.
            </p>
          )}

          <div className="mt-8 p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">About IATA codes:</strong> The
            3-letter codes you see on your boarding pass (e.g. LHR, DXB, JED)
            are assigned by the International Air Transport Association. This
            tool covers {AIRPORTS.length}+ major airports worldwide. Looking
            for a smaller airport not listed?{" "}
            <Link href="/contact" className="text-teal hover:text-gold underline">
              Contact us
            </Link>{" "}
            and we&apos;ll help you find it.
          </div>
        </div>
      </section>
    </>
  );
}
