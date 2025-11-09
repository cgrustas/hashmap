import { HashNode } from "./HashNode.js";

/**
 * Represents a linked list designed for hash map buckets, storing key-value pairs in each node.
 * Handles hash map collisions with operations for setting, getting, and removing nodes by key.
 */
export class HashLinkedList {
  #head;

  constructor() {
    this.#head = null;
  }

  /**
   * Checks if this list is empty
   * @returns {boolean} true if empty, false otherwise
   */
  #isEmpty() {
    return !this.#head;
  }

  /**
   * Adds a new hash node containing the given key-value pair to the end of the list
   * @param {string} key - The key to add
   * @param {*} value - The value to add
   * @returns {void}
   */
  append(key, value) {
    this.#isEmpty()
      ? (this.#head = new HashNode(key, value, null))
      : this.#head.append(key, value);
  }

  /**
   * Finds the node containing the given key in the list
   * @param {string} key - the key to find
   * @returns {HashNode|null} the node containing the key, or null if not found
   */
  find(key) {
    return this.#isEmpty() ? null : this.#head.find(key);
  }

  /**
   * Sets a key-value pair in the list, updating the value if the key exists
   * @param {string} key - The key to set
   * @param {*} value - The value to associate with the key
   * @returns {boolean} true if key already exists, false if key is added
   */
  set(key, value) {
    const node = this.find(key);
    if (node) {
      node.setValue(value);
      return true;
    } else {
      this.append(key, value);
      return false;
    }
  }

  /**
   * Checks if a linked list stores a node with with the given key
   * @param {string} key  - the key in the linked list
   * @returns {boolean} true if key-value pair appears in list, false if not
   */
  has(key) {
    return this.#isEmpty() ? false : this.#head.has(key);
  }

  /**
   * Removes the node that stores the given key from the list
   * @param {string} key - the key in the list
   * @returns {boolean} true if removal was successful, false if key was not in list
   */
  remove(key) {
    if (this.#isEmpty()) return false;

    const originalHead = this.#head;
    this.#head = this.#head.remove(key);

    // If head changes value, we removed something
    return originalHead !== this.#head || this.#head === null;
  }

  /**
   * Gets all the keys inside the list
   * @returns {string[]} keys, or empty array if list is empty
   */
  keys() {
    return this.#isEmpty() ? [] : this.#head.keys();
  }

  /**
   * Gets all the values inside the list
   * @returns {string[]} values, or empty array if list is empty
   */
  values() {
    return this.#isEmpty() ? [] : this.#head.values();
  }

  /**
   * Gets each key-value pair in the list.
   * (e.g. [[firstKey, firstValue], [secondKey, secondValue]])
   * @returns {[string, *][]} key-value pairs
   */
  entries() {
    return this.#isEmpty() ? [] : this.#head.entries();
  }
}
