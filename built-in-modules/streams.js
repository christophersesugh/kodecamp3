const fs = require("fs");

const rS = fs.createReadStream("file.txt");
const wS = fs.createWriteStream("output.txt");

rS.on("data", (chunk) => {
  console.log("Read chunk", chunk.toString("utf8"));
  wS.write(chunk);
});

rS.on("end", () => {
  console.log("Finished reading");
  wS.end();
});

rS.on("error", (error) => {
  console.error("Error reading:", error);
});

wS.on("finish", () => {
  console.log("Finished writing");
});

wS.on("error", (error) => {
  console.error("Error writing:", error);
});
