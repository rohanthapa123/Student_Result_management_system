const userModel = require("../models/userModel");
const generatePassword = require("../utils/passwordUtil");
const bcrypt = require("bcryptjs");
const sendCredential = require("../utils/sendCredentials");

exports.registerUser = async (userData) => {
  try {
    // console.log(userData.email);
    const [results] = await userModel.getUserByEmail(userData.email);
    // console.log(results);
    if (results.length > 0) {
        const error = new Error("Email already used");
        error.status = 400;
        throw error;
    }
    const password = generatePassword();
    let hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    const user = { ...userData, password: hashedPassword };
    const newUser = await userModel.createUser(user);
    console.log(password);
    sendCredential(userData.email, password);
    return newUser;
  } catch (error) {
    console.log("error in userService", error);
    throw error;
  }
};

exports.deleteById = async (user_id) => {
  try {
    const [results] = await userModel.getUserById(user_id);
    if (results.length < 0) {
      throw { status: 200, message: "User Doesn't exist" };
    }
    await userModel.deleteUserById(user_id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getAllUser = async () => {
  try {
    const [results] = await userModel.getUsers();
    return [results];
  } catch (error) {
    console.log("error at user service", error);
    throw error;
  }
};
