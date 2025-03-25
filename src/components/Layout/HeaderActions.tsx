
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Plus, Code } from "lucide-react";
import { useMatrixTheme } from "@/hooks/use-matrix-theme";

const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const { matrixEnabled, toggleMatrix } = useMatrixTheme();
  
  const handleCreateTask = () => {
    navigate("/?tab=create");
  };
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={toggleMatrix}
        className={matrixEnabled ? "bg-green-900/20 text-green-500 border-green-500" : ""}
      >
        <Code className={`mr-2 h-4 w-4 ${matrixEnabled ? "text-green-500" : ""}`} />
        {matrixEnabled ? "Matrix: ON" : "Matrix: OFF"}
      </Button>
      <Link to="/settings">
        <Button size="sm" variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
      <Button size="sm" onClick={handleCreateTask}>
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  );
};

export default HeaderActions;
