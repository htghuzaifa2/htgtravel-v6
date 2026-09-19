"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Search, Globe, Clock, Sun, Moon, SunMoon,
  Plane, Phone, ArrowRightLeft, Calendar,
} from "lucide-react";

// World Time Zone Converter — enhanced edition
//
// Features:
// - Live current time in 110+ major cities worldwide (1-second tick)
// - Day/Night indicator (sun icon for 6am-6pm, moon for night)
// - UTC offset displayed on every card
// - Time Difference Calculator (pick 2 cities, see diff + best call time)
// - Future Time Planner (slider — what time will it be at +N hours?)
// - Pin/unpin favorites (persisted in component state)
// - Search by city, country, or IANA timezone name
// - DST auto-applied via Intl.DateTimeFormat

type Zone = { city: string; country: string; flag: string; iana: string };

const ZONES: Zone[] = [
  // ===== Palestine (Gaza + West Bank) =====
  { city: "Gaza", country: "Palestine (Gaza)", flag: "🇵🇸", iana: "Asia/Gaza" },
  { city: "Ramallah", country: "Palestine (West Bank)", flag: "🇵🇸", iana: "Asia/Hebron" },
  { city: "Bethlehem", country: "Palestine (West Bank)", flag: "🇵🇸", iana: "Asia/Hebron" },
  { city: "Hebron", country: "Palestine (West Bank)", flag: "🇵🇸", iana: "Asia/Hebron" },
  { city: "Nablus", country: "Palestine (West Bank)", flag: "🇵🇸", iana: "Asia/Hebron" },

  // ===== Pakistan =====
  { city: "Karachi", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Lahore", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Islamabad", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Peshawar", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Multan", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Sialkot", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },
  { city: "Quetta", country: "Pakistan", flag: "🇵🇰", iana: "Asia/Karachi" },

  // ===== Middle East =====
  { city: "Dubai", country: "UAE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { city: "Abu Dhabi", country: "UAE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { city: "Sharjah", country: "UAE", flag: "🇦🇪", iana: "Asia/Dubai" },
  { city: "Riyadh", country: "Saudi Arabia", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { city: "Jeddah", country: "Saudi Arabia", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { city: "Medinah", country: "Saudi Arabia", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { city: "Mecca (Makkah)", country: "Saudi Arabia", flag: "🇸🇦", iana: "Asia/Riyadh" },
  { city: "Doha", country: "Qatar", flag: "🇶🇦", iana: "Asia/Qatar" },
  { city: "Muscat", country: "Oman", flag: "🇴🇲", iana: "Asia/Muscat" },
  { city: "Kuwait City", country: "Kuwait", flag: "🇰🇼", iana: "Asia/Kuwait" },
  { city: "Manama", country: "Bahrain", flag: "🇧🇭", iana: "Asia/Bahrain" },
  { city: "Tehran", country: "Iran", flag: "🇮🇷", iana: "Asia/Tehran" },
  { city: "Baghdad", country: "Iraq", flag: "🇮🇶", iana: "Asia/Baghdad" },
  { city: "Amman", country: "Jordan", flag: "🇯🇴", iana: "Asia/Amman" },
  { city: "Beirut", country: "Lebanon", flag: "🇱🇧", iana: "Asia/Beirut" },
  { city: "Damascus", country: "Syria", flag: "🇸🇾", iana: "Asia/Damascus" },
  { city: "Sana'a", country: "Yemen", flag: "🇾🇪", iana: "Asia/Aden" },

  // ===== South Asia =====
  { city: "New Delhi", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Mumbai", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Chennai", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Bangalore", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Hyderabad", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Kolkata", country: "India", flag: "🇮🇳", iana: "Asia/Kolkata" },
  { city: "Dhaka", country: "Bangladesh", flag: "🇧🇩", iana: "Asia/Dhaka" },
  { city: "Colombo", country: "Sri Lanka", flag: "🇱🇰", iana: "Asia/Colombo" },
  { city: "Kathmandu", country: "Nepal", flag: "🇳🇵", iana: "Asia/Kathmandu" },
  { city: "Kabul", country: "Afghanistan", flag: "🇦🇫", iana: "Asia/Kabul" },
  { city: "Thimphu", country: "Bhutan", flag: "🇧🇹", iana: "Asia/Thimphu" },
  { city: "Malé", country: "Maldives", flag: "🇲🇻", iana: "Indian/Maldives" },

  // ===== East & Southeast Asia =====
  { city: "Beijing", country: "China", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { city: "Shanghai", country: "China", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { city: "Guangzhou", country: "China", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { city: "Chengdu", country: "China", flag: "🇨🇳", iana: "Asia/Shanghai" },
  { city: "Hong Kong", country: "Hong Kong", flag: "🇭🇰", iana: "Asia/Hong_Kong" },
  { city: "Macau", country: "Macau", flag: "🇲🇴", iana: "Asia/Macau" },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { city: "Osaka", country: "Japan", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { city: "Sapporo", country: "Japan", flag: "🇯🇵", iana: "Asia/Tokyo" },
  { city: "Seoul", country: "South Korea", flag: "🇰🇷", iana: "Asia/Seoul" },
  { city: "Busan", country: "South Korea", flag: "🇰🇷", iana: "Asia/Seoul" },
  { city: "Pyongyang", country: "North Korea", flag: "🇰🇵", iana: "Asia/Pyongyang" },
  { city: "Taipei", country: "Taiwan", flag: "🇹🇼", iana: "Asia/Taipei" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", iana: "Asia/Singapore" },
  { city: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾", iana: "Asia/Kuala_Lumpur" },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭", iana: "Asia/Bangkok" },
  { city: "Phuket", country: "Thailand", flag: "🇹🇭", iana: "Asia/Bangkok" },
  { city: "Hanoi", country: "Vietnam", flag: "🇻🇳", iana: "Asia/Ho_Chi_Minh" },
  { city: "Ho Chi Minh City", country: "Vietnam", flag: "🇻🇳", iana: "Asia/Ho_Chi_Minh" },
  { city: "Jakarta", country: "Indonesia", flag: "🇮🇩", iana: "Asia/Jakarta" },
  { city: "Manila", country: "Philippines", flag: "🇵🇭", iana: "Asia/Manila" },
  { city: "Phnom Penh", country: "Cambodia", flag: "🇰🇭", iana: "Asia/Bangkok" },
  { city: "Vientiane", country: "Laos", flag: "🇱🇦", iana: "Asia/Bangkok" },
  { city: "Yangon", country: "Myanmar", flag: "🇲🇲", iana: "Asia/Yangon" },
  { city: "Brunei", country: "Brunei", flag: "🇧🇳", iana: "Asia/Brunei" },

  // ===== Central Asia =====
  { city: "Tashkent", country: "Uzbekistan", flag: "🇺🇿", iana: "Asia/Tashkent" },
  { city: "Samarkand", country: "Uzbekistan", flag: "🇺🇿", iana: "Asia/Samarkand" },
  { city: "Almaty", country: "Kazakhstan", flag: "🇰🇿", iana: "Asia/Almaty" },
  { city: "Astana", country: "Kazakhstan", flag: "🇰🇿", iana: "Asia/Almaty" },
  { city: "Bishkek", country: "Kyrgyzstan", flag: "🇰🇬", iana: "Asia/Bishkek" },
  { city: "Dushanbe", country: "Tajikistan", flag: "🇹🇯", iana: "Asia/Dushanbe" },
  { city: "Ashgabat", country: "Turkmenistan", flag: "🇹🇲", iana: "Asia/Ashgabat" },

  // ===== Oceania =====
  { city: "Sydney", country: "Australia", flag: "🇦🇺", iana: "Australia/Sydney" },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺", iana: "Australia/Melbourne" },
  { city: "Brisbane", country: "Australia", flag: "🇦🇺", iana: "Australia/Brisbane" },
  { city: "Perth", country: "Australia", flag: "🇦🇺", iana: "Australia/Perth" },
  { city: "Adelaide", country: "Australia", flag: "🇦🇺", iana: "Australia/Adelaide" },
  { city: "Auckland", country: "New Zealand", flag: "🇳🇿", iana: "Pacific/Auckland" },
  { city: "Wellington", country: "New Zealand", flag: "🇳🇿", iana: "Pacific/Auckland" },
  { city: "Fiji", country: "Fiji", flag: "🇫🇯", iana: "Pacific/Fiji" },
  { city: "Port Moresby", country: "Papua New Guinea", flag: "🇵🇬", iana: "Pacific/Port_Moresby" },

  // ===== Europe =====
  { city: "London", country: "United Kingdom", flag: "🇬🇧", iana: "Europe/London" },
  { city: "Manchester", country: "United Kingdom", flag: "🇬🇧", iana: "Europe/London" },
  { city: "Edinburgh", country: "United Kingdom", flag: "🇬🇧", iana: "Europe/London" },
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
  { city: "Reykjavik", country: "Iceland", flag: "🇮🇸", iana: "Atlantic/Reykjavik" },
  { city: "Warsaw", country: "Poland", flag: "🇵🇱", iana: "Europe/Warsaw" },
  { city: "Prague", country: "Czech Republic", flag: "🇨🇿", iana: "Europe/Prague" },
  { city: "Budapest", country: "Hungary", flag: "🇭🇺", iana: "Europe/Budapest" },
  { city: "Athens", country: "Greece", flag: "🇬🇷", iana: "Europe/Athens" },
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹", iana: "Europe/Lisbon" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷", iana: "Europe/Istanbul" },
  { city: "Moscow", country: "Russia", flag: "🇷🇺", iana: "Europe/Moscow" },
  { city: "Saint Petersburg", country: "Russia", flag: "🇷🇺", iana: "Europe/Moscow" },
  { city: "Kyiv", country: "Ukraine", flag: "🇺🇦", iana: "Europe/Kyiv" },
  { city: "Bucharest", country: "Romania", flag: "🇷🇴", iana: "Europe/Bucharest" },
  { city: "Sofia", country: "Bulgaria", flag: "🇧🇬", iana: "Europe/Sofia" },
  { city: "Belgrade", country: "Serbia", flag: "🇷🇸", iana: "Europe/Belgrade" },
  { city: "Zagreb", country: "Croatia", flag: "🇭🇷", iana: "Europe/Zagreb" },
  { city: "Sarajevo", country: "Bosnia & Herzegovina", flag: "🇧🇦", iana: "Europe/Sarajevo" },
  { city: "Tirana", country: "Albania", flag: "🇦🇱", iana: "Europe/Tirane" },
  { city: "Skopje", country: "North Macedonia", flag: "🇲🇰", iana: "Europe/Skopje" },

  // ===== Africa =====
  { city: "Cairo", country: "Egypt", flag: "🇪🇬", iana: "Africa/Cairo" },
  { city: "Alexandria", country: "Egypt", flag: "🇪🇬", iana: "Africa/Cairo" },
  { city: "Lagos", country: "Nigeria", flag: "🇳🇬", iana: "Africa/Lagos" },
  { city: "Nairobi", country: "Kenya", flag: "🇰🇪", iana: "Africa/Nairobi" },
  { city: "Johannesburg", country: "South Africa", flag: "🇿🇦", iana: "Africa/Johannesburg" },
  { city: "Cape Town", country: "South Africa", flag: "🇿🇦", iana: "Africa/Johannesburg" },
  { city: "Casablanca", country: "Morocco", flag: "🇲🇦", iana: "Africa/Casablanca" },
  { city: "Algiers", country: "Algeria", flag: "🇩🇿", iana: "Africa/Algiers" },
  { city: "Tunis", country: "Tunisia", flag: "🇹🇳", iana: "Africa/Tunis" },
  { city: "Accra", country: "Ghana", flag: "🇬🇭", iana: "Africa/Accra" },
  { city: "Addis Ababa", country: "Ethiopia", flag: "🇪🇹", iana: "Africa/Addis_Ababa" },
  { city: "Khartoum", country: "Sudan", flag: "🇸🇩", iana: "Africa/Khartoum" },
  { city: "Tripoli", country: "Libya", flag: "🇱🇾", iana: "Africa/Tripoli" },
  { city: "Dakar", country: "Senegal", flag: "🇸🇳", iana: "Africa/Dakar" },
  { city: "Dar es Salaam", country: "Tanzania", flag: "🇹🇿", iana: "Africa/Dar_es_Salaam" },
  { city: "Kampala", country: "Uganda", flag: "🇺🇬", iana: "Africa/Kampala" },
  { city: "Harare", country: "Zimbabwe", flag: "🇿🇼", iana: "Africa/Harare" },

  // ===== Americas =====
  { city: "New York", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Washington DC", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Miami", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Boston", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Atlanta", country: "United States", flag: "🇺🇸", iana: "America/New_York" },
  { city: "Chicago", country: "United States", flag: "🇺🇸", iana: "America/Chicago" },
  { city: "Houston", country: "United States", flag: "🇺🇸", iana: "America/Chicago" },
  { city: "Dallas", country: "United States", flag: "🇺🇸", iana: "America/Chicago" },
  { city: "Denver", country: "United States", flag: "🇺🇸", iana: "America/Denver" },
  { city: "Phoenix", country: "United States", flag: "🇺🇸", iana: "America/Phoenix" },
  { city: "Los Angeles", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "San Francisco", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "Seattle", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "Las Vegas", country: "United States", flag: "🇺🇸", iana: "America/Los_Angeles" },
  { city: "Anchorage", country: "United States", flag: "🇺🇸", iana: "America/Anchorage" },
  { city: "Honolulu", country: "United States", flag: "🇺🇸", iana: "Pacific/Honolulu" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", iana: "America/Toronto" },
  { city: "Vancouver", country: "Canada", flag: "🇨🇦", iana: "America/Vancouver" },
  { city: "Montreal", country: "Canada", flag: "🇨🇦", iana: "America/Toronto" },
  { city: "Calgary", country: "Canada", flag: "🇨🇦", iana: "America/Edmonton" },
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
  { city: "Kingston", country: "Jamaica", flag: "🇯🇲", iana: "America/Jamaica" },
];

function getZoneInfo(iana: string, base: Date) {
  try {
    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(base);
    const dateStr = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(base);
    const hour24 = parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: iana,
        hour: "2-digit",
        hour12: false,
      }).format(base),
      10
    );
    // Determine day vs night: 6:00-18:00 = day, 18:00-6:00 = night
    const isDay = hour24 >= 6 && hour24 < 18;

    // UTC offset
    const offsetFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      timeZoneName: "shortOffset",
    }).format(base);
    const offsetMatch = offsetFmt.match(/GMT([+-]\d{1,2}:?\d{0,2})/);
    const offset = offsetMatch ? `UTC${offsetMatch[1]}` : "";

    return { time: timeStr, date: dateStr, offset, isDay, hour: hour24 };
  } catch {
    return { time: "--:--:--", date: "Unknown", offset: "", isDay: true, hour: 12 };
  }
}

export default function WorldTimePage() {
  const [now, setNow] = useState(new Date());
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([
    "Asia/Karachi", "Asia/Riyadh", "Asia/Dubai", "Europe/London", "America/New_York",
  ]);

  // For Time Difference Calculator
  const [cityA, setCityA] = useState<string>("Asia/Karachi");
  const [cityB, setCityB] = useState<string>("America/New_York");

  // For Future Time Planner — hours offset from now
  const [futureHours, setFutureHours] = useState(0);

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const futureTime = useMemo(() => {
    const d = new Date(now.getTime() + futureHours * 60 * 60 * 1000);
    return d;
  }, [now, futureHours]);

  const toggleFavorite = useCallback((iana: string) => {
    setFavorites((prev) =>
      prev.includes(iana) ? prev.filter((x) => x !== iana) : [...prev, iana]
    );
  }, []);

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

  // Time difference calculator helpers
  const zoneA = ZONES.find((z) => z.iana === cityA);
  const zoneB = ZONES.find((z) => z.iana === cityB);

  const getOffsetMinutes = (iana: string, base: Date): number => {
    try {
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: iana,
        timeZoneName: "longOffset",
      }).formatToParts(base);
      const tz = fmt.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
      const m = tz.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
      if (!m) return 0;
      const sign = m[1] === "+" ? 1 : -1;
      const hours = parseInt(m[2], 10);
      const mins = m[3] ? parseInt(m[3], 10) : 0;
      return sign * (hours * 60 + mins);
    } catch {
      return 0;
    }
  };

  const offsetA = getOffsetMinutes(cityA, now);
  const offsetB = getOffsetMinutes(cityB, now);
  const diffMinutes = offsetA - offsetB;
  const diffHours = diffMinutes / 60;
  const diffAbs = Math.abs(diffHours);
  const diffSign = diffHours > 0 ? "ahead of" : diffHours < 0 ? "behind" : "same as";

  // Best time to call: overlap of 9am-6pm in both cities
  const getOverlap = () => {
    if (!zoneA || !zoneB) return null;
    // Convert city A's 9am-6pm to UTC
    const aStartUTC = (9 * 60 - offsetA + 1440) % 1440; // 9am in city A as UTC minutes
    const aEndUTC = (18 * 60 - offsetA + 1440) % 1440;
    const bStartUTC = (9 * 60 - offsetB + 1440) % 1440;
    const bEndUTC = (18 * 60 - offsetB + 1440) % 1440;
    // Simple overlap (ignoring wraparound for clarity)
    const startMax = Math.max(aStartUTC, bStartUTC);
    const endMin = Math.min(aEndUTC, bEndUTC);
    if (endMin > startMax) {
      const startH = Math.floor(startMax / 60);
      const endH = Math.floor(endMin / 60);
      const fmtH = (m: number) => {
        const h24 = Math.floor(m / 60) % 24;
        const h12 = h24 % 12 || 12;
        return `${h12}${h24 < 12 ? "am" : "pm"}`;
      };
      return `Best call window: ${fmtH(startMax)} – ${fmtH(endMin)} in ${zoneA.city}`;
    }
    return "No business-hours overlap — pick a different city pair or call outside business hours";
  };

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
            Live current time in {ZONES.length} major cities worldwide — including
            Palestine (Gaza & West Bank). Pin favorites, see UTC offsets, day/night
            indicator, time difference calculator, and future time planner.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* ============ TIME DIFFERENCE CALCULATOR ============ */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-border/60">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal" />
              Time Difference Calculator
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider">City A</label>
                <select
                  value={cityA}
                  onChange={(e) => setCityA(e.target.value)}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                >
                  {[...new Map(ZONES.map((z) => [z.iana, z])).values()].map((z) => (
                    <option key={z.iana} value={z.iana}>
                      {z.flag} {z.city}, {z.country}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                data-no-touch-target
                onClick={() => { setCityA(cityB); setCityB(cityA); }}
                className="sm:mb-1 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white hover:brightness-110 active:scale-95 transition shadow-md"
                aria-label="Swap cities"
                title="Swap"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider">City B</label>
                <select
                  value={cityB}
                  onChange={(e) => setCityB(e.target.value)}
                  className="w-full h-12 rounded-xl input-recessed border-transparent px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                >
                  {[...new Map(ZONES.map((z) => [z.iana, z])).values()].map((z) => (
                    <option key={z.iana} value={z.iana}>
                      {z.flag} {z.city}, {z.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {zoneA && (
                <div className="p-4 rounded-xl bg-muted/40 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{zoneA.flag} {zoneA.city}</p>
                  <p className="font-mono text-2xl font-bold text-foreground tabular-nums">
                    {getZoneInfo(cityA, now).time}
                  </p>
                  <p className="text-xs text-teal mt-1">{getZoneInfo(cityA, now).offset}</p>
                </div>
              )}
              {zoneB && (
                <div className="p-4 rounded-xl bg-muted/40 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{zoneB.flag} {zoneB.city}</p>
                  <p className="font-mono text-2xl font-bold text-foreground tabular-nums">
                    {getZoneInfo(cityB, now).time}
                  </p>
                  <p className="text-xs text-teal mt-1">{getZoneInfo(cityB, now).offset}</p>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-teal/10 to-gold/10 border border-teal/30">
              <p className="text-sm text-foreground">
                <strong className="font-semibold">{zoneA?.city}</strong> is{" "}
                <strong className="text-teal">
                  {diffAbs === 0 ? "the same time as" : `${diffAbs % 1 === 0 ? diffAbs : diffAbs.toFixed(1)} hours ${diffSign}`}
                </strong>{" "}
                <strong className="font-semibold">{zoneB?.city}</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                {getOverlap()}
              </p>
            </div>
          </div>

          {/* ============ FUTURE TIME PLANNER ============ */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-border/60">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold" />
              Future Time Planner
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Pick a time offset — see what time it will be in your pinned cities.
              Useful for scheduling calls, meetings, and travel.
            </p>

            <div className="mb-6">
              <input
                type="range"
                min={-12}
                max={48}
                step={1}
                value={futureHours}
                onChange={(e) => setFutureHours(Number(e.target.value))}
                className="w-full accent-[#0FA3A3] dark:accent-[#14B8B8]"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>-12h</span>
                <span className="font-bold text-teal text-base">
                  {futureHours >= 0 ? "+" : ""}{futureHours}h from now
                </span>
                <span>+48h</span>
              </div>
            </div>

            {/* Quick presets */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[-3, 0, 2, 6, 12, 24, 48].map((h) => (
                <button
                  key={h}
                  type="button"
                  data-no-touch-target
                  onClick={() => setFutureHours(h)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    futureHours === h
                      ? "bg-teal text-white border-teal"
                      : "bg-transparent text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {h === 0 ? "Now" : h > 0 ? `+${h}h` : `${h}h`}
                </button>
              ))}
            </div>

            {/* Future times in pinned cities */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {favZones.slice(0, 5).map((z) => {
                const info = getZoneInfo(z.iana, futureTime);
                return (
                  <div
                    key={`${z.iana}-${z.city}-future`}
                    className="p-3 rounded-xl bg-muted/40 border border-border text-center"
                  >
                    <p className="text-[10px] text-muted-foreground truncate">{z.flag} {z.city}</p>
                    <p className="font-mono text-base font-bold text-foreground tabular-nums">
                      {info.time.slice(0, 5)}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {info.isDay ? (
                        <Sun className="h-3 w-3 text-gold" />
                      ) : (
                        <Moon className="h-3 w-3 text-blue-400" />
                      )}
                      <span className="text-[10px] text-muted-foreground">
                        {info.isDay ? "Day" : "Night"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============ SEARCH + ALL CITIES ============ */}
          <div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, country, or timezone (e.g. Gaza, Pakistan, Asia/Karachi)..."
                className="w-full h-14 rounded-2xl input-recessed border-transparent pl-12 pr-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>

            {/* Pinned */}
            {favZones.length > 0 && (
              <div className="mb-10">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <SunMoon className="h-5 w-5 text-gold" />
                  Pinned ({favZones.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favZones.map((z) => (
                    <TimeCard
                      key={`${z.iana}-${z.city}-pinned`}
                      zone={z}
                      now={now}
                      pinned
                      onToggle={toggleFavorite}
                    />
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
                  <TimeCard
                    key={`${z.iana}-${z.city}`}
                    zone={z}
                    now={now}
                    onToggle={toggleFavorite}
                  />
                ))}
              </div>
              {otherZones.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  No cities found matching &ldquo;{search}&rdquo;.
                </p>
              )}
            </div>
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
  const t = getZoneInfo(zone.iana, now);
  // Subtle day/night background tint
  const bgTint = t.isDay
    ? "from-amber-500/5 to-transparent"
    : "from-blue-500/10 to-transparent";

  return (
    <button
      type="button"
      data-no-touch-target
      onClick={() => onToggle(zone.iana)}
      className={`group text-left glass rounded-2xl p-5 border transition-all duration-200 hover:shadow-md bg-gradient-to-br ${bgTint} ${
        pinned ? "border-gold/60 bg-gold/5" : "border-border/60 hover:border-teal/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{zone.flag}</span>
            <span className="font-heading text-base font-semibold text-foreground truncate">{zone.city}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{zone.country}</p>
        </div>
        {/* Day/Night indicator */}
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
          {t.isDay ? (
            <Sun className="h-5 w-5 text-gold" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider">
            {t.isDay ? "Day" : "Night"}
          </span>
        </div>
      </div>
      <div className="font-mono text-3xl font-bold text-foreground tabular-nums tracking-tight">
        {t.time}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">{t.date}</span>
        <span className="text-xs font-mono font-semibold text-teal px-2 py-0.5 rounded-full bg-teal/10">
          {t.offset}
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-border/60">
        <span
          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
            pinned ? "bg-gold/20 text-gold" : "bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          }`}
        >
          {pinned ? "Pinned — click to unpin" : "Click to pin"}
        </span>
      </div>
    </button>
  );
}
