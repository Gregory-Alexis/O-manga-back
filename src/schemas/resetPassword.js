const joi = require('joi');

module.exports = {
  update: joi.object({
    token: joi.string().required(),
    password: joi.string().required(),
  }),
};
