
import React from "react";
import { Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

interface DashboardHeaderProps {
  title: string;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, className }) => {
  const { theme, setTheme, isDarkMode } = useTheme();

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className={`flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8 ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight inline-flex items-center">
        <span className="text-gradient">{title}</span>
        <Sparkles className="ml-2 h-5 w-5 text-vibrant-yellow animate-pulse-slow" />
      </h1>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTheme} 
          className="bg-background/50 backdrop-blur-sm hover:bg-primary/10"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
