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
    waText: "Assalam o Alaikum! I read your document checklist. Please verify my documents for my trip.",
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
};
