const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "email should be a type of string",
      "string.email": "not valid email",
      "any.required": "missing required email field",
    }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,20}/)
    .messages({
      "string.base": "password should be a type of string",
      "string.pattern.base": "not valid password",
      "any.required": "missing required password field",
    }),
});

module.exports = schema;
