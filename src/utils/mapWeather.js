function mapIcon(weather = {}) {
  const id = weather.id ?? 800;
  const main = (weather.main || "").toLowerCase();

  if (id >= 200 && id < 600) return "rain";
  if (main.includes("rain") || main.includes("drizzle") || main.includes("thunder")) return "rain";
  if (id === 800) return "sun";
  if (id > 800 && id <= 802) return "sun-cloud";
  return "cloud";
}

function formatTime(unix, timezoneOffset = 0) {
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}

function formatHourLabel(unix, timezoneOffset = 0, index = 0) {
  if (index === 0) return "Now";
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  });
}

function dayLabel(unix, timezoneOffset = 0, index = 0) {
  if (index === 0) return "Today";
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

function uvLabel(temp, clouds) {
  if (clouds > 70) return { uv: 3, label: "Low" };
  if (temp >= 32) return { uv: 8, label: "Very high" };
  if (temp >= 28) return { uv: 6, label: "Moderate" };
  return { uv: 4, label: "Moderate" };
}

function buildDaily(list, timezone) {
  const byDay = new Map();

  for (const item of list) {
    const key = new Date((item.dt + timezone) * 1000).toISOString().slice(0, 10);
    if (!byDay.has(key)) {
      byDay.set(key, {
        temps: [],
        rains: [],
        icons: [],
        summaries: [],
        dt: item.dt,
      });
    }
    const day = byDay.get(key);
    day.temps.push(item.main.temp);
    day.rains.push(Math.round((item.pop || 0) * 100));
    day.icons.push(mapIcon(item.weather?.[0]));
    day.summaries.push(item.weather?.[0]?.description || "");
  }

  return [...byDay.values()].slice(0, 7).map((day, index) => {
    const rainChance = Math.max(...day.rains, 0);
    const icon =
      day.icons.find((i) => i === "rain") ||
      day.icons.find((i) => i === "cloud") ||
      day.icons[Math.floor(day.icons.length / 2)] ||
      "sun-cloud";
    const summary =
      day.summaries.find(Boolean)?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Varied conditions";

    return {
      day: dayLabel(day.dt, timezone, index),
      high: Math.round(Math.max(...day.temps)),
      low: Math.round(Math.min(...day.temps)),
      icon,
      rainChance,
      summary,
    };
  });
}

function buildRainOutlook(list, timezone) {
  const next8 = list.slice(0, 8);
  const nextHourChance = Math.round((next8[0]?.pop || 0) * 100);
  const next6hChance = Math.round(
    Math.max(...next8.slice(0, 2).map((i) => i.pop || 0), 0) * 100,
  );
  const todayTotalMm = Number(
    next8.reduce((sum, item) => sum + (item.rain?.["3h"] || item.snow?.["3h"] || 0), 0).toFixed(1),
  );

  const peak = next8.reduce(
    (best, item) => ((item.pop || 0) > (best.pop || 0) ? item : best),
    next8[0] || { pop: 0, dt: Date.now() / 1000 },
  );

  const peakHour = formatHourLabel(peak.dt, timezone, 1);
  const intensity =
    nextHourChance >= 60
      ? "Rain is likely in the next few hours."
      : next6hChance >= 40
        ? `Showers most likely around ${peakHour}.`
        : "Only light precipitation expected in the outlook window.";

  const timeline = next8.map((item, index) => ({
    hour: formatHourLabel(item.dt, timezone, index),
    mm: Number((item.rain?.["3h"] || item.snow?.["3h"] || 0).toFixed(1)),
    chance: Math.round((item.pop || 0) * 100),
  }));

  const alerts = [];
  if (next6hChance >= 50) {
    alerts.push({
      title: "Shower window",
      detail: `Best chance of rain near ${peakHour} local time.`,
    });
  }
  if (todayTotalMm >= 3) {
    alerts.push({
      title: "Wet roads possible",
      detail: `Around ${todayTotalMm} mm may fall in the next hours — allow extra travel time.`,
    });
  }
  if (!alerts.length) {
    alerts.push({
      title: "Mostly dry spell",
      detail: "No strong rain signal in the near-term forecast.",
    });
  }

  return { nextHourChance, next6hChance, todayTotalMm, intensity, timeline, alerts };
}

/** Map OpenWeather current + forecast payloads into UI-ready weather data. */
export function mapWeatherResponse({ current, forecast }) {
  const timezone = current.timezone || 0;
  const weather = current.weather?.[0] || {};
  const { uv, label: uvLabelText } = uvLabel(current.main.temp, current.clouds?.all ?? 50);

  const tempsToday = (forecast.list || [])
    .slice(0, 8)
    .map((item) => item.main.temp);
  const high = Math.round(Math.max(current.main.temp_max, ...tempsToday, current.main.temp));
  const low = Math.round(Math.min(current.main.temp_min, ...tempsToday, current.main.temp));

  const currentWeather = {
    city: current.name,
    region: current.sys?.country || "",
    updatedAt: `Updated ${formatTime(current.dt, timezone)}`,
    temp: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    condition: (weather.description || "Clear").replace(/\b\w/g, (c) => c.toUpperCase()),
    high,
    low,
    humidity: current.main.humidity,
    wind: Math.round((current.wind?.speed || 0) * 3.6),
    windUnit: "km/h",
    visibility: Math.round((current.visibility || 10000) / 1000),
    pressure: current.main.pressure,
    uv,
    uvLabel: uvLabelText,
    sunrise: formatTime(current.sys.sunrise, timezone),
    sunset: formatTime(current.sys.sunset, timezone),
    icon: mapIcon(weather),
  };

  const hourlyForecast = (forecast.list || []).slice(0, 8).map((item, index) => ({
    time: formatHourLabel(item.dt, timezone, index),
    temp: Math.round(item.main.temp),
    icon: mapIcon(item.weather?.[0]),
    rain: Math.round((item.pop || 0) * 100),
  }));

  const dailyForecast = buildDaily(forecast.list || [], timezone);
  const rainOutlook = buildRainOutlook(forecast.list || [], timezone);

  return { currentWeather, hourlyForecast, dailyForecast, rainOutlook };
}
