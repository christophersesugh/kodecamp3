const fs = require("fs");
// const prom = new Promise((resolve, reject)=>{
//     if(/*code eval to true*/) {
//         resolve(result)
//     } else {
//         reject(result)
//     }
// })

// prom.then((result)=>console.log(result)).catch((error)=>console.log(error))

// function readFileP(filename) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, "utf8", (error, data) => {
//       if (error) {
//         reject(error);
//         return;
//       }
//       resolve(data);
//     });
//   });
// }

// readFileP("test.txt")
//   .then((data) => {
//     console.log(`File content: ${data}`);
//   })
//   .catch((error) => console.log(error));

// async function someFunc() {
//   try {
//     const result = await fetch("./..////");
//   } catch (error) {
//     console.log(error);
//   }
// }
