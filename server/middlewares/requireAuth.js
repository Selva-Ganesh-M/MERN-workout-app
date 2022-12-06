const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Authorization failed. Missing authorization token." });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    user = await UserModel.findOne({ _id }).select("_id");
    if (!user) {
      throw Error({
        error: "Authorization failed",
        message: "User not found.",
      });
    }
    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
    res.status(401).json(e);
  }
};

module.exports = requireAuth;
