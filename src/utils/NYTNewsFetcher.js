const axios = require("axios");
const {
  NYTArticleCategories,
  NYTFieldsList,
} = require("../constants/NYTArticleCategories");
const { config } = require("dotenv");
const path = require("path");

config({
  path: path.join(__dirname, "../../.env"),
});

class NYTArticlesApi {
  static BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  static PUBLISHER_NAME = "New York Times";
  API_KEY = "";
  categories = null;
  url = "";
  sort = "newest";
  fieldList = null;
  constructor() {
    this.API_KEY = process.env.NYT_API_KEY;
    this.categories = new Set();
    this.fieldList = [];
  }

  getCategories() {
    return Array.from(this.categories.values());
  }

  setCategory(category) {
    if (!NYTArticleCategories.includes(category)) return;
    this.categories.add(category);
    return this;
  }

  setURL() {
    // TODO: Improve this design
    const newDeck = this.getCategories().reduce(
      (acc, deck) => `${acc}"${deck}",`,
      ""
    );
    const qNewDeck = newDeck
      ? `fq=new_deck:(${newDeck.substring(0, newDeck.length - 1)})`
      : "";
    const qSort = `sort=${this.sort}`;
    const qApiKey = `api-key=${this.API_KEY}`;
    const fl = `fl=${NYTFieldsList.join(",")}`;
    const query = `?${fl}&${qNewDeck}&${qSort}&${qApiKey}`;
    this.url = new URL(query, NYTArticlesApi.BASE_URL);
    return this;
  }

  async fetchArticles() {
    if (!this.url) throw new Error("No URL provided");
    return new Promise((resolve, reject) => {
      const fetcher = new axios.Axios({
        method: "GET",
      });
      fetcher
        .get(this.url.toString())
        .then((response) => {
          resolve(JSON.parse(response.data));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getArticles() {
    try {
      const {
        response: { docs },
      } = await this.fetchArticles();
      return docs;
    } catch (error) {
      console.error(`Couldn't fetch articles or Invalid response: ${error}`);
    }
  }
}

module.exports = NYTArticlesApi;
