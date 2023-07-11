const { generateShortId } = require("./shortId");

class AuthTestUtil {
  token = "";
  validEmail = "";
  validPassword = "";
  validName = "";
  constructor() {
    const shortId = generateShortId();
    this.validName = `Sample User`;
    this.validEmail = `sample+${shortId}@example.com`;
    this.validPassword = `sample+password`;
  }

  getValidSignUpBody() {
    return {
      email: this.validEmail,
      password: this.validPassword,
      name: this.validName,
    };
  }

  getValidSignInBody() {
    return {
      email: this.validEmail,
      password: this.validPassword,
    };
  }

  signUp(chai, server, done) {
    chai
      .request(server)
      .post("/v1/auth/register")
      .send(this.getValidSignUpBody())
      .end((err, res) => {
        // Email already registered
        done();
      });
  }

  signIn(chai, server, done) {
    chai
      .request(server)
      .post("/v1/auth/login")
      .send(this.getValidSignInBody())
      .end((err, res) => {
        this.token = res.body.token;
        done();
      });
  }

  getToken() {
    if (!this.token) throw new Error(`Token not set - signIn`);
    return this.token;
  }
}

module.exports = AuthTestUtil;
