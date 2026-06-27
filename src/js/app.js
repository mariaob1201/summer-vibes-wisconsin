// @ts-nocheck

// ── Language ──────────────────────────────────────────────────────────────────

let lang = localStorage.getItem("wis_lang") || "en";

function t(key) {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
}

function applyStrings() {
  // Hero subtitle
  const heroP = document.querySelector(".hero p");
  if (heroP) heroP.innerHTML = t("heroSubtitle");

  // Search
  const nlSearch = document.getElementById("nlSearch");
  if (nlSearch) nlSearch.placeholder = t("searchPlaceholder");
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) searchBtn.textContent = t("searchBtn");
  const searchClear = document.getElementById("searchClear");
  if (searchClear) searchClear.innerHTML = t("searchClear");

  // Filter buttons
  [
    ["all",        "filterAll"],
    ["outdoor",    "filterOutdoor"],
    ["kids",       "filterKids"],
    ["dancing",    "filterDancing"],
    ["friends",    "filterFriends"],
    ["firstTimer", "filterFirst"],
  ].forEach(([filter, key]) => {
    const el = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (el) el.innerHTML = t(key);
  });

  // Sort controls
  const sortLabel = document.querySelector(".sort-label");
  if (sortLabel) sortLabel.textContent = t("sortLabel");
  [
    ["default",         "sortDefault"],
    ["rating",          "sortRating"],
    ["activities",      "sortActivities"],
    ["difficulty-asc",  "sortEasiest"],
    ["difficulty-desc", "sortHardest"],
  ].forEach(([val, key]) => {
    const el = document.querySelector(`.sort-select option[value="${val}"]`);
    if (el) el.textContent = t(key);
  });

  // Vibe picker
  const vibeLabel = document.querySelector(".vibe-label");
  if (vibeLabel) vibeLabel.textContent = t("vibeLabel");
  [
    ["outdoor", "vibeOutdoor"],
    ["kids",    "vibeKids"],
    ["dancing", "vibeDancing"],
    ["friends", "vibeFriends"],
  ].forEach(([filter, key]) => {
    const el = document.querySelector(`.vibe-btn[data-filter="${filter}"]`);
    if (el) el.innerHTML = t(key);
  });

  // Featured eyebrow
  const eyebrow = document.querySelector(".section-eyebrow");
  if (eyebrow) eyebrow.textContent = t("featuredEyebrow");

  // Insights
  const insH2 = document.querySelector(".insights-section h2");
  if (insH2) insH2.textContent = t("insightsTitle");
  [
    ["statDestsLabel", "statDests"],
    ["statAvgLabel",   "statAvg"],
    ["statTopLabel",   "statTop"],
    ["statTagsLabel",  "statTags"],
  ].forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });
  const freqTitle = document.querySelector(".freq-chart-title");
  if (freqTitle) freqTitle.textContent = t("freqTitle");

  // Tips
  const tipsH2 = document.querySelector(".tips-section h2");
  if (tipsH2) tipsH2.textContent = t("tipsTitle");
  const tipsList = document.getElementById("tipsList");
  if (tipsList) tipsList.innerHTML = t("tips").map(tip => `<li>${tip}</li>`).join("");

  // Footer
  const footerMain = document.getElementById("footerMain");
  if (footerMain) footerMain.innerHTML = t("footerMain");
  const footerSub = document.querySelector(".footer-sub");
  if (footerSub) footerSub.textContent = t("footerSub");

  // Modal section titles
  [
    ["recoSectionTitle",      "recoTitle"],
    ["communityRatingTitle",  "communityTitle"],
    ["rateThisTitle",         "rateTitle"],
    ["leaveCommentTitle",     "commentTitle"],
    ["whatTravelersSayTitle", "commentsTitle"],
  ].forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });
  const commentName = document.getElementById("commentName");
  if (commentName) commentName.placeholder = t("commentNamePh");
  const commentBody = document.getElementById("commentBody");
  if (commentBody) commentBody.placeholder = t("commentBodyPh");
  const commentSubmit = document.querySelector(".comment-submit");
  if (commentSubmit) commentSubmit.textContent = t("commentSubmit");

  // Save bar
  updateSaveBar();

  // Lang toggle shows the OTHER language
  const langToggle = document.getElementById("langToggle");
  if (langToggle) langToggle.textContent = lang === "en" ? "ES" : "EN";
}

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem("wis_lang", lang);
  applyStrings();
  renderFeatured();
  renderSections(currentFilter);
  renderInsights();
}

