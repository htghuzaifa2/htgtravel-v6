import type { BlogPostSeed } from "../blog-data";

/**
 * Blog post: "Domestic Flights in Pakistan: Airlines and Smart Routes"
 * Category: Flights
 * Live at /blog/pakistan-domestic-flights-guide
 */
export const pakistanDomesticFlightsGuide: BlogPostSeed = {
  slug: "pakistan-domestic-flights-guide",
  title: "Domestic Flights in Pakistan: Airlines and Smart Routes",
  category: "Flights",
  metaDescription:
    "Flying within Pakistan. Airlines compared, domestic booking tips, the northern routes, and how to handle the schedule reality.",
  keywords: [
    "domestic flights Pakistan",
    "cheap domestic flights",
    "PIA booking",
    "flights to Skardu",
    "Pakistan airlines",
  ],
  promo: {
    headline: "Domestic and International, One Desk Handles Both",
    body: "Positioning flights to Karachi for your international departure, Skardu seats for the summer, or the domestic leg of a family trip. We book domestic routes every day and know the schedule quirks by heart. Message us your route; same-day quotes, real schedules, honest alternatives.",
    cta: "Book domestic flights",
    waText: "Hi HTG Travels, I need travel support.",
  },
  content: [
    {
      type: "p",
      text: "Pakistan's domestic sky is small but mighty: Karachi to Islamabad in under two hours, and the northern routes to Skardu and Gilgit among the most scenic commercial flights on earth. The system runs on a few airlines, a few rules, and a few quirks.",
    },
    {
      type: "h2",
      text: "The Carriers",
    },
    {
      type: "ul",
      items: [
        "PIA: the widest network including the northern routes, with the schedule flexibility that implies",
        "Airblue and Serene Air: strong on the Karachi–Lahore–Islamabad triangle with competitive fares",
        "The northern routes: weather-dependent, morning-scheduled, and booked out weeks ahead in summer",
        "Baggage on domestic runs is tighter than international. Check your allowance before packing",
      ],
    },
    {
      type: "h2",
      text: "The Smart Traveller's Rules",
    },
    {
      type: "p",
      text: "Book morning departures on the northern routes. Afternoon weather closes those mountain airports with impressive regularity. Build buffer into any itinerary that feeds an international departure: domestic delays in Pakistan are not scandalous, but they are real. Reconfirm the night before, reach the airport with domestic-specific margin, and keep your CNIC and booking reference photographed. And for the positioning flight before a big international trip, that is the one leg worth booking through an agency that can rebook you in minutes if plans wobble. Ours does.",
    },
    {
      type: "quote",
      text: "Domestic legs, international journeys. One desk, same-day service. Message us your route.",
    },
  ],
  faqs: [
    { q: "Which airlines fly domestically in Pakistan?", a: "PIA covers the full map including the northern routes, with Airblue, Serene Air, and flyeasy competing on the Karachi-Lahore-Islamabad trunk. Northern flights to Skardu and Gilgit stay seasonal and weather-bound." },
    { q: "How early should I book domestic flights in Pakistan?", a: "Two to three weeks for trunk routes, and two months for summer Skardu and Gilgit seats, which sell out entirely in the school holidays. Prices climb predictably as the cabin fills." },
    { q: "Can I change my flight dates after booking?", a: "Yes, with the fare's own rules setting the price. Booking flexible fares costs more upfront and saves multiples when plans move." },
    { q: "Where should Pakistanis book their flights?", a: "Airlines suit simple direct bookings; agencies earn their fee on multi-city routes, group terms, and when something goes wrong mid-trip and you need a human working your rebooking." },
  ],
};
