const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "https://jadenday20.github.io",
  clientID: "LNrndgBMIhELwXdi6AYf0Kw01zB4Runy",
  issuerBaseURL: "https://dev-en6sa3uv8o65pasm.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
