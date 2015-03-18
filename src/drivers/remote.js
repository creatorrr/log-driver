import PassThrough from "readable-stream/passthrough";
import request from "request";
import defaults from "lodash/object/defaults";

import Logger from "../logger";
import { assign, batch } from "../utils";

// A simple localStorage driver that stores logs in localstorage
const
  remoteDriver = (httpOpts={}, batchLength=50) => {
    // Prepare http options
    httpOpts = defaults(httpOpts, {
      method: "post",
      json: true
    });

    let
      passthrough = new PassThrough({objectMode: true}),
      // batcher = _(passthrough).batch(batchLength);
      batcher = batch(passthrough, batchLength);

    // Start event loop for sending logs
    batcher.on("data", body => {
      let params = assign({ body }, httpOpts);

      // Send off request
      request(params);
    });

    return batcher;
  };

export default remoteDriver;
