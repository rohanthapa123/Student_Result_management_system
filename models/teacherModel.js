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
  async updateTeacherData(user_id, subject_id) {
    try {
      let [result] = await pool.query(
        "UPDATE teacher SET  subject_id = ?  WHERE user_id = ?",
        [subject_id, user_id]
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
  async getTeacherById(id) {
    try {
      let [result] = await pool.query(
        `select user.user_id , fname, mname, lname, role, email, dob, image, gender, primary_contact, secondary_contact, permanent_address, temporary_address ,teacher_id, subject_id from teacher inner join user on teacher.user_id = user.user_id where teacher.teacher_id = ?
    `,[id]
      );
      return [result];
    } catch (error) {
      console.log("error at teacherModel", error);
      throw error;
    }
  }
}

module.exports = new TeacherModel();
