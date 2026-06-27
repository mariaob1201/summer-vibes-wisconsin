// @ts-nocheck
// Natural language → destination scorer.
// Each signal maps a list of trigger words to a category, tag, or difficulty.
// A query activates every signal whose words appear in the text.

const SIGNALS = [
  // ── Outdoor ──────────────────────────────────────────────────────────────
  { words: ["lake", "lakes", "swim", "swimming", "shore", "water", "outdoor", "outside", "nature", "scenic"], category: "outdoor" },
  { words: ["boat", "boating", "pontoon", "kayak", "kayaking", "sail", "sailing", "canoe", "paddle"], tag: "boat" },
  { words: ["hike", "hiking", "trail", "trails", "walk", "trek", "trekking", "bluff", "cliff"], tag: "hiking" },
  { words: ["fish", "fishing", "angling", "catch", "walleye", "bass", "perch", "trout", "rod"], tag: "fishing" },

  // ── Kids & Pools ──────────────────────────────────────────────────────────
  { words: ["kid", "kids", "children", "child", "toddler", "toddlers", "waterpark", "water park", "dells"], category: "kids" },
  { words: ["pool", "pools", "slide", "slides", "waterslide", "splash", "wave pool", "lazy river", "indoor water"], tag: "pool" },

  // ── Dancing — Latin American ───────────────────────────────────────────────
  { words: ["salsa", "bachata", "merengue", "cumbia", "norteño", "norteno", "reggaeton", "latin", "latino", "latina", "hispanic", "mexican", "colombian", "puerto rican", "dominican"], tag: "latin" },

  // ── Dancing — other cultures ──────────────────────────────────────────────
  { words: ["swing", "lindy", "lindy hop", "jive", "charleston", "jazz dance", "big band"], tag: "swing" },
  { words: ["country", "line dance", "line dancing", "two step", "two-step", "honky tonk", "country music", "western"], tag: "country" },
  { words: ["polka", "oktoberfest", "german", "swiss", "folk dance", "cultural dance", "traditional"], tag: "cultural" },

  // ── Dancing (general) ─────────────────────────────────────────────────────
  { words: ["dance", "dancing", "dancer", "nightclub", "club", "dj", "dance floor", "dancefloor", "dance night", "night out"], category: "dancing" },

  // ── Relationships / social ────────────────────────────────────────────────
  { words: ["partner", "couple", "couples", "date", "romantic", "together", "boyfriend", "girlfriend", "husband", "wife", "significant other", "two of us", "just us"], tag: "partners" },
  { words: ["friend", "friends", "group", "crew", "squad", "buddies", "girls", "guys", "gang", "bachelorette", "bachelor"], tag: "friends" },
  { words: ["family", "families", "parents", "mom", "dad", "parent", "grandparent", "grandparents", "aunt", "uncle"], tag: "family" },

  // ── Friends trip / nightlife ──────────────────────────────────────────────
  { words: ["trip", "getaway", "weekend", "road trip", "bar", "bars", "drinks", "nightlife", "going out", "outing", "day trip"], category: "friends" },
  { words: ["festival", "concert", "live music", "summerfest", "outdoor concert", "show", "performance"], tag: "music" },
  { words: ["rooftop", "cocktail", "cocktails", "nightlife", "lounge"], tag: "nightlife" },

  // ── Difficulty ────────────────────────────────────────────────────────────
  { words: ["easy", "relaxed", "chill", "calm", "beginner", "simple", "no experience", "low key", "laid back", "lazy"], difficulty: "Easy" },
  { words: ["moderate", "medium", "some experience", "intermediate"], difficulty: "Moderate" },
  { words: ["hard", "difficult", "challenging", "advanced", "extreme", "intense", "serious"], difficulty: "Hard" },
];

function parseQuery(query) {
  const lower = query.toLowerCase();
  const out = { categories: new Set(), tags: new Set(), difficulties: new Set() };

  for (const signal of SIGNALS) {
    if (signal.words.some(w => lower.includes(w))) {
      if (signal.category)   out.categories.add(signal.category);
      if (signal.tag)        out.tags.add(signal.tag);
      if (signal.difficulty) out.difficulties.add(signal.difficulty);
    }
  }
  return out;
}

function searchDestinations(query) {
  if (!query.trim()) return [];

  const { categories, tags, difficulties } = parseQuery(query);
  const lower       = query.toLowerCase();
  const hasSignals  = categories.size || tags.size || difficulties.size;

  const scored = destinations.map(dest => {
    let score = 0;

    if (categories.has(dest.category)) score += 5;
    for (const t of dest.tags) {
      if (tags.has(t)) score += 4;
    }
    if (difficulties.size) {
      const dMap = { "Easy": 1, "Easy to Moderate": 1.5, "Moderate": 2, "Moderate to Hard": 2.5, "Hard": 3 };
      const destLevel = dMap[dest.difficulty] ?? 2;
      for (const d of difficulties) {
        const target = dMap[d] ?? 2;
        if (Math.abs(target - destLevel) <= 0.5) score += 2;
      }
    }

    // Text fallback — match name or description directly
    if (!hasSignals || score === 0) {
      if (dest.name.toLowerCase().includes(lower))        score += 3;
      if (dest.description.toLowerCase().includes(lower)) score += 1;
    }

    return { dest, score };
  })
  .filter(d => d.score > 0)
  .sort((a, b) => b.score - a.score);

  return scored.map(d => d.dest);
}
