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
    // console.log(userData);
    let connection;
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
      connection = await pool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query(
        `INSERT INTO user ( fname, mname, lname, dob, email, password, role) Values (?,?, ?, ?, ?,?,?)`,
        [fname, mname, lname, dob, email, password, role]
      );
      const user_id = result.insertId;
      for (const contact of contacts) {
        await connection.query(
          "INSERT INTO user_contact (user_id, contact) VALUES (?,?)",
          [user_id, contact]
        );
      }
      await connection.query(
        "INSERT INTO user_address (user_id, address, address_type) VALUES (?,?,?)",
        [user_id, temp_address, "temporary"]
      );
      await connection.query(
        "INSERT INTO user_address (user_id, address, address_type) VALUES (?,?,?)",
        [user_id, perm_address, "permanent"]
      );
      await connection.commit();
      return result;
    } catch (error) {
      console.log("error in userModel", error);
      throw error;
    }
  }
  async getUsers() {
    try {
      const [rows] = await pool.query(`
            SELECT
                user.*,
                GROUP_CONCAT(DISTINCT user_address.address ORDER BY user_address.address_id) as addresses,
                GROUP_CONCAT(DISTINCT user_contact.contact ORDER BY user_contact.user_id) as contacts
            FROM 
                user 
                INNER JOIN user_address ON user.user_id = user_address.user_id 
                INNER JOIN user_contact ON user.user_id = user_contact.user_id
            GROUP BY 
                user.user_id
        `);

      return [rows];
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
      return [rows];
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUserById(user_id) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();
      await pool.query("DELETE FROM user_address WHERE user_id = ?", [user_id]);
      await pool.query("DELETE FROM user_contact WHERE user_id = ?", [user_id]);
      await pool.query("DELETE FROM user WHERE user_id = ?", [user_id]);
      await connection.commit();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserModel();
