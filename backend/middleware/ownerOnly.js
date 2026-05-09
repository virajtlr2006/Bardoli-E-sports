import { OWNER_EMAIL } from "../config.js";

import jwt from "jsonwebtoken";

function extractBearerToken(req) {
  const header = (req.headers?.authorization || "").toString().trim();
  const prefix = "Bearer ";
  if (!header.startsWith(prefix)) return "";
  return header.slice(prefix.length).trim();
}

export function ownerOnly(req, res, next) {
  const jwtSecret = req.app?.locals?.jwtSecret;
  if (!jwtSecret) {
    return res.status(500).json({ message: "Server auth is not configured." });
  }

  const token = extractBearerToken(req);
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const email = (payload?.email || "").toString().trim().toLowerCase();
    if (email !== OWNER_EMAIL) {
      return res.status(403).json({ message: "Owner access only." });
    }

    req.userEmail = email;
    next();
  } catch (_err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
