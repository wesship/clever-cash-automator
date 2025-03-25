
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  children 
}) => {
  return (
    <Tabs 
      defaultValue="overview" 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="space-y-6"
    >
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm p-1 rounded-lg shadow-soft">
        <TabsList className="bg-background/50">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="create" 
            className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white"
          >
            Create Task
          </TabsTrigger>
        </TabsList>
        
        <div className="hidden sm:flex items-center space-x-2">
          <Button variant="outline" size="sm" className="gap-1 backdrop-blur-sm bg-background/50">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" className="gap-1 backdrop-blur-sm bg-background/50">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {children}
    </Tabs>
  );
};

export default DashboardTabs;
