# HashMap

I built my own implementation of HashMaps using JavaScript. To handle collisions, I implemented a specialized HashLinkedList and HashNode for optimal insertion and deletion of key-value pairs. When multiple keys hash to the same index (bucket) in the hash table, a linked list at that index stores all the key-value pairs that have collided. Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

Skills Learned:

- Favoring composition over inheritance (creating a new HashLinkedList/HashNode rather than extend my
  LinkedList/Node classes from my 'Linked List' project)
- Delegating concerns to nested classes to maintain encapsulation, generally refusing to access fields of fields
- Optimizing for performance (storing a size variable in hash map and
  incrementing/decrementing the hashmap size in set/remove methods, so I didn't have to traverse the list for my length and clear methods)
- Learned why Linked Lists were an effective data structure to minimize collision in hash buckets
- Gained an intuitive understanding of linked lists and hash maps by working under the hood and rebuilding them from scratch
- Learned effective hashing strategies.

# HashMap

A custom HashMap built from scratch in JavaScript, with dynamic resizing and collision handling. I filled my hash map buckets with custom HashLinkedList/HashNode classes for for efficient insertion/deletion of key-value pairs.

## Skills Demonstrated

- **Composition over inheritance**: Created purpose-built HashLinkedList and HashNode classes rather than extending my existing LinkedList/Node implementations
- **Encapsulation**: Used private fields throughout and delegated operations to appropriate classes, avoiding direct field access across class boundaries whenever possible

### Data Structure Expertise

- **Understanding trade-offs**: Recognized why linked lists excel at collision resolution in hash tables (O(1) insertion, deletion, dynamic re-sizing)
- **Implementation from scratch**: Built both the hash table and its underlying linked list structures without relying on built-in collections
- **Efficient hashing design**: Implemented a hash function that distributes keys evenly while avoiding integer overflow for long strings

### Performance Optimization

- **Cached size tracking**: Maintained a size counter in HashMap, incrementing/decrementing on operations rather than traversing all buckets for `length()` calls
- **Smart resizing**: Doubled capacity when load factor exceeded to maintain O(1) time complexity

## Lessons Learned

This project deepened my understanding of how hash maps work under the hood. I gained an intuitive knowledge of their performance characteristics, and why certain design choices (like using linked lists for buckets) make sense. Moving forward, project will help me understand how (and when) to use hash maps in my code.
