const sectionModel = require("../models/sectionModel")

exports.createSection = async (sectionData) => {
  try {
    const result = await sectionModel.createSection(sectionData);
    return result;
  } catch (error) {
    console.log("erro at sectionService", error);
    throw error;
  }
};
exports.getSectionByClass = async (class_id) => {
  try {
    const [result] = await sectionModel.getSectionByClass(class_id);
    return [result];
  } catch (error) {
    console.log("erro at sectionService", error);
    throw error;
  }
};
