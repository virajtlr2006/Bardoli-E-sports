import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    game: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    prize: { type: String, required: true, trim: true },
    createdBy: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
