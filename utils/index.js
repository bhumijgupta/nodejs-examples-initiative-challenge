const semver = require("semver");

/**
 * Returns the minimum secure version for each major release
 * @param {Array} allReleases Array of releases
 */
const getMinSecureVersions = (allReleases) => {
  let minSecureVersions = {};
  allReleases.forEach((release) => {
    if (release.security) {
      const majorVersion = "v" + semver.major(release.version);
      const previousMinSecure = minSecureVersions[majorVersion];
      // If we have a possible minimum secure version for major release
      if (previousMinSecure) {
        // If current version is greater than previous stored
        if (semver.compare(release.version, previousMinSecure.version) === 1) {
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

/**
 * Returns the latest version for each major release
 * @param {Array} allRelease Array of releases
 */
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
  return latestVersions;
};

module.exports = { getMinSecureVersions, getLatestVersions };
