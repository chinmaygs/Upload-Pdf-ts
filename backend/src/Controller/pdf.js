"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfUpload = void 0;
const model_1 = require("../Model/model"); // Adjust the import based on your model structure
const zlib_1 = __importDefault(require("zlib"));
const fs_1 = __importDefault(require("fs"));
// Upload handler
const pdfUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the file is present
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }
    // Read the uploaded file
    const fileBuffer = fs_1.default.readFileSync(req.file.path);
    const filename = req.file.originalname;
    const originalSize = fileBuffer.length;
    // Compress the file if it exceeds a certain size
    let pdfBuffer;
    if (originalSize > 3 * 1024 * 1024) { // Check if it's over 3 MB
        // Compress the file
        pdfBuffer = zlib_1.default.gzipSync(fileBuffer);
        console.log('File compressed.');
    }
    else {
        // No compression needed
        pdfBuffer = fileBuffer;
        console.log('File size is acceptable, no compression applied.');
    }
    // Create a new PDF instance
    const newPdf = new model_1.Pdf({
        filename,
        file: pdfBuffer, // Use the buffer directly
    });
    try {
        yield newPdf.save();
        res.send({ message: 'File uploaded successfully!' });
    }
    catch (err) {
        console.error('Failed to save file:', err);
        res.status(500).send('Failed to save file: ' + err);
    }
});
exports.pdfUpload = pdfUpload;
// Uncomment and convert other handlers as needed
// export const download = async (req: Request, res: Response) => {
//     const pdfs = await Pdf.find();
//     res.json(pdfs);
// };
// export const delete = async (req: Request, res: Response) => {
//     const id = req.params.id;
//     try {
//         const deletedPdf = await Pdf.findOneAndDelete({ _id: id });
//         res.status(201).json(deletedPdf);
//     } catch (err) {
//         console.error(err);
//         res.status(400).json(err);
//     }
// };
