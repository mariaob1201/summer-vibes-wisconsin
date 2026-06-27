// @ts-nocheck
const tagLabels = {
  boat:    "&#9875; Boat",
  family:  "&#128106; Family",
  hiking:  "&#127965; Hiking",
  fishing: "&#127907; Fishing"
};

// ── Card rendering ─────────────────────────────────────────────────────────

function createCard(dest) {
  const tagsHTML = dest.tags
    .map(t => `<span class="tag tag-${t}">${tagLabels[t]}</span>`)
    .join("");

  const highlightsHTML = dest.highlights
    .map(h => `<li>${h}</li>`)
    .join("");

  const filledStars = Math.round(dest.rating);
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");

  return `
    <div class="card" data-tags="${dest.tags.join(",")}">
      <div class="card-img" style="background-image: url('${dest.image}')">
        <div class="card-region">${dest.region}</div>
      </div>
      <div class="card-body">
        <div class="card-tags">${tagsHTML}</div>
        <h3 class="card-title">${dest.name}</h3>
        <div class="card-rating">
          <span class="stars">${starsHTML}</span>
          <span class="rating-num">${dest.rating}</span>
        </div>
        <p class="card-desc">${dest.description}</p>
        <ul class="card-highlights">${highlightsHTML}</ul>
        <div class="card-meta">
          <span class="meta-item"><strong>Difficulty:</strong> ${dest.difficulty}</span>
          <span class="meta-item"><strong>Best for:</strong> ${dest.bestFor}</span>
        </div>
        <div class="card-actions">
          <a class="card-link" href="${dest.mapLink}" target="_blank" rel="noopener">
            View on Map &#8599;
          </a>
          <button class="card-review-btn" data-id="${dest.id}">
            &#9733; Rate &amp; Comment
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCards(filter) {
  const grid    = document.getElementById("cardsGrid");
  const matched = filter === "all"
    ? destinations
    : destinations.filter(d => d.tags.includes(filter));

  const filtered = sortDestinations(matched);

  if (!filtered.length) {
    grid.innerHTML = `<p class="no-results">No destinations found for this filter.</p>`;
    return;
  }
  grid.innerHTML = filtered.map(createCard).join("");
}

// ── Filters & Sort ─────────────────────────────────────────────────────────

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderCards(btn.dataset.filter);
});

document.getElementById("sortSelect").addEventListener("change", () => {
  const active = document.querySelector(".filter-btn.active");
  renderCards(active ? active.dataset.filter : "all");
});

// ── Modal ──────────────────────────────────────────────────────────────────

const overlay    = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
let activeDestId = null;

function openModal(destId) {
  const dest = destinations.find(d => d.id === destId);
  if (!dest) return;
  activeDestId = destId;

  document.getElementById("modalTitle").textContent = dest.name;
  document.getElementById("ratingFeedback").textContent = "";
  document.getElementById("commentForm").reset();

  const alreadyRated = localStorage.getItem(`rated_${destId}`);
  resetStarPicker(alreadyRated ? parseInt(alreadyRated) : 0, alreadyRated);

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  renderRecommendations(destId);
  loadRatingSummary(destId);
  renderRatingDistribution(destId);
  loadComments(destId);
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  activeDestId = null;
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

document.getElementById("cardsGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".card-review-btn");
  if (btn) openModal(parseInt(btn.dataset.id));
});

// ── Star picker ────────────────────────────────────────────────────────────

const starPicker = document.getElementById("starPicker");

function resetStarPicker(filledUpTo = 0, locked = false) {
  const stars = starPicker.querySelectorAll(".star-pick");
  stars.forEach((s, i) => {
    s.classList.toggle("filled", i < filledUpTo);
    s.classList.toggle("locked", !!locked);
  });
  starPicker.dataset.locked = locked ? "true" : "false";
}

starPicker.addEventListener("mouseover", (e) => {
  if (starPicker.dataset.locked === "true") return;
  const star = e.target.closest(".star-pick");
  if (!star) return;
  resetStarPicker(parseInt(star.dataset.v));
});

starPicker.addEventListener("mouseleave", () => {
  if (starPicker.dataset.locked === "true") return;
  const saved = activeDestId ? localStorage.getItem(`rated_${activeDestId}`) : null;
  resetStarPicker(saved ? parseInt(saved) : 0);
});

starPicker.addEventListener("click", async (e) => {
  if (starPicker.dataset.locked === "true") return;
  const star = e.target.closest(".star-pick");
  if (!star || !activeDestId) return;

  const value    = parseInt(star.dataset.v);
  const feedback = document.getElementById("ratingFeedback");

  try {
    await submitRating(activeDestId, value);
    localStorage.setItem(`rated_${activeDestId}`, value);
    resetStarPicker(value, true);
    feedback.textContent = "Thanks for your rating!";
    feedback.className   = "rating-feedback success";
    loadRatingSummary(activeDestId);
    renderRatingDistribution(activeDestId);
  } catch {
    feedback.textContent = "Could not save rating. Try again.";
    feedback.className   = "rating-feedback error";
  }
});

// ── Rating summary ─────────────────────────────────────────────────────────

async function loadRatingSummary(destId) {
  const { avg, count } = await getRatingSummary(destId);

  const starsEl = document.getElementById("communityStars");
  const avgEl   = document.getElementById("communityAvg");
  const countEl = document.getElementById("communityCount");

  if (count === 0) {
    starsEl.innerHTML   = "&#9733;&#9733;&#9733;&#9733;&#9733;";
    starsEl.style.color = "#cbd5e1";
    avgEl.textContent   = "";
    countEl.textContent = "No ratings yet — be the first!";
    return;
  }

  const full = Math.round(avg);
  starsEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < full ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");
  avgEl.textContent   = `${avg} / 5`;
  countEl.textContent = `(${count} rating${count !== 1 ? "s" : ""})`;
}

// ── Rating distribution histogram ──────────────────────────────────────────

async function renderRatingDistribution(destId) {
  const el = document.getElementById("ratingDistribution");
  if (!el) return;
  try {
    const dist  = await getRatingDistribution(destId);
    const total = Object.values(dist).reduce((s, v) => s + v, 0);
    if (total === 0) { el.innerHTML = ""; return; }

    el.innerHTML = [5, 4, 3, 2, 1].map(star => {
      const count = dist[star] || 0;
      const pct   = Math.round((count / total) * 100);
      return `
        <div class="dist-row">
          <span class="dist-star">${star}★</span>
          <div class="dist-bar-wrap">
            <div class="dist-bar" style="width:${pct}%"></div>
          </div>
          <span class="dist-count">${count}</span>
        </div>
      `;
    }).join("");
  } catch { /* fail silently */ }
}

// ── Comments ───────────────────────────────────────────────────────────────

async function loadComments(destId) {
  const list = document.getElementById("commentsList");
  list.innerHTML = `<p class="comments-loading">Loading...</p>`;

  try {
    const comments = await getComments(destId);

    if (!comments.length) {
      list.innerHTML = `<p class="comments-empty">No comments yet. Share your experience!</p>`;
      return;
    }

    list.innerHTML = comments.map(c => {
      const date = new Date(c.created_at).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
      });
      return `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-name">${escapeHTML(c.nickname)}</span>
            <span class="comment-date">${date}</span>
          </div>
          <p class="comment-body">${escapeHTML(c.body)}</p>
        </div>
      `;
    }).join("");
  } catch {
    list.innerHTML = `<p class="comments-loading">Could not load comments.</p>`;
  }
}

document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!activeDestId) return;

  const name = document.getElementById("commentName").value;
  const body = document.getElementById("commentBody").value.trim();
  const btn  = e.target.querySelector(".comment-submit");

  if (!body) return;

  btn.disabled    = true;
  btn.textContent = "Posting...";

  try {
    await submitComment(activeDestId, name, body);
    e.target.reset();
    loadComments(activeDestId);
  } catch {
    alert("Could not post comment. Please try again.");
  } finally {
    btn.disabled    = false;
    btn.textContent = "Post Comment";
  }
});

// ── Recommendations ────────────────────────────────────────────────────────

let ratingsCache = {};

async function preloadRatings() {
  try { ratingsCache = await getAllRatingSummaries(); } catch { /* fail silently */ }
}

function renderRecommendations(destId) {
  const section = document.getElementById("recoSection");
  const list    = document.getElementById("recoList");
  const recos   = getRecommendations(destId, ratingsCache);

  if (!recos.length) { section.style.display = "none"; return; }

  section.style.display = "";
  list.innerHTML = recos.map(({ dest, matchPct, sharedTags, summary }) => {
    const tagsHTML = sharedTags
      .map(t => `<span class="tag tag-${t} tag-sm">${tagLabels[t]}</span>`)
      .join("");

    const ratingText = summary.count > 0
      ? `&#9733; ${summary.avg} (${summary.count})`
      : "No ratings yet";

    return `
      <div class="reco-card">
        <div class="reco-img" style="background-image:url('${dest.image}')"></div>
        <div class="reco-body">
          <div class="reco-header">
            <span class="reco-name">${dest.name}</span>
            <span class="reco-match">${matchPct}% match</span>
          </div>
          <div class="reco-match-bar">
            <div class="reco-match-fill" style="width:${matchPct}%"></div>
          </div>
          <div class="reco-meta">
            <span class="reco-rating">${ratingText}</span>
          </div>
          <div class="reco-tags">${tagsHTML}</div>
          <button class="reco-open-btn" data-id="${dest.id}">Explore &#8599;</button>
        </div>
      </div>
    `;
  }).join("");
}

document.getElementById("recoList").addEventListener("click", (e) => {
  const btn = e.target.closest(".reco-open-btn");
  if (btn) openModal(parseInt(btn.dataset.id));
});

// ── Utils ──────────────────────────────────────────────────────────────────

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Init ───────────────────────────────────────────────────────────────────

preloadRatings();
renderCards("all");
renderInsights();
