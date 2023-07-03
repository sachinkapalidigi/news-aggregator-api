class NYTArticlesApi {
  static BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  static PUBLISHER_NAME = "New York Times";
  API_KEY = "";
  categories = null;
  url = "";
  constructor() {
    this.API_KEY = process.env.NYT_API_KEY;
    this.categories = new Set();
  }

  getCategories() {
    return Array.from(this.categories.values());
  }

  setCategory(category) {
    if (!NYTArticleCategories.includes(category)) return;
    this.categories.add(category);
  }

  getURL() {
    // TODO: Improve this design

    const newDeck = this.getCategories()
      .reduce((acc, deck) => `${acc}"${deck}",`, "")
      .trim(",");
    const fq = newDeck && `fq=new_deck:(${newDeck})`;

    this.url = new URL(fq, BASE_URL);
    console.log(this.url.toString());
  }
}

module.exports = NYTArticlesApi;
