const { pool } = require("../config/database");

class NoticeModel {
  async addNotice(noticeData) {
    try {
      const { notice_text,  class_id } = noticeData;
      const [result] = await pool.query(
        "INSERT INTO notice (notice_text,  class_id) VALUES (?,?)",
        [notice_text,  class_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async updateNotice(noticeData) {
    try {
      const { notice_text,  class_id , notice_id} = noticeData;
      const [result] = await pool.query(
        "UPDATE notice SET notice_text = ? , class_id = ? WHERE notice_id = ?",
        [notice_text,  class_id, notice_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at notice Model updating", error);
      throw error;
    }
  }
  async getNoticeByClass(user_id) {

    try {
      const [ result] = await pool.query(' select * from notice where class_id = (select class_id from student where user_id = ?)',[user_id])
      return [result] ;
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async getOpenNotice() {
    try {
      const [result] = await pool.query(
        "SELECT * FROM notice WHERE class_id IS NULL"
      );
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async getNotice() {
    try {
      const [result] = await pool.query(
        "SELECT notice.notice_id, notice.notice_text, notice.date_posted, notice.class_id, class.class_name from notice left join class on notice.class_id = class.class_id"
      );
      console.log(result)
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async getNoticeById(id) {
    try {
      const [result] = await pool.query(
        "SELECT notice.notice_id, notice.notice_text, notice.date_posted, notice.class_id, class.class_name from notice left join class on notice.class_id = class.class_id where notice.notice_id = ?",[id]
      );
      console.log(result)
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async deleteNotice(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM notice WHERE notice_id = ?",[id]
      );
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
 
}

module.exports = new NoticeModel();
