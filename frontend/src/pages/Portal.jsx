import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiPost } from "../api";

const TABS = ["events", "announcements", "participants"];

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-xs font-semibold tracking-[0.6px] uppercase transition-colors rounded-md border ${
        active
          ? "bg-[#1a1f29] border-[color:var(--hairline)] text-white"
          : "border-transparent text-[color:var(--ink-subtle)] hover:text-[color:var(--ink)] hover:bg-[#12151c]"
      }`}
    >
      {children}
    </button>
  );
}

function Badge({ children, color = "cyan" }) {
  const colors = {
    cyan: "accent-waypoint",
    violet: "accent-terraform",
    green: "accent-vault",
    orange: "accent-vault",
  };
  return (
    <span className={`text-[10px] font-semibold tracking-[0.6px] uppercase px-2 py-0.5 rounded-md ${colors[color]}`}>
      {children}
    </span>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">{label}</label>}
      <input
        className="panel-input placeholder:text-[color:var(--ink-subtle)]"
        {...props}
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs text-white/40 uppercase tracking-wider font-semibold">{label}</label>}
      <select
        className="panel-select"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

function PrimaryBtn({ children, className = "", ...props }) {
  return (
    <button
      className={`btn-primary text-xs uppercase tracking-[0.6px] disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, className = "", ...props }) {
  return (
    <button
      className={`btn-secondary text-xs uppercase tracking-[0.6px] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Portal() {
  const [authMode, setAuthMode] = useState("login");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [token, setToken] = useState("");
  const [tab, setTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [eventForm, setEventForm] = useState({ title: "", game: "Free Fire", date: "", location: "", prize: "" });
  const [announcementForm, setAnnouncementForm] = useState({ message: "" });
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("info");

  // Load authentication data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("bardoli-user");
    const savedUserName = localStorage.getItem("bardoli-userName");
    const savedIsOwner = localStorage.getItem("bardoli-isOwner");
    const savedToken = localStorage.getItem("bardoli-token");

    if (savedUser && savedToken) {
      // Set authentication state from localStorage
      setUser(savedUser);
      setUserName(savedUserName || "");
      setIsOwner(savedIsOwner === "true");
      setToken(savedToken);
    }
  }, []);

  function notify(text, type = "info") {
    setMessage(text);
    setMsgType(type);
    setTimeout(() => setMessage(""), 4000);
  }

  async function loadData() {
    try {
      const [eventList, announcementList, participantList] = await Promise.all([
        apiGet("/events"),
        apiGet("/announcements"),
        apiGet("/participants"),
      ]);
      setEvents(eventList);
      setAnnouncements(announcementList);
      setParticipants(participantList);
    } catch (err) {
      // If authentication fails, clear localStorage and reset state
      if (err.message.includes("Authentication") || err.message.includes("Invalid") || err.message.includes("expired")) {
        localStorage.removeItem("bardoli-user");
        localStorage.removeItem("bardoli-userName");
        localStorage.removeItem("bardoli-isOwner");
        localStorage.removeItem("bardoli-token");
        setUser("");
        setUserName("");
        setIsOwner(false);
        setToken("");
        notify("Session expired. Please login again.", "error");
      } else {
        notify(err.message, "error");
      }
    }
  }

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  async function submitAuth(e) {
    e.preventDefault();
    setMessage("");
    try {
      const payload =
        authMode === "signup"
          ? { name: nameInput, email: emailInput, password: passwordInput }
          : { email: emailInput, password: passwordInput };

      const path = authMode === "signup" ? "/auth/signup" : "/auth/login";
      const data = await apiPost(path, payload);

      setUserName(data.name);
      setUser(data.email);
      setIsOwner(data.isOwner);
      setToken(data.token || "");
      setTab("events");
      setSelectedParticipant(null);
      setOwnerProfile(null);
      setPasswordInput("");
      
      // Save authentication data to localStorage
      localStorage.setItem("bardoli-user", data.email);
      localStorage.setItem("bardoli-userName", data.name);
      localStorage.setItem("bardoli-isOwner", data.isOwner.toString());
      localStorage.setItem("bardoli-token", data.token || "");
      
      notify(
        authMode === "signup"
          ? "Account created. Welcome to the arena."
          : "Login successful. Welcome to the arena.",
        "success"
      );
    } catch (err) {
      notify(err?.message || "Authentication failed.", "error");
    }
  }

  function logout() {
    setUser(""); setUserName(""); setIsOwner(false); setToken("");
    setEvents([]); setAnnouncements([]); setParticipants([]);
    setSelectedParticipant(null); setOwnerProfile(null);
    
    // Clear authentication data from localStorage
    localStorage.removeItem("bardoli-user");
    localStorage.removeItem("bardoli-userName");
    localStorage.removeItem("bardoli-isOwner");
    localStorage.removeItem("bardoli-token");
    
    notify("Logged out.", "info");
  }

  async function createEvent(e) {
    e.preventDefault();
    try {
      await apiPost("/events", { ...eventForm }, { token });
      setEventForm({ title: "", game: "Free Fire", date: "", location: "", prize: "" });
      await loadData();
      notify("Event organized successfully.", "success");
    } catch (err) {
      if (err.message.includes("Authentication") || err.message.includes("Invalid") || err.message.includes("expired")) {
        logout();
        notify("Session expired. Please login again.", "error");
      } else {
        notify(err?.message || "Failed to create event.", "error");
      }
    }
  }

  async function createAnnouncement(e) {
    e.preventDefault();
    try {
      await apiPost("/announcements", { ...announcementForm }, { token });
      setAnnouncementForm({ message: "" });
      await loadData();
      notify("Announcement posted.", "success");
    } catch (err) {
      if (err.message.includes("Authentication") || err.message.includes("Invalid") || err.message.includes("expired")) {
        logout();
        notify("Session expired. Please login again.", "error");
      } else {
        notify(err?.message || "Failed to post announcement.", "error");
      }
    }
  }

  async function registerForEvent(eventId) {
    try {
      await apiPost(`/events/${eventId}/register`, {}, { token });
      await loadData();
      notify("Registered successfully.", "success");
    } catch (err) {
      if (err.message.includes("Authentication") || err.message.includes("Invalid") || err.message.includes("expired")) {
        logout();
        notify("Session expired. Please login again.", "error");
      } else {
        notify(err?.message || "Registration failed.", "error");
      }
    }
  }

  async function showParticipantDetails(id) {
    try {
      const details = await apiGet(`/participants/${id}`);
      setSelectedParticipant(details);
    } catch (err) { notify(err?.message || "Failed to load details.", "error"); }
  }

  async function loadOwnerProfile() {
    try {
      const profile = await apiGet("/owner-profile", { token });
      setOwnerProfile(profile);
    } catch (err) {
      if (err.message.includes("Authentication") || err.message.includes("Invalid") || err.message.includes("expired")) {
        logout();
        notify("Session expired. Please login again.", "error");
      } else {
        notify(err?.message || "Failed to load profile.", "error");
      }
    }
  }

  const msgStyles = {
    success: "bg-[#12151c] border-[color:var(--hairline)] text-[color:var(--success)]",
    error: "bg-[#12151c] border-[color:var(--hairline)] text-[color:var(--danger)]",
    info: "bg-[#12151c] border-[color:var(--hairline)] text-[color:var(--ink-muted)]",
  };

  const GAME_COLORS = { "Free Fire": "bg-orange-500", PUBG: "bg-blue-500", "Call of Duty": "bg-green-500" };

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
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-[color:var(--ink-subtle)]">{userName}</span>
                <Badge color={isOwner ? "violet" : "cyan"}>{isOwner ? "Owner" : "Player"}</Badge>
              </div>
              <SecondaryBtn onClick={logout}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Logout
              </SecondaryBtn>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
          {/* HEADER */}
          <div className="mb-8">
            <span className="eyebrow mb-4">Portal</span>
            <h1 className="section-title">
              {user ? `Welcome back, ${userName}` : "Enter the Arena"}
            </h1>
            <p className="body-copy mt-2">
              {user ? "Manage events, registrations, and announcements." : "Login to access events, announcements, and participants."}
            </p>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className={`rounded-xl border px-4 py-3 mb-6 text-sm font-medium ${msgStyles[msgType]}`}>
              {message}
            </div>
          )}

          {/* LOGIN */}
          {!user ? (
            <div className="surface-card p-8 max-w-md">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-semibold">{authMode === "signup" ? "Player Sign Up" : "Login"}</h2>
                <div className="flex gap-1 p-1 rounded-md border border-[color:var(--hairline)] bg-[#12151c]">
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className={`px-3 py-1.5 text-[10px] font-semibold tracking-[0.6px] uppercase rounded-md transition-colors ${
                      authMode === "login" ? "bg-[#1a1f29] text-white" : "text-[color:var(--ink-subtle)] hover:text-[color:var(--ink)]"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={`px-3 py-1.5 text-[10px] font-semibold tracking-[0.6px] uppercase rounded-md transition-colors ${
                      authMode === "signup" ? "bg-[#1a1f29] text-white" : "text-[color:var(--ink-subtle)] hover:text-[color:var(--ink)]"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="text-[color:var(--ink-subtle)] text-xs mb-6 tracking-[0.2px]">
                {authMode === "signup"
                  ? "Create a player account to register for events."
                  : "Login as owner or player to access the portal."}
              </p>

              <form onSubmit={submitAuth} className="flex flex-col gap-4">
                {authMode === "signup" && (
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Your gamer name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                  />
                )}
                <Input
                  label="Email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
                <PrimaryBtn type="submit" className="mt-2 self-start">
                  {authMode === "signup" ? "Create Account" : "Login"}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </PrimaryBtn>
              </form>
            </div>
          ) : (
            <>
              {/* TABS */}
              <div className="flex flex-wrap gap-2 mb-8 p-1 rounded-md border border-[color:var(--hairline)] bg-[#12151c] w-fit">
                {TABS.map((t) => (
                  <TabBtn key={t} active={tab === t} onClick={() => setTab(t)}>
                    {t}
                  </TabBtn>
                ))}
                {isOwner && (
                  <TabBtn active={tab === "owner"} onClick={() => setTab("owner")}>
                    Owner Profile
                  </TabBtn>
                )}
              </div>

              {/* EVENTS TAB */}
              {tab === "events" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Gaming Events</h2>
                    <Badge color="cyan">{events.length} Events</Badge>
                  </div>

                  {events.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/8 py-16 text-center text-white/20 text-sm">
                      No events yet. Check back later.
                    </div>
                  )}

                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event._id} className="surface-card surface-card-hover p-5 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${GAME_COLORS[event.game] || "bg-gray-500"}`} />
                            <div className="min-w-0">
                              <div className="font-bold text-white text-lg leading-tight truncate">{event.title}</div>
                              <div className="text-white/40 text-xs mt-1 flex items-center gap-3 flex-wrap">
                                <span className="font-mono">{event.game}</span>
                                <span>·</span>
                                <span>{event.date}</span>
                                <span>·</span>
                                <span>{event.location}</span>
                              </div>
                              <div className="text-emerald-300 text-xs mt-2 font-semibold">
                                Prize: {event.prize || "To be announced"}
                              </div>
                            </div>
                          </div>
                          {!isOwner && (
                            <PrimaryBtn onClick={() => registerForEvent(event._id)} className="flex-shrink-0 text-[10px] px-3 py-2">
                              Register
                            </PrimaryBtn>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {isOwner && (
                    <div className="mt-6 rounded-2xl border border-dashed border-violet-500/20 bg-violet-500/[0.03] p-6">
                      <h3 className="text-sm font-semibold text-[color:var(--ink-muted)] uppercase tracking-[0.6px] mb-4">Organize New Event</h3>
                      <form onSubmit={createEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Event Title" placeholder="e.g. City Showdown S2" value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} required />
                        <Select label="Game" value={eventForm.game} onChange={(e) => setEventForm((p) => ({ ...p, game: e.target.value }))}>
                          <option>Free Fire</option>
                          <option>PUBG</option>
                          <option>Call of Duty</option>
                        </Select>
                        <Input label="Date" placeholder="2026-06-01" value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} required />
                        <Input label="Location" placeholder="Bardoli City Arena" value={eventForm.location} onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))} required />
                        <Input label="Prize Pool" placeholder="e.g. ₹50,000" value={eventForm.prize} onChange={(e) => setEventForm((p) => ({ ...p, prize: e.target.value }))} required />
                        <div className="sm:col-span-2">
                          <PrimaryBtn type="submit">Create Event</PrimaryBtn>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* ANNOUNCEMENTS TAB */}
              {tab === "announcements" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Announcements</h2>
                    <Badge color="violet">{announcements.length} Posts</Badge>
                  </div>

                  {announcements.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/8 py-16 text-center text-white/20 text-sm">
                      No announcements yet.
                    </div>
                  )}

                  <div className="space-y-3">
                    {announcements.map((a, i) => (
                      <div key={a._id} className="surface-card surface-card-hover p-5 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2}>
                              <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white/80 text-sm leading-relaxed">{a.message}</p>
                            <p className="text-white/25 text-xs mt-2 font-mono">#{i + 1}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isOwner && (
                    <div className="mt-6 rounded-2xl border border-dashed border-violet-500/20 bg-violet-500/[0.03] p-6">
                      <h3 className="text-sm font-semibold text-[color:var(--ink-muted)] uppercase tracking-[0.6px] mb-4">Post Announcement</h3>
                      <form onSubmit={createAnnouncement} className="flex flex-col gap-4">
                        <textarea
                          placeholder="Write your announcement..."
                          value={announcementForm.message}
                          onChange={(e) => setAnnouncementForm({ message: e.target.value })}
                          required
                          rows={4}
                          className="panel-textarea resize-none placeholder:text-[color:var(--ink-subtle)]"
                        />
                        <PrimaryBtn type="submit" className="self-start">Post</PrimaryBtn>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* PARTICIPANTS TAB */}
              {tab === "participants" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Participant Directory</h2>
                    <Badge color="green">{participants.length} Players</Badge>
                  </div>

                  {participants.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/8 py-16 text-center text-white/20 text-sm">
                      No participants yet.
                    </div>
                  )}

                  <div className="space-y-2">
                    {participants.map((p) => (
                      <div key={p._id} className="surface-card surface-card-hover p-4 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/8 flex items-center justify-center text-xs font-black text-cyan-400 flex-shrink-0">
                              {p.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white text-sm truncate">{p.name}</div>
                              <div className="text-white/30 text-xs font-mono flex items-center gap-2 flex-wrap">
                                <span>{p.game}</span>
                                <span>·</span>
                                <span>{p.rank}</span>
                                <span>·</span>
                                <span className="text-white/20">{p.eventTitle}</span>
                              </div>
                            </div>
                          </div>
                          {isOwner && (
                            <SecondaryBtn onClick={() => showParticipantDetails(p._id)} className="flex-shrink-0 text-[10px]">
                              Details
                            </SecondaryBtn>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {isOwner && selectedParticipant && (
                    <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-black text-white/70 uppercase tracking-widest">Player Details</h3>
                        <button onClick={() => setSelectedParticipant(null)} className="text-white/30 hover:text-white/60 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          ["Name", selectedParticipant.name],
                          ["Email", selectedParticipant.email],
                          ["Game", selectedParticipant.game],
                          ["Rank", selectedParticipant.rank],
                          ["Event", selectedParticipant.eventTitle],
                          ["Bio", selectedParticipant.bio],
                        ].map(([k, v]) => (
                          <div key={k} className={k === "Bio" || k === "Email" ? "col-span-2" : ""}>
                            <div className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-1">{k}</div>
                            <div className="text-white/80 font-mono text-xs break-all">{v || "—"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* OWNER PROFILE TAB */}
              {tab === "owner" && isOwner && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-6">Owner Profile</h2>
                  <SecondaryBtn onClick={loadOwnerProfile}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Load Profile
                  </SecondaryBtn>

                  {ownerProfile && (
                    <div className="surface-card p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-xl font-black text-white">
                          {ownerProfile.name?.charAt(0) || "O"}
                        </div>
                        <div>
                          <div className="text-xl font-black text-white">{ownerProfile.name}</div>
                          <Badge color="violet">{ownerProfile.role}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-white/5 pt-5">
                        {[["Organization", ownerProfile.organization], ["Bio", ownerProfile.bio]].map(([k, v]) => (
                          <div key={k} className={k === "Bio" ? "sm:col-span-2" : ""}>
                            <div className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-1">{k}</div>
                            <div className="text-white/70 text-sm leading-relaxed">{v || "—"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      <footer className="site-footer">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <span>© 2026 Bardoli E-Sports</span>
          <span>All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
