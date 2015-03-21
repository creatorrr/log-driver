import Logger from "./logger";
import filter from "./drivers/filter";
import format from "./drivers/format";
import console from "./drivers/console";
import restore from "./drivers/restore";
import { assign } from "../utils";

let logger = new Logger;

// Set up default drivers
logger
  .pipe(filter())
  .pipe(format())
  .pipe(console)
  .pipe(restore);

// Add basic drivers
assign(Logger.drivers, {
  filter, format, console, restore
});

export {
  logger, Logger
};

export default logger;
