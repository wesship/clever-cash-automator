
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">Theme</Label>
        <p className="text-sm text-muted-foreground">
          Choose between light and dark mode
        </p>
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="ml-4"
        onClick={handleToggleDarkMode}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default ThemeToggle;
