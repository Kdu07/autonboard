"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const exceljs_1 = __importDefault(require("exceljs"));
// destination for incoming files
const uploadDir = path_1.default.join(__dirname, "../../uploads");
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        // make sure the directory exists
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename(_req, file, cb) {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path_1.default.extname(file.originalname)}`);
    }
});
// multer defines fileFilter as (req, file, cb)
// allow TypeScript to infer the signature instead of forcing the callback type
const fileFilter = (req, file, cb) => {
    const allowed = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
        "application/vnd.ms-excel" // older xls/csv
    ];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only CSV and Excel files are allowed"));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
async function parseSpreadsheet(filePath) {
    const workbook = new exceljs_1.default.Workbook();
    const ext = path_1.default.extname(filePath).toLowerCase();
    if (ext === ".csv") {
        await workbook.csv.readFile(filePath);
    }
    else {
        await workbook.xlsx.readFile(filePath);
    }
    const sheet = workbook.worksheets[0];
    const rows = [];
    sheet.eachRow((row) => {
        // row.values is a 1-indexed array; copy as is or process further if needed
        rows.push(row.values);
    });
    return rows;
}
exports.UploadMiddleware = {
    /**
     * multer middleware to read a single file field named "file".
     * This should be applied to the route before `process`.
     */
    multerSingle: upload.single("file"),
    /**
     * After multer has stored the file this middleware will parse it with
     * ExcelJS and ensure the required body fields are present.
     */
    async process(req, res, next) {
        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }
        try {
            const parsed = await parseSpreadsheet(req.file.path);
            // attach parsed data for downstream handlers if needed
            req.parsedData = parsed;
        }
        catch (err) {
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
//# sourceMappingURL=UploadMiddleware.js.map