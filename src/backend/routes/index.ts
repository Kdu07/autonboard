import express from "express";
import { getAll, create } from "../controllers/UploadController";
import { UploadMiddleware } from "../middleware/UploadMiddleware";
import { UploadExcelController } from "../controllers/UploadExcelController";
import { uploadExcelSingleFile } from "../middleware/uploadExcel.middleware";
import { downloadRoutes } from "./download.routes";

const excelController = new UploadExcelController();

import { userRoutes } from "./user.routes";

const router = express.Router();

router.get("/", getAll);

router.use("/download", downloadRoutes);

router.use("/user", userRoutes);

router.post(
  "/upload",
  UploadMiddleware.multerSingle,
  UploadMiddleware.process,
  create
);

router.post(
  "/upload-excel",
  uploadExcelSingleFile("file"),
  excelController.upload
);

export const routes = router;
