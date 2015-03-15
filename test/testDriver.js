import through2 from "through2";

import Logger from "../src/logger";
import Driver from "../src/driver";

let
  loggerName = "rorschach",
  {createDriver} = Logger,
  logger = new Logger(loggerName);

export default function testDriver ({expect, doesNotThrow, equal, done}) {
  // 2 assertions total
  expect(2);

  let
    driver = createDriver("test", (msgs, {name}) => `${ name } says ${ msgs+'' }`),

    testMessage = "the end is nigh",
    testStream = through2.obj(function (chunk, enc, callback) {
      // Check if chunk matches processed message
      equal(chunk, `${ loggerName } says ${ testMessage }`, "message not processed correctly");

      // All tests done
      done();
    });

  doesNotThrow(() => {
    // Add test stream to logger
    logger
      .pipe(driver)
      .pipe(testStream);

    // Call log function
    logger.info(testMessage);
  });
}

