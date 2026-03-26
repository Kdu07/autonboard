import dotenv from 'dotenv';
import express from "express"
import cors from "cors";
import {routes} from "./src/backend/routes"

dotenv.config();
const app = express();

// Standard CORS and JSON parsing
app.use(cors());
app.use(express.json())

const port = 3000;

app.use("/", routes)

app.listen(port, ()=>{
    console.log("The server is runnig on http://localhost:"+3000)
});

