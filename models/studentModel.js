const { pool } = require("../config/database");

class StudentModel {
  async insertStudentData(
    user_id,
    class_id,
    section_id,
    blood_group,
    nationality,
    admission_id
  ) {
    try {
      const [result] = await pool.query(
        "INSERT INTO student (user_id,class_id,section_id,admission_id,blood_group,nationality) VALUES (?,?,?,?,?,?)",
        [user_id, class_id, section_id, admission_id, blood_group, nationality]
      );
      return result;
    } catch (error) {
      console.log("Error at student Model", error);
      throw error;
    }
  }
}

module.exports = new StudentModel();