document.getElementById("langToggle").addEventListener("click", () => {
  setLang(lang === "en" ? "es" : "en");
});

// ── Tag labels ────────────────────────────────────────────────────────────────

const tagLabels = {
  boat:     "&#9875; Boat",
  family:   "&#128106; Family",
  hiking:   "&#127965; Hiking",
  fishing:  "&#127907; Fishing",
  kids:     "&#127946; Kids",
  pool:     "&#128166; Pool",
  latin:    "&#128131; Latin",
  swing:    "&#127927; Swing",
  country:  "&#129312; Country",
  cultural: "&#127981; Cultural",
  music:    "&#127925; Music",
  friends:  "&#127881; Friends",
  nightlife:"&#127762; Nightlife",
  partners: "&#128107; Partners",
};

// ── Categories (function so labels stay in current language) ──────────────────

function getCategories() {
  return [
    { key: "outdoor", label: t("catOutdoor"), color: "#0284c7" },
    { key: "kids",    label: t("catKids"),    color: "#0891b2" },
    { key: "dancing", label: t("catDancing"), color: "#be185d" },
    { key: "friends", label: t("catFriends"), color: "#ea580c" },
  ];
}

// ── Save / Print ──────────────────────────────────────────────────────────────

let savedIds = new Set(JSON.parse(localStorage.getItem("wis_saved") || "[]"));

function toggleSaved(destId) {
  if (savedIds.has(destId)) {
    savedIds.delete(destId);
  } else {
    savedIds.add(destId);
  }
  localStorage.setItem("wis_saved", JSON.stringify([...savedIds]));
  const isSaved = savedIds.has(destId);
  document.querySelectorAll(`.save-btn[data-id="${destId}"]`).forEach(btn => {
    btn.classList.toggle("saved", isSaved);
    btn.title = isSaved ? t("cardUnsave") : t("cardSave");
    btn.innerHTML = isSaved ? "&#10084;" : "&#9825;";
  });
  updateSaveBar();
}

function updateSaveBar() {
  const bar      = document.getElementById("saveBar");
  const countEl  = document.getElementById("saveCount");
  const printBtn = document.getElementById("printBtn");
  if (!bar) return;
  if (savedIds.size === 0) {
    bar.classList.add("hidden");
  } else {
    bar.classList.remove("hidden");
    if (countEl)  countEl.textContent  = `${savedIds.size} ${t("savedCount")}`;
    if (printBtn) printBtn.innerHTML   = t("printBtn");
  }
}

function renderPrintPanel() {
  const panel = document.getElementById("printPanel");
  if (!panel) return;
  const saved = destinations.filter(d => savedIds.has(d.id));
  panel.innerHTML = `
    <h1 style="font-size:1.6rem;margin-bottom:4px">${t("printTitle")}</h1>
    <p style="font-size:.85rem;color:#666;margin-bottom:24px">${new Date().toLocaleDateString()}</p>
    ${saved.map((d, i) => `
      <div class="print-item">
        <div class="print-num">${i + 1}</div>
        <div class="print-body">
          <strong>${d.name}</strong><br>
          <span>${d.region}</span><br>
          <span>${d.description}</span>
        </div>
      </div>
    `).join("")}
  `;
}

document.getElementById("printBtn").addEventListener("click", () => {
  renderPrintPanel();
  window.print();
});

// ── Card rendering ────────────────────────────────────────────────────────────

