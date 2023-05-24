import Express from "express";
import Color from "colors";
import dotenv from "dotenv";
import Cors from "cors";
import connectDB from "./Config/db.js";
import userRote from "./Routes/userRoute.js";
import postRoute from "./Routes/postRoute.js";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";
// config .env
dotenv.config();

// initialize the dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// connect to database
connectDB();

// rest objects
const app = Express();
const port = process.env.PORT || 5000;

// allow cross origin request  (Cors) to everybrowser
app.use(Cors());

// middleware
app.use(Express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/users", userRote);
app.use("/api/posts", postRoute);

// static assets

app.use("/Uploads", express.static(path.join(__dirname, "/Uploads")));

// error handling
app.use(invalidPathHandler);
app.use(errorResponseHandler);

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});
