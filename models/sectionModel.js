const { pool } = require("../config/database");

class SectionModel {
  async createSection(sectionData) {
    try {
      const { section_name, section_capacity, class_id, schedule } =
        sectionData;
      const [result] = await pool.query(
        "INSERT INTO section (section_name, section_capacity, class_id,  schedule) VALUES (?,?,?,?)",
        [section_name, section_capacity, class_id, schedule]
      );
      return result;
    } catch (error) {
      console.log("error at sectionModel", error);
      throw error;
    }
  }
  async updateSection(sectionData) {
    try {
      const { section_name, section_capacity, class_id, schedule, section_id } =
        sectionData;
      const [result] = await pool.query(
        "UPDATE  section SET section_name = ? , section_capacity = ?, class_id = ?, schedule = ?  WHERE section_id = ?",
        [section_name, section_capacity, class_id, schedule, section_id]
      );
      return result;
    } catch (error) {
      console.log("error at sectionModel", error);
      throw error;
    }
  }
  async getSectionByClass(class_id) {
    try {
      console.log(class_id);
      const [result] = await pool.query(
        "SELECT * FROM section WHERE class_id = ?",
        [class_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at section Model", error);
      throw error;
    }
  }
  async getSections(id, limit, offset) {
    try {
      if (id) {
        const [result] = await pool.query(
          `SELECT * FROM section WHERE class_id = ? LIMIT ${limit} OFFSET ${offset}`,
          [id]
        );
        const [count] = await pool.query(
          "select Count(section_id) as total from section where class_id = ?",[id]
        );
        // console.log([count]);
        return { result: [result], pages: count };
      } else {
        const [result] = await pool.query(
          `SELECT * FROM section LIMIT ${limit} OFFSET ${offset}`
        );
        const [count] = await pool.query(
          "select Count(section_id) as total from section"
        );
        // console.log([count]);
        return { result: [result], pages: count };
      }
    } catch (error) {
      throw error;
    }
  }

  async getSectionById(id) {
    try {
      const [result] = await pool.query(
        "SELECT * FROM section WHERE section_id = ?",
        [id]
      );
      return [result];
    } catch (error) {
      console.log("Error at section Model", error);
      throw error;
    }
  }
  async deleteSectionById(section_id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM section WHERE section_id = ?",
        [section_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at section Model", error);
      throw error;
    }
  }
}

module.exports = new SectionModel();
