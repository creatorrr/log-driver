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
  };

