"use strict";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import task from "./routes/task.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

app.use((req, res) => "<h1>Task manager</h1>");
app.use("/tasks", task);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
