const bcrypt = require("bcryptjs");
const userService = require("../services/userService");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await userService.getUserByEmail(email);
    if (result.length === 0) {
      return res.status(402).json({ message: "Wrong Credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);
    // console.log(passwordMatch);
    if (passwordMatch === false) {
      return res.status(402).json({ message: "Wrong Password" });
    }
    req.session.user_id = result[0].user_id;
    req.session.role = result[0].role;
    console.log(req.session);
    return res.status(200).json({ message: "Login Success", data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("error destroying session", error);
    }
  });
  res.clearCookie("session_id");
  // res.redirect('/login')
  res.status(200).json({ message: "Logout Successful" });
};

exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user_id = req.session.user_id;
  try {
    console.log("current",currentPassword, newPassword);
    const [user] = await userService.getUserById(user_id);
    console.log("user",user)
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
    req.session.destroy((err) => {
      if (err) {
        console.log("error destroying session", error);
      }
    });
    res.clearCookie("session_id");
    res.status(200).json({
      message: "password changed successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
