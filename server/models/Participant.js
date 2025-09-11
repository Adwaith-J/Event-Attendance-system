import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registrationId: { type: String, required: true, unique: true },
  attended: { type: Boolean, default: false },
  timestamp: { type: Date }
});

export default mongoose.model("Participant", ParticipantSchema);
