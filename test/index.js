// Enable tests written in ES6
require("babel/register");

// Require tests
module.exports = {
  "testDummy": require("./testDummy")
};
