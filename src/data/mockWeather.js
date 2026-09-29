/** Static demo data for UI. Swap with live API responses later. */

export const currentWeather = {
  city: "Bengaluru",
  region: "Karnataka, IN",
  updatedAt: "Updated 12 min ago",
  temp: 27,
  feelsLike: 29,
  condition: "Partly cloudy",
  high: 31,
  low: 22,
  humidity: 64,
  wind: 14,
  windUnit: "km/h",
  visibility: 10,
  pressure: 1012,
  uv: 6,
  sunrise: "06:12",
  sunset: "18:24",
  icon: "sun-cloud",
  uvLabel: "Moderate",
};

export const hourlyForecast = [
  { time: "Now", temp: 27, icon: "sun-cloud", rain: 10 },
  { time: "2 PM", temp: 29, icon: "sun", rain: 5 },
  { time: "3 PM", temp: 30, icon: "sun", rain: 5 },
  { time: "4 PM", temp: 29, icon: "sun-cloud", rain: 15 },
  { time: "5 PM", temp: 27, icon: "cloud", rain: 35 },
  { time: "6 PM", temp: 25, icon: "rain", rain: 60 },
  { time: "7 PM", temp: 24, icon: "rain", rain: 55 },
  { time: "8 PM", temp: 23, icon: "cloud", rain: 25 },
];

export const dailyForecast = [
  { day: "Today", high: 31, low: 22, icon: "sun-cloud", rainChance: 40, summary: "Sun breaks, evening showers" },
  { day: "Wed", high: 29, low: 21, icon: "rain", rainChance: 75, summary: "Steady rain through afternoon" },
  { day: "Thu", high: 28, low: 20, icon: "rain", rainChance: 80, summary: "Cloudy with thunderstorms" },
  { day: "Fri", high: 30, low: 21, icon: "sun-cloud", rainChance: 30, summary: "Clearing after morning mist" },
  { day: "Sat", high: 32, low: 22, icon: "sun", rainChance: 10, summary: "Bright and warm" },
  { day: "Sun", high: 31, low: 22, icon: "sun", rainChance: 15, summary: "Mostly sunny skies" },
  { day: "Mon", high: 30, low: 21, icon: "cloud", rainChance: 35, summary: "Scattered clouds" },
];

export const rainOutlook = {
  nextHourChance: 18,
  next6hChance: 55,
  todayTotalMm: 4.2,
  intensity: "Light showers expected after 5 PM",
  timeline: [
    { hour: "1 PM", mm: 0, chance: 5 },
    { hour: "2 PM", mm: 0, chance: 8 },
    { hour: "3 PM", mm: 0.1, chance: 15 },
    { hour: "4 PM", mm: 0.4, chance: 35 },
    { hour: "5 PM", mm: 1.2, chance: 60 },
    { hour: "6 PM", mm: 1.8, chance: 72 },
    { hour: "7 PM", mm: 0.6, chance: 48 },
    { hour: "8 PM", mm: 0.1, chance: 22 },
  ],
  alerts: [
    { title: "Evening shower window", detail: "Best chance of rain between 5–7 PM local time." },
    { title: "Road mist possible", detail: "Light mist after rain may reduce visibility briefly." },
  ],
};
