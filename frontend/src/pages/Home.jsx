import { Link } from "react-router-dom";

const STATS = [
  { value: "500+", label: "Registered Players" },
  { value: "48", label: "Events Hosted" },
  { value: "3", label: "Game Titles" },
  { value: "₹2L+", label: "Prize Pool" },
];

const CARDS = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "For Players",
    desc: "Discover upcoming tournaments and register in seconds. Track your rank across Free Fire, PUBG, and CoD.",
    accent: "accent-waypoint",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "For Organizers",
    desc: "Owner-only dashboard to create events, manage participants, and broadcast announcements to the community.",
    accent: "accent-terraform",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Built for Speed",
    desc: "Lightweight React + Express MVP — loads instantly, scales easily. No bloat, just performance where it counts.",
    accent: "accent-vault",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <nav className="site-nav">
        <div className="site-nav-inner">
          <div className="flex items-center gap-3">
            <div className="brand-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="brand-title">Bardoli E-Sports</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/features" className="btn-secondary hidden sm:inline-flex">
              Features
            </Link>
            <Link to="/app" className="btn-primary">
              Open Portal
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <span className="eyebrow mb-6">Season 2026 Active</span>
            <h1 className="display-title mb-6">
              Run Tournaments.
              <br />
              Dominate.
            </h1>
            <p className="body-lead max-w-2xl mb-10">
              Bardoli&apos;s competitive platform for events, announcements, and player registrations — built with a dark, focused, high-signal interface.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/features" className="btn-secondary">
                View Features
              </Link>
              <Link to="/app" className="btn-primary">
                Enter Portal
              </Link>
            </div>
          </div>

          <aside className="surface-card overflow-hidden">
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--hairline)" }}>
              <p className="eyebrow">Live Season Stats</p>
            </div>
            <div className="grid grid-cols-2">
              {STATS.map((s) => (
                <div key={s.label} className="px-5 py-4 border-t border-r last:border-r-0 even:border-r-0" style={{ borderColor: "var(--hairline-soft)" }}>
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="divider-line max-w-6xl mx-auto" />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="eyebrow mb-6">Platform</p>
        <div className="grid md:grid-cols-3 gap-4">
          {CARDS.map((c) => (
            <article key={c.title} className="surface-card surface-card-hover p-6 transition-colors">
              <div className={`w-12 h-12 rounded-lg mb-5 flex items-center justify-center ${c.accent}`}>{c.icon}</div>
              <h3 className="text-2xl font-semibold tracking-tight mb-2">{c.title}</h3>
              <p className="body-copy">{c.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="surface-card p-10">
          <p className="eyebrow mb-4">Ready to compete?</p>
          <h2 className="section-title mb-4">Join the Arena</h2>
          <p className="body-copy max-w-2xl mb-8">
            Sign in to register for upcoming events and join Bardoli&apos;s fastest-growing gaming community.
          </p>
          <Link to="/app" className="btn-primary">
            Open Portal
          </Link>
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
