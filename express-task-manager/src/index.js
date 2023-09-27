"use strict";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import "express-async-errors";
import sessionAuth from "./routes/sessionAuth.js";
import tokenAuth from "./routes/tokenAuth.js";
import task from "./routes/task.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();
app.use(express.json());
dotenv.config();

//Env variables
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;

const env = app.get("env") === "production";

app.use("/", express.static("public"));

//Mongo store
const mongoStore = MongoStore.create({
  mongoUrl: DATABASE_URL,
  collectionName: "_session",
});

/**
 * Session option
 */
const sessionOptions = {
  name: "KCTM_session",
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env,
    maxAge: 60 * 60 * 24 * 7,
  },
  store: mongoStore,
};

/**
 * Application level middleware
 */
app.use(session(sessionOptions));
app.use("/session-auth", sessionAuth);
app.use("/token-auth", tokenAuth);
app.use("/tasks", task);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
