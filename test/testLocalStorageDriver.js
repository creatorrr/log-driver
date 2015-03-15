import Logger from "../src/logger";
import localStorageDriver from "../src/drivers/localStorage";

let
  loggerName = "rorschach",
  logger = new Logger(loggerName);

export default function testLocalStorageDriver ({expect, ok, doesNotThrow, done}) {
  // 1 assertion total
  expect(1);

  let
    key="dr. manhattan",
    testMessage = "the end is nigh",

    // Mock store instance
    store = {
      data: {},
      enabled: true,
      get: key => store.data[key],
      set: (key, value) => {
        // The value was passed correctly
        ok(value, "store empty");

        return store.data[key] = value;
      }
    };

  doesNotThrow(() => {
    // Add test stream to logger
    logger
      .pipe(localStorageDriver(key, store));

    // Call log function
    logger.info(testMessage);
  });

  // All tests done
  done();
}

