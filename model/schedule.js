const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  rrule: {
    type: String,
    default: null,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
