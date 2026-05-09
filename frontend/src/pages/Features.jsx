import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Event Management",
    description:
      "Owners can create gaming events with title, game, date, and location. Players can view all events in one place.",
    badge: "Owner + Player"
  },
  {
    title: "Instant Registration",
    description:
      "Players can register for an event with a single click. Duplicate registrations are prevented automatically.",
    badge: "Player"
  },
  {
    title: "Announcements Feed",
    description:
      "Post important updates, match schedules, rules, and highlights so everyone stays informed.",
    badge: "Owner"
  },
  {
    title: "Participant Directory",
    description:
      "See the participant list, event mapping, and (for owners) view detailed player info.",
    badge: "Owner"
  },
  {
    title: "Owner-Only Controls",
    description:
      "Organizer actions are protected using an owner check, keeping administration secure and simple.",
    badge: "Security"
  }
];

export default function Features() {
  return (
    <section>
      <div className="card">
        <h1 className="page-title">All Features</h1>
        <p className="sub">
          Everything included in the Bardoli E-Sports MVP — designed to feel clean, fast, and
          production-ready.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link className="btn btn-secondary" to="/app">
            Open Portal
          </Link>
        </div>
      </div>

      <div className="grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="card feature-card" style={{ borderRadius: 12 }}>
            <div className="feature-head">
              <h2>{f.title}</h2>
              <span className="badge">{f.badge}</span>
            </div>
            <p className="sub">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Want more pages?</h2>
        <p className="sub">
          This structure is now page-based, so we can easily add public pages like “About”,
          “Contact”, and “Rules” without touching the portal.
        </p>
      </div>
    </section>
  );
}
