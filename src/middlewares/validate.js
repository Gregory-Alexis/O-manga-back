const APIError = require('../errors/APIError');

/**
 * @param { import("joi").Schema } schema
 * @param { 'body' | 'query' | 'params' } prop
 * @returns
 */
module.exports = (schema, prop) => (req, res, next) => {
  for (const key in req[prop]) if (req[prop][key] === '') delete req[prop][key]; // eslint-disable-line no-restricted-syntax

  const { error } = schema.validate(req[prop]);
  if (error) throw new APIError({ code: 400, message: error.message });
  next();
};
