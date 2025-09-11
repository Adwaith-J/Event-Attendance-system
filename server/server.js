// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import participantsRoutes from "./routes/participants.js";
import exportRoutes from "./routes/export.js"; // <-- This matches your export.js file

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/participants", participantsRoutes);
app.use("/api/export", exportRoutes); // <-- Mount export routes

// Root test route
app.get("/", (req, res) => {
  res.send("✅ Event Attendance API is running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
