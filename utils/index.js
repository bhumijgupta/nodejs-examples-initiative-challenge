const semver = require("semver");

const getMinSecureVersions = (allReleases) => {
  let minSecureVersions = {};
  allReleases.forEach((release) => {
    if (release.security) {
      const majorVersion = "v" + semver.major(release.version);
      const previousMinSecure = minSecureVersions[majorVersion];
      // If we have a possible minimum secure version for major release
      if (previousMinSecure) {
        // If current version is less than previous stored
        if (semver.compare(release.version, previousMinSecure.version) === -1) {
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
  return minSecureVersions;
};

const getLatestVersions = (allRelease) => {
  let latestVersions = {};
  allRelease.forEach((release) => {
    const majorVersion = "v" + semver.major(release.version);
    const previousLatestVersion = latestVersions[majorVersion];
    // If we have a possible latest version for major release
    if (previousLatestVersion) {
      // If current version is higher than previous stored
      if (
        semver.compare(release.version, previousLatestVersion.version) === 1
      ) {
        // Update the latest version
        latestVersions[majorVersion] = release;
      }
    }
    // If no previously secure version encountered
    else {
      latestVersions[majorVersion] = release;
    }
  });
};

module.exports = { getMinSecureVersions, getLatestVersions };
