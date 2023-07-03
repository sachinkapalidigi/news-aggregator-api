const NYTArticleCategories = require("../../constants/NYTArticleCategories");
const {
  getUserPreferences,
  updateUserPreferences,
} = require("../../models/users/user.model");

const httpGetAllPreferences = (req, res) => {
  return res.status(200).json({
    status: "success",
    data: {
      preferences: NYTArticleCategories,
    },
  });
};

const httpGetUserPreferences = (req, res) => {
  const user = req.user;

  const userPreferences = getUserPreferences(user.id);
  res.status(200).json({
    status: "success",
    data: {
      preferences: userPreferences,
    },
  });
};

const httpUpdateUserPreferences = (req, res) => {
  const user = req.user;
  const userPreferences = updateUserPreferences(req.body.preferences, user.id);
  return res.status(200).json({
    status: "success",
    data: {
      preferences: userPreferences,
    },
  });
};

module.exports = {
  httpGetAllPreferences,
  httpGetUserPreferences,
  httpUpdateUserPreferences,
};
