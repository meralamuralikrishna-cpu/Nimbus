const API_BASE = "https://api.openweathermap.org/data/2.5";

export function getApiKey() {
  return import.meta.env.VITE_WEATHER_API_KEY || "";
}

export function isApiConfigured() {
  return Boolean(getApiKey());
}

async function fetchWeather(params) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing VITE_WEATHER_API_KEY. Add it in .env to connect live weather.");
  }

  const query = new URLSearchParams({ ...params, appid: apiKey, units: "metric" });

  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${API_BASE}/weather?${query}`),
    fetch(`${API_BASE}/forecast?${query}`),
  ]);

  const current = await currentRes.json();
  const forecast = await forecastRes.json();

  if (!currentRes.ok) {
    throw new Error(current.message || "Could not fetch current weather.");
  }
  if (!forecastRes.ok) {
    throw new Error(forecast.message || "Could not fetch forecast.");
  }

  return { current, forecast };
}

export async function fetchWeatherByCity(city) {
  return fetchWeather({ q: city });
}

export async function fetchWeatherByCoords(lat, lon) {
  return fetchWeather({ lat: String(lat), lon: String(lon) });
}
