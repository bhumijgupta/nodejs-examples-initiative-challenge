/**
 * Middleware to return 404 on non defined routes
 * @param {ExpressRequesr} req
 * @param {ExpressResponse} res
 * @param {ExpressNext} next
 */
const nullRoute = (req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: `${req.method} - ${req.url} route not found`,
  });
};

/**
 * Middleware to handle any uncaught error and send the response
 * @param {Error} err Error object
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {ExpressNext} next
 */
const errorHandler = (err, req, res, next) => {
  let errorResponse = {
    statusCode: 500,
    message: err.message || "Internal server error",
  };
  if (process.env.NODE_ENV !== "production" && err.stack) {
    errorResponse[stack] = err.stack;
  }
  res.status(500);
  res.json(errorResponse);
};

module.exports = { nullRoute, errorHandler };
