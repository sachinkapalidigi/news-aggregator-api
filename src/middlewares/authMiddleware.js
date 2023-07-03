const { getUser } = require("../models/users/user.model");
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/authUtil");

const protectRoute = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError(`You are not logged in! Please log in to get access.`, 401)
    );
  }
  // 2. Verification of token
  const decoded = verifyToken(token);
  // 3. Check if user still exists
  const currUser = getUser(decoded.id);
  if (!currUser) {
    return next(
      new AppError("The token belonging to this user does no longer exist", 401)
    );
  }

  // Grant access to protected route
  req.user = currUser;
  next();
};

module.exports = {
  protectRoute,
};
