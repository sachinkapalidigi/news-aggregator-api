const { saveNewsArticle } = require("../../models/news/news.model");
const { getUserPreferences } = require("../../models/users/user.model");
const NYTArticlesApi = require("../../utils/NYTNewsFetcher");

const httpGetUserNews = (req, res) => {
  const user = req.user;
  const userPreferences = getUserPreferences(user.id);

  const nytArticles = new NYTArticlesApi();
  userPreferences.forEach((pref) => {
    nytArticles.setCategory(pref);
  });

  const news = nytArticles.getArticles().forEach((article) => {
    saveNewsArticle({
      ...article,
      id: article._id,
    });
  });
  return res.status(200).json({
    status: "success",
    data: {
      news,
    },
  });
};

module.exports = {
  httpGetUserNews,
};
