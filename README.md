# Nimbus — Weather Desk

React + Vite + Tailwind CSS weather UI. Pages use mock data; the **Connect API** page is ready for your OpenWeather key.

## Run

```bash
cd weather-app
npm install
npm run dev
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Current conditions hero + hourly strip |
| `/forecast` | 7-day outlook |
| `/rain` | Precipitation timeline |
| `/connect` | API key setup + live test call |

## Connect a live API

1. Copy `.env.example` → `.env`
2. Set `VITE_WEATHER_API_KEY=your_openweather_key`
3. Restart the dev server
4. Open `/connect` and run **Test API call**

Service: `src/services/weatherApi.js`  
Mock UI data: `src/data/mockWeather.js`
