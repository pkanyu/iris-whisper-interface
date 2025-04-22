
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        <img 
          src="/lovable-uploads/5eee8672-77cd-4dcb-9fcb-841a30685803.png" 
          alt="IRIS Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-2xl font-light tracking-wider">IRIS</span>
    </div>
  );
};

export default Logo;
