const userModel = require("../models/userModel");
const generatePassword = require("../utils/passwordUtil");
const bcrypt = require("bcryptjs");
exports.registerUser = async (userData) => {
  try {
    // console.log(userData.email);
    const [results] = await userModel.getUserByEmail(userData.email);
    // console.log(results);
    if (results.length > 0) {
      throw {status: 400, message: "Email already used"} ;
    }
    const password = generatePassword();
    let hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    const user = { ...userData, password: hashedPassword };
    const newUser = await userModel.createUser(user);
    console.log(password);
    return newUser;
  } catch (error) {
    console.log("error in userService", error);
    throw error;
  }
};
