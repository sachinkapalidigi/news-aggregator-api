const uuid = require("uuid");
const AppError = require("../../utils/appError");
const { getArticle } = require("../news/news.model");
const {
  NYTArticleCategories,
} = require("../../constants/NYTArticleCategories");

const users = {}; // user id
const emailUserId = {}; // Check if email is already registered

// Create User object
const createUser = function (user) {
  const { name, email, password } = user;
  if (emailUserId[email]) throw new AppError("Email already registered", 400);
  const id = uuid.v4();
  users[id] = {
    id,
    name,
    email,
    password,
    preferences: [],
    favorites: [],
    read: [],
  };
  emailUserId[email] = id;
  return users[id];
};

// Get User object
const getUser = (userId) => {
  if (!users[userId]) return null;
  return users[userId];
};

const getUserByEmail = (email) => {
  if (!emailUserId[email]) return null;
  return users[emailUserId[email]];
};

// Add User preference
const addUserPreference = function (preference, userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  if (!users[userId].preferences.includes(preference))
    users[preference.userId].preferences.push(preference);
  return users[userId].preferences;
};

// Update User preferences
const updateUserPreferences = function (preferences, userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  if (
    !Array.isArray(preferences) ||
    preferences.every(
      (val) => typeof val !== "string" || !NYTArticleCategories.includes(val)
    )
  )
    throw new AppError("Invalid user preferences", 400);
  users[userId].preferences = preferences;
  return users[userId].preferences;
};

// Get User preferences
const getUserPreferences = function (userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  return users[userId].preferences;
};

// Add User favorite
const addUserFavorite = function (favArticle, userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  if (!users[userId].favorites.includes(favArticle.id))
    users[favorite.userId].favorites.push(favArticle.id);
  return users[userId].favorites;
};

// Remove from Favourites
const removeUserFavorite = function (favArticle, userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  if (users[userId].favorites.includes(favArticle.id)) {
    const index = users[userId].favorites.indexOf(favArticle.id);
    users[userId].favorites.splice(index, 1);
  }
  return users[userId].favorites;
};

// Get Favourites
const getFavourites = function (userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  return users[userId].favorites.map((id, index) => {
    // Get ariticles from news model
    return getArticle(id);
  });
};

// Add to read
const addUserRead = function (readArticle, userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  if (!users[userId].read.includes(readArticle.id))
    users[read.userId].read.push(readArticle.id);
  return users[userId].read;
};

// Update read
const updateUserRead = function (readArticle, userId) {
  if (!users[userId]) throw new AppError("User not found", 404);
  if (users[userId].read.includes(readArticle.id)) {
    const index = users[userId].read.indexOf(readArticle.id);
    users[userId].read.splice(index, 1);
  }
  return users[userId].read;
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  addUserPreference,
  getUserPreferences,
  addUserFavorite,
  removeUserFavorite,
  getFavourites,
  addUserRead,
  updateUserRead,
  updateUserPreferences,
};
