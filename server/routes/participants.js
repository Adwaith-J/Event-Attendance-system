import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await Participant.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const registrationId = "EVT-" + Date.now();
    const participant = new Participant({ name, email, registrationId });
    await participant.save();

    res.status(201).json({ message: "Registered successfully", participant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/attendance", async (req, res) => {
  try {
    const { registrationId } = req.body;
    const participant = await Participant.findOne({ registrationId });
    if (!participant) return res.status(404).json({ message: "Participant not found" });
    if (participant.attended) return res.status(400).json({ message: "Attendance already marked" });

    participant.attended = true;
    participant.timestamp = new Date();
    await participant.save();

    res.status(200).json({ message: "Attendance marked", participant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
