import type { BlogPostSeed } from "../blog-data";

/**
 * Blog post: "First Umrah: What a New Pilgrim Needs to Know"
 * Category: Umrah
 * Live at /blog/umrah-first-time-complete-guide
 */
export const umrahFirstTimeCompleteGuide: BlogPostSeed = {
  slug: "umrah-first-time-complete-guide",
  title: "First Umrah: What a New Pilgrim Needs to Know",
  category: "Umrah",
  metaDescription:
    "First time performing Umrah? The complete beginner's guide. Intentions, ihram, the rituals in order, and the mistakes first-timers always make.",
  keywords: [
    "first Umrah guide",
    "Umrah for beginners",
    "how to perform Umrah",
    "Umrah steps",
    "first time Umrah",
  ],
  promo: {
    headline: "Your First Umrah Should Be Planned by People Who've Sent Thousands",
    body: "First-time pilgrims carry questions that no blog fully answers, so our packages include a pre-departure orientation and a WhatsApp group where our team answers everything, from niyyah to Nusuk permits. Flights, visa, Haram-side hotels, and guidance included. Start your journey with a message.",
    cta: "Plan my first Umrah",
    waText: "Assalam o Alaikum! This will be my first Umrah. Please guide me to the right package.",
  },
  content: [
    {
      type: "p",
      text: "Take a breath. Umrah is four rituals performed with intention. Millions do it for the first time every year, and the steps fit on a single page. The spiritual preparation matters more than memorizing logistics, but knowing the sequence lets your heart focus where it should.",
    },
    {
      type: "h2",
      text: "The Rituals in Order",
    },
    {
      type: "ul",
      items: [
        "Ihram: enter the state at the miqat with the intention (niyyah) and the talbiyah on your lips",
        "Tawaf: seven circuits around the Kaaba, anti-clockwise, starting near the Black Stone",
        "Sa'i: seven laps between the hills of Safa and Marwah, retracing Hajira's search for water",
        "Halq or Taqsir: shave the head (men) or trim a fingertip's length of hair (women). Ihram ends",
      ],
    },
    {
      type: "h2",
      text: "The Mistakes First-Timers Make",
    },
    {
      type: "p",
      text: "Rushing. The crowds move slow for a reason. You are not late, you are in worship. Pushing at the Black Stone area; a gesture toward it from a distance counts as the sunnah. Talking through Tawaf about hotels and photos; carry a small dua card instead. And forgetting rest: the Haram rewards the patient, not the exhausted. Drink Zamzam, sit when tired, and let the days carry you.",
    },
    {
      type: "quote",
      text: "Every pilgrim we send is a first-timer somewhere in their family. We prepare them all. Ask about our orientation-included packages.",
    },
  ],
  faqs: [
    { q: "Can I perform Umrah if I have never done it before and know no Arabic?", a: "Yes. The rituals take under three hours to learn, guides explain each step in Urdu, and most Pakistani groups walk first-timers through ihram, Tawaf, Sa'i, and halq together. Learn the intention words on the flight; everything else follows your group leader." },
    { q: "How long does Umrah take once I am in Makkah?", a: "The rituals themselves, ihram to halq, take three to four unhurried hours. Most first-timers rest before Tawaf, walk the Mataf slowly, finish Sa'i the same evening, then perform a second, calmer Umrah later in the trip." },
    { q: "What is the best way to handle money in Saudi Arabia?", a: "A mix: riyal cash for food and tips, a debit card for mall ATMs, and the bulk on a travel card or in your account. Exchange a small amount in Pakistan, then compare Haram-area rates." },
    { q: "How physically tiring is Umrah day to day?", a: "Most pilgrims walk between 40 and 70 kilometres across a two-week trip. Spread rituals across days, use night hours, and treat blisters on day one, not day four." },
  ],
};
