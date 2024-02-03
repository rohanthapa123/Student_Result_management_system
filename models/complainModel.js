const { pool } = require("../config/database");

class ComplainModel {
  async addComplain(complain_Data) {
    try {
      const { message, user_id } = complain_Data;
      const [result] = await pool.query(
        "INSERT INTO complain (message, user_id) VALUES (?,?)",
        [message, user_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at complain Model", error);
      throw error;
    }
  }
  async solveComplain(complain_id) {
    try {
      const [result] = await pool.query(
        "UPDATE complain SET status = true WHERE complain_id = ?",
        [ complain_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at complain Model", error);
      throw error;
    }
  }
  
  
  async getComplain() {
    try {
      const [result] = await pool.query(
        "SELECT complain.*,fname,mname, lname, student.class_id, student.section_id,class.class_name,section.section_name from complain inner join user on complain.user_id = user.user_id inner join student on complain.user_id = student.user_id inner join class on student.class_id = class.class_id inner join section on student.section_id = section.section_id",
      );
      console.log(result)
      return [result];
    } catch (error) {
      console.log("Error at notice Model", error);
      throw error;
    }
  }
  async deleteComplain(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM complain WHERE complain_id = ?",[id]
      );
      return [result];
    } catch (error) {
      console.log("Error at complain Model", error);
      throw error;
    }
  }
  async getMyComplain(user_id) {
    try {
      const [result] = await pool.query(
        "SELECT *  FROM complain WHERE user_id = ?",[user_id]
      );
      return [result];
    } catch (error) {
      console.log("Error at complain Model", error);
      throw error;
    }
  }
}

module.exports = new ComplainModel();
