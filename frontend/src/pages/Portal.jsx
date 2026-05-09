import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";

export default function Portal() {
  const [emailInput] = useState("vaibhav@gmail.com");
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
  const [eventForm, setEventForm] = useState({
    title: "",
    game: "Free Fire",
    date: "",
    location: ""
  });
  const [announcementForm, setAnnouncementForm] = useState({ message: "" });
  const [message, setMessage] = useState("");

  async function loadData() {
    const [eventList, announcementList, participantList] = await Promise.all([
      apiGet("/events"),
      apiGet("/announcements"),
      apiGet("/participants")
    ]);
    setEvents(eventList);
    setAnnouncements(announcementList);
    setParticipants(participantList);
  }

  useEffect(() => {
    if (!user) return;
    loadData().catch((err) => setMessage(err.message));
  }, [user]);

  async function submitAuth(e) {
    e.preventDefault();
    setMessage("");

    try {
      const data = await apiPost("/auth/login", {
        email: emailInput,
        password: passwordInput
      });
      setUserName(data.name);
      setUser(data.email);
      setIsOwner(data.isOwner);
      setToken(data.token || "");
      setTab("events");
      setSelectedParticipant(null);
      setOwnerProfile(null);
      setMessage("Login successful. You can now access the portal.");
    } catch (err) {
      setMessage(err?.message || "Authentication failed.");
    }
  }

  function logout() {
    setUser("");
    setUserName("");
    setIsOwner(false);
    setToken("");
    setEvents([]);
    setAnnouncements([]);
    setParticipants([]);
    setSelectedParticipant(null);
    setOwnerProfile(null);
    setMessage("Logged out.");
  }

  async function createEvent(e) {
    e.preventDefault();
    setMessage("");

    try {
      await apiPost("/events", { ...eventForm }, { token });
      setEventForm({ title: "", game: "Free Fire", date: "", location: "" });
      await loadData();
      setMessage("Event organized successfully.");
    } catch (err) {
      setMessage(err?.message || "Failed to create event.");
    }
  }

  async function createAnnouncement(e) {
    e.preventDefault();
    setMessage("");

    try {
      await apiPost("/announcements", { ...announcementForm }, { token });
      setAnnouncementForm({ message: "" });
      await loadData();
      setMessage("Announcement posted.");
    } catch (err) {
      setMessage(err?.message || "Failed to post announcement.");
    }
  }

  async function registerForEvent(eventId) {
    setMessage("");

    try {
      await apiPost(
        `/events/${eventId}/register`,
        { name: userName, email: user },
        user
      );
      await loadData();
      setMessage("Registered successfully.");
    } catch (err) {
      setMessage(err?.message || "Registration failed.");
    }
  }

  async function showParticipantDetails(id) {
    setMessage("");

    try {
      const details = await apiGet(`/participants/${id}`);
      setSelectedParticipant(details);
    } catch (err) {
      setMessage(err?.message || "Failed to load participant details.");
    }
  }

  async function loadOwnerProfile() {
    setMessage("");

    try {
      const profile = await apiGet("/owner-profile", { token });
      setOwnerProfile(profile);
    } catch (err) {
      setMessage(err?.message || "Failed to load owner profile.");
    }
  }

  return (
    <section>
      <div className="card portal-head">
        <div>
          <h1 className="page-title">Portal</h1>
          <p className="sub">Login to access events, announcements, and participants.</p>
        </div>
      </div>

      {message && <p className="message">{message}</p>}

      {!user ? (
        <section className="card">
          <h2>Owner Login</h2>

          <form onSubmit={submitAuth}>
            <input
              type="email"
              placeholder="Owner email"
              value={emailInput}
              disabled
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <button type="submit">
              Login
            </button>
          </form>
        </section>
      ) : (
        <>
          <div className="card">
            <div className="portal-welcome">
              <strong>Welcome, {userName}</strong>
              <span className="sub">{isOwner ? "Owner" : "Player"}</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <button onClick={logout}>Logout</button>
            </div>
          </div>

          <div className="tabs">
            <button
              className={tab === "events" ? "active" : ""}
              onClick={() => setTab("events")}
            >
              Events
            </button>
            <button
              className={tab === "announcements" ? "active" : ""}
              onClick={() => setTab("announcements")}
            >
              Announcements
            </button>
            <button
              className={tab === "participants" ? "active" : ""}
              onClick={() => setTab("participants")}
            >
              Participant List
            </button>
            {isOwner && (
              <button
                className={tab === "owner" ? "active" : ""}
                onClick={() => setTab("owner")}
              >
                Owner Profile
              </button>
            )}
          </div>

          {tab === "events" && (
            <section className="card">
              <h2>Gaming Events</h2>
              {events.map((event) => (
                <div key={event._id} className="list-item">
                  <strong>{event.title}</strong> - {event.game}
                  <br />
                  {event.date} | {event.location}
                  {!isOwner && (
                    <div>
                      <button
                        className="small-btn"
                        onClick={() => registerForEvent(event._id)}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {events.length === 0 && <p>No events yet.</p>}

              {isOwner && (
                <form className="nested-form" onSubmit={createEvent}>
                  <h3>Organize Event</h3>
                  <input
                    placeholder="Event title"
                    value={eventForm.title}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                  <select
                    value={eventForm.game}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, game: e.target.value }))
                    }
                  >
                    <option>Free Fire</option>
                    <option>PUBG</option>
                    <option>Call of Duty</option>
                  </select>
                  <input
                    placeholder="Date (e.g. 2026-06-01)"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, date: e.target.value }))
                    }
                    required
                  />
                  <input
                    placeholder="Location"
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, location: e.target.value }))
                    }
                    required
                  />
                  <button type="submit">Create Event</button>
                </form>
              )}
            </section>
          )}

          {tab === "announcements" && (
            <section className="card">
              <h2>Announcements</h2>
              {announcements.map((announcement) => (
                <div key={announcement._id} className="list-item">
                  {announcement.message}
                </div>
              ))}
              {announcements.length === 0 && <p>No announcements yet.</p>}

              {isOwner && (
                <form className="nested-form" onSubmit={createAnnouncement}>
                  <h3>Create Announcement</h3>
                  <textarea
                    placeholder="Write announcement"
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm({ message: e.target.value })}
                    required
                  />
                  <button type="submit">Post</button>
                </form>
              )}
            </section>
          )}

          {tab === "participants" && (
            <section className="card">
              <h2>Participant List</h2>
              {participants.map((participant) => (
                <div key={participant._id} className="list-item">
                  <strong>{participant.name}</strong> - {participant.game} ({participant.rank})
                  <br />
                  Event: {participant.eventTitle}
                  {isOwner && (
                    <button
                      className="small-btn"
                      onClick={() => showParticipantDetails(participant._id)}
                    >
                      View Details
                    </button>
                  )}
                </div>
              ))}
              {participants.length === 0 && <p>No participants yet.</p>}

              {isOwner && selectedParticipant && (
                <div className="details-box">
                  <h3>User Details</h3>
                  <p>
                    <strong>Name:</strong> {selectedParticipant.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedParticipant.email}
                  </p>
                  <p>
                    <strong>Game:</strong> {selectedParticipant.game}
                  </p>
                  <p>
                    <strong>Event:</strong> {selectedParticipant.eventTitle}
                  </p>
                  <p>
                    <strong>Rank:</strong> {selectedParticipant.rank}
                  </p>
                  <p>
                    <strong>Bio:</strong> {selectedParticipant.bio}
                  </p>
                </div>
              )}
            </section>
          )}

          {tab === "owner" && isOwner && (
            <section className="card">
              <h2>Owner Profile</h2>
              <button onClick={loadOwnerProfile}>Load Profile</button>
              {ownerProfile && (
                <div className="details-box">
                  <p>
                    <strong>Name:</strong> {ownerProfile.name}
                  </p>
                  <p>
                    <strong>Role:</strong> {ownerProfile.role}
                  </p>
                  <p>
                    <strong>Organization:</strong> {ownerProfile.organization}
                  </p>
                  <p>
                    <strong>Bio:</strong> {ownerProfile.bio}
                  </p>
                </div>
              )}
            </section>
          )}
        </>
      )}
    </section>
  );
}
