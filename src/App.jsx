import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import Rain from "./pages/Rain";
import ConnectApi from "./pages/ConnectApi";

export default function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/rain" element={<Rain />} />
            <Route path="/connect" element={<ConnectApi />} />
          </Routes>
        </Layout>
      </WeatherProvider>
    </BrowserRouter>
  );
}
