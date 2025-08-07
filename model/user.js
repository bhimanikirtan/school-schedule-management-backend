const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,
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
  addressData: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  image: String,
});

module.exports = mongoose.model("User", userSchema);
