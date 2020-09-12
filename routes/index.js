const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/dependencies", (req, res) => {
  const pathToPackage = path.join(__dirname, "..", "package.json");
  fs.readFile(pathToPackage, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      const { dependencies } = JSON.parse(data);
      res.render("dependencies.hbs", { dependencies });
    }
  });
});

module.exports = router;
