
import React, { useState } from "react";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskList from "./TaskList";

interface TasksTabProps {
  tasks: Task[];
  onCreateTask?: () => void;
  onDeleteTasks?: (taskIds: string[]) => void;
  onViewTaskDetails?: (taskId: string) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  onCreateTask,
  onDeleteTasks,
  onViewTaskDetails
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight text-gradient">
          Manage Your Tasks
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button 
            size="sm"
            onClick={onCreateTask}
            className="gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Create Task
          </Button>
        </div>
      </div>

      <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList 
            tasks={tasks} 
            onCreateTask={onCreateTask} 
            onDeleteTasks={onDeleteTasks}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksTab;
