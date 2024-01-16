const pool = require("../config/database.js");
async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    return rows;
  } catch (error) {
    console.log(error);
  }
}
module.exports = getUsers;
