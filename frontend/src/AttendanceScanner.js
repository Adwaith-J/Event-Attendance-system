import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import axios from "axios";

const AttendanceScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data.text);
      try {
        const res = await axios.patch("http://localhost:4000/api/participants/attendance", {
          registrationId: data.text,
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error marking attendance");
      }
    }
  };

  const handleError = (err) => console.error(err);

  return (
    <div>
      <h2>Attendance Scanner</h2>
      <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "300px" }} />
      {scanResult && <p>Scanned ID: {scanResult}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AttendanceScanner;
