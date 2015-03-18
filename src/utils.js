import PassThrough from "readable-stream/passthrough";

// Utils
export const
  {assign} = Object,
  isNode = () => !!( typeof module !== 'undefined' && module.exports ),
  isBrowser = () => !!( !isNode() && typeof window !== 'undefined' ),

  localStorage = typeof window !== 'undefined' && window.localStorage,
  store = localStorage && {
    enabled: !!localStorage,
    get: key => JSON.parse(localStorage.getItem(key)),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)) || value
  },

  uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let
      r = (Math.random() * 16 | 0),
      v = c === 'x' ? r : (r & 0x3|0x8);

    return v.toString(16);
  }),

  batch = (stream, batchLength) => {
    let
      batchedStream = new PassThrough({objectMode: true}),
      buffer = [];

    stream.on("data", packet => {
      buffer.push(packet);

      if (!(buffer.length % batchLength)) {
        batchedStream.write(buffer);
        buffer = [];
      }
    });

    return batchedStream;
  },

  request = ({method, url, body, headers, callback}) => {
    if (isNode()) {
      let
        http = require("http"),
        {parse} = require("url"),
        opts = assign(parse(url), {
          method: method.toUpperCase(),
          headers
        })
        req = http.request(opts, callback);

      req.write(body);
      req.end();

      return req;
    }

    else {
      let
        req = typeof XMLHttpRequest !== "undefined" ?
          new  XMLHttpRequest :
          new ActiveXObject("MSXML2.XMLHTTP.3.0");

      req.onreadystatechange = callback;

      req.open(method.toUpperCase(), url, true);
      for (let header in keys(headers))
        req.setRequestHeader(header, headers[header]);

      req.send(body);
      return req;
    }
  };
