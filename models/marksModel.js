const { pool } = require("../config/database");

class MarksModel {
  async insertMark(marks) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();
      for (const mark of marks) {
        await connection.query(
          "INSERT INTO marks (student_id,subject_id, exam_id, marks_obtained, remarks, grade )VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE marks_obtained = VALUES(marks_obtained), remarks = VALUES(remarks), grade = VALUES(grade)",
          [
            mark.student_id,
            mark.subject_id,
            mark.exam_id,
            mark.marks_obtained,
            mark.remarks,
            mark.grade,
          ]
        );
      }

      await connection.commit();
      return { message: "success" };
    } catch (error) {
      console.log("Error at marks model", error);
      throw error;
    }
  }
  async deleteMarkById(marks_id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM marks WHERE marks_id = ?",
        [marks_id]
      );
      return [result];
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
  async getMarkOfStudent() {
    try {
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
  async getMarksByClass(class_id, exam_id) {
    try {
      // console.log(class_id);
      const [result] = await pool.query(
        `SELECT
        fname,
        mname,
        lname,
        student.*,
        class_name,
        subject_name,
        exam.exam_id,
        exam.subject_id,
        marks_obtained,
        remarks,
        grade
    FROM
        student
    INNER JOIN user ON student.user_id = user.user_id
    INNER JOIN class ON student.class_id = class.class_id
    INNER JOIN exam ON exam.class_id = student.class_id
    INNER JOIN subject ON subject.subject_id = exam.subject_id
    LEFT JOIN marks ON marks.student_id = student.student_id AND marks.subject_id = subject.subject_id AND marks.exam_id = exam.exam_id
    WHERE
        student.class_id = ? AND exam.exam_id = ?
    ORDER BY
        fname;
    
    
     `,
        [class_id, exam_id]
      );
      // console.log(result);
      return [result];
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
  async getResult(user_id, exam_term) {
    try {
      console.log(user_id, exam_term);
      const [result] = await pool.query(
        `select marks.*, exam_name, subject_name from marks inner join subject on marks.subject_id = subject.subject_id inner join exam on marks.exam_id = exam.exam_id where student_id = (select student_id from student where user_id = ?) and exam.term = ?`,
        [user_id, exam_term]
      );
      console.log(result)
      return [result];
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
}

module.exports = new MarksModel();
