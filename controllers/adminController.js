const adminModel = require("../models/adminModel");

exports.getAllAdmins = async (req, res) => {
  try {
    const [result] = await adminModel.getAllAdmins();
    res
      .status(200)
      .json({ mesage: "admin Data got successfully", data: result });
  } catch (error) {
    console.log(error, "Error at admin controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await adminModel.getAdminById(id);
    res
      .status(200)
      .json({ mesage: "admin Data got successfully", data: result });
  } catch (error) {
    console.log(error, "Error at admin controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
