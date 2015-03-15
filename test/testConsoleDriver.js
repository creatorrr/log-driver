import testConsole from "test-console";

import Logger from "../src/logger";
import format from "../src/drivers/format";
import consoleDriver from "../src/drivers/console";

let
  loggerName = "rorschach",
  logger = new Logger(loggerName);

export default function testConsoleDriver ({expect, ok, doesNotThrow, done}) {
  // 2 assertions total
  expect(2);

  let
    testMessage = "the end is nigh";

  doesNotThrow(() => {
    // Add test stream to logger
    logger
      .pipe(format())
      .pipe(consoleDriver);

    // Call log function
    testConsole.stdout.inspectSync(output => {
      logger.info(testMessage);
      ok(output, "console driver not logging to output");
    });
  });

  // All tests done
  done();
}


