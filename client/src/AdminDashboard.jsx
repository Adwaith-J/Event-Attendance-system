import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const base = 'http://localhost:4000';

export default function AdminDashboard(){
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const socket = io(base);
    socket.on('connect', () => console.log('connected to socket'));
    socket.on('attendance', (payload) => {
      // Prepend new record
      setRows(prev => [payload, ...prev]);
    });
    return () => socket.disconnect();
  }, []);

  const downloadExcel = () => {
    window.location.href = `${base}/api/export`; // triggers file download
  };

  return (
    <div>
      <button onClick={downloadExcel}>Download Excel</button>
      <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Time</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{new Date(r.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
