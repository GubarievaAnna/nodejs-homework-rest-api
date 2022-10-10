const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
} = require("../controller/authController");
const checkAuth = require("../middlewares/checkAuthMiddleware");

const router = express.Router();

router.post("/signup", registerController);

router.post("/login", loginController);

router.patch("/logout", checkAuth, logoutController);

router.get("/current", checkAuth, currentUserController);

router.patch("/", checkAuth, updateSubscriptionController);

module.exports = router;
