# PDF Upload Application

## Overview

The PDF Upload App allows users to upload PDF files and preview them before final submission. To enhance user experience, it compresses files larger than 4MB using the zlib library. This application is developed using the MERN stack: MongoDB, Express.js, React, and Node.js, making it a full-stack solution for handling PDF uploads efficiently.

## Application Workflow

The workflow of the MERN PDF Upload App consists of several key stages, each designed to facilitate a seamless user experience for uploading and processing PDF files. Here’s a detailed breakdown:

### 1. User Uploads the PDF File
*User Interface:*
The application provides a simple and intuitive upload form where users can drag and drop or click to select PDF files.

*File Validation:*
As soon as a file is selected, client-side validation checks if the file format is a PDF. This is done using JavaScript (checking file extensions and MIME types).

### 2. PDF Viewing
*Preview Rendering:*
The selected PDF is rendered in the application using the react-pdf library. A worker for PDF.js is configured to handle rendering without blocking the main thread. This is done by setting the worker path to an external CDN link in the component where the PDF preview is implemented.

*User Interaction:*
Users can scroll through the pages of the PDF or zoom in and out. Include navigation controls (next, previous) for better user experience.

### 3. File Upload Process
*Upload Confirmation:*
Once users review the PDF and are satisfied, they can click the "Upload" button.

*API Request:*
The file is sent to the backend using Axios. The request is made as a POST with multipart/form-data, allowing the PDF file to be transmitted correctly.

### 4. Backend Handling
*Receiving the File:*
The backend, set up with Express, uses Multer to handle the incoming request. Multer will parse the multipart/form-data and make the file available in req.file.
 
*File Size Check:*
The backend checks the size of the uploaded file:
	- If the file size is under 4MB, it is processed directly for storage.
	- If the file size exceeds 4MB, the backend uses the zlib module to compress the file.
This involves:
  	- Reading the file stream.
  	- Compressing it using zlib.gzip().
  	- Storing the compressed version instead.

*Error Handling:*
Implement error handling for cases where file processing fails (e.g., file corruption during upload, compression errors).


### 5. Storing the PDF
*Database Interaction:*
Once the file is processed (either stored directly or compressed), the backend uses Mongoose to save the file in MongoDB.
  - The document structure in MongoDB typically includes:
  	- *filename*: Original name of the uploaded file.
  	- *file*: The file is stored as a buffer data type.

### Future Enhancements

 **1.Display Confirmation:**
        On successful upload, provide user feedback via a notification or modal indicating that the upload was successful, along with details like file size and a link to view the uploaded document.
 
 **2.Error Notifications:**
        If there are any issues during upload or processing, ensure that clear error messages are displayed to the user, allowing them to take corrective action (e.g., trying again with a different file).

 **3.Additional Features:**
        Consider implementing a file management interface where users can view their uploaded PDFs, delete them, or download them for offline access.
Implement pagination or search functionality to help users find specific files easily.

This detailed workflow outlines each step in the user journey, ensuring a comprehensive understanding of how the MERN PDF Upload App operates from file selection to storage. By enhancing these details, you can create a robust application that is user-friendly and efficient.

## Application Setup

### 1. Download the Application
Ensure that you have cloned or downloaded the application files correctly from the repository.

### 2. Create Environment Variables
Navigate to the backend folder and create an .env file. This file will contain sensitive information such as your database connection string and port number.

`DB_URL='Enter your MongoDB connection string here'`
`PORT='3000'  or any port number you prefer`

### 3. Install Dependencies

Run the following command in both the frontend and backend directories to install all required packages:

`npm install`

### 4. Starting the Application

Frontend

To start the frontend application, navigate to the frontend directory and run:

`npm run dev`

This command will start the React development server, allowing you to access the app in your browser.

Backend

To start the backend application, navigate to the backend directory and run:

`npm start`

