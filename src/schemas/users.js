const joi = require('joi');

module.exports = {
  create: joi.object({
    firstname: joi.string().max(255).required(),
    lastname: joi.string().max(255).required(),
    email: joi.string().email().max(255).required(),
    password: joi.string().max(255).required(),
    image_url: joi.string().allow(null),
    city: joi.string().max(255).allow(null),
    zip_code: joi.string().max(15).allow(null),
  }),

  update: joi.object({
    firstname: joi.string().max(255),
    lastname: joi.string().max(255),
    email: joi.string().email().max(255),
    password: joi.string().max(255),
    image_url: joi.string().allow(null),
    city: joi.string().max(255).allow(null),
    zip_code: joi.string().max(15).allow(null),
  }),
};
