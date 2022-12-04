const UserModel = require("../models/UserModel");

const login = (req, res) => {
  res.json("user login");
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { login, signup };
