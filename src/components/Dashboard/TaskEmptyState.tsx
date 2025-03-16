
import React from "react";
import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskEmptyStateProps {
  onCreateTask?: () => void;
}

export const TaskEmptyState: React.FC<TaskEmptyStateProps> = ({ onCreateTask }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-muted-foreground mb-4">
        <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="mt-1">Try adjusting your search or filter criteria</p>
      </div>
      <Button onClick={onCreateTask} variant="outline" className="mt-4">
        <Plus className="h-4 w-4 mr-2" />
        Create New Task
      </Button>
    </div>
  );
};

export default TaskEmptyState;
