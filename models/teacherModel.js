const { pool } = require("../config/database");
class TeacherModel {
  async insertTeacherData(user_id, subject) {
    try {
      let [result] = await pool.query(
        "INSERT INTO teacher (user_id, subject) VALUES (?, ?)",
        [user_id, subject]
      );
      return [result];
    } catch (error) {
      console.log("error at teacherModel", error);
      throw error;
    }
  }
}

module.exports = new TeacherModel();
