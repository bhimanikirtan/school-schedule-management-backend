const express = require("express");
const {
  Login,
  fetchUser,
  updateProfile,
} = require("../controller/loginController");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", Login);
router.get("/fetchUser", verifyToken, fetchUser);
router.put(
  "/updateProfile",
  upload.single("image"),
  verifyToken,
  updateProfile
);

module.exports = router;
