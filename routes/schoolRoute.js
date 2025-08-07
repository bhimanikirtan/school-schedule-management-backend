const express = require("express");
const {
  schoolRegister,
  sendEmaillink,
  getAllteachers,
} = require("../controller/schoolController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/schoolRegister", schoolRegister);
router.post("/sendEmail", verifyToken, sendEmaillink);
router.get("/getAllteachers", verifyToken, getAllteachers);

module.exports = router;
