/** Soft sky ornaments — decorative only */
export default function SkyOrnaments({ mood = "cloud" }) {
  const isRain = mood === "rain";
  const isSun = mood === "sun";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 sky-grain opacity-50" />

      {/* Horizon wash */}
      <div
        className={[
          "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent",
          isRain ? "from-[#4a7ea8]/35" : isSun ? "from-[#f0c96a]/25" : "from-white/40",
        ].join(" ")}
      />

      {/* Cloud blobs */}
      <div
        className={[
          "absolute -right-10 top-8 h-44 w-80 rounded-[50%] blur-2xl animate-drift",
          isRain ? "bg-white/35" : "bg-white/60",
        ].join(" ")}
      />
      <div className="absolute left-[8%] top-[28%] h-24 w-56 rounded-[50%] bg-white/35 blur-xl animate-drift-slow" />
      <div className="absolute bottom-[18%] right-[18%] h-20 w-44 rounded-[50%] bg-white/30 blur-xl animate-drift" />

      {isSun && (
        <div className="absolute right-[12%] top-[18%] h-36 w-36 animate-float">
          <div className="absolute inset-0 rounded-full bg-[#f0b429]/35 blur-xl animate-pulse-soft" />
          <div className="absolute inset-4 rounded-full bg-[#f5c85a]/50 blur-md" />
        </div>
      )}

      {isRain &&
        Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 h-14 w-px bg-white/70 animate-rain"
            style={{
              left: `${4 + i * 4.4}%`,
              animationDelay: `${(i % 9) * 0.12}s`,
              animationDuration: `${0.85 + (i % 5) * 0.18}s`,
            }}
          />
        ))}
    </div>
  );
}
