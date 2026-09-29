import { Link } from "react-router-dom";
import WeatherIcon from "../components/WeatherIcon";
import SkyOrnaments from "../components/SkyOrnaments";
import { useWeather } from "../context/WeatherContext";

function heroMood(icon) {
  if (icon === "rain") return "rain";
  if (icon === "sun") return "sun";
  return "cloud";
}

function heroGradient(mood) {
  if (mood === "rain") return "from-[#5f8fb5] via-[#87b6d4] to-[#d2e7f4]";
  if (mood === "sun") return "from-[#7ebfe8] via-[#b5ddf4] to-[#eef7fc]";
  return "from-[#8fc4e3] via-[#c2e1f3] to-[#eaf5fb]";
}

export default function Home() {
  const { currentWeather, hourlyForecast, loading } = useWeather();
  const mood = heroMood(currentWeather.icon);
  const rangeSpan = Math.max(currentWeather.high - currentWeather.low, 1);
  const feelsPos = Math.min(
    100,
    Math.max(0, ((currentWeather.feelsLike - currentWeather.low) / rangeSpan) * 100),
  );

  const stats = [
    { label: "Humidity", value: `${currentWeather.humidity}%`, hint: "Air moisture" },
    { label: "Wind", value: `${currentWeather.wind}`, unit: currentWeather.windUnit, hint: "Surface breeze" },
    { label: "Visibility", value: `${currentWeather.visibility}`, unit: "km", hint: "How far you see" },
    { label: "Pressure", value: `${currentWeather.pressure}`, unit: "hPa", hint: "Atmosphere" },
  ];

  return (
    <div className={loading ? "opacity-75 transition-opacity duration-300" : "transition-opacity duration-300"}>
      <section
        className={`relative min-h-[min(78vh,720px)] animate-rise overflow-hidden rounded-[2rem] bg-gradient-to-br ${heroGradient(mood)} px-6 py-10 sm:rounded-[2.25rem] sm:px-12 sm:py-14`}
      >
        <SkyOrnaments mood={mood} />

        <div className="relative z-10 flex min-h-[58vh] flex-col justify-between gap-14">
          <div className="max-w-xl">
            <p className="font-display text-sm font-bold uppercase tracking-[0.28em] text-ink/70">
              Nimbus
            </p>
            <h1 className="mt-4 font-display text-[2.65rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              The sky,
              <br />
              <span className="text-ink/75">at a glance.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              Live conditions for {currentWeather.city} — search, tap an area, or use Near me.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/forecast"
                className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-cloud shadow-[0_10px_28px_rgb(12_25_41/0.22)] transition hover:bg-ink/90"
              >
                See forecast
              </Link>
              <Link
                to="/rain"
                className="rounded-2xl bg-white/65 px-5 py-3 text-sm font-semibold text-ink ring-1 ring-white/50 backdrop-blur-sm transition hover:bg-white"
              >
                Rain outlook
              </Link>
            </div>
          </div>

          <div className="animate-rise-delay sm:self-end sm:text-right">
            <p className="text-sm font-semibold tracking-wide text-ink/65">
              {currentWeather.city}
              {currentWeather.region ? ` · ${currentWeather.region}` : ""}
            </p>
            <div className="mt-2 flex items-end gap-3 sm:justify-end">
              <WeatherIcon
                type={currentWeather.icon || "sun-cloud"}
                className="h-22 w-22 h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28"
                animated
              />
              <p className="temp-glow font-display text-8xl font-extrabold leading-none tracking-tighter text-ink sm:text-[7.5rem]">
                {currentWeather.temp}
                <span className="align-top text-4xl font-bold sm:text-5xl">°</span>
              </p>
            </div>
            <p className="mt-2 text-xl font-semibold text-ink">{currentWeather.condition}</p>
            <p className="mt-1 text-sm text-ink/55">
              Feels {currentWeather.feelsLike}° · {currentWeather.updatedAt}
            </p>

            <div className="mt-5 max-w-xs sm:ml-auto">
              <div className="mb-1.5 flex justify-between text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                <span>L {currentWeather.low}°</span>
                <span>H {currentWeather.high}°</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-white/45">
                <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-sky-deep/50 via-cyan/60 to-sun/70" />
                <span
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-ink/20 transition-all duration-700"
                  style={{ left: `calc(${feelsPos}% - 7px)` }}
                  title={`Feels like ${currentWeather.feelsLike}°`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 animate-rise-delay">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Next hours
            </h2>
            <p className="mt-1 text-sm text-ink-soft">Temperature and rain chance ahead.</p>
          </div>
          <Link
            to="/forecast"
            className="text-sm font-semibold text-cyan-deep transition hover:text-cyan"
          >
            Full week →
          </Link>
        </div>

        <div className="stagger -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {hourlyForecast.map((slot) => (
            <div
              key={`${slot.time}-${slot.temp}-${slot.rain}`}
              className="group flex min-w-[5.1rem] flex-col items-center gap-2 rounded-[1.35rem] bg-white/55 px-3 py-4 ring-1 ring-ink/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_12px_28px_rgb(15_40_70/0.08)]"
            >
              <span className="text-[11px] font-semibold text-mist">{slot.time}</span>
              <WeatherIcon type={slot.icon} className="h-10 w-10" />
              <span className="font-display text-xl font-bold text-ink">{slot.temp}°</span>
              <div className="flex w-full flex-col items-center gap-1">
                <div className="h-1 w-8 overflow-hidden rounded-full bg-sky-deep/20">
                  <div
                    className="h-full rounded-full bg-rain transition-all duration-500"
                    style={{ width: `${Math.max(slot.rain, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-rain">{slot.rain}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 animate-rise-late">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Conditions</h2>
        <p className="mt-1 text-sm text-ink-soft">Air, wind, and pressure right now.</p>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-7 sm:grid-cols-4 sm:gap-x-10">
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-mist">
                {stat.label}
              </dt>
              <dd className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold tracking-tight text-ink transition group-hover:text-cyan-deep">
                  {stat.value}
                </span>
                {stat.unit && <span className="text-sm font-medium text-mist">{stat.unit}</span>}
              </dd>
              <p className="mt-1 text-xs text-mist">{stat.hint}</p>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/10 pt-6 text-sm">
          <p className="text-ink-soft">
            <span className="font-semibold text-ink">Sunrise</span>{" "}
            <span className="font-display font-semibold text-ink">{currentWeather.sunrise}</span>
          </p>
          <p className="text-ink-soft">
            <span className="font-semibold text-ink">Sunset</span>{" "}
            <span className="font-display font-semibold text-ink">{currentWeather.sunset}</span>
          </p>
          <p className="text-ink-soft">
            <span className="font-semibold text-ink">UV</span>{" "}
            <span className="font-display font-semibold text-ink">
              {currentWeather.uv}
              {currentWeather.uvLabel ? ` · ${currentWeather.uvLabel}` : ""}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
