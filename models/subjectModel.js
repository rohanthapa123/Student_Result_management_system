const { pool } = require("../config/database");

class SubjectModel {
  async createSubject(subject_name, subject_code, class_id) {
    try {
      const [result] = await pool.query(
        "INSERT INTO subject (subject_name, subject_code, class_id) VALUES (? ,?, ?)",
        [subject_name, subject_code, class_id]
      );
      // console.log(result)
      return result;
    } catch (error) {
      console.log("error at subjectModel", error);
      throw error;
    }
  }
  async editSubject(subject_name, subject_code, class_id, subject_id) {
    try {
      const [result] = await pool.query(
        "UPDATE subject SET subject_name = ? , subject_code = ? , class_id = ? WHERE subject_id = ? ",
        [subject_name, subject_code, class_id, subject_id]
      );
      // console.log(result)
      return result;
    } catch (error) {
      console.log("error at subjectModel", error);
      throw error;
    }
  }
  async getSubjects(id, limit, offset) {
    try {
      if (id) {
        const [result] = await pool.query(
          `select subject.*,class_name from subject inner join class on subject.class_id = class.class_id  where subject.class_id= ? limit ${limit} offset ${offset}`,
          [id]
        );
        const [count] = await pool.query(
          "select Count(subject_id) as total from subject where subject.class_id = ?",
          [id]
        );
        // console.log(result)
        return { result: [result], pages: count };
      } else {
        const [result] = await pool.query(
          `select subject.*,class_name from subject inner join class where subject.class_id = class.class_id limit ${limit} offset ${offset}`
        );
        const [count] = await pool.query(
          "select Count(subject_id) as total from subject"
        );
        // console.log(result)
        return { result: [result], pages: count };
      }
    } catch (error) {
      console.log("error at subjectModel", error);
      throw error;
    }
  }
  async getSubjectByClassId(class_id) {
    try {
      const [result] = await pool.query(
        "select subject.*,class_name from subject inner join class on subject.class_id = class.class_id  where subject.class_id = ?",
        [class_id]
      );
      // console.log(result)
      return [result];
    } catch (error) {
      console.log("error at subjectModel", error);
      throw error;
    }
  }
  async getSubjectById(id) {
    try {
      const [result] = await pool.query(
        "select subject.*,class_name from subject inner join class on subject.class_id = class.class_id  where subject.subject_id= ?",
        [id]
      );
      // console.log(result)
      return [result];
    } catch (error) {
      console.log("error at subjectModel", error);
      throw error;
    }
  }
  async deleteSubjectById(subject_id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM subject WHERE subject_id = ?",
        [subject_id]
      );
      // console.log(result)
      return [result];
    } catch (error) {
      console.log("error at subjectModel", error);
      throw error;
    }
  }
}

module.exports = new SubjectModel();
