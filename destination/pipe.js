// const fs = require("fs");

// const writableStream = fs.createWriteStream("output.txt");
// const readableStream = fs.createReadStream("data.txt");
// const {} = require("fs")
// const {} = require("stream")

// readableStream.pipe(process.stdout);

// readableStream.on("end", () => {
//   console.log("DOne reading");
// });

// readableStream.on("error", (error) => {
//   console.log(error);
// });

const { Readable } = require("stream");
const sharp = require("sharp");

const readable = new Readable({
  read(size) {
    this.push("Hello, ");
    this.push("Readable");
    this.push(null);
  },
});

readable.on("data", (chunk) => {
  console.log(chunk.toString());
});

readable.on("end", () => {
  console.log("DOne reading");
});

const buffer = "67 34";
sharp(buffer).toFile("image.jpg", (err, image) => {
  if (err) console.log(err);
  console.log(image);
});
