const { log } = require("console");
const fs = require("fs");
// fs.readFile(filename, [options], callback)

// fs.readFile(filename, "utf8", function (error, data) {
//   if (error) {
//     handleError(error);
//     throw error
//   } else {
//     processData(data);
//   }
// });

function readJson(filename, callback) {
  fs.readFile(filename, "utf-8", function (error, data) {
    let parsed;
    if (error) {
      return callback(error);
    }
    try {
      parsed = JSON.parse(data);
    } catch (error) {
      return callback(error);
    }
    callback(null, parsed);
  });
}

readJson("names.json", function (error, result) {
  if (error) {
    console.log(error);
  }
  console.log(result);
});
