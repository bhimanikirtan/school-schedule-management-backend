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
const fetchUser = async (req, res) => {
  try {
    const id = req.user.id;
    // console.log(id);

    const fetchUser = await User.findById(id);
    // console.log(fetchUser);

    return res
      .status(200)
      .json({ status: true, msg: "fetch user successfully", fetchUser });
  } catch (erro) {
    res.status(500).json({ status: false, msg: "failed to fetch user" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(req.body);

    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      addressData: {
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        state: req.body.state,
        country: req.body.country,
      },
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updateUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateUser) {
      return res.status(400).json({ status: 400, msg: "User not found" });
    }

    return res.status(200).json({
      status: 200,
      msg: "UserProfile updated successfully",
      updateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, msg: "ProfileUpdate Failed" });
  }
};
module.exports = {
  Login,
  fetchUser,
  updateProfile,
};
