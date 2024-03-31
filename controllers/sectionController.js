const sectionService = require("../services/sectionService");

exports.createSection = async (req, res) => {
  try {
    const sectionData = req.body;
    const result = await sectionService.createSection(sectionData);
    res
      .status(200)
      .json({
        message: "section created successfully",
        sectionId: result.insertId,
      });
  } catch (error) {
    console.log("Error at sectionController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateSection = async (req, res) => {
  try {
    const sectionData = req.body;
    const result = await sectionService.updateSection(sectionData);
    res
      .status(200)
      .json({
        message: "section updated successfully",
        sectionId: result.insertId,
      });
  } catch (error) {
    console.log("Error at sectionController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getSectionByClass = async (req, res) => {
  try {
    const class_id = req.params.id;
    const [result] = await sectionService.getSectionByClass(class_id);
    res
      .status(200)
      .json({
        message: "Section got successfully",
        data: result,
      });
  } catch (error) {
    console.log("Error at sectionController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getSections = async (req, res) => {
  try {
    const {class_id : id, limit, offset} = req.query;
    const result = await sectionService.getSections(id, limit, offset);
    console.log(result.pages[0].total);
    console.log(result)
    console.log("Total Page", Math.ceil(result.pages[0].total / limit))
    const totalPage = Math.ceil(result.pages[0].total / limit);
    res
      .status(200)
      .json({
        message: "Section got successfully",
        data: {result : result.result[0] , totalPage: totalPage},
      });
  } catch (error) {
    console.log("Error at sectionController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getSectionById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await sectionService.getSectionById(id);
    res
      .status(200)
      .json({
        message: "Section got successfully",
        data: result,
      });
  } catch (error) {
    console.log("Error at sectionController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteSectionById = async (req, res) => {
  try {
    const section_id = req.params.id;
    const [result] = await sectionService.deleteSectionById(section_id);
    res
      .status(200)
      .json({
        message: "Section deleted successfully",
        data: result,
      });
  } catch (error) {
    console.log("Error at sectionController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
