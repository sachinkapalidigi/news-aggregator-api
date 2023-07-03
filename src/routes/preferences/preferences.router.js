const express = require("express");
const {
  httpGetAllPreferences,
  httpUpdateUserPreferences,
  httpGetUserPreferences,
} = require("./preferences.controller");
const { protectRoute } = require("../../middlewares/authMiddleware");

const preferencesRouter = express.Router();

preferencesRouter
  .route("/")
  .get(protectRoute, httpGetUserPreferences)
  .put(protectRoute, httpUpdateUserPreferences);

preferencesRouter.get("/all", httpGetAllPreferences);

module.exports = preferencesRouter;
