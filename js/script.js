
// Code 16 - Planet Explorer script
// Add your code ONLY under your own marker. Don't edit other markers.


// ===== SETUP: Olumide (4.1) =====
const API_URL = "https://anurella.github.io/json/planet.json";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("planet-search");
const planetCard = document.getElementById("planet-card");
const planetTableBody = document.getElementById("planet-table-body");
const loadingState = document.getElementById("loading-state");

let planets = [];


// ===== LOADING STATE: Olumide (4.2) =====
function showLoading() { loadingState.classList.remove("is-hidden"); }
function hideLoading() { loadingState.classList.add("is-hidden"); }


// ===== ERROR STATE and RETRY: AbdulRasheed (4.3, 4.4) =====
const errorState = document.getElementById("error-state");
const retryButton = document.getElementById("retry-button");

function showError() { errorState.classList.remove("is-hidden"); }
function hideError() { errorState.classList.add("is-hidden"); }

retryButton.addEventListener("click", fetchPlanets);


// ===== FETCH PLANETS: Olumide (4.1) =====
async function fetchPlanets() {
  showLoading();
  hideError();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("Planet data is unavailable.");

    planets = data;
    renderPlanetTable(planets);
    displayPlanet(planets.find((p) => p.name.toLowerCase() === "earth") || planets[0]);
  } catch (error) {
    console.error("Planet API error:", error);
    showError();
  } finally {
    hideLoading();
  }
}


// ===== RENDER TABLE: Olumide (4.7) =====
function groupOf(type = "") {
  const t = type.toLowerCase();
  if (t.includes("terrestrial")) return "terrestrial";
  if (t.includes("gas")) return "gas";
  if (t.includes("ice")) return "ice";
  if (t.includes("dwarf")) return "dwarf";
  return "other";
}

const formatMass = (m) => m.toLocaleString(undefined, { maximumFractionDigits: 7 });

function planetCells(planet, leading = "") {
  return `${leading}
    <td><button class="table-planet-button" type="button" data-planet-name="${planet.name}" aria-label="View information for ${planet.name}">${planet.name}</button></td>
    <td class="col-mass">${formatMass(planet.mass)}</td>
    <td>${planet.diameter.toLocaleString()}</td>`;
}

function renderPlanetTable(planetList) {
  const by = { terrestrial: [], gas: [], ice: [], dwarf: [] };
  planetList.forEach((p) => { const g = groupOf(p.type); if (by[g]) by[g].push(p); });

  const rows = [];
  by.terrestrial.forEach((p, i) => rows.push(`<tr>${planetCells(p,
    i === 0 ? `<td class="group" colspan="2" rowspan="${by.terrestrial.length}">Terrestrial Planets</td>` : "")}</tr>`));

  const jovian = by.gas.length + by.ice.length;
  by.gas.forEach((p, i) => rows.push(`<tr>${planetCells(p,
    (i === 0 ? `<td class="group" rowspan="${jovian}">Jovian Planets</td><td class="group" rowspan="${by.gas.length}">Gas Giants</td>` : ""))}</tr>`));
  by.ice.forEach((p, i) => rows.push(`<tr>${planetCells(p,
    i === 0 ? `<td class="group" rowspan="${by.ice.length}">Ice Giants</td>` : "")}</tr>`));

  by.dwarf.forEach((p, i) => rows.push(`<tr>${planetCells(p,
    i === 0 ? `<td class="group" colspan="2" rowspan="${by.dwarf.length}">Dwarf Planets</td>` : "")}</tr>`));

  planetTableBody.innerHTML = rows.join("");
  attachTableClicks();
}


