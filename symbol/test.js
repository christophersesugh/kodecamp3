// let sym = Symbol.for("name");
// console.log(sym.valueOf());
// console.log(sym.toString());

// METHODS
// for
// keyFor
// toSource
// toString
// valueOf

//PROPERTIES
//asyncIterator
//hasInstance
//iterator
//isConcatSpreadable
//match
//search
//replaceAll
//replace
// split
//species
//description
//toStringTag
//toPrimitive
// const x = Symbol("x");
// console.log(x.description);

// const strArr = ["a", "b", "c"];
// const numArr = [1, 2, 3];
// numArr[Symbol.isConcatSpreadable] = false;
// console.log(strArr.concat(numArr));
const num = [6, 7, 3];
function checkNum(nums) {
  return nums.some((num) => num * 2 === nums[0]);
}
console.log(checkNum(num));
