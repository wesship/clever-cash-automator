import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  BarChart, 
  Plus, 
  Menu, 
  X, 
  CreditCard,
  Building,
  Code
} from "lucide-react";
import { useMatrixTheme } from "@/hooks/use-matrix-theme";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: <BarChart className="h-5 w-5" />
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    name: "Departments",
    href: "/departments",
    icon: <Building className="h-5 w-5" />
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />
  }
];

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { matrixEnabled, toggleMatrix } = useMatrixTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCreateTask = () => {
    navigate("/?tab=create");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
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

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
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

        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
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
                  onClick={() => setMobileMenuOpen(false)}
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
                  setMobileMenuOpen(false);
                }}
              >
                <Code className="mr-2 h-5 w-5" />
                {matrixEnabled ? "Matrix: ON" : "Matrix: OFF"}
              </Button>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="justify-start w-full">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </Link>
              <Button 
                className="justify-start w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCreateTask();
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                New Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
