import http from "node:http";
import util from "node:util";
import { PORT } from "./config.js";

const database = {
  tasks: [],
};

function serverHandler(req, res) {}

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
