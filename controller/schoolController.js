const { generateJWTToken } = require("../middleware/auth");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const schoolRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findSchool = await User.findOne({ email });
    if (findSchool) {
      res.status(500).json({ status: false, msg: "School already Register" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "school",
    });
    return res
      .status(200)
      .json({ status: true, msg: "School Register Successfully", newUser });
  } catch (error) {
    res.status(500).json({ status: false, msg: "error to register" });
  }
};
const sendEmaillink = async (req, res) => {
  try {
    console.log("Sending teacher register link...");

    const id = req.user.id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const findSchool = await User.findById(id);

    if (!findSchool) {
      return res.status(404).json({ msg: "School not found" });
    }
    findSchool.resetToken = token;
    await findSchool.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.REACTBASE_URL}/teacherRegister?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Register as Teacher",
      html: `<p>You have been invited to register as a teacher. Click the link below to register:</p><a href="${resetLink}"><strong>Register Here</strong></a>`,
    });

    res.json({ msg: "Teacher registration link sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error sending teacher register link." });
  }
};
const getAllteachers = async (req, res) => {
  try {
    const schoolId = req.user.id;
    const allTeachers = await User.find({ connectedSchool: schoolId });
    res
      .status(200)
      .json({ status: true, msg: "fetch Teachers successfully", allTeachers });
  } catch (error) {
    res.status(500).json({ status: false, msg: "failed to fetch data" });
  }
};

module.exports = {
  schoolRegister,
  sendEmaillink,
  getAllteachers,
};
