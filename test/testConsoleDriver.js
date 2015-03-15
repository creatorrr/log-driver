import rewire from "rewire";

import Logger from "../src/logger";
import format from "../src/drivers/format";
import filter from "../src/drivers/filter";

let
  consoleDriver = rewire("../src/drivers/console"),
  loggerName = "rorschach",
  logger = new Logger(loggerName);

export default function testConsoleDriver ({expect, ok, doesNotThrow, done}) {
  // 2 assertions total
  // expect(2);

  let
    mockConsole = {
      _last: "",
      trace: ok,
      debug: ok,
      info: ok,
      warn: ok,
      error: ok
    },

    testMessage = "the end is nigh";

  // Mock consoleDriver
  consoleDriver.__set__({ console: mockConsole });

  doesNotThrow(() => {
    // Add test stream to logger
    logger
      .pipe(filter())
      .pipe(format())
      .pipe(consoleDriver);

    // Call log function
    logger.info(testMessage);
  });

  // All tests done
  done();
}


