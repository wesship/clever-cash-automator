
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/lib/types";

interface TaskDetailsTabProps {
  task: Task;
}

const TaskDetailsTab: React.FC<TaskDetailsTabProps> = ({ task }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Task ID</p>
          <p className="text-sm font-mono">{task.id}</p>
        </div>
        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Platform</p>
          <p className="text-sm">{task.platform}</p>
        </div>
        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Type</p>
          <p className="text-sm">{task.type}</p>
        </div>
        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Created</p>
          <p className="text-sm">{task.createdAt?.toLocaleString() || 'Unknown'}</p>
        </div>
      </div>
      
      {task.description && (
        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Description</p>
          <p className="text-sm">{task.description}</p>
        </div>
      )}
      
      <div className="bg-background/50 p-3 rounded-md">
        <p className="text-xs text-muted-foreground mb-1">Configuration</p>
        <ScrollArea className="h-32">
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(task.config, null, 2)}
          </pre>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TaskDetailsTab;
