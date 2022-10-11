const path = require("path");
const fs = require("fs/promises");
const User = require("./schemas/user");
const createError = require("../utils/createError");

const getCurrentUser = async (id) => {
  return User.findById(id);
};

const updateSubscription = async (id, subscription) => {
  const userAfterSubscriptionUpdate = User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  return userAfterSubscriptionUpdate;
};

const uploadAvatar = async (id, data) => {
  const { path: tempDir, originalname = "" } = data;
  const [extension] = originalname.split(".").reverse();
  const newFileName = `${id}.${extension}`;
  const uploadDir = path.join(
    __dirname,
    "../",
    "public",
    "avatars",
    newFileName
  );

  await fs.rename(tempDir, uploadDir);

  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL: path.join("avatars", newFileName) },
    { new: true }
  );
  return user;
};

module.exports = {
  getCurrentUser,
  updateSubscription,
  uploadAvatar,
};
