const studentModel = require("../models/studentModel");

exports.getAllStudents = async (req, res) => {
  try {
    const { class_id: id, search: sid } = req.query;
    if (id) {
      const [result] = await studentModel.getAllStudents(id);
      res
        .status(200)
        .json({ mesage: "student Data got successfully", data: result });
    } else if (sid) {
      const [result] = await studentModel.getAllStudents(null, sid);
      res
        .status(200)
        .json({ mesage: "student Data got successfully", data: result });
    } else {
      const [result] = await studentModel.getAllStudents();
      res
        .status(200)
        .json({ mesage: "student Data got successfully", data: result });
    }
  } catch (error) {
    console.log(error, "Error at student controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await studentModel.getStudentById(id);
    res
      .status(200)
      .json({ mesage: "student Data got successfully", data: result });
  } catch (error) {
    console.log(error, "Error at student controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getNextRollNo = async (req, res) => {
  try {
    const { id: class_id } = req.params;
    // console.log(class_id);
    const result = await studentModel.getNextRollNo(class_id);
    res.status(200).json({ message: "New roll no got", data: result });
  } catch (error) {
    console.log(error, "Error at student Controller");
    if (error.message && error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Cant get new rollno" });
    }
  }
};
