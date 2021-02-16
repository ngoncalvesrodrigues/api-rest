import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { login } from "./api";

const BASE_URL = "/api/v1";
const useRoute = (url, routes) => app.use(`${BASE_URL}${url}`, routes);

login();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

useRoute("/clients", routes.clients);
useRoute("/policies", routes.policies);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
