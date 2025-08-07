const User = require("../model/user");
const bcrypt = require("bcryptjs");
const teacherRegister = async (req, res) => {
  try {
    console.log(req.body, "hello");

    const { name, email, password, token } = req.body;
    const findSchool = await User.findOne({ email });
    if (findSchool) {
      res.status(500).json({ status: false, msg: "Teacher already Register" });
    }
    const findToken = await User.findOne({ resetToken: token });
    console.log(findToken, "schooltoken");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "teacher",
      connectedSchool: findToken._id,
    });
    findToken.resetToken = null;
    await findToken.save();
    return res
      .status(200)
      .json({ status: true, msg: "Teacher Register Successfully", newUser });
  } catch (error) {
    res.status(500).json({ status: false, msg: "error to register" });
  }
};
const teacherLogin = async (req, res) => {
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

module.exports = {
  teacherRegister,
  teacherLogin,
};
