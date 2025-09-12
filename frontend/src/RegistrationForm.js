import React, { useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/participants", { name, email });
      alert(res.data.message);
      setQrValue(res.data.participant.registrationId);
      setName("");
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering participant");
    }
  };

  return (
    <div>
      <h2>Register Participant</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Register</button>
      </form>

      {qrValue && (
        <div style={{ marginTop: "20px" }}>
          <h3>QR Code:</h3>
          <QRCodeSVG value={qrValue} size={150} />
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
