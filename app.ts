import dotenv from 'dotenv';
import express from "express"
import cors from "cors";
import {routes} from "./src/backend/routes"

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json())

const port = 3000;

app.use("/", routes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, ()=>{
        console.log("The server is runnig on http://localhost:"+3000)
    });
}

export default app;
