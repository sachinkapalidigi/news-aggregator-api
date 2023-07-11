const expect = require("chai").expect;

const {
  NYTArticleCategories,
} = require("../../src/constants/NYTArticleCategories");
const NYTNewsFetcher = require("../../src/utils/NYTNewsFetcher");

describe("Testing categories", function () {
  it(`1. Validate empty categories`, function (done) {
    const nytApi = new NYTNewsFetcher();
    expect(nytApi.getCategories().length).equal(0);
    done();
  });

  // Set categories and check if present

  // Set URL and check URL

  // Fetch news & test if it contains keys

  // Test error on fetching news
});
