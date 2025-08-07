const express = require("express");
const {
  schoolRegister,
  schoolLogin,
} = require("../controller/schoolController");
const router = express.Router();

router.post("/schoolRegister", schoolRegister);
router.post("/schoolLogin", schoolLogin);

module.exports = router;
