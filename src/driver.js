import Transform from "readable-stream/transform";
import isFunction from "lodash/lang/isFunction";
import isUndefined from "lodash/lang/isUndefined";

import { assign } from "./utils";

class Driver extends Transform {
  constructor (name, transformer, options={}) {
    // Init stream
    options.objectMode = true;
    super(options);

    // Make sure a transformer is available
    if (!isFunction(transformer))
      throw new Error("A transformer function is required for creating a driver");

    assign(this, {
      name, transformer
    });
  }

  _transform (chunk, enc, callback) {
    let
      {name, transformer, logger} = this,
      entry = this.getCurrentEntry(),
      result;

    // Run transformer
    try {
      result = transformer(chunk, entry, logger);
    }

    catch (e) {
      return callback(new Error(`Driver ${ name } threw error: ${ e }`));
    }

    // If all goes well, push result and carry on
    !isUndefined(result) && this.push(result);
    callback();
  }
}

export default Driver;
