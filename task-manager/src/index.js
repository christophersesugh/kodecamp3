import http from "node:http";
import path from "node:path";
import { serverHandler } from "./routes/task.js";
import { __dirname } from "./utils/__dirname.js";

const PORT = 3000;

const currentDirectory = __dirname(import.meta.url);
export const databasePath = path.resolve(
  currentDirectory,
  "database",
  "db.json"
);

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
