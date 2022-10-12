const { validateRequestBody } = require("../validation/validateRequest");
const { schemaAuth } = require("../validation/createUserSchema");
const { register, login, logout } = require("../service/authService");

const registerController = async (req, res, next) => {
  try {
    validateRequestBody(schemaAuth, req.body);
    const user = await register(req.body);
    const { subscription, email, avatarURL } = user.toObject();
    res.status(201).json({ user: { email, subscription, avatarURL } });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    validateRequestBody(schemaAuth, req.body);
    const user = await login(req.body);
    const { email, subscription, token } = user.toObject();
    res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
