const express = require("express");
const {
  schoolRegister,
  sendEmaillink,
} = require("../controller/schoolController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/schoolRegister", schoolRegister);
router.post("/sendEmail", verifyToken, sendEmaillink);

module.exports = router;
