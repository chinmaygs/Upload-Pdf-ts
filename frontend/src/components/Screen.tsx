import React, { useRef, useState } from 'react';
import { uploadPdf } from '../api/api';
import View from './View';

const Screen: React.FC = () => {
  const hiddenPdfInput = useRef<HTMLInputElement | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [uploadFile, setUploadFile] = useState<FormData | null>(null);
  const [viewPdf, setViewPdf] = useState<boolean>(false);

  // Creating a FormData object to append pdf file

  const formData = new FormData();

  // Functions to handle the Pdf input

  const handleClick = () => {
    if (hiddenPdfInput.current) {
      hiddenPdfInput.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      formData.append('pdf', file);
      setPdf(file);
      setUploadFile(formData);
    }
  };

  // Function to upload pdf using axios

  const handleUpload = async () => {
    if (uploadFile) {
      await uploadPdf(uploadFile)
        .then(() => {
          setUploadFile(null);
          setPdf(null);
        });
    }
  };

  // Functions to handle Pdf viewing

  const handleClose = () => {
    setViewPdf(false);
  };

  const handleView = () => {
    setViewPdf(true);
  };

  return (
    <div className='h-full flex justify-center items-center bg-white'>
      <div className="box-border h-3/4 w-3/4 border-dashed border-teal-200 border-4 shadow-2xl shadow-red-950 rounded-md bg-slate-50">
        <div className='h-full flex flex-col items-center'>
         
          {/* Input of Pdf with type validation */}
     
          <input
            className='hidden'
            ref={hiddenPdfInput}
            type="file"
            id="pdfInput"
            name="uploadedPDF"
            accept=".pdf, application/pdf"
            onChange={handleFileChange}
          />


          {/* Buttons to handle the functionalities of application */}

          {uploadFile ? (
            <div>
              <h1 className='text-center top-5 relative bg-teal-100 h-fit p-2 font-medium rounded-lg w-3/4 mx-auto'>{pdf?.name}</h1>
              <div className='flex flex-col gap-3 items-center md:flex-row justify-between mx-20'>
                <button className='h-fit w-fit p-1 text-black bg-teal-300 top-12 relative rounded-md' onClick={handleView}>
                  Click to view Pdf
                </button>
                <button className='h-fit w-fit p-1 text-black bg-teal-300 top-12 relative rounded-md' onClick={handleUpload}>
                  Upload Pdf
                </button>
              </div>
            </div>
          ) : (
            <div className='flex items-center'>
            <button className='h-10 w-24 mx-auto bg-teal-900 top-12 relative rounded-md text-slate-300' onClick={handleClick}>
              Select Pdf
            </button>
            </div>
          )}

          {/* Component to View Pdf */}

          {viewPdf && (
            <View uploadFile={pdf} onClose={handleClose}  
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Screen;
