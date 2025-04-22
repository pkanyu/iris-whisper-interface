
import React from 'react';

const SpinningBlob: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full mb-6">
      <div className="relative w-64 h-64">
        <svg 
          viewBox="0 0 300 100" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full animate-spin-slow"
        >
          <path 
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary opacity-80"
            d="M 10,50 C 20,30 40,30 50,50 C 60,70 80,70 90,50 C 100,30 120,30 130,50 C 140,70 160,70 170,50 C 180,30 200,30 210,50 C 220,70 240,70 250,50 C 260,30 280,30 290,50"
          />
        </svg>
      </div>
    </div>
  );
};

export default SpinningBlob;
