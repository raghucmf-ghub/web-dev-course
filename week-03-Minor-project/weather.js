const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const weatherMessage = document.querySelector("#weather-message");
const weatherResult = document.querySelector("#weather-result");

const getWeatherText = (code) => {
  const weatherTypes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm"
  };

  return weatherTypes[code] || "Weather information unavailable";
};

const searchWeather = async (city) => {
  weatherMessage.textContent = "Loading...";
  weatherResult.hidden = true;

  try {
   
    const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const cityResponse = await fetch(cityUrl);

    if (!cityResponse.ok) {
      throw new Error("Could not search for this city.");
    }

    const cityData = await cityResponse.json();
    const place = cityData.results?.[0];

    if (!place) {
      throw new Error("City not found. Please check the city name.");
    }

   
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Could not get weather information.");
    }

    const weatherData = await weatherResponse.json();
    const { temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code } = weatherData.current;

    weatherResult.innerHTML = `
      <h2>${place.name}, ${place.country || ""}</h2>
      <p class="weather-main">${temperature_2m} °C</p>
      <p>${getWeatherText(weather_code)}</p>
      <div class="weather-details">
        <p><strong>Humidity:</strong> ${relative_humidity_2m}%</p>
        <p><strong>Wind speed:</strong> ${wind_speed_10m} km/h</p>
      </div>
    `;
    weatherResult.hidden = false;
    weatherMessage.textContent = "";
  } catch (error) {
    weatherMessage.textContent = error.message || "Something went wrong. Please try again.";
  }
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    searchWeather(city);
  }
});
