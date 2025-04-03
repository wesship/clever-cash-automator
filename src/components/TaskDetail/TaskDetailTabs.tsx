
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskDetailTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TaskDetailTabs = ({ activeTab, onTabChange }: TaskDetailTabsProps) => {
  return (
    <div className="px-6 pb-1 border-b">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="execution">Execution</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TaskDetailTabs;
