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
  async getAllMarksByClass(class_id, term) {
    try {
      // console.log(class_id);
      const [result] = await pool.query(
        `
        SELECT 
    u.fname,
    u.user_id,
    u.mname,
    u.lname,
    stu.student_id,
    e.term,
    stu.class_id,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'subject_name', s.subject_name,
            'subject_id', m.subject_id,
            'marks_obtained', m.marks_obtained
        )
    ) AS subjects_marks 
FROM 
    user u
INNER JOIN 
    student stu ON u.user_id = stu.user_id
INNER JOIN 
    marks m ON stu.student_id = m.student_id
INNER JOIN 
    subject s ON m.subject_id = s.subject_id
INNER JOIN 
    exam e ON m.exam_id = e.exam_id
WHERE 
    stu.class_id = ?
    AND e.term = ?
GROUP BY 
    u.user_id;
    
     `,
        [class_id, term]
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
      const [mark_result] = await pool.query(
        `select marks.*, exam_name, subject_name from marks inner join subject on marks.subject_id = subject.subject_id inner join exam on marks.exam_id = exam.exam_id where student_id = (select student_id from student where user_id = ?) and exam.term = ?`,
        [user_id, exam_term]
      );
      const [user_result] = await pool.query(
        `select user_id, fname, mname, lname, email, dob, image, gender from user where user_id = ?`,
        [user_id]
      );

      const [student_result] = await pool.query(
        ` select student.*, class_name, section_name from student inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id where user_id = ?`,
        [user_id]
      );
      // console.log(result)
      return {
        markData: [mark_result],
        userData: user_result[0],
        studentData: student_result[0],
      };
    } catch (error) {
      console.log(("Error at marks model", error));
      throw error;
    }
  }
}

module.exports = new MarksModel();
