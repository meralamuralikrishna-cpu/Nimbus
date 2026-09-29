import { useState } from "react";
import { fetchWeatherByCity, getApiKey, isApiConfigured } from "../services/weatherApi";

/**
 * API Connect page — reserved for wiring live weather data.
 * UI pages (Home, Forecast, Rain) use mock data until you hook this up.
 */
export default function ConnectApi() {
  const [city, setCity] = useState("Bengaluru");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const configured = isApiConfigured();
  const maskedKey = getApiKey()
    ? `${getApiKey().slice(0, 4)}••••${getApiKey().slice(-4)}`
    : "Not set";

  async function handleTest(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setPreview(null);

    try {
      const data = await fetchWeatherByCity(city.trim());
      setPreview({
        name: data.current.name,
        temp: Math.round(data.current.main.temp),
        description: data.current.weather?.[0]?.description,
        forecastCount: data.forecast.list?.length ?? 0,
      });
      setStatus("success");
      setMessage("Connected. Live response received from OpenWeather.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Request failed.");
    }
  }

  return (
    <div className="animate-rise mx-auto max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-deep">Developer setup</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Connect the weather API
      </h1>
      <p className="mt-3 text-ink-soft">
        Live weather is already wired through your API key. Use this page to verify the connection or
        re-test a city fetch.
      </p>

      <ol className="mt-10 space-y-6 border-t border-ink/10 pt-8">
        <li className="grid gap-1 sm:grid-cols-[7rem_1fr]">
          <span className="font-display text-sm font-bold text-cyan-deep">Step 1</span>
          <div>
            <p className="font-medium text-ink">Get an OpenWeather API key</p>
            <p className="mt-1 text-sm text-ink-soft">
              Sign up at openweathermap.org and create a free key for Current Weather + 5 Day Forecast.
            </p>
          </div>
        </li>
        <li className="grid gap-1 sm:grid-cols-[7rem_1fr]">
          <span className="font-display text-sm font-bold text-cyan-deep">Step 2</span>
          <div>
            <p className="font-medium text-ink">Add the key to your project</p>
            <p className="mt-1 text-sm text-ink-soft">
              Copy <code className="rounded bg-white/70 px-1.5 py-0.5 text-ink">.env.example</code> to{" "}
              <code className="rounded bg-white/70 px-1.5 py-0.5 text-ink">.env</code> and set:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-ink px-4 py-3 text-sm text-cloud">
              VITE_WEATHER_API_KEY=your_key_here
            </pre>
            <p className="mt-2 text-sm text-ink-soft">Restart <code>npm run dev</code> after saving.</p>
          </div>
        </li>
        <li className="grid gap-1 sm:grid-cols-[7rem_1fr]">
          <span className="font-display text-sm font-bold text-cyan-deep">Step 3</span>
          <div>
            <p className="font-medium text-ink">Wire UI to <code>fetchWeatherByCity</code></p>
            <p className="mt-1 text-sm text-ink-soft">
              Service lives in <code className="rounded bg-white/70 px-1.5 py-0.5">src/services/weatherApi.js</code>.
              Replace imports from <code className="rounded bg-white/70 px-1.5 py-0.5">mockWeather.js</code> when ready.
            </p>
          </div>
        </li>
      </ol>

      <section className="glass-panel mt-10 rounded-[1.35rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-ink">Connection status</h2>
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold",
              configured ? "bg-cyan/15 text-cyan-deep" : "bg-ink/5 text-mist",
            ].join(" ")}
          >
            {configured ? "Key detected" : "Key missing"}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          Env key: <span className="font-medium text-ink">{maskedKey}</span>
        </p>

        <form onSubmit={handleTest} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="api-city">
            City to test
          </label>
          <input
            id="api-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City name"
            className="min-w-0 flex-1 rounded-xl border-0 bg-cloud px-4 py-3 text-ink ring-1 ring-ink/10 placeholder:text-mist"
          />
          <button
            type="submit"
            disabled={status === "loading" || !city.trim()}
            className="rounded-xl bg-cyan-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? "Testing…" : "Test API call"}
          </button>
        </form>

        {message && (
          <p
            className={[
              "mt-4 text-sm font-medium",
              status === "success" ? "text-cyan-deep" : "text-[#b45309]",
            ].join(" ")}
            role="status"
          >
            {message}
          </p>
        )}

        {preview && (
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5 sm:grid-cols-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-mist">City</dt>
              <dd className="font-display font-bold text-ink">{preview.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-mist">Temp</dt>
              <dd className="font-display font-bold text-ink">{preview.temp}°</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-mist">Sky</dt>
              <dd className="font-display font-bold capitalize text-ink">{preview.description}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-mist">Forecast pts</dt>
              <dd className="font-display font-bold text-ink">{preview.forecastCount}</dd>
            </div>
          </dl>
        )}
      </section>
    </div>
  );
}
