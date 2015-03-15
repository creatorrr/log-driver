import fs from "fs";
import mockFs from "mock-fs";

import Logger from "../src/logger";
import format from "../src/drivers/format";
import fileDriver from "../src/drivers/file";

let
  loggerName = "rorschach",
  logger = new Logger(loggerName);

export default function testConsoleDriver ({expect, ok, doesNotThrow, done}) {
  // 3 assertions total
  expect(3);

  let
    filePath = "./rorschach-journal",
    testMessage = "the end is nigh";

  // Create a mock in-memory filesystem for the session
  mockFs();

  doesNotThrow(() => {
    // Add test stream to logger
    logger
      .pipe(format(void 0, false))
      .pipe(fileDriver(filePath));

    ok(fs.existsSync(filePath), "file not being created properly");

    // Call log function
    logger.info(testMessage);

    ok(fs.readFileSync(filePath), "log file empty");
  });

  // All tests done
  mockFs.restore();
  done();
}



