import Logger from "../logger";

// A simple restore driver that restores stream back to original logs
const restoreDriver = Logger.createDriver(
    "restore",
    (_, {rawLog}) => rawLog
  );

export default restoreDriver;

