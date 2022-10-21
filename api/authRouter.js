const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  verifyEmailController,
  resendEmailController,
} = require("../controller/authController");
const checkAuth = require("../middlewares/checkAuthMiddleware");

const router = express.Router();

router.post("/signup", registerController);

router.post("/login", loginController);

router.patch("/logout", checkAuth, logoutController);

router.get("/verify/:verificationToken", verifyEmailController);

router.post("/verify/", resendEmailController);

module.exports = router;
