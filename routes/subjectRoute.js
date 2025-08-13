const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  addSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} = require("../controller/subjectController");
const router = express.Router();

router.post("/addSubject", verifyToken, addSubject);
router.get("/getAllSubjects", verifyToken, getAllSubjects);
router.put("/updateSubject/:id", updateSubject);
router.delete("/deleteSubject/:id", deleteSubject);

module.exports = router;
