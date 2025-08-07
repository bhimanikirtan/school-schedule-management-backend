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
// const sendEmaillink = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const token = crypto.randomBytes(32).toString("hex");
//     console.log(token);
//     req.user.resetToken = token;
//     await req.user.save();
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//     const resetLink = `${process.env.REACTBASE_URL}/teacherRegister?token=${token}`;
//     await transporter.sendMail({
//       to: email,
//       subject: "Register For Teacher",
//       html: ` For TeacherRegister:<a href="${resetLink}"><h1>Click here</h1></a>`,
//     });
//     res.json({ msg: "Teacher Register Link send" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ status: false, msg: "send register link error" });
//   }
// };

module.exports = {
  schoolRegister,
  schoolLogin,
};
