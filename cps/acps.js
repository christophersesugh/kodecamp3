function addAsync(a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 2000);
}

console.log("before");
addAsync(1, 2, function (result) {
  console.log("Result " + result);
});
console.log("after");
