import today from "./templates/today.js";
import tomorrow from "./templates/tomorrow.js";
import nextWeek from "./templates/next-week.js";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const searchIcon = $(".search-icon");
const searchInput = $("input");
const articles = $$("article");
const section = $("section");
const main = $("main");
let isLoading;
let loadingTimeout;

section.style.display = "none";

async function getWeather(cityName) {
  try {
    const [weather, forecast] = await Promise.all([
      fetch(`http://localhost:3000/weather?city=${cityName}`).then((res) =>
        res.json()
      ),

      fetch(`http://localhost:3000/forecast?city=${cityName}`).then((res) =>
        res.json()
      ),
    ]);

    section.style.display = "grid";
    showWeatherData(weather, forecast);
  } catch (error) {
    console.error(error);
  }
}

// function getWeatherByGeolocation() {
//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const { latitude, longitude } = position.coords;
//       try {
//         const response = await fetch(
//           `http://localhost:3000/geolocation?latitude=${latitude}&longitude=${longitude}`
//         );
//         const data = await response.json();
//         showWeatherData(data);
//         section.style.display = "grid";
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     (error) => {
//       console.error("Error getting location:", error);
//       const errorMessage = document.createElement("p");
//       errorMessage.classList.add("error-message");
//       errorMessage.textContent = "I could not get your location 🥺";
//       main.appendChild(errorMessage);
//       setTimeout(() => {
//         main.removeChild(errorMessage);
//       }, 3000);
//     }
//   );
// }

function showWeatherData(weatherData, forecastData) {
  if (!isLoading) {
    const skeletonTemplate = `<div class="skeleton-container">
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    </div>`;

    section.appendChild(skeletonTemplate);
    console.log("loading");
  }

  // isLoading = true;

  // if (loadingTimeout) {
  //   clearTimeout(loadingTimeout);
  // }

  loadingTimeout = setTimeout(() => {
    try {
      articles[0].innerHTML = today(weatherData);
      articles[1].innerHTML = tomorrow(forecastData);
      articles[2].innerHTML = nextWeek(forecastData);

      articles[3].innerHTML = `<div class="weather-data">
    <h2 class="city">${weatherData.name}</h2>
    </div>`;
      articles[4].innerHTML = `<img class="flag" width="60" src="https://flagcdn.com/w320/${weatherData.sys.country.toLowerCase()}.png" alt="${
        weatherData.sys.country
      }" />`;
      isLoading = false;
    } catch (error) {
      console.error(`Error loading weather city: ${error}`);
    }
  }, 3000);
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather(searchInput.value.trim());
  }
});

// document.addEventListener("DOMContentLoaded", getWeatherByGeolocation);
document.addEventListener("DOMContentLoaded", getWeather("London"));
