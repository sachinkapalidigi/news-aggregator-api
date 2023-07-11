const { createUser, getUserByEmail } = require("../../models/users/user.model");
const {
  hashPassword,
  generateToken,
  verifyPassword,
} = require("../../utils/authUtil");
const {
  errorResponseWrapperSync,
} = require("../../utils/errorResponseWrapper");

const httpCreateUser = errorResponseWrapperSync((req, res) => {
  const { email, name, password } = req.body;
  const user = { email, name, password: hashPassword(password) };
  // TODO: Test error handling here for duplicate emails
  const newUser = createUser(user);
  // TODO: Log in user
  return res.status(200).json({
    message: "User created",
    data: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  });
});

const httpLoginUser = errorResponseWrapperSync((req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (user && verifyPassword(password, user.password)) {
    return res.status(200).json({
      message: "User logged in",
      token: generateToken({
        id: user.id,
      }),
    });
  }
  return res.status(401).json({ message: "Invalid Credentials" });
});

module.exports = {
  httpCreateUser,
  httpLoginUser,
};
