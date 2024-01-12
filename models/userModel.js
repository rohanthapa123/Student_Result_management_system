import { pool } from "../config/database.js";
export async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    return rows;
  } catch (error) {
    console.log(error);
  }
}
