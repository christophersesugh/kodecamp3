import fs from "node:fs";
import { databasePath } from "../index.js";

function readDatabase() {
  try {
    const databaseData = fs.readFileSync(databasePath, "utf-8");
    return JSON.parse(databaseData);
  } catch (error) {
    throw new Error("Error reading from database");
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Error writing to database");
  }
}
export { readDatabase, writeDatabase };
