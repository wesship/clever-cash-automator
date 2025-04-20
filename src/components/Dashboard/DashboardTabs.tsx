
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, ListTodo, CalendarDays, PlusCircle, Settings } from "lucide-react";

interface DashboardTabsProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings?: boolean;
  calendar?: boolean;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  settings = false,
  calendar = false
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full overflow-hidden">
      <div className="border-b border-border/40 mb-6">
        <TabsList className="h-14 bg-background/30 backdrop-blur-sm rounded-none px-0">
          <TabsTrigger value="overview" className="gap-2 relative px-4">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline-block">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2 relative px-4">
            <ListTodo className="h-4 w-4" />
            <span className="hidden md:inline-block">Tasks</span>
          </TabsTrigger>
          {calendar && (
            <TabsTrigger value="calendar" className="gap-2 relative px-4">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden md:inline-block">Calendar</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="create" className="gap-2 relative px-4">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden md:inline-block">Create</span>
          </TabsTrigger>
          {settings && (
            <TabsTrigger value="settings" className="gap-2 relative px-4">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline-block">Settings</span>
            </TabsTrigger>
          )}
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export default DashboardTabs;
