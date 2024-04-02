const classService = require("../services/classService");

exports.createClass = async (req, res) => {
  try {
    const { class_name, desc, academic_year, subjects } = req.body;
    console.log(req.body);
    const result = await classService.createClass(
      class_name,
      desc,
      academic_year,
      subjects
    );
    // console.log(result);
    res
      .status(200)
      .json({ messaga: "class created", insertId: result.insertId });
  } catch (error) {
    console.log("error at classController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.editClass = async (req, res) => {
  try {
    const { class_name, desc, academic_year, class_id, subjects } = req.body;
    console.log(req.body);
    const result = await classService.editClass(
      class_name,
      desc,
      academic_year,
      subjects,
      class_id
    );
    // console.log(result);
    res
      .status(200)
      .json({ messaga: "class updated", insertId: result.insertId });
  } catch (error) {
    console.log("error at classController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getClass = async (req, res) => {
  try {
    const [result] = await classService.getClass();
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at classController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getClassById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await classService.getClassById(id);
    // console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error at classController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getClassByUserIdForTeacher = async (req, res) => {
  try {
    const user_id = req.session.user_id;
    // console.log(req.session);
    // console.log(user_id);
    // console.log("hello hello hello");
    const [result] = await classService.getClassByUserIdForTeacher(user_id);
    // console.log(result);
    res.status(200).json({ data : result });
  } catch (error) {
    console.log("error at classController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteClassByID = async (req, res) => {
  try {
    const class_id = req.params.id;
    const [result] = await classService.deleteClassByID(class_id);
    // console.log(result);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log("error at classController", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
