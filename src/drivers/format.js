import findKey from "lodash/object/findKey";
import template from "lodash/string/template"
import colors from "colors";

import Logger from "../logger";
import { assign } from "../utils";

const
  {stripColors, setTheme} = colors,
  themes = {
    trace: "green",
    debug: "grey",
    info: "blue",
    warn: "yellow",
    error: "red"
  },

  defaultFormat = [
      "[${ timestamp.grey }]",
      "${ level.bold.levelColor.bgBlack }",
      "${ logger.underline }",
      "${ message.levelColor }"
    ].join(' '),

  // A simple format driver that accepts lodash templates to format log messages
  formatDriver = (format=defaultFormat, enableColors=true) => Logger.createDriver("format",
    (msgs, {level, name, timestamp}) => {
      let
        {levelMap} = Logger,
        levelName = findKey(levelMap, (l) => l === level),
        type = levelName.toLowerCase(),
        levelColor = themes[type],

        params = {
          timestamp: timestamp+'',
          level: levelName,
          logger: name,
          message: msgs.join(' ')
        },

        formattedMsg;

      // Set color themes
      setTheme(assign({ levelColor }, themes));

      // Format message
      formattedMsg = template(format)(params);

      // Forward formatted messages
      return (
        enableColors ? formattedMsg : stripColors(formattedMsg)
      );
    });

export default formatDriver;

