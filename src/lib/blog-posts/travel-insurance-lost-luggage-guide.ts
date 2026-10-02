import type { BlogPostSeed } from "../blog-data";

/**
 * Blog post: "Lost Luggage: How Insurance Actually Handles It"
 * Category: Insurance
 * Live at /blog/travel-insurance-lost-luggage-guide
 */
export const travelInsuranceLostLuggageGuide: BlogPostSeed = {
  slug: "travel-insurance-lost-luggage-guide",
  title: "Lost Luggage: How Insurance Actually Handles It",
  category: "Insurance",
  metaDescription:
    "Lost and delayed luggage insurance explained. Airline liability vs travel insurance, the documentation that matters, and claiming properly.",
  keywords: [
    "lost luggage insurance",
    "baggage delay cover",
    "lost baggage claim",
    "airline luggage compensation",
    "baggage claim process",
  ],
  promo: {
    headline: "Travel With Cover That Answers When the Belt Stops",
    body: "The carousel's final revolution with your bag absent is a specific kind of misery, and the right policy turns it into reimbursement instead of regret. Our desk arranges baggage cover with clear claim support for Pakistani travellers. Add it to your next trip: one message.",
    cta: "Add baggage cover",
    waText: "Hi HTG Travels, I need travel support.",
  },
  content: [
    {
      type: "p",
      text: "The belt stops, the crowd thins, and your suitcase is somewhere over the Gulf. Luggage trouble comes in two flavours, delayed and lost, and insurance handles each differently. Knowing the machinery before it happens halves the misery.",
    },
    {
      type: "h2",
      text: "The Two Coverages",
    },
    {
      type: "ul",
      items: [
        "Baggage delay: reimburses essential purchases (clothes, toiletries) when bags arrive late, usually after a 6–12 hour threshold",
        "Baggage loss: pays a capped amount when the airline declares the bag officially lost, typically after 21 days",
        "Airline liability exists separately. Report at the airline's baggage desk before leaving the airport, always",
        "The Property Irregularity Report is the document both the airline and insurer demand",
      ],
    },
    {
      type: "h2",
      text: "The Sequence That Pays",
    },
    {
      type: "p",
      text: "Report before leaving the airport. The baggage desk issues the irregularity report that anchors every claim. Photograph your suitcase before every flight; contents lists and receipts are what insurers pay against, so keep the valuable purchases documented at home. Buy essentials within the policy's limits. The delayed-baggage allowance covers reasonable needs, not retail therapy. And keep the receipts with the report in one folder: claims with complete files pay in weeks; claims assembled from memory pay in arguments. Travel cover through our desk comes with the checklist before you need it.",
    },
    {
      type: "quote",
      text: "The belt stopping is not the end of the world, with the right cover and sequence. We provide both.",
    },
  ],
  faqs: [
    { q: "What happens if my luggage is lost on an international flight?", a: "Report it at the arrival airport before leaving, taking the property irregularity report, which starts the airline's search. Airlines pay compensation for bags never found, with insurance topping up the difference on your actual losses." },
    { q: "Does the airline or my insurance pay for lost luggage?", a: "The airline owes a liability cap first, which is often modest against real belongings. Your insurer covers above that and the items the airline excludes, so claim with both, receipts in hand." },
    { q: "How much does travel insurance cost from Pakistan?", a: "Basic short-trip policies start near a few thousand rupees, scaling with age and medical cover limits. Compare the medical cap first; the price follows it." },
    { q: "Does travel insurance cover visa refusal?", a: "Usually excluded on basic policies, so check the cancellation section's covered reasons before relying on it. Where visa refusal is covered, the certificate names it explicitly." },
  ],
};
