// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import participantRoutes from "./routes/participants.js";
import exportRoutes from "./routes/export.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "eventDB" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use("/api/participants", participantRoutes);
app.use("/api/export", exportRoutes);

// Serve React Frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all fallback to serve React for any unmatched route
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"), (err) => {
    if (err) next(err);
  });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
