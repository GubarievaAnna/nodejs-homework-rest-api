const bcrypt = require("bcryptjs");
const User = require("./schemas/user");
const createError = require("../utils/createError");

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userNew = await User.create({
    email,
    password: hash,
  });

  return userNew;
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(401, "Email or password is wrong");
  }

  return user;
};

module.exports = { register, login };
