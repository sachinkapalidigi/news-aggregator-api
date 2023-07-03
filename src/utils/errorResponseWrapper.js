const errorResponseWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({ message });
  }
};

const errorResponseWrapperSync = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({ message });
  }
};

module.exports = {
  errorResponseWrapper,
  errorResponseWrapperSync,
};
