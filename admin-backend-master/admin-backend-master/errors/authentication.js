class AuthenticationError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'AuthenticationError';
    this.errorType = 'AuthenticationError';
    this.message = message;
    this.statusCode = 401;
    this.detail = 'Authentication failed';
  }
}

module.exports = AuthenticationError;
