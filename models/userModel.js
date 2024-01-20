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
  async createUser(userData, imageBuffer) {
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
      const [image_result] = await connection.query(
        `INSERT INTO image (image_name, image_data) VALUES (?,?)`,
        [imageBuffer.originalname, imageBuffer.buffer]
      );
      console.log(image_result);
      const [result] = await connection.query(
        `INSERT INTO user ( fname, mname, lname, dob, email, password, role, image_id) Values (?,?, ?, ?, ?,?,?,?)`,
        [fname, mname, lname, dob, email, password, role, image_result.insertId]
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
      user.user_id,
                  user.fname,
                  user.mname,
                  user.lname,
                  user.role,
                  user.email,
                  user.dob,
      GROUP_CONCAT(DISTINCT user_contact.contact ORDER BY user_contact.user_id) as contacts,
      MAX(CASE WHEN user_address.address_type = 'temporary' THEN user_address.address END) as temp_address,
      MAX(CASE WHEN user_address.address_type = 'permanent' THEN user_address.address END) as permanent_address
  FROM 
      user 
      LEFT JOIN user_address ON user.user_id = user_address.user_id 
      LEFT JOIN user_contact ON user.user_id = user_contact.user_id
  GROUP BY 
      user.user_id;
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
      const [rows] = await pool.query(
        `SELECT user.user_id,user.fname,user.mname,user.lname,user.email,user.dob,user.role,image.image_name,image.image_data FROM user JOIN image ON user.image_id = image.image_id WHERE user_id = ?`,
        [id]
      );
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
      await connection.query("DELETE FROM user_address WHERE user_id = ?", [
        user_id,
      ]);
      await connection.query("DELETE FROM user_contact WHERE user_id = ?", [
        user_id,
      ]);
      const [userRole] = await connection.query(
        "SELECT role FROM user WHERE user_id = ?",
        [user_id]
      );
      // console.log(userRole)
      // console.log(userRole[0].role);
      const role = userRole[0].role;
      if (role === "teacher") {
        await connection.query("DELETE FROM teacher WHERE user_id = ?", [
          user_id,
        ]);
      } else if (role === "student") {
        await connection.query("DELETE FROM student WHERE user_id = ?", [
          user_id,
        ]);
      } else if (role === "admin") {
        await connection.query("DELETE FROM admin WHERE user_id = ?", [
          user_id,
        ]);
      }

      await connection.query("DELETE FROM user WHERE user_id = ?", [user_id]);
      await connection.commit();
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(password, user_id) {
    try {
      const [result] = await pool.query(
        "UPDATE user SET password = ? WHERE user_id = ?",
        [password, user_id]
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new UserModel();
