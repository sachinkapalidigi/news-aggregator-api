const express = require("express");
const authRouter = require("./auth/auth.router");
const preferencesRouter = require("./preferences/preferences.router");
const newsRouter = require("./news/news.router");

const api = express.Router();

// Routers
api.use("/auth", authRouter);
api.use("/preferences", preferencesRouter);
api.use("/news", newsRouter);

module.exports = api;
