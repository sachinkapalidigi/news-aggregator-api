const express = require("express");
const { httpGetUserNews } = require("./news.controller");
const { protectRoute } = require("../../middlewares/authMiddleware");

const newsRouter = express.Router();

// Order of routes matters here

newsRouter.route("/").get(protectRoute, httpGetUserNews);

newsRouter.route("/read").post((req, res) => {});

newsRouter.route("/favorite").post((req, res) => {});

newsRouter.route("/search/:keyword").get((req, res) => {});

newsRouter.route("/:id").get();
newsRouter.route("/:id/read").post((req, res) => {});
newsRouter.route("/:id/favorite").post((req, res) => {});

module.exports = newsRouter;
