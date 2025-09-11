const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  registrationId: { type: String, required: true },
  eventId: { type: String, required: true },
  status: { type: String, default: "present" },
  timestamp: { type: Date, default: Date.now }
});

AttendanceSchema.index({ eventId: 1, registrationId: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
