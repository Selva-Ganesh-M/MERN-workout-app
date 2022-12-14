const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// statics functions

// singup function
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("all fields must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email address.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }
  if (await this.findOne({ email })) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return this.create({ email, password: hash });
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid email address.");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw Error("Invalid password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
