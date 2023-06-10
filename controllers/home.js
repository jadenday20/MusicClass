const homeRoute = (req, res) => {
  res.send(
    "Welcome to MusicClass!\n\nPlease add '/api-docs' to the url to documentation for this api."
  );
};

module.exports = {
  homeRoute,
};
