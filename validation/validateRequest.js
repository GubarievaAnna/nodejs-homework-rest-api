const createError = require("../utils/createError");
const schemaId = require("./createIdSchema");

function validateId(id) {
  const { error } = schemaId.validate(id);
  if (error) {
    throw createError(400, error.message);
  }
}

function validateRequestBody(schema, body) {
  const { error } = schema.validate(body);
  if (error) {
    if (
      error.message ===
      '"value" must contain at least one of [name, email, phone]'
    )
      error.message = "missing fields";
    throw createError(400, error.message);
  }
}

module.exports = { validateId, validateRequestBody };
