import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { OWNER_EMAIL } from "../config.js";
import { requireAuth } from "../middleware/auth.js";
import { ownerOnly } from "../middleware/ownerOnly.js";
import { Event } from "../models/Event.js";
import { Announcement } from "../models/Announcement.js";
import { Participant } from "../models/Participant.js";
import { User } from "../models/User.js";

function asyncHandler(fn) {
  return function asyncRouteHandler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function isValidObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

export function createApiRouter({ jwtSecret } = {}) {
  if (!jwtSecret) {
    throw new Error("createApiRouter requires jwtSecret");
  }

  const router = express.Router();

  router.get(
    "/health",
    asyncHandler(async (_req, res) => {
      res.json({ ok: true });
    })
  );

  router.post(
    "/auth/login",
    asyncHandler(async (req, res) => {
      const email = (req.body?.email || "").toString().trim().toLowerCase();
      const password = (req.body?.password || "").toString();

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "email and password are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = jwt.sign(
        { email: user.email, name: user.name },
        jwtSecret,
        { expiresIn: "7d", algorithm: "HS256" }
      );

      return res.json({
        name: user.name,
        email: user.email,
        isOwner: user.email === OWNER_EMAIL,
        token
      });
    })
  );

  router.post(
    "/auth/signup",
    asyncHandler(async (req, res) => {
      const name = (req.body?.name || "").toString().trim();
      const email = (req.body?.email || "").toString().trim().toLowerCase();
      const password = (req.body?.password || "").toString();

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "name, email and password are required." });
      }

      if (email === OWNER_EMAIL) {
        return res.status(403).json({ message: "This email is reserved." });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters." });
      }

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: "Account already exists." });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      let user;
      try {
        user = await User.create({ name, email, passwordHash });
      } catch (err) {
        if (err?.code === 11000) {
          return res.status(409).json({ message: "Account already exists." });
        }
        throw err;
      }

      const token = jwt.sign(
        { email: user.email, name: user.name },
        jwtSecret,
        { expiresIn: "7d", algorithm: "HS256" }
      );

      return res.status(201).json({
        name: user.name,
        email: user.email,
        isOwner: false,
        token
      });
    })
  );

  router.get(
    "/auth/me",
    requireAuth,
    asyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.user.email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.json({
        name: user.name,
        email: user.email,
        isOwner: user.email === OWNER_EMAIL
      });
    })
  );

  router.get(
    "/events",
    asyncHandler(async (_req, res) => {
      const events = await Event.find().sort({ createdAt: -1 });
      res.json(events);
    })
  );

  router.post(
    "/events",
    ownerOnly,
    asyncHandler(async (req, res) => {
      const { title, game, date, location } = req.body || {};
      if (!title || !game || !date || !location) {
        return res
          .status(400)
          .json({ message: "title, game, date and location are required." });
      }

      const event = await Event.create({
        title,
        game,
        date,
        location,
        createdBy: OWNER_EMAIL
      });

      res.status(201).json(event);
    })
  );

  router.post(
    "/events/:id/register",
    requireAuth,
    asyncHandler(async (req, res) => {
      const eventId = req.params.id;
      if (!isValidObjectId(eventId)) {
        return res.status(400).json({ message: "Invalid event id." });
      }

      const name = req.user?.name;
      const email = req.user?.email;
      if (!name || !email) {
        return res
          .status(401)
          .json({ message: "Authentication required." });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found." });
      }

      const existing = await Participant.findOne({ eventId, email });
      if (existing) {
        return res
          .status(409)
          .json({ message: "You are already registered for this event." });
      }

      const participant = await Participant.create({
        name,
        email,
        game: event.game,
        eventId: event._id,
        eventTitle: event.title,
        rank: "New Player",
        bio: ""
      }).catch((err) => {
        if (err?.code === 11000) {
          return null;
        }
        throw err;
      });

      if (!participant) {
        return res
          .status(409)
          .json({ message: "You are already registered for this event." });
      }

      res.status(201).json(participant);
    })
  );

  router.get(
    "/announcements",
    asyncHandler(async (_req, res) => {
      const announcements = await Announcement.find().sort({ createdAt: -1 });
      res.json(announcements);
    })
  );

  router.post(
    "/announcements",
    ownerOnly,
    asyncHandler(async (req, res) => {
      const { message } = req.body || {};
      if (!message) {
        return res.status(400).json({ message: "message is required." });
      }

      const announcement = await Announcement.create({
        message,
        createdBy: OWNER_EMAIL
      });

      res.status(201).json(announcement);
    })
  );

  router.get(
    "/participants",
    asyncHandler(async (_req, res) => {
      const participants = await Participant.find().sort({ createdAt: -1 });
      res.json(participants);
    })
  );

  router.get(
    "/participants/:id",
    asyncHandler(async (req, res) => {
      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid participant id." });
      }
      const participant = await Participant.findById(req.params.id);
      if (!participant) {
        return res.status(404).json({ message: "Participant not found." });
      }
      res.json(participant);
    })
  );

  router.get(
    "/owner-profile",
    ownerOnly,
    asyncHandler(async (_req, res) => {
      res.json({
        name: "Vaibhav",
        role: "Owner",
        organization: "Bardoli E-Sports",
        bio: "Organizer of Free Fire, PUBG, Call of Duty and other gaming events."
      });
    })
  );

  router.use((_req, res) => {
    res.status(404).json({ message: "Not found." });
  });

  return router;
}
