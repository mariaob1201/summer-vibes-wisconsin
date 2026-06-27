const destinations = [
  {
    id: 1,
    name: "Lake Geneva",
    region: "Southeast Wisconsin",
    tags: ["boat", "family", "hiking"],
    description: "Wisconsin's most glamorous lake town. Rent a pontoon, walk the 26-mile shore path around the lake, or cruise on the historic mail boat.",
    highlights: [
      "Pontoon & speedboat rentals at Gordy's Boat House",
      "26-mile Geneva Lake Shore Path — flat & family-friendly",
      "Riviera Beach — sandy, lifeguarded, perfect for kids",
      "Big Foot Beach State Park for picnics and swimming"
    ],
    difficulty: "Easy",
    bestFor: "Couples, families, first-timers",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Lake+Geneva+Wisconsin",
    rating: 4.9
  },
  {
    id: 2,
    name: "Devil's Lake State Park",
    region: "Baraboo / South-Central WI",
    tags: ["hiking", "family", "fishing"],
    description: "Wisconsin's most visited state park — dramatic quartzite bluffs, a crystal-clear lake, and some of the best hikes in the Midwest.",
    highlights: [
      "East Bluff Trail — 1.5 miles, stunning lake views from above",
      "Balanced Rock Trail — iconic geology hike, 1.2 miles",
      "Quartzite Beach — swimming area, no boats allowed",
      "Pike's Peak Trail — great for families with older kids"
    ],
    difficulty: "Moderate",
    bestFor: "Hikers, geology lovers, families with older kids",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Devil%27s+Lake+State+Park+Wisconsin",
    rating: 4.8
  },
  {
    id: 3,
    name: "Lake Winnebago",
    region: "Fox Valley / East WI",
    tags: ["boat", "fishing"],
    description: "The largest inland lake in Wisconsin — a boater's and angler's paradise stretching 30 miles long. Famous for sturgeon and walleye fishing.",
    highlights: [
      "Largest inland lake in WI — 137,000 acres",
      "Top fishing: walleye, perch, white bass, lake sturgeon",
      "Oshkosh Marina — full-service boat launches & rentals",
      "Fond du Lac Lakeside Park — great picnic & launch spot"
    ],
    difficulty: "Easy",
    bestFor: "Anglers, boaters, groups",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Lake+Winnebago+Wisconsin",
    rating: 4.6
  },
  {
    id: 4,
    name: "Minocqua & Northwoods Lakes",
    region: "Northern Wisconsin",
    tags: ["boat", "family", "fishing", "hiking"],
    description: "The heart of Wisconsin's Northwoods — hundreds of interconnected lakes, loon calls at dusk, and a charming island town with everything you need.",
    highlights: [
      "Chain of lakes — boat from lake to lake all day",
      "Minocqua Pontoon & Boat Rentals — easy to reserve",
      "Torpy Park Beach — free, lifeguarded, family perfect",
      "Bearskin State Trail — 18-mile paved trail for bikes & walkers"
    ],
    difficulty: "Easy to Moderate",
    bestFor: "Families, fishing groups, cabin trips",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Minocqua+Wisconsin",
    rating: 4.8
  },
  {
    id: 5,
    name: "Apostle Islands & Lake Superior",
    region: "Far Northern WI (Bayfield)",
    tags: ["boat", "hiking", "fishing"],
    description: "21 wild islands on Lake Superior — sea caves, red sandstone cliffs, old-growth forest, and one of the most dramatic boat trips in the Midwest.",
    highlights: [
      "Sea cave kayak tours — guided or self-guided",
      "Ferry to Madeline Island — great day trip by family",
      "Meyers Beach sea caves — accessible by kayak or boat",
      "Stockton Island — backcountry camping & stunning beaches"
    ],
    difficulty: "Moderate to Hard",
    bestFor: "Adventurers, kayakers, nature lovers",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Apostle+Islands+Wisconsin",
    rating: 4.9
  },
  {
    id: 6,
    name: "Wisconsin Dells & Lake Delton",
    region: "South-Central WI",
    tags: ["family", "boat"],
    description: "The 'Waterpark Capital of the World' — but the original Dells are stunning sandstone gorges best seen by boat tour. Perfect for families with kids of all ages.",
    highlights: [
      "Original Wisconsin Dells boat tours — a must-do classic",
      "Lake Delton pontoon & kayak rentals",
      "Big Cedar Lake nearby for calmer boating",
      "Dozens of waterparks for kids (Noah's Ark, Kalahari)"
    ],
    difficulty: "Easy",
    bestFor: "Families with young kids, first Wisconsin trip",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Wisconsin+Dells",
    rating: 4.7
  },
  {
    id: 7,
    name: "Green Lake",
    region: "Central WI (Green Lake County)",
    tags: ["boat", "fishing", "family"],
    description: "Wisconsin's deepest inland lake at 237 feet — crystal-clear water, excellent walleye and trout fishing, and a peaceful small-town vibe.",
    highlights: [
      "Deepest inland lake in WI — 237 feet",
      "Heidel House Marina — pontoon & boat rentals",
      "Trophy trout, walleye, and smallmouth bass fishing",
      "Green Lake City Park Beach — sandy, calm, family-friendly"
    ],
    difficulty: "Easy",
    bestFor: "Anglers, couples, relaxed family trips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Green+Lake+Wisconsin",
    rating: 4.7
  },
  {
    id: 8,
    name: "Kettle Moraine State Forest",
    region: "Southeast WI (Waukesha / Washington)",
    tags: ["hiking", "family", "fishing"],
    description: "Glacially sculpted terrain with 120+ miles of hiking trails, quiet kettle lakes for fishing, and some of the best fall foliage (and summer wildflowers) in Wisconsin.",
    highlights: [
      "Ice Age National Scenic Trail passes through here",
      "Zillmer Trail — 7.2 miles, great for families",
      "Pike Lake Unit — small sandy beach & trout fishing",
      "Lapham Peak — highest point in Waukesha County, scenic tower"
    ],
    difficulty: "Easy to Moderate",
    bestFor: "Hikers, nature families, day-trippers from Milwaukee",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    mapLink: "https://maps.google.com/?q=Kettle+Moraine+State+Forest+Wisconsin",
    rating: 4.6
  }
];
