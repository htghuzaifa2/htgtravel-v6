import type { BlogPostSeed } from "../blog-data";

/**
 * Story batch: six feature-style guides (visa-to-Tawaf sequence, the
 * Pakistan moment, the food trail, budget Maldives honeymoon, Muslim
 * travel abroad, and northern hospitality). Each was rewritten for
 * accuracy, human voice, and tight length; promos and Palestine
 * messages stay unique per post.
 */
export const stories: BlogPostSeed[] = [
  {
    slug: "umrah-visa-to-tawaf-sequence-pakistan",
    title: "From Umrah Visa to Tawaf: The Sequence for Pakistanis",
    category: "Umrah",
    metaDescription:
      "The Umrah sequence for Pakistanis: Nusuk visa documents and timing, Ihram at the Miqat, Tawaf and Sa'i, and what the package costs.",
    keywords: [
      "Umrah visa Pakistan",
      "Nusuk visa",
      "Umrah process from Pakistan",
      "Umrah package cost",
      "Miqat and Ihram",
    ],
    promo: {
      headline: "Nusuk to the Mataf, Handled by One Desk",
      body: "We file the Nusuk visa, match the hotel to your budget, and walk your family through the sequence before you fly. Pakistan-side paperwork and Saudi-side timing, handled together. Ask about upcoming departures.",
      cta: "File my Umrah visa",
      waText: "Assalam o Alaikum! Please help me plan Umrah from Pakistan: visa, hotels, and the full sequence.",
    },
    content: [
      {
        type: "p",
        text: "The ritual side of Umrah fits on one page. The logistics are what keep first-timers awake: which visa, which documents, when Ihram starts, what it costs from Pakistan. Here is the whole sequence, in the order you will live it.",
      },
      {
        type: "h2",
        text: "The Visa, Through Nusuk",
      },
      {
        type: "p",
        text: "Your passport needs six months of validity. Saudi Arabia now issues most Umrah visas electronically through Nusuk, the official platform that handles the visa and the bookings together. With complete documents, approval usually lands in one to three working days; peak season stretches that, so file early.",
      },
      {
        type: "ul",
        items: [
          "Passport with six months' validity, plus a copy of the details page",
          "Recent photo on a white background",
          "Meningitis vaccination certificate",
          "Confirmed return ticket and hotel bookings for both cities",
          "Marriage certificate if travelling with your spouse",
        ],
      },
      {
        type: "h2",
        text: "Ihram at the Miqat",
      },
      {
        type: "p",
        text: "Ihram is a state, not just an outfit. Men wear two unstitched white cloths; women wear modest clothing covering everything except hands and face. Before the Miqat boundary, pray two rak'ahs and make your niyyah. Inside Ihram the rules are a reset: no cutting hair or nails, no perfume, no arguing. Ordinary life stays at the border.",
      },
      {
        type: "h2",
        text: "Tawaf, Then Sa'i",
      },
      {
        type: "p",
        text: "Tawaf begins at the Black Stone (a gesture from a distance counts, with Allahu Akbar) and runs seven counterclockwise circuits with the Kaaba on your left, duas from the heart, then two rak'ahs at Maqam Ibrahim. Sa'i follows: seven laps between Safa and Marwah, about 450 metres each way, retracing Hajar's search for water. It is remembrance, not a race; hydrate.",
      },
      {
        type: "h2",
        text: "Halq, and You Are Out of Ihram",
      },
      {
        type: "p",
        text: "Halq (shaving the head) or Taqsir (trimming; women cut a fingertip's length) completes the Umrah and closes Ihram. Visa filed to final trim, the whole journey fits ten days to two weeks door to door.",
      },
      {
        type: "h2",
        text: "What It Costs From Pakistan",
      },
      {
        type: "p",
        text: "Packages run roughly PKR 250,000 to 600,000 depending on hotel distance and trip length. Book early, stay walking distance from the Haram if the budget allows, and bring proper walking shoes; you will walk more than you expect.",
      },
      {
        type: "quote",
        text: "The paperwork takes a week. The rituals take a day. The meaning stays.",
      },
    ],
  },
  {
    slug: "pakistan-tourism-best-kept-secret",
    title: "Pakistan Is Travel's Best-Kept Secret (For Now)",
    category: "Travel",
    metaDescription:
      "Why Pakistan is the destination of the moment: Hunza, Deosai, the Kalash Valley, and Lahore, with online visas and the crowds still years away.",
    keywords: [
      "visit Pakistan",
      "Pakistan tourism",
      "Kalash Valley",
      "Attabad Lake",
      "Pakistan tourist visa",
    ],
    promo: {
      headline: "See It Before Everyone Else Does",
      body: "We run the north the way locals do: vetted hotels in Hunza and Skardu, drivers who know the passes, and itineraries that fold Lahore in without wasting a day. Tell us your dates; the valley logistics are ours to solve.",
      cta: "Plan my Pakistan trip",
      waText: "Assalam o Alaikum! I want to visit Pakistan's north. Please suggest a route and dates.",
    },
    content: [
      {
        type: "p",
        text: "Every traveller has one place they rave about before the guidebooks arrive. This decade, that place is Pakistan. The roads into the valleys have improved, the visa system has moved online, and the crowds — the thing every other destination lost years ago — have not arrived yet. It feels the way travellers describe Nepal in the 1980s.",
      },
      {
        type: "h2",
        text: "The North Comes First",
      },
      {
        type: "p",
        text: "Hunza Valley alone justifies the flight: 700-year-old Baltit Fort above apricot orchards, the turquoise Attabad Lake formed by the 2010 landslide, and the dawn view of Rakaposhi from Duikar that makes people postpone their return flights. Skardu answers with Lower Kachura Lake and Deosai, the world's second-highest alpine plain, carpeted in wildflowers through July and August.",
      },
      {
        type: "p",
        text: "For the far end of the scale: the Kalash Valley in Chitral, an ancient community with its own language and festivals (Uchal falls in August), and Fairy Meadows, a grassy shelf that faces Nanga Parbat, the world's ninth-highest mountain, at eye level.",
      },
      {
        type: "h2",
        text: "Don't Skip Lahore",
      },
      {
        type: "p",
        text: "The north gets the photographs; Lahore deserves two full days. The Badshahi Mosque, red sandstone and white marble from 1673; the lanes of the Walled City; food streets that run late; and the Sheesh Mahal's mirror work inside Lahore Fort. South Asia rarely gets more concentrated.",
      },
      {
        type: "h2",
        text: "The Safety Question, Honestly",
      },
      {
        type: "p",
        text: "Hunza, Skardu, Swat, and Gilgit are the established tourist corridors: well-policed and heavily travelled by domestic tourists. Stick to the known routes, use registered guides, and check your government's current advisory before booking. For overseas Pakistanis these roads are familiar territory.",
      },
      {
        type: "h2",
        text: "Visa and Timing",
      },
      {
        type: "p",
        text: "The Pakistan Online Visa System (visa.nadra.gov.pk) handles tourist visas end to end: passport, photo, and hotel details. GCC citizens arrive visa-free; everyone else applies through the portal, so leave processing time before your flight. May to October is the season for the north; dodge the August monsoon, aim at July for Deosai's flowers, October for Hunza's autumn.",
      },
      {
        type: "quote",
        text: "The valleys are ready. The crowds are still asleep. That window is the whole point.",
      },
    ],
  },
  {
    slug: "pakistan-food-trail-lahore-karachi-peshawar",
    title: "A Food Lover's Trail: Lahore, Karachi, Peshawar",
    category: "Travel",
    metaDescription:
      "The Pakistani food trail: halwa puri and nihari in Lahore, Burns Road biryani in Karachi, chapli kebab in Peshawar, in eating order.",
    keywords: [
      "Pakistan food tour",
      "Lahore street food",
      "Karachi biryani",
      "Peshawar chapli kebab",
      "Pakistani food trail",
    ],
    promo: {
      headline: "The Trail, Without the Guesswork",
      body: "Food tours are our favourite brief. We route you to the nihari shop that opens at dawn, the karahi counter Peshawar actually queues for, and hotels minutes from each food street. No wasted meals, no tourist traps.",
      cta: "Plan my food tour",
      waText: "Assalam o Alaikum! I want to do the Lahore, Karachi, and Peshawar food trail. Please plan it with me.",
    },
    content: [
      {
        type: "p",
        text: "Three cities, three food personalities, one itinerary. Lahore eats like it means it, Karachi runs on biryani and argument, and Peshawar strips cooking down to meat, fire, and salt. This is the trail, in order, with the names that matter.",
      },
      {
        type: "h2",
        text: "Lahore: The City That Eats",
      },
      {
        type: "p",
        text: "Start at dawn with halwa puri: crisp puris, semolina halwa, spiced chickpeas, and a sweet lassi. By midday, hunt nihari, beef shank slow-cooked overnight until the gravy turns silky; Muhammadi Nihari in Mozang has perfected it for generations. Evenings belong to Lakshmi Chowk: katakat chopped sizzling on iron plates, and Butt Karahi's mutton in nothing but tomatoes and green chilies.",
      },
      {
        type: "h2",
        text: "Karachi: The Biryani Capital",
      },
      {
        type: "p",
        text: "Karachi biryani fights back: fiery, tangy, potato-loaded, occasionally with prunes. Student Biryani near Civil Lines has drawn daily queues since the 1960s. Then walk Burns Road, the city's oldest food street: seekh kebabs at Waheed, haleem, dhaga kabab, fried fish, the Delhi and Hyderabad migrant kitchen at full volume. Javed Nihari deserves its own line in your notes; order with naan, lemon, ginger, and green chilies.",
      },
      {
        type: "h2",
        text: "Peshawar: Meat, Fire, Simplicity",
      },
      {
        type: "p",
        text: "At Namak Mandi the karahis are black, the flames are open, and you watch your food cook. The chapli kebab, flat and oversized, packed with tomato, coriander, and pomegranate seeds, fried in bone-marrow fat, is a meal in itself. Namkeen tikka, marinated in nothing but salt and fat, lets the meat speak. Kabuli pulao carries the Afghan influence.",
      },
      {
        type: "h2",
        text: "How to Run the Trail",
      },
      {
        type: "ul",
        items: [
          "Eat where the tables are full; turnover means freshness",
          "Three cities is not a sprint; pace the meals",
          "Ask for less spicy where you must; Karachi biryani rarely compromises",
          "Arrive hungry at breakfast; nashta is an event, not coffee and toast",
        ],
      },
      {
        type: "quote",
        text: "In Pakistan, the menu is the map.",
      },
    ],
  },
  {
    slug: "maldives-honeymoon-budget-pakistan",
    title: "Maldives Honeymoon on a Budget: The Local-Island Way",
    category: "Travel",
    metaDescription:
      "A Maldives honeymoon under PKR 450,000 for two: visa on arrival, local-island guesthouses from $45 a night, and the honest budget math.",
    keywords: [
      "Maldives on a budget",
      "Maafushi guesthouse",
      "Maldives local islands",
      "honeymoon budget Pakistan",
      "Maldives cost for couples",
    ],
    promo: {
      headline: "Paradise, Priced for Two",
      body: "We build Maldives honeymoons from this exact budget: guesthouses chosen for value each season, transfers pre-booked, flights timed midweek, and a surprise dinner on the sand if you don't tell us not to. Tell us your dates and your ceiling.",
      cta: "Price our honeymoon",
      waText: "Assalam o Alaikum! We are planning a Maldives honeymoon on a budget. Please share what PKR 450,000 gets two of us.",
    },
    content: [
      {
        type: "p",
        text: "The Maldives can cost a fortune. It can also cost less than your wedding photographer. The difference is knowing where Pakistani couples hold small advantages, and where most of them quietly overspend. This is the honest version.",
      },
      {
        type: "h2",
        text: "The Visa Is the Easy Part",
      },
      {
        type: "p",
        text: "Pakistani passports get a free, 30-day visa on arrival: no embassy, no fee, no pre-approval. Bring the short list, and submit the IMUGA online declaration before you board.",
      },
      {
        type: "ul",
        items: [
          "Passport with six months' validity",
          "Confirmed return ticket",
          "Hotel booking confirmation",
          "IMUGA traveller declaration, filed pre-departure",
        ],
      },
      {
        type: "h2",
        text: "Where Couples Overspend",
      },
      {
        type: "p",
        text: "The one expensive mistake is usually the first booking: a $600–700 overwater bungalow, then instant noodles for four days. Since guesthouses opened on the inhabited islands in 2009, the same water and the same sunsets rent for $45–80 a night for two, breakfast included, on Maafushi, Dhigurah, or Rasdhoo. Save the villa for the anniversary.",
      },
      {
        type: "h2",
        text: "The Numbers, Per Couple",
      },
      {
        type: "ul",
        items: [
          "Flights for two, round trip: PKR 310,000–330,000 through Dubai, Colombo, or Doha; booking 2–3 months out and flying midweek trims $50–100 a ticket",
          "Guesthouse, four nights with breakfast: PKR 50,000–65,000",
          "Speedboat transfers: PKR 8,000–10,000; the public ferry costs $2–3 but skips Fridays",
          "Meals, snorkeling, excursions: PKR 40,000–50,000",
          "Total: roughly PKR 410,000–455,000, against 700,000-plus for a basic resort package",
        ],
      },
      {
        type: "h2",
        text: "Three Quiet Budget Drains",
      },
      {
        type: "ul",
        items: [
          "All-inclusive meal plans that cost more than local-island cafés",
          "Wrong season: November–April is the dry postcard; May–October brings monsoon",
          "Speedboats booked at the dock in peak weeks, at double the pre-booked price",
        ],
      },
      {
        type: "quote",
        text: "The water is the same turquoise. The bill does not have to match it.",
      },
    ],
  },
  {
    slug: "muslim-travel-non-muslim-countries",
    title: "Faith on the Road: Muslim Travel in Non-Muslim Lands",
    category: "Travel",
    metaDescription:
      "Muslim travel in non-Muslim countries: prayer times and Qibla apps, halal food strategies, and finding community from Tokyo to Toronto.",
    keywords: [
      "Muslim travel tips",
      "halal food abroad",
      "prayer times app",
      "Qibla direction",
      "airport prayer rooms",
    ],
    promo: {
      headline: "Travel That Keeps Pace With Your Prayers",
      body: "Half our clients plan around prayer windows without saying so: flight timings that land before Maghrib, hotels near a mosque, meal plans that need no negotiating. Tell us the city; we build around the salah, not the other way round.",
      cta: "Plan around my salah",
      waText: "Assalam o Alaikum! I am planning a trip to a non-Muslim country. Please help me plan around prayers and halal food.",
    },
    content: [
      {
        type: "p",
        text: "You land in Tokyo, Berlin, or Toronto, and the excitement carries a quiet question: where will I pray, what will I eat, who will understand? Muslim travel through non-Muslim countries is easier right now than it has ever been. It takes a phone, some preparation, and the habits below.",
      },
      {
        type: "h2",
        text: "Prayer Space, Almost Anywhere",
      },
      {
        type: "p",
        text: "Prayer-time and Qibla apps have replaced the pocket compass, and the GPS-based ones are the accurate choice; the direction to Makkah shifts harder than intuition expects across Japan and Europe. Airports increasingly keep multi-faith rooms (Haneda and Narita both have them; Charles de Gaulle keeps chaplains, including an imam). A hotel room plus a foldable mat weighs almost nothing.",
      },
      {
        type: "h2",
        text: "Eating Without Compromise",
      },
      {
        type: "ul",
        items: [
          "Halal-finder apps crowdsource restaurants with reviews; Zabihah covers most of the world",
          "Turkish, Middle Eastern, and Pakistani restaurants are often halal by default",
          "At ordinary restaurants, lean vegetarian or seafood, and confirm no alcohol or pork in the sauces",
          "Learn the certification logos: HMC (UK), JAKIM (Malaysia), MUI (Indonesia)",
        ],
      },
      {
        type: "h2",
        text: "Finding the Community",
      },
      {
        type: "p",
        text: "Mosques exist in most major cities, and Friday is the open door: arrive for Jum'ah and you are introduced. Before you fly, search for the city's Muslim community groups online; they answer questions in real time. Near a university, look for the MSA; campus Muslim associations run events, iftars, and Eid prayers, and they welcome visitors.",
      },
      {
        type: "h2",
        text: "Small Habits That Carry",
      },
      {
        type: "ul",
        items: [
          "Download the apps before you fly; arrival Wi-Fi is never guaranteed",
          "Pack a compact prayer mat and travel wudhu supplies",
          "Learn 'Is this halal?' in the local language; Translate handles it instantly",
          "Ask the hotel concierge for the nearest mosque or musalla; they usually know",
        ],
      },
      {
        type: "quote",
        text: "The qibla points one way from everywhere. So does the intention.",
      },
    ],
  },
  {
    slug: "northern-pakistan-hospitality-chai",
    title: "The Chai That Started Everything: Hospitality in the North",
    category: "Travel",
    metaDescription:
      "Northern Pakistan hospitality, learned at a grandmother's table in Swat: the chai rules, mehman nawazi, and how to receive a welcome.",
    keywords: [
      "northern Pakistan hospitality",
      "mehman nawazi",
      "Swat Valley culture",
      "Hunza food",
      "chapshoro",
    ],
    promo: {
      headline: "Be a Guest, Not a Tourist",
      body: "We place travellers in homestays and community-run guesthouses across Swat, Hunza, and Chitral, with guides who grew up on these codes. You will be fed like family; we make sure the room, the route, and the return flight are as sorted as the welcome.",
      cta: "Take me north",
      waText: "Assalam o Alaikum! I want to experience northern Pakistan hospitality: homestays in Swat or Hunza. Please plan it.",
    },
    content: [
      {
        type: "p",
        text: "No guidebook fully prepares you for the north of Pakistan, because the thing that stays with you is not the scenery; it is the hospitality. I learned that long before I travelled anywhere, as a grandchild watching my grandmother in Swat welcome strangers like family.",
      },
      {
        type: "h2",
        text: "Never Let a Guest Leave Hungry",
      },
      {
        type: "p",
        text: "Her saying was simple: a guest is a blessing from God. In practice, a lost traveller who knocked at her gate found chai brewing, chapshoro warming on the tawa, and Hunza dried apricots in a brass bowl within minutes. He tried to pay. She refused. He insisted. She laughed. That is mehman nawazi, the northern code where the host's duty is comfort, no exceptions.",
      },
      {
        type: "h2",
        text: "The Three Chai Rules",
      },
      {
        type: "ul",
        items: [
          "Accept tea when it is offered, even a few sips; a refilled cup is care, not pushiness",
          "Drink it slowly; three unhurried sips is the tradition",
          "Never rush the conversation; chai comes before business, directions, anything",
        ],
      },
      {
        type: "h2",
        text: "Food That Carries Meaning",
      },
      {
        type: "p",
        text: "Hunza's apricot soup, Bataring Daudo, has fed households for centuries, and chapshoro appears whenever guests do. The order at the table is the quiet choreography most travellers never notice: guest first, elders before the young, visitor before family. Once you see it, you see it everywhere in the north.",
      },
      {
        type: "h2",
        text: "How to Receive Gracefully",
      },
      {
        type: "ul",
        items: [
          "Greet elders first, Assalam-o-Alaikum, with a slight nod",
          "Wash your hands before eating; it honours the cook",
          "Do not reach for money immediately; let the host or your guide read the moment",
          "Bring a small gift if invited home: dried fruit, sweets, something from your own city",
        ],
      },
      {
        type: "p",
        text: "My grandmother passed away years ago, but her lessons travel with me. This hospitality is older than tourism; it comes from mountain life, where survival depended on mutual care. When a stranger feeds you in Hunza or pours chai in Chitral, they honour something inherited, not performed.",
      },
      {
        type: "quote",
        text: "When someone offers, take it with both hands.",
      },
    ],
  },
];
