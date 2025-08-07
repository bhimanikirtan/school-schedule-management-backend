const express = require("express");
const { Login } = require("../controller/loginController");
const router = express.Router();

router.post("/", Login);

module.exports = router;
