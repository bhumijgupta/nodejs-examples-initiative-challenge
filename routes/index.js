const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const bent = require("bent");
const getJSON = bent("json");
const { getMinSecureVersions, getLatestVersions } = require("../utils");

/** Get all dependencies from the `package.json` and render HTML page*/
router.get("/dependencies", (req, res) => {
  const pathToPackage = path.join(__dirname, "..", "package.json");
  fs.readFile(pathToPackage, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ statusCode: 500, message: err });
    } else {
      const { dependencies } = JSON.parse(data);
      res.render("dependencies.hbs", { dependencies });
    }
  });
});

/** Get the minimum secure version for each release line */
router.get("/minimum-secure", async (req, res) => {
  try {
    // get all releases
    const allReleases = await getJSON("https://nodejs.org/dist/index.json");
    const minSecureVersions = getMinSecureVersions(allReleases);
    res.json(minSecureVersions);
  } catch (err) {
    res.status(500).json({ statusCode: 500, body: err });
  }
});

/** Get the latest version for each release line */
router.get("/latest-releases", async (req, res) => {
  try {
    // get all releases
    const allRelease = await getJSON("https://nodejs.org/dist/index.json");
    const latestVersions = getLatestVersions(allRelease);
    res.json(latestVersions);
  } catch (err) {
    res.status(500).json({ statusCode: 500, body: err });
  }
});

module.exports = router;
