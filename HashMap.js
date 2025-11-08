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
}
