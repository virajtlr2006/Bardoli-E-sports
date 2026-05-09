import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <div className="hero card">
        <div>
          <p className="eyebrow">Bardoli E-Sports</p>
          <h1 className="hero-title">Run tournaments. Build community. Track players.</h1>
          <p className="sub hero-sub">
            A simple esports portal for organizing events, publishing announcements, and managing
            participant registrations.
          </p>

          <div className="hero-actions">
            <Link className="btn" to="/features">
              View Features
            </Link>
            <Link className="btn btn-secondary" to="/app">
              Open Portal
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="stat">
            <div className="stat-value">Events</div>
            <div className="stat-label">Create and manage tournaments</div>
          </div>
          <div className="stat">
            <div className="stat-value">Announcements</div>
            <div className="stat-label">Keep players informed</div>
          </div>
          <div className="stat">
            <div className="stat-value">Participants</div>
            <div className="stat-label">Register and view player details</div>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>For Players</h2>
          <p className="sub">
            Discover upcoming events and register in seconds using your account.
          </p>
        </div>
        <div className="card">
          <h2>For Organizers</h2>
          <p className="sub">
            Owner-only access to create events and publish announcements.
          </p>
        </div>
        <div className="card">
          <h2>Built for Speed</h2>
          <p className="sub">
            Lightweight MVP built with React + Express, designed to be easy to extend.
          </p>
        </div>
      </div>
    </section>
  );
}
