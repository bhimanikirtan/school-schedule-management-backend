const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["school", "teacher"],
    required: true,
  },
  connectedSchool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resetToken: String,
});

module.exports = mongoose.model("User", userSchema);
