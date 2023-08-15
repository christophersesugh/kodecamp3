function* numC() {
  let count = 1;
  while (true) {
    yield count;
    count++;
  }
}

const counter = numC();
console.log(counter.next());
