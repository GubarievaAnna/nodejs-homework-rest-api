const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
} = require("../controller/authController");
const checkAuth = require("../middlewares/checkAuthMiddleware");

const router = express.Router();

router.post("/signup", registerController);

router.post("/login", loginController);

router.patch("/logout", checkAuth, logoutController);

router.get("/current", checkAuth, currentUserController);

module.exports = router;
