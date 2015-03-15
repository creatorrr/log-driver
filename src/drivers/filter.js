import Logger from "../logger";

// A simple filter driver that filters stream by predicate
const
  defaultPredicate = (_, {level}, logger) => level >= logger.getLevel(),
  filterDriver = (predicate=defaultPredicate) => Logger.createDriver(
    "filter",
    (msg, entry, logger) => predicate(msg, entry, logger) ? msg : void 0
  );

export default filterDriver;

