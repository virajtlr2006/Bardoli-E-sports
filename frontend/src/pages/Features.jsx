import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Event Management",
    description:
      "Owners can create gaming events with title, game, date, and location. Players can view all events in one place.",
    badge: "Owner + Player",
    badgeColor: "accent-waypoint",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    accent: "accent-waypoint",
    borderAccent: "",
  },
  {
    title: "Instant Registration",
    description:
      "Players can register for an event with a single click. Duplicate registrations are prevented automatically.",
    badge: "Player",
    badgeColor: "accent-vault",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: "accent-vault",
    borderAccent: "",
  },
  {
    title: "Announcements Feed",
    description:
      "Post important updates, match schedules, rules, and highlights so everyone stays informed.",
    badge: "Owner",
    badgeColor: "accent-terraform",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    accent: "accent-terraform",
    borderAccent: "",
  },
  {
    title: "Participant Directory",
    description:
      "See the participant list, event mapping, and (for owners) view detailed player info including rank and bio.",
    badge: "Owner",
    badgeColor: "accent-terraform",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    accent: "accent-terraform",
    borderAccent: "",
  },
  {
    title: "Owner-Only Controls",
    description:
      "Organizer actions are protected using an owner check, keeping administration secure and simple.",
    badge: "Security",
    badgeColor: "accent-vault",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: "accent-vault",
    borderAccent: "",
  },
];

const TECH = ["React", "Express.js", "Node.js", "REST API", "JWT Auth", "MongoDB"];

export default function Features() {
  return (
    <div className="site-shell">
      <nav className="site-nav">
        <div className="site-nav-inner">
          <Link to="/" className="flex items-center gap-3">
            <div className="brand-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="brand-title">Bardoli E-Sports</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-secondary hidden sm:inline-flex">
              Home
            </Link>
            <Link to="/app" className="btn-primary">
              Open Portal
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-14">
        <span className="eyebrow mb-6">Platform Features</span>
        <h1 className="section-title mb-4">Everything You Need to Win</h1>
        <p className="body-lead max-w-3xl">
          A complete esports management suite designed as a high-contrast dark interface with explicit hierarchy, compact controls, and product-grade cards.
        </p>
      </section>

      <div className="divider-line max-w-6xl mx-auto" />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <article key={f.title} className={`surface-card surface-card-hover p-6 transition-colors ${i === 0 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-start justify-between mb-5 gap-3">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${f.accent}`}>{f.icon}</div>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.6px] px-2.5 py-1 rounded-md ${f.badgeColor}`}>{f.badge}</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{f.title}</h2>
              <p className="body-copy">{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <span>© 2026 Bardoli E-Sports</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
