export type Route = {
  code: string;
  name: string;
  description: string;
  duration: string;
  airlines: string[];
  category: "Domestic" | "International";
  frequency: string;
};

export const POPULAR_ROUTES: Route[] = [
  {
    code: "LHE → DXB",
    name: "Lahore to Dubai",
    description: "Direct Lahore to Dubai flights with live rates on WhatsApp. Emirates, flydubai, PIA ticketing.",
    duration: "3 hrs 5 mins",
    airlines: ["Emirates", "flydubai", "PIA"],
    category: "International",
    frequency: "Daily Multiple Flights",
  },
  {
    code: "ISB → JED",
    name: "Islamabad to Jeddah",
    description: "Direct flights to Jeddah for Umrah & Hajj pilgrims. PIA, Saudia, flynas ticketing available.",
    duration: "4 hrs 50 mins",
    airlines: ["PIA", "Saudia", "flynas"],
    category: "International",
    frequency: "Daily Flights",
  },
  {
    code: "KHI → LHR",
    name: "Karachi to London",
    description: "Connecting flights to London Heathrow via Emirates, Qatar Airways, and Turkish Airlines.",
    duration: "10 hrs 30 mins",
    airlines: ["Emirates", "Qatar", "Turkish"],
    category: "International",
    frequency: "Daily Flights",
  },
  {
    code: "LHE → IST",
    name: "Lahore to Istanbul",
    description: "Direct and connecting flights to Istanbul with Turkish Airlines and PIA. Visa consultation available.",
    duration: "6 hrs",
    airlines: ["Turkish Airlines", "PIA"],
    category: "International",
    frequency: "Daily Flights",
  },
  {
    code: "ISB → DOH",
    name: "Islamabad to Doha",
    description: "Qatar Airways and PIA flights from Islamabad to Doha with same-day connections worldwide.",
    duration: "3 hrs 40 mins",
    airlines: ["Qatar Airways", "PIA"],
    category: "International",
    frequency: "Daily Multiple Flights",
  },
  {
    code: "KHI → KUL",
    name: "Karachi to Kuala Lumpur",
    description: "Connecting flights to Kuala Lumpur with Malaysia Airlines and Thai Airways.",
    duration: "7 hrs 20 mins",
    airlines: ["Malaysia Airlines", "Thai"],
    category: "International",
    frequency: "Daily Flights",
  },
];