function createCard(dest) {
  const tagsHTML = dest.tags
    .map(tag => `<span class="tag tag-${tag}">${tagLabels[tag] ?? tag}</span>`)
    .join("");

  const filledStars = Math.round(dest.rating);
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");

  const isSaved = savedIds.has(dest.id);
  const firstTimerBadge = dest.firstTimer
    ? `<div class="first-timer-badge">${t("firstTimerBadge")}</div>`
    : "";
  const saveBtnTitle = isSaved ? t("cardUnsave") : t("cardSave");

  return `
    <div class="card" data-tags="${dest.tags.join(",")}">
      <div class="card-img" style="background-image: url('${dest.image}')">
        ${firstTimerBadge}
        <button class="save-btn${isSaved ? " saved" : ""}" data-id="${dest.id}" title="${saveBtnTitle}" aria-label="${saveBtnTitle}">
          ${isSaved ? "&#10084;" : "&#9825;"}
        </button>
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
        <div class="card-actions">
          <a class="card-link" href="${dest.mapLink}" target="_blank" rel="noopener">
            ${t("cardMap")}
          </a>
          <button class="card-review-btn" data-id="${dest.id}">
            ${t("cardRate")}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Section rendering ─────────────────────────────────────────────────────────

let currentFilter = "all";

function buildSection(cat, dests, preview) {
  const shown = preview ? dests.slice(0, 3) : dests;
  const seeAll = preview
    ? `<button class="section-see-all" data-filter="${cat.key}">${t("seeAll")}</button>`
    : "";

  if (cat.key === "dancing") {
    const latin = shown.filter(d => d.tags.includes("latin"));
    const other = shown.filter(d => !d.tags.includes("latin"));
    return `
      <div class="category-section" style="--section-color:${cat.color}">
        <div class="section-header">
          <h2 class="section-title">${cat.label}</h2>
          ${seeAll}
        </div>
        ${latin.length ? `<p class="subgroup-label">${t("subLatin")}</p><div class="cards-grid">${latin.map(createCard).join("")}</div>` : ""}
        ${other.length ? `<p class="subgroup-label">${t("subOther")}</p><div class="cards-grid">${other.map(createCard).join("")}</div>` : ""}
      </div>`;
  }

  return `
    <div class="category-section" style="--section-color:${cat.color}">
      <div class="section-header">
        <h2 class="section-title">${cat.label}</h2>
        ${seeAll}
      </div>
      <div class="cards-grid">${shown.map(createCard).join("")}</div>
    </div>`;
}

function renderSections(filter) {
  currentFilter = filter;
  const container = document.getElementById("sectionsContainer");

  if (filter === "firstTimer") {
    const dests = sortDestinations(destinations.filter(d => d.firstTimer));
    container.innerHTML = `
      <div class="category-section" style="--section-color:#f59e0b">
        <div class="section-header">
          <h2 class="section-title">${t("catFirst")}</h2>
        </div>
        <div class="cards-grid">${dests.map(createCard).join("")}</div>
      </div>`;
    return;
  }

  if (filter !== "all") {
    const cat   = getCategories().find(c => c.key === filter);
    const dests = sortDestinations(destinations.filter(d => d.category === filter));
    container.innerHTML = buildSection(cat, dests, false);
    return;
  }

  container.innerHTML = getCategories().map(cat => {
    const dests = sortDestinations(destinations.filter(d => d.category === cat.key));
    return buildSection(cat, dests, true);
  }).join("");
}

// ── Featured daily pick ───────────────────────────────────────────────────────

function renderFeatured() {
  const now  = new Date();
  const day  = now.getDay();
  const hour = now.getHours();

  let category;
  if      (day === 5 && hour >= 16) category = "dancing";
  else if (day === 6)               category = "kids";
  else if (day === 0)               category = "outdoor";
  else if (hour >= 18)              category = "friends";
  else                              category = "outdoor";

  const pool = destinations.filter(d => d.category === category);
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const pick = pool[seed % pool.length];
  if (!pick) return;

  let dayLabel;
  if (day === 5 && hour >= 16)     dayLabel = t("dayFriNight");
  else if (hour >= 18 && day < 5)  dayLabel = t("dayEvening");
  else {
    const keys = ["daySun","dayMon","dayTue","dayWed","dayThu","dayFri","daySat"];
    dayLabel = t(keys[day]);
  }

  const filledStars = Math.round(pick.rating);
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");

  const isSaved = savedIds.has(pick.id);
  const firstTimerBadge = pick.firstTimer
    ? `<div class="first-timer-badge featured-first-badge">${t("firstTimerBadge")}</div>`
    : "";
  const saveBtnTitle = isSaved ? t("cardUnsave") : t("cardSave");

  document.getElementById("featuredCard").innerHTML = `
    <div class="featured-card">
      <div class="featured-img" style="background-image:url('${pick.image}')">
        <div class="featured-badge">${dayLabel}</div>
        ${firstTimerBadge}
        <button class="save-btn${isSaved ? " saved" : ""}" data-id="${pick.id}" title="${saveBtnTitle}" aria-label="${saveBtnTitle}">
          ${isSaved ? "&#10084;" : "&#9825;"}
        </button>
        <div class="card-region">${pick.region}</div>
      </div>
      <div class="featured-body">
        <h3 class="featured-name">${pick.name}</h3>
        <p class="featured-desc">${pick.description}</p>
        <div class="featured-meta">
          <span class="stars">${starsHTML}</span>
          <span class="rating-num">${pick.rating}</span>
          <span class="featured-diff">· ${pick.difficulty}</span>
        </div>
        <div class="card-actions">
          <a class="card-link" href="${pick.mapLink}" target="_blank" rel="noopener">${t("cardMap")}</a>
          <button class="card-review-btn" data-id="${pick.id}">${t("cardRate")}</button>
        </div>
      </div>
    </div>`;
}

// ── Filters, vibe picker & sort ───────────────────────────────────────────────

function setActiveFilter(filter) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add("active");
}

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  clearSearch(false);
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
});

document.getElementById("vibePicker").addEventListener("click", (e) => {
  const btn = e.target.closest(".vibe-btn");
  if (!btn) return;
  clearSearch(false);
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
  document.getElementById("sectionsContainer").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("sectionsContainer").addEventListener("click", (e) => {
  const btn = e.target.closest(".section-see-all");
  if (!btn) return;
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
});

document.getElementById("sortSelect").addEventListener("change", () => {
  const active = document.querySelector(".filter-btn.active");
  renderSections(active ? active.dataset.filter : "all");
});

// ── Natural Language Search ───────────────────────────────────────────────────

document.getElementById("searchBtn").addEventListener("click", runSearch);
document.getElementById("nlSearch").addEventListener("keydown", e => {
  if (e.key === "Enter") runSearch();
});
document.getElementById("searchClear").addEventListener("click", () => clearSearch(true));

function runSearch() {
  const query      = document.getElementById("nlSearch").value.trim();
  if (!query) return;

  const results    = searchDestinations(query);
  const container  = document.getElementById("sectionsContainer");
  const status     = document.getElementById("searchStatus");
  const statusText = document.getElementById("searchStatusText");

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  status.classList.add("visible");

  if (!results.length) {
    statusText.textContent = t("searchNoResults");
    container.innerHTML = `<p class="no-results">${t("searchNoResultsText")}</p>`;
    return;
  }

  statusText.textContent = `${results.length} match${results.length !== 1 ? "es" : ""} for "${query}"`;
  container.innerHTML = `<div class="cards-grid">${sortDestinations(results).map(createCard).join("")}</div>`;
}

function clearSearch(resetInput) {
  if (resetInput) document.getElementById("nlSearch").value = "";
  document.getElementById("searchStatus").classList.remove("visible");
  document.getElementById("searchStatusText").textContent = "";
  setActiveFilter("all");
  renderSections("all");
}

// ── Modal ─────────────────────────────────────────────────────────────────────

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

// Body-level delegation: save buttons and review buttons
document.body.addEventListener("click", (e) => {
  const saveBtn = e.target.closest(".save-btn");
  if (saveBtn) {
    toggleSaved(parseInt(saveBtn.dataset.id));
    return;
  }
  const reviewBtn = e.target.closest(".card-review-btn");
  if (reviewBtn && !overlay.contains(reviewBtn)) openModal(parseInt(reviewBtn.dataset.id));
});

// ── Star picker ───────────────────────────────────────────────────────────────

const starPicker = document.getElementById("starPicker");

function resetStarPicker(filledUpTo = 0, locked = false) {
  starPicker.querySelectorAll(".star-pick").forEach((s, i) => {
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
    feedback.textContent = t("ratingThanks");
    feedback.className   = "rating-feedback success";
    loadRatingSummary(activeDestId);
    renderRatingDistribution(activeDestId);
  } catch {
    feedback.textContent = t("ratingError");
    feedback.className   = "rating-feedback error";
  }
});

// ── Rating summary ────────────────────────────────────────────────────────────

async function loadRatingSummary(destId) {
  const { avg, count } = await getRatingSummary(destId);

  const starsEl = document.getElementById("communityStars");
  const avgEl   = document.getElementById("communityAvg");
  const countEl = document.getElementById("communityCount");

  if (count === 0) {
    starsEl.innerHTML   = "&#9733;&#9733;&#9733;&#9733;&#9733;";
    starsEl.style.color = "#cbd5e1";
    avgEl.textContent   = "";
    countEl.textContent = t("noRatings");
    return;
  }

  const full = Math.round(avg);
  starsEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < full ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");
  avgEl.textContent   = `${avg} / 5`;
  countEl.textContent = `(${count} rating${count !== 1 ? "s" : ""})`;
}

// ── Rating distribution histogram ─────────────────────────────────────────────

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
        </div>`;
    }).join("");
  } catch { /* fail silently */ }
}

