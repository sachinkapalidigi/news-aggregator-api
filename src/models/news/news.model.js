const news = {};

const saveNewsArticle = (article) => {
  news[article.id] = article;
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
