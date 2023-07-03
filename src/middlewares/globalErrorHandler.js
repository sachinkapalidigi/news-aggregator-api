const globalErrorHandler = (err, req, res, next) => {
  const status = err.statusCode || 400;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ message });
};

module.exports = { globalErrorHandler };
