/**
 * Represents a hash map.
 */
export class HashMap {
  #loadFactor;
  #capacity;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
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
}
