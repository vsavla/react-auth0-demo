const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithm: ["RS256"]
});

const app = express();

app.get("/public", (_, res) => {
  res.json({
    message: "Hello from a public API!"
  });
});

app.get("/private", checkJwt, (_, res) => {
  res.json({
    message: "Hello from a private API!"
  });
});

app.get("/courses", checkJwt, checkScope(["read:courses"]), (_, res) => {
  res.json({
    courses: [
      { id: 1, title: "Javascript" },
      { id: 2, title: "Node" }
    ]
  });
});

app.listen(3001, err => {
  console.log("App listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
});
