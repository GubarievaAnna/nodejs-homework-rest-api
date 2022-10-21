const { validateRequestBody } = require("../validation/validateRequest");
const {
  schemaAuth,
  schemaVerifyEmail,
} = require("../validation/createUserSchema");
const {
  register,
  login,
  logout,
  verifyEmail,
  resendEmail,
} = require("../service/authService");

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

const verifyEmailController = async (req, res, next) => {
  try {
    await verifyEmail(req.params.verificationToken);
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const resendEmailController = async (req, res, next) => {
  try {
    validateRequestBody(schemaVerifyEmail, req.body);
    await resendEmail(req.body.email);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  verifyEmailController,
  resendEmailController,
};
