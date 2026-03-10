"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../database/runDB/init"));
class UploadModel {
    /**
     * Creates a new upload record with the file path
     */
    static async create(customer_id, file_path, status = 'pending') {
        // include status so the frontend can specify the submission state;
        // the database has a default so callers may omit it.
        const query = `
      INSERT INTO submission (customer_id, status, file_path, upload_date) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING *
    `;
        const values = [customer_id, status, file_path];
        const result = await init_1.default.query(query, values);
        return result.rows[0];
    }
    /**
     * Returns all upload records
     */
    static async getAll() {
        const query = 'SELECT * FROM submission';
        const result = await init_1.default.query(query);
        return result.rows;
    }
}
exports.default = UploadModel;
//# sourceMappingURL=UploadModel.js.map