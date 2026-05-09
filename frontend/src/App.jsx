import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Portal from "./pages/Portal";

function navLinkClass({ isActive }) {
  return isActive ? "active" : "";
}

function SiteLayout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand">
            Bardoli E-Sports
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/features" className={navLinkClass}>
              Features
            </NavLink>
            <NavLink to="/app" className={navLinkClass}>
              Portal
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 24 }}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="sub">© {new Date().getFullYear()} Bardoli E-Sports</span>
        </div>
      </footer>
    </div>
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
