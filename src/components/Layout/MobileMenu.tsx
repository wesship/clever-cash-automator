
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Settings, Plus, Code } from "lucide-react";
import { useMatrixTheme } from "@/hooks/use-matrix-theme";
import { navItems } from "./Navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { matrixEnabled, toggleMatrix } = useMatrixTheme();
  
  if (!isOpen) return null;
  
  const handleCreateTask = () => {
    onClose();
    navigate("/?tab=create");
  };
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-secondary"
              )}
              onClick={onClose}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          );
        })}
        <div className="pt-2 flex flex-col space-y-2">
          <Button 
            variant="outline" 
            className="justify-start w-full"
            onClick={() => {
              toggleMatrix();
              onClose();
            }}
          >
            <Code className="mr-2 h-5 w-5" />
            {matrixEnabled ? "Matrix: ON" : "Matrix: OFF"}
          </Button>
          <Link to="/settings" onClick={onClose}>
            <Button variant="outline" className="justify-start w-full">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </Link>
          <Button 
            className="justify-start w-full"
            onClick={handleCreateTask}
          >
            <Plus className="mr-2 h-5 w-5" />
            New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
