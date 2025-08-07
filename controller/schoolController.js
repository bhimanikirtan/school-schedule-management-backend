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
      .json({ status: true, msg: "Register Successfully", newUser });
  } catch (error) {
    res.status(500).json({ status: false, msg: "error to register" });
  }
};
const schoolLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({ status: 400, msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, msg: "Invalid credentials" });
    }

    const user = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
    };
    const token = generateJWTToken(user);

    return res
      .status(200)
      .json({ status: 200, msg: "User login successfully", user, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: 500, msg: "Login Failed" });
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

    // Save token to school user (optional, but as per your code)
    findSchool.resetToken = token;
    await findSchool.save();

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/teacherRegister?token=${token}`;

    // Send email
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

module.exports = {
  schoolRegister,
  schoolLogin,
  sendEmaillink,
};
