import React, { useState } from "react";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [qr, setQr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setQr("");

    try {
      const res = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ " + (data.message || "Error registering participant"));
      } else {
        setMessage("✅ " + data.message);
        setName("");
        setEmail("");

      
        const qrRes = await fetch(`/api/qr/${data.participant.registrationId}`);
        const qrData = await qrRes.json();
        setQr(qrData.qr);
      }
    } catch (err) {
      console.error("Error registering participant:", err);
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Register
        </button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}

      {qr && (
        <div style={{ marginTop: "20px" }}>
          <h4>Your QR Code</h4>
          <img src={qr} alt="QR Code" style={{ width: "200px" }} />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <a
          href="/api/export"
          download
          style={{
            display: "inline-block",
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          ⬇️ Download Excel
        </a>
      </div>
    </div>
  );
};

export default RegistrationForm;
