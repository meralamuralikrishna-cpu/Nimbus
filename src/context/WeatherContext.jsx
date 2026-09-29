import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  currentWeather as mockCurrent,
  hourlyForecast as mockHourly,
  dailyForecast as mockDaily,
  rainOutlook as mockRain,
} from "../data/mockWeather";
import { DEFAULT_CITY } from "../data/locations";
import { fetchWeatherByCity, fetchWeatherByCoords, isApiConfigured } from "../services/weatherApi";
import { mapWeatherResponse } from "../utils/mapWeather";

const WeatherContext = createContext(null);

const INITIAL = {
  currentWeather: mockCurrent,
  hourlyForecast: mockHourly,
  dailyForecast: mockDaily,
  rainOutlook: mockRain,
};

export function WeatherProvider({ children }) {
  const configured = isApiConfigured();
  const [data, setData] = useState(INITIAL);
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(configured);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState(configured ? "loading" : "mock");
  const booted = useRef(false);

  const applyResponse = useCallback((raw, label) => {
    const mapped = mapWeatherResponse(raw);
    setData(mapped);
    setQuery(mapped.currentWeather.city);
    setSource(label);
    setError("");
  }, []);

  const searchCity = useCallback(
    async (city) => {
      const name = city.trim();
      if (!name) {
        setError("Enter a city or place name.");
        return;
      }
      if (!isApiConfigured()) {
        setError("Add your API key on the Connect API page first.");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const raw = await fetchWeatherByCity(name);
        applyResponse(raw, "search");
      } catch (err) {
        setError(err.message || "Could not find that place.");
      } finally {
        setLoading(false);
      }
    },
    [applyResponse],
  );

  const useMyLocation = useCallback(() => {
    if (!isApiConfigured()) {
      setError("Add your API key on the Connect API page first.");
      return;
    }
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setLocating(true);
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const raw = await fetchWeatherByCoords(latitude, longitude);
          applyResponse(raw, "gps");
        } catch (err) {
          setError(err.message || "Could not load weather for your location.");
        } finally {
          setLocating(false);
          setLoading(false);
        }
      },
      (geoError) => {
        setLocating(false);
        setLoading(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError("Location permission denied. Allow access or search a city instead.");
        } else {
          setError("Could not read your location. Try searching a city.");
        }
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, [applyResponse]);

  // Fetch live weather as soon as the app opens
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    if (!isApiConfigured()) return;
    searchCity(DEFAULT_CITY);
  }, [searchCity]);

  const value = useMemo(
    () => ({
      ...data,
      query,
      setQuery,
      loading,
      locating,
      error,
      source,
      searchCity,
      useMyLocation,
    }),
    [data, query, loading, locating, error, source, searchCity, useMyLocation],
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used inside WeatherProvider");
  return ctx;
}
