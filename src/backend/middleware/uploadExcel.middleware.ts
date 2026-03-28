import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextFunction, Request, Response } from 'express';

const uploadDir = path.resolve(process.cwd(), 'src/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export function isAllowedExcelFile(file: {
  mimetype: string;
  originalname: string;
}): boolean {
  return (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.originalname.toLowerCase().endsWith('.xlsx')
  );
}

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const isExcel = isAllowedExcelFile(file);

  if (!isExcel) {
    return cb(new Error('Only .xlsx files are allowed'));
  }

  cb(null, true);
};

const uploadExcelMulter = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const uploadExcelMiddleware = uploadExcelMulter;

export const uploadExcelSingleFile = (fieldName: string = 'file') => {
  const singleUpload = uploadExcelMulter.single(fieldName);

  return (req: Request, res: Response, next: NextFunction): void => {
    singleUpload(req, res, (error?: unknown) => {
      if (!error) {
        next();
        return;
      }

      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          res.status(413).json({
            success: false,
            error: {
              code: 'BAD_REQUEST',
              message: 'File is too large. The maximum size is 10MB.',
            },
          });
          return;
        }

        res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: error.message,
          },
        });
        return;
      }

      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: error.message,
          },
        });
        return;
      }

      next();
    });
  };
};
