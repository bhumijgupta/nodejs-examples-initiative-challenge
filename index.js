const express = require("express");
const hbs = require("hbs");
const routes = require("./routes");
const middlewares = require("./middlewares");

// ***************
// APP CONFIGURATION
// ***************
const app = express();
const PORT = 3000;
// Configure handlebars
app.set("view engine", hbs);
hbs.registerPartials(__dirname + "/views");

// ***************
//  ROUTES
// ***************
app.use(routes);
app.use(middlewares.errorHandler);
app.use(middlewares.nullRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
