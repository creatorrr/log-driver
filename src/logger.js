import stream from "stream";
import uuid from "uuid";
import invert from "lodash/object/invert";
import mapValues from "lodash/object/mapValues";
import cloneDeep from "lodash/lang/cloneDeep";

import Driver from "./driver";
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
            (_id => CLIENT_ID_CACHE = _id)(id)
          )
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

  get logger () {
    return this;
  }

  setLevel (newLevel) {
    this._level = newLevel;
    return this;
  }

  getLevel () {
    return this._level;
  }

  getCurrentEntry () {
    return cloneDeep(this._currentEntry);
  }

  log (level, ...msgs) {
    let
      timestamp = new Date(),
      {name, clientId} = this,
      entry = {
        timestamp, name, clientId, level,
        rawLog: msgs
      };

    // Set props
    this._currentEntry = entry;
    this.write(msgs);

    return this;
  }

  pipe (destination) {
    let
      bindProps = (src, dest) => {
        let destPipe = dest.pipe;

        dest.on("pipe", (src) => {
          assign(dest, {
            logger: src.logger,
            getCurrentEntry: src.getCurrentEntry.bind(src)
          });
        });

        // Continue binding props down the chain
        dest.pipe = newDest => {
          bindProps(dest, newDest);
          return destPipe.call(dest, newDest);
        };
      };

    // Bind current props
    bindProps(this, destination);

    return super.pipe(destination);
  }

  static get levelMap () {
    let map = invert(["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "SILENT"]);
    return mapValues(map, v => +v);
  }

  static createDriver (...args) {
    return new Driver(...args);
  }
}

// Add level enum to Logger
assign(Logger, Logger.levelMap);

export default Logger;

