// Enable tests written in ES6
require("babel/register");

// Require tests
module.exports = {
  "testLogger": require("./testLogger"),
  "testDriver": require("./testDriver"),

  "testConsoleDriver": require("./testConsoleDriver"),
  "testLocalStorageDriver": require("./testLocalStorageDriver"),
  "testRemoteDriver": require("./testRemoteDriver"),
  "testFileDriver": require("./testFileDriver")
};
