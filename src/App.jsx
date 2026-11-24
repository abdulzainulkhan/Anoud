import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AdPoster from "./pages/adPoster/AdPoster";
import Template from "./pages/template/Template";
import { WebsiteContentProvider } from "./api/WebsiteContentContext";

export default function App() {
  return (
    <WebsiteContentProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/template" element={<Template />} />
        <Route path="/ad/:code" element={<AdPoster />} />
      </Routes>
    </WebsiteContentProvider>
  );
}