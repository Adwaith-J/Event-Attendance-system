import React, { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [participants, setParticipants] = useState([]);

  
  useEffect(() => {
  fetch("/api/participants")
    .then((res) => res.json())
    .then((data) => setParticipants(data))
    .catch((err) => console.error("Error fetching participants:", err));
}, []);


  return (
    <div className="dashboard-container">
      <h2>📋 Registered Participants</h2>
      <table className="participants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registration ID</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.registrationId}</td>
              <td className={p.attended ? "status-present" : "status-absent"}>
                {p.attended ? "✅ Present" : "❌ Absent"}
              </td>
              <td>{p.timestamp ? new Date(p.timestamp).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
