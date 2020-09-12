const express = require("express");
const hbs = require("hbs");
const routes = require("./routes");
const app = express();
const PORT = 3000;

app.set("view engine", hbs);
hbs.registerPartials(__dirname + "/views");

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
