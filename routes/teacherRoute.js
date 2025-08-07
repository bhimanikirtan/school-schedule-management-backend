const express = require("express");
const { teacherRegister } = require("../controller/teacherController");
const router = express.Router();

router.post("/teacherRegister", teacherRegister);
module.exports = router;
