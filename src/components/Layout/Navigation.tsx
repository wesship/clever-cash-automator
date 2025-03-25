
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Settings, 
  BarChart, 
  CreditCard,
  Building
} from "lucide-react";

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

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();
  
  return (
    <nav className={cn("flex items-center space-x-1", className)}>
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
  );
};

export { navItems, Navigation };
