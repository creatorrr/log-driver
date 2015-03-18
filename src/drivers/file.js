import Transform from "readable-stream/transform";
import fs from "fs";
import path from "path";

import Logger from "../logger";
import { assign } from "../utils";

// A simple file driver that logs formatted msgs to file without modifying msgs
class FileDriver extends Transform {
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

  _transform (msg, encoding, callback) {
    let
      newline = '\n';

    // Write to file
    this.file.write(msg + newline);

    // If all goes well, push result and carry on
    this.push(msg);
    callback();
  }
}

const fileDriver = path => new FileDriver(path);

export { FileDriver };
export default fileDriver;

