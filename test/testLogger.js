import Logger from "../src/logger";
import through2 from "through2";

let
  loggerName = "rorschach",
  {INFO} = Logger,
  logger = new Logger(loggerName);

export default function testLogger ({expect, doesNotThrow, deepEqual, equal, ok, done}) {
  // 8 assertions total
  expect(8);

  let
    testMessage = "the end is nigh",
    testStream = through2.obj(function (chunk, enc, callback) {
      let
        {name,level,rawLog} = this.getEntry(),
        msg = chunk.join('');

      // Check this.logger
      ok(
        (this.logger instanceof Logger),
        "logger not available"
      );

      equal(this.logger, logger, "wrong logger");

      // Check if all props passed correctly
      equal(name, loggerName, "logger name not passed correctly");
      equal(level, INFO, "incorrect current level");
      deepEqual(chunk, rawLog, "unprocessed chunk not equal to rawLog");

      // Compare test message to received message
      equal(msg, testMessage, "testMessage not passed correctly");

      // Push sisyphus, push.
      doesNotThrow(() => this.push(chunk));

      // All tests done
      done();
    });

  doesNotThrow(() => {
    // Add test stream to logger
    logger.pipe(testStream);

    // Call log function
    logger.info(testMessage);
  });
}

