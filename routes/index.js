const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const bent = require("bent");
const semver = require("semver");
const getJSON = bent("json");

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

router.get("/minimum-secure", async (req, res) => {
  try {
    // get all releases
    const allRelease = await getJSON("https://nodejs.org/dist/index.json");
    let minSecureVersions = {};
    allRelease.forEach((release) => {
      if (release.security) {
        const majorVersion = "v" + semver.major(release.version);
        const previousMinSecure = minSecureVersions[majorVersion];
        // If we have a possible minimum secure version for major release
        if (previousMinSecure) {
          // If current version is less than previous stored
          if (
            semver.compare(release.version, previousMinSecure.version) === -1
          ) {
            // Update the minimum secure version
            minSecureVersions[majorVersion] = release;
          }
        }
        // If no previously secure version encountered
        else {
          minSecureVersions[majorVersion] = release;
        }
      }
    });
    res.json(minSecureVersions);
  } catch (err) {
    res.status(500).json({ statusCode: 500, body: err });
  }
});

module.exports = router;
