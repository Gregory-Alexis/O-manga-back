const joi = require('joi');

module.exports = {
  create: joi.object({
    email: joi.string().email().max(255).required(),
  }),
};
