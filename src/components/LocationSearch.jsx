import { QUICK_LOCATIONS } from "../data/locations";
import { useWeather } from "../context/WeatherContext";

export default function LocationSearch() {
  const {
    query,
    setQuery,
    searchCity,
    useMyLocation,
    loading,
    locating,
    error,
    currentWeather,
    source,
  } = useWeather();

  function handleSubmit(event) {
    event.preventDefault();
    searchCity(query);
  }

  const statusText = loading
    ? "Fetching live weather…"
    : `Showing ${currentWeather.city}${currentWeather.region ? `, ${currentWeather.region}` : ""}${
        source === "gps"
          ? " · from your location"
          : source === "search"
            ? " · live OpenWeather data"
            : source === "loading"
              ? " · fetching…"
              : " · demo data"
      }`;

  return (
    <section className="mb-7 animate-rise" aria-label="Choose location">
      <form
        onSubmit={handleSubmit}
        className="glass-panel flex flex-col gap-3 rounded-[1.35rem] p-2.5 sm:flex-row sm:items-center sm:p-3"
      >
        <label className="sr-only" htmlFor="location-search">
          Search city
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl bg-white/80 px-3.5 py-2.5 ring-1 ring-ink/6">
          <svg className="h-5 w-5 shrink-0 text-cyan-deep" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id="location-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city or area…"
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-mist"
            autoComplete="off"
          />
          {loading && (
            <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-cyan/30 border-t-cyan-deep" />
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-2xl bg-ink px-5 py-2.5 text-sm font-semibold text-cloud transition hover:bg-ink/90 disabled:opacity-70 sm:flex-none"
          >
            {loading && !locating ? "Searching…" : "Search"}
          </button>
          <button
            type="button"
            onClick={useMyLocation}
            disabled={loading || locating}
            title="Use my current location"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-cyan to-cyan-deep px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgb(8_122_144/0.28)] transition hover:brightness-105 disabled:opacity-70 sm:flex-none"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {locating ? "Locating…" : "Near me"}
          </button>
        </div>
      </form>

      <div className="mt-3.5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="flex shrink-0 items-center text-[11px] font-bold uppercase tracking-[0.16em] text-mist">
          Areas
        </span>
        {QUICK_LOCATIONS.map((city) => {
          const active = currentWeather.city.toLowerCase() === city.toLowerCase();
          return (
            <button
              key={city}
              type="button"
              onClick={() => searchCity(city)}
              disabled={loading}
              className={[
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-ink text-cloud shadow-sm"
                  : "bg-white/50 text-ink-soft ring-1 ring-ink/8 hover:bg-white hover:text-ink hover:shadow-sm",
              ].join(" ")}
            >
              {city}
            </button>
          );
        })}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span
          className={[
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            source === "search" || source === "gps"
              ? "bg-cyan/15 text-cyan-deep"
              : "bg-white/60 text-mist",
          ].join(" ")}
        >
          <span
            className={[
              "h-1.5 w-1.5 rounded-full",
              loading ? "animate-pulse bg-cyan" : source === "mock" ? "bg-mist" : "bg-cyan-deep",
            ].join(" ")}
          />
          {statusText}
        </span>
      </div>

      {error && (
        <p className="mt-2 rounded-xl bg-[#fff4e5] px-3 py-2 text-sm font-medium text-[#9a5b12]" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
