
import React from "react";
import { Link } from "react-router-dom";
import { useMatrixTheme } from "@/hooks/use-matrix-theme";

const Logo: React.FC = () => {
  const { matrixEnabled } = useMatrixTheme();
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      {matrixEnabled ? (
        <img 
          src="/lovable-uploads/e0f02569-72a1-4354-addf-a7b024479be7.png" 
          alt="DEVONN.AI" 
          className="h-8 matrix-logo"
        />
      ) : (
        <>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">DM</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">DEVONN.AI Moneyhub</span>
        </>
      )}
    </Link>
  );
};

export default Logo;
