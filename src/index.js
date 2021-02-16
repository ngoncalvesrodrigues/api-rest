import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { login } from "./api";

login();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

app.use("/", (req, res) => {
  res.json({ success: true });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
