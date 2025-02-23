const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": "name should be a type of string",
    "string.max": "length must be less than or equal to 30 characters long",
    "string.min": "length must be at least 2 characters long",
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "email should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required email field",
    }),
  phone: Joi.string().trim().required().messages({
    "string.base": "phone should be a type of string",
    "string.empty": "phone must contain value",
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).messages({
    "string.base": "name should be a type of string",
    "string.max": "length must be less than or equal to 30 characters long",
    "string.min": "length must be at least 2 characters long",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.base": "email should be a type of string",
      "string.email": "field 'email' must be a valid email",
    }),
  phone: Joi.string().trim().messages({
    "string.base": "phone should be a type of string",
    "string.empty": "phone must contain value",
  }),
}).or("name", "email", "phone");

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateFavorite,
};
