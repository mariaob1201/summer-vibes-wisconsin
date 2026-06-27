const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

async function getRatingSummary(destinationId) {
  const { data, error } = await db
    .from("ratings")
    .select("stars")
    .eq("destination_id", destinationId);

  if (error || !data.length) return { avg: 0, count: 0 };

  const avg = data.reduce((s, r) => s + r.stars, 0) / data.length;
  return { avg: Math.round(avg * 10) / 10, count: data.length };
}

async function submitRating(destinationId, stars) {
  const { error } = await db
    .from("ratings")
    .insert({ destination_id: destinationId, stars });

  if (error) throw error;
}

async function getComments(destinationId) {
  const { data, error } = await db
    .from("comments")
    .select("id, nickname, body, created_at")
    .eq("destination_id", destinationId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return data;
}

async function getAllRatingSummaries() {
  const { data, error } = await db.from("ratings").select("destination_id, stars");
  if (error || !data) return {};

  const grouped = {};
  for (const row of data) {
    if (!grouped[row.destination_id]) grouped[row.destination_id] = [];
    grouped[row.destination_id].push(row.stars);
  }

  const result = {};
  for (const [id, stars] of Object.entries(grouped)) {
    const avg = stars.reduce((s, v) => s + v, 0) / stars.length;
    result[Number(id)] = { avg: Math.round(avg * 10) / 10, count: stars.length };
  }
  return result;
}

async function submitComment(destinationId, nickname, body) {
  const { error } = await db
    .from("comments")
    .insert({
      destination_id: destinationId,
      nickname: nickname.trim() || "Anonymous",
      body: body.trim()
    });

  if (error) throw error;
}
