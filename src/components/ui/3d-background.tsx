
import React from 'react';

interface BackgroundProps {
  className?: string;
}

export const Background3D: React.FC<BackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background opacity-90"></div>
      
      {/* 3D floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-vibrant-purple opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-vibrant-blue opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 right-1/3 w-48 h-48 rounded-full bg-vibrant-pink opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Grid for 3D effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
    </div>
  );
};

export default Background3D;
