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
      let [result] = await pool.query("UPDATE teacher   WHERE user_id = ?", [
        subject_id,
        user_id,
      ]);
      return [result];
    } catch (error) {
      console.log("error at teacherModel", error);
      throw error;
    }
  }
  async getAllTeacher() {
    try {
      let [result] = await pool.query(
        " select teacher.user_id, fname, mname, lname, role, email, dob,image,teacher_id from user inner join teacher on user.user_id = teacher.user_id"
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
        `SELECT 
        u.user_id,
        u.fname,
        u.mname,
        u.lname,
        u.role,
        u.email,
        u.dob,
        u.image,
        u.gender,
        u.primary_contact,
        u.secondary_contact,
        u.permanent_address,
        u.temporary_address,
        t.teacher_id,
        IFNULL(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'value', s.subject_id,
                    'label', s.subject_name
                )
            ),
            JSON_ARRAY()
        ) AS subjects
    FROM 
        teacher t
    INNER JOIN 
        user u ON t.user_id = u.user_id
    LEFT JOIN 
        teacher_subject_map tsm ON t.teacher_id = tsm.teacher_id
    LEFT JOIN 
        subject s ON tsm.subject_id = s.subject_id
    WHERE 
        t.teacher_id = ?
    GROUP BY 
        u.user_id, u.fname, u.mname, u.lname, u.role, u.email, u.dob, u.image, u.gender, u.primary_contact, u.secondary_contact, u.permanent_address, u.temporary_address, t.teacher_id;
    
    
    `,
        [id]
      );
      return [result];
    } catch (error) {
      console.log("error at teacherModel", error);
      throw error;
    }
  }
}

module.exports = new TeacherModel();
