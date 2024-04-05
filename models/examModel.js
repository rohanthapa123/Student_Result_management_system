const { pool } = require("../config/database");

class ExamModel {
  async createExam(exam_name, class_id, subject_id, exam_date, term) {
    try {
      const [result] = await pool.query(
        "INSERT INTO exam (exam_name, class_id, subject_id, exam_date, term) VALUES (?,?,?,?,?)",
        [exam_name, class_id, subject_id, exam_date, term]
      );
      return [result];
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
  async updateExam(exam_name, class_id, subject_id, exam_date, term, exam_id) {
    try {
      const [result] = await pool.query(
        "UPDATE  exam SET exam_name = ? , class_id = ? , subject_id = ?, exam_date = ?, term = ? WHERE exam_id = ? ",
        [exam_name, class_id, subject_id, exam_date, term, exam_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
  async deleteExamById(exam_id) {
    try {
      const [result] = await pool.query("DELETE FROM exam WHERE exam_id = ?", [
        exam_id,
      ]);
      return [result];
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
  async getExams() {
    try {
      const [result] = await pool.query(
        " SELECT exam.*, class_name, subject_name from exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id"
      );
      return [result];
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
  async getExamByClassId(class_id) {
    try {
      const [result] = await pool.query(
        " SELECT exam.*, class_name, subject_name from exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id WHERE exam.class_id = ?",
        [class_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
  async getExamById(id) {
    try {
      const [result] = await pool.query(
        " SELECT exam.*, class_name, subject_name from exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id WHERE exam.exam_id = ?",
        [id]
      );
      return [result];
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
  async getExamOfTeacherClass(user_id, class_id) {
    try {
      if (class_id) {
        const [result] = await pool.query(
          ` SELECT exam.* , class_name ,subject_name
        FROM exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id 
        WHERE exam.subject_id IN (
          SELECT subject_id
            FROM teacher_subject_map
            WHERE teacher_id IN (
              SELECT teacher_id
                FROM user
                INNER JOIN teacher ON user.user_id = teacher.user_id
                WHERE user.user_id = ?
                )
                ) and exam.class_id = ?
                
                `,
          [user_id, class_id]
        );
        return [result];
      } else {
        const [result] = await pool.query(
          ` SELECT exam.* , class_name ,subject_name
        FROM exam inner join class on exam.class_id = class.class_id inner join subject on exam.subject_id = subject.subject_id 
        WHERE exam.subject_id IN (
          SELECT subject_id
            FROM teacher_subject_map
            WHERE teacher_id IN (
              SELECT teacher_id
                FROM user
                INNER JOIN teacher ON user.user_id = teacher.user_id
                WHERE user.user_id = ?
                )
                );
                
                `,
          [user_id]
        );
        return [result];
      }
    } catch (error) {
      console.log("Error at exam model", error);
      throw error;
    }
  }
}

module.exports = new ExamModel();
