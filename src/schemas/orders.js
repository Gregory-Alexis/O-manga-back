const joi = require('joi');

module.exports = {
  create: joi.object({
    order_date: joi.date().iso(),
    archeving_date: joi.date().iso(),
    product_quantity: joi.number().integer().required(),
    product_id: joi.number().integer().required(),
    user_id: joi.number().integer().required()
  }),

  update: joi.object({
    order_date: joi.date().iso(),
    archeving_date: joi.date().iso(),
    product_quantity: joi.number().integer(),
    product_id: joi.number().integer(),
    user_id: joi.number().integer()
  }),
};
