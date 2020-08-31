function errorHandler(status, message) {
  const err = new Error();
  err.statusCode = status;
  err.error = 1;
  err.message = message;
  throw err;
}

module.exports = errorHandler;
