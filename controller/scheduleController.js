const User = require("../model/user");
const Schedule = require("../model/schedule");

const setSchedule = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.user.id;
    const { teacherId, title, start, end } = req.body;
    if (!teacherId || !title || !start || !end) {
      return res
        .status(400)
        .json({ status: false, msg: "All fields are required" });
    }

    const schedule = new Schedule({
      teacherId,
      schoolId: id,
      title,
      start,
      end,
    });
    await schedule.save();
    return res
      .status(200)
      .json({ status: true, msg: "Schedule Added successFully" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Add Schedule error" });
  }
};
const getAllSchedules = async (req, res) => {
  try {
    const id = req.user.id;
    const allSchedules = await Schedule.find({ schoolId: id }).populate(
      "teacherId schoolId"
    );
    return res
      .status(200)
      .json({ status: true, msg: "fetch All schedules", allSchedules });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "failed to fetch schedule" });
  }
};
const getAllteacherSchedules = async (req, res) => {
  try {
    const id = req.user.id;
    const allteacherSchedule = await Schedule.find({ teacherId: id }).populate(
      "teacherId schoolId"
    );
    return res
      .status(200)
      .json({ status: true, msg: "fetch All schedules", allteacherSchedule });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "failed to fetch schedule" });
  }
};
const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    console.log(scheduleId);

    const { start, end, teacherId, title } = req.body;
    console.log(req.body);

    await Schedule.findByIdAndUpdate(
      scheduleId,
      {
        start,
        end,
        teacherId,
        title,
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      msg: "Schedule Update SuccessFully",
      updateSchedule,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "error to update Schedule" });
  }
};
const deleteSchedule = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const deleteschedule = await Schedule.findByIdAndDelete(deleteId);
    return res
      .status(200)
      .json({ status: true, msg: "Schedule Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "error to delete schedule" });
  }
};

module.exports = {
  setSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllteacherSchedules,
};
