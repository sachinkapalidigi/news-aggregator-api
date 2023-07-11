const joi = require("joi");

const updateUserPreferencesSchema = joi.object().keys({
  preferences: joi.array().items(joi.string()).min(1),
});

module.exports = {
  updateUserPreferencesSchema,
};
