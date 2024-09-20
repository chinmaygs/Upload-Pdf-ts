import { Request, Response } from 'express';
import { Pdf } from '../Model/model'; 
import zlib from 'zlib';
import fs from 'fs';

export const pdfUpload = async (req: Request, res: Response) => {

    // Ensure the file is present
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.');
    }

    // Read the uploaded file
    const fileBuffer = fs.readFileSync(req.file.path);
    const filename = req.file.originalname;
    const originalSize = fileBuffer.length;

    // Check if it's over 4 MB and compress if needed
    let pdfBuffer: Buffer;
    if (originalSize > 4 * 1024 * 1024) { 
        
        pdfBuffer = zlib.gzipSync(fileBuffer);
        console.log('File compressed.');
    } else {
        
        pdfBuffer = fileBuffer;
        console.log('File size is acceptable, no compression applied.');
    }

    // Create a new PDF instance from Db schema model
    const newPdf = new Pdf({
        filename,
        file: pdfBuffer, 
    });

    try {
        await newPdf.save();
        res.send({ message: 'File uploaded successfully!' });
    } catch (err) {
        console.error('Failed to save file:', err);
        res.status(500).send('Failed to save file: ' + err);
    }
};


