const { pool } = require("../config/database");

class NoticeModel {
  async addNotice(noticeData) {
    try {
      const { notice_text, class: _class } = noticeData;
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query(
        "INSERT INTO notice (notice_text) VALUES (?)",
        [notice_text]
      );
      console.log(result.insertId);
      _class.forEach(async (item) => {
        await connection.query(
          `INSERT INTO class_notice_map (class_id, notice_id) values (?,?)`,
          [item.value, result.insertId]
        );
      });
      connection.commit();
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async updateNotice(noticeData) {
    try {
      const { notice_text, class: _class, notice_id } = noticeData;
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query(
        "UPDATE notice SET notice_text = ? where notice_id = ? ",
        [notice_text, notice_id]
      );
      // console.log(result.insertId);
      await connection.query(
        "DELETE FROM class_notice_map WHERE notice_id = ?",
        notice_id
      );
      _class.forEach(async (item) => {
        await connection.query(
          `INSERT INTO class_notice_map (class_id, notice_id) values (?,?)`,
          [item.value, notice_id]
        );
      });
      connection.commit();
      return [result];
    } catch (error) {
      console.log("Error at notice Model updating", error);
      throw error;
    }
  }

  async getNotice(user_id, role) {
    try {
      if (user_id) {
        if (role === "student") {
          const [result] = await pool.query(
            " select notice.* from notice where notice_id in (select notice_id from class_notice_map where class_id in (select class_id from student where student.user_id = ?));          ",
            [user_id]
          );
          return [result];
        } else if (role === "teacher") {
          const [result] = await pool.query(
            `select * from notice where notice_id in (select notice_id from class_notice_map where class_id in (select distinct class_id from class_subject_map where subject_id in (select subject_id from teacher_subject_map inner join teacher on teacher_subject_map.teacher_id = teacher.teacher_id where teacher.user_id = ?)));`,
            [user_id]
          );
          return [result];
        }
      } else {
        const [result] = await pool.query(
          "SELECT notice.notice_id, notice.notice_text, notice.date_posted from notice"
        );
        console.log(result);
        return [result];
      }
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async getNoticeById(id) {
    try {
      const [result] = await pool.query(
        ` SELECT 
        notice.notice_id,
        notice.notice_text,
        notice.date_posted,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'value', class.class_id,
                'label', class.class_name
            )
        ) AS class
    FROM 
        notice
    LEFT JOIN 
        class_notice_map ON notice.notice_id = class_notice_map.notice_id
    LEFT JOIN 
        class ON class_notice_map.class_id = class.class_id
    WHERE 
        notice.notice_id = ?
    GROUP BY 
        notice.notice_id,
        notice.notice_text,
        notice.date_posted;
    
        `,
        [id]
      );
      console.log(result);
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async deleteNotice(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM notice WHERE notice_id = ?",
        [id]
      );
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
}

module.exports = new NoticeModel();
