const { pool } = require("../config/database");

class NoticeModel {
  async addNotice(noticeData) {
    try {
      const { notice_text, date_posted, class_id } = noticeData;
      const [result] = await pool.query(
        "INSERT INTO notice (notice_text, date_posted, class_id) VALUES (?,?,?)",
        [notice_text, date_posted, class_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async getNoticeByClass() {
    try {
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
}

module.exports = new NoticeModel();