export const ALL_ROUTES: Route[] = [
  // Domestic
  { code: "SKT → KHI", name: "Sialkot to Karachi", description: "Direct Sialkot to Karachi flights with live rates on WhatsApp. PIA, AirSial, Airblue, Serene Air & Fly Jinnah ticketing.", duration: "2 hrs", airlines: ["PIA", "AirSial", "Airblue", "Serene Air"], category: "Domestic", frequency: "Daily Multiple Flights" },
  { code: "SKT → LHE", name: "Sialkot to Lahore", description: "Quick direct flights from Sialkot to Lahore with daily departures across all domestic carriers.", duration: "30 mins", airlines: ["PIA", "AirSial", "Fly Jinnah"], category: "Domestic", frequency: "Daily Multiple Flights" },
  { code: "SKT → ISB", name: "Sialkot to Islamabad", description: "Direct flights from Sialkot to Islamabad with multiple daily departures.", duration: "1 hr", airlines: ["PIA", "AirSial", "Serene Air"], category: "Domestic", frequency: "Daily Flights" },
  { code: "LHE → KHI", name: "Lahore to Karachi", description: "Frequent direct flights between Lahore and Karachi with all major domestic carriers.", duration: "1 hr 48 mins", airlines: ["PIA", "AirSial", "Airblue", "Serene Air"], category: "Domestic", frequency: "Daily Multiple Flights" },
  { code: "LHE → ISB", name: "Lahore to Islamabad", description: "Quick direct flights between Lahore and Islamabad, multiple times daily.", duration: "1 hr", airlines: ["PIA", "AirSial", "Fly Jinnah"], category: "Domestic", frequency: "Daily Flights" },
  { code: "LHE → PEW", name: "Lahore to Peshawar", description: "Direct flights from Lahore to Peshawar with daily departures.", duration: "1 hr 12 mins", airlines: ["PIA", "AirSial"], category: "Domestic", frequency: "Daily Flights" },
  { code: "LHE → MUX", name: "Lahore to Multan", description: "Quick domestic flights from Lahore to Multan with PIA and AirSial.", duration: "1 hr", airlines: ["PIA", "AirSial"], category: "Domestic", frequency: "Daily Flights" },
  { code: "ISB → KHI", name: "Islamabad to Karachi", description: "Multiple daily flights from Islamabad to Karachi across all carriers.", duration: "2 hrs", airlines: ["PIA", "AirSial", "Airblue"], category: "Domestic", frequency: "Daily Multiple Flights" },
  { code: "ISB → PEW", name: "Islamabad to Peshawar", description: "Short direct flights between Islamabad and Peshawar.", duration: "1 hr", airlines: ["PIA", "AirSial"], category: "Domestic", frequency: "Daily Flights" },
  { code: "ISB → MUX", name: "Islamabad to Multan", description: "Direct flights from Islamabad to Multan with daily departures.", duration: "1 hr 30 mins", airlines: ["PIA", "AirSial"], category: "Domestic", frequency: "Daily Flights" },
  { code: "ISB → UET", name: "Islamabad to Quetta", description: "Direct flights from Islamabad to Quetta connecting the federal capital with Balochistan.", duration: "1 hr 30 mins", airlines: ["PIA"], category: "Domestic", frequency: "Daily Flights" },
  { code: "ISB → GIL", name: "Islamabad to Gilgit", description: "Scenic mountain flights from Islamabad to Gilgit. Subject to weather conditions.", duration: "1 hr", airlines: ["PIA"], category: "Domestic", frequency: "Daily Flights" },
  // International
  { code: "SKT → DXB", name: "Sialkot to Dubai", description: "Direct Sialkot to Dubai flights with live rates on WhatsApp. Emirates, flydubai, PIA ticketing.", duration: "3 hrs 15 mins", airlines: ["Emirates", "flydubai", "PIA"], category: "International", frequency: "Daily Multiple Flights" },
  { code: "SKT → JED", name: "Sialkot to Jeddah", description: "Direct flights to Jeddah for Umrah & Hajj pilgrims. PIA, Saudia, flynas ticketing available.", duration: "4 hrs 30 mins", airlines: ["PIA", "Saudia", "flynas"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → RUH", name: "Sialkot to Riyadh", description: "Direct flights to Riyadh with PIA and Saudia for business and family travel.", duration: "4 hrs 15 mins", airlines: ["PIA", "Saudia"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → DOH", name: "Sialkot to Doha", description: "Qatar Airways and PIA flights from Sialkot to Doha with same-day connections worldwide.", duration: "3 hrs 45 mins", airlines: ["Qatar Airways", "PIA"], category: "International", frequency: "Daily Multiple Flights" },
  { code: "SKT → AUH", name: "Sialkot to Abu Dhabi", description: "Direct flights to Abu Dhabi with Etihad Airways and PIA.", duration: "3 hrs 30 mins", airlines: ["Etihad Airways", "PIA"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → SHJ", name: "Sialkot to Sharjah", description: "Direct flights to Sharjah with Air Arabia and PIA. Great for budget travelers.", duration: "3 hrs 20 mins", airlines: ["Air Arabia", "PIA"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → MCT", name: "Sialkot to Muscat", description: "Direct flights to Muscat, Oman with Oman Air and SalamAir.", duration: "2 hrs 50 mins", airlines: ["Oman Air", "SalamAir"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → KWI", name: "Sialkot to Kuwait", description: "Direct flights to Kuwait with Kuwait Airways and PIA.", duration: "4 hrs", airlines: ["Kuwait Airways", "PIA"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → BAH", name: "Sialkot to Bahrain", description: "Direct flights to Bahrain with Gulf Air and PIA.", duration: "4 hrs 10 mins", airlines: ["Gulf Air", "PIA"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → IST", name: "Sialkot to Istanbul", description: "Direct and connecting flights to Istanbul with Turkish Airlines and PIA. Visa consultation available.", duration: "6 hrs 20 mins", airlines: ["Turkish Airlines", "PIA"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → LHR", name: "Sialkot to London Heathrow", description: "Connecting flights to London Heathrow via Emirates, Qatar Airways, and Turkish Airlines.", duration: "11 hrs 45 mins", airlines: ["Emirates", "Qatar", "Turkish"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → MAN", name: "Sialkot to Manchester", description: "Connecting flights to Manchester via Gulf carriers and Turkish Airlines.", duration: "12 hrs 10 mins", airlines: ["Emirates", "Qatar", "Turkish"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → BHX", name: "Sialkot to Birmingham", description: "Connecting flights to Birmingham via Emirates and Turkish Airlines.", duration: "11 hrs 50 mins", airlines: ["Emirates", "Turkish"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → KUL", name: "Sialkot to Kuala Lumpur", description: "Connecting flights to Kuala Lumpur with Malaysia Airlines and Thai Airways.", duration: "8 hrs 30 mins", airlines: ["Malaysia Airlines", "Thai"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → BKK", name: "Sialkot to Bangkok", description: "Connecting flights to Bangkok via Thai Airways and Qatar Airways.", duration: "7 hrs 45 mins", airlines: ["Thai Airways", "Qatar Airways"], category: "International", frequency: "Daily Flights" },
  { code: "SKT → DPS", name: "Sialkot to Bali", description: "Connecting flights to Bali, Indonesia via Bangkok and Kuala Lumpur.", duration: "10 hrs 30 mins", airlines: ["Thai Airways", "Malaysia Airlines"], category: "International", frequency: "Weekly Flights" },
  { code: "SKT → CAN", name: "Sialkot to Guangzhou", description: "Connecting flights to Guangzhou, China with China Southern and Thai Airways.", duration: "8 hrs 15 mins", airlines: ["China Southern", "Thai Airways"], category: "International", frequency: "Weekly Flights" },
  { code: "SKT → PEK", name: "Sialkot to Beijing", description: "Connecting flights to Beijing via China Southern and Thai Airways.", duration: "9 hrs", airlines: ["China Southern", "Thai Airways"], category: "International", frequency: "Weekly Flights" },
  { code: "SKT → TAS", name: "Sialkot to Tashkent", description: "Connecting flights to Tashkent, Uzbekistan via Dubai and Istanbul.", duration: "8 hrs", airlines: ["flydubai", "Turkish Airlines"], category: "International", frequency: "Weekly Flights" },
  { code: "SKT → BAK", name: "Sialkot to Baku", description: "Connecting flights to Baku, Azerbaijan via Istanbul and Dubai.", duration: "9 hrs 30 mins", airlines: ["Turkish Airlines", "flydubai"], category: "International", frequency: "Weekly Flights" },
];

export const AIRLINES = [
  "PIA", "AirSial", "Fly Jinnah", "Serene Air", "Emirates", "Saudia Airlines",
  "Qatar Airways", "FlyDubai", "Turkish Airlines", "Gulf Air", "Airblue",
  "Etihad Airways", "British Airways", "China Southern", "Flynas", "SalamAir",
  "Air Arabia", "Wizz Air Abu Dhabi", "Jazeera Airways", "Oman Air", "Kuwait Airways",
];

export type Visa = {
  flag: string;
  country: string;
  visaType: string;
  processingTime: string;
  validity: string;
  requirements: string[];
};

export const VISA_COUNTRIES: Visa[] = [
  {
    flag: "🇸🇦",
    country: "Saudi Arabia",
    visaType: "eVisa",
    processingTime: "24 – 48 Hours",
    validity: "1 Year Multiple Entry (90 Days Stay)",
    requirements: ["Passport copy (6+ months validity)", "Passport size white background photo", "CNIC copy"],
  },
  {
    flag: "🇦🇪",
    country: "United Arab Emirates",
    visaType: "eVisa",
    processingTime: "24 – 72 Hours",
    validity: "60 Days from issue",
    requirements: ["Passport front & back scan", "Photo with white background", "CNIC / Form B for minors"],
  },
  {
    flag: "🇶🇦",
    country: "Qatar",
    visaType: "eVisa",
    processingTime: "24 – 48 Hours",
    validity: "30 Days (Extendable)",
    requirements: ["Passport bio page scan", "Passport photo", "Return flight & hotel booking"],
  },
  {
    flag: "🇴🇲",
    country: "Oman",
    visaType: "eVisa",
    processingTime: "12 – 48 Hours",
    validity: "30 Days Multiple Entry",
    requirements: ["Passport copy (6 months validity)", "White background photo", "Confirmed hotel/itinerary"],
  },
  {
    flag: "🇰🇼",
    country: "Kuwait",
    visaType: "eVisa",
    processingTime: "24 – 72 Hours",
    validity: "90 Days Single Entry",
    requirements: ["Passport copy", "Passport photo", "Sponsor OR hotel + flight details"],
  },
  {
    flag: "🇧🇭",
    country: "Bahrain",
    visaType: "eVisa",
    processingTime: "24 – 72 Hours",
    validity: "Multiple Entry (14-90 Days)",
    requirements: ["Passport scan", "Passport photo", "Confirmed return ticket & hotel"],
  },
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    visaType: "Multiple Entry",
    processingTime: "3 – 6 Weeks",
    validity: "6 Months Multiple Entry",
    requirements: ["Original passport", "Bank statement (6 months)", "Employment/Business proof", "Tax returns", "Biometrics appointment"],
  },
  {
    flag: "🇹🇷",
    country: "Turkey",
    visaType: "Single Entry",
    processingTime: "10 – 15 Working Days",
    validity: "Based on embassy approval",
    requirements: ["Original passport", "Bank statement (6 months)", "Employment letter / NTN", "Photographs", "Polio certificate"],
  },
  {
    flag: "🇲🇾",
    country: "Malaysia",
    visaType: "eVisa",
    processingTime: "3 – 5 Working Days",
    validity: "3 Months from issue",
    requirements: ["Passport bio page", "Photo", "Confirmed return flight ticket", "Hotel reservation"],
  },
  {
    flag: "🇪🇺",
    country: "Schengen Area",
    visaType: "Multiple Entry",
    processingTime: "15 – 45 Working Days",
    validity: "Variable",
    requirements: ["Original passport", "Bank statement (6 months)", "Travel insurance", "Confirmed flight & hotel itinerary", "Cover letter"],
  },
  {
    flag: "🇹🇭",
    country: "Thailand",
    visaType: "Single Entry",
    processingTime: "5 – 7 Working Days",
    validity: "3 Months",
    requirements: ["Passport scan", "Bank statement with sufficient balance", "Confirmed air ticket & hotel"],
  },
  {
    flag: "🇦🇿",
    country: "Azerbaijan",
    visaType: "eVisa",
    processingTime: "3 Hours (Urgent) / 3 Days (Standard)",
    validity: "90 Days validity",
    requirements: ["Passport scan with clear text", "Hotel & flight itinerary assistance"],
  },
];

export type UmrahPackage = {
  id: string;
  badge: string;
  badgeStyle: "gold" | "teal" | "navy" | "red";
  title: string;
  duration: string;
  description: string;
  hotel: {
    makkah: string;
    madinah: string;
    transport: string;
  };
  inclusions: string[];
};

export const UMRAH_PACKAGES: UmrahPackage[] = [
  {
    id: "vip-platinum",
    badge: "0-Meter Haram · VIP",
    badgeStyle: "gold",
    title: "VIP 5-Star Platinum Umrah Package",
    duration: "7 Days Express | 10 Days Popular | 14 Days Standard | 21 Days Extended",
    description: "The finest pilgrimage experience — Clock Tower zero-distance Haram hotels, private GMC Yukon, dedicated on-ground Maktab and 24/7 personal concierge.",
    hotel: {
      makkah: "Swissôtel Al Maqam / Fairmont Clock Tower (0m Kaabah view)",
      madinah: "Dar Al Taqwa Intercontinental / Oberoi Madinah (0m Rawdah)",
      transport: "Private VIP GMC Yukon + Haramain Bullet Train (Business Class)",
    },
    inclusions: [
      "Direct PIA/Saudia/Etihad flights — Sialkot/Lahore/Islamabad/Karachi",
      "5-Star 0-meter Clock Tower hotels with Haram/Kaabah view rooms",
      "Private GMC Yukon with dedicated English/Arabic speaking driver",
      "24/7 WhatsApp concierge & Maktab on-ground assistance",
      "Nusuk permits for Rawdah Mubarak & daily Haram access",
      "Complete historical Ziyarat (Makkah & Madinah + Taif optional)",
      "Instant Saudi Umrah eVisa + mandatory medical insurance",
      "Zamzam water cans & Ihram gift kit included complimentary",
      "Ramadan special: Suhoor & Iftar at 5-star hotels",
    ],
  },
  {
    id: "premium-executive",
    badge: "150m Haram · Popular",
    badgeStyle: "teal",
    title: "Premium 4-Star Executive Umrah Package",
    duration: "7 Days | 10 Days | 14 Days | Ramadan Special",
    description: "Perfect balance of comfort and value — 4-star walking-distance Haram hotels, shared premium van transport, full Ziyarat and eVisa.",
    hotel: {
      makkah: "Al Haram Hotel / Al Safwah Towers (150-250m walking Haram)",
      madinah: "Pullman Zamzam / Madinah Marriott (150-300m walking Haram)",
      transport: "Shared Premium HiAce van + Haramain Bullet Train (Economy)",
    },
    inclusions: [
      "Confirmed direct Saudia/PIA flights from all 4 Pakistani cities",
      "4-Star walking-distance Haram hotels (Kaabah/Rawdah visible)",
      "Shared Premium HiAce with AC + bottled water for all transfers",
      "Haramain Bullet Train tickets between Makkah and Madinah",
      "Nusuk permits for Rawdah & Ziyarah bookings arranged",
      "Full guided Ziyarat: Hira, Thawr, Mina, Arafat, Quba, Uhud, Qiblatayn",
      "Fast 48-hour Saudi electronic Umrah eVisa with insurance",
      "Welcome kit: Ihram, Ahram belt, Zamzam bottle, dua booklet",
      "24/7 Urdu/English group coordinator WhatsApp support",
    ],
  },
  {
    id: "economy-budget",
    badge: "Shuttle Service · Best Value",
    badgeStyle: "navy",
    title: "Economy 3-Star Budget Umrah Package",
    duration: "10 Days | 14 Days | 21 Days Extended Stay",
    description: "Affordable, dignified Umrah for families on a budget — clean 3-star hotels with 24/7 shuttle to Haram, full Ziyarat and guaranteed eVisa.",
    hotel: {
      makkah: "3-Star Ajyad district hotels (24/7 shuttle to Haram, 10 min ride)",
      madinah: "3-Star King Fahd Rd hotels (24/7 shuttle, 10 min to Prophet's Mosque)",
      transport: "AC Coaster Bus + 24/7 Hotel-to-Haram shuttle service",
    },
    inclusions: [
      "Confirmed PIA/Flynas/Saudia flight ticket (Economy class)",
      "Clean 3-star hotels with daily buffet breakfast included",
      "24/7 air-conditioned shuttle between hotels and Haram",
      "AC Coaster for full Ziyarat of Makkah and Madinah holy sites",
      "Saudi Umrah eVisa processing (48-hour turnaround)",
      "Nusuk permit arrangement for Rawdah visits",
      "Group leader Urdu-speaking coordinator for the entire trip",
      "Zamzam water & Ihram gift pack for every pilgrim",
      "Flexible departure from SKT / LHE / ISB / KHI — group discounts available",
    ],
  },
  {
    id: "hajj-2026-govt",
    badge: "Hajj 2026 · Limited Seats",
    badgeStyle: "red",
    title: "Official Hajj 2026 Package (Govt Approved)",
    duration: "30 Days Hajj | 40 Days Extended Hajj + Umrah Combo",
    description: "Authorized Government-approved Hajj package — fully compliant with Saudi Nusuk/Hajj Ministry rules, dedicated Maktab, Mina/Muzdalifah tents and trained Moallim.",
    hotel: {
      makkah: "5-Star / 4-Star Haram walking hotels (Hajj season)",
      madinah: "4-Star Ziyarah hotel (before/after Hajj days in Madinah)",
      transport: "Full Hajj fleet: Private Buses, Maktab Tents, Muzdalifah Shuttle, Jamrat Bridge access",
    },
    inclusions: [
      "Official Ministry of Hajj & Nusuk-approved quota (guaranteed Hujjaj)",
      "Direct PIA/Saudia flight ticket: SKT/LHE/ISB/KHI → Jeddah/Madinah",
      "4/5-Star Makkah Madinah hotels during pre-Hajj and post-Hajj Ziyarah",
      "Premium Mina tent (cooled AC category) + Muzdalifah camp arrangements",
      "Dedicated certified Moallim (Hajj guide) for correct Manasik training sessions",
      "Jamrat Bridge priority shuttle & stoning guidance",
      "Ziarat-e-Hajj: Makkah Ziyarah, Madinah Ziyarah, Taif day trip",
      "Hajj ID bracelet, Ihram belt, Arafat day pack (Zamzam, dates, snacks)",
      "Post-Hajj Qurbani/Udhiya option (Halal verified + meat distribution)",
      "24/7 Hajj Maktab supervisor WhatsApp + emergency hotline (Urdu/Arabic)",
      "All Govt taxes, Nusuk fees, insurance and mandatory COVID/Meningitis vaccines arranged",
    ],
  },
  {
    id: "custom-family",
    badge: "Family · Custom Dates",
    badgeStyle: "teal",
    title: "Custom Family Group Umrah Package",
    duration: "Any 7-30 Days of Your Choice | Ramadan Any Ashra | Shaban Pre-Ramadan | Eid Special",
    description: "Tailor-made for large families, weddings, barakats or group ziarah — private rooms, children-friendly hotels, flexible exact dates matching YOUR schedule.",
    hotel: {
      makkah: "Family connecting rooms (3-star to 5-star — choose budget/preference)",
      madinah: "Adjoining/family suites — choose your walking distance from Haram",
      transport: "Private dedicated vehicle (HiAce, Coaster, or GMC Yukon as requested)",
    },
    inclusions: [
      "100% custom — we build around YOUR exact departure/return dates",
      "Choice of airline: PIA/Saudia/Emirates/Etihad, any cabin class",
      "Connecting family rooms, extra beds, or 0m Kaabah view — your choice",
      "Baby cots, wheelchair access, elderly-friendly hotel selection",
      "Private Moallim for family Manasik & step-by-step Umrah guidance",
      "Special arrangements: Aqeeqah, Nazar, Khatam-e-Quran or barakat events",
      "Saudi eVisa for whole family (including children + infants)",
      "Private Ziyarat van with Urdu guide just for YOUR group (no sharing)",
      "Optional: Taif visit, Jeddah waterfront, Red Sea mall shopping",
      "Best price guarantee: Group discounts starting from 5+ pilgrims",
    ],
  },
  {
    id: "ramadan-2026",
    badge: "Ramadan · Laylatul Qadr",
    badgeStyle: "gold",
    title: "Ramadan 2026 Grand Umrah Package",
    duration: "15 Days (1st Ashra) | 20 Days (Mid-Ramadan) | 25 Days (Laylatul Qadr + Last Ashra) | 30 Days Full Ramadan",
    description: "Blessed package designed specifically for Ramadan — prime hotels so you never miss Taraweeh, Iftar in Haram courtyard, and Laylatul Qadr itikaf arrangements.",
    hotel: {
      makkah: "Haram-facing 4/5-Star hotels — step out into Haram for every prayer",
      madinah: "Rawdah-facing 4/5-Star hotels — Qiyam, Itikaf & Tahajjud access",
      transport: "Private HiAce / GMC VIP + Premium Haramain Bullet Train",
    },
    inclusions: [
      "0m-150m Haram hotels GUARANTEED (nearest to Kaabah/Rawdah)",
      "Iftar & Suhoor daily at hotel (5-star buffet or hotel restaurant)",
      "Reserved prayer place in Mataf (if booked early) for Taraweeh",
      "Laylatul Qadr itikaf in Haram (Masjid Al Haram / An Nabawi permit)",
      "Nusuk: Sehri end + Iftar start times chart + Makkah/Madinah daily dua booklet",
      "Exclusive Ziyaraat: Cave Hira night visit, Thawr, Arafat Day, Mina, Muzdalifah",
      "Al-Quran Khatam schedule with private Imam (optional)",
      "Ziyadah: Premium dates, zamzam, nabawi sweets gift box",
      "Priority eVisa processing for whole group before Ramadan",
      "Airline: Confirm PIA/Saudia early-bird bulk Ramadan fares (we lock rates 6 months in advance)",
    ],
  },
  {
    id: "presidential-luxury",
    badge: "Royal · Ultra-Lux",
    badgeStyle: "gold",
    title: "Presidential Ultra-Luxury Umrah Package",
    duration: "10 Days Royal | 14 Days Extended Royal",
    description: "The absolute top-tier pilgrimage experience — Royal Suite at Clock Tower, Rolls-Royce private transfers, private chef on demand, and exclusive after-hours Haram private access arrangements.",
    hotel: {
      makkah: "Fairmont Clock Tower ROYAL SUITE — 180° full Kaaba view, private butler service",
      madinah: "Oberoi Madinah Royal Suite / Dar Al Taqwa Presidential — Rawdah view suite",
      transport: "Private Rolls-Royce Ghost + Business Class Haramain Bullet Train cabin (exclusive booking)",
    },
    inclusions: [
      "First Class return flights: Saudia / Emirates / Etihad — any Pakistani city (charter option available)",
      "Royal Suites — guaranteed 0-meter private Kaabah view (Clock Tower highest floor)",
      "Private Rolls-Royce with Royal chauffeur for ALL transfers (no sharing, no waiting)",
      "Private chef for Iftar / Suhoor or custom menu (Arab, Pakistani, Continental cuisine)",
      "Exclusive after-hours private Mataf Tawaf access (VIP Nusuk permit — limited to 50 pilgrims/day)",
      "Rawdah Mubarak private visit + personal Sheikh for Dua & Ziyarah",
      "Private helicopter scenic flight over Makkah, Mina & Arafat (optional upgrade)",
      "Full private Ziyarah fleet + exclusive Sheikh guide for entire journey",
      "Zamzam water tanker storage, premium Oudh gift set, luxury ihram by designer",
      "24/7 3-person private concierge team: Driver + Butler + Maktab manager",
    ],
  },
  {
    id: "winter-special",
    badge: "Winter · School Break",
    badgeStyle: "teal",
    title: "December & Winter Special Umrah",
    duration: "7 Days Quick | 10 Days Family | 14 Days Winter Break",
    description: "Perfect for December/January holidays — cooler Saudi weather, school vacation dates, family-friendly pricing with children stay FREE offers at partner hotels.",
    hotel: {
      makkah: "4-Star Ajyad / Al Safwah Towers (winter promotional deals — kids free)",
      madinah: "4-Star Al Haram / Al Madinah Concorde (children under 6 stay free with parents)",
      transport: "Shared Premium HiAce + Haramain Bullet Train Economy",
    },
    inclusions: [
      "Exclusive December/January winter fares — airlines drop by up to 25% in cool season",
      "Partner hotels: Kids under 6 stay COMPLETELY FREE (share bed with parents)",
      "Pleasant 20-28°C Makkah/Madinah weather — comfortable Tawaf and Sai",
      "Full Ziyarat program including Hira, Thawr, Mina, Arafat, Uhud, Quba, Qiblatayn",
      "Extra day-trip: Taif mountain day excursion (snow, roses & cool climate)",
      "Scholar-led Manasik training in Urdu, English & Arabic",
      "Fast-track eVisa processing for all family members (48-hour guaranteed)",
      "Christmas & New Year departure blocks available (limited dates)",
      "Flexible date changes if school term dates shift (no penalty up to 30 days before)",
    ],
  },
  {
    id: "students-youth",
    badge: "Student · Youth Discount",
    badgeStyle: "navy",
    title: "Students & Youth Budget Umrah",
    duration: "7 Days Express | 10 Days Youth Group",
    description: "Designed for university students, young professionals & friends groups — lowest possible pricing, student ID exclusive discounts, and group-friendly shared rooms.",
    hotel: {
      makkah: "3-Star Aziziyah / Bakkah district hotels (youth group rooms up to 4 people)",
      madinah: "3-Star Central Madinah hotels — walking distance or shuttle",
      transport: "AC Coaster Bus for Ziyarah + scheduled shuttle to Haram",
    },
    inclusions: [
      "UNBEATABLE student rates — up to 35% off vs standard packages (with student/uni ID)",
      "Quad sharing rooms — best friends travel together and save maximum",
      "Daily buffet breakfast included — halal Pakistani/Indian menu options",
      "Full Ziyarat of both holy cities + photo stops at iconic landmarks",
      "Youth leader coordinator — fluent in Urdu/English, age 20s same vibe",
      "Weekend departure dates — minimal university/college class impact",
      "Saudi eVisa processing — university bonafide letter accepted as proof",
      "Gift pack: Ihram, Hajj belt, prayer rug, digital tasbih, zamzam bottle",
      "Refer-a-friend bonus: Bring 5+ friends and YOUR seat is 50% OFF",
    ],
  },
  {
    id: "corporate-executive",
    badge: "Corporate · VVIP",
    badgeStyle: "gold",
    title: "Corporate & Business Executive Umrah",
    duration: "5 Days Express Executive | 7 Days Business + Ziyarah Combo",
    description: "For CEOs, directors, business owners and corporate teams — seamless pilgrimage mixed with Jeddah/Riyadh business meetings, VVIP airport assistance, and complete privacy.",
    hotel: {
      makkah: "5-Star Fairmont / Swissotel — private Executive Lounge access",
      madinah: "5-Star Pullman Zamzam / Intercontinental — club floor upgrade included",
      transport: "Private GMC Yukon Denali + Business Class flights (lie-flat beds)",
    },
    inclusions: [
      "Business Class lie-flat flights — Saudia / Emirates (J or C class)",
      "VVIP Airport Fast Track — Jeddah & Madinah immigration, no queues, lounge access",
      "Daily Executive Lounge access at hotels (free breakfast, tea, dinner, cocktails)",
      "Jeddah / Riyadh business meeting coordination — boardroom & translation if needed",
      "Private Moallim available on YOUR schedule — flexible prayer times, no group wait",
      "Daily laundry and dry cleaning service included for executives",
      "In-room Wi-Fi 5G guaranteed + secure VPN setup (work while traveling)",
      "Separate female executive option: Mahram arrangements & lady staff if requested",
      "Invoice ready for company accounting — GST / corporate billing supported",
    ],
  },
  {
    id: "hajj-2026-economy",
    badge: "Hajj Economy · Budget",
    badgeStyle: "red",
    title: "Hajj 2026 Economy Package (Nusuk Approved)",
    duration: "28 Days Standard Hajj | 35 Days Extended with Ziyarah",
    description: "Guaranteed Nusuk-approved Hajj quota at the lowest possible price — dignified, fully-compliant Hajj for budget-conscious Hujjaj with tents, transport, food and certified Moallim all included.",
    hotel: {
      makkah: "4-Star Aziziyah/Ibrahim Al Khalil hotels (pre-Hajj 5 days + post-Hajj 10 days)",
      madinah: "3/4-Star Madinah hotels (Ziyarah days — Quba, Uhud, Qiblatayn included)",
      transport: "Full fleet: AC 50-seater Buses + Mina Standard Tent + Muzdalifah camp",
    },
    inclusions: [
      "100% Nusuk Government-approved Hajj quota — NO waiting list (guaranteed seat)",
      "Economy direct flights PIA/Saudia: SKT/LHE/ISB/KHI → Jeddah/Madinah → return",
      "Mina Standard Tents (shared AC blocks, mattress, pillow, lighting & water)",
      "Muzdalifah camp — shaded group tents + pebble collection bags provided",
      "Certified Moallim + Hajj guide — step-by-step Manasik in Urdu/Arabic",
      "Jamrat stoning shuttle — bus transport each day of Tashreeq",
      "Daily 3-time meals during Hajj days (halal Pakistani/Arab cuisine)",
      "Ziarat full program — Makkah Ziyarah, Madinah Ziyarah, Badr & Ohud expeditions",
      "Qurbani included (Udhiya — Halal verified with local charity distribution)",
      "All Nusuk fees, Makkah Municipality, taxes & mandatory vaccines included",
    ],
  },
];

export type InsurancePlan = {
  id: string;
  icon: string;
  name: string;
  coverage: string;
  description: string;
  bestFor: string;
};

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: "schengen-medical",
    icon: "ShieldCheck",
    name: "Schengen-Approved Medical Insurance",
    coverage: "€30,000 – €50,000",
    description: "Meets all Schengen visa requirements. Covers medical emergencies, hospitalization, and repatriation.",
    bestFor: "Europe travel, Schengen visa applications",
  },
  {
    id: "flight-cancellation",
    icon: "PlaneTakeoff",
    name: "Flight Cancellation Cover",
    coverage: "Up to ticket value",
    description: "Reimbursement for cancelled or delayed flights, including missed connections and accommodation costs.",
    bestFor: "Frequent flyers, business travelers",
  },
  {
    id: "baggage-protection",
    icon: "Luggage",
    name: "Baggage Protection",
    coverage: "Up to $2,000",
    description: "Compensation for lost, stolen, or delayed baggage. Covers essentials and emergency purchases.",
    bestFor: "International travelers, families",
  },
  {
    id: "corporate-travel",
    icon: "Briefcase",
    name: "Corporate Travel Insurance",
    coverage: "Custom",
    description: "Annual multi-trip coverage for companies and organizations. Covers all employees on business travel.",
    bestFor: "Companies, NGOs, government offices",
  },
];

export type FAQ = {
  category: string;
  items: { q: string; a: string }[];
};

export const FAQS: FAQ[] = [
  {
    category: "Flights",
    items: [
      { q: "How do I get a live fare?", a: "Send us your route, dates, and passenger details on WhatsApp. We reply with the best available fares within minutes." },
      { q: "Can I change my flight date?", a: "Yes, subject to airline rules. Contact us on WhatsApp and we will check availability and any change fees." },
      { q: "Do you book group flights?", a: "Yes. For groups of 10+, we offer special group fares. Visit our Corporate & Group Travel section." },
      { q: "Can I book for someone else?", a: "Yes. Provide the passenger's full name (as per passport), date of birth, and document details." },
      { q: "Do you offer one-way tickets?", a: "Yes. We book one-way, round-trip, and multi-city itineraries." },
      { q: "How do I pay for my ticket?", a: "Bank transfer, JazzCash, Easypaisa, or cash at our Sialkot office. Details shared on WhatsApp." },
    ],
  },
  {
    category: "Visas",
    items: [
      { q: "How long does UK visa take?", a: "Typically 3–6 weeks from the biometrics appointment. We guide you through the full process." },
      { q: "Do you help with documentation?", a: "Yes. We provide a personalized checklist, review your documents, and prepare your file." },
      { q: "What if my visa is rejected?", a: "We help you understand the refusal reasons and guide you on reapplication or appeal options." },
      { q: "Do you process Schengen visas?", a: "Yes. We provide full Schengen visa consultation including travel insurance and itinerary preparation." },
      { q: "Can you get me a visa for Dubai?", a: "Yes. UAE tourist eVisas are processed within 24–72 hours." },
      { q: "Do you provide invitation letters?", a: "For certain visas, we can arrange invitation letters from our partners. Ask on WhatsApp." },
    ],
  },
  {
    category: "Umrah",
    items: [
      { q: "What's included in Umrah packages?", a: "Flight, visa, hotel, transport, Ziyarat, and Nusuk permits. Specific inclusions depend on the package tier." },
      { q: "Can I customize my Umrah package?", a: "Yes. Every package can be tailored to your dates, budget, and hotel preferences." },
      { q: "Do you arrange Nusuk permits?", a: "Yes. We arrange Rawdah Mubarak and Haram access permits for all our pilgrims." },
      { q: "How long does Saudi Umrah eVisa take?", a: "Typically 24–48 hours. Urgent processing available." },
      { q: "Can children travel for Umrah?", a: "Yes. Children require their own passport and visa. We arrange family-friendly hotels and transport." },
    ],
  },
  {
    category: "Insurance",
    items: [
      { q: "Is your insurance Schengen-approved?", a: "Yes. Our medical insurance plans meet all Schengen visa requirements with €30,000+ coverage." },
      { q: "What does travel insurance cover?", a: "Medical emergencies, hospitalization, flight cancellation, baggage loss/delay, and repatriation." },
      { q: "How fast is the insurance certificate issued?", a: "Most policies are issued within 2–4 hours on WhatsApp." },
      { q: "Can I get insurance for my whole family?", a: "Yes. Family plans are available with discounted rates." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you accept?", a: "Bank transfer, JazzCash, Easypaisa, and cash at our Sialkot office." },
      { q: "Is there a deposit required?", a: "For flight bookings, full payment is required before ticketing. For Umrah packages, a deposit secures your booking." },
      { q: "Do you provide invoices?", a: "Yes. Proper invoices are provided for all bookings. Corporate accounts receive GST-compliant invoices." },
    ],
  },
  {
    category: "Support",
    items: [
      { q: "How fast do you reply on WhatsApp?", a: "During working hours (8 AM – 9 PM), we typically reply within 5–15 minutes. Urgent inquiries are prioritized." },
      { q: "What are your working hours?", a: "Monday–Sunday, 8:00 AM – 9:00 PM (PKT). WhatsApp support is available 24/7 for urgent matters." },
      { q: "Can I visit your office?", a: "Yes. Our office is in Sialkot, Punjab, Pakistan. Contact us on WhatsApp for the exact address." },
    ],
  },
];

export const TESTIMONIALS: never[] = [];

// Travel topics we cover (no fake dates, no fake reading times — these are
// guides we publish over time. Each opens WhatsApp to request the full guide.)
export const TRAVEL_GUIDES = [
  { slug: "uk-visitor-visa-guide", title: "UK Visitor Visa Guide for Pakistani Citizens", excerpt: "Complete document checklist, bank statement requirements, and appointment tips.", category: "Visa" },
  { slug: "schengen-visa-checklist", title: "Schengen Visa Checklist: What You Actually Need", excerpt: "Avoid rejections with this verified document guide.", category: "Visa" },
  { slug: "umrah-packing-list", title: "Umrah Packing List: The Complete Guide", excerpt: "What to pack, what to buy in Saudi, and what to leave behind.", category: "Umrah" },
  { slug: "cheap-flights-pakistan", title: "How to Get Cheap Flights From Pakistan", excerpt: "Best booking windows, airlines to watch, and route tips.", category: "Flights" },
  { slug: "uae-visa-30-60-days", title: "UAE Tourist Visa: 30 vs 60 Days Explained", excerpt: "Which one is right for you and how to extend.", category: "Visa" },
  { slug: "saudi-tourist-evisa-step-by-step", title: "Saudi Tourist eVisa: Step-by-Step Application", excerpt: "Full walkthrough with screenshots.", category: "Visa" },
  { slug: "schengen-travel-insurance-requirement", title: "Travel Insurance for Schengen Visa: What Meets the Requirement", excerpt: "Coverage amounts, approved insurers, and common mistakes.", category: "Insurance" },
  { slug: "top-10-family-umrah-tips", title: "Top 10 Family-Friendly Umrah Tips", excerpt: "Travelling with children, elderly parents, and large groups.", category: "Umrah" },
  { slug: "business-vs-tourist-visa", title: "Business Visa vs Tourist Visa: Know the Difference", excerpt: "When to apply for which, and why it matters.", category: "Visa" },
  { slug: "ramadan-umrah-best-dates", title: "Ramadan Umrah: Best Dates and Packages", excerpt: "Planning your pilgrimage during the blessed month.", category: "Umrah" },
];

export const WHY_HTG_FEATURES = [
  { icon: "TrendingUp", title: "Transparent Live Rates", description: "No outdated price lists. We quote real-time fares based on your exact dates." },
  { icon: "Layers", title: "One Desk for Everything", description: "Flights, visas, insurance, hotels, and Umrah packages — all handled by one team." },
  { icon: "MessageCircle", title: "WhatsApp-First Support", description: "No call centers, no ticket numbers. Message us and get a real person within minutes." },
  { icon: "Globe", title: "Pakistan-Wide, Globally Connected", description: "Based in Sialkot, serving travelers across Pakistan and Pakistanis worldwide." },
  { icon: "BadgeCheck", title: "Verified Tickets & Vouchers", description: "Official airline e-tickets and authentic hotel vouchers for visa applications." },
  { icon: "FileText", title: "Document Guidance", description: "We help you prepare, review, and submit your visa file correctly the first time." },
];

export const HOW_IT_WORKS_STEPS = [
  { number: "01", title: "Send Your Details", description: "Message us on WhatsApp with your route, travel dates, and passenger details. Takes less than a minute." },
  { number: "02", title: "Get Live Fare & Checklist", description: "Our team checks live airline fares and sends you the best options, plus a visa document checklist if needed." },
  { number: "03", title: "Confirm & Travel", description: "Confirm your booking, receive your e-ticket and hotel vouchers, and get visa submission guidance. We stay with you until you depart." },
];
