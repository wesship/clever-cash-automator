
import React, { createContext, useContext, useState, useEffect } from "react";
import RainText from "@/components/ui/matrix-code";

type MatrixThemeContextType = {
  matrixEnabled: boolean;
  toggleMatrix: () => void;
};

const MatrixThemeContext = createContext<MatrixThemeContextType | undefined>(undefined);

export const MatrixThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matrixEnabled, setMatrixEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Load saved preference from localStorage
    const savedPreference = localStorage.getItem("matrixTheme");
    if (savedPreference) {
      setMatrixEnabled(savedPreference === "true");
    }
    
    // Apply matrix theme to document if enabled
    if (matrixEnabled) {
      document.documentElement.classList.add("matrix-theme");
    } else {
      document.documentElement.classList.remove("matrix-theme");
    }
  }, [matrixEnabled]);

  const toggleMatrix = () => {
    const newValue = !matrixEnabled;
    setMatrixEnabled(newValue);
    localStorage.setItem("matrixTheme", String(newValue));
  };

  return (
    <MatrixThemeContext.Provider value={{ matrixEnabled, toggleMatrix }}>
      {matrixEnabled && (
        <RainText 
          fontSize={16}
          color="#00ff00"
          characters="01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
          fadeOpacity={0.05}
          speed={1.0}
        />
      )}
      {children}
    </MatrixThemeContext.Provider>
  );
};

export const useMatrixTheme = (): MatrixThemeContextType => {
  const context = useContext(MatrixThemeContext);
  if (context === undefined) {
    throw new Error("useMatrixTheme must be used within a MatrixThemeProvider");
  }
  return context;
};
