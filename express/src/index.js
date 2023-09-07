"use strict";
import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

// app.METHOD(PATH, HANDLER);

app.get("/test", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
