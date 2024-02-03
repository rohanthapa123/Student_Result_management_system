const { pool } = require("../config/database");

class SectionModel {
  async createSection(sectionData) {
    try {
      const { section_name, section_capacity, class_id, schedule } =
        sectionData;
      const [result] = await pool.query(
        "INSERT INTO section (section_name, section_capacity, class_id,  schedule) VALUES (?,?,?,?)",
        [section_name, section_capacity, class_id,  schedule]
      );
      return result;
    } catch (error) {
      console.log("error at sectionModel", error);
      throw error;
    }
  }
  async getSectionByClass(class_id){
    try {
      const [result] = await pool.query("SELECT * FROM section WHERE class_id = ?",[class_id]);
      return [result];
    } catch (error) {
      console.log("Error at section Model",error);
      throw error;
    }
  }
  async deleteSectionById(section_id){
    try {
      const [result] = await pool.query("DELETE FROM section WHERE section_id = ?",[section_id]);
      return [result];
    } catch (error) {
      console.log("Error at section Model",error);
      throw error;
    }
  }
}

module.exports = new SectionModel();
