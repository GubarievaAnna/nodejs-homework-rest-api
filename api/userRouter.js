const express = require("express");
const {
  currentUserController,
  updateSubscriptionController,
  updateAvatarController,
} = require("../controller/userController");
const checkAuth = require("../middlewares/checkAuthMiddleware");
const upload = require("../middlewares/uploadAvatarMiddleware");

const router = express.Router();

router.get("/current", checkAuth, currentUserController);

router.patch("/", checkAuth, updateSubscriptionController);

router.patch(
  "/avatars",
  checkAuth,
  upload.single("avatar"),
  updateAvatarController
);

module.exports = router;
