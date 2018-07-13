class NotFoundError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotFoundError';
    this.errorType = 'NotFoundError';
    this.message = message;
    this.statusCode = 404;
    this.detail = 'Not Found';
  }
}

module.exports = NotFoundError;
