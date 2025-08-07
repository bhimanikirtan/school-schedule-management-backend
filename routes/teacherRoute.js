const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  teacherRegister,
  teacherLogin,
} = require("../controller/teacherController");
const router = express.Router();

router.post("/teacherRegister", teacherRegister);
router.post("/teacherLogin", teacherLogin);
module.exports = router;
