import { getUsers } from "../models/userModel.js";

export const getAllUser = async (req, res) => {
  const users = await getUsers();
  res.send(users);
};
