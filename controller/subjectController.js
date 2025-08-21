const Subject = require("../model/subject");

const addSubject = async (req, res) => {
  try {
    const { subject, category } = req.body;
    const schoolId = req.user.id;

    if (!subject || !category) {
      return res
        .status(409)
        .json({ status: false, msg: "Subject and category name is required" });
    }

    const newSubject = new Subject({
      schoolId,
      subject,
      category,
    });

    await newSubject.save();
    return res
      .status(200)
      .json({ status: true, msg: "Subject added successfully", newSubject });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Server error" });
  }
};
const getAllSubjects = async (req, res) => {
  try {
    const schoolId = req.user.id;
    const allSubjects = await Subject.find({ schoolId });
    return res
      .status(200)
      .json({ status: true, msg: "Fetch All Subjects", allSubjects });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "error to fetch Subjects" });
  }
};
const updateSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const { subject, category } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { subject, category },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ status: false, msg: "Subject not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Subject updated successfully",
      data: updatedSubject,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error updating subject",
    });
  }
};
const deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const deleteSubject = await Subject.findByIdAndDelete(subjectId);
    return res.status(200).json({
      status: true,
      msg: "Subject Deleted SuccessFully",
      deleteSubject,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error deleteing subject",
    });
  }
};

module.exports = { addSubject, getAllSubjects, updateSubject, deleteSubject };
