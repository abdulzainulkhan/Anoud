import { Routes, Route } from "react-router-dom";
import Template from "./pages/template/Template";
import Home from "./pages/home/Home";
import { WebsiteContentProvider } from "./api/WebsiteContentContext";

export default function App() {
  return (
    <WebsiteContentProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </WebsiteContentProvider>
  );
}