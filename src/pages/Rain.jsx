import { useWeather } from "../context/WeatherContext";

export default function Rain() {
  const { rainOutlook, currentWeather, loading } = useWeather();
  const maxMm = Math.max(...rainOutlook.timeline.map((t) => t.mm), 0.1);

  return (
    <div className={`animate-rise ${loading ? "opacity-75" : ""}`}>
      <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3f6f9a] via-[#6a9fc4] to-[#b7d7eb] px-6 py-11 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 h-20 w-px bg-white/75 animate-rain"
              style={{
                left: `${3 + i * 3.8}%`,
                animationDelay: `${(i % 9) * 0.11}s`,
                animationDuration: `${0.8 + (i % 5) * 0.16}s`,
              }}
            />
          ))}
          <div className="absolute -left-10 bottom-0 h-32 w-64 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute right-0 top-8 h-40 w-56 rounded-full bg-white/15 blur-2xl animate-drift" />
        </div>

        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/75">Precipitation</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Rain desk for {currentWeather.city}
          </h1>
          <p className="mt-3 max-w-md text-base text-white/85">{rainOutlook.intensity}</p>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-7 sm:gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/65 sm:text-xs">
                Next slot
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                {rainOutlook.nextHourChance}
                <span className="text-xl">%</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/65 sm:text-xs">
                Near term
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                {rainOutlook.next6hChance}
                <span className="text-xl">%</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/65 sm:text-xs">
                Total
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                {rainOutlook.todayTotalMm}
                <span className="text-lg font-semibold"> mm</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-12 animate-rise-delay">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Hourly rainfall
        </h2>
        <p className="mt-1 text-sm text-ink-soft">Expected millimeters and chance ahead.</p>

        <div
          className="glass-panel stagger mt-7 flex items-end justify-between gap-1.5 rounded-[1.5rem] px-3 pb-4 pt-6 sm:gap-3 sm:px-6"
          style={{ height: "14rem" }}
        >
          {rainOutlook.timeline.map((slot) => {
            const height = Math.max((slot.mm / maxMm) * 100, 6);
            return (
              <div key={slot.hour} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-bold text-rain sm:text-xs">{slot.chance}%</span>
                <div
                  className="relative w-full max-w-[2.75rem] overflow-hidden rounded-t-xl bg-gradient-to-t from-rain via-[#5f92bd] to-[#9ec9e6] shadow-[0_0_18px_rgb(69_120_168/0.35)] transition-all duration-700"
                  style={{ height: `${height}%` }}
                  title={`${slot.mm} mm`}
                >
                  <span className="absolute inset-x-0 top-0 h-1/3 bg-white/25 animate-shimmer" />
                </div>
                <span className="text-[10px] font-semibold text-mist sm:text-xs">{slot.hour}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14 animate-rise-late">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Watchouts</h2>
        <ul className="mt-6 space-y-0 overflow-hidden rounded-[1.35rem] bg-white/45 ring-1 ring-ink/5">
          {rainOutlook.alerts.map((alert, i) => (
            <li
              key={alert.title}
              className={[
                "grid gap-1 px-5 py-5 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-8 sm:px-6",
                i > 0 ? "border-t border-ink/8" : "",
              ].join(" ")}
            >
              <p className="font-display text-base font-bold text-ink">{alert.title}</p>
              <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{alert.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
