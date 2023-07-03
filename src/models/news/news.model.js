const fs = require("fs");
const path = require("path");

let news = {};

const saveNewsArticle = (article) => {
  const loadNews = fs.readFileSync(path.join(__dirname, "news.json"), "utf8");
  news = JSON.parse(loadNews);
  news[article.id] = article;
  fs.writeFileSync(path.join(__dirname, "news.json"), JSON.stringify(news));
  return true;
};

const getSavedNews = () => Object.keys(news).map((key) => news[key]);

const getSavedArticle = (articleId) => {
  if (!news[articleId]) {
    return null;
  }
  return news[articleId];
};

module.exports = {
  saveNewsArticle,
  getSavedNews,
  getSavedArticle,
};
