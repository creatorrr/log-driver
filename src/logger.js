import stream from "readable-stream";
import uuid from "uuid";
import invert from "lodash/object/invert";
import mapValues from "lodash/object/mapValues";

import { assign, isBrowser, isNode, store } from "./utils";

const CLIENT_LOG_ID = "__LOG_DRIVER_CLIENT_ID__";
let CLIENT_ID_CACHE;

class Logger extends stream.PassThrough {
  constructor (name="log", options={}) {
    // Init stream
    options.objectMode = true;
    super(options);

    let
      {levelMap} = Logger,

      // Initialize client ID
      id = uuid.v4(),
      clientId = isBrowser() ? (
          store ? (
            store.get(CLIENT_LOG_ID) ||
            store.set(CLIENT_LOG_ID, id)
          ) : (
            CLIENT_ID_CACHE ||
            CLIENT_ID_CACHE = id
        ) : null;

    // Add properties to stream obj
    assign(this, {
      name, clientId
    });

    // Set initial level
    this.setLevel(Logger.TRACE);

    // Add log level functions
    for (let l in levelMap)
      this[l.toLowerCase()] = (...args) => this.log(levelMap[l], ...args);
  }

  setLevel (newLevel) {
    this._level = newLevel;
    return this;
  }

  getLevel () {
    return this._level;
  }

  log (level, ...msgs) {
    let
      timestamp = new Date(),
      {name, clientId} = this,
      entry = {
        timestamp, name, clientId, level,
        rawLog: msgs
      };

    if (this.filter(entry)) {
      this._currentEntry = entry;
      this.write(msgs);
    }

    return this;
  }

  filter ({level}) {
    return level >= this.getLevel();
  }

  pipe (dest, opts) {
    assign(dest, {
      logger: this,
      getEntry: () => this._currentEntry
    });

    return super.pipe(dest, opts);
  }

  static get levelMap () {
    let map = invert(["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "SILENT"]);
    return mapValues(map, v => +v);
  }
}

// Add level enum to Logger
assign(Logger, Logger.levelMap);

export default Logger;

