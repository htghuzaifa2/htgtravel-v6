import { SITE } from "./constants";

const WHATSAPP_NUMBER = SITE.whatsappNumber;

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsApp(message: string): void {
  if (typeof window !== "undefined") {
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }
}

// Message templates
export const flightInquiry = (data: {
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
  pax?: string;
  tripType?: string;
}) => {
  const lines = [
    "Hi HTG Travels, I need a flight quote.",
    "",
    `Trip Type: ${data.tripType || "Round Trip"}`,
    data.from ? `From: ${data.from}` : "",
    data.to ? `To: ${data.to}` : "",
    data.date ? `Departure: ${data.date}` : "",
    data.returnDate ? `Return: ${data.returnDate}` : "",
    data.pax ? `Passengers: ${data.pax}` : "",
    "",
    "Please share live rates.",
  ].filter(Boolean);
  return lines.join("\n");
};

export const visaInquiry = (data: {
  country?: string;
  visaType?: string;
  date?: string;
  nationality?: string;
}) => {
  const lines = [
    "Hi HTG Travels, I need visa consultation.",
    "",
    `Destination: ${data.country || "Saudi Arabia"}`,
    `Visa Type: ${data.visaType || "Tourist eVisa"}`,
    data.date ? `Travel Date: ${data.date}` : "",
    `Nationality: ${data.nationality || "Pakistani"}`,
    "",
    "Please share requirements and fees.",
  ].filter(Boolean);
  return lines.join("\n");
};

export const umrahInquiry = (data: {
  duration?: string;
  hotel?: string;
  pilgrims?: string;
  month?: string;
  package?: string;
}) => {
  const lines = [
    "Hi HTG Travels, I need an Umrah package quote.",
    "",
    data.package ? `Package: ${data.package}` : "",
    data.duration ? `Duration: ${data.duration}` : "",
    data.hotel ? `Hotel Category: ${data.hotel}` : "",
    data.pilgrims ? `Pilgrims: ${data.pilgrims}` : "",
    data.month ? `Travel Month: ${data.month}` : "",
    "",
    "Please share live rates.",
  ].filter(Boolean);
  return lines.join("\n");
};

export const insuranceInquiry = (plan?: string) =>
  `Hi HTG Travels, I need travel insurance.${plan ? `\n\nPlan: ${plan}` : ""}\n\nPlease share live rates.`;

export const corporateInquiry = (data: {
  company?: string;
  contact?: string;
  email?: string;
  phone?: string;
  travelers?: string;
  route?: string;
  dates?: string;
  notes?: string;
}) => {
  const lines = [
    "Hi HTG Travels, I need a corporate travel quote.",
    "",
    data.company ? `Company: ${data.company}` : "",
    data.contact ? `Contact Person: ${data.contact}` : "",
    data.email ? `Email: ${data.email}` : "",
    data.phone ? `Phone: ${data.phone}` : "",
    data.travelers ? `Number of Travelers: ${data.travelers}` : "",
    data.route ? `Route/Destination: ${data.route}` : "",
    data.dates ? `Travel Dates: ${data.dates}` : "",
    data.notes ? `Special Requirements: ${data.notes}` : "",
    "",
    "Please share corporate rates and account manager details.",
  ].filter(Boolean);
  return lines.join("\n");
};

export const contactInquiry = (data: {
  name?: string;
  email?: string;
  message?: string;
}) => {
  const lines = [
    "Hi HTG Travels, I have a travel inquiry.",
    "",
    data.name ? `Name: ${data.name}` : "",
    data.email ? `Email: ${data.email}` : "",
    data.message ? `Message: ${data.message}` : "",
  ].filter(Boolean);
  return lines.join("\n");
};

export const routeInquiry = (routeCode: string, routeName: string) =>
  `Hi HTG Travels, I need a live fare for:\n\nRoute: ${routeCode} — ${routeName}\n\nPlease share today's best rate.`;

// One unified, direct support message — used by the header, footer, and every
// generic CTA site-wide. Keep it short and support-focused (no marketing copy).
export const SUPPORT_MESSAGE = "Hi HTG Travels, I need travel support.";

export const generalInquiry = () => SUPPORT_MESSAGE;
