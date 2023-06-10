const homeRoute = (req, res) => {
  res.send(
    "Welcome to MusicClass!\n\nPlease head to https://musicclass.onrender.com/api-docs for documentation for this api."
  );
};

module.exports = {
  homeRoute,
};
