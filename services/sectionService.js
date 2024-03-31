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
exports.updateSection = async (sectionData) => {
  try {
    const result = await sectionModel.updateSection(sectionData);
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
exports.getSections = async (id, limit, offset) => {
  try {
    const result = await sectionModel.getSections(id , limit, offset);
    return result;
  } catch (error) {
    console.log("error at sectionService", error);
    throw error;
  }
};
exports.getSectionById = async (id) => {
  try {
    const [result] = await sectionModel.getSectionById(id);
    return [result];
  } catch (error) {
    console.log("erro at sectionService", error);
    throw error;
  }
};
exports.deleteSectionById = async (section_id) => {
  try {
    const [result] = await sectionModel.deleteSectionById(section_id);
    return [result];
  } catch (error) {
    console.log("erro at sectionService", error);
    throw error;
  }
};
