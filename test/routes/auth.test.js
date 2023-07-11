const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../../src/server");
const { expect } = chai;

describe("Verifies Signup flow", () => {
  const validSignUpBody = {
    name: "sample name",
    email: "sample@gmail.com",
    password: "sample password",
  };

  it("Successfull signup flow", (done) => {
    chai
      .request(server)
      .post("/v1/auth/register")
      .send(validSignUpBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("User created");
        done();
      });
  });

  // failing signup flow due to invalid email
  it("Fails signup flow due to invalid email", (done) => {
    chai
      .request(server)
      .post("/v1/auth/register")
      .send({
        ...validSignUpBody,
        email: "Invalid email",
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('"email" must be a valid email');
        done();
      });
  });

  // failing signup flow due to invalid password
  it("Fails signup flow due to invalid password", (done) => {
    chai
      .request(server)
      .post("/v1/auth/register")
      .send({
        ...validSignUpBody,
        password: "pwd",
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal(
          '"password" length must be at least 6 characters long'
        );
        done();
      });
  });

  // failing signup flow due to incomplete properties
  it("Fails signup flow due to missing properties", (done) => {
    chai
      .request(server)
      .post("/v1/auth/register")
      .send({
        ...validSignUpBody,
        name: undefined,
      })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal('"name" is required');
        done();
      });
  });
});

describe("Verifies SignIn flow", () => {
  const validSignInBody = {
    email: "sample@gmail.com",
    password: "sample password",
  };
  // signup before each
  beforeEach((done) => {
    const validSignUpBody = {
      name: "sample name",
      email: "sample@gmail.com",
      password: "sample password",
    };
    chai
      .request(server)
      .post("/v1/auth/register")
      .send(validSignUpBody)
      .end((err, res) => {
        // Email already registered
        done();
      });
  });

  // Successfull Sign In flow
  it("Verifies SignIn flow", (done) => {
    chai
      .request(server)
      .post("/v1/auth/login")
      .send(validSignInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("User logged in");
        expect(res.body).to.have.property("token");
        done();
      });
  });

  // Invalid email
  it("Sign In fail due to invalid email", (done) => {
    chai
      .request(server)
      .post("/v1/auth/login")
      .send({
        ...validSignInBody,
        email: "invalid@gmail.com",
      })
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.body.message).equal("Invalid Credentials");
        done();
      });
  });

  // Invalid password
  it("Sign In fail due to invalid password", (done) => {
    chai
      .request(server)
      .post("/v1/auth/login")
      .send({
        ...validSignInBody,
        password: "invalid password",
      })
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.body.message).equal("Invalid Credentials");
        done();
      });
  });
});

// Mock if database is used
