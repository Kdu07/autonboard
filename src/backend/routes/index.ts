import express from "express";
import { getAll, create } from "../controllers/UploadController";
import { UploadMiddleware } from "../middleware/UploadMiddleware";
import { UploadExcelController } from "../controllers/UploadExcelController";
import { uploadExcelSingleFile } from "../middleware/uploadExcel.middleware";
import { getUserProfile } from "../controllers/UserController";
import { download } from "../controllers/DownloadController";

const excelController = new UploadExcelController();

const router = express.Router();

router.get("/user/profile", getUserProfile);
router.get("/download/:id", download);

router.get("/", getAll);

router.post(
  "/upload",
  UploadMiddleware.multerSingle,
  UploadMiddleware.process,
  create,
);

router.post(
  "/upload-excel",
  uploadExcelSingleFile("file"),
  excelController.upload,
);

export const routes = router;
