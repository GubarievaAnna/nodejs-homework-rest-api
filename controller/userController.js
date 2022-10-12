const { validateRequestBody } = require("../validation/validateRequest");
const { schemaUpdateSubscription } = require("../validation/createUserSchema");
const {
  getCurrentUser,
  updateSubscription,
  uploadAvatar,
} = require("../service/userService");

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

const updateAvatarController = async (req, res, next) => {
  try {
    const user = await uploadAvatar(req.user.id, req.file);
    const { avatarURL } = user.toObject();
    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUserController,
  updateSubscriptionController,
  updateAvatarController,
};
