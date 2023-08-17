// function add(a = 1, b = 2) {
//   return a + b;
// }

// console.log(add(2, 6));
// console.log(add()); it works!
// console.log(add()); it works too!

// providing default values
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}
// greet(undefined); it works
// greet(undefined) it also works

// function multiply(a, b = a) {
//   return a * b;
// }

// console.log(multiply(2));

// Defualt parameters and rest parameters

// function sum(...numbers) {
//   return numbers.reduce((total, num) => total + num, 0);
// }

// console.log(sum(1, 2, 3, 4, 5));

// function avg(...numbers) {
//   return sum(...numbers) / numbers.length;
// }

// console.log(avg(1, 2, 3, 4, 5));
