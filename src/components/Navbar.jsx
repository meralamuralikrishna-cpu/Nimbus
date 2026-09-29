import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Now", end: true },
  { to: "/forecast", label: "Forecast" },
  { to: "/rain", label: "Rain" },
  { to: "/connect", label: "API" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-[#d6ebf7]/55 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white/70 ring-1 ring-cyan/20 shadow-sm">
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-sky-deep/50 to-cyan/25 animate-pulse-soft" />
            <span className="relative font-display text-lg font-bold text-cyan-deep">N</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              Nimbus
            </span>
            <span className="hidden text-[11px] font-medium tracking-wide text-mist sm:block">
              Weather desk
            </span>
          </span>
        </NavLink>

        <nav
          className="flex items-center gap-0.5 rounded-full bg-white/45 p-1 ring-1 ring-ink/5 backdrop-blur-sm"
          aria-label="Main"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:px-3.5 sm:text-sm",
                  isActive
                    ? "bg-ink text-cloud shadow-sm"
                    : "text-ink-soft hover:bg-white/70 hover:text-ink",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
