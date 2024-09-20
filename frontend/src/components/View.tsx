import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set the worker src
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ViewProps {
  uploadFile: File | null;
  onClose: () => void;
}

const View: React.FC<ViewProps> = ({ uploadFile, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

// Functions to handle Pdf viewing

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm'>
        
        {/* Close Button */}
        
        <button
          type="button"
          onClick={onClose}
          className='bg-red-600 p-1 rounded-full w-8 h-8 text-slate-300 fixed right-2 top-2 z-10'
        >
          X
        </button>
        
        {/* Display of Pdf */}

        <Document
          className='overflow-auto top-12 relative md:top-0 md:left-40 lg:left-96 md:fixed'
          file={uploadFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} className="max-h-screen" />
        </Document>

        {/* Pdf Page manipulation */}

        <div className='w-full text-center fixed bottom-0 z-10'>
          <p className='font-bold text-lg'>
            Page {pageNumber} of {numPages ?? '--'}
          </p>
          <div className='flex justify-center gap-52 md:gap-64 pb-1'>
            <button
              className='bg-teal-800 p-1 rounded-md text-slate-300'
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              className='bg-teal-800 p-1 rounded-md text-slate-300'
              type="button"
              disabled={numPages !== null && pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
