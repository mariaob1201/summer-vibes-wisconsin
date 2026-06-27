// @ts-nocheck

// Jaccard similarity: |A ∩ B| / |A ∪ B|
function jaccardSimilarity(tagsA, tagsB) {
  const setB   = new Set(tagsB);
  const inter  = tagsA.filter(t => setB.has(t)).length;
  const union  = new Set([...tagsA, ...tagsB]).size;
  return union === 0 ? 0 : inter / union;
}

// Score = 65% tag overlap + 35% community rating
function scoreDestination(source, candidate, ratingsCache) {
  const tagScore    = jaccardSimilarity(source.tags, candidate.tags);
  const summary     = ratingsCache[candidate.id] || { avg: 3, count: 0 };
  const ratingScore = summary.avg / 5;
  return tagScore * 0.65 + ratingScore * 0.35;
}

function getRecommendations(destId, ratingsCache, count = 2) {
  const source = destinations.find(d => d.id === destId);
  if (!source) return [];

  return destinations
    .filter(d => d.id !== destId)
    .map(d => {
      const score      = scoreDestination(source, d, ratingsCache);
      const matchPct   = Math.round(score * 100);
      const sharedTags = source.tags.filter(t => d.tags.includes(t));
      const summary    = ratingsCache[d.id] || { avg: null, count: 0 };
      return { dest: d, score, matchPct, sharedTags, summary };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
