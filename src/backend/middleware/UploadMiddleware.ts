import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import ExcelJS from "exceljs";

/**
 * Configuration for file storage and naming
 */
const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    // Ensure the target directory exists before saving
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    // Generate a unique prefix to prevent filename collisions
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

/**
 * Validates that only specific spreadsheet formats are accepted
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimetypes = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
  ];

  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Please upload a CSV or Excel file."));
  }
};

const upload = multer({ storage, fileFilter });

/**
 * Utility to extract row data from CSV or XLSX files using ExcelJS
 */
async function parseSpreadsheet(filePath: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  const extension = path.extname(filePath).toLowerCase();

  // Choose the appropriate reader based on file extension
  if (extension === ".csv") {
    await workbook.csv.readFile(filePath);
  } else {
    await workbook.xlsx.readFile(filePath);
  }

  const sheet = workbook.worksheets[0];

  if (!sheet) {
    throw new Error('O arquivo não contém nenhuma planilha válida.');
  }

  const rows: any[] = [];

  sheet.eachRow((row) => {
    rows.push(row.values);
  });

  return rows;
}

/**
 * Middleware collection for handling file uploads and initial parsing
 */
export const UploadMiddleware = {
  multerSingle: upload.single("file"),

  async process(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
    }

    const filePath = req.file.path;

    try {
      // 1. Parse the spreadsheet from disk
      const parsedData = await parseSpreadsheet(filePath);
      (req as any).parsedData = parsedData;

      // 2. Read the file into a Buffer for BYTEA storage
      const fileBuffer = await fsPromises.readFile(filePath);
      (req as any).fileBuffer = fileBuffer;

    } catch (err: any) {
      // Clean up the temp file so it doesn't accumulate on disk
      try {
        await fsPromises.unlink(filePath);
      } catch (cleanupErr) {
        console.warn('[UploadMiddleware] Falha ao remover arquivo temporário após erro:', cleanupErr);
      }
      return res.status(422).json({
        error: "Falha ao processar a planilha. Verifique se o arquivo está correto e tente novamente.",
        details: err.message
      });
    }

    const { customer_id, status } = req.body;
    if (!customer_id || !status) {
      return res.status(400).json({
        error: "Campos obrigatórios ausentes: customer_id e status são necessários."
      });
    }

    next();
  }
};