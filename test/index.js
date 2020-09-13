const tape = require("tape");
const bent = require("bent");
const getPort = require("get-port");
const fs = require("fs");
const path = require("path");

const server = require("../server");

const getJSON = bent("json");
const getBuffer = bent("buffer");

// Use `nock` to prevent live calls to remote services

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

// more tests

tape("teardown", function (t) {
  context.server.close();
  t.end();
});
