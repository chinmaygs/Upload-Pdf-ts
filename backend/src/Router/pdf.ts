import express, { Request, Response, NextFunction } from "express";
import {pdfUpload} from '../Controller/pdf';
import multer from "multer";

// Creating a router object

const router = express.Router();

// Middelwares to handle file upload through Multer storing them on server and handling the type and size validation.

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Uploads/'); 
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname); 
  }
});

// File filter to restrict file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['application/pdf']; 

  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); 
  } else {
      req.fileValidationError = 'Only .pdf format allowed!'; 
      cb(null, false);
  }
};

// Initialize upload with limits and file filter
const upload = multer({
  storage: storage,
  limits: {
      fileSize: 10 * 1024 * 1024
  },
  fileFilter: fileFilter
});

// Route handling and sending error message if Validation failed

router.post('/upload', upload.single('pdf'), (req: Request, res: Response, next: NextFunction) => {
  if (req.fileValidationError) {
      return res.status(400).send(req.fileValidationError);
  }
  next();
}, pdfUpload);

export default router;
