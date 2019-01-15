import shortId from "shortid";

const reportStore = {};
const defaultMessage = "The developers were careless. Sorry about that.";

export default class SmartError extends Error {
  static setReportFunction(fn) {
    if (typeof fn === "function") {
      const key = shortId.generate();

      reportStore[key] = fn;

      return () => {
        delete reportStore[key];
      };
    }

    if (process.env.NODE_ENV === "development") {
      throw new TypeError(
        `Reporting only works with functions. Called with a ${typeof fn}`
      );
    }

    throw new Error(defaultMessage);
  }

  constructor(...args) {
    if (process.env.NODE_ENV === "development") {
      super(...args);
      return;
    }

    super(defaultMessage);
    const error = new Error(...args);

    Object.keys(reportStore).forEach(key => {
      try {
        const possiblePromise = reportStore[key](error);

        if (possiblePromise instanceof Promise) {
          possiblePromise.catch(() => {});
        }
      } catch (x) {}
    });
  }
}
