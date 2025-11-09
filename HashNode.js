/**
 * Represents a node in a hash map's linked list bucket, storing a key-value pair.
 * Each node maintains a reference to the next node in the chain.
 */
export class HashNode {
  #key;
  #value;
  #nextNode;

  constructor(key, value, nextNode = null) {
    this.#key = key;
    this.#value = value;
    this.#nextNode = nextNode;
  }

  /**
   * Checks if this is the last node in the chain
   * @returns {boolean} true if there is no next node, false otherwise
   */
  #isTail() {
    return !this.#nextNode;
  }

  /**
   * Updates the value for this node
   * @param {*} value - The new value to associate with this node's key
   * @returns {void}
   */
  setValue(value) {
    this.#value = value;
  }

  /**
   * Gets the value for this node
   * @returns value
   */
  getValue() {
    return this.#value;
  }

  /**
   * Appends a node to the end of the chain
   * @param {string} key - The key to add
   * @param {*} value - The value to add
   * @returns {void}
   */
  append(key, value) {
    if (this.#isTail()) {
      this.#nextNode = new HashNode(key, value, null);
      return;
    }

    this.#nextNode.append(key, value);
  }

  /**
   * Finds the node containing the given key in the chain
   * @param {string} key - the key to find
   * @returns {HashNode|null} the node containing the key, or null if not found
   */
  find(key) {
    if (this.stores(key)) return this;
    else if (!this.#isTail()) {
      return this.#nextNode.find(key);
    } else return null;
  }

  /**
   * Checks if a node chain stores a given key (including this node)
   * @param {string} key  - the key in the chain of nodes
   * @returns {boolean} true if key-value pair appears in chain, false if not
   */
  has(key) {
    if (this.stores(key)) return true;
    if (this.#isTail()) return false;
    return this.#nextNode.has(key);
  }

  /**
   * Checks if a node stores a given key
   * @param {string} key  - the key in the node
   * @returns {boolean} true node has the key, false if not
   */
  stores(key) {
    return this.#key === key;
  }

  /**
   * Removes the node that stores the given key from the chain (including this node)
   * @param {string} key - the key in the node chain
   * @returns {HashNode} this node if this does not store key, next node if it does store key
   */
  remove(key) {
    if (this.stores(key)) return this.#nextNode;

    if (!this.#isTail()) this.#nextNode = this.#nextNode.remove(key);

    return this;
  }

  /**
   * Gets all the keys inside the node chain
   * @returns {string[]} keys
   */
  keys() {
    return this.#isTail()
      ? [this.#key]
      : [this.#key].concat(this.#nextNode.keys());
  }

  /**
   * Gets all the values inside the node chain
   * @returns {string[]} values
   */
  values() {
    return this.#isTail()
      ? [this.#value]
      : [this.#value].concat(this.#nextNode.values());
  }

  /**
   * Gets each key-value pair in the node chain.
   * (e.g. [[firstKey, firstValue], [secondKey, secondValue]])
   * @returns {[string, *][]} key-value pairs
   */
  entries() {
    return this.#isTail()
      ? [[this.#key, this.#value]]
      : [[this.#key, this.#value]].concat(this.#nextNode.entries());
  }
}
