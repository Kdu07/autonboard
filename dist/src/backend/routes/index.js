"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UploadController_1 = require("../controllers/UploadController");
const UploadMiddleware_1 = require("../middleware/UploadMiddleware");
exports.routes = [
    router.get("/", UploadController_1.getAll),
    // apply multer and parsing middleware before the controller
    router.post("/upload", UploadMiddleware_1.UploadMiddleware.multerSingle, UploadMiddleware_1.UploadMiddleware.process, UploadController_1.create)
];
//# sourceMappingURL=index.js.map