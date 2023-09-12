"use strict";
import express from "express";
import dotenv from "dotenv";

const app = express();
const router = express.Router();
dotenv.config();

const PORT = process.env.PORT;

// app.METHOD(PATH, HANDLER);
app.use(express.static("public"));

function logRequest(req, res, next) {
  console.log(`Received  ${req.method} request to ${req.path}`);
  next();
}
// router.use((req, res, next) => {
//   console.log("Router-level middleware");
//   next();
// });

// router.get("/", (req, res) => {
//   res.send("ROuter level");
// });
// app.use((req, res, next) => {
//   console.log("Global middleware");
//   next();
// });
app.get("/test-index", logRequest, (request, response) => {
  response.send("Hello World!");
});

app.post("/test", (request, response) => {
  response.send("post request");
});
// app.use("/test", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
