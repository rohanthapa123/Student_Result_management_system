const { pool } = require("../config/database");

const getAllUser = async (req, res,next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.status(200).json({data: rows})
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllUser;
