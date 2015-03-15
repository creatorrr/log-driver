import findKey from "lodash/object/findKey";

import Logger from "../logger";

// A simple console driver that logs formatted msgs without modifying msgs
const consoleDriver = Logger.createDriver("console", (msg, {level}) => {
  let
    {levelMap} = Logger,
    levelName = findKey(levelMap, (l) => l === level),
    type = levelName.toLowerCase();

  // Log to console
  (typeof console !== "undefined") &&
    console[type](msg);

  // Forward log messages as is
  return msg;
});

export default consoleDriver;
