import findKey from "lodash/object/findKey";
import stream from "readable-stream";
import fs from "fs";
import path from "path";

import Logger from "../logger";
import { assign } from "../utils";

// A simple file driver that logs formatted rawLog to file without modifying msgs
class FileDriver extends stream.Transform {
  constructor (filePath, options={}) {
    // Init stream
    options.objectMode = true;
    super(options);

    // Create file stream
    let
      name = "file",
      filePath = path.resolve(filePath),
      file = fs.createWriteStream(filePath, { encoding: "utf8" });

    assign(this, {
      name, file,
      path: filePath
    });
  }

  _transform (msgs, encoding, callback) {
    let
      {rawLog, level, name, timestamp} = this.getCurrentEntry(),

      {levelMap} = Logger,
      levelName = findKey(levelMap, (l) => l === level),

      newline = '\n',

      // Prepare log message
      formattedMsg = [
        `[${ timestamp }]`,
        levelName,
        `(${ name })`,
        ...rawLog,
        newline
      ].join(' ');

    // Write to file
    this.file.write(formattedMsg);

    // If all goes well, push result and carry on
    this.push(msgs);
    callback();
  }
}

const fileDriver = path => new FileDriver(path);

export { FileDriver };
export default fileDriver;

