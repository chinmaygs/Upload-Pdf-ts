"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdf_1 = require("../Controller/pdf");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// Configure storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/'); // Specify the directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});
// File filter to restrict file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf']; // Allow only PDF files
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    }
    else {
        req.fileValidationError = 'Only .pdf format allowed!'; // Set custom error message
        cb(null, false); // Reject file
    }
};
// Initialize upload with limits and file filter
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10 MB
    },
    fileFilter: fileFilter
});
// Define routes
router.post('/upload', upload.single('pdf'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
    }
    next();
}, pdf_1.pdfUpload);
exports.default = router; // Use default export for consistency with TypeScript
