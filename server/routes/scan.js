import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { registrationId } = req.body;
    const participant = await Participant.findOne({ registrationId });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    if (participant.attended) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    participant.attended = true;
    participant.attendedAt = new Date();
    await participant.save();

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
