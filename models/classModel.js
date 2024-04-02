const { pool } = require("../config/database");

class ClassModel {
  async createClass(class_name, desc, academic_year, subjects) {
    try {
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query(
        "INSERT INTO class (class_name, `desc` ,academic_year) VALUES (?, ? , ?)",
        [class_name, desc, academic_year]
      );
      console.log(result.insertId);
      console.log(subjects);
      subjects.forEach(async (element) => {
        await connection.query(
          `INSERT INTO class_subject_map (class_id , subject_id) values (? , ?)`,
          [result.insertId, element.value]
        );
      });

      await connection.commit();
      return result;
    } catch (error) {
      console.log("error at classModel", error);
      throw error;
    }
  }
  async editClass(class_name, desc, academic_year, subjects, class_id) {
    try {
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query(
        "UPDATE class SET class_name = ? , `desc` = ? , academic_year = ?  WHERE class_id = ? ",
        [class_name, desc, academic_year, class_id]
      );
      await connection.query(
        `delete from class_subject_map where class_id = ? `,
        [class_id]
      );
      subjects.forEach(async (element) => {
        await connection.query(
          `INSERT INTO class_subject_map (class_id , subject_id) values (? , ?)`,
          [class_id, element.value]
        );
      });
      await connection.commit();
      // console.log(result)
      return result;
    } catch (error) {
      console.log("error at classModel", error);
      throw error;
    }
  }
  async getClass() {
    try {
      const [result] = await pool.query("SELECT * FROM class");
      // console.log(result)
      return [result];
    } catch (error) {
      console.log("error at classModel", error);
      throw error;
    }
  }
  async getClassById(id) {
    try {
      const [result] = await pool.query(
        `SELECT 
        class.class_id,
        class.academic_year,
        class.class_name,
        class.desc,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'value', subject.subject_id, 
                'label', subject.subject_name
            )
        ) AS subjects
    FROM 
        class
    LEFT JOIN 
        class_subject_map ON class.class_id = class_subject_map.class_id
    LEFT JOIN 
        subject ON class_subject_map.subject_id = subject.subject_id
    WHERE 
        class.class_id = ?
    GROUP BY 
        class.academic_year, class.class_name, class.desc
 
         `,
        [id]
      );
      console.log(result);
      return [result];
    } catch (error) {
      console.log("error at classModel", error);
      throw error;
    }
  }
  async getClassByUserIdForTeacher(user_id) {
    try {
      console.log("user_id is ", user_id);
      const [result] = await pool.query(
        `select distinct class_subject_map.class_id, class_name from class_subject_map inner join class on class_subject_map.class_id = class.class_id where subject_id in (select subject_id from teacher_subject_map where teacher_id in (select teacher.teacher_id from user inner join teacher on
          user.user_id = teacher.user_id where user.user_id = ?))
 
         `,
        [user_id]
      );
      console.log(result);
      return [result];
    } catch (error) {
      console.log("error at classModel", error);
      throw error;
    }
  }
  async deleteClassByID(class_id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM class WHERE class_id = ?",
        [class_id]
      );
      // console.log(result)
      return [result];
    } catch (error) {
      console.log("error at classModel", error);
      throw error;
    }
  }
}

module.exports = new ClassModel();
