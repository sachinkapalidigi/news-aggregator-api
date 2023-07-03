const NYTArticleCategories = require("../../constants/NYTArticleCategories");

const preferences = {
  publishers: [
    {
      name: "New York Times",
      apiType: "Articles",
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      categories: NYTArticleCategories,
    },
    // {
    //   name: "The Guardian",
    //   url: "https://www.theguardian.com",
    // },
  ],
};

module.exports = { preferences, NYTArticleCategories };
