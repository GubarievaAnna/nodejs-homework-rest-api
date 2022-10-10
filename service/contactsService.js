const Contact = require("./schemas/contact");
const createError = require("../utils/createError");

const listContacts = async (userId, query) => {
  const { favorite, page = 1, limit = 20 } = query;
  const contacts = await Contact.find(
    favorite ? { owner: userId, favorite } : { owner: userId }
  )
    .skip((page - 1) * limit)
    .limit(limit);
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  if (JSON.stringify(userId) !== JSON.stringify(contactById.owner)) {
    throw createError(401, "Not authorized");
  }
  return contactById;
};

const addContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (contactId) => {
  await getContactById(contactId);
  return Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  await getContactById(contactId);
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  await getContactById(contactId);
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
