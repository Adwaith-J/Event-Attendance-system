import express from "express";
import Participant from "../models/Participant.js";
import XLSX from "xlsx";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();

    const data = participants.map(p => ({
      Name: p.name,
      Email: p.email,
      ID: p.registrationId,
      Status: p.attendance ? "Present" : "Absent",
      Timestamp: p.attendanceTimestamp || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const filename = "attendance.xlsx";
    XLSX.writeFile(workbook, filename);

    res.download(filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to export attendance" });
  }
});

export default router;
