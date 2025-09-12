import React from "react";
import RegistrationForm from "./RegistrationForm";
import AttendanceScanner from "./AttendanceScanner";
import Admin from "./Admin";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Attendance System</h1>
      <RegistrationForm />
      <hr />
      <AttendanceScanner />
      <hr />
      <Admin />
    </div>
  );
}

export default App;
