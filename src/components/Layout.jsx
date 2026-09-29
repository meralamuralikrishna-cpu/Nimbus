import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import LocationSearch from "./LocationSearch";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const showLocation = pathname !== "/connect";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none fixed -left-20 top-28 h-52 w-72 rounded-[50%] bg-white/40 blur-3xl animate-drift"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -right-16 top-48 h-40 w-80 rounded-[50%] bg-[#9ec9e6]/45 blur-3xl animate-drift-slow"
        aria-hidden="true"
      />
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-5 sm:px-8">
        {showLocation && <LocationSearch />}
        {children}
      </main>
    </div>
  );
}
