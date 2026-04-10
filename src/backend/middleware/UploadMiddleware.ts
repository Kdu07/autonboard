import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { Readable } from "stream";
import ExcelJS from "exceljs";

/**
 * Use memory storage so the file buffer is available via req.file.buffer
 * without writing to disk — matches the DB schema that stores file as bytea.
 */
const storage = multer.memoryStorage();

/**
 * Validates that only specific spreadsheet formats are accepted
 */
const fileFilter = (
  _req: Request,
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
 * Utility to extract row data from CSV or XLSX buffers using ExcelJS
 */
async function parseSpreadsheet(buffer: Buffer, mimetype: string, originalname: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  const isCsv = mimetype === "text/csv" || originalname.toLowerCase().endsWith(".csv");

  if (isCsv) {
    await workbook.csv.read(Readable.from(buffer));
  } else {
    await workbook.xlsx.read(Readable.from(buffer));
  }

  const sheet = workbook.worksheets[0];
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
      return res.status(400).json({ error: "No file provided" });
    }

    try {
      const parsedData = await parseSpreadsheet(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname,
      );
      (req as any).parsedData = parsedData;
    } catch (err: any) {
      return res.status(422).json({
        error: "Failed to parse spreadsheet",
        details: err.message,
      });
    }

    const { customer_id, status } = req.body;
    if (!customer_id || !status) {
      return res.status(400).json({
        error: "Missing required fields: customer_id and status",
      });
    }

    next();
  }
};
