// import http from "http";
import https from "https";
import fs from "fs";

function handler(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, HTTP");
}

// const server = http.createServer(handler);

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// const options = {
//   key: fs.readdirSync("pk.pem"),
//   cert: fs.readFileSync("pcert.pem"),
// };

// const server = https.createServer(options, handler);

// server.listen(443, () => {
//   console.log("Server running on port 3000");
// });
