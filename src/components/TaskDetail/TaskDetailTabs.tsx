
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TaskDetailTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TaskDetailTabs = ({ activeTab, onTabChange }: TaskDetailTabsProps) => {
  return (
    <div className="px-6 pb-1 border-b">
      <TabsList className="grid grid-cols-3 w-full max-w-md" value={activeTab} onValueChange={onTabChange}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="execution">Execution</TabsTrigger>
        <TabsTrigger value="configuration">Configuration</TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TaskDetailTabs;
