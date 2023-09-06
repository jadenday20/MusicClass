const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://jadenday20.github.io/vio-learn/",
];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`
  );
});

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.get("/loggedin", (req, res) => {
  const { code } = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const opts = { headers: { accept: "application/json" } };
  axios
    .post("https://github.com/login/oauth/access_token", body, opts)
    .then((_res) => {
      req.session.token = _res.data.access_token;
      res.redirect("/api-docs");
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

app.get("/logout", (req, res) => {
  req.session.token = null;
  res.redirect("/api-docs");
});

app
  .use(bodyParser.json()) //makes it so I can use less code by using req, next, and things like that
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

//Auth
// const { auth } = require("express-openid-connect");

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: "XR6Qr5Ur3WCau5pYy3axn0wLlXwZi-bEeXh21YWr4KH25DEmda9m-0pWrq5L_pAh",
//   baseURL: "https://jadenday20.github.io/vio-learn",
//   clientID: "A21re41GBNQqxCpvAYpOrvtDz7bwLWLR",
//   issuerBaseURL: "https://dev-en6sa3uv8o65pasm.us.auth0.com",
// };

// // const config = {
// //   authRequired: false,
// //   auth0Logout: true,
// //   secret: "a long, randomly-generated string stored in env",
// //   baseURL: "https://jadenday20.github.io/vio-learn",
// //   clientID: "LNrndgBMIhELwXdi6AYf0Kw01zB4Runy",
// //   issuerBaseURL: "https://dev-en6sa3uv8o65pasm.us.auth0.com",
// // };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });
