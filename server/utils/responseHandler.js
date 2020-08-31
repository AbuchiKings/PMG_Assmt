
function responseHandler(response, result, next, statusCode, message) {
  if (result instanceof Error) {
    return next(result);
  } else {
    return response.status(statusCode).json({
      error: 0,
      message,
      data: result
    });
  }
}

module.exports = responseHandler;
