function add(a, b, callback) {
  callback(a + b);
}

console.log("a");
add(2, 7, function disR(result) {
  console.log(result * 2);
});
console.log("done!");
