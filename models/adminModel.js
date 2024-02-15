const { pool } = require("../config/database");
class AdminModel {
  async insertAdminData(user_id) {
    try {
      let [result] = await pool.query(
        "INSERT INTO admin (user_id) VALUES (?)",
        [user_id]
      );
      return [result];
    } catch (error) {
      console.log("error at adminModel", error);
      throw error;
    }
  }
  async getAllAdmins() {
    try {
      const [result] = await pool.query(
        " select fname, mname, lname, role, email, image, dob,user.user_id, admin_id FROM user INNER JOIN admin ON user.user_id = admin.user_id"
      );
      return [result];
    } catch (error) {
      console.log("Error ar admin model", error);
      throw error;
    }
  }
}

module.exports = new AdminModel();
