const destinations = [

  // ── Lake & Outdoor ─────────────────────────────────────────────────────────

  {
    id: 1,
    category: "outdoor",
    name: "Lake Geneva",
    region: "Southeast Wisconsin",
    tags: ["boat", "family", "hiking"],
    description: "Wisconsin's most glamorous lake town. Rent a pontoon, walk the 26-mile shore path, or cruise on the historic mail boat.",
    difficulty: "Easy",
    bestFor: "Couples, families, first-timers",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Lake+Geneva+Wisconsin",
    rating: 4.9
  },
  {
    id: 2,
    category: "outdoor",
    name: "Devil's Lake State Park",
    region: "Baraboo / South-Central WI",
    tags: ["hiking", "family", "fishing"],
    description: "Wisconsin's most visited state park — dramatic quartzite bluffs, a crystal-clear lake, and some of the best hikes in the Midwest.",
    difficulty: "Moderate",
    bestFor: "Hikers, geology lovers, families with older kids",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Devil%27s+Lake+State+Park+Wisconsin",
    rating: 4.8
  },
  {
    id: 3,
    category: "outdoor",
    name: "Lake Winnebago",
    region: "Fox Valley / East WI",
    tags: ["boat", "fishing"],
    description: "The largest inland lake in Wisconsin — a boater's and angler's paradise stretching 30 miles long. Famous for sturgeon and walleye fishing.",
    difficulty: "Easy",
    bestFor: "Anglers, boaters, groups",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Lake+Winnebago+Wisconsin",
    rating: 4.6
  },
  {
    id: 4,
    category: "outdoor",
    name: "Minocqua & Northwoods Lakes",
    region: "Northern Wisconsin",
    tags: ["boat", "family", "fishing", "hiking"],
    description: "The heart of Wisconsin's Northwoods — hundreds of interconnected lakes, loon calls at dusk, and a charming island town.",
    difficulty: "Easy to Moderate",
    bestFor: "Families, fishing groups, cabin trips",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Minocqua+Wisconsin",
    rating: 4.8
  },
  {
    id: 5,
    category: "outdoor",
    name: "Apostle Islands & Lake Superior",
    region: "Far Northern WI (Bayfield)",
    tags: ["boat", "hiking", "fishing"],
    description: "21 wild islands on Lake Superior — sea caves, red sandstone cliffs, old-growth forest, and one of the most dramatic boat trips in the Midwest.",
    difficulty: "Moderate to Hard",
    bestFor: "Adventurers, kayakers, nature lovers",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Apostle+Islands+Wisconsin",
    rating: 4.9
  },
  {
    id: 6,
    category: "outdoor",
    name: "Wisconsin Dells Boat Tours",
    region: "South-Central WI",
    tags: ["family", "boat"],
    description: "The original Dells — stunning sandstone gorges carved by the Wisconsin River, best explored on a classic Upper or Lower Dells boat tour.",
    difficulty: "Easy",
    bestFor: "Families, first Wisconsin trip, scenic lovers",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Wisconsin+Dells+Boat+Tours",
    rating: 4.7
  },
  {
    id: 7,
    category: "outdoor",
    name: "Green Lake",
    region: "Central WI (Green Lake County)",
    tags: ["boat", "fishing", "family"],
    description: "Wisconsin's deepest inland lake at 237 feet — crystal-clear water, excellent walleye and trout fishing, and a peaceful small-town vibe.",
    difficulty: "Easy",
    bestFor: "Anglers, couples, relaxed family trips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Green+Lake+Wisconsin",
    rating: 4.7
  },
  {
    id: 8,
    category: "outdoor",
    name: "Kettle Moraine State Forest",
    region: "Southeast WI (Waukesha / Washington)",
    tags: ["hiking", "family", "fishing"],
    description: "Glacially sculpted terrain with 120+ miles of trails, quiet kettle lakes for fishing, and stunning summer wildflowers.",
    difficulty: "Easy to Moderate",
    bestFor: "Hikers, nature families, day-trippers from Milwaukee",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Kettle+Moraine+State+Forest+Wisconsin",
    rating: 4.6
  },

  // ── Kids & Pools ───────────────────────────────────────────────────────────

  {
    id: 9,
    category: "kids",
    name: "Noah's Ark Waterpark",
    region: "Wisconsin Dells",
    tags: ["kids", "pool", "family"],
    description: "America's largest waterpark — 70+ acres of water rides, wave pools, and lazy rivers. A full-day adventure for kids of all ages.",
    difficulty: "Easy",
    bestFor: "Families with kids, big groups",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Noah%27s+Ark+Waterpark+Wisconsin+Dells",
    rating: 4.7
  },
  {
    id: 10,
    category: "kids",
    name: "Kalahari Resort & Waterpark",
    region: "Wisconsin Dells",
    tags: ["kids", "pool", "family"],
    description: "America's largest indoor waterpark resort — African safari theme, massive indoor and outdoor water areas. Works rain or shine.",
    difficulty: "Easy",
    bestFor: "Families, younger kids, rainy day option",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Kalahari+Resort+Wisconsin+Dells",
    rating: 4.6
  },
  {
    id: 11,
    category: "kids",
    name: "Mt. Olympus Water & Theme Park",
    region: "Wisconsin Dells",
    tags: ["kids", "pool", "family"],
    description: "Greek mythology-themed park with waterslides AND roller coasters — one wristband covers everything. Great for older kids and teens who want real thrills.",
    difficulty: "Easy to Moderate",
    bestFor: "Older kids, teens, thrill seekers",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Mt+Olympus+Water+Theme+Park+Wisconsin+Dells",
    rating: 4.5
  },
  {
    id: 12,
    category: "kids",
    name: "Wilderness Resort",
    region: "Wisconsin Dells",
    tags: ["kids", "pool", "family"],
    description: "Wisconsin's largest waterpark resort — four indoor and four outdoor waterparks all in one property. You could spend three days here without repeating a slide.",
    difficulty: "Easy",
    bestFor: "Multi-day family stays, all ages",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Wilderness+Resort+Wisconsin+Dells",
    rating: 4.6
  },

  // ── Dancing ────────────────────────────────────────────────────────────────

  {
    id: 13,
    category: "dancing",
    name: "Milwaukee Salsa & Bachata Nights",
    region: "South Side Milwaukee",
    tags: ["latin", "partners"],
    description: "Milwaukee's South Side — home to the largest Latin community in Wisconsin — hosts weekly salsa and bachata socials. Venues like Cielito Lindo and Club 400 run Friday and Saturday nights with live DJs and sometimes bands.",
    difficulty: "Easy",
    bestFor: "Couples, Latin dance fans, cultural nights out",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Cielito+Lindo+Milwaukee",
    rating: 4.7
  },
  {
    id: 14,
    category: "dancing",
    name: "Cumbia & Norteño — Mitchell Street",
    region: "South Side Milwaukee",
    tags: ["latin", "friends"],
    description: "Historic Mitchell Street is the heart of Milwaukee's Mexican and Central American community. On weekend nights, cumbia, norteño, and regional Mexican music fill the bars and dance halls — a real cultural experience.",
    difficulty: "Easy",
    bestFor: "Friend groups, Latin music lovers, cultural exploration",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Mitchell+Street+Milwaukee+Wisconsin",
    rating: 4.6
  },
  {
    id: 15,
    category: "dancing",
    name: "Madison Swing & Lindy Hop",
    region: "Madison",
    tags: ["swing", "partners"],
    description: "Madison has one of the best swing dance communities in the Midwest. Weekly socials at Memorial Union Terrace and Orpheum Theatre feature live jazz bands and free beginner lessons before the dance.",
    difficulty: "Easy",
    bestFor: "Couples, beginners welcome, jazz lovers",
    image: "https://images.unsplash.com/photo-1415886655224-39f11afa6594?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Memorial+Union+Terrace+Madison+Wisconsin",
    rating: 4.5
  },
  {
    id: 16,
    category: "dancing",
    name: "Country Line Dancing — Wisconsin Bars",
    region: "Statewide (Milwaukee / Green Bay)",
    tags: ["country", "friends"],
    description: "Wisconsin's country bar scene is alive and well. Silverado (Milwaukee) and Kountry Bar (Green Bay) run Thursday line-dance lessons and weekend two-step nights with live country bands.",
    difficulty: "Easy",
    bestFor: "Country music fans, friend groups, beginners",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Silverado+Milwaukee+Wisconsin",
    rating: 4.3
  },
  {
    id: 17,
    category: "dancing",
    name: "Polka & Oktoberfest Dancing",
    region: "New Glarus / Statewide",
    tags: ["cultural", "friends"],
    description: "Wisconsin's German and Swiss roots show every summer. New Glarus (Wisconsin's 'Little Switzerland') and Milwaukee's German Fest feature live polka bands and traditional folk dancing open to everyone.",
    difficulty: "Easy",
    bestFor: "Cultural experiences, friend groups, families",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    mapLink: "https://maps.google.com/?q=New+Glarus+Wisconsin",
    rating: 4.4
  },

  // ── Friends Trip ───────────────────────────────────────────────────────────

  {
    id: 18,
    category: "friends",
    name: "Summerfest Milwaukee",
    region: "Milwaukee (Downtown Lakefront)",
    tags: ["music", "friends"],
    description: "The world's largest outdoor music festival — 11 days on Lake Michigan's shore, 12 stages, 1,000+ acts. Hip-hop, rock, country, Latin, EDM — every night turns into a massive outdoor dance floor. Runs late June through early July.",
    difficulty: "Easy",
    bestFor: "Everyone — best with a group of friends",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Summerfest+Milwaukee",
    rating: 4.8
  },
  {
    id: 19,
    category: "friends",
    name: "Door County Peninsula",
    region: "Northeast Wisconsin",
    tags: ["friends", "family"],
    description: "Wisconsin's version of Cape Cod — 300 miles of shoreline, cherry orchards, 11 lighthouses, and charming villages. Perfect for a 2–3 day trip with a group or a couple.",
    difficulty: "Easy",
    bestFor: "Friend groups, couples, weekend trips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Door+County+Wisconsin",
    rating: 4.8
  },
  {
    id: 20,
    category: "friends",
    name: "Madison State Street & Rooftop Bars",
    region: "Madison (Downtown)",
    tags: ["nightlife", "friends"],
    description: "Madison's State Street runs from the Capitol to the UW campus — packed with rooftop bars, live music venues, and restaurants. The rooftops at The Statesman and Merchant have some of the best summer vibes in the state.",
    difficulty: "Easy",
    bestFor: "Friend groups, nightlife lovers, college-town energy",
    image: "https://images.unsplash.com/photo-1519677100779-39f5ea36b6a2?w=600&q=80",
    mapLink: "https://maps.google.com/?q=State+Street+Madison+Wisconsin",
    rating: 4.6
  },
  {
    id: 21,
    category: "friends",
    name: "Milwaukee Third Ward & RiverWalk",
    region: "Milwaukee (Downtown)",
    tags: ["nightlife", "friends"],
    description: "Milwaukee's Historic Third Ward is its trendiest neighborhood — art galleries, rooftop bars, waterfront restaurants, and the RiverWalk connecting it all. Great for a day-into-night group itinerary.",
    difficulty: "Easy",
    bestFor: "Friend groups, foodies, urban explorers",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Historic+Third+Ward+Milwaukee+Wisconsin",
    rating: 4.5
  }
];
