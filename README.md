# Summer Vibes Wisconsin

A static travel guide for Wisconsin summer activities — lakes, waterparks, dancing, and friends trips. No backend or setup required; open `index.html` and go.

## Features

- **21 destinations** across 4 categories: Lake & Outdoor, Kids & Pools, Dancing, Friends Trip
- Filter by category, sort by rating / activity count / difficulty
- Content-based recommendation engine (Jaccard tag similarity + difficulty proximity + community rating)
- Star ratings and comments stored locally in the browser (localStorage — no account needed)
- Rating distribution histogram per destination
- Data insights section: activity frequency chart and summary stats
- Fully responsive design

## Categories

| Category | What's included |
|---|---|
| 🌊 Lake & Outdoor | Lakes, hiking, boating, fishing across Wisconsin |
| 🏊 Kids & Pools | Wisconsin Dells waterparks (Noah's Ark, Kalahari, Mt. Olympus, Wilderness Resort) |
| 💃 Dancing | Latin/salsa, cumbia, swing, country line dancing, polka |
| 🎉 Friends Trip | Summerfest, Door County, Madison State Street, Milwaukee Third Ward |

## Tech Stack

- Plain HTML / CSS / JavaScript — no build step, no dependencies, no backend
- Ratings and comments stored in **localStorage** (per browser)
- Deployed via [Netlify](https://netlify.com)

## Project Structure

```
├── index.html              # Page layout and modal markup
├── netlify.toml            # Netlify publish config
└── src/
    ├── css/
    │   └── styles.css      # All styles
    └── js/
        ├── data.js         # All destination data
        ├── analytics.js    # Stats, frequency chart, sort logic
        ├── db.js           # localStorage ratings & comments
        ├── recommendations.js  # Scoring algorithm
        └── app.js          # UI logic, filters, modal, star picker
```

## Run Locally

```bash
python3 -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000). No credentials or setup needed.

## Deploy to Netlify

**Option A — Drag & drop:**
Go to [netlify.com](https://netlify.com) → Add new site → Deploy manually → drag the project folder.

**Option B — GitHub auto-deploy:**
Push to GitHub, connect the repo in Netlify, leave build command blank, set publish directory to `.`, deploy.

## Adding a Destination

Add an object to the `destinations` array in `src/js/data.js`:

```js
{
  id: 22,                             // must be unique
  category: "outdoor",               // outdoor | kids | dancing | friends
  name: "Your Place",
  region: "Region, WI",
  tags: ["boat", "family"],          // see tag list below
  description: "Short description.",
  difficulty: "Easy",
  bestFor: "Families, couples",
  image: "https://images.unsplash.com/...",
  mapLink: "https://maps.google.com/?q=...",
  rating: 4.5
}
```

**Available tags by category:**

| Category | Tags |
|---|---|
| Outdoor | `boat` `hiking` `fishing` `family` |
| Kids | `kids` `pool` `family` |
| Dancing | `latin` `swing` `country` `cultural` `partners` `friends` |
| Friends | `friends` `music` `nightlife` `family` |

## Recommendation Algorithm

Each destination is scored against others using three weighted factors:

| Factor | Weight | Method |
|---|---|---|
| Tag overlap | 55% | Jaccard similarity |
| Community rating | 25% | Normalized 1–5 score |
| Difficulty match | 20% | Normalized distance on 1–3 scale |

## License

MIT — see [LICENSE](LICENSE).
