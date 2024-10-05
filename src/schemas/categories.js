const joi = require('joi');

module.exports = {
  create: joi.object({
    name: joi.string().required(),
    image_url: joi.string().required(),
  }),

  update: joi.object({
    name: joi.string(),
    image_url: joi.string(),
  }),
};
