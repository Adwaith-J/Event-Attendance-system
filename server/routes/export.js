import express from "express";
import ExcelJS from "exceljs";
import Participant from "../models/Participant.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Participants");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Registration ID", key: "registrationId", width: 25 },
      { header: "Attended", key: "attended", width: 10 },
      { header: "Timestamp", key: "timestamp", width: 30 }
    ];

    participants.forEach((p) => worksheet.addRow(p));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=participants.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
