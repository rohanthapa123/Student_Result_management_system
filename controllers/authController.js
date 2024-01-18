const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/userService");
const blacklistToken = require("../utils/tokenBlacklist");

exports.login = async (req, res) => {
  //   console.log(req.body);
  const { email, password } = req.body;

  try {
    const [result] = await userService.getUserByEmail(email);
    // console.log(result);
    if (result.length === 0) {
      return res.status(402).json({ message: "Wrong Credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);
    // console.log(passwordMatch);
    if (passwordMatch === false) {
      return res.status(402).json({ message: "Wrong Password" });
    }
    const token = jwt.sign(
      { user_id: result[0].user_id, role: result[0].role  },
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
      secure: true,
      // signed: true,
      sameSite : true,
    };
    req.session.isAuth = true;
    res.cookie("userRegistered", token, cookieOptions);
    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("userRegistered");
  res.status(200).json({ message: "Logout Successful" });
};

exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user_id = req.body.user_id;
  try {
    const [user] = await userService.getUserById(user_id);
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user[0].password
    );
    // console.log(passwordMatch);
    if (passwordMatch === false) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    const result = await userService.changePassword(hashedPassword, user_id);
    const existingToken = req.cookies.jwt;
    blacklistToken(existingToken);
    res.clearCookie("userRegistered");
    res.status(200).json({
      message: "password changed successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
