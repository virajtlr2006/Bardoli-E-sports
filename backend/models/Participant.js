import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    game: { type: String, required: true, trim: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    eventTitle: { type: String, required: true, trim: true },
    rank: { type: String, required: true, trim: true },
    bio: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

participantSchema.index({ eventId: 1, email: 1 }, { unique: true });

export const Participant = mongoose.model("Participant", participantSchema);
