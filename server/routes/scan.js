import express from "express";
import QRCode from "qrcode";
import Participant from "../models/Participant.js";

const router = express.Router();

router.get("/:registrationId", async (req, res) => {
  try {
    const { registrationId } = req.params;
    const participant = await Participant.findOne({ registrationId });
    if (!participant) return res.status(404).json({ message: "Participant not found" });

    const qrData = await QRCode.toDataURL(registrationId);
    res.json({ qr: qrData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