// ===== TABLE NAMES TO CARD: Olumide (4.10) =====
function attachTableClicks() {
  document.querySelectorAll(".table-planet-button").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = planets.find((p) => p.name === button.dataset.planetName);
      if (selected) {
        displayPlanet(selected);
        searchInput.value = selected.name;
        setSearchMessage("");
        planetCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}


// ===== RENDER CARD: Olumide (4.8) =====
const icons = {
  temp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 14.5V5a2.5 2.5 0 0 1 5 0v9.5a4.2 4.2 0 1 1-5 0Z"/><circle cx="19" cy="4.5" r="1.6" stroke-width="1.6"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z"/></svg>',
  size: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9.5"/></svg>',
  dist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9.5" stroke-width="3" stroke-dasharray="3 4.2"/><circle cx="12" cy="12" r="6.5" stroke-width="2"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>'
};

function displayPlanet(planet) {
  planetCard.className = "planet-card";
  planetCard.innerHTML = `
    <img class="planet-card-image" src="${planet.image}" alt="${planet.name}, a ${planet.type} planet" />
    <div class="planet-card-info">
      <h3>${planet.name}</h3>
      <p class="planet-type">${planet.type}</p>
    </div>
    <p class="planet-description">${planet.description}</p>
    <dl class="planet-primary">
      <div><dt>Gravity</dt><dd>${planet.gravity}</dd></div>
      <div><dt>Mass</dt><dd>${formatMass(planet.mass)}</dd></div>
      <div><dt>Period</dt><dd>${planet.period.toLocaleString()}</dd></div>
    </dl>
    <ul class="planet-extra">
      <li title="Temperature (K)">${icons.temp}<span>${planet.temperature}</span></li>
      <li title="Moons">${icons.moon}<span>${planet.moons}</span></li>
      <li title="Diameter (km)">${icons.size}<span>${planet.diameter.toLocaleString(undefined, { useGrouping: false })}</span></li>
      <li title="Distance from Sun (million km)">${icons.dist}<span>${planet.distanceFromSun.toLocaleString()}</span></li>
    </ul>`;
}


// ===== SEARCH: Olumide (4.9) =====
function handleSearch(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!searchTerm) {
    handleEmptySearch();
    return;
  }

  const match = planets.find((p) => p.name.toLowerCase() === searchTerm);
  if (!match) {
    handleInvalidSearch();
    return;
  }

  handleValidSearch(match);
}

function handleValidSearch(match) {
  setSearchMessage("");
  displayPlanet(match);
  planetCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

searchForm.addEventListener("submit", handleSearch);


// ===== EMPTY SEARCH: AbdulRasheed (4.6) =====
const searchMessage = document.getElementById("search-message");

function setSearchMessage(message) {
  searchMessage.textContent = message;
}

function handleEmptySearch() {
  setSearchMessage("Enter a planet name");
  searchInput.focus();
}

searchInput.addEventListener("input", () => setSearchMessage(""));


// ===== INVALID SEARCH: AbdulRasheed (4.5) =====
function displayNoResults() {
  planetCard.className = "planet-card no-results";
  planetCard.innerHTML = `
    <h3>No results found!</h3>
    <p>We couldn’t find any planet matching your search. Please double-check the name and try again.</p>`;
}

function handleInvalidSearch() {
  setSearchMessage("No results");
  displayNoResults();
}


// ===== THEME TOGGLE: AbdulRasheed (4.11) =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-toggle-text");

const themeIcons = {
  sun: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><circle cx="12" cy="12" r="4.5" stroke="none"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" stroke-width="2" stroke-linecap="round"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z"/></svg>'
};

function setTheme(theme) {
  document.body.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeIcon.innerHTML = isDark ? themeIcons.sun : themeIcons.moon;
  themeText.textContent = isDark ? "LIGHT" : "DARK";
  try { localStorage.setItem(THEME_KEY, theme); } catch (error) { /* storage not available */ }
}

themeToggle.addEventListener("click", () => {
  setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
});


// ===== SAVE THEME: AbdulRasheed (4.12) =====
const THEME_KEY = "planet-explorer-theme";

function initializeTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (error) { /* storage not available */ }
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
    return;
  }
  setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}


// ===== START-UP, AbdulRasheed (4.12) =====
initializeTheme();


// ===== START-UP, Olumide (4.1) =====
fetchPlanets();
