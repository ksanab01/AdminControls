class BadRequestError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestError';
    this.errorType = 'BadRequestError';
    this.message = message;
    this.statusCode = 400;
    this.detail = 'Bad Request';
  }
}

module.exports = BadRequestError;
