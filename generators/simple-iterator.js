function* simpleIterator(values) {
  let index = 0;
  while (index < values.length) {
    yield values[index++];
  }
}

const values = [1, 2, 3, 4];
const iterator = simpleIterator(values);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
