const User = require("../model/user");
const Schedule = require("../model/schedule");

const setSchedule = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.user.id;
    const { teacherId, title, start, end, className, subject } = req.body;

    if (!teacherId || !title || !start || !end || !className || !subject) {
      return res
        .status(400)
        .json({ status: false, msg: "All fields are required" });
    }

    const schedule = new Schedule({
      teacherId,
      schoolId: id,
      className,
      subject,
      title,
      start,
      end,
    });

    await schedule.save();

    return res
      .status(200)
      .json({ status: true, msg: "Schedule Added Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: "Add Schedule Error" });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schoolId = req.user.id;
    const { teacherId } = req.query;
    let scheduleQuery = { schoolId: schoolId };
    if (teacherId) {
      scheduleQuery.teacherId = teacherId;
    }
    const allSchedules = await Schedule.find(scheduleQuery).populate(
      "teacherId schoolId"
    );

    return res
      .status(200)
      .json({ status: true, msg: "Fetch All Schedules", allSchedules });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Failed to Fetch Schedule" });
  }
};

const getAllteacherSchedules = async (req, res) => {
  try {
    const id = req.user.id;
    const allteacherSchedule = await Schedule.find({ teacherId: id }).populate(
      "teacherId schoolId"
    );

    return res.status(200).json({
      status: true,
      msg: "Fetch All Teacher Schedules",
      allteacherSchedule,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Failed to Fetch Schedule" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const { start, end, teacherId, title, className, subject } = req.body;

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { start, end, teacherId, title, className, subject },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      msg: "Schedule Updated Successfully",
      updatedSchedule,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Error to Update Schedule" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const deleteId = req.params.id;
    await Schedule.findByIdAndDelete(deleteId);

    return res
      .status(200)
      .json({ status: true, msg: "Schedule Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Error to Delete Schedule" });
  }
};

module.exports = {
  setSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  getAllteacherSchedules,
};
