const { pool } = require("../config/database");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const [result] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    console.log(result);
    if (result.length === 0) {
      return res.status(402).json({ message: "Wrong Credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);
    console.log(passwordMatch);
    if (passwordMatch === false) {
      return res.status(402).json({ message: "Wrong Password" });
    }
    const token = jwt.sign(
      { user_id: result[0].user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    const cookieOptions = {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("userRegistered", token, cookieOptions);
    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  console.log(req.body);
  const { email, fname, mname, lname, dob, role, password, cpassword, contacts,temp_address, perm_address } =
    req.body;

  try {
    const [results] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    console.log(results);
    if (results.length > 0) {
      return res.status(400).json({ error: "Email already used" });
    }
    if (password !== cpassword) {
      return res.status(400).json({ error: "Password Doesn't Match" });
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);

    const [result] = await pool.query(
      `INSERT INTO user ( fname, mname, lname, dob, email, password, role) Values (?,?, ?, ?, ?,?,?)`,
      [fname, mname, lname, dob, email, hashedPassword, role]
    );
    const user_id = result.insertId;
    for(const contact of contacts){
        await pool.query('INSERT INTO user_contact (user_id, contact) VALUES (?,?)',[user_id,contact])
    }
    await pool.query('INSERT INTO user_address (user_id, address, address_type) VALUES (?,?,?)',[user_id,temp_address,'temporary']);
    await pool.query('INSERT INTO user_address (user_id, address, address_type) VALUES (?,?,?)',[user_id,perm_address,'permanent']);
    return res.json({ message: "Done", insertId: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loggedIn = async (req, res, next) => {
//   console.log(req.cookies);
  if (!req.cookies || !req.cookies.userRegistered)
    return res.status(401).json({ message: "Unauthorized:Not Logged IN" });
  try {
    const decoded = jwt.verify(
      req.cookies.userRegistered,
      process.env.JWT_SECRET
    );
    console.log(decoded)
    const [user] = await pool.query("SELECT * FROM user WHERE user_id = ?", [
      decoded.user_id,
    ]);
    console.log(user[0])
    req.user = user[0];
    next();
  } catch (error) {
    console.log(error)
    if (error) return next();
  }
};

exports.isAdmin = (req, res, next) => {
    console.log(req.user)
  if (req.user && req.user.role == 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Permission denied" });
  }
};

exports.logout = (req, res, next) => {
    res.clearCookie('userRegistered');
    res.status(200).json({message: 'Logout Successful'})
}