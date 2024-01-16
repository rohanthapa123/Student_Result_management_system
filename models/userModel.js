const { pool } = require("../config/database");
// async function getUsers() {
//   try {
//     const [rows] = await pool.query("SELECT * FROM user");
//     return rows;
//   } catch (error) {
//     console.log(error);
//   }
// }
// module.exports = getUsers;

class UserModel {
  async createUser(userData) {
    console.log(userData);
    const {
      fname,
      mname,
      lname,
      dob,
      email,
      password,
      role,
      contacts,
      temp_address,
      perm_address,
    } = userData;
    try {
      const [result] = await pool.query(
        `INSERT INTO user ( fname, mname, lname, dob, email, password, role) Values (?,?, ?, ?, ?,?,?)`,
        [fname, mname, lname, dob, email, password, role]
      );
      const user_id = result.insertId;
      for (const contact of contacts) {
        await pool.query(
          "INSERT INTO user_contact (user_id, contact) VALUES (?,?)",
          [user_id, contact]
        );
      }
      await pool.query(
        "INSERT INTO user_address (user_id, address, address_type) VALUES (?,?,?)",
        [user_id, temp_address, "temporary"]
      );
      await pool.query(
        "INSERT INTO user_address (user_id, address, address_type) VALUES (?,?,?)",
        [user_id, perm_address, "permanent"]
      );
      return result;
    } catch (error) {
      console.log("error in userModel", error);
      throw error;
    }
  }
  async getUsers() {
    try {
      const [rows] = await pool.query("SELECT * FROM user");
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByEmail(email) {
    try {
      const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
        email,
      ]);
      return [rows];
    } catch (error) {
      console.log(error);
    }
  }
  async getUserById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM user WHERE user_id = ?", [
        id,
      ]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserModel();
