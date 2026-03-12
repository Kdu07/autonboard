import express from "express"

const router = express.Router();

import { getAll, create } from "../controllers/UploadController";
import { UploadMiddleware } from "../middleware/UploadMiddleware";

export const routes: any[] = [
  router.get("/", getAll),
  // apply multer and parsing middleware before the controller
  router.post(
    "/upload",
    UploadMiddleware.multerSingle,
    UploadMiddleware.process,
    create
  )
];


