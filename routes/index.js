const express = require("express");
const routes = express.Router();
var session = require("express-session");
var passport = require("passport");

var SQLiteStore = require("connect-sqlite3")(session);
routes.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
    store: new SQLiteStore(),
  })
);
routes.use(passport.authenticate("session"));

routes
  .use("/songs", require("./songs"))
  .use("/students", require("./students"))
  .use("/auth", require("./auth"));

module.exports = routes;
