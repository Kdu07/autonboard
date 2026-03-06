import dotenv from 'dotenv';
import express from "express"
import {routes} from "./src/backend/routes"

dotenv.config();
const app = express();


app.use(express.json())

const port = process.env.PORT || 3000;

app.use("/", routes)

app.listen(port, ()=>{
    console.log("The server is runnig on http://localhost:"+3000)
});

