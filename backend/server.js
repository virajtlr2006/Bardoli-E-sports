import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Participant } from "./models/Participant.js";
import { User } from "./models/User.js";
import { createApiRouter } from "./routes/api.js";
import { OWNER_EMAIL, OWNER_PASSWORD } from "./config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bardoli_esports";

app.use(cors());
app.use(express.json());

const JWT_SECRET =
  process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

if (!process.env.JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set. Using an ephemeral secret (tokens reset on restart)."
  );
}

app.locals.jwtSecret = JWT_SECRET;

app.use("/api", createApiRouter({ jwtSecret: JWT_SECRET }));

// Centralized error handler (keeps responses consistent for async route errors)
app.use((err, _req, res, _next) => {
  console.error("Request failed:", err);
  if (res.headersSent) return _next(err);
  res.status(500).json({ message: "Internal server error." });
});

async function removeDummyParticipants() {
  await Participant.deleteMany({
    email: {
      $in: ["harsh.player@example.com", "nisha.pro@example.com", "ravi.cod@example.com"]
    }
  });
}

async function ensureOwnerUser() {
  const passwordHash = await bcrypt.hash(OWNER_PASSWORD, 10);

  await User.updateOne(
    { email: OWNER_EMAIL },
    {
      $set: {
        name: "Vaibhav",
        email: OWNER_EMAIL,
        passwordHash
      }
    },
    { upsert: true }
  );
}

async function start() {
  await mongoose.connect(MONGO_URI);
  await User.syncIndexes();
  await Participant.syncIndexes();

  await ensureOwnerUser();

  if ((process.env.CLEAN_DUMMY_PARTICIPANTS || "").toLowerCase() === "true") {
    await removeDummyParticipants();
  }

  const server = http.createServer(app);

  server.on("error", (err) => {
    if (err?.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Stop the other process or set PORT to a different value.`
      );
      process.exit(1);
    }

    console.error("Server error:", err);
    process.exit(1);
  });

  await new Promise((resolve) => {
    server.listen(PORT, resolve);
  });

  console.log(`Backend running on http://localhost:${PORT}`);
}

start().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
