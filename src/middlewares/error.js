const APIError = require('../errors/APIError');

/**
 * @param { Error } error
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  console.log(req.method, req.url, error);

  if (error instanceof APIError) {
    res.status(error.code).json({ code: error.code, message: `${error.message} (${req.url})` });
  }
  else if (error.code === 'P2002') {
    res.status(400).json({ code: 400, message: `duplicate entry on ${error?.meta?.target[0]}` });
  }
  else res.status(500).json({ code: 500, message: 'internal error' });
};