import express, { Request, Response } from "express";
import connectDatabase from "./utils/connectDatabase";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import {
  AuthRouter,
  UserRouter,
  AuthorRouter,
  BookRouter,
  ImageRouter,
  ListRouter,
} from "./routes";
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const PORT = parseInt(<string>process.env.PORT, 10) || 9888;

connectDatabase();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes api
app.use("/api/book", BookRouter);
app.use("/api/author", AuthorRouter);
app.use("/api/list", ListRouter);
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

app.use("/api/upload", ImageRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(__dirname + "/../admin/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "admin", "build", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log("Backend is running at port:", PORT);
});
