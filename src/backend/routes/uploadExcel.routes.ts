import { Router } from 'express';
import { UploadExcelController } from '../controllers/UploadExcelController';
import { uploadExcelSingleFile } from '../middleware/uploadExcel.middleware';

const router = Router();
const controller = new UploadExcelController();

router.post(
  '/upload-excel',
  uploadExcelSingleFile('file'),
  controller.upload
);

export default router;
