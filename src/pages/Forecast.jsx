import WeatherIcon from "../components/WeatherIcon";
import { useWeather } from "../context/WeatherContext";

export default function Forecast() {
  const { dailyForecast, currentWeather, loading } = useWeather();

  return (
    <div className={`animate-rise ${loading ? "opacity-75" : ""}`}>
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#8fbee0] via-[#c5e2f3] to-[#eaf5fb] px-6 py-10 sm:px-10">
        <div className="pointer-events-none absolute -right-8 top-0 h-40 w-64 rounded-full bg-white/50 blur-2xl animate-drift" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-24 w-48 rounded-full bg-white/40 blur-xl animate-drift-slow" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-deep">Outlook</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Week ahead for {currentWeather.city}
          </h1>
          <p className="mt-3 max-w-lg text-ink-soft">
            Highs, lows, and rain chances shaped by the live forecast for this place.
          </p>
        </div>
      </header>

      <ol className="stagger mt-8 divide-y divide-ink/8 overflow-hidden rounded-[1.5rem] bg-white/45 ring-1 ring-ink/5 backdrop-blur-sm">
        {dailyForecast.map((day, index) => {
          const span = Math.max(day.high - day.low, 1);
          return (
            <li
              key={`${day.day}-${index}`}
              className="grid grid-cols-[4.25rem_2.75rem_1fr] items-center gap-3 px-4 py-4 transition hover:bg-white/55 sm:grid-cols-[5.5rem_3rem_minmax(0,1fr)_7rem_7.5rem] sm:gap-5 sm:px-6 sm:py-5"
            >
              <span className="font-display text-base font-bold text-ink">{day.day}</span>
              <WeatherIcon type={day.icon} className="h-11 w-11" />

              <div className="min-w-0 sm:pr-2">
                <p className="truncate text-sm text-ink-soft">{day.summary}</p>
                <div className="mt-2 flex items-center gap-2 sm:hidden">
                  <span className="font-display text-sm font-bold text-ink">{day.high}°</span>
                  <span className="text-sm text-mist">{day.low}°</span>
                  <span className="ml-auto text-xs font-semibold text-rain">{day.rainChance}%</span>
                </div>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <span className="w-8 text-right font-display text-sm font-bold text-mist">{day.low}°</span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-sky-deep/20">
                  <div
                    className="absolute inset-y-0 rounded-full bg-gradient-to-r from-sky-deep to-sun/80"
                    style={{
                      left: "8%",
                      width: `${Math.min(84, 28 + span * 4)}%`,
                    }}
                  />
                </div>
                <span className="w-8 font-display text-sm font-bold text-ink">{day.high}°</span>
              </div>

              <div className="col-span-3 hidden items-center gap-3 sm:col-span-1 sm:flex">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sky-deep/20">
                  <div
                    className="h-full rounded-full bg-rain transition-all duration-700"
                    style={{ width: `${day.rainChance}%` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-xs font-semibold text-rain">
                  {day.rainChance}% rain
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
