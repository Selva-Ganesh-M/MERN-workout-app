const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const jwtGenerator = (_id) => {
  if (!_id) {
    throw Error("Invalid Id");
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = jwtGenerator(user._id);
    return res.status(200).json({
      email,
      token,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.signup(email, password);
    const token = jwtGenerator(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { login, signup };
