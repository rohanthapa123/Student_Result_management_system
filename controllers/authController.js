const bcrypt = require("bcryptjs");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const blacklistService = require("../services/tokenBlackList");
const { generateRefreshToken } = require("../utils/generateAccessToken");
const path = require("path");
const { Domain } = require("domain");
dotenv.config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await userService.getUserByEmail(email);
    if (result.length === 0) {
      return res.status(402).json({ message: "Wrong Credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);
    if (!passwordMatch) {
      return res.status(402).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { user_id: result[0].user_id, role: result[0].role }, // Include relevant user data in the payload
      process.env.JWTSECRET,
      { expiresIn: "1m" } // Token expiration time
    );
    const refreshtoken = jwt.sign(
      { user_id: result[0].user_id, role: result[0].role }, // Include relevant user data in the payload
      process.env.JWTREFRESHSECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Send token as cookie or in response body
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      domain : "localhost",
      path: "/",
    });
    res.cookie("refreshToken", refreshtoken, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      domain : "localhost",
      path: "/",
    });
    console.log(result[0]);
    return res.status(200).json({
      message: "Login Success",
      authToken: token,
      userData: {
        user_id: result[0].user_id,
        fname: result[0].fname,
        role: result[0].role,
        image: result[0].image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res, next) => {
  const { refreshToken } = req.cookies;
  blacklistService.addToBlacklist(refreshToken);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout Successful" });
};

exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user_id = req.user.user_id;
  try {
    console.log("current", currentPassword, newPassword);
    const [user] = await userService.getUserById(user_id);
    console.log("user", user);
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
    res.status(200).json({
      message: "password changed successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await userService.resetPassword(email);
    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.newReferenceToken = async (req, res, next) => {
  const { user_id, role } = req.user;

  try {
    const accessToken = generateRefreshToken({ user_id, role });

    // Send the new access token in response
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error generating access token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
