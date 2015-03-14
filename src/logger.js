import stream from "readable-stream";
import uuid from "uuid";
import invert from "lodash/object/invert";

import { assign, isBrowser, isNode, store } from "./utils";

class Logger extends stream.PassThrough {
  constructor (name="log", options={}) {
    // Init stream
    options.objectMode = true;
    super(options);

    let
      {levelMap} = Logger,

      // Initialize client ID
      id = uuid.v4(),
      clientId = isBrowser() && store ? (
          store.get(CLIENT_LOG_ID) ||
          store.set(CLIENT_LOG_ID, id) ||
          id
        ) : null;

    // Add properties to stream obj
    assign(this, {
      name, clientId
    });

    // Add level enum to Logger
    assign(Logger, levelMap);

    // Set initial level
    this.setLevel(Logger.TRACE);

    // Add log level functions
    for (let l in levelMap)
      this[l.toLower()] = (...args) => this.log(levelMap[l], ...args);
  }

  setLevel (newLevel) {
    this._level = newLevel;
    return this;
  }

  getLevel () {
    return this._level;
  }

  log (level, msg) {
    let
      timestamp = new Date(),
      {name, clientId} = this,
      entry = {
        timestamp, name, clientId, level,
        rawLog: msg
      };

    if (this.filter(entry)) {
      this._currentEntry = entry;
      this.write(msg);
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
    return invert(["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "SILENT"]);
  }
}

export default Logger;
