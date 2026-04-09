import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { routes } from "./src/backend/routes";

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3003;

app.use("/", routes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, ()=>{
        console.log("The server is running on http://localhost:"+port)
    });
}

export default app;
