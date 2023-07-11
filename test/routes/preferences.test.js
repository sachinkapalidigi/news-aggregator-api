const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../../src/server");
const AuthTestUtil = require("../testUtils/authTestUtils");
const {
  NYTArticleCategories,
} = require("../../src/constants/NYTArticleCategories");
const { expect } = chai;

describe("Verifies getting available preferences", () => {
  it("Successfull get all preferences", (done) => {
    chai
      .request(server)
      .get("/v1/preferences/all")
      .send()
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("preferences");
        expect(res.body.data.preferences).to.be.an("array").that.is.not.empty;
        done();
      });
  });
});

describe("Verifies updating user preferences", () => {
  const authUtil = new AuthTestUtil();
  const maxLength = NYTArticleCategories.length;
  const getRandom = () =>
    NYTArticleCategories[Math.round(Math.random() * (maxLength - 1))];

  before((done) => {
    // sign up
    authUtil.signUp(chai, server, done);
  });

  beforeEach((done) => {
    // sign in and set auth header
    authUtil.signIn(chai, server, done);
  });

  it("Set successfull user preferences", (done) => {
    const preferences = Array.from(
      new Set([getRandom(), getRandom(), getRandom(), getRandom()]).values()
    );
    chai
      .request(server)
      .put("/v1/preferences")
      .set("Authorization", `Bearer ${authUtil.getToken()}`)
      .send({
        preferences,
      })
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("preferences");
        expect(
          preferences.every((pref) => res.body.data.preferences.includes(pref))
        ).equal(true);
        done();
      });
  });

  it("Unauthorised user set preferences", (done) => {
    const preferences = [getRandom()];
    chai
      .request(server)
      .put("/v1/preferences")
      .send({
        preferences,
      })
      .end((err, res) => {
        expect(res.status).equal(401);
        done();
      });
  });

  it("Unsuccessfull set preferences - unkown preferences", (done) => {
    const preferences = ["Unkown Preference"];
    chai
      .request(server)
      .put("/v1/preferences")
      .set("Authorization", `Bearer ${authUtil.getToken()}`)
      .send({
        preferences,
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });

  it("Invalid properties set preferences", (done) => {
    const preferences = {};
    chai
      .request(server)
      .put("/v1/preferences")
      .set("Authorization", `Bearer ${authUtil.getToken()}`)
      .send({
        preferences,
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });

  it("Invalid properties set preferences", (done) => {
    const preferences = [[getRandom()]];
    chai
      .request(server)
      .put("/v1/preferences")
      .set("Authorization", `Bearer ${authUtil.getToken()}`)
      .send({
        preferences,
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
      });
  });
});

describe("Verifies getting user preferences", () => {
  const authUtil = new AuthTestUtil();
  const maxLength = NYTArticleCategories.length;
  const getRandom = () =>
    NYTArticleCategories[Math.round(Math.random() * (maxLength - 1))];
  let userPreferences = [];

  before((done) => {
    // sign up
    authUtil.signUp(chai, server, done);
  });

  beforeEach((done) => {
    // sign in and set auth header
    authUtil.signIn(chai, server, done);
  });

  beforeEach((done) => {
    const preferences = Array.from(
      new Set([getRandom(), getRandom(), getRandom(), getRandom()]).values()
    );
    chai
      .request(server)
      .put("/v1/preferences")
      .set("Authorization", `Bearer ${authUtil.getToken()}`)
      .send({
        preferences,
      })
      .end((err, res) => {
        userPreferences = res.body.data.preferences;
        done();
      });
  });

  it("Get successfull empty user preferences", (done) => {
    chai
      .request(server)
      .get("/v1/preferences")
      .set("Authorization", `Bearer ${authUtil.getToken()}`)
      .send()
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(
          userPreferences.every((pref) =>
            res.body.data.preferences.includes(pref)
          )
        ).equal(true);
        done();
      });
  });

  it("Unauthorised get user preferences", (done) => {
    chai
      .request(server)
      .get("/v1/preferences")
      .send()
      .end((err, res) => {
        expect(res.status).equal(401);
        done();
      });
  });
});
