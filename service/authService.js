const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const User = require("./schemas/user");
const sendEmail = require("../utils/sendEmail");
const createError = require("../utils/createError");

require("dotenv").config();

const register = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const verificationToken = uuidv4();

  sendEmail({
    to: email,
    subject: "Verification of email",
    html: `<p>Please, <a href="http://localhost:${process.env.PORT}/auth/verify/${verificationToken}" target="_blank"> confirm your email </a><p>`,
  });

  const userNew = await User.create({
    email,
    password: hash,
    avatarURL: gravatar.url(email),
    verify: false,
    verificationToken,
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

  if (!user.verify) {
    throw createError(400, "Verify your email");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  const userAfterTokenUpdate = await User.findByIdAndUpdate(
    user.id,
    { token },
    { new: true }
  );

  return userAfterTokenUpdate;
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, "User not found");
  }

  await User.findByIdAndUpdate(user.id, {
    verificationToken: null,
    verify: true,
  });
};

const resendEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  sendEmail({
    to: email,
    subject: "Verification of email",
    html: `<p>Please, <a href="http://localhost:${process.env.PORT}/auth/verify/${user.verificationToken}" target="_blank"> confirm your email </a><p>`,
  });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  resendEmail,
};
