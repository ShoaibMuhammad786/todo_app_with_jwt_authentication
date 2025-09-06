const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const createUser = async ({ name, email, password, role }) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error(`Email already registered`);
  }

  const hashedPassword = await bcrypt.hash(password, 11);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    message: "Account created successfully!",
    data: user,
  };
};

const loginUser = async ({ email, password }) => {
  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    throw new Error(`Email does not exist.`);
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const userData = existingUser.toObject();
  delete userData.password;
  delete userData.createdAt;
  delete userData.updatedAt;

  return {
    message: "Login successfull!",
    data: userData,
    token: generateToken(),
  };
};

module.exports = {
  createUser,
  loginUser,
};
