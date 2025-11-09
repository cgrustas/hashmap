import { HashLinkedList } from "./HashLinkedList.js";

/**
 * Represents a hash map. This implementation handles key-value pairs of type string.
 */
export class HashMap {
  #loadFactor;
  #capacity;
  #buckets;
  #size;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#buckets = new Array(capacity);
    this.#size = 0;
  }

  /**
   * Takes a key and produces a hash code
   * @param {string} key - key to be hashed
   * @returns {number} hash code
   */
  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  /**
   * Checks if the bucket for the corresponding hash code is empty
   * @param {number} hashCode - the index in the hash map array
   * @returns {boolean} true if bucket contains nodes, false otherwise
   */
  #bucketIsEmpty(hashCode) {
    return !this.#buckets[hashCode];
  }

  /**
   * Adds a key-value pair to the hash map
   * If a key already exists, it updates the key's value by overriding the old value
   * @param {string} key - identifier for a piece of data
   * @param {string} value - data assigned to the key
   * @returns {void}
   */
  set(key, value) {
    if (this.#size >= this.#capacity * this.#loadFactor) {
      const entries = this.entries();
      this.#size = 0;
      this.#capacity *= 2;

      this.#buckets = new Array(this.#capacity);

      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }

    const hashCode = this.#hash(key);
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#bucketIsEmpty(hashCode)) {
      this.#buckets[hashCode] = new HashLinkedList();
    }

    const keyAlreadyExists = this.#buckets[hashCode].set(key, value);
    if (!keyAlreadyExists) this.#size += 1;
  }

  /**
   * Returns the value assigned to the given key
   * @param {string} key - the key in the hash map
   * @returns {*|null} value in the key-value pair, or null if key is not found
   */
  get(key) {
    const hashCode = this.#hash(key);
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#bucketIsEmpty(hashCode)) return null;

    const node = this.#buckets[hashCode].find(key);
    return node ? node.getValue() : null;
  }

  /**
   * Checks if key is in the hash map
   * @param {string} key  - the key in the hash map
   * @returns {boolean} true if key-value pair appears in hash map, false if not
   */
  has(key) {
    const hashCode = this.#hash(key);
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#bucketIsEmpty(hashCode)) return false;
    return this.#buckets[hashCode].has(key);
  }

  /**
   * Removes the node that stores the given key from the hash map
   * @param {string} key - the key in the hash map
   * @returns {boolean} true if removal was successful, false if key was not in hash map
   */
  remove(key) {
    const hashCode = this.#hash(key);
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.#bucketIsEmpty(hashCode)) return false;

    const removalIsSuccessful = this.#buckets[hashCode].remove(key);
    if (removalIsSuccessful) this.#size -= 1;

    return removalIsSuccessful;
  }

  /**
   * Gets the number of stored keys in the hash map
   * @returns {number} number of stored keys
   */
  length() {
    return this.#size;
  }

  /**
   * Removes all entries in the hash map
   * @returns {void}
   */
  clear() {
    this.#buckets = new Array(this.#capacity);
    this.#size = 0;
  }

  /**
   * Gets all the keys inside the hash map
   * @returns {string[]} keys
   */
  keys() {
    const keys = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        keys.push(...bucket.keys());
      }
    });
    return keys;
  }

  /**
   * Gets all the values inside the hash map
   * @returns {*[]} values
   */
  values() {
    const values = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        values.push(...bucket.values());
      }
    });
    return values;
  }

  /**
   * Gets each key-value pair in the hash map.
   * (e.g. [[firstKey, firstValue], [secondKey, secondValue]])
   * @returns {[string, *][]} key-value pairs
   */
  entries() {
    const entries = [];
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        entries.push(...bucket.entries());
      }
    });
    return entries;
  }
}
