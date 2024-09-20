import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className='h-full flex bg-teal-900 text-center shadow-black'>
      <button className='bg-teal-300 h-10 my-auto p-2 mx-4 rounded-lg font-medium shadow-md shadow-slate-300'>
        <span>PDF</span>
      </button>
      <h1 className='flex-grow text-4xl pt-5 pr-20 rounded-sm font-medium text-slate-300'>
        Upload PDF
      </h1>
    </div>
  );
}

export default Navbar;
