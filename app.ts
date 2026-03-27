import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { routes } from "./src/backend/routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});
