const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
} = require("../controller/contactsController");
const validateId = require("../middlewares/validationIdMiddleware");
const checkAuth = require("../middlewares/checkAuthMiddleware");

const router = express.Router();

router.get("/", checkAuth, getContactsController);

router.get("/:contactId", validateId, checkAuth, getContactByIdController);

router.post("/", checkAuth, addContactController);

router.delete("/:contactId", validateId, checkAuth, deleteContactController);

router.put("/:contactId", validateId, checkAuth, updateContactController);

router.patch(
  "/:contactId/favorite",
  validateId,
  checkAuth,
  updateFavoriteController
);

module.exports = router;
