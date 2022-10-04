const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../service");
const {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateFavorite,
} = require("../validation/createContactSchema");
const {
  validateRequestBody,
  validateId,
} = require("../validation/validateRequest");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    validateId(req.params.contactId);
    const contact = await getContactById(req.params.contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    validateRequestBody(schemaAddContact, req.body);
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    validateId(req.params.contactId);
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    validateId(req.params.contactId);
    validateRequestBody(schemaUpdateContact, req.body);
    const contact = await updateContact(req.params.contactId, req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    validateId(req.params.contactId);
    validateRequestBody(schemaUpdateFavorite, req.body);
    const contact = await updateStatusContact(req.params.contactId, req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
