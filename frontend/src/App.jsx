import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Portal from "./pages/Portal";

function navLinkClass({ isActive }) {
  return isActive ? "active" : "";
}

function SiteLayout({ children }) {
  return (
   

      <main >
        {children}
      </main>

  );
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/app" element={<Portal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}
