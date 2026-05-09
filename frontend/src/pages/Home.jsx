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
    accent: "from-cyan-500 to-blue-600",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "For Organizers",
    desc: "Owner-only dashboard to create events, manage participants, and broadcast announcements to the community.",
    accent: "from-violet-500 to-purple-700",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Built for Speed",
    desc: "Lightweight React + Express MVP — loads instantly, scales easily. No bloat, just performance where it counts.",
    accent: "from-orange-500 to-red-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080B10] text-white font-sans overflow-x-hidden">
      {/* Noise + grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-60 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10">
        {/* NAV */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-sm sticky top-0 bg-[#080B10]/80 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white/90">
              Bardoli <span className="text-cyan-400">E-Sports</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/features"
              className="text-xs text-white/50 hover:text-white/90 transition-colors px-3 py-1.5 hidden sm:block tracking-wider uppercase"
            >
              Features
            </Link>
            <Link
              to="/app"
              className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-[#080B10] transition-colors"
            >
              Open Portal
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-400 tracking-widest uppercase font-medium">Season 2026 Active</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
                <span className="block text-white">RUN</span>
                <span className="block text-white">TOURNAMENTS.</span>
                <span className="block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    DOMINATE.
                  </span>
                </span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-10">
                Bardoli's premier esports platform for organizing competitive events, publishing announcements, and managing player registrations — all in one place.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded border border-white/20 text-white/80 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold tracking-wide uppercase"
                >
                  View Features
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#080B10] font-black transition-all text-sm tracking-wide uppercase shadow-lg shadow-cyan-500/20"
                >
                  Open Portal
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* STATS PANEL */}
            <div className="lg:w-80 w-full">
              <div className="border border-white/8 rounded-2xl bg-white/[0.02] p-1 backdrop-blur-sm">
                <div className="rounded-xl overflow-hidden">
                  {/* header */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-b border-white/5 px-5 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-white/40 font-mono tracking-widest uppercase">Live Season Stats</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-y divide-white/5">
                    {STATS.map((s) => (
                      <div key={s.label} className="p-5">
                        <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/5 px-5 py-3 flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {["FF", "PG", "CD"].map((g, i) => (
                        <div key={g} className={`w-6 h-6 rounded-full text-[9px] font-black flex items-center justify-center border border-[#080B10] ${["bg-orange-500","bg-blue-500","bg-green-500"][i]}`}>{g}</div>
                      ))}
                    </div>
                    <span className="text-xs text-white/30 font-mono">Free Fire · PUBG · CoD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mx-6" />

        {/* CARDS */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CARDS.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-gradient-to-br ${c.accent} text-white shadow-lg`}>
                  {c.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.05)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-3">Ready to compete?</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Join the Arena</h2>
              <p className="text-white/40 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                Sign in to register for upcoming events and be part of Bardoli's fastest-growing gaming community.
              </p>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#080B10] font-black transition-all text-sm tracking-wide uppercase shadow-2xl shadow-cyan-500/30"
              >
                Enter Portal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
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