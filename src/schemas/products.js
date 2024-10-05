const joi = require('joi');

module.exports = {
  create: joi.object({
    stock: joi.number().integer().required(),
    name: joi.string().max(255).required(),
    description: joi.string().max(500).required(),
    image_url: joi.string().required(),
    price: joi.number().precision(2).required(),
    category_id: joi.number().integer().required(),
    universe_id: joi.number().integer().required(),
  }),

  update: joi.object({
    stock: joi.number().integer(),
    name: joi.string().max(255),
    description: joi.string().max(500),
    image_url: joi.string(),
    price: joi.number().precision(2),
    category_id: joi.number().integer(),
    universe_id: joi.number().integer(),
  }),
};
