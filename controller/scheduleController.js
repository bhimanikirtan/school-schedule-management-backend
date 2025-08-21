const User = require("../model/user");
const Schedule = require("../model/schedule");

const setSchedule = async (req, res) => {
  try {
    const id = req.user.id;
    const { teacherId, title, start, end, className, subject, rrule } =
      req.body;
    if (!teacherId || !title || !start || !end || !className || !subject) {
      return res
        .status(404)
        .json({ status: false, msg: "All fields are required" });
    }

    const scheduleData = {
      teacherId,
      schoolId: id,
      className,
      subject,
      title,
      start,
      end,
    };

    if (rrule) {
      scheduleData.rrule = rrule;
      scheduleData.isRecurring = true;
    } else {
      scheduleData.isRecurring = false;
    }

    const schedule = new Schedule(scheduleData);
    await schedule.save();

    return res
      .status(200)
      .json({ status: true, msg: "Schedule Added Successfully" });
  } catch (error) {
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
    return res
      .status(500)
      .json({ status: false, msg: "Failed to Fetch Schedule" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const { start, end, teacherId, title, className, subject, rrule } =
      req.body;

    const updateData = {
      start,
      end,
      teacherId,
      title,
      className,
      subject,
    };

    if (rrule) {
      updateData.rrule = rrule;
      updateData.isRecurring = true;
    } else {
      updateData.rrule = null;
      updateData.isRecurring = false;
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      status: true,
      msg: "Schedule Updated Successfully",
      updatedSchedule,
    });
  } catch (error) {
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
