import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

export default function RegistrationForm(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [registrationId, setRegistrationId] = useState(null);
  const base = 'http://localhost:4000';

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base}/api/participants`, { name, email });
      // server returns qrDataUrl + participant => show it
      setQrDataUrl(res.data.qrDataUrl);
      setRegistrationId(res.data.participant.registrationId);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Register</button>
      </form>

      {qrDataUrl && (
        <div style={{ marginTop: 12 }}>
          <p>Server-generated QR (PNG data URL)</p>
          <img src={qrDataUrl} alt="qr" style={{ width: 150, height: 150 }} />
        </div>
      )}

      {!qrDataUrl && registrationId && (
        <div style={{ marginTop: 12 }}>
          <p>Client-rendered QR from id</p>
          <QRCode value={registrationId} />
        </div>
      )}
    </div>
  );
}
