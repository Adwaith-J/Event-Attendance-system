import React from 'react';
import RegistrationForm from './RegistrationForm';
import QRScanner from './QRScanner';
import AdminDashboard from './AdminDashboard';

export default function App(){
  return (
    <div style={{ padding: 20 }}>
      <h1>Event Attendance (MERN)</h1>
      <div style={{ display: 'flex', gap: 40 }}>
        <div style={{ flex: 1 }}>
          <h2>Register</h2>
          <RegistrationForm />
          <h2 style={{ marginTop: 30 }}>Scanner</h2>
          <QRScanner />
        </div>
        <div style={{ width: 500 }}>
          <h2>Admin Dashboard</h2>
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}
