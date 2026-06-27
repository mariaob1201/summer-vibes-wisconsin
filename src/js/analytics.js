// @ts-nocheck

const DIFFICULTY_MAP = {
  "Easy":             1,
  "Easy to Moderate": 1.5,
  "Moderate":         2,
  "Moderate to Hard": 2.5,
  "Hard":             3
};

const TAG_LABELS_FULL = { boat: "Boating", family: "Family", hiking: "Hiking", fishing: "Fishing" };

function computeTagFrequency() {
  const freq = {};
  for (const d of destinations) {
    for (const t of d.tags) freq[t] = (freq[t] || 0) + 1;
  }
  return freq;
}

function sortDestinations(dests) {
  const val  = document.getElementById("sortSelect")?.value ?? "default";
  const copy = [...dests];
  if (val === "rating")          return copy.sort((a, b) => b.rating - a.rating);
  if (val === "activities")      return copy.sort((a, b) => b.tags.length - a.tags.length);
  if (val === "difficulty-asc")  return copy.sort((a, b) => (DIFFICULTY_MAP[a.difficulty] ?? 2) - (DIFFICULTY_MAP[b.difficulty] ?? 2));
  if (val === "difficulty-desc") return copy.sort((a, b) => (DIFFICULTY_MAP[b.difficulty] ?? 2) - (DIFFICULTY_MAP[a.difficulty] ?? 2));
  return copy;
}

function renderInsights() {
  const freq       = computeTagFrequency();
  const avgRating  = Math.round(destinations.reduce((s, d) => s + d.rating, 0) / destinations.length * 10) / 10;
  const avgDensity = Math.round(destinations.reduce((s, d) => s + d.tags.length, 0) / destinations.length * 10) / 10;
  const topTag     = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

  document.getElementById("statDestinations").textContent = destinations.length;
  document.getElementById("statAvgRating").textContent    = avgRating;
  document.getElementById("statTopActivity").textContent  = TAG_LABELS_FULL[topTag];
  document.getElementById("statTagDensity").textContent   = avgDensity;

  const maxCount = Math.max(...Object.values(freq));
  document.getElementById("tagFreqBars").innerHTML = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => {
      const barPct  = Math.round((count / maxCount) * 100);
      const destPct = Math.round((count / destinations.length) * 100);
      return `
        <div class="freq-row">
          <span class="freq-label">${TAG_LABELS_FULL[tag]}</span>
          <div class="freq-bar-wrap">
            <div class="freq-bar freq-bar-${tag}" style="width:${barPct}%"></div>
          </div>
          <span class="freq-count">${count}<span class="freq-of"> / ${destinations.length}</span> <span class="freq-pct">${destPct}%</span></span>
        </div>
      `;
    }).join("");
}
