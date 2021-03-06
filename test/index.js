const tape = require("tape");
const bent = require("bent");
const getPort = require("get-port");
const fs = require("fs");
const path = require("path");
const nock = require("nock");

const server = require("../server");

const getJSON = bent("json");
const getBuffer = bent("buffer");
const sampleVersion = require("./sampleVersions.json");

// Use `nock` to prevent live calls to remote services
nock("https://nodejs.org")
  .persist()
  .get("/dist/index.json")
  .reply(200, sampleVersion);
const context = {};

tape("setup", async function (t) {
  const port = await getPort();
  context.server = server.listen(port);
  context.origin = `http://localhost:${port}`;

  t.end();
});

tape("should get dependencies", async function (t) {
  // Read package.json to get actual dependencies
  const package = fs.readFileSync(path.join(__dirname, "../package.json"));
  const { dependencies: actualDependencies } = JSON.parse(package);
  //   Get actual output
  const html = (await getBuffer(`${context.origin}/dependencies`)).toString();
  //   Check if each dependency in package.json is included
  Object.keys(actualDependencies).forEach((dependency) => {
    const version = actualDependencies[dependency];
    const dependencyIncluded = html.includes(`${dependency} - ${version}`);
    t.true(dependencyIncluded, `${dependency} included`);
  });
});

tape("should get minimum secure versions", async function (t) {
  const response = await getJSON(`${context.origin}/minimum-secure`);
  t.deepEqual(
    response["v14"],
    {
      version: "v14.4.0",
      date: "2020-06-02",
      files: [
        "aix-ppc64",
        "headers",
        "linux-arm64",
        "linux-armv7l",
        "linux-ppc64le",
        "linux-s390x",
        "linux-x64",
        "osx-x64-pkg",
        "osx-x64-tar",
        "src",
        "win-x64-7z",
        "win-x64-exe",
        "win-x64-msi",
        "win-x64-zip",
        "win-x86-7z",
        "win-x86-exe",
        "win-x86-msi",
        "win-x86-zip",
      ],
      npm: "6.14.5",
      v8: "8.1.307.31",
      uv: "1.37.0",
      zlib: "1.2.11",
      openssl: "1.1.1g",
      modules: "83",
      lts: false,
      security: true,
    },
    "v14 should match"
  );
  t.deepEqual(
    response["v13"],
    {
      version: "v13.8.0",
      date: "2020-02-05",
      files: [
        "aix-ppc64",
        "headers",
        "linux-arm64",
        "linux-armv7l",
        "linux-ppc64le",
        "linux-s390x",
        "linux-x64",
        "osx-x64-pkg",
        "osx-x64-tar",
        "src",
        "sunos-x64",
        "win-x64-7z",
        "win-x64-exe",
        "win-x64-msi",
        "win-x64-zip",
        "win-x86-7z",
        "win-x86-exe",
        "win-x86-msi",
        "win-x86-zip",
      ],
      npm: "6.13.6",
      v8: "7.9.317.25",
      uv: "1.34.1",
      zlib: "1.2.11",
      openssl: "1.1.1d",
      modules: "79",
      lts: false,
      security: true,
    },
    "v13 should match"
  );
  t.deepEqual(
    response["v12"],
    {
      version: "v12.18.0",
      date: "2020-06-02",
      files: [
        "aix-ppc64",
        "headers",
        "linux-arm64",
        "linux-armv7l",
        "linux-ppc64le",
        "linux-s390x",
        "linux-x64",
        "osx-x64-pkg",
        "osx-x64-tar",
        "src",
        "sunos-x64",
        "win-x64-7z",
        "win-x64-exe",
        "win-x64-msi",
        "win-x64-zip",
        "win-x86-7z",
        "win-x86-exe",
        "win-x86-msi",
        "win-x86-zip",
      ],
      npm: "6.14.4",
      v8: "7.8.279.23",
      uv: "1.37.0",
      zlib: "1.2.11",
      openssl: "1.1.1g",
      modules: "72",
      lts: "Erbium",
      security: true,
    },
    "v12 should match"
  );
});

tape("should get latest version", async function (t) {
  const response = await getJSON(`${context.origin}/latest-releases`);
  t.deepEqual(
    response["v14"],
    {
      version: "v14.10.1",
      date: "2020-09-10",
      files: [
        "aix-ppc64",
        "headers",
        "linux-arm64",
        "linux-armv7l",
        "linux-ppc64le",
        "linux-s390x",
        "linux-x64",
        "osx-x64-pkg",
        "osx-x64-tar",
        "src",
        "win-x64-7z",
        "win-x64-exe",
        "win-x64-msi",
        "win-x64-zip",
        "win-x86-7z",
        "win-x86-exe",
        "win-x86-msi",
        "win-x86-zip",
      ],
      npm: "6.14.8",
      v8: "8.4.371.19",
      uv: "1.39.0",
      zlib: "1.2.11",
      openssl: "1.1.1g",
      modules: "83",
      lts: false,
      security: false,
    },
    "v14 should match"
  );
  t.deepEqual(
    response["v13"],
    {
      version: "v13.14.0",
      date: "2020-04-29",
      files: [
        "aix-ppc64",
        "headers",
        "linux-arm64",
        "linux-armv7l",
        "linux-ppc64le",
        "linux-s390x",
        "linux-x64",
        "osx-x64-pkg",
        "osx-x64-tar",
        "src",
        "sunos-x64",
        "win-x64-7z",
        "win-x64-exe",
        "win-x64-msi",
        "win-x64-zip",
        "win-x86-7z",
        "win-x86-exe",
        "win-x86-msi",
        "win-x86-zip",
      ],
      npm: "6.14.4",
      v8: "7.9.317.25",
      uv: "1.37.0",
      zlib: "1.2.11",
      openssl: "1.1.1g",
      modules: "79",
      lts: false,
      security: false,
    },
    "v13 should match"
  );
  t.deepEqual(
    response["v12"],
    {
      version: "v12.18.3",
      date: "2020-07-22",
      files: [
        "aix-ppc64",
        "headers",
        "linux-arm64",
        "linux-armv7l",
        "linux-ppc64le",
        "linux-s390x",
        "linux-x64",
        "osx-x64-pkg",
        "osx-x64-tar",
        "src",
        "sunos-x64",
        "win-x64-7z",
        "win-x64-exe",
        "win-x64-msi",
        "win-x64-zip",
        "win-x86-7z",
        "win-x86-exe",
        "win-x86-msi",
        "win-x86-zip",
      ],
      npm: "6.14.6",
      v8: "7.8.279.23",
      uv: "1.38.0",
      zlib: "1.2.11",
      openssl: "1.1.1g",
      modules: "72",
      lts: "Erbium",
      security: false,
    },
    "v12 should match"
  );
});

tape("should fail with 404", async function (t) {
  let errorResponse;
  try {
    const request = bent(`${context.origin}/non-existing-route`);
    await request();
    console.log(rep);
  } catch (err) {
    errorResponse = await err.json();
  } finally {
    t.true(errorResponse, "error should be caught");
    t.equal(errorResponse.statusCode, 404, "404 status present");
    t.equal(
      errorResponse.message,
      "GET - /non-existing-route route not found",
      "contains message and request route"
    );
  }
});

tape("teardown", function (t) {
  context.server.close();
  t.end();
});
