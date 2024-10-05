/**
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
module.exports = (controller) => (req, res, next) => {
  const promise = Promise.resolve(controller(req, res, next)).catch(next);

  return promise;
};
