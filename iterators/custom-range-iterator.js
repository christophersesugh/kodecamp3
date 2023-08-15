function rangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      } else {
        return { done: true };
      }
    },
  };
}

const iterator = rangeIterator(23, 25);

// console.log(iterator.next());
console.log(iterator.next().value);
console.log(iterator.next().done);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
