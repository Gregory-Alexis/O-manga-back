module.exports = class APIError extends Error {
  /**
   * @param { { code: number, message: string } } param0
   */
  constructor({ code, message }) {
    super(message);

    this.code = code;
  }
};
