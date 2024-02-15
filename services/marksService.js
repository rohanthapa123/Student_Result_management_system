const MarksModel = require("../models/marksModel");

exports.insertMark = async (subject_id,
    exam_id,
    student_id,
    marks_obtained,
    remarks,
    grade) => {
  try {
    const result = await MarksModel.insertMark(
      subject_id,
      exam_id,
      student_id,
      marks_obtained,
      remarks,
      grade
    );
    return result;
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
exports.getMarksOfStudentByExam = async (student_id, exam_id) => {
  try {
    const [result] = await MarksModel.getMarksOfStudentByExam(student_id, exam_id);
    return [result];
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
exports.getMarksByClass = async (class_id) => {
  try {
    const [result] = await MarksModel.getMarksByClass(class_id);
    return [result];
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
exports.deleteMarksById = async (marks_id) => {
  try {
    const [result] = await MarksModel.deleteMarkById(marks_id);
    return [result];
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
