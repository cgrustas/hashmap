import { HashMap } from "./HashMap.js";

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());

test.set("jacket", "orange");
test.set("kite", "red");
test.set("lion", "white");

console.log(test.length());

test.set("moon", "silver");

console.log(test.length()); // Should be double

test.set("a;sldfjk", "a;sldkjf");

console.log(test.length()); // Should be double
