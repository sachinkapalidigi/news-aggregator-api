const express = require("express");
const {
  httpGetAllPreferences,
  httpUpdateUserPreferences,
  httpGetUserPreferences,
} = require("./preferences.controller");
const { protectRoute } = require("../../middlewares/authMiddleware");
const requestValidator = require("../../middlewares/requestValidator");
const {
  updateUserPreferencesSchema,
} = require("./preferences.validation.schema");

const preferencesRouter = express.Router();

preferencesRouter
  .route("/")
  .get(protectRoute, httpGetUserPreferences)
  .put(
    protectRoute,
    requestValidator(updateUserPreferencesSchema),
    httpUpdateUserPreferences
  );

preferencesRouter.get("/all", httpGetAllPreferences);

module.exports = preferencesRouter;
