"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.create = create;
const UploadService_1 = require("../services/UploadService");
const UploadModel_1 = __importDefault(require("../models/UploadModel"));
async function getAll(req, res) {
    try {
        const rows = await UploadModel_1.default.getAll();
        return res.json(rows);
    }
    catch (error) {
        return res.json(error);
    }
}
async function create(req, res) {
    try {
        const { customer_id, status } = req.body;
        const file = req.file;
        const result = await UploadService_1.UploadService.processUpload(file, Number(customer_id), status);
        return res.json(result);
    }
    catch (error) {
        return res.json(error);
    }
}
module.exports = {
    getAll,
    create,
};
//# sourceMappingURL=UploadController.js.map