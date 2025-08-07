const { generateJWTToken } = require("../middleware/auth");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
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
  Login,
};
