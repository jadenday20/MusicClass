const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "MusicClass",
    description:
      "Returns a collection of Songs and a collection of Students\nLogin: musicclass.onrender.com/login\nLogout: musicclass.onrender.com/logout",
  },
  // host: "localhost:8080",
  // schemes: ["http"],
  host: "musicclass.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
