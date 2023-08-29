import fs from "fs";
import async from "async";
// fs.readFile("input.txt", (error, data) => {
//   if (error) {
//     console.error("Error reading file", error);
//   } else {
//     const returnedData = data.toString().toUpperCase();
//     fs.writeFile("output.txt", returnedData, (error) => {
//       if (error) {
//         console.error("Error writing file", error);
//       } else {
//         console.log("Data process success.");
//       }
//     });
//   }
// });

async.waterfall(
  [
    function readFile(fn) {
      fs.readFile("input.txt", "utf8", (error, data) => {
        if (error) {
          fn(error);
        } else {
          fn(null, data);
        }
      });
    },
    function processData(data, fn) {
      const processedData = data.toUpperCase();
      fn(null, processedData);
    },

    function writeData(processedData, fn) {
      fs.writeFile("output.txt", processedData, (error) => {
        if (error) {
          fn(error);
        } else {
          fn(null);
        }
      });
    },
  ],
  function (error) {
    if (error) {
      console.error("Error", error);
    } else {
      console.log("Data processed and written succ.");
    }
  }
);
