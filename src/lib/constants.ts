export const SITE = {
  brand: "HTG Travels",
  shortBrand: "HTG",
  tagline: "Tickets · Visas · Insurance",
  secondaryTagline: "Sialkot's Trusted Travel Desk",
  domain: "htg.com.pk",
  whatsappNumber: "923251480148",
  whatsappDisplay: "+92 325 1480148",
  whatsappLink: "https://wa.me/923251480148",
  email: "htghuzaifa@gmail.com",
  location: "Sialkot, Punjab, Pakistan",
  hours: "Monday–Sunday, 8:00 AM – 9:00 PM (PKT)",
  workingHoursShort: "8 AM – 9 PM",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Flights", href: "#flights" },
  { label: "Visas", href: "#visa" },
  { label: "Umrah", href: "#umrah" },
  { label: "Insurance", href: "#insurance" },
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = {
  airTickets: [
    { label: "Islamabad to Dubai Flights", href: "#flights" },
    { label: "Karachi ↔ Islamabad / Lahore", href: "#flights" },
    { label: "Pakistan to UK / London", href: "#flights" },
    { label: "Pakistan to Saudi Arabia", href: "#flights" },
    { label: "Islamabad to Istanbul Flights", href: "#flights" },
    { label: "International Air Tickets", href: "#flights" },
  ],
  visaConsultation: [
    { label: "UK Visitor Visa", href: "#visa" },
    { label: "USA B1/B2 Visa Prep", href: "#visa" },
    { label: "Schengen Visa Services", href: "#visa" },
    { label: "UAE eVisa (30/60 Days)", href: "#visa" },
    { label: "Saudi Tourist eVisa", href: "#visa" },
    { label: "Turkey & Malaysia eVisas", href: "#visa" },
  ],
  travelServices: [
    { label: "Travel Medical Insurance", href: "#insurance" },
    { label: "Flight Cancellation Insurance", href: "#insurance" },
    { label: "Hotel Bookings Worldwide", href: "#contact" },
    { label: "Corporate Travel Accounts", href: "#corporate" },
    { label: "Group Flight Bookings", href: "#corporate" },
  ],
  resources: [
    { label: "Umrah & Hajj Packages", href: "#umrah" },
    { label: "Blog & Guides", href: "#blog" },
    { label: "Travel Destinations", href: "#destinations" },
    { label: "Free Online Tools", href: "#contact" },
    { label: "FAQ", href: "#faq" },
    { label: "About HTG Travels", href: "#about" },
    { label: "Contact Us", href: "#contact" },
  ],
} as const;
