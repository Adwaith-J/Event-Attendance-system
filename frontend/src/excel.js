import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (participants) => {
  if (!participants || participants.length === 0) return;

  const data = participants.map((p) => ({
    Name: p.name,
    Email: p.email,
    "Registration ID": p.registrationId,
    Status: p.attended ? "Present" : "Absent",
    Timestamp: p.timestamp ? new Date(p.timestamp).toLocaleString() : "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "attendance.xlsx");
};
