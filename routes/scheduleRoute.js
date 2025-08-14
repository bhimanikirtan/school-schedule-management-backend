const express = require("express");
const {
  setSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllteacherSchedules,
} = require("../controller/scheduleController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/setSchedule", verifyToken, setSchedule);
router.get("/getAllschedules", verifyToken, getAllSchedules);
router.get("/getAllteacherschedules", verifyToken, getAllteacherSchedules);
router.put("/updateSchedule/:id", updateSchedule);
router.delete("/deleteSchedule/:id", deleteSchedule);
module.exports = router;
``;
