const { pool } = require("../config/database");

class MarksModel {
  async insertMark(
    subject_id,
    exam_id,
    student_id,
    marks_obtained,
    remarks,
    grade
  ) {
    try {
      const [result] = await pool.query(
        "INSERT INTO marks (student_id,subject_id, exam_id, marks_obtained, remarks, grade VALUES (?,?,?,?,?,?)",
        [student_id, subject_id, exam_id, marks_obtained, remarks, grade]
      );
      return [result];
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
  async getMarksByClass(class_id) {
    try {
      // console.log(class_id);
      const [result] = await pool.query(
        `SELECT
        student_id,
        fname,
        mname,
        lname,
        section_name,
        class_name,
        exam_name,
        JSON_ARRAYAGG(subject_name) AS subjects,
        JSON_ARRAYAGG(marks_obtained) AS marks_obtained,
        JSON_ARRAYAGG(remarks) AS remarks,
        JSON_ARRAYAGG(grade) AS grade
    FROM (
        SELECT DISTINCT
            marks.student_id,
            fname,
            mname,
            lname,
            section_name,
            class_name,
            exam_name,
            subject_name,
            marks_obtained,
            remarks,
            grade
        FROM marks
        INNER JOIN student ON marks.student_id = student.student_id
        INNER JOIN user ON student.user_id = user.user_id
        INNER JOIN subject ON marks.subject_id = subject.subject_id
        INNER JOIN class ON student.class_id = class.class_id
        INNER JOIN section ON student.section_id = section.section_id
        INNER JOIN exam ON marks.exam_id = exam.exam_id
        WHERE student.class_id = ?
    ) AS subquery
    GROUP BY student_id, exam_name;
    
     `,
        [class_id]
      );
      // console.log(result);
      return [result];
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
  async getMarksOfStudentByExam(student_id, exam_id) {
    try {
      console.log(student_id, exam_id);
      const [result] = await pool.query(
        `select marks.*,fname, mname, lname, section_name, class_name, exam_name, subject_name from marks inner join student on marks.student_id = student.student_id inner join user on student.user_id = user.user_id inner join subject on marks.subject_id = subject.subject_id inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id inner join exam on marks.exam_id = exam.exam_id where marks.student_id = ? and marks.exam_id = ?`,
        [student_id, exam_id]
      );
      // console.log(result)
      return [result];
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
}

module.exports = new MarksModel();
