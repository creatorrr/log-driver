import findKey from "lodash/object/findKey";
import localStorage from "localStorage";

// Create an in-memory localStorage if window.localStorage unavailable
global.localStorage = localStorage;
import store from "store";

import Logger from "../logger";
import { assign } from "../utils";

// A simple localStorage driver that stores logs in localstorage
const
  DEFAULT_LOG_KEY = "__LOG_DRIVER_KEY__",
  localStorageDriver = (key=DEFAULT_LOG_KEY, store=store) =>
    Logger.createDriver("localstorage", (msgs, {level, name, timestamp}) => {
      let
        {levelMap} = Logger,
        levelName = findKey(levelMap, (l) => l === level),
        type = levelName.toLowerCase(),

        // Prepare log message
        packet = {
          timestamp,
          level: type,
          logger: name,
          message: msgs.join(' ')
        };

      // Append to localStorage
      store.enabled &&
      store.set(key,
        store.get(key) ?
        store.get(key).concat([packet]) :
        [packet]
      );

      // Forward log messages as is
      return msgs;
    });

assign(localStorageDriver, {
  DEFAULT_LOG_KEY
});

export default localStorageDriver;

