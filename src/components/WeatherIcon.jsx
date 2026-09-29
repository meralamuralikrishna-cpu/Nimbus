const icons = {
  sun: (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="11" fill="#F0B429" className="origin-center" />
      <g stroke="#F0B429" strokeWidth="2.8" strokeLinecap="round" opacity="0.9">
        <path d="M32 7v7M32 50v7M7 32h7M50 32h7M13.5 13.5l5 5M45.5 45.5l5 5M50.5 13.5l-5 5M18.5 45.5l-5 5" />
      </g>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M19 45h29a10.5 10.5 0 0 0 1-21 14.5 14.5 0 0 0-28-4A10.5 10.5 0 0 0 19 45Z"
        fill="#A6C2D6"
      />
      <path
        d="M19 45h29a10.5 10.5 0 0 0 1-21 14.5 14.5 0 0 0-28-4A10.5 10.5 0 0 0 19 45Z"
        fill="url(#cloudShine)"
        opacity="0.45"
      />
      <defs>
        <linearGradient id="cloudShine" x1="20" y1="18" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#A6C2D6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  "sun-cloud": (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx="23" cy="22" r="9" fill="#F0B429" />
      <path
        d="M21 48h28a9.5 9.5 0 0 0 1-19 12.5 12.5 0 0 0-24-4A9.5 9.5 0 0 0 21 48Z"
        fill="#A9C4D8"
      />
    </svg>
  ),
  rain: (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M17 33h29a9.5 9.5 0 0 0 1-19 12.5 12.5 0 0 0-24-4A9.5 9.5 0 0 0 17 33Z"
        fill="#7FA9C8"
      />
      <g stroke="#4F7CAC" strokeWidth="2.4" strokeLinecap="round">
        <path d="M24 39v9M32 41v9M40 39v9" />
      </g>
    </svg>
  ),
};

export default function WeatherIcon({ type = "sun-cloud", className = "h-12 w-12", animated = false }) {
  return (
    <span
      className={[
        "inline-block shrink-0",
        className,
        animated ? (type === "sun" ? "animate-spin-slow" : "animate-float") : "",
      ].join(" ")}
    >
      {icons[type] || icons["sun-cloud"]}
    </span>
  );
}
