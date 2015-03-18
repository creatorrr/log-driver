import fs from "fs";
import rewire from "rewire";

import Logger from "../src/logger";

let
  remoteDriver = rewire("../src/drivers/remote"),
  loggerName = "rorschach",
  logger = new Logger(loggerName);

export default function testRemoteDriver ({expect, ok, deepEqual, doesNotThrow, done}) {
  // 2 assertions total
  expect(2);

  let
    testMessage = "the end is nigh",

    // Create mock request function
    request = ({body}) => {
      // Test batched response
      deepEqual(body, [testMessage], "value not passed correctly");

      // All tests done
      done();
    };

  // Add mock handler to tested module
  remoteDriver.__set__({ request });

  doesNotThrow(() => {
    // Add test stream to logger; batched by 1 value
    logger
      .pipe(remoteDriver({}, 1));

    // Call log function
    logger.info(testMessage);
  });
}

