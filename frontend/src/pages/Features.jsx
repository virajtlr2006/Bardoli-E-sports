import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Event Management",
    description:
      "Owners can create gaming events with title, game, date, and location. Players can view all events in one place.",
    badge: "Owner + Player",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    accent: "from-cyan-500/20 to-blue-600/10",
    borderAccent: "group-hover:border-cyan-500/30",
  },
  {
    title: "Instant Registration",
    description:
      "Players can register for an event with a single click. Duplicate registrations are prevented automatically.",
    badge: "Player",
    badgeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: "from-green-500/20 to-emerald-600/10",
    borderAccent: "group-hover:border-green-500/30",
  },
  {
    title: "Announcements Feed",
    description:
      "Post important updates, match schedules, rules, and highlights so everyone stays informed.",
    badge: "Owner",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    accent: "from-violet-500/20 to-purple-600/10",
    borderAccent: "group-hover:border-violet-500/30",
  },
  {
    title: "Participant Directory",
    description:
      "See the participant list, event mapping, and (for owners) view detailed player info including rank and bio.",
    badge: "Owner",
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    accent: "from-violet-500/20 to-pink-600/10",
    borderAccent: "group-hover:border-violet-500/30",
  },
  {
    title: "Owner-Only Controls",
    description:
      "Organizer actions are protected using an owner check, keeping administration secure and simple.",
    badge: "Security",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: "from-orange-500/20 to-red-600/10",
    borderAccent: "group-hover:border-orange-500/30",
  },
];

const TECH = ["React", "Express.js", "Node.js", "REST API", "JWT Auth", "MongoDB"];

export default function Features() {
  return (
    <div className="min-h-screen bg-[#080B10] text-white font-sans overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-violet-600/4 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10">
        {/* NAV */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-[#080B10]/80 z-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white/90">
              Bardoli <span className="text-cyan-400">E-Sports</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-white/50 hover:text-white/90 transition-colors px-3 py-1.5 hidden sm:block tracking-wider uppercase">
              Home
            </Link>
            <Link to="/app" className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-[#080B10] transition-colors">
              Open Portal
            </Link>
          </div>
        </nav>

        {/* PAGE HEADER */}
        <section className="px-6 pt-16 pb-12 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 mb-6">
              <span className="text-xs text-violet-400 tracking-widest uppercase font-medium">Platform Features</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-4">
              Everything You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Need to Win</span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed">
              A complete esports management suite — designed to feel clean, fast, and production-ready from day one.
            </p>
            <div className="mt-8">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#080B10] font-black transition-all text-xs tracking-wide uppercase shadow-lg shadow-cyan-500/20"
              >
                Open Portal
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mx-6" />

        {/* FEATURES GRID */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`group relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 overflow-hidden transition-all duration-300 hover:bg-white/[0.04] ${f.borderAccent} ${i === 0 ? "lg:col-span-2" : ""}`}
              >
                {/* gradient shimmer top */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${f.accent}`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                      {f.icon}
                    </div>
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${f.badgeColor}`}>
                      {f.badge}
                    </span>
                  </div>

                  <h2 className="text-white font-bold text-xl mb-2 tracking-tight">{f.title}</h2>
                  <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section className="px-6 pb-16 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Want More Pages?</h2>
                <p className="text-white/40 text-sm leading-relaxed max-w-lg">
                  This structure is page-based — we can easily add public pages like About, Contact, and Rules without touching the portal.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-white/50 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 hover:bg-white/8 hover:text-white/70 transition-colors cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 px-6 py-6 flex items-center justify-between max-w-6xl mx-auto">
          <span className="text-xs text-white/20 font-mono">© 2026 Bardoli E-Sports</span>
          <span className="text-xs text-white/20">All rights reserved</span>
        </footer>
      </div>
    </div>
  );
}