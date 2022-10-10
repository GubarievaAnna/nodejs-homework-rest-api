const { validateRequestBody } = require("../validation/validateRequest");
const {
  schemaAuth,
  schemaUpdateSubscription,
} = require("../validation/createUserSchema");
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} = require("../service/authService");

const registerController = async (req, res, next) => {
  try {
    validateRequestBody(schemaAuth, req.body);
    const user = await register(req.body);
    const { subscription, email } = user.toObject();
    res.status(201).json({ user: { email, subscription } });
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

const currentUserController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);
    const { subscription, email } = user.toObject();
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const updateSubscriptionController = async (req, res, next) => {
  try {
    validateRequestBody(schemaUpdateSubscription, req.body);
    const user = await updateSubscription(req.user.id, req.body.subscription);
    const { subscription, email } = user.toObject();
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
};
