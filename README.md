# Summer Vibes Wisconsin

A static travel guide website for Wisconsin lake destinations, with activity filters, community ratings, and comments powered by Supabase.

## Features

- Browse 8 Wisconsin lake destinations (Lake Geneva, Devil's Lake, Apostle Islands, and more)
- Filter by activity: Boat / Lancha, Family, Hiking, Fishing
- Anonymous star ratings (stored per browser via localStorage to prevent duplicates)
- Community comments — post and read traveler experiences
- Trip planning tips section
- Fully responsive design

## Tech Stack

- Plain HTML / CSS / JavaScript — no build step required
- [Supabase](https://supabase.com) for ratings and comments database

## Project Structure

```
├── index.html   # Page layout and modal markup
├── styles.css   # All styles including modal and card components
├── data.js      # Destination data (name, tags, highlights, etc.)
├── db.js        # Supabase database functions
├── app.js       # UI logic, filters, modal, star picker
└── config.js    # Supabase credentials (fill in before deploying)
```

## Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a free project, then run this SQL in the **SQL Editor**:

```sql
create table ratings (
  id             uuid primary key default gen_random_uuid(),
  destination_id integer not null,
  stars          integer not null check (stars between 1 and 5),
  created_at     timestamptz default now()
);

create table comments (
  id             uuid primary key default gen_random_uuid(),
  destination_id integer not null,
  nickname       text default 'Anonymous',
  body           text not null,
  created_at     timestamptz default now()
);

alter table ratings enable row level security;
alter table comments enable row level security;

create policy "Public read ratings"  on ratings  for select using (true);
create policy "Public insert ratings" on ratings  for insert with check (true);
create policy "Public read comments" on comments for select using (true);
create policy "Public insert comments" on comments for insert with check (true);
```

### 2. Add your credentials

Open `config.js` and replace the placeholder values:

```js
const SUPABASE_URL  = "https://your-project.supabase.co";
const SUPABASE_ANON = "your-anon-public-key";
```

Find both values in: **Supabase Dashboard → Project Settings → API**

### 3. Run locally

Open `index.html` directly in a browser — no server needed.

### 4. Deploy to Netlify

**Option A — Drag & drop:**  
Go to [netlify.com](https://netlify.com) → Add new site → Deploy manually → drag the project folder.

**Option B — GitHub auto-deploy:**  
Push to GitHub, connect the repo in Netlify, leave build command and publish directory blank, deploy.

## Adding Destinations

Add an object to the `destinations` array in `data.js`:

```js
{
  id: 9,                          // must be unique
  name: "Your Lake Name",
  region: "Region, WI",
  tags: ["boat", "family"],       // boat | family | hiking | fishing
  description: "Short description...",
  highlights: ["Highlight one", "Highlight two"],
  difficulty: "Easy",
  bestFor: "Families, couples",
  image: "https://...",
  mapLink: "https://maps.google.com/?q=...",
  rating: 4.5                     // initial display rating
}
```

## License

MIT — see [LICENSE](LICENSE).
