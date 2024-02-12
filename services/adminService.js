const adminModel = require("../models/adminModel");
exports.insertAdminData = async (user_id) => {
  try {
    const [result] = await adminModel.insertAdminData(user_id);
    return result;
  } catch (error) {
    console.log("error in adminService", error);
    throw error;
  }
};
exports.getAllAdmins = async () => {
  try {
    const result = await adminModel.getAllAdmins();
    return result;
  } catch (error) {
    console.log("Error in admin Service", error);
    throw error;
  }
};
