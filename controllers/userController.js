const { pool } = require("../config/database");
const userService = require("../services/userService");
const adminService = require("../services/adminService");
const teacherService = require("../services/teacherService");
const studentService = require("../services/studentService");
const generatePassword = require("../utils/passwordUtil");

exports.register = async (req, res) => {
  // console.log(req.body);

  try {
    const userData = req.body;
    // console.log("userData",userData)
    const result = await userService.registerUser(userData);

    return res.json({ message: "Done", insertId: result.insertId });
  } catch (error) {
    if (error.status && error.message) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.log("error at userController", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
exports.updateUser = async (req, res) => {
  // console.log(req.body);

  try {
    const userData = req.body;
    console.log(userData);

    // console.log("userData",userData)
    const result = await userService.updateUser(userData);

    return res.json({ message: "Done", insertId: result.insertId });
  } catch (error) {
    if (error.status && error.message) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.log("error at userController", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getAllUser = async (req, res, next) => {
  // console.log(req.session);
  try {
    const [rows] = await userService.getAllUser();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};
exports.getUserCount = async (req, res, next) => {
  // console.log(req.session);
  try {
    const [rows] = await userService.getUserCount();
    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const user_id = req.params.id;
    console.log("my user_id is ", req.session.user_id);
    console.log(req.session.user_id && req.session.role);
    if (req.session.user_id == user_id) {
      res.status(403).json({ message: "Cannot delete yourself", code: "1434" });
    } else {
      await userService.deleteById(user_id);
      res.status(200).json({ message: "Delete Success" });
    }
  } catch (error) {
    if (error.status && error.message) {
      res.status(error.status).json({ error: error.message });
    }
    console.log(error);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const user_id = req.params.id;
    const [result] = await userService.getUserById(user_id);
    console.log(result);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error.status && error.message) {
      res.status(error.status).json({ error: error.message });
    }
    console.log(error);
  }
};
exports.getOwnDetail = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const user_id = req.session.user_id;
    const [result] = await userService.getOwnData(user_id);
    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    if (error.status && error.message) {
      res.status(error.status).json({ error: error.message });
    }
    console.log(error);
  }
};

exports.changeProfilePicture = async (req, res, next) => {
  try {
    const image = req.file;
    const user_id = req.session.user_id;
    const result = await userService.changeProfile(image.filename, user_id);
    console.log("requst", image);

    res.status(200).json({ message: "Image Uploaded" });
  } catch (error) {
    console.log("Error at authController changing picture", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.bulkDelete = async (req, res, next) => {
  // console.log("Hello api");
  const { userIds } = req.body;
  console.log(req.body);
  try {
    const response = await userService.bulkDelete(userIds);
    res.status(200 ).json({ message: "Bulk Delete Success" });
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error deleting" , error: error})
  }
};
exports.bulkUpdate = async (req, res, next) => {
  const { userIds , newClass} = req.body;
  console.log(req.body);
  try {
    const response = await userService.bulkUpdate(userIds , newClass);
    res.status(200 ).json({ message: "Bulk Update Success" });
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Error Updating" , error: error})
  }
};
