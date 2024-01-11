import { pool } from "./config/database.js";

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}
export async function getUser(email) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM user 
  WHERE email = ?`,
    [email]
  );
  return rows;
}
export async function createUser(
  fname,
  mname,
  lname,
  dob,
  role,
  email,
  password
) {
  const [result] = await pool.query(
    `INSERT INTO user ( fname, mname, lname, dob, email, password, role) Values (?,?, ?, ?, ?,?,?)`,
    [fname, mname, lname, dob, email, password, role]
  );
  return result.insertId;
}
const user = await getUser("thaparohan2019@gmail.com");
const allUsers = await getUsers();
console.log(allUsers);

// await createUser(
//   "nidhi",
//     "kumari",
//     "pal",
//     "2059/08/28",
//     "student",
//     "nidhipal2058@gmail.com",
//     "nidhi123"
//   )
