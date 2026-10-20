

/* ===== START-UP: Skipper (4.1) ===== */
fetchPlanets();


/* ===== SETUP: Skipper (4.1) ===== */
const API_URL = "https://anurella.github.io/json/planet.json";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("planet-search");
const planetCard = document.getElementById("planet-card");
const planetTableBody = document.getElementById("planet-table-body");
const loadingState = document.getElementById("loading-state");

let planets = [];

/* ===== FETCH PLANETS: Skipper (4.1) ===== */
async function fetchPlanets() {
  showLoading();
  hideError();

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("Planet data is unavailable.");

    planets = data;
    console.log(planets);
  } catch (error) {
    console.error("Planet API error:", error);
    showError();
  } finally {
    hideLoading();
  }
}

/* ===== LOADING STATE: Skipper (4.2) ===== */
function showLoading() { loadingState.classList.remove("is-hidden"); }
function hideLoading() { loadingState.classList.add("is-hidden"); }
