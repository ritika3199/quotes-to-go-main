import express from "express";
import cors from "cors";
import {applicationRouter} from "./application.router";

require("dotenv").config();
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://ritikashrivastava:zRE60L615ZlDS24O@cluster0.a1xhtzr.mongodb.net/QuotewellDb?retryWrites=true&w=majority";
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDb connection successful");
});

const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string, 10)
  : 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/applications", applicationRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
