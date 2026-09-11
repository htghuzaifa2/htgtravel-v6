export const SITE = {
  brand: "HTG Travels",
  shortBrand: "HTG",
  tagline: "Tickets · Visas · Insurance",
  secondaryTagline: "Pakistan's Trusted Travel Desk",
  domain: "htg.com.pk",
  whatsappNumber: "923251480148",
  whatsappDisplay: "+92 325 1480148",
  whatsappLink: "https://wa.me/923251480148",
  email: "htghuzaifa@gmail.com",
  location: "Sialkot, Punjab, Pakistan",
  hours: "Monday–Sunday, 8:00 AM – 9:00 PM (PKT)",
  workingHoursShort: "8 AM – 9 PM",
  // Service area — we serve Pakistani travelers worldwide, with primary focus on Pakistan.
  serviceArea: "Pakistan-wide & Pakistani travelers worldwide",
} as const;

// Primary navigation — Next.js routes (NOT anchors)
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Visas", href: "/visa" },
  { label: "Umrah", href: "/umrah" },
  { label: "Insurance", href: "/insurance" },
  { label: "Destinations", href: "/destinations" },
  { label: "Corporate", href: "/corporate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Grouped nav for desktop dropdown (where appropriate)
export const NAV_GROUPS = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Visas", href: "/visa" },
  { label: "Umrah", href: "/umrah" },
  { label: "Insurance", href: "/insurance" },
  { label: "Destinations", href: "/destinations" },
  { label: "Corporate", href: "/corporate" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  airTickets: [
    { label: "Domestic Flights", href: "/flights" },
    { label: "International Flights", href: "/flights" },
    { label: "Pakistan to UAE / Dubai", href: "/flights" },
    { label: "Pakistan to UK / London", href: "/flights" },
    { label: "Pakistan to Saudi Arabia", href: "/flights" },
    { label: "Pakistan to Turkey / Istanbul", href: "/flights" },
    { label: "All Flight Routes", href: "/destinations" },
  ],
  visaConsultation: [
    { label: "UK Visitor Visa", href: "/visa" },
    { label: "USA B1/B2 Visa Prep", href: "/visa" },
    { label: "Schengen Visa Services", href: "/visa" },
    { label: "UAE eVisa (30/60 Days)", href: "/visa" },
    { label: "Saudi Tourist eVisa", href: "/visa" },
    { label: "Turkey & Malaysia eVisas", href: "/visa" },
    { label: "All Visa Destinations", href: "/visa" },
  ],
  travelServices: [
    { label: "Travel Medical Insurance", href: "/insurance" },
    { label: "Flight Cancellation Insurance", href: "/insurance" },
    { label: "Hotel Bookings Worldwide", href: "/contact" },
    { label: "Corporate Travel Accounts", href: "/corporate" },
    { label: "Group Flight Bookings", href: "/corporate" },
    { label: "Umrah & Hajj Packages", href: "/umrah" },
  ],
  resources: [
    { label: "About HTG Travels", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Travel Destinations", href: "/destinations" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;
