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
      gender,
      primary_contact,
      secondary_contact,
      temporary_address,
      permanent_address,
    } = userData;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      // console.log(image_result);
      const [result] = await connection.query(
        `INSERT INTO user ( fname, mname, lname, dob, email, password,primary_contact, secondary_contact, permanent_address, temporary_address, role, gender) Values (?,?, ?, ?, ?,?,?,?,?,?,?,?)`,
        [
          fname,
          mname,
          lname,
          dob,
          email,
          password,
          primary_contact,
          secondary_contact,
          permanent_address,
          temporary_address,
          role,
          gender,
        ]
      );

      await connection.commit();
      return result;
    } catch (error) {
      console.log("error in userModel", error);
      throw error;
    }
  }
  async updateUser(userData) {
    // console.log(userData);
    let connection;
    const {
      fname,
      mname,
      lname,
      dob,
      gender,
      primary_contact,
      secondary_contact,
      temporary_address,
      permanent_address,
      user_id,
    } = userData;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();

      // console.log(image_result);
      const [result] = await connection.query(
        `UPDATE user SET  fname = ? , mname = ? , lname = ? , dob = ?,permanent_address = ? , temporary_address = ?, primary_contact = ?, secondary_contact = ? ,  gender = ? WHERE user_id = ? `,
        [
          fname,
          mname,
          lname,
          dob,
          permanent_address,
          temporary_address,
          primary_contact,
          secondary_contact,
          gender,
          user_id,
        ]
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
                  user.image,
                  user.temporary_address,
                  user.permanent_address,
                  user.primary_contact,
                  user.secondary_contact
        `);

      return [rows];
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT user.* FROM user where email = ?",
        [email]
      );
      return [rows];
    } catch (error) {
      console.log(error);
    }
  }
  async getUserById(id) {
    try {
      const [rows] = await pool.query(
        `SELECT user.user_id,user.fname,password,user.mname,user.lname,user.email,user.dob,user.role,gender,image FROM user  WHERE user_id = ?`,
        [id]
      );
      return [rows];
    } catch (error) {
      console.log(error);
    }
  }
  async getUserCount() {
    try {
      const [rows] = await pool.query(
        `SELECT role, COUNT(*) as no_of_user FROM user GROUP BY role`
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
  async getOwnData(user_id) {
    try {
      const [result] = await pool.query(
        `SELECT
        user_id,
                    fname,
                    mname,
                    lname,
                    role,
                    email,
                    dob,
                    image,
                    gender,
                    temporary_address,
                    permanent_address,
                    primary_contact,
                    secondary_contact 
                    FROM user
        WHERE user_id = ? `,
        [user_id]
      );
      return [result];
    } catch (error) {
      throw error;
    }
  }
  async changeProfile(image, user_id) {
    try {
      const result = await pool.query(
        "UPDATE user SET image = ? WHERE user_id = ?",
        [image, user_id]
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new UserModel();
