const { pool } = require("../config/database");
class TeacherModel {
  async insertTeacherData(user_id, subject_id) {
    try {
      let [result] = await pool.query(
        "INSERT INTO teacher (user_id, subject_id) VALUES (?, ?)",
        [user_id, subject_id]
      );
      return [result];
    } catch (error) {
      console.log("error at teacherModel", error);
      throw error;
    }
  }
  async getAllTeacher() {
    try {
      let [result] = await pool.query(
        " select teacher.user_id, fname, mname, lname, role, email, dob,image,teacher.subject_id,subject_name,teacher_id from user inner join teacher on user.user_id = teacher.user_id inner join subject on teacher.subject_id = subject.subject_id"
      );
      return [result];
    } catch (error) {
      console.log("error at teacherModel", error);
      throw error;
    }
  }
}

module.exports = new TeacherModel();
