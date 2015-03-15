import findKey from "lodash/object/findKey";
import colors from "colors";

import Logger from "../logger";

// Set color themes
colors.setTheme({
  trace: "green",
  debug: "grey",
  info: "black",
  warn: "yellow",
  error: "red"
});

const consoleDriver = Logger.createDriver("console", (msgs, {level, name, timestamp}) => {
  let
    {levelMap} = Logger,
    levelName = findKey(levelMap, (l) => l === level),
    type = levelName.toLowerCase(),

    // Prepare log message
    color = colors[type],
    formattedMsgs = [
      colors.grey(`[${ timestamp }]`),
      color.bold(levelName),
      color.underline(`(${ name })`),
      ...(type === "error" ? msgs.map(color) : msgs)
    ];

  // Log to console
  (typeof console !== "undefined") &&
    console[type](...formattedMsgs);

  // Forward log messages as is
  return msgs;
});

export default consoleDriver;
