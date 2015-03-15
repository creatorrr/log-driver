// Enable tests written in ES6
require("babel/register");

// Require tests
module.exports = {
  "testLogger": require("./testLogger"),
  "testDriver": require("./testDriver"),

  "testConsoleDriver": require("./testConsoleDriver")
};
