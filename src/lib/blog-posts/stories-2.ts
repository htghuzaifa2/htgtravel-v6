import type { BlogPostSeed } from "../blog-data";

/**
 * Story batch II: seven feature-style guides (the honest first-Umrah
 * version, Umrah budget tactics, Hajj 2026 for overseas Pakistanis, the
 * Karakoram Highway drive, the four entry doors of the green passport,
 * the Baku-Tbilisi-Dubai first-trip comparison, and the group-versus-solo
 * cost maths). Each was rewritten for accuracy, human voice, and tight
 * length; promos and Palestine messages stay unique per post.
 */
export const storiesTwo: BlogPostSeed[] = [
  {
    slug: "first-umrah-honest-version",
    title: "First Umrah: The Honest Version Nobody Tells You",
    category: "Umrah",
    metaDescription:
      "First Umrah honesty: the sore feet, the quiet tears, the Umrah flu, and why the Kaaba hits everyone differently. Go prepared.",
    keywords: [
      "first Umrah",
      "Umrah emotions",
      "Umrah walking fitness",
      "Umrah flu",
      "Tawaf crowds",
    ],
    promo: {
      headline: "The Version We Tell Our Own Families",
      body: "We brief every first-timer the honest way: a hotel distance that suits your legs, dates that are kind to your knees, permits booked before you fly, and a WhatsApp line that answers at midnight. Ask the awkward questions; we have heard them all.",
      cta: "Prep my first Umrah",
      waText: "Assalam o Alaikum! This will be my first Umrah. Please help me prepare honestly: hotel distance, dates, and permits.",
    },
    content: [
      {
        type: "p",
        text: "Most Umrah guides walk you through the rituals. Few mention the sore feet, the sudden tears, or the moment a crowd of thousands swallows you whole. Before my first Umrah, I wanted the honest version. This is it.",
      },
      {
        type: "h2",
        text: "The Kaaba Hits Everyone Differently",
      },
      {
        type: "p",
        text: "Some pilgrims weep the moment it comes into view. Others go strangely quiet. A few feel almost nothing at first, then fall apart a week later at home, remembering it. Every reaction is normal. I expected a wave of emotion and got a deep stillness instead. Your first Umrah is not a movie scene and does not need to be. Do not measure your faith by your first five minutes; the connection builds quietly over days.",
      },
      {
        type: "h2",
        text: "It Is a Workout, Not a Walk",
      },
      {
        type: "p",
        text: "Between Tawaf, Sa'i, and the walks to and from the Haram, 15,000 to 20,000 steps a day is normal. Start walking daily a few weeks before you fly, and break in your sandals at home, not during Tawaf. Wheelchairs are widely available and take nothing from the journey. Cooler months are kinder.",
      },
      {
        type: "h2",
        text: "The Umrah Flu Is Real",
      },
      {
        type: "p",
        text: "Freezing hotel air conditioning, desert heat outside, thousands praying shoulder to shoulder: half your group will come home scratchy-throated. Pack hand sanitizer, throat lozenges, basic cold medicine, and a scarf for icy corridors. Water and Zamzam; dehydration makes everything harder.",
      },
      {
        type: "h2",
        text: "Crowds: Plan, Do Not Panic",
      },
      {
        type: "ul",
        items: [
          "Agree on a meeting point before entering the Haram: a specific gate or landmark, not 'near the big clock'",
          "Calmer Tawaf: late at night, after Fajr, or on the upper floors",
          "Local SIM or roaming on, phone charged, power bank in your pocket",
          "Nusuk app installed before you fly, for permits and prayer times",
        ],
      },
      {
        type: "h2",
        text: "Pack Light, Sleep Close",
      },
      {
        type: "p",
        text: "You can buy almost everything in Makkah, so keep the suitcase to unscented toiletries, broken-in slip-ons, a crossbody bag for documents, rehydration salts, and your regular medicine. Choose a simple hotel five minutes from the Haram over a luxury one across town with shuttle queues; your feet will thank you by day two. Then give yourself permission to slow down. Sit on a step, drink Zamzam, watch the world circle. Rushing is how a pilgrimage becomes a checklist.",
      },
      {
        type: "quote",
        text: "Some pilgrims weep. Some go silent. Both are praying.",
      },
    ],
  },
  {
    slug: "umrah-budget-what-to-save-on",
    title: "Umrah on a Budget: What to Save On, What to Spend On",
    category: "Umrah",
    metaDescription:
      "Umrah budget tactics: where to spend (distance, comfort for parents) and where to save (flights, food, transfers). Plan with HTG Travel.",
    keywords: [
      "Umrah on a budget",
      "cheap Umrah package",
      "Umrah money saving",
      "SAPTCO bus",
      "Umrah food costs",
    ],
    promo: {
      headline: "A Beautiful Umrah, Priced Honestly",
      body: "Off-season dates, a hotel distance that fits your budget, and flights booked months ahead: we build Umrah around what the journey actually needs, not what a brochure wants to sell. Share your ceiling; we will show you where every rupee lands.",
      cta: "Price my Umrah",
      waText: "Assalam o Alaikum! I want to do Umrah on a budget. Please tell me where I should save and where I should spend.",
    },
    content: [
      {
        type: "p",
        text: "A myth worth retiring: the more you spend on Umrah, the better the journey. Some of the most peaceful trips I have seen were simple ones: a modest hotel, humble meals, a prepared heart. Here is where to save, and where spending is wisdom.",
      },
      {
        type: "h2",
        text: "Timing Does the Heavy Lifting",
      },
      {
        type: "p",
        text: "The same room can cost double in Ramadan and school holidays. Quiet months such as Muharram and Safar drop prices across flights and hotels alike, and weekday departures shave fares further. If your calendar bends, your bill bends with it.",
      },
      {
        type: "h2",
        text: "Flights and Ground Moves",
      },
      {
        type: "p",
        text: "Book two to three months ahead, and let a short layover do what direct flights charge for; the savings can fund an extra night near the Haram. Between cities, the Haramain train is fast and worth it booked early, but SAPTCO buses are air-conditioned, reliable, and cost a fraction of the train or a private taxi. Slower, yes. Richer at the end, also yes.",
      },
      {
        type: "h2",
        text: "Location Is the One Thing You Pay For",
      },
      {
        type: "p",
        text: "You will barely see your room. A clean, simple hotel ten minutes' walk from the Haram beats a distant five-star with shuttle queues, and walking is free either way. The exception is elderly parents: pay for their proximity and comfort without apology. That is not overspending; that is the whole point of bringing them.",
      },
      {
        type: "h2",
        text: "Eat Like the City Eats",
      },
      {
        type: "ul",
        items: [
          "Two streets back from the Haram, kabsa, shawarma, and fresh bread cost a fraction of the hotel buffet",
          "Supermarkets cover dates, fruit, juice, and water at fair prices; skip the minibar entirely",
          "Portions run large; share plates with your family",
        ],
      },
      {
        type: "h2",
        text: "Plug the Small Leaks",
      },
      {
        type: "ul",
        items: [
          "Exchange currency in the city, never at the airport",
          "Buy dates and gifts at local souks, not shops facing the Haram",
          "Set a souvenir budget before you fly, and keep to it",
          "A local SIM with data beats roaming rates",
        ],
      },
      {
        type: "quote",
        text: "The stars on the door do not walk you to the Mataf.",
      },
    ],
  },
  {
    slug: "hajj-2026-overseas-pakistanis",
    title: "Hajj 2026 for Overseas Pakistanis: Nusuk, Costs, Dates",
    category: "Umrah",
    metaDescription:
      "Hajj 2026 for overseas Pakistanis: expected dates, the Nusuk route, realistic costs from North America, the UK, and the Gulf. Plan early.",
    keywords: [
      "Hajj 2026 overseas Pakistanis",
      "Nusuk Hajj booking",
      "Hajj cost from USA",
      "Hajj timeline",
      "Hajj from Gulf",
    ],
    promo: {
      headline: "Your Hajj File, Handled From Abroad",
      body: "Overseas pilgrims have a different paperwork path, and we walk it daily: Nusuk bookings, government-scheme registration through family in Pakistan, licensed operators vetted, flights locked early. Tell us where you live; we will map the cleanest route to Arafah.",
      cta: "Start my Hajj plan",
      waText: "Assalam o Alaikum! I am a Pakistani living abroad and want to plan Hajj 2026. Please guide me on booking and costs.",
    },
    content: [
      {
        type: "p",
        text: "Hajj 2026 is expected around late May, which makes the real deadline months earlier. If you are a Pakistani living abroad, your route to the visa differs from the one back home, and a few early decisions save serious money. The honest breakdown:",
      },
      {
        type: "h2",
        text: "The Dates, and the Real Deadline",
      },
      {
        type: "p",
        text: "The days of Hajj are expected around May 25 to 29, 8 to 12 Dhul Hijjah, pending the moon sighting. International pilgrims typically need paperwork, vaccinations, and packages settled between January and March. The earlier you start, the more options you keep.",
      },
      {
        type: "h2",
        text: "Three Ways In",
      },
      {
        type: "ul",
        items: [
          "Pakistan's government scheme: register at mora.gov.pk in the announced window; your CNIC is enough at registration",
          "Saudi Arabia's Nusuk platform: hajj.nusuk.sa books individual pilgrims from the countries it serves, including the USA, UK, Canada, much of Europe, the Gulf, and Australia",
          "Licensed private operators: more flexibility, higher ceilings; verify every license before paying anyone",
        ],
      },
      {
        type: "h2",
        text: "What It Realistically Costs",
      },
      {
        type: "p",
        text: "Recent government-scheme packages from Pakistan have run roughly PKR 10.5 to 11 lakh; confirm 2026 figures when registration opens. Out of North America, packages commonly land between $9,000 and $16,500 depending on room sharing, with UK and Europe similar once converted. Gulf-based Pakistanis often pay the least, thanks to short flights. Nusuk sells three tiers, Mashair, Non-Shifting, and Shifting, with minimum stays of 6, 10, and 14 days; shorter costs less overall even when the per-day maths is worse.",
      },
      {
        type: "h2",
        text: "The Working Timeline",
      },
      {
        type: "ul",
        items: [
          "Now through December: research, renew your passport, start vaccinations",
          "January and February: Nusuk bookings typically open; register interest early",
          "March: government draws and quota confirmations",
          "April: final payments, flights, documents",
          "May: departure",
        ],
      },
      {
        type: "h2",
        text: "Documents, Ready Before Anything",
      },
      {
        type: "p",
        text: "Passport valid six months beyond travel, CNIC for the Pakistan route, the meningitis ACWY certificate dated at least ten days before arrival, proof of residence where you live now, and Saudi-specification photographs. Some departure points also want flu and COVID certificates, so check the advisory for your country.",
      },
      {
        type: "quote",
        text: "The pilgrims who arrive calm are the ones who started early.",
      },
    ],
  },
  {
    slug: "karakoram-highway-road-trip",
    title: "The Karakoram Highway: The Road Trip Nobody Told You About",
    category: "Travel",
    metaDescription:
      "Drive the Karakoram Highway: Islamabad to Khunjerab Pass at 4,700m, with Attabad Lake, Hunza, and the Passu Cones on the way. Plan with HTG Travel.",
    keywords: [
      "Karakoram Highway",
      "KKH road trip",
      "Khunjerab Pass",
      "Attabad Lake",
      "Hunza itinerary",
    ],
    promo: {
      headline: "The Eighth Wonder, Driven Properly",
      body: "We run the KKH with drivers who have taken it a hundred times: vetted hotels in Hunza and Passu, buffer days for landslides, and the Babusar-versus-Besham call made from current road reports, not guesswork. Tell us how many days you have; we will pace the road for you.",
      cta: "Plan my KKH drive",
      waText: "Assalam o Alaikum! I want to drive the Karakoram Highway to Khunjerab. Please plan the route and hotels with me.",
    },
    content: [
      {
        type: "p",
        text: "Your driver takes a blind curve, and a wall of ice-white peaks opens up so suddenly that the whole van goes silent. That is the Karakoram Highway doing its thing, and almost nobody outside Pakistan has heard of it.",
      },
      {
        type: "h2",
        text: "What You Are Driving",
      },
      {
        type: "p",
        text: "The KKH is a 1,300km road carved between Pakistan and China: the highest paved international road on Earth. It threads the old Silk Road up to Khunjerab Pass at about 4,700 metres, the highest paved border crossing anywhere. Locals call it the Eighth Wonder, and they have a case.",
      },
      {
        type: "h2",
        text: "The Classic Route",
      },
      {
        type: "ul",
        items: [
          "Islamabad to Naran via the Babusar route, or via Besham when Babusar is closed.",
          "Naran to Chilas to Gilgit, where three mountain ranges collide.",
          "Gilgit to Hunza, the stretch everyone photographs.",
          "Hunza to Attabad Lake to Passu to Sost.",
          "Sost up to Khunjerab, where Pakistan and China shake hands.",
        ],
      },
      {
        type: "p",
        text: "Islamabad to Khunjerab is roughly 800km: possible in two brutal days, human in a week.",
      },
      {
        type: "h2",
        text: "The Stops That Stay With You",
      },
      {
        type: "p",
        text: "Attabad Lake, born when the 2010 landslide buried the valley, is 14 kilometres of unfiltered turquoise you can boat across. Hunza rewards at least two nights: Baltit and Altit forts, apricot orchards, and Rakaposhi following you around like a loyal dog. The Passu Cones look painted, and a hundred photos will not do them justice. At the top, Khunjerab hands you snow, yaks, and a freezing wind, even in summer.",
      },
      {
        type: "h2",
        text: "When to Go, What to Pack",
      },
      {
        type: "p",
        text: "May to October is the season; Babusar Pass opens roughly mid-June to September, and the Besham route runs year-round if it is closed. Pack layers for summer and winter in one day, sturdy shoes, serious sunscreen, motion sickness tablets, and a power bank. Carry PKR cash as well, because ATMs vanish after Gilgit.",
      },
      {
        type: "h2",
        text: "Ground Rules",
      },
      {
        type: "ul",
        items: [
          "No special permit for the KKH itself, but police check posts along the way: carry your passport and register where asked.",
          "Build buffer days; landslides close roads without appointments.",
          "Book Hunza hotels early in peak season.",
          "Hire a driver who knows the road; this is not a self-drive destination for first-timers.",
        ],
      },
      {
        type: "quote",
        text: "Silence at 4,700 metres is its own language.",
      },
    ],
  },
  {
    slug: "visa-free-vs-visa-on-arrival-guide",
    title: "Visa-Free vs Visa on Arrival: The Green Passport in 2026",
    category: "Visa",
    metaDescription:
      "Visa-free, visa on arrival, eTA, eVisa: what each door actually demands from Pakistani travellers, and which destinations open which one.",
    keywords: [
      "visa on arrival Pakistan",
      "visa-free vs visa on arrival",
      "eTA vs eVisa",
      "green passport 2026",
      "VOA documents",
    ],
    promo: {
      headline: "Every Door, Opened in Order",
      body: "We file eTAs and eVisas before you pack, check VOA document rules against the latest advisories, and book flights that match your paperwork, not the other way round. Tell us the destination; we will tell you which door it uses and what it asks for.",
      cta: "Check my entry route",
      waText: "Assalam o Alaikum! I want to know my visa options for a visa-free or visa-on-arrival trip on a Pakistani passport. Please advise.",
    },
    content: [
      {
        type: "p",
        text: "The green passport ranks low on the global indexes, yet it still opens roughly 30 countries and territories without an embassy queue. The catch: 'without a visa' means four different things, and confusing them is how airport heartbreak happens.",
      },
      {
        type: "h2",
        text: "The Four Doors",
      },
      {
        type: "ul",
        items: [
          "Visa-free: walk in, get stamped. The Caribbean bloc of Barbados, Dominica, and Montserrat gives Pakistanis 90 days this way.",
          "Visa on arrival: stamped at the airport, documents checked at the border. Nepal, Cambodia, and Timor-Leste work like this.",
          "eTA: an online pre-clearance, not a visa. Sri Lanka uses one, and it must be in hand before you board.",
          "eVisa: a real visa, issued online. Djibouti's is quick, and Rwanda now runs arrival permits for nearly every nationality.",
        ],
      },
      {
        type: "h2",
        text: "What Arrival Counters Actually Demand",
      },
      {
        type: "p",
        text: "Visa-on-arrival still means inspection: a passport valid six months, a confirmed return ticket, a hotel booking, sometimes proof of funds. Officers occasionally ask for travel insurance as well, so carry a policy you can show on a screen. Keep printed copies of everything. Airport Wi-Fi fails exactly when you need the PDF.",
      },
      {
        type: "h2",
        text: "Where the Passport Works Hardest",
      },
      {
        type: "p",
        text: "The Maldives hands Pakistanis a free 30-day arrival stamp. Nepal's Kathmandu counter takes minutes in trekking season. Gambia, the smiling coast, allows 90 days visa-free, and Cambodia's arrival process at Phnom Penh is straightforward enough that Angkor justifies the flight on its own.",
      },
      {
        type: "h2",
        text: "For Dual Nationals",
      },
      {
        type: "p",
        text: "If you hold a second passport, your travel freedom multiplies, but the green one still matters: family visits, property trips, keeping the tie to home. Many dual nationals keep quick getaways like the Maldives or Nepal on the Pakistani passport, saving the other one's pages and renewals for the big journeys.",
      },
      {
        type: "h2",
        text: "Before You Book Anything",
      },
      {
        type: "ul",
        items: [
          "Verify the rule with the destination's official sources or the IATA Travel Centre; policies shift quietly.",
          "Check the stay length per entry type; 30, 45, and 90 days vary by door.",
          "Confirm the arrival fee and carry the amount in the right currency.",
        ],
      },
      {
        type: "quote",
        text: "Thirty doors, no embassy queue. Know which one you are knocking on.",
      },
    ],
  },
  {
    slug: "first-trip-baku-tbilisi-dubai",
    title: "Baku, Tbilisi or Dubai: Which First Trip Abroad?",
    category: "Travel",
    metaDescription:
      "Baku, Tbilisi or Dubai for your first trip abroad from Pakistan: visas, budgets, flight times, and which vibe fits your first stamp.",
    keywords: [
      "first trip abroad",
      "Baku vs Tbilisi vs Dubai",
      "Azerbaijan e-visa Pakistanis",
      "Georgia e-visa Pakistanis",
      "Dubai first visit",
    ],
    promo: {
      headline: "The First Stamp, Chosen Properly",
      body: "We compare the three with your actual numbers: visa timelines that match your dates, flights that fit your leave, and hotels in districts that suit a first-timer. Tell us your budget and your nerves; we will recommend honestly, even when the answer is the cheapest option.",
      cta: "Help me pick my first trip",
      waText: "Assalam o Alaikum! I am planning my first trip abroad and torn between Baku, Tbilisi, and Dubai. Please compare them for me.",
    },
    content: [
      {
        type: "p",
        text: "Three cities have quietly become the default first trips for Pakistani travellers: Baku, Tbilisi, and Dubai. One promises old meets new, one stretches a budget, one wraps you in familiar comfort. Which one deserves your first stamp depends on what you want that stamp to feel like.",
      },
      {
        type: "h2",
        text: "The Snapshot",
      },
      {
        type: "ul",
        items: [
          "Baku: e-visa in roughly 3 to 5 working days, about 4 hours direct, $100 to 140 a day, East meeting West",
          "Tbilisi: e-visa required for Pakistanis now, 5 to 6 hours with a stop, $50 to 80 a day, Europe on a budget",
          "Dubai: visa pre-arranged through your hotel, airline, or agency, 2 to 3 hours direct, $150 to 250 a day, polished and familiar",
        ],
      },
      {
        type: "h2",
        text: "Baku, If You Want Different",
      },
      {
        type: "p",
        text: "The Flame Towers light the Caspian skyline while the UNESCO-listed Old City takes you back centuries: cobblestones in the morning, sleek cafés by afternoon. The e-visa is genuinely one of the easier processes for Pakistanis, standard processing in a few working days, urgent processing for roughly double if dates press. Mud volcanoes wait outside the city, and the old tea houses pour like they have time, because they do.",
      },
      {
        type: "h2",
        text: "Tbilisi, If Budget Leads",
      },
      {
        type: "p",
        text: "Pastel houses stack on hillsides, sulfur baths steam in the old town, and wine costs less than bottled water back home. Georgia now requires an e-visa for Pakistani passports; the process is manageable and worth it, with meals running 30 to 40 GEL in tourist areas and less a street away. Narikala Fortress holds the best view, and Kazbegi makes a fine day trip.",
      },
      {
        type: "h2",
        text: "Dubai, If It Is Your Very First",
      },
      {
        type: "p",
        text: "There is no shame in wanting English signage and food you recognise on trip number one. Everyone speaks English, the infrastructure simply works, and flights from Karachi take under three hours. Burj Khalifa at sunset, a desert safari, and the gold and spice souks of old Dubai cover the essentials. Dubai builds confidence; the braver trips come later.",
      },
      {
        type: "quote",
        text: "Your first stamp should open a door, not test you.",
      },
    ],
  },
  {
    slug: "group-tours-vs-solo-booking",
    title: "Group Tours vs Solo Booking: The Honest Math",
    category: "Travel",
    metaDescription:
      "Group tours vs solo booking: where bulk buying wins, where DIY wins, and the hidden costs both sides forget to count. Compare with HTG Travel.",
    keywords: [
      "group tours vs solo",
      "cheaper group or solo travel",
      "solo travel costs",
      "group tour savings",
      "DIY travel booking",
    ],
    promo: {
      headline: "We Price Both, Honestly",
      body: "We run group departures where sharing genuinely saves money, and we build solo itineraries where it does not, and we will tell you which one your trip is. Send us your destination and dates; you get both numbers and an honest recommendation, not the option that pays us more.",
      cta: "Compare both prices",
      waText: "Assalam o Alaikum! I cannot decide between a group tour and booking solo. Please price both options for my next trip.",
    },
    content: [
      {
        type: "p",
        text: "Ask five travellers whether group tours or solo booking saves more and you will get five confident answers, all different, because most people count only what hits the wallet. Here is the fuller arithmetic.",
      },
      {
        type: "h2",
        text: "The Uncomfortable Answer First",
      },
      {
        type: "p",
        text: "Sometimes the group wins, sometimes DIY wins, and the sticker price never tells you which. The destination, your travel style, and the mistakes you are likely to make decide it. I have lost money both ways.",
      },
      {
        type: "h2",
        text: "Where Groups Genuinely Win",
      },
      {
        type: "p",
        text: "Operators buy in bulk: thirty hotel rooms, bus seats, and guide fees cost fractions per person of what solo buyers see. A private guide in Skardu or a Kenya safari costs the same whether one person shows up or twelve, and in a group that price splits. Transfers, 4x4s for mountain roads, and group-rate entrances follow the same rule, which is why remote and high-cost trips, safaris, northern treks, Hajj and Umrah logistics, almost always favour organised groups.",
      },
      {
        type: "h2",
        text: "What Solo Booking Really Costs",
      },
      {
        type: "ul",
        items: [
          "Your time: twenty-plus hours of research is real, billable work",
          "Mistake costs: one wrong hotel, one missed shuttle, one overpriced meal a day",
          "Singles taxes: nobody splits your room, taxi, or portions",
          "Emergency prices: when plans collapse at 9pm, you pay whatever is asked",
        ],
      },
      {
        type: "h2",
        text: "Where Solo Wins Clearly",
      },
      {
        type: "p",
        text: "In budget-friendly regions, Southeast Asia, Georgia, Sri Lanka, most of Turkey, guesthouses and street food are so cheap that a group markup feels pointless. You control the pace: no dawn wake-ups for museums you never chose, no paying for included excursions you would have skipped. Couples and families already split costs, which shrinks the group advantage fast.",
      },
      {
        type: "h2",
        text: "The Hunza Test",
      },
      {
        type: "p",
        text: "Picture a five-day Hunza trip. The group quote covers hotels, transport, a guide, and breakfasts. The solo quote shows a cheaper hotel and a bus fare, then you add the private jeep for what buses cannot reach, the wasted hours, the overpriced meals, and the gap narrows or flips. Price the whole trip, never the sticker items.",
      },
      {
        type: "quote",
        text: "Cheap is not the lowest sticker. It is the best trip per rupee.",
      },
    ],
  },
];
