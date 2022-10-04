const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
} = require("../controller");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", updateContactController);

router.patch("/:contactId/favorite", updateFavoriteController);

module.exports = router;
