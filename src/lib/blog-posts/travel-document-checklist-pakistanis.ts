import type { BlogPostSeed } from "../blog-data";

/**
 * Blog post: "The Travel Document Checklist Every Pakistani Needs"
 * Category: Travel
 * Live at /blog/travel-document-checklist-pakistanis
 */
export const travelDocumentChecklistPakistanis: BlogPostSeed = {
  slug: "travel-document-checklist-pakistanis",
  title: "The Travel Document Checklist Every Pakistani Needs",
  category: "Travel",
  metaDescription:
    "The complete document checklist for Pakistani travellers. Passports, visas, insurance, and the copies that save trips when originals vanish.",
  keywords: [
    "travel document checklist",
    "travel documents Pakistanis",
    "passport checklist",
    "what documents to travel",
    "travel paperwork",
  ],
  promo: {
    headline: "The Checklist, Personalized and Checked by Our Desk",
    body: "Every trip we book comes with its document checklist. Personalized for your destination's requirements and verified against the current rules before you fly. No missing-certificate surprises, no airport heartbreak. Travel with your paperwork professionally checked: message us.",
    cta: "Check my documents",
    waText: "Hi HTG Travels, I need travel support.",
  },
  content: [
    {
      type: "p",
      text: "Airports have two doors: the one your documents open and the one they don't. This checklist is the difference. Five minutes of verification against a lifetime of airport stories.",
    },
    {
      type: "h2",
      text: "The Master Checklist",
    },
    {
      type: "ul",
      items: [
        "Passport: 6+ months validity, 2+ blank pages, machine-readable and undamaged",
        "Visa: printed if electronic, correctly dated, in the passport if stickered",
        "Tickets and hotel bookings: printed copies plus phone versions",
        "Insurance certificate: printed, with the emergency numbers circled",
        "Vaccination certificates: the yellow card, original",
        "CNIC plus one government photo ID copy",
        "Photos: two passport-size, white background, just in case",
        "Money evidence: cards, cash split across locations, and the exchange receipt",
      ],
    },
    {
      type: "h2",
      text: "The Copy Protocol",
    },
    {
      type: "p",
      text: "Photograph every document and email the set to yourself. The cloud holds what pockets lose. Carry photocopies separately from originals; a stolen bag takes one version, never both. Women travelling with mahram documentation and families with children's passports should keep those extra-certified copies current. And the check worth doing the night before: verify names match character-for-character across passport, ticket, and visa. The mismatch of one letter is the most preventable tragedy in travel.",
    },
    {
      type: "quote",
      text: "Documents checked twice, travels once. Our desk does the checking. Ask.",
    },
  ],
  faqs: [
    { q: "What documents does every Pakistani traveller need?", a: "Passport with six months validity, the visa, return ticket proof, hotel bookings, insurance, CNIC copies, and funds evidence. Keep photos of all of it on your phone and copies in each bag." },
    { q: "Should documents be original or copies while travelling?", a: "Originals on your person for the passport and visa, certified copies for the rest, and digital copies everywhere. Check-in counters and border officers only trust the real thing." },
    { q: "Why use HTG Travels for planning a trip?", a: "The desk handles visas, fares, rooms, and the odd mid-trip rescue, all through one WhatsApp thread. Travellers keep the fun parts; the paperwork goes to us." },
    { q: "How do I handle peak travel seasons in Pakistan?", a: "Either book four months ahead for the peak, or shift dates a week sideways from the rush. The Eid window forgives no late planners." },
  ],
};
