import express from "express"

const router = express.Router();

import {getAll, create} from "../controllers/UploadController"

export const routes: any[] =  [
    router.get("/", getAll),
    router.post("/upload", create)
]


