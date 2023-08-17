// function declaration

// function func(name) {
//   console.log(name);
// }

// function expression

// let func = function (name) {
//   console.log(name);
// };

// const funct = (name) => {
//   console.log(name);
// };

// const add = (a, b) => a + b;

// const add = (a, b) => {
//   return a + b;
// };

// const person = {
//   name: "kodecamp",
//   greet: function () {
//     console.log(`Hello, I am learning to code at ${this.name}`);
//   },
//   greetA: () => {
//     console.log(`Hello, I am learning to code at ${this.name}`);
//   },
// };

// person.greet();
// person.greetA();

function regF() {
  console.log(arguments[0]);
}

const arrF = () => {
  console.log(arguments[0]);
};

regF(1);
arrF(1);
