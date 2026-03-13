import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";

// destination for incoming files
const uploadDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    // make sure the directory exists
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

// multer defines fileFilter as (req, file, cb)
// allow TypeScript to infer the signature instead of forcing the callback type
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowed = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
    "application/vnd.ms-excel" // older xls/csv
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and Excel files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

async function parseSpreadsheet(filePath: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".csv") {
    await workbook.csv.readFile(filePath);
  } else {
    await workbook.xlsx.readFile(filePath);
  }

  const sheet = workbook.worksheets[0];
  const rows: any[] = [];
  sheet.eachRow((row) => {
    rows.push(row.values);
  });
  return rows;
}

export const UploadMiddleware = {
  multerSingle: upload.single("file"),

  async process(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    try {
      const parsed = await parseSpreadsheet(req.file.path);
      (req as any).parsedData = parsed;
    } catch (err: any) {
      return res
        .status(400)
        .json({ error: "Error processing spreadsheet", details: err.message });
    }

    const { customer_id, status } = req.body;
    if (!customer_id || !status) {
      return res
        .status(400)
        .json({ error: "customer_id and status are required" });
    }

    next();
  }
};