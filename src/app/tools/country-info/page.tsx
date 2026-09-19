"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Globe, Plug, Zap, Phone, Languages, Building2, Car } from "lucide-react";

// Comprehensive country info lookup — data consolidated that's usually scattered
// across Wikipedia, individual embassy pages, and travel advisory sites.
//
// NO pricing. Only factual reference info: capital, currency (code + symbol),
// official language(s), plug type, voltage, frequency, driving side, calling
// code, and emergency numbers.
//
// Sources: IEC 60083 (plug types), IATA country codes, ITU calling codes,
// WHO emergency numbers database. Updated late 2025.

type Plug = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O";

type Country = {
  name: string;
  iso: string; // ISO 3166-1 alpha-2
  flag: string;
  capital: string;
  currencyCode: string;
  currencySymbol: string;
  language: string;
  plugTypes: Plug[];
  voltage: string; // "220 V"
  frequency: string; // "50 Hz"
  drivingSide: "Left" | "Right";
  callingCode: string; // +92
  emergencyPolice: string;
  emergencyAmbulance: string;
  emergencyFire: string;
  region: string;
};

const COUNTRIES: Country[] = [
  // ===== South Asia =====
  { name: "Pakistan", iso: "PK", flag: "🇵🇰", capital: "Islamabad", currencyCode: "PKR", currencySymbol: "₨", language: "Urdu, English", plugTypes: ["C", "D", "G", "M"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+92", emergencyPolice: "15", emergencyAmbulance: "1120", emergencyFire: "16", region: "South Asia" },
  { name: "India", iso: "IN", flag: "🇮🇳", capital: "New Delhi", currencyCode: "INR", currencySymbol: "₹", language: "Hindi, English", plugTypes: ["C", "D", "M"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+91", emergencyPolice: "100", emergencyAmbulance: "108", emergencyFire: "101", region: "South Asia" },
  { name: "Bangladesh", iso: "BD", flag: "🇧🇩", capital: "Dhaka", currencyCode: "BDT", currencySymbol: "৳", language: "Bengali", plugTypes: ["C", "D", "G", "K"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+880", emergencyPolice: "999", emergencyAmbulance: "199", emergencyFire: "955", region: "South Asia" },
  { name: "Sri Lanka", iso: "LK", flag: "🇱🇰", capital: "Sri Jayawardenepura Kotte", currencyCode: "LKR", currencySymbol: "Rs", language: "Sinhala, Tamil", plugTypes: ["D", "G", "M"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+94", emergencyPolice: "119", emergencyAmbulance: "110", emergencyFire: "118", region: "South Asia" },
  { name: "Nepal", iso: "NP", flag: "🇳🇵", capital: "Kathmandu", currencyCode: "NPR", currencySymbol: "रू", language: "Nepali", plugTypes: ["C", "D", "M"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+977", emergencyPolice: "100", emergencyAmbulance: "102", emergencyFire: "101", region: "South Asia" },
  { name: "Afghanistan", iso: "AF", flag: "🇦🇫", capital: "Kabul", currencyCode: "AFN", currencySymbol: "؋", language: "Pashto, Dari", plugTypes: ["C", "D", "F"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+93", emergencyPolice: "100", emergencyAmbulance: "102", emergencyFire: "101", region: "South Asia" },

  // ===== Middle East =====
  { name: "Saudi Arabia", iso: "SA", flag: "🇸🇦", capital: "Riyadh", currencyCode: "SAR", currencySymbol: "﷼", language: "Arabic", plugTypes: ["G"], voltage: "220 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+966", emergencyPolice: "999", emergencyAmbulance: "997", emergencyFire: "999", region: "Middle East" },
  { name: "United Arab Emirates", iso: "AE", flag: "🇦🇪", capital: "Abu Dhabi", currencyCode: "AED", currencySymbol: "د.إ", language: "Arabic", plugTypes: ["G"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+971", emergencyPolice: "999", emergencyAmbulance: "998", emergencyFire: "997", region: "Middle East" },
  { name: "Qatar", iso: "QA", flag: "🇶🇦", capital: "Doha", currencyCode: "QAR", currencySymbol: "﷼", language: "Arabic", plugTypes: ["G"], voltage: "240 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+974", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "Middle East" },
  { name: "Oman", iso: "OM", flag: "🇴🇲", capital: "Muscat", currencyCode: "OMR", currencySymbol: "﷼", language: "Arabic", plugTypes: ["C", "G"], voltage: "240 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+968", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "Middle East" },
  { name: "Kuwait", iso: "KW", flag: "🇰🇼", capital: "Kuwait City", currencyCode: "KWD", currencySymbol: "د.ك", language: "Arabic", plugTypes: ["C", "G"], voltage: "240 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+965", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Middle East" },
  { name: "Bahrain", iso: "BH", flag: "🇧🇭", capital: "Manama", currencyCode: "BHD", currencySymbol: ".د.ب", language: "Arabic", plugTypes: ["G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+973", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "Middle East" },
  { name: "Turkey", iso: "TR", flag: "🇹🇷", capital: "Ankara", currencyCode: "TRY", currencySymbol: "₺", language: "Turkish", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+90", emergencyPolice: "155", emergencyAmbulance: "112", emergencyFire: "110", region: "Middle East" },
  { name: "Iran", iso: "IR", flag: "🇮🇷", capital: "Tehran", currencyCode: "IRR", currencySymbol: "﷼", language: "Persian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+98", emergencyPolice: "110", emergencyAmbulance: "115", emergencyFire: "125", region: "Middle East" },
  { name: "Iraq", iso: "IQ", flag: "🇮🇶", capital: "Baghdad", currencyCode: "IQD", currencySymbol: "ع.د", language: "Arabic, Kurdish", plugTypes: ["C", "D", "G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+964", emergencyPolice: "122", emergencyAmbulance: "122", emergencyFire: "122", region: "Middle East" },
  { name: "Jordan", iso: "JO", flag: "🇯🇴", capital: "Amman", currencyCode: "JOD", currencySymbol: "د.ا", language: "Arabic", plugTypes: ["B", "C", "D", "F", "G", "J"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+962", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "Middle East" },
  { name: "Lebanon", iso: "LB", flag: "🇱🇧", capital: "Beirut", currencyCode: "LBP", currencySymbol: "ل.ل", language: "Arabic", plugTypes: ["A", "B", "C", "D", "G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+961", emergencyPolice: "112", emergencyAmbulance: "140", emergencyFire: "175", region: "Middle East" },
  { name: "Israel", iso: "IL", flag: "🇮🇱", capital: "Jerusalem", currencyCode: "ILS", currencySymbol: "₪", language: "Hebrew, Arabic", plugTypes: ["C", "D", "H", "M"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+972", emergencyPolice: "100", emergencyAmbulance: "101", emergencyFire: "102", region: "Middle East" },
  { name: "Egypt", iso: "EG", flag: "🇪🇬", capital: "Cairo", currencyCode: "EGP", currencySymbol: "£", language: "Arabic", plugTypes: ["C", "F"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+20", emergencyPolice: "122", emergencyAmbulance: "123", emergencyFire: "180", region: "Middle East" },

  // ===== East & Southeast Asia =====
  { name: "China", iso: "CN", flag: "🇨🇳", capital: "Beijing", currencyCode: "CNY", currencySymbol: "¥", language: "Mandarin", plugTypes: ["A", "C", "I"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+86", emergencyPolice: "110", emergencyAmbulance: "120", emergencyFire: "119", region: "East Asia" },
  { name: "Hong Kong", iso: "HK", flag: "🇭🇰", capital: "Hong Kong", currencyCode: "HKD", currencySymbol: "$", language: "Cantonese, English", plugTypes: ["D", "G", "M"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+852", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "East Asia" },
  { name: "Japan", iso: "JP", flag: "🇯🇵", capital: "Tokyo", currencyCode: "JPY", currencySymbol: "¥", language: "Japanese", plugTypes: ["A", "B"], voltage: "100 V", frequency: "50/60 Hz", drivingSide: "Left", callingCode: "+81", emergencyPolice: "110", emergencyAmbulance: "119", emergencyFire: "119", region: "East Asia" },
  { name: "South Korea", iso: "KR", flag: "🇰🇷", capital: "Seoul", currencyCode: "KRW", currencySymbol: "₩", language: "Korean", plugTypes: ["C", "E", "F"], voltage: "220 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+82", emergencyPolice: "112", emergencyAmbulance: "119", emergencyFire: "119", region: "East Asia" },
  { name: "Taiwan", iso: "TW", flag: "🇹🇼", capital: "Taipei", currencyCode: "TWD", currencySymbol: "$", language: "Mandarin", plugTypes: ["A", "B"], voltage: "110 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+886", emergencyPolice: "110", emergencyAmbulance: "119", emergencyFire: "119", region: "East Asia" },
  { name: "Singapore", iso: "SG", flag: "🇸🇬", capital: "Singapore", currencyCode: "SGD", currencySymbol: "$", language: "English, Malay, Mandarin, Tamil", plugTypes: ["G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+65", emergencyPolice: "999", emergencyAmbulance: "995", emergencyFire: "995", region: "Southeast Asia" },
  { name: "Malaysia", iso: "MY", flag: "🇲🇾", capital: "Kuala Lumpur", currencyCode: "MYR", currencySymbol: "RM", language: "Malay", plugTypes: ["G"], voltage: "240 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+60", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "Southeast Asia" },
  { name: "Thailand", iso: "TH", flag: "🇹🇭", capital: "Bangkok", currencyCode: "THB", currencySymbol: "฿", language: "Thai", plugTypes: ["A", "B", "C", "O"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+66", emergencyPolice: "191", emergencyAmbulance: "1669", emergencyFire: "199", region: "Southeast Asia" },
  { name: "Vietnam", iso: "VN", flag: "🇻🇳", capital: "Hanoi", currencyCode: "VND", currencySymbol: "₫", language: "Vietnamese", plugTypes: ["A", "C", "D"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+84", emergencyPolice: "113", emergencyAmbulance: "115", emergencyFire: "114", region: "Southeast Asia" },
  { name: "Indonesia", iso: "ID", flag: "🇮🇩", capital: "Jakarta", currencyCode: "IDR", currencySymbol: "Rp", language: "Indonesian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+62", emergencyPolice: "110", emergencyAmbulance: "118", emergencyFire: "113", region: "Southeast Asia" },
  { name: "Philippines", iso: "PH", flag: "🇵🇭", capital: "Manila", currencyCode: "PHP", currencySymbol: "₱", language: "Filipino, English", plugTypes: ["A", "B", "C"], voltage: "220 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+63", emergencyPolice: "117", emergencyAmbulance: "911", emergencyFire: "911", region: "Southeast Asia" },
  { name: "Cambodia", iso: "KH", flag: "🇰🇭", capital: "Phnom Penh", currencyCode: "KHR", currencySymbol: "៛", language: "Khmer", plugTypes: ["A", "C", "G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+855", emergencyPolice: "117", emergencyAmbulance: "119", emergencyFire: "118", region: "Southeast Asia" },
  { name: "Laos", iso: "LA", flag: "🇱🇦", capital: "Vientiane", currencyCode: "LAK", currencySymbol: "₭", language: "Lao", plugTypes: ["A", "B", "C", "E", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+856", emergencyPolice: "191", emergencyAmbulance: "195", emergencyFire: "190", region: "Southeast Asia" },
  { name: "Myanmar", iso: "MM", flag: "🇲🇲", capital: "Naypyidaw", currencyCode: "MMK", currencySymbol: "K", language: "Burmese", plugTypes: ["C", "D", "F", "G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+95", emergencyPolice: "199", emergencyAmbulance: "192", emergencyFire: "191", region: "Southeast Asia" },

  // ===== Central Asia =====
  { name: "Uzbekistan", iso: "UZ", flag: "🇺🇿", capital: "Tashkent", currencyCode: "UZS", currencySymbol: "сўм", language: "Uzbek", plugTypes: ["C", "F"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+998", emergencyPolice: "102", emergencyAmbulance: "103", emergencyFire: "101", region: "Central Asia" },
  { name: "Kazakhstan", iso: "KZ", flag: "🇰🇿", capital: "Astana", currencyCode: "KZT", currencySymbol: "₸", language: "Kazakh, Russian", plugTypes: ["C", "F"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+7", emergencyPolice: "102", emergencyAmbulance: "103", emergencyFire: "101", region: "Central Asia" },

  // ===== Europe =====
  { name: "United Kingdom", iso: "GB", flag: "🇬🇧", capital: "London", currencyCode: "GBP", currencySymbol: "£", language: "English", plugTypes: ["G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+44", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "Europe" },
  { name: "Ireland", iso: "IE", flag: "🇮🇪", capital: "Dublin", currencyCode: "EUR", currencySymbol: "€", language: "English, Irish", plugTypes: ["G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+353", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "France", iso: "FR", flag: "🇫🇷", capital: "Paris", currencyCode: "EUR", currencySymbol: "€", language: "French", plugTypes: ["C", "E"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+33", emergencyPolice: "17", emergencyAmbulance: "15", emergencyFire: "18", region: "Europe" },
  { name: "Germany", iso: "DE", flag: "🇩🇪", capital: "Berlin", currencyCode: "EUR", currencySymbol: "€", language: "German", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+49", emergencyPolice: "110", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Spain", iso: "ES", flag: "🇪🇸", capital: "Madrid", currencyCode: "EUR", currencySymbol: "€", language: "Spanish", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+34", emergencyPolice: "091", emergencyAmbulance: "112", emergencyFire: "080", region: "Europe" },
  { name: "Italy", iso: "IT", flag: "🇮🇹", capital: "Rome", currencyCode: "EUR", currencySymbol: "€", language: "Italian", plugTypes: ["C", "F", "L"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+39", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Netherlands", iso: "NL", flag: "🇳🇱", capital: "Amsterdam", currencyCode: "EUR", currencySymbol: "€", language: "Dutch", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+31", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Belgium", iso: "BE", flag: "🇧🇪", capital: "Brussels", currencyCode: "EUR", currencySymbol: "€", language: "Dutch, French, German", plugTypes: ["C", "E"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+32", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Austria", iso: "AT", flag: "🇦🇹", capital: "Vienna", currencyCode: "EUR", currencySymbol: "€", language: "German", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+43", emergencyPolice: "112", emergencyAmbulance: "144", emergencyFire: "122", region: "Europe" },
  { name: "Switzerland", iso: "CH", flag: "🇨🇭", capital: "Bern", currencyCode: "CHF", currencySymbol: "Fr", language: "German, French, Italian", plugTypes: ["C", "J"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+41", emergencyPolice: "112", emergencyAmbulance: "144", emergencyFire: "118", region: "Europe" },
  { name: "Sweden", iso: "SE", flag: "🇸🇪", capital: "Stockholm", currencyCode: "SEK", currencySymbol: "kr", language: "Swedish", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+46", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Norway", iso: "NO", flag: "🇳🇴", capital: "Oslo", currencyCode: "NOK", currencySymbol: "kr", language: "Norwegian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+47", emergencyPolice: "112", emergencyAmbulance: "113", emergencyFire: "110", region: "Europe" },
  { name: "Denmark", iso: "DK", flag: "🇩🇰", capital: "Copenhagen", currencyCode: "DKK", currencySymbol: "kr", language: "Danish", plugTypes: ["C", "F", "E", "K"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+45", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Finland", iso: "FI", flag: "🇫🇮", capital: "Helsinki", currencyCode: "EUR", currencySymbol: "€", language: "Finnish, Swedish", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+358", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Poland", iso: "PL", flag: "🇵🇱", capital: "Warsaw", currencyCode: "PLN", currencySymbol: "zł", language: "Polish", plugTypes: ["C", "E"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+48", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Czech Republic", iso: "CZ", flag: "🇨🇿", capital: "Prague", currencyCode: "CZK", currencySymbol: "Kč", language: "Czech", plugTypes: ["C", "E"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+420", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Hungary", iso: "HU", flag: "🇭🇺", capital: "Budapest", currencyCode: "HUF", currencySymbol: "Ft", language: "Hungarian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+36", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Greece", iso: "GR", flag: "🇬🇷", capital: "Athens", currencyCode: "EUR", currencySymbol: "€", language: "Greek", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+30", emergencyPolice: "100", emergencyAmbulance: "166", emergencyFire: "199", region: "Europe" },
  { name: "Portugal", iso: "PT", flag: "🇵🇹", capital: "Lisbon", currencyCode: "EUR", currencySymbol: "€", language: "Portuguese", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+351", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Russia", iso: "RU", flag: "🇷🇺", capital: "Moscow", currencyCode: "RUB", currencySymbol: "₽", language: "Russian", plugTypes: ["C", "F"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+7", emergencyPolice: "102", emergencyAmbulance: "103", emergencyFire: "101", region: "Europe" },
  { name: "Ukraine", iso: "UA", flag: "🇺🇦", capital: "Kyiv", currencyCode: "UAH", currencySymbol: "₴", language: "Ukrainian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+380", emergencyPolice: "102", emergencyAmbulance: "103", emergencyFire: "101", region: "Europe" },
  { name: "Romania", iso: "RO", flag: "🇷🇴", capital: "Bucharest", currencyCode: "RON", currencySymbol: "lei", language: "Romanian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+40", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Bulgaria", iso: "BG", flag: "🇧🇬", capital: "Sofia", currencyCode: "BGN", currencySymbol: "лв", language: "Bulgarian", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+359", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },
  { name: "Iceland", iso: "IS", flag: "🇮🇸", capital: "Reykjavik", currencyCode: "ISK", currencySymbol: "kr", language: "Icelandic", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+354", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Europe" },

  // ===== Africa =====
  { name: "South Africa", iso: "ZA", flag: "🇿🇦", capital: "Pretoria", currencyCode: "ZAR", currencySymbol: "R", language: "11 official (English, Zulu, Xhosa...)", plugTypes: ["D", "M", "N"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+27", emergencyPolice: "10111", emergencyAmbulance: "10177", emergencyFire: "10111", region: "Africa" },
  { name: "Nigeria", iso: "NG", flag: "🇳🇬", capital: "Abuja", currencyCode: "NGN", currencySymbol: "₦", language: "English", plugTypes: ["D", "G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+234", emergencyPolice: "112", emergencyAmbulance: "112", emergencyFire: "112", region: "Africa" },
  { name: "Kenya", iso: "KE", flag: "🇰🇪", capital: "Nairobi", currencyCode: "KES", currencySymbol: "KSh", language: "Swahili, English", plugTypes: ["G"], voltage: "240 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+254", emergencyPolice: "999", emergencyAmbulance: "999", emergencyFire: "999", region: "Africa" },
  { name: "Morocco", iso: "MA", flag: "🇲🇦", capital: "Rabat", currencyCode: "MAD", currencySymbol: "DH", language: "Arabic, Berber", plugTypes: ["C", "E"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+212", emergencyPolice: "19", emergencyAmbulance: "150", emergencyFire: "15", region: "Africa" },
  { name: "Tunisia", iso: "TN", flag: "🇹🇳", capital: "Tunis", currencyCode: "TND", currencySymbol: "د.ت", language: "Arabic", plugTypes: ["C", "E"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+216", emergencyPolice: "197", emergencyAmbulance: "190", emergencyFire: "198", region: "Africa" },
  { name: "Algeria", iso: "DZ", flag: "🇩🇿", capital: "Algiers", currencyCode: "DZD", currencySymbol: "د.ج", language: "Arabic, Berber", plugTypes: ["C", "F"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+213", emergencyPolice: "17", emergencyAmbulance: "16", emergencyFire: "14", region: "Africa" },
  { name: "Ethiopia", iso: "ET", flag: "🇪🇹", capital: "Addis Ababa", currencyCode: "ETB", currencySymbol: "Br", language: "Amharic", plugTypes: ["C", "E", "F", "L"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+251", emergencyPolice: "991", emergencyAmbulance: "902", emergencyFire: "939", region: "Africa" },
  { name: "Ghana", iso: "GH", flag: "🇬🇭", capital: "Accra", currencyCode: "GHS", currencySymbol: "₵", language: "English", plugTypes: ["A", "C", "D", "G"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+233", emergencyPolice: "191", emergencyAmbulance: "193", emergencyFire: "192", region: "Africa" },

  // ===== Americas =====
  { name: "United States", iso: "US", flag: "🇺🇸", capital: "Washington, D.C.", currencyCode: "USD", currencySymbol: "$", language: "English (de facto)", plugTypes: ["A", "B"], voltage: "120 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+1", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "North America" },
  { name: "Canada", iso: "CA", flag: "🇨🇦", capital: "Ottawa", currencyCode: "CAD", currencySymbol: "$", language: "English, French", plugTypes: ["A", "B"], voltage: "120 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+1", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "North America" },
  { name: "Mexico", iso: "MX", flag: "🇲🇽", capital: "Mexico City", currencyCode: "MXN", currencySymbol: "$", language: "Spanish", plugTypes: ["A", "B"], voltage: "127 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+52", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "North America" },
  { name: "Brazil", iso: "BR", flag: "🇧🇷", capital: "Brasília", currencyCode: "BRL", currencySymbol: "R$", language: "Portuguese", plugTypes: ["C", "N"], voltage: "127/220 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+55", emergencyPolice: "190", emergencyAmbulance: "192", emergencyFire: "193", region: "South America" },
  { name: "Argentina", iso: "AR", flag: "🇦🇷", capital: "Buenos Aires", currencyCode: "ARS", currencySymbol: "$", language: "Spanish", plugTypes: ["C", "I"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+54", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "South America" },
  { name: "Chile", iso: "CL", flag: "🇨🇱", capital: "Santiago", currencyCode: "CLP", currencySymbol: "$", language: "Spanish", plugTypes: ["C", "L"], voltage: "220 V", frequency: "50 Hz", drivingSide: "Right", callingCode: "+56", emergencyPolice: "133", emergencyAmbulance: "131", emergencyFire: "132", region: "South America" },
  { name: "Colombia", iso: "CO", flag: "🇨🇴", capital: "Bogotá", currencyCode: "COP", currencySymbol: "$", language: "Spanish", plugTypes: ["A", "B"], voltage: "110 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+57", emergencyPolice: "123", emergencyAmbulance: "123", emergencyFire: "123", region: "South America" },
  { name: "Peru", iso: "PE", flag: "🇵🇪", capital: "Lima", currencyCode: "PEN", currencySymbol: "S/", language: "Spanish", plugTypes: ["A", "B", "C"], voltage: "220 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+51", emergencyPolice: "105", emergencyAmbulance: "106", emergencyFire: "116", region: "South America" },
  { name: "Venezuela", iso: "VE", flag: "🇻🇪", capital: "Caracas", currencyCode: "VES", currencySymbol: "Bs", language: "Spanish", plugTypes: ["A", "B"], voltage: "120 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+58", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "South America" },
  { name: "Cuba", iso: "CU", flag: "🇨🇺", capital: "Havana", currencyCode: "CUP", currencySymbol: "$", language: "Spanish", plugTypes: ["A", "B", "C", "L"], voltage: "110/220 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+53", emergencyPolice: "106", emergencyAmbulance: "104", emergencyFire: "105", region: "North America" },
  { name: "Dominican Republic", iso: "DO", flag: "🇩🇴", capital: "Santo Domingo", currencyCode: "DOP", currencySymbol: "$", language: "Spanish", plugTypes: ["A", "B"], voltage: "110 V", frequency: "60 Hz", drivingSide: "Right", callingCode: "+1", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "North America" },

  // ===== Oceania =====
  { name: "Australia", iso: "AU", flag: "🇦🇺", capital: "Canberra", currencyCode: "AUD", currencySymbol: "$", language: "English", plugTypes: ["I"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+61", emergencyPolice: "000", emergencyAmbulance: "000", emergencyFire: "000", region: "Oceania" },
  { name: "New Zealand", iso: "NZ", flag: "🇳🇿", capital: "Wellington", currencyCode: "NZD", currencySymbol: "$", language: "English, Maori", plugTypes: ["I"], voltage: "230 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+64", emergencyPolice: "111", emergencyAmbulance: "111", emergencyFire: "111", region: "Oceania" },
  { name: "Fiji", iso: "FJ", flag: "🇫🇯", capital: "Suva", currencyCode: "FJD", currencySymbol: "$", language: "English, Fijian, Hindi", plugTypes: ["I"], voltage: "240 V", frequency: "50 Hz", drivingSide: "Left", callingCode: "+679", emergencyPolice: "911", emergencyAmbulance: "911", emergencyFire: "911", region: "Oceania" },
];

const REGIONS = ["All", "South Asia", "Middle East", "East Asia", "Southeast Asia", "Central Asia", "Europe", "Africa", "North America", "South America", "Oceania"];

const PLUG_COLORS: Record<Plug, string> = {
  A: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  B: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  C: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  D: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  E: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  F: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  G: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  H: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
  I: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  J: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
  K: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  L: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  M: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  N: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  O: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
};

export default function CountryInfoPage() {
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
          c.capital.toLowerCase().includes(q) ||
          c.iso.toLowerCase() === q ||
          c.currencyCode.toLowerCase() === q ||
          c.callingCode.includes(q)
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
            Country Info Lookup
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            One-stop reference for {COUNTRIES.length}+ countries: capital,
            currency (code + symbol), language, plug type, voltage, frequency,
            driving side, calling code, and emergency numbers.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-6 space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by country, capital, currency code, or calling code (e.g. Pakistan, Tokyo, EUR, +92)..."
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

          {/* Country cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <div key={c.iso} className="glass rounded-2xl p-5 border border-border/60 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{c.flag}</span>
                      <h3 className="font-heading text-lg font-semibold text-foreground truncate">{c.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{c.region}</p>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {c.iso}
                  </span>
                </div>

                <dl className="space-y-2 text-sm">
                  <Row icon={<Building2 className="h-4 w-4 text-teal flex-shrink-0" />} label="Capital" value={c.capital} />
                  <Row icon={<Globe className="h-4 w-4 text-gold flex-shrink-0" />} label="Currency" value={`${c.currencyCode} (${c.currencySymbol})`} />
                  <Row icon={<Languages className="h-4 w-4 text-teal flex-shrink-0" />} label="Language" value={c.language} />
                  <Row icon={<Zap className="h-4 w-4 text-gold flex-shrink-0" />} label="Voltage" value={`${c.voltage} · ${c.frequency}`} />
                  <Row icon={<Car className="h-4 w-4 text-teal flex-shrink-0" />} label="Driving" value={c.drivingSide} />
                  <Row icon={<Phone className="h-4 w-4 text-gold flex-shrink-0" />} label="Calling" value={c.callingCode} />
                </dl>

                {/* Plug types */}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Plug className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    {c.plugTypes.map((p) => (
                      <span
                        key={p}
                        className={`inline-flex items-center justify-center h-6 w-6 rounded-md text-xs font-bold border ${PLUG_COLORS[p]}`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Emergency numbers */}
                <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
                  <EmergencyPill color="text-blue-700 dark:text-blue-300 bg-blue-500/10" label="Police" number={c.emergencyPolice} />
                  <EmergencyPill color="text-red-700 dark:text-red-300 bg-red-500/10" label="Ambulance" number={c.emergencyAmbulance} />
                  <EmergencyPill color="text-amber-700 dark:text-amber-300 bg-amber-500/10" label="Fire" number={c.emergencyFire} />
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No countries found matching your filters.
            </p>
          )}

          {/* Plug legend */}
          <div className="mt-10 p-5 rounded-xl bg-muted/30 border border-border">
            <p className="text-sm font-semibold text-foreground mb-3">Plug Type Reference</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs text-muted-foreground">
              <div><strong className="text-foreground">A/B</strong>: US/Japan flat blades</div>
              <div><strong className="text-foreground">C/E/F</strong>: Europe round pins</div>
              <div><strong className="text-foreground">G</strong>: UK/Bahrain 3-pin</div>
              <div><strong className="text-foreground">D</strong>: India/Pakistan 3-pin</div>
              <div><strong className="text-foreground">I</strong>: Australia/China</div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              <strong className="text-foreground">Tip:</strong> Most modern devices (phone chargers, laptops) work on 100-240V / 50-60Hz. Check your device&apos;s power brick. You only need a plug adapter, not a voltage converter, for these.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      {icon}
      <span className="text-muted-foreground text-xs flex-shrink-0 w-16">{label}:</span>
      <span className="text-foreground text-xs font-medium break-words flex-1">{value}</span>
    </div>
  );
}

function EmergencyPill({ color, label, number }: { color: string; label: string; number: string }) {
  return (
    <div className={`p-2 rounded-lg ${color}`}>
      <p className="text-[10px] uppercase tracking-wider opacity-80">{label}</p>
      <p className="font-mono font-bold text-sm">{number}</p>
    </div>
  );
}
