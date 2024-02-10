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
  async getMarksOfStudentByExam(student_id, exam_id) {
    try {
      console.log(student_id, exam_id)
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
