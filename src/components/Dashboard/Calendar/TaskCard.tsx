
import React from "react";
import { Task, TaskStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onClick: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div 
      className="p-3 border border-border/50 rounded-lg hover:bg-background/50 cursor-pointer"
      onClick={() => onClick(task.id)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{task.name}</h4>
        <Badge variant={task.status === TaskStatus.RUNNING ? "default" : "outline"}>
          {task.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{task.description}</p>
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <div>
          Time: {task.config.schedule?.timeOfDay || "N/A"}
        </div>
        <div>
          Platform: {task.platform}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
