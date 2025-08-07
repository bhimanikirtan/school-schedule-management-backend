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

module.exports = {
  teacherRegister,
};
