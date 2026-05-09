import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    createdBy: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
