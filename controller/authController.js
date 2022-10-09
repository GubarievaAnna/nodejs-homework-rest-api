const { validateRequestBody } = require("../validation/validateRequest");
const schemaUser = require("../validation/createUserSchema");
const { register, login } = require("../service/authService");

const registerController = async (req, res, next) => {
  try {
    validateRequestBody(schemaUser, req.body);
    const user = await register(req.body);
    const { subscription, email } = user.toObject();
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    validateRequestBody(schemaUser, req.body);
    const user = await login(req.body);
    const { email, subscription, token } = user.toObject();
    res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController };
