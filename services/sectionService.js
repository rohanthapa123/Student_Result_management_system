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
