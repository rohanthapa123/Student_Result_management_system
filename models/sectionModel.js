const { pool } = require("../config/database");

class SectionModel {
  async createSection(sectionData) {
    try {
      const { section_name, section_capacity, class_id, teacher_id, schedule } =
        sectionData;
      const [result] = await pool.query(
        "INSERT INTO section (section_name, section_capacity, class_id, teacher_id, schedule) VALUES (?,?,?,?,?)",
        [section_name, section_capacity, class_id, teacher_id, schedule]
      );
      return result;
    } catch (error) {
      console.log("error at sectionModel", error);
      throw error;
    }
  }
}

module.exports = new SectionModel();
