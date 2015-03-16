import { logger, Logger } from "../";
import { assign } from "../utils";

import filter from "./filter";
import format from "./format";
import console from "./console";
import restore from "./restore";
import remote from "./remote";
import file from "./file";
import localStorage from "./localStorage";

// Add drivers
assign(Logger.drivers, {
  filter, format, console, restore, remote, file, localStorage
});

export {
  logger, Logger
};

export default logger;