// ── Comments ──────────────────────────────────────────────────────────────────

async function loadComments(destId) {
  const list = document.getElementById("commentsList");
  list.innerHTML = `<p class="comments-loading">${t("commentsLoading")}</p>`;

  try {
    const comments = await getComments(destId);
    if (!comments.length) {
      list.innerHTML = `<p class="comments-empty">${t("commentsEmpty")}</p>`;
      return;
    }
    list.innerHTML = comments.map(c => {
      const date = new Date(c.created_at).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
        month: "short", day: "numeric", year: "numeric"
      });
      return `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-name">${escapeHTML(c.nickname)}</span>
            <span class="comment-date">${date}</span>
          </div>
          <p class="comment-body">${escapeHTML(c.body)}</p>
        </div>`;
    }).join("");
  } catch {
    list.innerHTML = `<p class="comments-loading">${t("commentsLoading")}</p>`;
  }
}

document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!activeDestId) return;

  const name = document.getElementById("commentName").value;
  const body = document.getElementById("commentBody").value.trim();
  const btn  = e.target.querySelector(".comment-submit");
  if (!body) return;

  btn.disabled = true; btn.textContent = "...";
  try {
    await submitComment(activeDestId, name, body);
    e.target.reset();
    loadComments(activeDestId);
  } catch {
    alert(t("ratingError"));
  } finally {
    btn.disabled = false; btn.textContent = t("commentSubmit");
  }
});

// ── Recommendations ───────────────────────────────────────────────────────────

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
      .map(tag => `<span class="tag tag-${tag} tag-sm">${tagLabels[tag] ?? tag}</span>`)
      .join("");
    const ratingText = summary.count > 0
      ? `&#9733; ${summary.avg} (${summary.count})`
      : t("noRatings");

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
          <div class="reco-meta"><span class="reco-rating">${ratingText}</span></div>
          <div class="reco-tags">${tagsHTML}</div>
          <button class="reco-open-btn" data-id="${dest.id}">${t("explore")}</button>
        </div>
      </div>`;
  }).join("");
}

document.getElementById("recoList").addEventListener("click", (e) => {
  const btn = e.target.closest(".reco-open-btn");
  if (btn) openModal(parseInt(btn.dataset.id));
});

// ── Utils ─────────────────────────────────────────────────────────────────────

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Init ──────────────────────────────────────────────────────────────────────

preloadRatings();
applyStrings();
renderFeatured();
renderSections("all");
renderInsights();
