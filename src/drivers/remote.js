import PassThrough from "readable-stream/passthrough";

import Logger from "../logger";
import { assign, batch, request } from "../utils";

// A simple localStorage driver that stores logs in localstorage
const
  remoteDriver = (httpOpts={}, batchLength=50) => {
    // Prepare http options
    httpOpts = assign({
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    }, httpOpts);

    let
      passthrough = new PassThrough({objectMode: true}),
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
