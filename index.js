import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./database.js";
import { userRouter } from "./userRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

db();

app.use(userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on PORT", process.env.PORT);
});
