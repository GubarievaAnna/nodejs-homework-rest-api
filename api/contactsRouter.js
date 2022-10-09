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

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", validateId, getContactByIdController);

router.post("/", addContactController);

router.delete("/:contactId", validateId, deleteContactController);

router.put("/:contactId", validateId, updateContactController);

router.patch("/:contactId/favorite", validateId, updateFavoriteController);

module.exports = router;
