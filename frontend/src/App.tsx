import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Screen from './components/Screen';

const App: React.FC = () => {
  return (
    <>
      <div className="">
        <div className="h-20">
          <Navbar />
        </div>
        <div className="h-[calc(100vh-5rem)]">
          <Screen />
        </div>
      </div>
    </>
  );
};

export default App;
