// const CI = {
//   data: [2, 5, 8],
//   [Symbol.iterator]() {
//     let index = 0;
//     return {
//       next: () => {
//         if (index < this.data.length) {
//           return { value: this.data[index++], done: false };
//         } else {
//           return { done: true };
//         }
//       },
//     };
//   },
// };

// for (const item of CI) {
//   console.log(item);
// }

const si = {
  data: [1, 2, 3],
  index: 0,
  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    } else {
      return { value: undefined, done: true };
    }
  },
};

console.log(si.next());
console.log(si.next());
console.log(si.next());
console.log(si.next());
console.log(si.next());
