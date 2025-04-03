
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Play, AlertTriangle, CheckCircle, PauseCircle } from "lucide-react";
import { getTaskStatusDisplay } from "./utils";

interface TaskStatusBadgeProps {
  isRunning: boolean;
  lastError?: any;
  progress: number;
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ isRunning, lastError, progress }) => {
  const statusDisplay = getTaskStatusDisplay(isRunning, lastError, progress);
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-normal",
        isRunning && "bg-blue-500/10 text-blue-500 border-blue-500/30",
        !isRunning && lastError && "bg-destructive/10 text-destructive border-destructive/30",
        !isRunning && !lastError && progress >= 100 && "bg-green-500/10 text-green-500 border-green-500/30",
        !isRunning && !lastError && progress > 0 && progress < 100 && "bg-amber-500/10 text-amber-500 border-amber-500/30",
        !isRunning && !lastError && progress === 0 && "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30"
      )}
    >
      <span className="flex items-center gap-1">
        {isRunning ? (
          <Play className="h-3 w-3" />
        ) : lastError ? (
          <AlertTriangle className="h-3 w-3" />
        ) : progress >= 100 ? (
          <CheckCircle className="h-3 w-3" />
        ) : progress > 0 ? (
          <PauseCircle className="h-3 w-3" />
        ) : null}
        {statusDisplay.label}
      </span>
    </Badge>
  );
};

export default TaskStatusBadge;
