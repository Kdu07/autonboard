"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
// Directly import your Model
const UploadModel_1 = __importDefault(require("../models/UploadModel"));
class UploadService {
    /**
     * Receives the multer file object, the customer ID and a status value,
     * performs basic validations and delegates persistence to the model.
     */
    static async processUpload(file, customerId, status = 'pending') {
        // Ensure the file was actually received
        if (!file) {
            throw new Error('No file was uploaded.');
        }
        // Define accepted formats
        const allowedTypes = [
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
            'application/vnd.ms-excel' // Old XLS
        ];
        // Validate file format
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error('Invalid format. Please upload only CSV or Excel files.');
        }
        // Ensure the file is not empty (0 bytes)
        if (file.size === 0) {
            throw new Error('The uploaded file is empty.');
        }
        // Call the Model to save to the database including status
        const savedUpload = await UploadModel_1.default.create(customerId, file.path, status);
        // Return the result to the caller (the Controller)
        return savedUpload;
    }
}
exports.UploadService = UploadService;
//# sourceMappingURL=UploadService.js.map