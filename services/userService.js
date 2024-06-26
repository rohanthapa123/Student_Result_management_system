const userModel = require("../models/userModel");
const generatePassword = require("../utils/passwordUtil");
const bcrypt = require("bcryptjs");
const sendCredential = require("../utils/sendCredentials");
const fs = require("fs");
const path = require("path");
exports.registerUser = async (userData) => {
  try {
    // console.log(userData.email);
    const [results] = await userModel.getUserByEmail(userData.email);
    // console.log(results);
    if (results.length > 0) {
      const error = new Error("Email already used");
      error.status = 400;
      // error.message = "Email already used";
      throw error;
    }
    const [results2] = await userModel.getUserByPrimaryContact(userData.primary_contact);
    // console.log(results);
    if (results2.length > 0) {
      const error = new Error("Primary contact can't be dublicate");
      error.status = 400;
      // error.message = "Email already used";
      throw error;
    }
    
    const password = generatePassword();
    let hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);

    const user = { ...userData, password: hashedPassword };
    const newUser = await userModel.createUser(user);
    console.log(password);
    try {
      await sendCredential(userData.email, password);
      console.log("Email send to user")
    } catch (error) {
      console.log("Error sending email");
      throw error;
    }
    return newUser;
  } catch (error) {
    console.log("error in userService", error);
    throw error;
  }
};
exports.updateUser = async (userData) => {
  try {
    const newUser = await userModel.updateUser(userData);
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
exports.getUserCount = async () => {
  try {
    const [results] = await userModel.getUserCount();
    return [results];
  } catch (error) {
    console.log("error at user service", error);
    throw error;
  }
};
exports.getUserById = async (id) => {
  try {
    const [results] = await userModel.getUserById(id);
    return [results];
  } catch (error) {
    console.log("error at user service", error);
    throw error;
  }
};
exports.getOwnData = async (id) => {
  try {
    const [results] = await userModel.getOwnData(id);

    return [results[0]];
  } catch (error) {
    console.log("error at user service", error);
    throw error;
  }
};
exports.getUserByEmail = async (email) => {
  try {
    const [results] = await userModel.getUserByEmail(email);
    return [results];
  } catch (error) {
    console.log("error at user service", error);
    throw error;
  }
};

exports.changePassword = async (password, user_id) => {
  try {
    const result = await userModel.updatePassword(password, user_id);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.resetPassword = async (email) =>{
  try {
    const password = generatePassword();

    try {
      sendCredential(email, password , true);
    } catch (error) {
      console.log("Error sending email");
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const result = await userModel.resetPassword(hashedPassword,email);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

exports.changeProfile = async (image, user_id) => {
  try {
    const result = await userModel.changeProfile(image, user_id);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.bulkDelete = async (ids) =>{
  try {
    const result = await userModel.bulkDelete(ids);
    return result;
  } catch (error) {
    console.log("Error in userService");
    throw error;
  }
}
exports.bulkUpdate = async (ids, newClass , newSection) =>{
  try {
    const result = await userModel.bulkUpdate(ids , newClass , newSection);
    return result;
  } catch (error) {
    console.log("Error in userService");
    throw error;
  }
}