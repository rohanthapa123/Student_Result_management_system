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
