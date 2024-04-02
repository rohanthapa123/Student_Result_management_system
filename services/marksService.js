const MarksModel = require("../models/marksModel");

exports.insertMark = async (marks) => {
  try {
    const result = await MarksModel.insertMark(marks);
    return result;
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
exports.getResult = async ( user_id, exam_term) => {
  try {
    const result = await MarksModel.getResult(
            user_id, exam_term
    );
    return result;
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
exports.getMarksByClass = async (class_id, exam_id) => {
  try {
    const [result] = await MarksModel.getMarksByClass(class_id, exam_id);
    return [result];
  } catch (error) {
    console.log("Error at marksService", error);
    throw error;
  }
};
exports.getAllMarksByClass = async (class_id, term) => {
  try {
    const [result] = await MarksModel.getAllMarksByClass(class_id, term);
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
