export class LocalHostService {
  constructor() {}

  /**
   * Check if key exists in local storage
   * @param  string key
   * @return boolean
   */
  localStorageHas(key) {
    if(!process.browser) return

    var item = localStorage.getItem(key);

    return item !== null;
  }

  /**
   * Retrive an object from local storage.
   * @param  string key
   * @return mixed
   */
  localStorageGet(key) {
    if(!process.browser) return

    var item = localStorage.getItem(key);

    if (!item) return;

    if (item[0] === "{" || item[0] === "[") return JSON.parse(item);

    return item;
  }

  /**
   * Save some value to local storage.
   * @param string key
   * @param string value
   */
  localStorageSave(key, value) {
    if(!process.browser) return

    if (value === undefined) $.error("Can't store undefinded value");

    if (typeof value === "object" || typeof value === "array") {
      value = JSON.stringify(value);
    }

    if (typeof value !== "string")
      $.error("Can't store unrecognized format value");

    localStorage.setItem(key, value);
  }

  /**
   * Remove element from local storage.
   * @param string key
   */
  localStorageRemove(key) {
    if(!process.browser) return

    localStorage.removeItem(key);
  }
}
