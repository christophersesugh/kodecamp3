const fs = require("fs");
const http = require("http");

const writableStream = fs.createWriteStream("outpit_file.txt");
const ch =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos laborum voluptatem architecto facere dolores delectus molestiae fuga quo velit, atque harum iusto? Accusantium, exercitationem. Eos magnam inventore hic voluptates doloremque?";
for (let i = 0; i < 1000; i++) {
  writableStream.write(ch);
}
writableStream.end();
writableStream.on("finish", () => {
  console.log("Done writing");
});

writableStream.on("error", (err) => {
  console.log(`An error occured: ${error}`);
});

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.write("Hello, ");
//   res.write("Client");
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("Server is up and running");
// });
