
import React from "react";
import { Progress } from "@/components/ui/progress";
import { TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskProgressProps {
  completionCount: number;
  targetCompletions: number;
  status: TaskStatus;
  className?: string;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({
  completionCount,
  targetCompletions,
  status,
  className
}) => {
  const progress = (completionCount / targetCompletions) * 100;

  const progressBarColors = {
    [TaskStatus.PENDING]: "bg-vibrant-yellow",
    [TaskStatus.RUNNING]: "bg-vibrant-green",
    [TaskStatus.COMPLETED]: "bg-vibrant-blue",
    [TaskStatus.FAILED]: "bg-destructive",
    [TaskStatus.PAUSED]: "bg-muted-foreground"
  };

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">
          {completionCount}/{targetCompletions}
        </span>
      </div>
      <Progress 
        value={progress} 
        className={cn("h-2", progressBarColors[status])}
      />
    </div>
  );
};

export default TaskProgress;
